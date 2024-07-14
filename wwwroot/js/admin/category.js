$(document).ready(() => {
    RenderCategoryList();
})


// Display modal
$("#btnCategory").click(function () {
    $("#categoryModal").modal("show");
    $("#staticBackdropLabel").text("Them danh muc");
})

// Hide modal
function HideModal() {
    $('#categoryModal').modal('hide');
}

// Validate inputs
function Validate() {
    var isValid = true;

    if ($("#tenDanhMuc").val().trim() === "") {
        $("#tenDanhMuc").css("border-color", "red")
        isValid = false;
    }
    else {
        $("#tenDanhMuc").css("border-color", "lightgrey")
    }
    return isValid
}

$("#tenDanhMuc").change(function () {
    Validate();
})

// Reset form modal
function ResetForm() {
    $('#categoryId').val('');
    $('#tenDanhMuc').val('');
    $('#moTa').val('');
    $('#kichHoat').prop('checked', true);

    $("#tenDanhMuc").css("border-color", "lightgrey");
}


// 1. Render data from category table
function RenderCategoryList() {
    $("#categoryList").empty();
    $.ajax({
        url: "/admin/category/all",
        type: "GET",
        success: function (data) {
            // console.log("Danh sach du lieu: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#categoryList').append(`
								<tr>
									
                                    <td class="text-center">${index + 1}</td>
                                    <td>${item.name}</td>                               
									<td>${item.description}</td>
                                    <td>${item.isActive}</td>
									<td class="text-center">
										<button type="button" class="btn btn-primary" onclick="Edit('${item.categoryId}')">Sửa</button>
										<button type="button" class="btn btn-danger" onclick="Delete('${item.categoryId}')">Xóa</button>
									</td>
								</tr>
							`);
                });
            }
            else {
                $('#categoryList').append(`
							<tr>
								<td class="text-center" colspan="6">Không có dữ liệu</td>
							</tr>
						`);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}


// 2. Create new category
function CreateCategory() {
    // Validate form inputs
    var result = Validate();
    if (result == false) {
        return false
    }

    // Gan value cho bien
    var id = $("#categoryId").val();
    var tenDanhMuc = $("#tenDanhMuc").val();
    var moTa = $("#moTa").val();
    var kichHoat = $('#kichHoat').is(":checked");

    $.ajax({
        url: '/admin/category/create',
        type: 'POST',
        data: {
            Name: tenDanhMuc,
            Description: moTa,
            IsActive: kichHoat
        },
        success: function (data) {
            // console.log("Danh sach du lieu: ", data);
            if (data) {
                /*toastr.success('Thêm danh mục thành công');*/
                alert("Thêm danh mục thành công");
                ResetForm();
                HideModal();
                RenderCategoryList();
            }
        },
        error: function (error) {
            // toastr.error('Thêm danh mục thất bại');
            alert("Thêm danh mục ko thành công");
        }
    });
    
}


// 3. Display category info in popup modal & update category
function Edit(id) {
    console.log(id);
    $.ajax({
        url: '/admin/category/byid?id=' + id,
        type: 'GET',
        success: function (data) {
            console.log(data);
            if (data) {
                // Modal popup
                $("#categoryModal").modal("show");
                $("#staticBackdropLabel").text("Cap nhat danh muc");
                $("#btn-themMoi").css("display", "none");
                $("#btn-capNhat").css("display", "block");

                $('#categoryId').val(data.categoryId);
                $('#tenDanhMuc').val(data.name);
                $('#moTa').val(data.description);
                $('#kichHoat').prop('checked', data.isActive);
            }
            else {
                alert('Không tìm thấy sản phẩm');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function UpdateCategory() {
    console.log("ok")
    var result = Validate();

    if (result === false) return false;

    // Update value
    // Gan value cho bien
    var id = $("#categoryId").val();
    var tenDanhMuc = $("#tenDanhMuc").val();
    var moTa = $("#moTa").val();
    var kichHoat = $('#kichHoat').val();

    $.ajax({
        url: '/admin/category/update',
        type: 'PUT',
        data: {
            CategoryId: id,
            Name: tenDanhMuc,
            Description: moTa,
            IsActived: kichHoat
        },
        success: function (data) {
            console.log(data)
            if (data) {
                // toastr.success('Cập nhật danh mục thành công');
                alert("Cap nhat danh muc thanh cong")
                ResetForm();
                HideModal();
                RenderCategoryList();
            }
        },
        error: function (error) {
            alert('Cập nhật danh mục thất bại');
        }
    });
    
}

// 4. Delete category from db
function Delete(id) {
    // console.log(id)
    $.ajax({
        url: '/admin/category/delete?id=' + id,
        type: 'DELETE',
        success: function (response) {
            if (response) {
                /*toastr.success('Xóa thông tin thành công!');*/
                RenderCategoryList();
                alert("Xóa thông tin thành công!");
            }
            else {
                alert('Xóa sản phẩm thất bại');
            }
        },
        error: function (error) {
            /*toastr.error('Xóa thông tin không thành công!');*/
            console.log(error);
        }
    });
}


// tham khao - xử lý load dữ liệu danh mục cha
function renderCategoryParent() {
    $.ajax({
        url: '/category/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#danhmuccha').append(`
                        <option value="${item.categoryId}">${item.position + " - " + item.categoryName}</option>
                    `);
                });
            }
            else {
                $('#danhmuccha').append(`
                    <option value="">Không có dữ liệu</option>
                `);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// render category type
function RenderProductTypes() {
    $('#danhmuc').empty();
    $.ajax({
        url: '/category/product-type/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#danhmuc').append(`
                                <option value="${item.id}">${item.name}</option>
                            `);
                });
            }
            else {
                $('#danhmuc').append(`
                            <option value="">Không có dữ liệu</option>
                        `);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
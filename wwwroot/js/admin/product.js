$(document).ready(() => {
    RenderProductList();
    renderCategory();
})


// Display modal
$("#btnProduct").click(function () {
    $("#productModal").modal("show");
    $("#staticBackdropLabel").text("Them san pham");
})

// Hide modal
function HideModal() {
    $('#productModal').modal('hide');
}

// Validate inputs
function Validate() {
    var isValid = true;

    if ($("#tenSanPham").val().trim() === "") {
        $("#tenSanPham").css("border-color", "red")
        isValid = false;
    }
    else {
        $("#tenSanPham").css("border-color", "lightgrey")
    }

    if ($("#gia").val().trim() === "") {
        $("#gia").css("border-color", "red")
        isValid = false;
    }
    else {
        $("#gia").css("border-color", "lightgrey")
    }

    return isValid
}

$("#tenDanhMuc").change(function () {
    Validate();
})

$("#gia").change(function () {
    Validate();
})

// Reset form modal
function ResetForm() {
    $('#productId').val('');
    $('#tenSanPham').val('');
    $('#moTa').val('');
    $('#gia').val('');
    $('#kichHoat').prop('checked', true);
    $('#danhMuc').prop('selectedIndex', 0);
    $('#soLuongTonKho').val();
    $('#ngaySanXuat').val();

    $("#tenSanPham").css("border-color", "lightgrey");
    $('#gia').css("border-color", "lightgrey");
}


// 1. Render data from category table
function RenderProductList() {
    $("#productList").empty();
    $.ajax({
        url: "/admin/product/all",
        type: "GET",
        success: function (data) {
            console.log("Danh sach du lieu: ", data);
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#productList').append(`
								<tr>								
                                    <td class="text-center"><input type="checkbox"/></td>
                                    <td>${item.name}</td> 
                                    <td>${item.price.toLocaleString()}</td>
									<td>${item.description ? item.description : "Dang cap nhat"}</td>
                                    <td>${item.image ? item.image : "Dang cap nhat"}</td>
                                    <td>${item.productionDate.toLocaleString()}</td>
                                    <td>${item.inventory}</td>
                                    <td>${item.isAvailable}</td>
									<td class="text-center">
										<button type="button" class="btn btn-primary" onclick="Edit('${item.productId}')">Sửa</button>
										<button type="button" class="btn btn-danger" onclick="Delete('${item.productId}')">Xóa</button>
									</td>
								</tr>
							`);
                });
            }
            else {
                $('#productList').append(`
							<tr>
								<td class="text-center" colspan="6">Khong co du lieu ve san pham</td>
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
function CreateProduct() {
    console.log("click");
    // Validate form inputs
    var result = Validate();
    if (result == false) {
        return false
    }

    // create variables to append to model properties
    var id = $('#productId').val();
    var tenSanPham = $('#tenSanPham').val();
    var gia = $('#gia').val();
    var danhMuc = $('#danhMuc').val();
    var moTa = $('#moTa').val();
    var kichHoat = $('#kichHoat').is(':checked');
    var file = $('#formFile')[0].files[0];
    var soLuongTonKho = $('#soLuongTonKho').val();
    var ngaySanXuat = $('#ngaySanXuat').val();

    $.ajax({
        url: '/admin/product/create',
        type: 'POST',
        data: {
            Name: tenSanPham,
            Price: gia,
            Description: moTa,
            CategoryId: danhMuc,
            Image: file,
            ProductionDate: ngaySanXuat,
            Inventory: soLuongTonKho,
            IsAvailable: kichHoat
        },
        success: function (data) {
            console.log("Danh sach du lieu: ", data);
            if (data) {
                /*toastr.success('Thêm danh mục thành công');*/
                alert("them san pham thành công");
                ResetForm();
                HideModal();
                RenderProductList();
            }
        },
        error: function (error) {
            // toastr.error('Thêm danh mục thất bại');
            alert("Thêm san pham ko thành công");
        }
    });

}


// 3. Display product info in popup modal & update product
function Edit(id) {
    console.log(id);
    $.ajax({
        url: '/admin/product/byid?id=' + id,
        type: 'GET',
        success: function (data) {
            console.log(data);
            if (data) {
                // Modal popup
                $("#productModal").modal("show");
                $("#staticBackdropLabel").text("Cap nhat san pham");
                $("#btn-themMoi").css("display", "none");
                $("#btn-capNhat").css("display", "block");

                $('#productId').val(data.productId);
                $('#tenSanPham').val(data.name);
                $('#danhMuc').val(data.categoryId);
                $('#gia').val(data.price);
                $('#moTa').val(data.description);
                $('#formFile').val(data.image);
                $('#soLuongTonKho').val(data.inventory);
                $('#ngaySanXuat').val(data.productionDate);
                $('#kichHoat').prop('checked', data.isAvailable);
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

function UpdateProduct() {
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
        url: '/admin/product/update',
        type: 'PUT',
        data: {
            ProductId: id,
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
        url: '/admin/product/delete?id=' + id,
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
function renderCategory() {
    $.ajax({
        url: '/admin/category/all',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                data.forEach((item, index) => {
                    $('#danhMuc').append(`
                        <option value="${item.categoryId}">${item.name}</option>
                    `);
                });
            }
            else {
                $('#danhMuc').append(`
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
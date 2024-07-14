namespace Project.OnlineStore.Services
{
    public class FilesManagement
    {
        private static string wwwroot = Directory.GetCurrentDirectory() + "\\wwwroot";

        public static string UploadImage(IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                string urlPath = "";
                string id = Guid.NewGuid().ToString();

                string filePath = Path.Combine(wwwroot, "images", id + "-" + image.FileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    image.CopyTo(fileStream);
                    urlPath = Path.Combine("\\images", id + "-" + image.FileName);
                }
                return urlPath;

            }

            return null;
        }

        public static bool RemoveImage(string url)
        {
            string filePath = wwwroot + url;
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return true;
            }
            return false;
        }
    }
}

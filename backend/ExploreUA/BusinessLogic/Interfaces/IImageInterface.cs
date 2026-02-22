using BusinessLogic.DTO_s;
using DataAccess.Data.Entities;
using DataAccess.Data.Extities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IImageInterface
    {
        Task<IEnumerable<ImageDto>> Get_Images();
        Task<CreateImageDto> Add_Image(IFormFile file, int GeometerId);
        Task<ImageDto> Update_Image(int Id, IFormFile? file, string? Img_Url, int GeometerId); 
        Task<bool> Remove_Image(int Id);
    }
}

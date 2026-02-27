using AutoMapper;
using BuisnessLogic;
using BusinessLogic.DTO_s;
using BusinessLogic.Interfaces;
using DataAccess.Data;
using DataAccess.Data.Entities;
using DataAccess.Data.Extities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class ImageService : IImageInterface
    {

        private readonly IConfiguration _config;
        private readonly ExploreUaDbContext _context;
        private readonly IMapper _mapper;
        private readonly IBlobInterface _blobInterface;
        public ImageService(ExploreUaDbContext context, IMapper mapper, IConfiguration config, IBlobInterface blobInterface)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
            _blobInterface = blobInterface;
        }

        public async Task<IEnumerable<ImageDto>> Get_Images()
        {
            var images = _context.Images.ToList();
            if (images == null) throw new HttpException("Помилка: Ні одну картинку не знайденно", HttpStatusCode.NotFound);
            return _mapper.Map<IEnumerable<ImageDto>>(images);
        }

    
        public async Task<CreateImageDto> Add_Image(IFormFile file, int GeometerId)
        {

            var ulr = await _blobInterface.UploadBlobAsync(file);
            var image = new CreateImageDto
            {
                ImgUrl = ulr,
                GeometerId = GeometerId
            };

            await _context.Images.AddAsync(_mapper.Map<Image>(image));
            await _context.SaveChangesAsync();

            return image;
        }
        public async Task<ImageDto> Update_Image(int Id, IFormFile? file, string? Img_Url, int GeometerId)
        {
            var image = _context.Images.FirstOrDefault(q => q.Id == Id);
            if (image == null) throw new HttpException($"Помилка: Картинку з ID {Id} не знайдено.", HttpStatusCode.NotFound);


            if (string.IsNullOrWhiteSpace(Img_Url))
            {
                if (file == null) throw new HttpException($"Помилка: Ви не передали жодного файлу.", HttpStatusCode.NotFound);
                var ulr = await _blobInterface.UploadBlobAsync(file);
                image.GeometerId = GeometerId;
                image.ImgUrl = ulr;
            }
            else
            {
                image.GeometerId = GeometerId;
                image.ImgUrl = Img_Url;
            }

            await _context.SaveChangesAsync();

            return _mapper.Map<ImageDto>(image);
        }

        public async Task<bool> Remove_Image(int Id)
        {
            var image = _context.Images.FirstOrDefault(q => q.Id == Id);
            if (image == null) throw new HttpException($"Помилка: Картинку з ID {Id} не знайдено.", HttpStatusCode.NotFound);


            if (image == null) return false;
                

            _context.Images.Remove(image);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}

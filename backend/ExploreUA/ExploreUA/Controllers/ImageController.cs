using AutoMapper;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using BusinessLogic.DTO_s;
using BusinessLogic.Interfaces;
using DataAccess.Data;
using DataAccess.Data.Extities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExploreUA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {

        private readonly IConfiguration _config;
        private readonly ExploreUaDbContext _context;
        private readonly IMapper _mapper;
        private readonly IBlobInterface _blobInterface;
        private readonly IImageInterface _imageService;
        public ImageController(ExploreUaDbContext context,IMapper mapper,IConfiguration config, IBlobInterface blobInterface,IImageInterface imageInterface)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
            _blobInterface = blobInterface;
            _imageService = imageInterface;
        }


        [HttpGet("Get_Images")]
        public async Task<ActionResult<IEnumerable<ImageDto>>> Get_Images()
        {
            var result = await _imageService.Get_Images();

            return Ok(result);
        }

        [HttpPost("Add_Image")]
        public async Task<ActionResult<CreateImageDto>> Add_Image(IFormFile file, int GeometerId)
        {
            var result = await _imageService.Add_Image(file, GeometerId);

            return Ok(result);
        }

        [HttpPut("Update_Image")]
        public async Task<ActionResult<ImageDto>> Update_Image(int Id,IFormFile? file,string? Img_Url, int GeometerId)
        {

            var result = await _imageService.Update_Image(Id, file, Img_Url, GeometerId);

            return Ok(result);
        }

        [HttpDelete("Remove_Image")]
        public async Task<ActionResult<bool>> Remove_Image(int Id)
        {
            
            var result = await _imageService.Remove_Image(Id);

            return Ok(result);
        }
    }
}

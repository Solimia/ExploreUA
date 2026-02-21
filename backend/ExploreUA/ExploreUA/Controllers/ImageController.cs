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
        public ImageController(ExploreUaDbContext context,IMapper mapper,IConfiguration config, IBlobInterface blobInterface)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
            _blobInterface = blobInterface;
        }


        [HttpGet("Get_Images")]
        public IEnumerable<ImageDto> Get_Images()
        {
            var images = _context.Images.ToList();

            return _mapper.Map<IEnumerable<ImageDto>>(images);
        }

        [HttpPost("Add_Image")]
        public async Task<IActionResult> Add_Image(IFormFile file, int GeometerId)
        {

            var ulr = await _blobInterface.UploadBlobAsync(file);
            var image = new CreateImageDto
            {
                ImgUrl = ulr,
                GeometerId = GeometerId
            };
         
            _context.Images .Add(_mapper.Map<Image>(image));
            _context.SaveChanges();

            return Ok(image);
        }

        [HttpPut("Update_Image")]
        public async Task<IActionResult> Update_Image(int Id,IFormFile? file,string? Img_Url, int GeometerId)
        {

            var image = _context.Images.FirstOrDefault(q => q.Id == Id);

            if (image == null)
                return NotFound();
           

            if (string.IsNullOrWhiteSpace(Img_Url))
            {
                var ulr = await _blobInterface.UploadBlobAsync(file);
                image.GeometerId = GeometerId;
                image.ImgUrl = ulr;
            }
            else
            {
                image.GeometerId = GeometerId;
                image.ImgUrl = Img_Url;
            }
     
            _context.SaveChanges();

            return Ok(_mapper.Map<ImageDto>(image));
        }

        [HttpDelete("Remove_Image")]
        public ActionResult<CreateImageDto> Remove_Image(int Id)
        {
            var image = _context.Images.FirstOrDefault(q => q.Id == Id);

            if (image == null)
                return NotFound();

            _context.Images.Remove(image);

            _context.SaveChanges();

            return Ok(image);
        }
    }
}

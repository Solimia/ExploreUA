using AutoMapper;
using BusinessLogic.DTO_s;
using BusinessLogic.Interfaces;
using BusinessLogic.Services;
using DataAccess.Data;
using DataAccess.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace ExploreUA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeometerController : Controller
    {
        private readonly ExploreUaDbContext _context;
        private readonly IMapper _mapper;
        private readonly IGeometerInterface _geometerService;

        public GeometerController(ExploreUaDbContext context, IMapper mapper, IGeometerInterface geometerService)
        {
            _context = context;
            _mapper = mapper;
            _geometerService = geometerService;
        }
        [HttpGet(Name = "Get_Geometer")]
        public async Task<ActionResult<IEnumerable<GeometerDto>>> Get_Geometer()
        {
            var result = await _geometerService.Get_Geometer();
            return Ok(result);
        }

        [HttpGet("Get_Geometer_By_Id")]
        public async Task<ActionResult<IEnumerable<GeometerDto>>> Get_Geometer_By_Id(int Id)
        {
            var result = await _geometerService.Get_Geometer_By_Id(Id);
            return Ok(result);
        }

        [HttpGet("Get_Geometer_From_Title")]
        public async Task<ActionResult<IEnumerable<GeometerDto>>> Get_Geometer_From_Title(string Title)
        {
            var result = await _geometerService.Get_Geometer_From_Title(Title);
            return Ok(result);
        }
        [HttpGet("Get_Geometer_From_Description")]
        public async Task<ActionResult<IEnumerable<GeometerDto>>> Get_Geometer_From_Description(string Description)
        {
            var result = await _geometerService.Get_Geometer_From_Description(Description);
            return Ok(result);
        }


        [HttpPost("add")]
        public async Task<ActionResult<Geometer>> Add_Geometer(string name, string description, double lat, double lon)
        {
            var result = await _geometerService.Add_Geometer(name, description, lat, lon);

            return Ok(result);
        }
        [HttpPut("edit")]

        public async Task<ActionResult<Geometer>> Edit_Geometer(int id, string name, string description, double lat, double lon)
        {
            var result = await _geometerService.Edit_Geometer(id, name, description, lat, lon);

            return Ok(result);
        }

        [HttpDelete("delete")]

        public async Task<ActionResult<bool>> DeleteById_Geometer(int id)
        {

            var result = await _geometerService.DeleteById_Geometer(id);

            return Ok(result);
        }
    }
}

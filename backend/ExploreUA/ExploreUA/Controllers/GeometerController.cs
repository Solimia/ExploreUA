using DataAccess.Data;
using DataAccess.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExploreUA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeometerController : Controller
    {
        private readonly ExploreUaDbContext _context;

        public GeometerController(ExploreUaDbContext context)
        {
            _context = context;
        }
        [HttpGet(Name = "Get_Geometer")]
        public IEnumerable<Geometer> Get_Geometer()
        {
            return _context.Geometers.ToList();
        }
        [HttpPost("add")]
        public Geometer Add_Geometer(string name, string description, double lat, double lon)
        {
            var newgeometer = new Geometer
            {
                Name = name,
                Description = description,
                Latitude = lat,
                Longitude = lon
            };

            _context.Geometers.Add(newgeometer);
            _context.SaveChanges();

            return newgeometer;
        }
        [HttpPut("edit")]

        public ActionResult<Geometer> Edit_Geometer(int id, string name, string description, double lat, double lon)
        {

            var geometer = _context.Geometers.FirstOrDefault(g => g.Id == id);

            if (geometer == null)
                return BadRequest("Geometer not found");

            geometer.Name = name;
            geometer.Description = description;
            geometer.Latitude = lat;
            geometer.Longitude = lon;


            _context.SaveChanges();

            return Ok(geometer);
        }

        [HttpDelete("delete")]

        public ActionResult<Geometer> DeleteById_Geometer(int id)
        {

            var geometer = _context.Geometers.FirstOrDefault(g => g.Id == id);


            if (geometer == null)
                return BadRequest("Geometer not found");

            _context.Geometers.Remove(geometer);

            _context.SaveChanges();

            return Ok(geometer);
        }
    }
}

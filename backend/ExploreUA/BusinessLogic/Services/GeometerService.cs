using AutoMapper;
using BusinessLogic.DTO_s;
using BusinessLogic.Interfaces;
using DataAccess.Data;
using DataAccess.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class GeometerService : IGeometerInterface
    {
        private readonly ExploreUaDbContext _context;
        private readonly IMapper _mapper;

        public GeometerService(ExploreUaDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<IEnumerable<GeometerDto>> Get_Geometer()
        {

            var geometers = _context.Geometers.Include(x => x.Images).ToList();
            return _mapper.Map<IEnumerable<GeometerDto>>(geometers);
        }

        public async Task<IEnumerable<GeometerDto>> Get_Geometer_From_Title(string Title)
        {

            var geometers = await _context.Geometers.Include(x => x.Images).Where(x => x.Name.Contains(Title)).ToListAsync();
            return _mapper.Map<IEnumerable<GeometerDto>>(geometers);
        }
        public async Task<IEnumerable<GeometerDto>> Get_Geometer_From_Description(string Description)
        {
            var geometers = await _context.Geometers.Include(x => x.Images).Where(x => x.Description.Contains(Description)).ToListAsync();
            return _mapper.Map<IEnumerable<GeometerDto>>(geometers);
        }
  

        public async Task<Geometer> Add_Geometer(string name, string description, double lat, double lon)
        {
            var newgeometer = new Geometer
            {
                Name = name,
                Description = description,
                Latitude = lat,
                Longitude = lon
            };

            await _context.Geometers.AddAsync(newgeometer);
            await _context.SaveChangesAsync();

            return newgeometer;
        }
    

        public async Task<Geometer?> Edit_Geometer(int id, string name, string description, double lat, double lon)
        {

            var geometer = _context.Geometers.FirstOrDefault(g => g.Id == id);

            if (geometer == null) return null;

            geometer.Name = name;
            geometer.Description = description;
            geometer.Latitude = lat;
            geometer.Longitude = lon;


            await _context.SaveChangesAsync();

            return geometer;
        }
        public async Task<bool> DeleteById_Geometer(int id)
        {

            var geometer = _context.Geometers.FirstOrDefault(g => g.Id == id);


            if (geometer == null) return false;

            _context.Geometers.Remove(geometer);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}

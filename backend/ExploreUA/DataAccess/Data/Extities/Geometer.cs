using DataAccess.Data.Extities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data.Entities
{
    public class Geometer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Region { get; set; }
        public string Description { get; set; }
        public string DetailedDescription { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<Image> Images { get; set; } = new List<Image>();

    }
}

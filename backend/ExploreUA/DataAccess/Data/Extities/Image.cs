using DataAccess.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data.Extities
{
    public class Image
    {
        public int Id { get; set; }
        public string ImgUrl { get; set; }
        public int GeometerId { get; set; }
        public Geometer? Geometer { get; set; }
    }
}

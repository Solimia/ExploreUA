using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.DTO_s
{
    public class UpdateImageDto
    {
        public int Id { get; set; }
        public string ImgUrl { get; set; }
        public int GeometerId { get; set; }
    }
}

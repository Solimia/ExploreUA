using BusinessLogic.DTO_s;
using DataAccess.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IGeometerInterface
    {
        Task<IEnumerable<GeometerDto>> Get_Geometer();
        Task<GeometerDto> Get_Geometer_By_Id(int id);
        Task<IEnumerable<GeometerDto>> Get_Geometer_From_Title(string Title);

        Task<IEnumerable<GeometerDto>> Get_Geometer_From_Description(string Description);

        Task<Geometer> Add_Geometer(string name, string description, double lat, double lon);
        Task<Geometer?> Edit_Geometer(int id, string name, string description, double lat, double lon);
        Task<bool> DeleteById_Geometer(int id);
    }
}

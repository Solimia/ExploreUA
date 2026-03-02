using DataAccess.Data.Entities;
using DataAccess.Data.Extities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IJwtService
    {
        Task<IEnumerable<Claim>> GetClaims(User user);
        string GenerateToken(IEnumerable<Claim> claims);

        RefreshToken GenerateRefreshToken(string ipAddress);

    }
}

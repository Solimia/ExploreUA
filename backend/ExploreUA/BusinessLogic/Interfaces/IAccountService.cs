using BusinessLogic.DTO_s.Account;
using DataAccess.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface IAccountService
    {
        Task Register(RegisterModel model);
        Task<LoginModelResponse> Login(LoginModel model, string? IpAddress);
        Task Logout(LogoutModel model);
        Task<LoginModelResponse> Refresh(string refreshToken, string? IpAddress);
        Task<IEnumerable<User>> Get_Accounts();

        Task<UserProfileDto> GetProfile(string userId);
    }
}

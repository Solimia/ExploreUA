using AutoMapper;
using BuisnessLogic;
using BusinessLogic.DTO_s;
using BusinessLogic.DTO_s.Account;
using BusinessLogic.Interfaces;
using DataAccess.Data;
using DataAccess.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class AccountService : IAccountService
    {
        private readonly ExploreUaDbContext ctx;

        public IJwtService jwtService { get; }
        public UserManager<User> userManager { get; }
        public SignInManager<User> signInManager { get; }
        public IMapper mapper { get; }

        private readonly ExploreUaDbContext _context;

        public AccountService(IJwtService jwtService, UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, ExploreUaDbContext ctx,ExploreUaDbContext _context)
        {
            this.jwtService = jwtService;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.ctx = ctx;
            this._context = _context;


        }

        public async Task<LoginModelResponse> Refresh(string refreshToken, string? IpAddress)
        {
            var user = await userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(m => m.Token == refreshToken));

            if (user == null)
            {
                throw new HttpException("Invalid User", HttpStatusCode.Unauthorized);
            }
            var token = ctx.RefreshTokens.Single(x => x.Token == refreshToken);
            if (token == null || token.IsExpired)
            {
                throw new HttpException("Invalid refresh token", HttpStatusCode.Unauthorized);
            }


            var newJwt = jwtService.GenerateToken(await jwtService.GetClaims(user));
            var newRefresh = jwtService.GenerateRefreshToken(IpAddress ?? "Unknown");
            user.RefreshTokens.Add(newRefresh);
            await ctx.SaveChangesAsync();


            return new()
            {
                AccesessToken = newJwt,
                RefreshToken = newRefresh.Token
            };
        }
        public async Task<LoginModelResponse> Login(LoginModel model, string? IpAddress)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
                throw new HttpException("Invalid email", HttpStatusCode.BadRequest);
            var newRefresh = jwtService.GenerateRefreshToken(IpAddress ?? "Unknown");
            user.RefreshTokens.Add(newRefresh);
            await ctx.SaveChangesAsync();


            //await signInManager.SignInAsync(user,true);

            return new()
            {
                AccesessToken = jwtService.GenerateToken(await jwtService.GetClaims(user)),
                RefreshToken = newRefresh.Token,
                Role = await userManager.GetRolesAsync(user),

            };

        }
        public async Task Register(RegisterModel model)
        {
            var user = mapper.Map<User>(model);
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                throw new HttpException(result.Errors.FirstOrDefault()?.Description ?? "Error", HttpStatusCode.BadRequest);

        }
        public async Task Logout(LogoutModel model)
        {
            await signInManager.SignOutAsync();

        }
        public async Task<IEnumerable<User>> Get_Accounts()
        {

            var geometers = _context.Users.ToList();
            if (geometers == null) throw new HttpException("Помилка: Ні одну геометку не знайденно", HttpStatusCode.NotFound);

            return geometers;
        }
        public async Task<UserProfileDto> GetProfile(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null; 
            }
            var profile = new UserProfileDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                HasPaid = user.HasPaid
            };
            return profile;
        }

    }
}

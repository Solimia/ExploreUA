using BusinessLogic.DTO_s;
using DataAccess.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExploreUA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public PaymentsController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("unlock-all")]
        public async Task<IActionResult> UnlockAll([FromBody] CryptoDto request)
        {
            if (string.IsNullOrEmpty(request.TransactionHash))
            {
                return BadRequest("Хеш транзакції обов'язковий.");
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("Користувача не знайдено.");
            }
            user.HasPaid = true;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok(new { message = "Доступ успішно розблоковано!" });
            }

            return StatusCode(500, "Помилка при оновленні статусу користувача.");
        }
    }
}

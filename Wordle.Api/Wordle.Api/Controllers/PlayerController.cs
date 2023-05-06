using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wordle.Api.Data;
using Wordle.Api.Dtos;
using Wordle.Api.Services;

namespace Wordle.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerService _playerService;

        public PlayerController(PlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet("GetTopPlayers")]
        public async Task<IEnumerable<Player>> GetTopPlayers()
        {
            return await _playerService.GetTopPlayers(10);
        }

        [HttpPost]
        public async Task<Player> AddPlayer([FromBody]PlayerDto player)
        {
            return await _playerService.AddPlayer(player.PlayerName, player.GameCount, player.AverageAttempts);
        }
    }
}
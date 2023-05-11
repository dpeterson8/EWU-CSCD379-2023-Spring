using Microsoft.EntityFrameworkCore;
using Wordle.Api.Data;

namespace Wordle.Api.Services
{
    public class PlayerService
    {
        private readonly AppDbContext _db;

        public PlayerService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Player>> GetTopPlayers(int? count)
        {
            count ??= 10;
            var players = await _db.Players
                .OrderBy(p => p.AverageAttempts)
                .Take(count.Value)
                .ToListAsync();
            return players;
        }

        public async Task<Player> AddPlayer(string? playerName, int gameCount, double avgAttempt)
        {
            if (playerName is null)
            {
                throw new ArgumentNullException("player name can not be null");
            }
            var player = await _db.Players.FirstOrDefaultAsync(p => p.PlayerName == playerName);
            if (player != null) 
            {
                player.AverageAttempts = (player.GameCount * player.AverageAttempts + avgAttempt) / (player.GameCount + 1);
                player.GameCount++;
            }
            else
            {
                player = new()
                {
                    PlayerName = playerName,
                    GameCount = 1,
                    AverageAttempts = avgAttempt
                };
                _db.Players.Add(player);
            }
            await _db.SaveChangesAsync();
            return player;
        }
    }
}
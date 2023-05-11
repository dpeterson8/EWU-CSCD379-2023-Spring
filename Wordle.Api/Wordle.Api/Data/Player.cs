using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Wordle.Api.Data
{
    public class Player
    {

        public int PlayerId { get; set; }
        public required string PlayerName { get; set; }
        public int GameCount { get; set; }
        public double AverageAttempts { get; set; }

    }
}
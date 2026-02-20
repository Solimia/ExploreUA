using DataAccess.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data
{
    public static class DbInitializer
    {
        public static void SeedGeometers(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Geometer>().HasData(
                new Geometer
                {
                    Id = 1,
                    Name = "Kyiv Central Office",
                    Description = "Головний офіс оренди в центрі столиці",
                    Latitude = 50.4526,
                    Longitude = 30.5144
                },
                new Geometer
                {
                    Id = 2,
                    Name = "Kyiv Branch North",
                    Description = "Північне відділення",
                    Latitude = 50.4600,
                    Longitude = 30.5200
                }
            );
        }

    }
}

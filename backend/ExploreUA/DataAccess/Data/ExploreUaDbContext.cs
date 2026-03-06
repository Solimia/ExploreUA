using DataAccess.Data.Entities;
using DataAccess.Data.Extities;

//using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Data
{
    public class ExploreUaDbContext : IdentityDbContext<User>
    {
        public ExploreUaDbContext() { }
        public ExploreUaDbContext(DbContextOptions<ExploreUaDbContext> options) : base(options) { }

        public DbSet<Geometer> Geometers { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.SeedGeometers();
            modelBuilder.SeedImages();

        }
    }
}

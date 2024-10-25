using System.Reflection;
using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.EF;

public class LunchAppDbContext : DbContext
{
    public DbSet<Person> Persons { get; set; }
    public DbSet<LunchRecord> LunchRecords { get; set; }

    public LunchAppDbContext(DbContextOptions<LunchAppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(modelBuilder);
    }
}
using AddressApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressApp.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Address> Addresses { get; set; }
}
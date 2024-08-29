using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;
public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Bug> Bugs { get; set; }
    public DbSet<BugComment> BugComments { get; set; }
    public DbSet<ProjectComment> ProjectComments { get; set; }
    public DbSet<BugAssignee> BugAssignees { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Bug> ()
            .HasMany(u => u.BugAssignees)
            .WithOne(b => b.Bug)
            .HasForeignKey(u => u.BugId);
    }
}

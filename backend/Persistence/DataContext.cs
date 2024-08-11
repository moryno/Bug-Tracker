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
    public DbSet<UserProject> UserProjects { get; set; }
    public DbSet<BugComment> BugComments { get; set; }
    public DbSet<ProjectComment> ProjectComments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserProject>(x => x.HasKey(ua => new
        {
            ua.AppUserId,
            ua.ProjectId
        }));
        builder.Entity<UserProject>()
            .HasOne(a => a.AppUser)
            .WithMany(u => u.UserProjects)
            .HasForeignKey(a => a.AppUserId);
        builder.Entity<UserProject>()
            .HasOne(p => p.Project)
            .WithMany(u => u.UserProjects)
            .HasForeignKey(p => p.ProjectId);

        builder.Entity<BugComment>(x => x.HasKey(bc => new
        {
            bc.AppUserId,
            bc.BugId
        }));
        builder.Entity<BugComment>()
            .HasOne(b => b.Bug)
            .WithMany(bc => bc.BugComments)
            .HasForeignKey(b => b.BugId);
        builder.Entity<BugComment>()
            .HasOne(a => a.AppUser)
            .WithMany(bc => bc.BugComments)
            .HasForeignKey(a => a.AppUserId);

        builder.Entity<ProjectComment>(x => x.HasKey(pc => new
        {
            pc.AppUserId,
            pc.ProjectId
        }));
        builder.Entity<ProjectComment>()    
            .HasOne(a => a.AppUser)
            .WithMany(pc => pc.ProjectComments)
            .HasForeignKey(a => a.AppUserId);
        builder.Entity<ProjectComment>()
            .HasOne(p => p.Project)
            .WithMany(pc => pc.ProjectComments)
            .HasForeignKey(p => p.ProjectId);
    }
}

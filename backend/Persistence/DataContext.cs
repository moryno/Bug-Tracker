using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;
public class DataContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Company> Companies { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Bug> Bugs { get; set; }
    public DbSet<BugComment> BugComments { get; set; }
    public DbSet<ProjectComment> ProjectComments { get; set; }
    public DbSet<BugAssignee> BugAssignees { get; set; }
    public DbSet<Photo> Photos { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Bug> ()
            .HasMany(u => u.BugAssignees)
            .WithOne(b => b.Bug)
            .HasForeignKey(u => u.BugId);     
        builder.Entity<Bug> ()
            .HasOne(u => u.Company)
            .WithMany(b => b.Bugs)
            .HasForeignKey(u => u.CompanyId);
        builder.Entity<Project>()
              .HasOne(p => p.Company)
              .WithMany(c => c.Projects)
              .HasForeignKey(p => p.CompanyId);

        builder.Entity<AppUserRole>()
            .HasOne(ur => ur.User)
            .WithMany(u => u.UserRoles)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();

        builder.Entity<AppUserRole>()
            .HasOne(ur => ur.Role)
            .WithMany(r => r.UserRoles)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();

        // Configure the one-to-one relationship between AppRole and Company
        builder.Entity<AppRole>()
            .HasOne(r => r.Company)
            .WithMany(o => o.Roles)
            .HasForeignKey(r => r.CompanyId);

        // Configure the one-to-many relationship between AppUser and Company
        builder.Entity<AppUser>()
            .HasOne(u => u.Company)
            .WithMany(o => o.Users)
            .HasForeignKey(u => u.CompanyId);
    }
}

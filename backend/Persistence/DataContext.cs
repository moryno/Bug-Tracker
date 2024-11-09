using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

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
    public DbSet<Event> Events { get; set; }
    public DbSet<EventAttendee> EventAttendees { get; set; }
    public DbSet<EventComment> EventComments { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Bug> ()
            .HasMany(u => u.BugAssignees)
            .WithOne(b => b.Bug)
            .HasForeignKey(u => u.BugId)
            .OnDelete(DeleteBehavior.Cascade);
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

        builder.Entity<AppRole>()
            .HasOne(r => r.Company)
            .WithMany(o => o.Roles)
            .HasForeignKey(r => r.CompanyId);

        builder.Entity<AppUser>()
            .HasOne(u => u.Company)
            .WithMany(o => o.Users)
            .HasForeignKey(u => u.CompanyId);

        builder.Entity<EventAttendee>()
            .HasKey(ea => new { ea.EventId, ea.AppUserId });

        builder.Entity<EventAttendee>()
            .HasOne(ea => ea.Event)
            .WithMany(e => e.Attendees)
            .HasForeignKey(ea => ea.EventId);

        builder.Entity<Event>()
            .HasOne(ea => ea.Company)
            .WithMany(au => au.Events)
            .HasForeignKey(ea => ea.CompanyId); 

        builder.Entity<EventAttendee>()
            .HasOne(ea => ea.AppUser)
            .WithMany(au => au.Events)
            .HasForeignKey(ea => ea.AppUserId);

        builder.Entity<Notification>()
        .HasOne(n => n.Recipient)
        .WithMany(u => u.NotificationsReceived)
        .HasForeignKey(n => n.RecipientId)
        .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Notification>()
            .HasOne(n => n.Sender)
            .WithMany(u => u.NotificationsSent)
            .HasForeignKey(n => n.SenderId)
            .OnDelete(DeleteBehavior.Restrict); 

        builder.Entity<Notification>()
            .HasOne(n => n.Event)
            .WithMany(e => e.Notifications)
            .HasForeignKey(n => n.EventId)
            .OnDelete(DeleteBehavior.Cascade);

    }
}

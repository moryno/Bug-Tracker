using FluentValidation.AspNetCore;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using static Application.Projects.Create;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.AspNetCore.Authentication;
using Application.Interfaces;
using Infrastructure.Security;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Infrastructure.Photos;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;
using Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var environment = builder.Environment.EnvironmentName.ToLower();
builder.Configuration.AddSystemsManager($"/{environment}/Bugtracker");

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

/*****************************  START OF CONFIGURATIONS BY AUTHOR: MAURICE ***************************/
//var token = builder.Configuration["Client:URL"];
//Console.WriteLine($"Token: {token}"); 
//Console.WriteLine($"Token: {token}"); 

builder.Services.AddDbContext<DataContext>(option =>
{
    option.UseLazyLoadingProxies();
    option.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});
// add cors policy

builder.Services.AddCors(option =>
{
    option.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins(
            environment == "production" ? builder.Configuration["Client:URL"]! : "http://localhost:3000");
    });
});
//Add MediatR and AutoMapper

builder.Services.AddMediatR(typeof(List.Handler).Assembly);
builder.Services.AddAutoMapper(typeof(List.Handler));   

// Use the Fluent Validator

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CommandValidator>();
//Use Identity Core

//var identityBld = builder.Services.AddIdentityCore<AppUser>();
//var identityBuilder = new IdentityBuilder(identityBld.UserType, identityBld.Services);
//identityBuilder.AddEntityFrameworkStores<DataContext>();
//identityBuilder.AddSignInManager<SignInManager<AppUser>>();
//builder.Services.TryAddSingleton<ISystemClock, SystemClock>();
// Register Identity Core with support for roles and user management
var identityBuilder = builder.Services.AddIdentityCore<AppUser>(options =>
{
    // Configure identity options here if needed (e.g., password policies, lockout options, etc.)
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.SignIn.RequireConfirmedEmail = true;
    options.Password.RequiredLength = 6;
})
.AddRoles<AppRole>() // This adds support for roles
.AddEntityFrameworkStores<DataContext>() // Add Entity Framework for user/role management
.AddDefaultTokenProviders() //Used to add token authorization for change passwords, email, phone number, 2 factor auth confirmation
.AddSignInManager<SignInManager<AppUser>>(); // Add SignInManager to manage sign-in functionalities
identityBuilder.AddRoleManager<RoleManager<AppRole>>(); // Add the role manager for managing roles
identityBuilder.AddUserManager<UserManager<AppUser>>();
builder.Services.TryAddSingleton<ISystemClock, SystemClock>(); // Add ISystemClock singleton for token and lockout functionality


// Add Authentication
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateAudience = false,
            ValidateIssuer = false,
            RoleClaimType = ClaimTypes.Role
        };
    });
builder.Services.AddAuthorization(opt =>
{
    opt.AddPolicy("IsProjectOwner", policy =>
    {
        policy.Requirements.Add(new IsOwnerRequirement());
    });
});
builder.Services.AddTransient<IAuthorizationHandler, IsOwnerRequirementHandler>();


// Scopes

builder.Services.AddScoped<IJwtGenerator, JwtGenerator>();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddScoped<IPhotoAccessor, PhotoAccessor>();
builder.Services.AddScoped<IEmailSender, EmailSender>();
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("Cloudinary"));


/*****************************  END OF CONFIGURATIONS BY AUTHOR: MAURICE ***************************/

var app = builder.Build();
// Use the middleware(Author: Maurice).
app.UseMiddleware<ErrorHandlingMiddleware>();

//app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();

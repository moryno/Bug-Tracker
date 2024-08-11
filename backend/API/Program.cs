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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

/*****************************  START OF CONFIGURATIONS BY AUTHOR: MAURICE ***************************/




builder.Services.AddDbContext<DataContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// add cors policy

builder.Services.AddCors(option =>
{
    option.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
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

var identyBld = builder.Services.AddIdentityCore<AppUser>();
var identityBuilder = new IdentityBuilder(identyBld.UserType, identyBld.Services);
identityBuilder.AddEntityFrameworkStores<DataContext>();
builder.Services.TryAddSingleton<ISystemClock, SystemClock>();
identityBuilder.AddSignInManager<SignInManager<AppUser>>();

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
            ValidateIssuer = false
        };
    });

// Scopes

builder.Services.AddScoped<IJwtGenerator, JwtGenerator>();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();



/*****************************  END OF CONFIGURATIONS BY AUTHOR: MAURICE ***************************/

var app = builder.Build();
// Use the middleware(Author: Maurice).
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();

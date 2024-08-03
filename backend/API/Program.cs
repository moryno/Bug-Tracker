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
// add cors policy(Author: Maurice).
builder.Services.AddCors(option =>
{
    option.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});
//adMediatR
builder.Services.AddMediatR(typeof(List.Handler).Assembly);
// Use the Fluent Validator(Author: Maurice).
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CommandValidator>();
//Use Identity Core
var identyBld = builder.Services.AddIdentityCore<AppUser>();
var identityBuilder = new IdentityBuilder(identyBld.UserType, identyBld.Services);
identityBuilder.AddEntityFrameworkStores<DataContext>();
builder.Services.TryAddSingleton<ISystemClock, SystemClock>();
identityBuilder.AddSignInManager<SignInManager<AppUser>>();

/*****************************  END OF CONFIGURATIONS BY AUTHOR: MAURICE ***************************/

var app = builder.Build();
// Use the middleware(Author: Maurice).
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

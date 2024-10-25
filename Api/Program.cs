using Api;
using Api.EF;
using Api.Repositories;
using Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString(AppConfigurationConstants.DbConnectionString);

builder.Services.AddDbContext<LunchAppDbContext>(options => options.UseNpgsql(connectionString));

builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<ILunchRecordRepository, LunchRecordRepository>();
builder.Services.AddScoped<IPersonService, PersonService>();
builder.Services.AddScoped<ILunchRecordService, LunchRecordService>();

builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
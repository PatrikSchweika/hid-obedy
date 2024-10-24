using Api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Controller]
[Route("[controller]")]
public class LunchRecordController
{
    [HttpGet("{userId}")]
    public async Task<LunchRecord[]> GetForUser(int userId)
    {
        return [];
    }

    [HttpPost]
    public async Task Post([FromBody] LunchRecord record)
    {
        
    }
}
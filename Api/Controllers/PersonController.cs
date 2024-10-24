using Api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Controller]
[Route("[controller]")]
public class PersonController
{

    
    [HttpGet]
    public async Task<Person[]> Get()
    {
        return [];
    }
}
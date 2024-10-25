using Api.DTOs;
using Api.Entities;
using Api.Repositories;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Controller]
[Route("[controller]")]
public class PersonController(IPersonService service)
{
    [HttpPost]
    public Person Post([FromBody] CreatePerson person)
    {
        return service.Add(person);
    }

    [HttpGet]
    public IEnumerable<Person> Get()
    {
        return service.FindAll();
    }
}
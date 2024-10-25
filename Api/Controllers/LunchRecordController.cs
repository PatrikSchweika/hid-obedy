using Api.DTOs;
using Api.Entities;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Controller]
[Route("[controller]")]
public class LunchRecordController(ILunchRecordService service)
{
    [HttpGet("/user/{personId}")]
    public IEnumerable<PersonLunchRecord> GetByPerson(int personId)
    {
        return service.FindByPersonId(personId);
    }

    [HttpPost]
    public void Post([FromBody] CreateLunchRecord record)
    {
        service.Add(record);
    }
}
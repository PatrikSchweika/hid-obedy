using Api.DTOs;
using Api.Entities;

namespace Api.Services;

public interface IPersonService
{
    IEnumerable<Person> FindAll();

    Person Add(CreatePerson person);
}
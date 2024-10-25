using Api.DTOs;
using Api.Entities;
using Api.Repositories;

namespace Api.Services;

public class PersonService(IPersonRepository repository) : IPersonService
{
    public IEnumerable<Person> FindAll()
    {
        return repository.FindAll();
    }

    public Person Add(CreatePerson person)
    {
        var entity = new Person()
        {
            Name = person.Name,
            ConsumedLunchRecords = [],
            PaidLunchRecords = []
        };

        var addedPerson = repository.AddPerson(entity);

        repository.SaveChanges();

        return addedPerson;
    }
}
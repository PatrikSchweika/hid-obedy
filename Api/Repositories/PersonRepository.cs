using Api.EF;
using Api.Entities;

namespace Api.Repositories;

public class PersonRepository(LunchAppDbContext dbContext) : IPersonRepository
{
    public Person AddPerson(Person person)
    {
        var entry = dbContext.Persons.Add(person);

        return entry.Entity;
    }

    public ICollection<Person> FindAll()
    {
        return dbContext.Persons.ToList();
    }

    public Person? FindById(int id)
    {
        return dbContext.Persons.Find(id);
    }

    public ICollection<Person> FindByIds(ICollection<int> ids)
    {
        return dbContext.Persons.Where(person => ids.Contains(person.Id)).ToList();
    }

    public void SaveChanges()
    {
        dbContext.SaveChanges();
    }
}
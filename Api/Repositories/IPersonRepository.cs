using Api.Entities;

namespace Api.Repositories;

public interface IPersonRepository
{
    Person AddPerson(Person person);
    ICollection<Person> FindAll();

    Person? FindById(int id);

    ICollection<Person> FindByIds(ICollection<int> ids);

    void SaveChanges();
}
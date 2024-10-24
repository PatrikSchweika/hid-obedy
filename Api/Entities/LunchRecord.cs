namespace Api.Entities;

public class LunchRecord
{
    public DateOnly Date { get; set; }
    public Person Payer { get; set; }
    public ICollection<Person> Persons { get; set; } 
}
namespace Api.Entities;

public class LunchRecord
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public required Person Payer { get; set; }
    public required ICollection<Person> Consumers { get; set; }
}
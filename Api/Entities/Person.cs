namespace Api.Entities;

public class Person
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int Score { get; set; }

    public required ICollection<LunchRecord> PaidLunchRecords { get; set; }

    public required ICollection<LunchRecord> ConsumedLunchRecords { get; set; }
}
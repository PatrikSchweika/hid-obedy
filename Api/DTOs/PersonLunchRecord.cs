using Api.Entities;

namespace Api.DTOs;

public class PersonLunchRecord
{
    public int Id { get; set; }
    public DateOnly Date { get; set; }
    public int PayerId { get; set; }
    public required ICollection<int> ConsumerIds { get; set; }
    public bool IsPayer { get; set; }
    public int Score { get; set; }
}
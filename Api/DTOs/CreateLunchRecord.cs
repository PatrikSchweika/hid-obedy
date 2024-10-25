namespace Api.DTOs;

public class CreateLunchRecord
{
    public DateOnly Date { get; set; }
    public int PayerId { get; set; }
    public required ICollection<int> ConsumerIds { get; set; }
}
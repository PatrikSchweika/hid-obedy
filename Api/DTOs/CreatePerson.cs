using System.ComponentModel.DataAnnotations;

namespace Api.DTOs;

public class CreatePerson
{
    [Required]
    public required string Name { get; set; }
}
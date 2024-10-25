using Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.EF.Configurations;

public class PersonEntityConfiguration : IEntityTypeConfiguration<Person>
{
    public void Configure(EntityTypeBuilder<Person> builder)
    {
        builder.HasKey(person => person.Id);

        builder.Property(person => person.Name).IsRequired();

        builder.Property(person => person.Score).IsRequired();

        builder
            .HasMany(person => person.PaidLunchRecords)
            .WithOne(record => record.Payer)
            .HasForeignKey(record => record.Id)
            .HasPrincipalKey(person => person.Id);

        builder
            .HasMany(person => person.ConsumedLunchRecords)
            .WithMany(record => record.Consumers);
    }
}
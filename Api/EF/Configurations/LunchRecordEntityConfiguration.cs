using Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.EF.Configurations;

public class LunchRecordEntityConfiguration : IEntityTypeConfiguration<LunchRecord>
{
    public void Configure(EntityTypeBuilder<LunchRecord> builder)
    {
        builder.HasKey(record => record.Id);

        builder.Property(record => record.Date).IsRequired();
    }
}
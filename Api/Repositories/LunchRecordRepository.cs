using Api.EF;
using Api.Entities;

namespace Api.Repositories;

public class LunchRecordRepository(LunchAppDbContext dbContext) : ILunchRecordRepository
{
    public LunchRecord Add(LunchRecord record)
    {
        var entry = dbContext.LunchRecords.Add(record);

        return entry.Entity;
    }

    public ICollection<LunchRecord> FindByPersonId(int personId)
    {
        return dbContext.LunchRecords
            .Where(record => record.Payer.Id == personId || record.Consumers.Any(consumer => consumer.Id == personId))
            .ToList();
    }

    public void SaveChanges()
    {
        dbContext.SaveChanges();
    }
}
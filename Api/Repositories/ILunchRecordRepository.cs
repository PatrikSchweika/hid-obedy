using Api.Entities;

namespace Api.Repositories;

public interface ILunchRecordRepository
{
    LunchRecord Add(LunchRecord record);
    ICollection<LunchRecord> FindByPersonId(int personId);

    void SaveChanges();
}
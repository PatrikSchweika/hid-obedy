using Api.DTOs;
using Api.Entities;

namespace Api.Services;

public interface ILunchRecordService
{
    LunchRecord Add(CreateLunchRecord lunchRecord);

    IEnumerable<PersonLunchRecord> FindByPersonId(int personId);
}
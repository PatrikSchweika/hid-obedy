using Api.DTOs;
using Api.Entities;
using Api.Repositories;

namespace Api.Services;

public class LunchRecordServiceException(string message) : Exception(message);

public class LunchRecordService(ILunchRecordRepository lunchRecordRepository, IPersonRepository personRepository) : ILunchRecordService
{

    public LunchRecord Add(CreateLunchRecord lunchRecord)
    {
        var payer = personRepository.FindById(lunchRecord.PayerId);
        var consumers = personRepository.FindByIds(lunchRecord.ConsumerIds);

        if (payer == null)
        {
            throw new LunchRecordServiceException("Payer id not found");
        }

        if (consumers.Count != lunchRecord.ConsumerIds.Count)
        {
            throw new LunchRecordServiceException("Consumers count mismatch");
        }


        var entity = new LunchRecord()
        {
            Date = lunchRecord.Date,
            Payer = payer,
            Consumers = consumers,
        };

        payer.Score += consumers.Count;

        foreach (var consumer in consumers)
        {
            consumer.Score -= 1;
        }

        var addedRecord = lunchRecordRepository.Add(entity);

        lunchRecordRepository.SaveChanges();

        return addedRecord;
    }

    public IEnumerable<PersonLunchRecord> FindByPersonId(int personId)
    {
        var lunchRecords = lunchRecordRepository.FindByPersonId(personId);

        return lunchRecords.Select(lunchRecord =>
        {
            var isPayer = lunchRecord.Payer.Id == personId;

            return new PersonLunchRecord()
            {
                Id = lunchRecord.Id,
                Date = lunchRecord.Date,
                IsPayer = isPayer,
                Score = isPayer ? lunchRecord.Consumers.Count : -1,
                PayerId = lunchRecord.Payer.Id,
                ConsumerIds = lunchRecord.Consumers.Select(consumer => consumer.Id).ToList()
            };
        });
    }
}
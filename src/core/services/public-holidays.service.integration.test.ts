import {getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays} from './public-holidays.service';

describe('public holidays service', () => {
    describe('getListOfPublicHolidays', () => {
        test('should return list of shortened holidays', async () => {
            const holidays = await getListOfPublicHolidays(2024, 'GB');
            holidays.forEach((holiday) => {
                expect(holiday).toEqual({
                    name: expect.any(String),
                    localName: expect.any(String),
                    date: expect.any(String),
                  })
           })
        });

        test('should return error', async () => {
            await expect(getListOfPublicHolidays(2023, 'GB')).rejects.toThrow(new Error('Year provided not the current, received: 2023'));
        });
      });

    describe('checkIfTodayIsPublicHoliday', () => {
        test('should return status', async () => {
            const status = await checkIfTodayIsPublicHoliday('GB');

            expect(typeof status).toBe('boolean')
        });

        test('should return error', async () => {
            await expect(checkIfTodayIsPublicHoliday('USA')).rejects.toThrow(new Error('Country provided is not supported, received: USA'));
        });
    });

    describe('getNextPublicHolidays', () => {
        test('should return list of next shortened holidays', async () => {
            const holidays = await getNextPublicHolidays('GB');

            holidays.forEach((holiday) => {
                expect(holiday).toEqual({
                    name: expect.any(String),
                    localName: expect.any(String),
                    date: expect.any(String),
                  })
           })
        });

        test('should return error', async () => {
            await expect(getNextPublicHolidays('USA')).rejects.toThrow(new Error('Country provided is not supported, received: USA'));
        });
    });
})
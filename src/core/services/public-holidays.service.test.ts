import axios from 'axios';
import {getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays} from './public-holidays.service';

const holiday = {
    date: '2024-07-04',
    localName: 'Independence Day',
    name: 'Independence Day',
    countryCode: 'USA',
    fixed: true,
    global: true,
    counties: null,
    launchYear: null,
    types: ['Public']
};

const shortenedHoliday = {
    name: 'Independence Day',
    localName: 'Independence Day',
    date: '2024-07-04'
};

jest.mock('../helpers', () => ({
    validateInput: jest.fn().mockReturnValue(true),
    shortenPublicHoliday: jest.fn().mockReturnValue({
        name: 'Independence Day',
        localName: 'Independence Day',
        date: '2024-07-04'
    }),
}));

jest.mock('../../config', () => ({
    PUBLIC_HOLIDAYS_API_URL: 'https://test'
}));


describe('getListOfPublicHolidays', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return list of shortened holidays', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: [holiday]}));

        const response = await getListOfPublicHolidays(2024, 'USA');
        expect(response).toEqual([shortenedHoliday]);
    });

    test('should call API with proper arguments', async () => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: [holiday]}));

        await getListOfPublicHolidays(2024, 'USA');
        expect(axiosGetSpy).toHaveBeenCalledWith(`https://test/PublicHolidays/2024/USA`);
      });

    test('should return error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject('Error'));
        await expect( getListOfPublicHolidays(2024, 'USA')).resolves.toEqual([]);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return status', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({status: 200}));

        const response = await checkIfTodayIsPublicHoliday('USA');
        expect(response).toBeTruthy();
    });

    test('should call API with proper arguments', async () => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({status: 200}));

        await checkIfTodayIsPublicHoliday('USA');
        expect(axiosGetSpy).toHaveBeenCalledWith(`https://test/IsTodayPublicHoliday/USA`);
      });

    test('should return error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject('Error'));
        await expect( checkIfTodayIsPublicHoliday('USA')).resolves.toBeFalsy;
    });
  });

  describe('getNextPublicHolidays', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return next holidays', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: [holiday]}));

        const response = await getNextPublicHolidays('USA');
        expect(response).toEqual([shortenedHoliday]);
    });

    test('should call API with proper arguments', async () => {
        const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: [holiday]}));

        await getNextPublicHolidays('USA');
        expect(axiosGetSpy).toHaveBeenCalledWith(`https://test/NextPublicHolidays/USA`);
      });

    test('should return error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject('Error'));
        await expect( getNextPublicHolidays('USA')).resolves.toEqual([]);
    });
  });
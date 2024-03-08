import { validateInput, shortenPublicHoliday } from './helpers';

jest.mock('../config', () => ({
    SUPPORTED_COUNTRIES: ['GB', 'FR', 'DE', 'NL']
}));

describe('validateInput function', () => {
    test('throws error for unsupported country', () => {
        expect(() => {
            validateInput({ country: 'GR' });
        }).toThrow('Country provided is not supported, received: GR');
    });

    test('throws error for non-current year', () => {
        const mockedDate = new Date(2020, 6, 19);
        const year = mockedDate.getFullYear() + 1;

        let spy = jest.spyOn(global, "Date").mockImplementation(() => mockedDate);

        expect(() => {
            validateInput({ year });
        }).toThrow(`Year provided not the current, received: ${year}`);
    });

    test('validates current year', () => {
        const mockedDate = new Date(2020, 6, 19);

        let spy = jest.spyOn(global, "Date").mockImplementation(() => mockedDate);
        const year = mockedDate.getFullYear();
        expect(validateInput({ year })).toBe(true);
    });

    test('validates supported country', () => {
        expect(validateInput({ country: 'GB' })).toBe(true);
    });


});

describe('shortenPublicHoliday function', () => {
  test('shortens public holiday correctly', () => {
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
    const shortenedHoliday = shortenPublicHoliday(holiday);

    expect(shortenedHoliday).toEqual({
      name: 'Independence Day',
      localName: 'Independence Day',
      date: '2024-07-04'
    });
  });
});
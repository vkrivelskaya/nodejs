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
        expect(() => {
            validateInput({ year: 2023 });
        }).toThrow('Year provided not the current, received: 2023');
    });

    test('validates current year', () => {
        const year = new Date().getFullYear();
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
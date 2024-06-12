const request = require('supertest');
const PUBLIC_HOLIDAYS_API_URL = 'https://date.nager.at/api/v3';

describe('Public Holidays API', () => {
  describe('/PublicHolidays', () => {
    it('should return 200 and public holidays list', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/2024/GB');

      expect(response.status).toEqual(200);
      response.body.forEach((el) => {
        expect(Object.keys(el)).toEqual(
          expect.arrayContaining([ "date","localName","name","countryCode","fixed","global","counties","launchYear","types"])
        )
      })
    });

    it('should return 404 for unknown country', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/2024/ttttt');

      expect(response.status).toEqual(404);
    });

    it('should return 400 for validation error', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get('/PublicHolidays/0/GB');

      expect(response.status).toEqual(400);
    });
  });

  describe('/NextPublicHolidays', () => {
    it('should return 200 and next public holidays list', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get('/NextPublicHolidays/GB');

      expect(response.status).toEqual(200);
      response.body.forEach((el) => {
        expect(Object.keys(el)).toEqual(
          expect.arrayContaining([ "date","localName","name","countryCode","fixed","global","counties","launchYear","types"])
        )
      })
    });

    it('should return 500 for unknown country', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get('/NextPublicHolidays/ttttt');

      expect(response.status).toEqual(500);
    });
  });
});
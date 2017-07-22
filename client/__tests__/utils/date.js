import { getDateHoursDiff } from '../../utils/date';

it('calculates the time difference between different hours of same day', () => {
    const d1 = new Date(2017, 6, 3, 8, 30);
    const d2 = new Date(2017, 6, 3, 11);
    expect(getDateHoursDiff(d1, d2)).toBe(2.5);
    expect(getDateHoursDiff(d2, d1)).toBe(getDateHoursDiff(d1, d2));
});

it('calculates the time difference between week days in same week', () => {
    const d1 = new Date(2017, 6, 3); // july 3rd - Monday
    const d2 = new Date(2017, 6, 6); // july 6rd - Thursday
    expect(getDateHoursDiff(d1, d2)).toBe(3 * 24);
    expect(getDateHoursDiff(d2, d1)).toBe(getDateHoursDiff(d1, d2));
});

it('calculates the time difference between week days in different weeks', () => {
    const d1 = new Date(2017, 6, 5); // july 5rd - Wednesday
    const d2 = new Date(2017, 6, 11); // july 11rd - Tuesday
    expect(getDateHoursDiff(d1, d2)).toBe(4 * 24);
    expect(getDateHoursDiff(d2, d1)).toBe(getDateHoursDiff(d1, d2));
});

it('calculates the time difference between week days (diff hours) in different weeks', () => {
    const d1 = new Date(2017, 6, 5, 11); // july 5rd - Wednesday
    const d2 = new Date(2017, 6, 11, 9); // july 11rd - Tuesday
    expect(getDateHoursDiff(d1, d2)).toBe((4 * 24) - 2);
    expect(getDateHoursDiff(d2, d1)).toBe(getDateHoursDiff(d1, d2));
});

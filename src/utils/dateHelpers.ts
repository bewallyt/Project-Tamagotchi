import { startOfWeek, subDays, subMonths } from 'date-fns';

export const ONE_WEEK_AGO_ISO = new Date(subDays(new Date(), 6).toDateString()).toISOString();
export const TWO_WEEKS_AGO_ISO = new Date(subDays(new Date(), 13).toDateString()).toISOString();
export const FOUR_WEEKS_AGO_ISO = new Date(subDays(new Date(), 27).toDateString()).toISOString();
export const ONE_MONTH_AGO_ISO = new Date(subMonths(new Date(), 1).toDateString()).toISOString();
export const BEGINNING_OF_WEEK_ISO = startOfWeek(new Date()).toISOString();

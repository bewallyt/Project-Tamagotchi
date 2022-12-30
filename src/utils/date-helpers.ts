import { subDays } from 'date-fns';

export const ONE_WEEK_AGO_ISO = new Date(subDays(new Date(), 6).toDateString()).toISOString();

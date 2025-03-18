import {array, number, object} from 'yup';

export const schema = object({
  specialities: array().typeError('required'),
});

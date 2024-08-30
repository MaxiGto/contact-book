import { CustomHelpers } from 'joi';

export const PHONE_REGEX = /^[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{4}$/;

export const objectId = (value: string, helpers: CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' });
  }
  return value;
};

export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({ custom: 'password must be at least 8 characters' });
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message({ custom: 'password must contain at least 1 letter and 1 number' });
  }
  return value;
};

export const phoneNumber = (value: string, helpers: CustomHelpers) => {
  if (!value.match(PHONE_REGEX)) {
    return helpers.message({ custom: '"{{#label}}" must match XXX-XXX-XXXX format' });
  }
  return value;
};

export const dateOfBirth = (value: string, helpers: CustomHelpers) => {
  const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateOfBirthRegex.test(value)) {
    return helpers.message({ custom: '"{{#label}}" must match "YYYY-MM-DD" format' });
  }
  return value;
};

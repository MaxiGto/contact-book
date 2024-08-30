import Joi from 'joi';
import 'dotenv/config';

export enum Environment {
  Test = 'test',
  Development = 'development',
  Production = 'production',
}

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid(Environment.Production, Environment.Development, Environment.Test)
      .required(),
    PORT: Joi.number().default(3000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  cryptojsKey: envVars.CRYPTOJS_SECRET_KEY,
  api: {
    url: envVars.API_URL,
  },
  frontend: {
    url: envVars.FRONTEND_URL,
  },
};

export default config;

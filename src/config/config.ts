import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    API_URL: Joi.string().required().description('API url'),
    FRONTEND_URL: Joi.string().required().description('Frontend url'),
    CRYPTOJS_SECRET_KEY: Joi.string().required().description('CryptoJS key'),
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

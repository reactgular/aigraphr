import Joi from 'joi';

export interface EnvConfig {
    NODE_ENV: 'development' | 'production' | 'test';

    PROJECTS_FOLDER: string;
}

export const VALIDATE_ENV_CONFIG = Joi.object<EnvConfig>({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    PROJECTS_FOLDER: Joi.string().required()
});

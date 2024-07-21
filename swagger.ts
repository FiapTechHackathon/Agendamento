// swagger.ts

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { Application } from 'express';

// Carregue o arquivo YAML
const swaggerDocument = YAML.load('swagger.yml');

const setupSwagger = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;

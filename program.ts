import Server from './server';
import { MysqlDataBase } from './external/MysqlDataBase';

let port = process.env.PORT || 3000;
const db = new MysqlDataBase();
const _server = new Server(db);

// Swagger setup é chamado no server.ts

_server.app.listen(port, () => {
    console.log('Server running on port ' + port);
    console.log(`Swagger docs are available at http://localhost:${port}/api-docs`);
});

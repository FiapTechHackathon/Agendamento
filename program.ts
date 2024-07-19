import Server  from "./server";
import {MysqlDataBase} from "./external/MysqlDataBase";
let port = process.env.PORT || 3000;
const db = new MysqlDataBase();
const _server = new Server(db);


_server.app.listen(port, () => {
    console.log('Server exec: PORTA -> ' + port);
});

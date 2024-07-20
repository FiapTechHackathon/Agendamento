import * as mariadb from 'mariadb';
class MysqlConnection
{

    
    connection: mariadb.Connection = null;

    constructor(){
        this.connect();
    }

    async connect(){
        this.connection = await mariadb.createConnection({            
            host: process.env.MARIADB_HOST,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASS,
            database: process.env.MARIADB_DATABASE,
            port : parseInt(process.env.MARIADB_PORT),
        });

        await this.connection.query(`CREATE TABLE IF NOT EXISTS Usuario (
                                    ID INT PRIMARY KEY AUTO_INCREMENT,
                                    Senha VARCHAR(100) NOT NULL
                                );`);

        await this.connection.query(`CREATE TABLE IF NOT EXISTS Medico (
                                    ID INT PRIMARY KEY AUTO_INCREMENT,
                                    CRM INT NOT NULL,
                                    Estado_CRM CHAR(2) NOT NULL,
                                    Nome VARCHAR(100) NOT NULL,
                                    Especialidade VARCHAR(100) NOT NULL,
                                    ID_Usuario INT NOT NULL,
                                    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID),
                                    UNIQUE (CRM, Estado_CRM)
                                );`);

        await this.connection.query(`CREATE TABLE IF NOT EXISTS Paciente (
                                    ID INT PRIMARY KEY AUTO_INCREMENT,
                                    Nome VARCHAR(100) NOT NULL,
                                    Email VARCHAR(100) UNIQUE NOT NULL,
                                    CPF VARCHAR(11) UNIQUE NOT NULL,
                                    ID_Usuario INT NOT NULL,
                                    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID)
                                );`);

        await this.connection.query(`
                                    CREATE TABLE IF NOT EXISTS Agenda (
                                    ID INT PRIMARY KEY AUTO_INCREMENT,
                                    Data DATE NOT NULL,
                                    HoraInicio TIME NOT NULL,
                                    HoraFim TIME NOT NULL,
                                    Disponivel ENUM('Disponivel', 'Indisponivel') NOT NULL,
                                    ID_Medico INT NOT NULL,
                                    Valor decimal NOT NULL,
                                    FOREIGN KEY (ID_Medico) REFERENCES Medico(ID)
                                     );
                                `);

        await this.connection.query(`
                                    CREATE TABLE IF NOT EXISTS Agendamento_Paciente (
                                    ID INT PRIMARY KEY AUTO_INCREMENT,
                                    ID_Paciente INT NOT NULL,
                                    ID_Agenda INT NOT NULL,
                                    Status ENUM('Confirmado', 'Pendente','Cancelado','RECUSADO') NOT NULL,
                                    Justificativa VARCHAR(255) NULL,
                                    FOREIGN KEY (ID_Paciente) REFERENCES Paciente(ID),
                                    FOREIGN KEY (ID_Agenda) REFERENCES Agenda(ID)
                                    );
                                `);

        
    }

    public conn () {
        return this.connection;
    }
}

export default MysqlConnection
const { Client } = require('pg');

// Замените параметры подключения на ваши реальные значения
const connectionParams = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'anime_2.0',
  password: '123',
  port: 5433,
};

// Создаем нового клиента
const client = new Client(connectionParams);

// Подключаемся к базе данных
client.connect()
  .then(() => {
    console.log('Connected to the database');

    // Выполняем SQL-запрос
    return client.query('SELECT $1::text as message', ['Hello, PostgreSQL!']);
  })
  .then(result => {
    console.log(result.rows[0].message); // Выводим результат запроса
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  })
  .finally(() => {
    // Закрываем соединение с базой данных
    client.end()
      .then(() => {
        console.log('Connection to the database closed');
      })
      .catch(error => {
        console.error('Error closing the connection:', error);
      });
  });

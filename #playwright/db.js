const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  user: 'root',
  password: 'root',
  host: 'localhost',
  database: 'manga_ai'
});

//* тестирование подключения
connection.connect(function(err){
  if (err) {
    return console.error("Ошибка: " + err.message);
  }
  else{
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});


connection.query(
  'SELECT * FROM `users` WHERE `firstname` IS NOT NULL',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);


//* закрытие подключения
connection.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});
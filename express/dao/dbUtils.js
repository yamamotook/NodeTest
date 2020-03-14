const mysql = require('mysql');

function createConnection(){
	return mysql.createConnection({
		port : 3306,
		host : '127.0.0.1',
		user : 'root',
		password : '123456',
		database : 'school'
	});
}

module.exports = {
	createConnection
}
const dbUtils = require('./dbUtils.js');


function insertFile(name, filePath, originName, success){
	const insertSql = 'insert into files (name, filePath, originName) values (?, ?, ?)';
	const parms = [name, filePath, originName];
	const connection = dbUtils.createConnection();
	connection.connect();
	connection.query(insertSql, parms, function(error, data){
		if(error == null){
			success(data);
		}else{
			throw new Error(error);
		}
	});
	connection.end();
}

module.exports = {
	insertFile
}
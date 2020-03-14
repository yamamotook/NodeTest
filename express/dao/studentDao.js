const dbUtils = require('./dbUtils.js');

function queryAllStudent(success){
	const querySql = 'select * from student';
	const connection = dbUtils.createConnection();
	connection.connect();
	connection.query(querySql, function(error, data){
		if(error == null){
			success(data);
		}else{
			throw new Error(error);
		}
	});
	connection.end();
}


function insertStudent(sNo, sName, sAge, sClass, pwd, success){
	const insertSql = 'insert into student (stu_no, stu_name, stu_age, stu_class, pwd) values (?, ?, ?, ?, ?)';
	const parms = [sNo, sName, sAge, sClass, pwd];
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

function queryStudentBySno(sNo, success){
	const querySql = 'select * from student where stu_no = ?';
	console.log(sNo);
	const parms = [sNo];
	const connection = dbUtils.createConnection();
	connection.connect();
	connection.query(querySql, parms,function(error, data){
		if(error == null){
			success(data);
		}else{
			throw new Error(error);
		}
	});
	connection.end();
}


module.exports = {
	queryAllStudent,
	insertStudent,
	queryStudentBySno
}
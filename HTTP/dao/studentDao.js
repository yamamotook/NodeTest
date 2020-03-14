const dbUtils = require('./dbUtil.js');

function queryAllStudent(success){
	const querySql = 'select * from student';
	const connection = dbUtils.createConnection();
	connection.connect();
	connection.query(querySql, function(error, data){
		if(error == null){
			success(data);
		}else{
			console.log(error);
		}
	});
	connection.end();
}

function queryStudentByClassAndAge(classNum, age,success){
	const connection = dbUtils.createConnection();
	const querySql = 'select * from student where stu_class = ? and stu_age = ?';
	const params = [classNum, age];
	connection.connect();
	connection.query(querySql, params, function(error, data){
		if(error == null){
			success(data);
		}else{
			console.log(error);
		}
	})
	connection.end();
}

function queryStudentByStuNum(stuNum, success){
	const connection = dbUtils.createConnection();
	const querySql = 'select * from student where stu_no = ?';
	connection.connect();
	connection.query(querySql, stuNum, function(error, data){
		if(error == null){
			success(data);
		}else{
			console.log(error);
		}
	})
	connection.end();
}



module.exports = {
	queryAllStudent,
	queryStudentByClassAndAge,
	queryStudentByStuNum
}

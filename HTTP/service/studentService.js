const studentDao = require('../dao/studentDao.js');

function getStudent(success){
	studentDao.queryAllStudent(success);
}
function queryStudentByStuNum(sno, success){
	studentDao.queryStudentByStuNum(sno, success)
}

module.exports = {
	getStudent,
	queryStudentByStuNum
}
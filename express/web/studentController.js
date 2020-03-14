const studentDao = require('../dao/studentDao.js');
const url = require('url');
const fs = require('fs');

const path = new Map();


function queryAllStudent(req, resp){
	studentDao.queryAllStudent(function(data){
		console.log(data);
		resp.writeHead(200);
		resp.write(JSON.stringify(data));
		resp.end();
	})
}

path.set('/api/queryAllStudent', queryAllStudent);

function insertStudent(req, resp){
	const data = url.parse(req.url, true).query;
	studentDao.insertStudent(data.sNo, data.sName, data.sAge, data.sClass, data.pwd, function(data){
		resp.writeHead(200,{'content-type' : 'text/html;charset=utf-8'});
		resp.write('添加成功');
		resp.end();
	})
}
path.set('/api/insertStudent', insertStudent);


function login(req, resp){
	const data = url.parse(req.url, true).query;
	studentDao.queryStudentBySno(data.sNo, function(result){
		if(result.length && result[0].pwd == data.pwd){
			resp.cookie('id', result[0].id);
			resp.redirect('/api/queryAllStudent');
			resp.end()
		}else{
			resp.redirect('/loginError.html');
			resp.end();
		}
	})
}
path.set('/login', login);

function getPic(req, resp){
	const data = url.parse(req.url, true).query;
	if(data.path){
		const file = fs.readFileSync(data.path);
		resp.writeHead(200);
		resp.write(file);
		resp.end();
	}else{
		resp.writeHead(404);
		resp.end();
	}
}
path.set('/getPic', getPic)




module.exports.path = path;
const path = new Map();
const studentService = require('../service/studentService.js');

function login(request, response){

	//POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
	// 比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
	request.on('data',function(data){
		const parseData = JSON.parse(data.toString());
		const sno = parseData.sNo;
		const pwd = parseData.pwd;
		studentService.queryStudentByStuNum(sno,function(result){
			console.log(result);
			if(result.length == 0 || result == null){
				response.writeHead(200);
				response.write('Fail');
			}else{
				if(result[0].pwd == pwd){
					response.writeHead(200);
					response.write('OK');
				}else{
					response.writeHead(200);
					response.write('Fail');
				}
			}
			response.end();
		});
	})
	
	
}
path.set('/login',login);

module.exports.path = path;

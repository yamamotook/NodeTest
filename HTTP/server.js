const http = require('http');
const url = require('url');
const fs = require('fs');
const globalConfig = require('./config.js');
const loader = require('./loader.js')

const server = http.createServer(function(request, response){
	const path = url.parse(request.url).pathname;
	const staticFlag = isStatic(path);
	if(staticFlag){
		//是静态资源
		console.log(globalConfig.page_path + path);
		try{
			const file = fs.readFileSync(globalConfig.page_path + path)
			response.writeHead(200);
			response.write(file);
			response.end();
		} catch(e){
			response.writeHead(404);
			response.write(`
				<html>
					<body>
						<h2 style="text-align: center;">404NotFound</h2>
						<hr />
					</body>
				</html>
			`)
			response.end();
		}
		
	}else{
		//不是静态资源
		//通过loader转发request到Controller
		try{
			if(loader.get(path)){
				//找到Controller
				loader.get(path)(request, response);
			}else{
				//没有找到Controller
				response.writeHead(404);
				response.write(`
					<html>
						<body>
							<h2 style="text-align: center;">404NotFound</h2>
							<hr />
						</body>
					</html>
				`)
				response.end();
			}
		}catch(e){
			//当Controller发生错误时捕获
			response.writeHead(500);
			response.write(`我出错了o(╥﹏╥)o`);
			response.end();
		}
	}
	
});


server.listen(globalConfig['port']);
server.on('listening', function(){
	console.log('服务已启动');
})



function isStatic(path){
	const staticTypes = globalConfig.static_file_type.split('|');
	for(type of staticTypes){
		if(path.indexOf(type) === path.length - type.length){
			return true;
		}
	}
	return false;
}
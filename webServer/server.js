const net = require('net');
const fs = require('fs');
const golbalConfig = require('./configHanlder.js');

console.log(golbalConfig);

const server = net.createServer();

server.listen(12306, '127.0.0.1');

// GET /index.html HTTP/1.1
// Host: 127.0.0.1:12306
// Connection: keep-alive
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36
// Sec-Fetch-Dest: document
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
// Sec-Fetch-Site: none
// Sec-Fetch-Mode: navigate
// Sec-Fetch-User: ?1
// Accept-Encoding: gzip, deflate, br
// Accept-Language: ja,zh;q=0.9


server.on('listening', function(){
	console.log('服务器已启动');
});


server.on('connection', function(socket){
	console.log('有新的连接');
	socket.on('data', function(data){
		const requestLine = data.toString().split('\r\n')[0];
		const url = requestLine.split(' ')[1];
		try{
			const file = fs.readFileSync(golbalConfig['basePath'] + url);
			socket.write('HTTP/1.1 200 OK\r\n\r\n');
			socket.write(file);
		}catch(e){
			//TODO handle the exception
			socket.write(`HTTP/1.1 404 NotFound\r\n\r\n
						<html>
							<body>
								<h2 style="text-align:center;">404 NotFound</h2>
								<hr />
							</body>
						</html>
			`);
		}
		socket.end();
		
	})
})
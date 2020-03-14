const fs = require('fs');
const golbalConfig = {};

try{
	const configLines = fs.readFileSync('./server.conf').toString().split('\n');
	configLines.forEach( item  => {
		const tempConfig = item.split('=');
		if(tempConfig.length === 2){
			golbalConfig[tempConfig[0]] = tempConfig[1];
		}
	});
	if(golbalConfig['path_position'] === 'absolute'){
		golbalConfig['basePath'] = golbalConfig['path'];
	}else{
		golbalConfig['basePath']  = __dirname + golbalConfig['path'];
	}

}catch(e){
	console.log(e);
	//TODO handle the exception
	console.log('未找到配置文件')
}

module.exports = golbalConfig;


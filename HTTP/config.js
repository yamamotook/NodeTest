const fs = require('fs');
const globalConfig = {};


try{
	const file = fs.readFileSync('./server.conf')
	const configLines = file.toString().split('\n');
	configLines.forEach( line => {
		const tempLine = line.split('=');
		if(tempLine.length === 2){
			globalConfig[tempLine[0]] = tempLine[1];
		}
	});
}catch(e){
	console.log('没有找到配置文件，请检查配置文件');
}

module.exports = globalConfig;

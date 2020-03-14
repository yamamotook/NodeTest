const fs = require('fs');

const globalConfig = {};

const file = fs.readFileSync('server.conf');

const fileContent = file.toString();

const fileArr = fileContent.split('\n');

fileArr.forEach(line => {
	const temp = line.split('=');
	if(temp.length == 2){
		globalConfig[temp[0]] = temp[1].trim();
	}
})

module.exports = globalConfig

const fs = require('fs');
const globalConfig = require('./config.js');

const globalMap = new Map();

const files = fs.readdirSync(globalConfig['web_path']);

files.forEach( file =>{
	const temp = require(`./${globalConfig.web_path}/${file}`);
	if(temp.path){
		for(const [key, value] of temp.path){
			if(globalMap.get(key) === undefined){
				globalMap.set(key,value);
			}else{
				throw new Error('Controller path 重复');
			}
		}
	}
});

module.exports = globalMap;
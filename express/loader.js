const fs = require('fs');
const globalConfig = require('./config.js');

const path = new Map();
const controllerSet = [];

function init(app){
	const dirs = fs.readdirSync(`./${globalConfig['web_path']}`);
	dirs.forEach( dir => {
		const tempModule = require(`./${globalConfig['web_path']}/${dir}`);
		if(tempModule.path){
			for(const [key, value] of tempModule.path){
				if(path.get(key) == undefined){
					app.get(key, value);
					controllerSet.push(value);
				}else{
					throw new Error(`path异常,异常的url:${key}`);
				}
			}
		}
	});
	
}

module.exports = {
	init
}
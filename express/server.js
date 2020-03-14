const express = require('express');
const globalConfig = require('./config.js');
const loader = require('./loader.js');
const app = new express();
const cookie = require('cookie-parser')
const multer = require('multer');
const fileDao = require('./dao/fileDao.js');
app.use(cookie());

app.get('/main.html',function(req, resp, next){
	console.log(req.cookies);
	if(req.cookies.id){
		next();
	}else{
		resp.redirect('/index.html');
	}
});

const uploadSingle = multer({ dest:'./files/'});

app.use(express.static(globalConfig['page_path']));


//设置拦截器,拦截/api/....
app.get('/api/*', function(req, resp, next){
	// resp.redirect('/index.html');
	console.log(req.cookies);
	if(req.cookies.id){
		next();
	}else{
		resp.redirect('/index.html');
	}
})


loader.init(app);

app.post("/upload", uploadSingle.single("file"), function(req, resp){
	console.log(req.file);
	console.log(req.body);
	fileDao.insertFile(req.body.name, req.file.path, req.file.originalname, function(result){
		const respBody = {
			path : req.file.path
		};
		resp.writeHead(200);
		resp.write(JSON.stringify(respBody));
		resp.end();
	})
})

app.listen(globalConfig['port'],function(){
	console.log('服务已启动');
});

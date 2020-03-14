function login(){
	const sNo = document.getElementById('sNo').value;
	const pwd = document.getElementById('pwd').value;
	console.log(sNo,pwd);
	(async _ => {
		const resp = await fetch(`/login`,{
			method : 'POST',
			headers : {
				"content-type" : 'appliction/json'
			},
			body : JSON.stringify({
				sNo,
				pwd
			})
		});
		const msg = await resp.text();
		console.log(msg);
	})()
}


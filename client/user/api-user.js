const create = async (user) => {
	try {
 		let res = await fetch('/api/users', {
 			method: 'POST',
 			headers: {
 				'Accept': 'application/json',
 				'Content-Type': 'application/json'
 			},
 			body: JSON.stringify(user)
 		});

 		return await res.json();
	} catch(err) {
		console.error(err);
	}
}

const list = async (signal) => {
	try {
		let res = await fetch('/api/users', {
			method: 'GET',
			signal: signal
		});

		return await res.json();
	} catch(err) {
		console.error(err);
	}
} 

const read = async (params, credentials, signal) => {
	try {
		let res = await fetch(`/api/users/${params.userId}`, {
			method: 'GET',
			signal: signal,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${credentials.t}`
			}
		});

		return res.json();
	} catch(err) {
		console.error(err);
	}
}

const update = async (params, credentials, user) => {
	try {
		let res = await fetch(`/api/users/${params.userId}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${credentials.t}`
			},
			body: JSON.stringify(user)
		});
		console.log(res);
		return res.json();
	} catch(err) {
		console.error(err);
	}
}

const remove = async (params, credentials) => {
	try {
		let res = await fetch(`/api/users/${params.userId}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${credentials.t}`
			} 
		});

		return res.json();
	} catch(err) {
		console.error(err);
	}
}


export { create, list, read, update, remove };
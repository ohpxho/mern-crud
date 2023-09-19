
function authenticate(jwt, cb) {
	if(typeof window !== 'undefined') sessionStorage.setItem('jwt', JSON.stringify(jwt));
	cb();
}

function isAuthenticated() {
	if(typeof window == 'undefined') return false
	const jwt = sessionStorage.getItem('jwt');
	if(!jwt) return false;

	return JSON.parse(jwt);
}

function clearJWT(cb) {
	if(typeof window !== 'undefined') sessionStorage.removeItem('jwt');
	cb();
	//signout().then((data) => document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; *clear cookie, if cookie has been used as a credential storage
}

export default { authenticate, isAuthenticated, clearJWT }
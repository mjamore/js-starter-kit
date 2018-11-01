export default function getBaseUrl() {
	return getQueryStringParameterByName('useMockApi')
		? `http://localhost:${process.env.API_PORT}/`
		: '/';
}

function getQueryStringParameterByName(name, url) {
	if(!url) {
		url = window.location.href;
	}

	name = name.replace(/[\[\]]/g, '\\$&');

	const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
	const results = regex.exec(url);

	if(!results) {
		return null;
	}

	if(!results[2]) {
		return '';
	}

	return decodeURI(results[2].replace(/\+/g, ' '));
}

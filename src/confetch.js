let dataUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
let dataProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
let dataCohorts = '../data/cohorts.json';
let data1 = {}
let data2 = {}
let data3 = {}

fetch(dataUsers).then((response) => {
	if(response.status === 200) {
		return response.json();
	} else {
        console.log('Ocurrió un error');
    }
}).then((jsonResponse) => {
	data1 = jsonResponse;
	return fetch(dataProgress);
}).then((response) => {
	if(response.status === 200) {
		return response.json();
	} else {
		console.log('Ocurrió un error');
	}
}).then((jsonResponse2) => {
	data2 = jsonResponse2;
	return fetch(dataCohorts)
}).then((response) => {
	if(response.status === 200) {
		return response.json();
	} else {
		console.log('Ocurrió un error');
	}
}).then((jsonResponse3) => {
	data3 = jsonResponse3;
    console.log(data1,data2,data3);
});

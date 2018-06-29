// Declarando variables
const usersFile = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressFile = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const cohortsFile = '../data/cohorts.json';
let usersData = []
let progressData = {}
let coursesData = []
const cohortList = document.getElementById('cohortList');
const buttonContainer = document.getElementById('button-container');
// Petición Ajax para solicitar data
fetch(usersFile).then(response => {
  if (response.status === 200) {
    return response.json();
  } else {
    console.log('Oops! Ocurrió un error');
  }
}).then(usersResponse => {
  usersData = usersResponse;
  return fetch(progressFile);
}).then(response => {
	if(response.status === 200) {
		return response.json();
	} else {
		console.log('Oops! Ocurrió un error');
	}
}).then(progressResponse => {
  progressData = progressResponse;
	return fetch(cohortsFile);
}).then(response => {
	if(response.status === 200) {
		return response.json();
	} else {
		console.log('Oops! Ocurrió un error');
	}
}).then(cohortsResponse => {
  // Agregando funcionalidad de filtrado a botones sede
  buttonContainer.addEventListener('click', e => {
    cohortList.innerHTML = '';
    cohortsResponse.forEach(cohort => {
      if(cohort.id.startsWith(e.target.value)) {
        const option = document.createElement('option');
        const textNodeOption = document.createTextNode(cohort.id);
        option.appendChild(textNodeOption);
        cohortList.appendChild(option);
      }
    });
  });
});

// Declarando variables
const cohortSelector = document.getElementById('cohort-selector');
const buttonContainer = document.getElementById('button-container');
// Definiendo objeto de opciones
let options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null,
  },
  orderBy: 'name',
  orderDirection: 'ASC',
  search: '',
}
// Función para pintar cohorts
const fillCohorts = cohorts => {
  buttonContainer.addEventListener('click', e => {
    cohortSelector.classList.remove('hidden');
    cohortSelector.innerHTML = '';
    cohorts.forEach(cohort => {
      if (cohort.id.startsWith(e.target.value)) cohortSelector.innerHTML += `<option value="${cohort.id}">${cohort.id}</option>`
    });
  });
};
// Función para obtener users de cohort seleccionado
const getUsers = (cohort) => {
  fetch(`../data/cohorts/${cohort}/users.json`)
    .then(response => response.json())
    .then(users => {
      options.cohortData.users = users;
      console.log(options)
    })
};
// Función para obtener progress de cohort seleccionado
const getProgress = (cohort) => {
  fetch(`../data/cohorts/${cohort}/progress.json`)
    .then(response => response.json())
    .then(progress => {
      options.cohortData.progress = progress;
      console.log(options)
    })
};
// Función para obtener cohort seleccionado
const getCohort = (cohorts) => {
  cohortSelector.addEventListener('change', e => {
    options.cohort = cohorts.find(cohort => cohort.id === e.target.value);
    options.cohortData.users = null;
    options.cohortData.progress = null;
    console.log(options);
    getUsers(e.target.value);
    getProgress(e.target.value);
  });
};
// Petición Ajax para solicitar data
fetch('../data/cohorts.json')
  .then(response => response.json())
  .then(cohorts => {
    fillCohorts(cohorts);
    getCohort(cohorts);
  })
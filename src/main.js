// Declarando variables
const cohortSelector = document.getElementById('cohort-selector');
const campusButtons = document.getElementById('campus-buttons');
// Definiendo objeto de opciones
const options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null,
  },
  orderBy: 'name',
  orderDirection: 'ASC',
  search: '',
}
// Función para obtener users y progress de cohort seleccionado
const getCohortData = (cohort) => {
  const urls = [`../data/cohorts/${cohort}/users.json`, `../data/cohorts/${cohort}/progress.json`];
  const data = urls.map(url => fetch(url).then(response => response.json()));
  Promise.all(data)
    .then(cohortData => {
      options.cohortData.users = cohortData[0].filter(user => user.signupCohort === cohort); //user.role === 'student'
      options.cohortData.progress = cohortData[1];
      processCohortData(options);
    })
};
// Función para obtener cohort seleccionado
const getCohort = (cohorts) => {
  cohortSelector.addEventListener('change', e => {
    options.cohort = cohorts.find(cohort => cohort.id === e.target.value);
    options.cohortData.users = null;
    options.cohortData.progress = null;
    getCohortData(e.target.value)
  });
};
// Función para pintar cohorts
const fillCohorts = cohorts => {
  campusButtons.addEventListener('click', e => {
    cohortSelector.classList.remove('hidden');
    /* 
    Agregamos una etiqueta option para limpiar cualquier opción agregada antes por otro campus y
    escuchar el evento change (ver getCohort) cuando el campus seleccionado tiene un solo cohort
    */
    cohortSelector.innerHTML = `<option selected disabled> -- Selecciona un cohort -- </option>`;
    cohorts.forEach(cohort => {
      if (cohort.id.startsWith(e.target.value)) cohortSelector.innerHTML += `<option value="${cohort.id}">${cohort.id}</option>`;
    });
  });
};
// Petición Ajax para obtener cohorts
fetch('../data/cohorts.json')
  .then(response => response.json())
  .then(cohorts => {
    fillCohorts(cohorts);
    getCohort(cohorts);
  })
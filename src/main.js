// Declarando variables
const cohortSelector = document.getElementById('cohort-selector');
const campusButtons = document.getElementById('campus-buttons');
const orderSelector = document.getElementById('order-selector');
const directionButton = document.getElementById('direction-button');
const usersSection = document.getElementById('users-section');
const searchInput = document.getElementById('search-input');
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
// Función para pintar progreso de usuarios
const fillUsers = () => {
  const usersProgress = processCohortData(options)
  usersSection.innerHTML = '';
  usersProgress.forEach(user => {
    usersSection.innerHTML +=`
      <div class="flex-box">
        <div>
          <p>${user.name}</p>
          <p>Completitud general:</p>
          <p>${user.stats.percent}%</p>
        </div>
        <div>
          <p>Ejercicios:</p>
          <p>${user.stats.exercises.completed} <span>de</span> ${user.stats.exercises.total}</p>
          <p>${user.stats.exercises.percent}%</p>
        </div>
        <div>
          <p>Lecturas:</p>
          <p>${user.stats.reads.completed} <span>de</span> ${user.stats.reads.total}</p> 
          <p>${user.stats.reads.percent}%</p>
        </div>
        <div>
          <p>Quizzes:</p>
          <p>${user.stats.quizzes.completed} <span>de</span> ${user.stats.quizzes.total}</p> 
          <p>${user.stats.quizzes.percent}%</p>
        </div>
        <div>
          <p>${user.stats.quizzes.scoreSum}</p>
          <p>${user.stats.quizzes.scoreAvg}</p>
        </div>
      </div>
      `
  })
}
// Eventos para criterios de orden y búsqueda
orderSelector.addEventListener('change', event => {
  options.orderBy = event.target.value;
  console.log(options)
  fillUsers();
})
directionButton.addEventListener('click', () => {
  if (options.orderDirection === 'ASC') {
    options.orderDirection = 'DESC';
    directionButton.innerText = 'ASC';
  } else { 
    options.orderDirection = 'ASC';
    directionButton.innerText = 'DESC';
  };
  fillUsers();
})
searchInput.addEventListener('input', event => {
  options.search = event.target.value;
  fillUsers();
})
// Función para obtener users y progress de cohort seleccionado
const getCohortData = (cohort) => {
  const urls = [`../data/cohorts/${cohort}/users.json`, `../data/cohorts/${cohort}/progress.json`];
  const data = urls.map(url => fetch(url).then(response => response.json()));
  Promise.all(data)
    .then(cohortData => {
      options.cohortData.users = cohortData[0].filter(user => user.role === 'student' && user.signupCohort === cohort);
      options.cohortData.progress = cohortData[1];
      fillUsers();
    })
};
// Función para obtener cohort seleccionado
const getCohort = (cohorts) => {
  cohortSelector.addEventListener('change', e => {
    orderSelector.classList.remove('hidden');
    directionButton.classList.remove('hidden');
    searchInput.classList.remove('hidden')
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
    cohortSelector.innerHTML = `<option selected disabled>Selecciona un cohort:</option>`;
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
// Declarando variables
const dataUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const dataProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const dataCohorts = '../data/cohorts.json';  
const cohortList = document.getElementById('cohortList');

const getUsers = () => {
  const users = JSON.parse(event.target.responseText);
  userParam = users;
};

const getProgress = () => {
  const progress = JSON.parse(event.target.responseText);
  progressParam = progress;
}; 

const getCohorts = () => {
  const cohorts = JSON.parse(event.target.responseText);
  const coursesIndex = [];
  for (let cohort of cohorts) {
    const option = document.createElement('option');
    cohortList.appendChild(option);
    option.innerHTML = cohort.id;
    coursesIndex.push(cohort.coursesIndex);
  };
  coursesIndexParam = coursesIndex;
};

const dataRequest = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = callback;
  xhr.send();
}; 

  dataRequest(dataUsers, getUsers);
  dataRequest(dataProgress, getProgress);
  dataRequest(dataCohorts, getCohorts);
  computeUsersStats(userParam, progressParam, coursesIndexParam);




// dataRequest(dataUsers, getUsers);
// dataRequest(dataProgress, getProgress)
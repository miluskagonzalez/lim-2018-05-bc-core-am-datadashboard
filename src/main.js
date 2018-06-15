const dataUsers= '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const dataProgress= '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const dataCohorts = '../data/cohorts.json';

const dataRequest = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = callback;
  xhr.send();
}; 

const getUsers = () => {
  const users = JSON.parse(event.target.responseText);
  console.log(users);
}

const getProgress = () => {
  const progress = JSON.parse(event.target.responseText);
  console.log(progress);
}; 

const getCohorts = () => {
  const courses = JSON.parse(event.target.responseText);
  console.log(courses);
} 

dataRequest(dataUsers, getUsers);
dataRequest(dataProgress, getProgress);
dataRequest(dataCohorts, getCohorts);
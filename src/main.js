const dataUsers= '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const dataProgress= '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const dataCohorts = '../data/cohorts.json';

const dataRequest = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = callback;
  xhr.send();
}; 

const getCohorts = () => {
  const cohorts = JSON.parse(event.target.responseText);
  for (let cohort of cohorts) {
    document.getElementById('cohorts').innerHTML += '<option>' + cohort.id + '</option>'
  };
}

const getUsers = () => {
  const users = JSON.parse(event.target.responseText);
  for (let user of users) {
    document.getElementById('users').innerHTML += '<option>' + user.name + '</option>'
  };
};

const getProgress = () => {
  const progress = JSON.parse(event.target.responseText);
  console.log(progress);
}; 

dataRequest(dataCohorts, getCohorts);
dataRequest(dataUsers, getUsers);
dataRequest(dataProgress, getProgress)
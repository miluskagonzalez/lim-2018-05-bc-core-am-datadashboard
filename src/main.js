// Declarando variables
const dataUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const dataProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const dataCohorts = '../data/cohorts.json';  
const cohortList = document.getElementById('cohortList');
const limaButton = document.getElementById('lim');

const getCohorts = () => {
  const cohorts = JSON.parse(event.target.responseText);
  for (let cohort of cohorts) {
    const option = document.createElement('option');
    cohortList.appendChild(option);
    option.innerHTML = cohort.id
  };
};

const dataRequest = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = callback;
  xhr.send();
}; 

dataRequest(dataCohorts, getCohorts);

// const getUsers = () => {
//   const users = JSON.parse(event.target.responseText);
//   for (const user of users) {
//     document.getElementById('users').innerHTML += '<option>' + user.name + '</option>'    
//   };
// };

// const getProgress = () => {
//   const progress = JSON.parse(event.target.responseText);
//   console.log(progress);
// }; 


// dataRequest(dataUsers, getUsers);
// dataRequest(dataProgress, getProgress)
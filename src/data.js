window.computeUsersStats = (users, progress, courses) => {
  console.log(users, progress, courses)
  const usersWithStats = users.map(user => {
    user.stats = {
      percent: 0,
      exercises: {
        total: 0,
        completed: 0,
        percent: 0,
      },
      reads: {
        total: 0,
        completed: 0,
        percent: 0,
      },
      quizzes: {
        total: 0,
        completed: 0,
        percent: 0,
        scoreSum: 0,
        scoreAvg: 0,
      }
    }
    return user
  })
  return usersWithStats;
};
window.sortUsers = (users, orderBy, orderDirection) => { };
window.filterUsers = (users, filterBy) => { };
window.processCohortData = ({ cohort, cohortData, orderBy, orderDirection, filterBy }) => {
  const { users, progress } = cohortData;
  const courses = Object.keys(cohort.coursesIndex);
  let processedUsers = computeUsersStats(users, progress, courses);
  // processedUsers = sortUsers(processedUsers, orderBy, orderDirection);
  // filterBy ? processedUsers = filterUsers(processedUsers, filterBy) : null;
  console.log(processedUsers)
}
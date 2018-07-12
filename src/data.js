window.computeUsersStats = (users, progress, courses) => {
  console.log(users, progress, courses)
  const usersWithStats = users.map(user => {
    const userProgress = progress[user.id]
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
        scoreAvg: 0
      }
    }
    courses.forEach(course => {
      if (userProgress[course]) {
        user.stats.percent += Math.round(userProgress[course].percent / courses.length);
        const units = Object.values(userProgress[course].units);
        units.forEach(unit => {
          const parts = Object.values(unit.parts)
          parts.forEach(part => {
            switch (part.type) {
              case 'read':
                user.stats.reads.total++
                user.stats.reads.completed += part.completed
                break;
              case 'quiz':
                user.stats.quizzes.total++
                user.stats.quizzes.completed += part.completed
                if (part.hasOwnProperty('score')) user.stats.quizzes.scoreSum += part.score
                break;
              case 'practice':
                if (part.hasOwnProperty('exercises')) {
                  const exercises = Object.values(part.exercises)
                  exercises.forEach(exercise => {
                    if (exercise.hasOwnProperty('completed')) {
                      user.stats.exercises.total++
                      user.stats.exercises.completed += exercise.completed
                    } else {
                      user.stats.exercises.total++
                      user.stats.exercises.completed += exercise
                    }
                  })
                }
                break;
            }
          })
        })
        user.stats.reads.percent = Math.round(user.stats.reads.completed * 100 / user.stats.reads.total);
        user.stats.quizzes.percent = Math.round(user.stats.quizzes.completed * 100 / user.stats.quizzes.total);
        user.stats.exercises.percent = Math.round(user.stats.exercises.completed * 100 / user.stats.exercises.total);
        user.stats.quizzes.scoreAvg = Math.round(user.stats.quizzes.scoreSum / user.stats.exercises.total);
      }
    })
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
  //processedUsers = sortUsers(processedUsers, orderBy, orderDirection);
  filterBy ? processedUsers = filterUsers(processedUsers, filterBy) : null;
  console.log(processedUsers)
}
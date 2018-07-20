window.computeUsersStats = (users, progress, courses) => {

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
        scoreAvg: 0
      }
    }
    const userProgress = progress[user.id]
    courses.forEach(course => {
      if (userProgress.hasOwnProperty(course)) {
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
        if(user.stats.quizzes.completed !== 0) user.stats.quizzes.scoreAvg = Math.round(user.stats.quizzes.scoreSum / user.stats.quizzes.completed);
      }
    })
    return user
  })
  return usersWithStats;
};
window.sortUsers = (users, orderBy, orderDirection) => {
  if (orderBy === 'name') {
    users.sort((a, b) => {
      if (orderDirection == "ASC") {
        return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
      } else {
        return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
      }
    });
  }
  if (orderBy === 'percent') {
    users.sort((a, b) => {
      if (orderDirection === "ASC") {
        return a.stats.percent - b.stats.percent;
      } else {
        return b.stats.percent - a.stats.percent;
      }
    });
  }
  if (orderBy === 'exercises') {
    return users.sort((a, b) => {
      if (orderDirection === "ASC") {
        return a.stats.exercises.percent - b.stats.exercises.percent;
      } else {
        return b.stats.exercises.percent - a.stats.exercises.percent;
      }
    });
  } else if (orderBy === "quizzes") {
    return users.sort((a, b) => {
      if (orderDirection === "ASC") {
        return a.stats.quizzes.percent - b.stats.quizzes.percent;
      } else {
        return b.stats.quizzes.percent - a.stats.quizzes.percent;
      }
    });
  } else if (orderBy === "score") {
    return users.sort((a, b) => {
      if (orderDirection === "ASC") {
        return a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg;
      } else {
        return b.stats.quizzes.scoreAvg - a.stats.quizzes.scoreAvg;
      }
    });
  } else if (orderBy === "reads") {
    return users.sort((a, b) => {
      if (orderDirection === "ASC") {
        return a.stats.reads.percent - b.stats.reads.percent;
      } else {
        return b.stats.reads.percent - a.stats.reads.percent;
      }
    });
  } else {
    return users;
  }  
};
window.filterUsers = (users, filterBy) => users.filter(user => user.name.toUpperCase().includes(filterBy.toUpperCase()));
window.processCohortData = ({ cohort, cohortData, orderBy, orderDirection, search }) => {
  const { users, progress } = cohortData;
  const courses = Object.keys(cohort.coursesIndex);
  let processedUsers = computeUsersStats(users, progress, courses);
  processedUsers = sortUsers(processedUsers, orderBy, orderDirection);
  search ? processedUsers = filterUsers(processedUsers, search) : null;
  return processedUsers
}
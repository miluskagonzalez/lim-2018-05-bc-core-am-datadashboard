describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {
      const processed = computeUsersStats(users, progress, courses);

      it('debería tener propiedad percent con valor 53',

        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });
    });
  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const cohortUsers = users.filter(user => user.role === 'student' && user.signupCohort === cohort.id);
    const processed = computeUsersStats(cohortUsers, progress, courses);

    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      const ordered = sortUsers(processed, 'name', 'ASC');
      assert.deepEqual(ordered[0], {
        id: 'MinIWOm1sHOeMguGiQoe1wjqmiC3',
        locale: 'es-PE',
        name: 'adriana vizcarra paitán',
        role: 'student',
        signupCohort: 'lim-2018-03-pre-core-pw',
        stats: {
          percent: 100,
          exercises: {
            total: 2,
            completed: 2,
            percent: 100
          },
          quizzes: {
            total: 3,
            completed: 3,
            percent: 100,
            scoreSum: 237,
            scoreAvg: 79
          },
          reads: {
            total: 11,
            completed: 11,
            percent: 100
          }
        },
        timezone: 'America/Lima'
      });
      assert.deepEqual(ordered[725], {
        id: 'HeXYZqk7WCVBXXZttQU556hM60r1',
        locale: 'es-PE',
        name: 'Zurisadai Rosas Aramburú',
        role: 'student',
        signupCohort: 'lim-2018-03-pre-core-pw',
        stats: {
          percent: 100,
          exercises: {
            total: 2,
            completed: 2,
            percent: 100
          },
          quizzes: {
            total: 3,
            completed: 3,
            percent: 100,
            scoreSum: 242,
            scoreAvg: 81
          },
          reads: {
            total: 11,
            completed: 11,
            percent: 100
          },
        },
        timezone: 'America/Lima'
      });
    });

    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      const ordered = sortUsers(processed, 'name', 'DESC');
      assert.deepEqual(ordered[0], {
        id: 'HeXYZqk7WCVBXXZttQU556hM60r1',
        locale: 'es-PE',
        name: 'Zurisadai Rosas Aramburú',
        role: 'student',
        signupCohort: 'lim-2018-03-pre-core-pw',
        stats: {
          percent: 100,
          exercises: {
            total: 2,
            completed: 2,
            percent: 100
          },
          quizzes: {
            total: 3,
            completed: 3,
            percent: 100,
            scoreSum: 242,
            scoreAvg: 81
          },
          reads: {
            total: 11,
            completed: 11,
            percent: 100
          },
        },
        timezone: 'America/Lima'
      });
      assert.deepEqual(ordered[725], {
        id: 'MinIWOm1sHOeMguGiQoe1wjqmiC3',
        locale: 'es-PE',
        name: 'adriana vizcarra paitán',
        role: 'student',
        signupCohort: 'lim-2018-03-pre-core-pw',
        stats: {
          percent: 100,
          exercises: {
            total: 2,
            completed: 2,
            percent: 100
          },
          quizzes: {
            total: 3,
            completed: 3,
            percent: 100,
            scoreSum: 237,
            scoreAvg: 79
          },
          reads: {
            total: 11,
            completed: 11,
            percent: 100
          }
        },
        timezone: 'America/Lima'
      });
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      assert.deepEqual(sortUsers(processed, 'percent', 'ASC')[0].stats.percent, 0);
      assert.deepEqual(sortUsers(processed, 'percent', 'ASC')[725].stats.percent, 100);
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      assert.deepEqual(sortUsers(processed, 'percent', 'DESC')[0].stats.percent, 100);
      assert.deepEqual(sortUsers(processed, 'percent', 'DESC')[725].stats.percent, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      assert.deepEqual(sortUsers(processed, 'exercises', 'ASC')[0].stats.exercises.completed, 0);
      assert.deepEqual(sortUsers(processed, 'exercises', 'ASC')[725].stats.exercises.completed, 2);
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      assert.deepEqual(sortUsers(processed, 'exercises', 'DESC')[0].stats.exercises.completed, 2);
      assert.deepEqual(sortUsers(processed, 'exercises', 'DESC')[725].stats.exercises.completed, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {
      assert.deepEqual(sortUsers(processed, 'quizzes', 'ASC')[0].stats.quizzes.completed, 0);
      assert.deepEqual(sortUsers(processed, 'quizzes', 'ASC')[725].stats.quizzes.completed, 3);
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', () => {
      assert.deepEqual(sortUsers(processed, 'quizzes', 'DESC')[0].stats.quizzes.completed, 3);
      assert.deepEqual(sortUsers(processed, 'quizzes', 'DESC')[725].stats.quizzes.completed, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {
      assert.deepEqual(sortUsers(processed, 'score', 'ASC')[0].stats.quizzes.scoreAvg, 0);
      assert.deepEqual(sortUsers(processed, 'score', 'ASC')[725].stats.quizzes.scoreAvg, 100);
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', () => {
      assert.deepEqual(sortUsers(processed, 'score', 'DESC')[0].stats.quizzes.scoreAvg, 100);
      assert.deepEqual(sortUsers(processed, 'score', 'DESC')[725].stats.quizzes.scoreAvg, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {
      assert.deepEqual(sortUsers(processed, 'reads', 'ASC')[0].stats.reads.completed, 0);
      assert.deepEqual(sortUsers(processed, 'reads', 'ASC')[725].stats.reads.completed, 11);
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () => {
      assert.deepEqual(sortUsers(processed, 'reads', 'DESC')[0].stats.reads.completed, 11);
      assert.deepEqual(sortUsers(processed, 'reads', 'DESC')[725].stats.reads.completed, 0);
    });

  });

  describe('filterUsers(users, filterBy)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const cohortUsers = users.filter(user => user.role === 'student' && user.signupCohort === cohort.id);
    const processed = computeUsersStats(cohortUsers, progress, courses);
    const ordered = sortUsers(processed, 'name', 'ASC');

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', () => {
      assert.deepEqual(filterUsers(ordered, 'melissa')[0].name, 'Melissa');
      assert.deepEqual(filterUsers(ordered, 'melissa')[1].name, 'Melissa');
      assert.deepEqual(filterUsers(ordered, 'melissa')[2].name, 'Melissa Echeverria');
      assert.deepEqual(filterUsers(ordered, 'melissa')[3].name, 'Melissa González');
      assert.deepEqual(filterUsers(ordered, 'melissa')[4].name, 'Melissa Rosario Collantes Soto');
    });
  });

  describe('processCohortData({cohort, cohortData, orderBy, orderDirection, search})', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const options = {
      cohort,
      cohortData: { users, progress },
      orderBy: 'name',
      orderDirection: 'ASC',
      search: 'milu',
    }
    const otherOptions = {
      cohort,
      cohortData: { users, progress },
      orderBy: 'name',
      orderDirection: 'ASC',
      search: '',
    }

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {

      const processed = processCohortData(options);
      const otherProcessed = processCohortData(otherOptions);

      assert.isArray(processed);
      assert.deepEqual(processed[0].name, 'Gerine Miluska González Zárate');
      assert.isArray(otherProcessed);
      
      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });
  });
});

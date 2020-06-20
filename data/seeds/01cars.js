
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cars')
    .truncate()
    .then(async function () {
      // Inserts seed entries
      await knex('cars').insert([
        {
          VIN: '12f7398adadafdad',
          make: 'ford',
          model: 'escort',
          milage: '123525',
          transmissionType: 'auto',
        },
        {
          VIN: '345ada454adfadfa',
          make: 'chevolet',
          model: 's10',
          milage: '245103',
          transmissionType: 'standard',
          titlestatus: 'salvage',
        },
        {
          VIN: 'fad74ada131adfad',
          make: 'kia',
          model: 'sorento',
          milage: '54213',
          titlestatus: 'clear',
        },
      ]);
    });
};


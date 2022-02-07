const faker = require('faker');

const generateUser = ({
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  department,
  createdAt = new Date()
} = {}) => ({
  firstName,
  lastName,
  department,
  createdAt
});

const generateArticle = ({
  name = faker.random.words(2),
  description = faker.random.words(10),
  type,
  tags = []
} = {}) => ({
  name,
  description,
  type,
  tags
});

function generateData(types, total, callback, key) {
  let index = 0;
  let count = 0;
  return new Array(types.length * total).fill().map(() => {
    if (count === total) {
      index++;
      count = 1;
    } else {
      count++;
    }
    return callback({[key]: types[index]});
  });
}

module.exports = {
  mapUser: generateUser,
  getRandomFirstName: () => faker.name.firstName(),
  mapArticle: generateArticle,
  generateData
};

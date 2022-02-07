'use strict';
const students = require('./students.json');
const {mapUser, getRandomFirstName, mapArticle, generateData} = require('./util');

// db connection and settings
const connection = require('./config/connection');
const faker = require('faker');
let collection;
run();

async function run() {
  await connection.connect();

  // await connection.get().dropCollection('users');
  // await connection.get().createCollection('users');
  // collection = connection.get().collection('users');

  // await userTask1();
  // await userTask2();
  // await userTask3();
  //await userTask4();

  // await connection.get().dropCollection('articles');
  // await connection.get().createCollection('articles');
  // collection = connection.get().collection('articles');

  // await articleTask1();
  // await articleTask2();
  // await articleTask3();
  // await articleTask4();
  // await articleTask5();

  await connection.get().dropCollection('students');
  await connection.get().createCollection('students');
  collection = connection.get().collection('students');

  await fillStudentsCollection();

  //await studentsTask1();
  //await studentsTask2();
  // await studentsTask3();
  // await studentsTask4();
  //await studentsTask5();
  // await studentsTask6();
  await studentsTask7();
  await connection.close();
}

// #### Users

// - Create 2 users per department (a, b, c)
async function userTask1() {
  try {
    const documents = generateData(['a', 'b', 'c'], 2, mapUser, 'department');
    const result = await collection.insertMany(documents);
  } catch (err) {
    console.error(err);
  }
}

// - Delete 1 user from department (a)

async function userTask2() {
  try {
    const result = await collection.deleteOne({department: 'a'});
    const res = await collection.find().toArray();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

// - Update firstName for users from department (b)

async function userTask3() {
  try {
    collection.updateMany({department: 'b'}, {$set: {firstName: getRandomFirstName()}});
    const res = await collection.find().toArray();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

// - Find all users from department (c)
async function userTask4() {
  try {
    const res = await collection.find({department: 'c'}).toArray();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

//### Article

//create 5 articles per type a,b,c
async function articleTask1() {
  try {
    const documents = generateData(['a', 'b', 'c'], 5, mapArticle, 'type');
    const result = await collection.insertMany(documents);
    const res = await collection.find().toArray();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

//Find articles with type a, and update tag list with next value [‘tag1-a’, ‘tag2-a’, ‘tag3’]
async function articleTask2() {
  try {
    const res = await collection.updateMany(
      {type: 'a'},
      {$set: {tags: ['tag1-a', 'tag2-a', 'tag3']}}
    );
  } catch (err) {
    console.error(err);
  }
}

//Add tags [‘tag2’, ‘tag3’, ‘super’] to other articles except articles from type a
async function articleTask3() {
  try {
    const res = await collection.updateMany(
      {type: {$ne: 'a'}},
      {$set: {tags: ['tag2', 'tag3', 'super']}}
    );
  } catch (err) {
    console.error(err);
  }
}

//Find all articles that contains tags [tag2, tag1-a]
async function articleTask4() {
  try {
    const res = await collection.find({tags: {$in: ['tag2', 'tag1-a']}});
  } catch (err) {
    console.error(err);
  }
}

//Pull [tag2, tag1-a] from all articles
async function articleTask5() {
  try {
    const res = await collection.updateMany(
      {tags: {$in: ['tag2', 'tag1-a']}},
      {$pull: {tags: {$in: ['tag2', 'tag1-a']}}}
    );
  } catch (err) {
    console.error(err);
  }
}

// #### Students
async function fillStudentsCollection() {
  try {
    await collection.insertMany(students);
  } catch (err) {
    console.error(err);
  }
}

//Find all students who have the worst score for homework, sort by descent
async function studentsTask1() {
  try {
    const res = await collection
      .aggregate([
        {$unwind: '$scores'},
        {$match: {'scores.type': 'homework'}},
        {$sort: {'scores.score': 1}},
        {$limit: 5},
        {$sort: {'scores.score': -1}}
      ])
      .toArray();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

//Find all students who have the best score for quiz and the worst for homework, sort by ascending
async function studentsTask2() {
  try {
    const res = await collection
      .aggregate([
        {$match: {scores: {$elemMatch: {type: 'quiz', score: {$gte: 90}}}}},
        {$unwind: '$scores'},
        {$match: {'scores.type': 'homework'}},
        {$sort: {'scores.score': 1}},
        {$limit: 5}
      ])
      .toArray();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

//Find all students who have best scope for quiz and exam
async function studentsTask3() {
  try {
    const res = await collection
      .aggregate([
        {$match: {scores: {$elemMatch: {type: 'quiz', score: {$gte: 95}}}}},
        {$match: {scores: {$elemMatch: {type: 'exam', score: {$gte: 95}}}}}
      ])
      .toArray();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

//Calculate the average score for homework for all students
async function studentsTask4() {
  try {
    const res = await collection
      .aggregate([
        {$unwind: '$scores'},
        {$match: {'scores.type': 'homework'}},
        {$group: {_id: null, avg: {$avg: '$scores.score'}}}
      ])
      .toArray();
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

//Delete all students that have homework score <= 60
async function studentsTask5() {
  try {
    const res = await collection.deleteMany({
      scores: {$elemMatch: {type: 'homework', score: {$lte: 60}}}
    });
  } catch (err) {
    console.error(err);
  }
}

//Mark students that have quiz score => 80
async function studentsTask6() {
  try {
    const res = await collection.updateMany(
      {
        scores: {$elemMatch: {type: 'quiz', score: {$gte: 80}}}
      },
      {$set: {mark: 'mark'}}
    );
  } catch (err) {
    console.error(err);
  }
}

//Write a query that group students by 3 categories (calculate the average grade for three subjects)
// - a => (between 0 and 40)
//   - b => (between 40 and 60)
//   - c => (between 60 and 100)
async function studentsTask7() {
  try {
    const res = await collection.aggregate([
      {$unwind: '$scores'},
      {$group: {_id: '$name', avg: {$avg: '$scores.score'}}},
      {
        $project: {
          _id: '$_id',
          avg: '$avg',
          category: {
            $cond: {
              if: {$lte: ['$avg', 40]},
              then: 'a',
              else: {
                $cond: {
                  if: {$lte: ['$avg', 60]},
                  then: 'b',
                  else: 'c'
                }
              }
            }
          }
        }
      }
    ]);
  } catch (err) {
    console.error(err);
  }
}

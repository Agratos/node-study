const { MongoClient } = require('mongodb');

// MongoDB 연결 URL과 연결 옵션을 설정합니다.
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect(); // MongoClient 연결을 활성화합니다.
    const database = client.db('firstDB');
    const users = database.collection('users');

    //const userData = await users.insertOne({ name: 'lee', age: 17 });
    // const userList = [
    //   { name: 'test4', age: 4 },
    //   { name: 'test5', age: 5 },
    //   { name: 'test6', age: 6 },
    // ];
    // const userListResult = await users.insertMany(userList);
    // console.log(userListResult);

    //const findUser = await users.findOne({ name: 'lee' });
    // const findUsers = await users.find({ age: { $lt: 2 } }).toArray();
    // console.log(findUsers);

    // const updateUser = await users.updateOne(
    //   { name: 'lee' },
    //   { $set: { age: 40 } }
    // );
    // console.log(updateUser);

    // const deleteUsers = await users.deleteMany({ age: { $lt: 15 } });
    // console.log(deleteUsers);

    const userData = await users
      .find({ name: 'lee' })
      .project({ _id: 0, name: 1 })
      .toArray();
    console.log('userData', userData);
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
  }
}

run();

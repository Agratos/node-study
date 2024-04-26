const { MongoClient } = require('mongodb');
const practiceData = require('./practice.json');

async function main() {
  const url = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(url);
  try {
    await client.connect();
    const database = client.db('practice');
    const inventory = database.collection('inventory');
    const students = database.collection('students');
    const solutionName = process.argv[2];

    await practiceCode(inventory, students, solutionName);
  } catch (error) {
    console.error(`Failed to connect to MongoDB...`, error);
  } finally {
    await client.close();
  }
}

async function practiceCode(inventory, students, solutionName) {
  let results = '';
  try {
    switch (solutionName) {
      case '문제1':
        console.log('문제1: insertOne');
        await insertOneItem(inventory, practiceData.inventoryData);
        break;
      case '문제2':
        console.log('문제2: insertMany');
        await insertManyItems(inventory, practiceData.inventoryDatas);
        break;
      case '문제3':
        console.log('문제3: 모든 데이터 찾아라');
        results = await inventory.find().toArray();
        break;
      case '문제4':
        console.log('문제4: status가 b인 데이터를 찾아라');
        results = await inventory.find({ status: 'D' }).toArray();
        break;
      case '문제5':
        console.log('문제5: status가 A 이고 qty가 50인 데이터를 찾아라');
        results = await inventory.find({ status: 'A', qty: 50 }).toArray();
        break;
      case '문제6':
        console.log('문제6: status가 A 또는 D인 데이터를 찾자');
        results = await inventory.find({ status: { $in: ['A', 'D'] } }).toArray();
        break;
      case '문제7':
        console.log('문제7: status가 A 이고 qty가 30보다 작은 데이터를 찾자');
        results = await inventory.find({ status: 'A', qty: { $lt: 30 } }).toArray();
        break;
      case '문제8':
        console.log('문제8: status가 A이거나 qty가 30보다 작은 데이터를 찾자');
        results = await inventory.find({ $or: [{ status: 'A' }, { qty: { $lt: 30 } }] }).toArray();
        break;
      case '문제9':
        console.log('문제9: size에 uom이 in 인데이터를 찾자');
        results = await inventory.find({ size: { uom: 'in' } }).toArray();
        break;
      case '문제10':
        console.log('문제10: size에 h가 10을 초과하는 데이터를 찾자');
        results = await inventory.find({ size: { h: { $mt: 10 } } }).toArray();
        break;
      case '문제11':
        console.log('문제11: id가 3인 학생에게 test3 의 점수를 98로 세팅하자');
        await insertManyItems(students, practiceData.studentDatas);
        results = await students.updateOne({ _id: 3 }, { $set: { test3: 98 } });
        break;
      case '문제12':
        console.log('문제12: 모든데이터의 test1의 점수를 0으로 세팅하고 status: modified 라는 필드를 추가해라');
        results = await students.updateMany({}, { $set: { status: 'Modified', test1: 0 } });
        break;
      case '문제13':
        console.log('문제13: test2점수가 92 점인 학생을 삭제하자');
        results = await students.deleteOne({ test2: 92 });
        break;
      case '문제14':
        console.log('문제14: test1의 점수가 0인 학생들을 삭제하자');
        results = await students.deleteMany({ test1: 0 });
        break;
    }
    console.log(results);
  } catch (error) {
    console.error(`Error during operation '${solutionName}':`, error);
  }
}

async function insertOneItem(collection, data) {
  try {
    await collection.insertOne(data);
  } catch (error) {
    console.error('Error inserting one item:', error);
    throw error;
  }
}

async function insertManyItems(collection, datas) {
  try {
    await collection.insertMany(datas);
  } catch (error) {
    console.error('Error inserting many items:', error);
    throw error;
  }
}

main();

const MongoClient = require('mongodb').MongoClient;
let mongoClient;

async function getCollection () {
  try {
    mongoClient = new MongoClient('mongodb+srv://admin:admin@clusterrpa-fen33.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
    return mongoClient.connect()
      .then(() => mongoClient.db('tcc_db').collection('fundamentalista_data_collection'))
      .then((collection) =>  collection)
     
  } catch (e) {
    console.log('e', e)
    return e
  }
}

async function search (name) {
  console.log('name', name)
  try {
    return getCollection()
    .then(async (collection) =>  collection.find({ 'dados_da_empresa.Nome':  {'$regex': `${name}`} }).toArray())
    .then((result) =>  {
      console.log('result', result)
      return result
    })
  } catch (e) {
    console.log('e', e)
    return e;
  }
}
 
module.exports = {
  search
}
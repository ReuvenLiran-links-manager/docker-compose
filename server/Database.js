const Mongo = require('mongodb');
const sha1 = require('sha1');
const crypto = require('crypto');

const { MongoClient, ObjectID } = Mongo;

let linksDB;
let links;

class LinksDB {
  constructor() {
    links = null;
  }

  static getInstnace(url) {
    this.initialize(url);  
    return linksDB;
  }  

  static async initialize(url) {
    try {
      const mongo = await MongoClient.connect(url, { 
        useNewUrlParser: true,
        socketTimeoutMS: 100000
      });
      // const { dbName } = mongo.s.options;
      const myDB = mongo.db('Links');
      console.log('CONNECTED');
      links = await myDB.createCollection('links');

    } catch(e) {
      console.error(e);
    }
  }

  async getLinks() {
    return await links.find().toArray();
  }
  async insertLink({
    link,
    description,
  }) {
    const _id = crypto.createHash('md5')
      .update(link)
      .digest('hex');

    const newLink = {
      link,
      description,
      _id,
    };
    try {
      let r = await links.insertOne(newLink);
      const createdLink = r.ops[0];
      return createdLink;
    } catch (err) {
      // console.error('createdLink', err);
      return err;
    }
  }
}

linksDB = new LinksDB();

module.exports = LinksDB;
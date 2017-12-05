const Datastore = require('nedb')
var dbName = process.env.NODE_ENV + '_quotes.db'
const database = new Datastore({ filename: dbName, autoload: true })

module.exports = database;

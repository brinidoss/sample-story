import { MongoClient } from 'mongodb';
import * as functions from 'firebase-functions';

const uri = functions.config().mongodb.uri || '';
if (!uri) {
  console.error("ERROR: Missing environment");
}
console.log(uri);
const client: MongoClient = new MongoClient(uri);

export const getClient = async () => {
	await client.connect();
	return client;
};
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || "";
if (!uri) {
  console.error("ERROR: Missing environment variable MONGO_URI.");
}
console.log(uri);
const client:MongoClient = new MongoClient(uri);

export const getClient = async () => {
	await client.connect();
	return client;
};
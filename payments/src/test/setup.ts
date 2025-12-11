import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

jest.mock('../nats-wrapper.ts');
declare global {
  var signin: (id?: string) => string[];
}

let mongo: MongoMemoryServer;
jest.setTimeout(30000); // 30 seconds — Needed for MongoDB binary download
beforeAll(async () => {
  process.env.JWT_KEY = 'testsds';

  // Start in-memory mongodb
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {
    dbName: 'testdb',
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  // Close mongoose
  await mongoose.connection.close();

  // Stop in-memory mongodb
  if (mongo) {
    await mongo.stop();
  }
});

global.signin = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};

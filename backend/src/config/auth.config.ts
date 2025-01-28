import * as session from 'express-session';
import * as connectMongoDBSession from 'connect-mongodb-session';

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_CONNECTION_STRING!,
  databaseName: process.env.MONGODB_DB_NAME,
  collection: process.env.MONGODB_COLLECTION_NAME!,
  expires: Number(process.env.SESSION_MAX_AGE),
});

export const sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, //does not set a cookie if set to true
    maxAge: Number(process.env.SESSION_MAX_AGE),
    httpOnly: true,
  },
  store,
};

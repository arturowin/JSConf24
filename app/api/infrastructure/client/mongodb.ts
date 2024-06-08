import { MongoClient, Db } from 'mongodb';

class MongoDBSingleton {
  private static instance: MongoDBSingleton;
  private db: Db | undefined;
  private connectionPromise: Promise<void>;

  private constructor() {
    const url = process.env.MONGODB_ATLAS_URI as string;
    const dbName = 'js_conf_2024';

    const client = new MongoClient(url);

    this.connectionPromise = client.connect()
        .then(() => {
          this.db = client.db(dbName);
        })
        .catch(err => {
          console.error('Error connecting to MongoDB:', err);
          throw err;
        });
  }

  public static async getInstance(): Promise<MongoDBSingleton> {
    if (!MongoDBSingleton.instance) {
      MongoDBSingleton.instance = new MongoDBSingleton();
      await MongoDBSingleton.instance.connectionPromise;
    }
    return MongoDBSingleton.instance;
  }

  public getDB(): Db {
    if (!this.db) {
      throw new Error('MongoDB connection not established');
    }
    return this.db;
  }
}

export default MongoDBSingleton;


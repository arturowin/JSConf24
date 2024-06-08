import { promises as fsp } from 'fs';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MongoDBAtlasVectorSearch } from 'langchain/vectorstores/mongodb_atlas';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const DB_NAME = 'js_conf_2024';
const COLLECTION_NAME = 'embeddings';
const DOCUMENTS_DIR = 'assets/docs'

const COLLECTION_INDEX_NAME = 'default';
const COLLECTION_TEXT_KEY = 'text';
const COLLECTION_EMBEDDING_KEY = 'embedding';

async function run() {
    const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
    try {
        await client.connect();
        const collection = client.db(DB_NAME).collection(COLLECTION_NAME);

        const fileNames = await fsp.readdir(DOCUMENTS_DIR);
        console.log(fileNames);

        for (const fileName of fileNames) {
            try {
                const document = await fsp.readFile(`${DOCUMENTS_DIR}/${fileName}`, "utf8");
                console.log(`*** Embedding *** ${fileName}`);
                const splitter = new RecursiveCharacterTextSplitter({
                    chunkSize: 850,
                    chunkOverlap: 50,
                });
                const output = await splitter.createDocuments([document]);

                await MongoDBAtlasVectorSearch.fromDocuments(
                    output,
                    new OpenAIEmbeddings(),
                    {
                        collection,
                        indexName: COLLECTION_INDEX_NAME,
                        textKey: COLLECTION_TEXT_KEY,
                        embeddingKey: COLLECTION_EMBEDDING_KEY,
                    }
                );

                console.log(`Successfully vectorized and stored ${fileName}`);
            } catch (fileError) {
                console.error(`Error processing file ${fileName}:`, fileError);
            }
        }
    } catch (dbError) {
        console.error('Database connection error:', dbError);
    } finally {
        console.log('Closing connection');
        await client.close();
    }
}
run().catch((error) => console.error('Unhandled error:', error));
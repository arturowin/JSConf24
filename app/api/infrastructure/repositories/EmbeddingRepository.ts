import MongoDBSingleton from "../client/mongodb";
export default class EmbeddingRepository {

    private readonly _collection: string;
    private readonly _indexName: string;
    private readonly _textKey: string;
    private readonly _embeddingKey: string;
    private readonly _client: Promise<MongoDBSingleton>

    get collection(): string {
        return this._collection;
    }

    get indexName(): string {
        return this._indexName;
    }

    get textKey(): string {
        return this._textKey;
    }

    get embeddingKey(): string {
        return this._embeddingKey;
    }

    get client(): Promise<MongoDBSingleton> {
        return this._client;
    }
    constructor() {
        this._client = MongoDBSingleton.getInstance();
        this._collection = 'embeddings';
        this._indexName = 'default';
        this._textKey = 'text';
        this._embeddingKey = 'embedding'
    }
    public async getEmbeddingsCollection() {
        return (await this.client).getDB().collection(this.collection);
    }
}
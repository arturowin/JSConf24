import {MongoDBAtlasVectorSearch} from "langchain/vectorstores/mongodb_atlas";
import OpenAI from "@/app/api/infrastructure/services/OpenAI";
import EmbeddingRepository from "@/app/api/infrastructure/repositories/EmbeddingRepository";

export default class SearchBehaviour {
    public async vectorSearch(question: string) {
        const openAI = new OpenAI();
        const embeddingsRepository = new EmbeddingRepository();
        const collection = await embeddingsRepository.getEmbeddingsCollection();

        const vectorStore = new MongoDBAtlasVectorSearch(
            openAI.embeddings(), {
                collection,
                indexName: embeddingsRepository.indexName,
                textKey: embeddingsRepository.textKey,
                embeddingKey: embeddingsRepository.embeddingKey,
            });
        return await vectorStore.similaritySearch(question, 4);
    }

}
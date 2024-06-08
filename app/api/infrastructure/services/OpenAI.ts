import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {ChatOpenAI} from "langchain/chat_models/openai";

export default class OpenAI {

    private embeddingModel = 'text-embedding-ada-002';

    private gpt4oModel = 'gpt-4o';
    public embeddings() {
        return new OpenAIEmbeddings({
            modelName: this.embeddingModel,
            stripNewLines: true,
        })
    }

    public llModel() {
        return new ChatOpenAI({
            modelName: this.gpt4oModel,
            streaming: true,
        });
    }
}
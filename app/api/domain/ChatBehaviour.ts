import OpenAI from "@/app/api/infrastructure/services/OpenAI";
import {ChatOpenAI} from "langchain/chat_models/openai";

export default class ChatBehaviour {
    public getLlModel(): ChatOpenAI {
        const openAI = new OpenAI();
        return openAI.llModel();
    }
    public getPromptTemplate (vectorSearchResult: string, currentMessageContent: string): string {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('hy-AM', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const formattedTime = currentDate.toLocaleTimeString('hy-AM', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
       const formattedDateTime = `${formattedDate} ${formattedTime}`;
       return `Դու Javascript կոնֆերանսի (JSConfAM24) վիրտուալ օգնական ես Նինջան,
                    ով սիրով պատասխանում է մարդկանց հարցերին որոնք միայն ու միայն կապված միջոցարման հետ:
                    հիմա Երևանում ${formattedDateTime} 
                  Context sections:
                  ${vectorSearchResult}
                  Question: """
                  ${currentMessageContent}
                  """`
    }
}
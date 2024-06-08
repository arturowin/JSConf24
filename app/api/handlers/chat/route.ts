import {LangChainStream, Message, StreamingTextResponse} from 'ai';
import {AIMessage, HumanMessage} from 'langchain/schema';
import SearchBehaviour from "@/app/api/domain/SearchBehaviour";
import ChatBehaviour from "@/app/api/domain/ChatBehaviour";

const USER = 'user';
export async function POST(req: Request) {
  const { messages } = await req.json();
  const currentMessageContent = messages[messages.length - 1].content;
  const searchBehaviour = new SearchBehaviour();
  const vectorSearch = await searchBehaviour.vectorSearch(currentMessageContent);

  const chatBehaviour = new ChatBehaviour();

  messages[messages.length -1].content = chatBehaviour.getPromptTemplate(
      JSON.stringify(vectorSearch), currentMessageContent
  )

  const { stream, handlers } = LangChainStream();

  chatBehaviour.getLlModel()
    .call(
      (messages as Message[]).map(m =>
        m.role == USER
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
      {},
      [handlers],
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}

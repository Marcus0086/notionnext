import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const { stream, handlers } = LangChainStream();
    const llm = new ChatOpenAI({
      streaming: true,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo",
      maxTokens: 300,
    });

    llm
      .call(
        (messages as Message[]).map((m) =>
          m.role === "user"
            ? new HumanMessage(m.content)
            : m.role === "system"
              ? new SystemMessage(m.content)
              : new AIMessage(m.content),
        ),
        {},
        [handlers],
      )
      .catch(console.error);

    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}

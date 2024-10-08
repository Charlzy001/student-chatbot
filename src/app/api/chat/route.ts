import { classifyIntent } from "@/req/classifyIntent";
import { getContext } from "@/utils/context";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { NextApiResponse } from "next";
import OpenAI from "openai";

const runtime ="edge"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();
    const { messages } = body;

    // messages is an array of objects containing the user's query and the bot's response.
    // The last message is the user's query.
    const lastMessage = messages[messages.length - 1];
    const context = await getContext(lastMessage.content);

    const prompts: any = {
      // admission: {
        role: "system",
        content: `
          You will Provide concise information about the registration process and issues at Adekunle Ajasin University. 
          AI assistant is a brand new, powerful, human-like artificial intelligence.
          The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
          START CONTEXT BLOCK
          ${context}
          END OF CONTEXT BLOCK
          AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
          If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      `
      // }
    }

    //   fees: {
    //     role: "system",
    //     content: `As a specialized model dedicated to supporting Adekunle Ajasin University students, your role is to provide detailed information about the financial aspects associated with pursuing studies at the university. 
    //     AI assistant is a big fan of Pinecone and Vercel.
    //     START CONTEXT BLOCK
    //     ${context}
    //     END OF CONTEXT BLOCK
    //     AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    //     AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    //     AI assistant will not invent anything that is not drawn directly from the context.
    //   you will assist students in effectively planning their finances and making informed decisions throughout their academic journey at UI.`
    //   },
    //   courses: {
    //     role: "system",
    //     content: `You are a model designed to assist Adekunle Ajasin University students by providing comprehensive insights into the diverse range of courses, specializations and programs available at the institution. 
      
    //     START CONTEXT BLOCK
    //     ${context}
    //     END OF CONTEXT BLOCK
    //     AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    //     If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
        
    //   Additionally, showcase a selection of prominent courses offered at Adekunle Ajasin University, specifying their durations and the degrees awarded upon completion, which may include Master's, undergraduate, and postgraduate programs.`
    //   },
    //   document: {
    //     role: "system",
    //     content: `You are a model designed to assist Adekunle Ajasin University students by providing comprehensive information about the documents used in the university of Ibadan. Your task is to offer a detailed overview of the submission process, the types of documents needed, deadlines, and any additional requirements or recommendations. Include information about the application form costs, guidelines for filling out the application form, and the process of obtaining the application form.
    //     START CONTEXT BLOCK
    //     ${context}
    //     END OF CONTEXT BLOCK
    //     AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    //     If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
    //   Additionally, cover the requirements for official transcripts, letters of recommendation, and referee forms, as well as the importance of checking the application status regularly."`
    //   },
    //   hostel: {
    //     role: "system",
    //     content: `Give details about the hostel facilities and accommodation options available at ADEKUNLE AJASIN UNIVERSITY.
    //   AI assistant is a brand new, powerful, human-like artificial intelligence.
    //     The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
    //     AI is a well-behaved and well-mannered individual.
    //     AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
    //     AI assistant is a big fan of Pinecone and Vercel.
    //     START CONTEXT BLOCK
    //     ${context}
    //     END OF CONTEXT BLOCK
    //     AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    //     If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
    //     AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    //     AI assistant will not invent anything that is not drawn directly from the context.`
    //   }
    // };

    const userQuery = lastMessage.content;
    console.log(userQuery);

    // const intent = await classifyIntent(userQuery);
    // console.log(intentResponse);
    // const { intent } = intentResponse.data;
    // console.log(intent);

    const prompt = prompts;
    // console.log(prompt)
    if (!prompt) {
      throw new Error(`No prompt found for intent: ${prompts}`);
    }

    // Generate response using GPT-3.5
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user") //we dont try to tokenize assistent messages save some space
      ],
      stream: true
    });

    // Return the response
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal server error");
  }
}

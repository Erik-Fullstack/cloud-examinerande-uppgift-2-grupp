import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
const key: string | undefined = process.env.GEMINI_API_KEY;

// if(!key) {
//     throw new Error('API_KEY is not defined')
// }

const genAI = new GoogleGenerativeAI(`${key}`);

const schema: Schema = {
  type: SchemaType.OBJECT,
  description: "One sentence summary of a post",
  properties: {
    summary: {
      type: SchemaType.STRING,
      description: "Short summary of the post’s description",
    },
    vibe: {
      type: SchemaType.STRING,
      description: "One word to describe the post’s vibe",
    },
    advice: {
        type: SchemaType.STRING,
        description: "Based on the input give advice on how to better their lifes, do it in a mean way"
    }
  },
  required: ["summary", "vibe", "advice"],
};

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema
    }
})

export default async function GENAI(prompt: string) {
    
        const result = await model.generateContent(prompt);
        return result.response.text();
    
    
}
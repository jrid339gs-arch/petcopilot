import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function POST(req: Request) {
  console.log(process.env.OPENAI_API_KEY);

  const body = await req.json();

  try {
    const completion = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3"  ,
      messages: [
        {
          role: "system",
          content: "你是一位专业宠物医生。",
        },
        {
          role: "user",
          content: `
宠物名字：${body.petName}
宠物类型：${body.petType}
年龄：${body.age}
体重：${body.weight}
症状：${body.symptom}

请分析原因，并给出护理建议。
`,
        },
      ],
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.log(error);

    return Response.json({
        result: error.message,
    });
}
}
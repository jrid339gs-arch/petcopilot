import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.siliconflow.cn/v1",
});

export async function POST(req: Request) {
  console.log("KEY=", process.env.OPENAI_API_KEY);
  console.log("URL=", process.env.OPENAI_BASE_URL);

  const body = await req.json();

  try {
    const completion = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V3",
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
      result: {
        message: error.message,
        status: error.status,
        body: error.error,
        response: error.response?.data,
        cause: error.cause,
      },
    });
  }
}
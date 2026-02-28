import { ChatOpenAI } from "@langchain/openai";
import 'dotenv/config'
import { readFileTool } from "./tools.mjs";

const model = new ChatOpenAI({
    model: process.env.MODEL_NAME,
    apiKey: process.env.API_KEY,
    streaming: true,
    configuration: {
        baseURL: process.env.BASE_URL,
    }
});

const tools = [readFileTool];
const modelWithTools = model.bindTools(tools);


const stream = await modelWithTools.stream("帮我读取一下当前路径下的./.env文件的内容");
const toolCalls = [];
let response = '';
for await (const chunk of stream) {
    console.log('chunk', chunk);
    //process.stdout.write(chunk.content);
    response += chunk.content;
    if (chunk.tool_calls?.length) {
        toolCalls.push(...chunk.tool_calls);
    }
}
console.log('\n');
if (toolCalls.length) {
    console.log('工具调用', toolCalls)
}

import {tool} from "@langchain/core/tools"
import {z} from 'zod'
import fs from 'node:fs/promises'

const readFileTool = tool(
    async ({ path }) => {
        try {
            const content = await fs.readFile(path, 'utf-8');
            return `文件 ${path} 的内容是：\n${content}`;
        } catch (error) {
            return `错误：无法读取文件 ${path}，原因：${error.message}`;
        }
    }, {
    name: "read_file",
    description: "用于读取指定文件的内容。当用户要求查看、获取或读取文件内容时，请使用此工具，并传入正确的文件路径。",
    schema: z.object({
        path: z.string().describe("要读取的文件的完整路径，必须是相对于当前工作目录的有效路径，例如 './.env' 或 '../config.json'"),
    })
}
)

export { 
    readFileTool
}
import "server-only";

import { PublicTool, publicTools } from "@/data/tools";
import { promises as fs } from "fs";
import path from "path";

const TOOL_HTML_DIR = path.join(process.cwd(), "src", "content", "tools", "html");

export function getPublicTools(): PublicTool[] {
  return publicTools;
}

export function getPublicToolById(id: string): PublicTool | null {
  return publicTools.find((tool) => tool.id === id) || null;
}

export async function loadPublicToolHtml(tool: PublicTool): Promise<string> {
  const filePath = path.join(TOOL_HTML_DIR, tool.file);
  return await fs.readFile(filePath, "utf8");
}

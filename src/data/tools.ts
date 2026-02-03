// Types for both Public Tools and User-created Tools

export type ToolCategory = "Image" | "Video" | "File" | "Text" | "Productivity";

export type ToolRuntime = "online" | "offline";
export type ToolStatus = "live" | "draft" | "deprecated";

/**
 * Base interface for all tools
 */
export interface BaseTool {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  icon: string;
  color: string;
  runtime: ToolRuntime;
  status: ToolStatus;
  version: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Official public tool from the code repository
 * Stored as standalone HTML files in /src/content/tools/html/
 */
export interface PublicTool extends BaseTool {
  type: "public";
  file: string;           // Path to HTML file, e.g., "text-cleaner.html"
  author: string;
  authorUrl?: string;
  featured?: boolean;
  downloads?: number;
  rating?: number;
}

/**
 * User-created tool stored in database/localStorage
 */
export interface UserTool extends BaseTool {
  type: "user";
  htmlContent: string;    // Full HTML content
  userId: string;
  isPublic: boolean;      // Can be shared with others
  shareId?: string;       // Unique ID for sharing
  parentId?: string;      // If forked from another tool
  usageCount?: number;
}

/**
 * Union type for all tools
 */
export type Tool = PublicTool | UserTool;

/**
 * Tool metadata index structure (meta.json)
 */
export interface ToolMetaIndex {
  version: string;
  lastUpdated: string;
  tools: PublicTool[];
  categories: ToolCategoryMeta[];
}

export interface ToolCategoryMeta {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

// ============================================================================
// Public Tools - Official tools from the repository
// These are loaded from /public/tools/meta.json at build time
// ============================================================================

export const publicTools: PublicTool[] = [
  {
    id: "text-cleaner",
    type: "public",
    title: "Text Cleaner",
    description: "Clean and normalize text instantly. Remove extra spaces, fix line breaks, standardize quotes, and convert case.",
    category: "Text",
    tags: ["text", "clean", "format", "normalize"],
    icon: "🧹",
    color: "#4facfe",
    runtime: "offline",
    status: "live",
    version: "1.0.0",
    file: "text-cleaner.html",
    author: "AgentSannyii Team",
    authorUrl: "https://agentjarvis.dev",
    createdAt: "2025-02-03",
    updatedAt: "2025-02-03",
    featured: true,
  },
  {
    id: "gif-cropper",
    type: "public",
    title: "GIF 裁切工具",
    description: "裁切 GIF 动画并导出新文件，支持比例锁定与精确数值控制。",
    category: "Image",
    tags: ["gif", "crop", "animation", "export"],
    icon: "🎞️",
    color: "#00f5ff",
    runtime: "offline",
    status: "live",
    version: "1.0.0",
    file: "gif-cropper.html",
    author: "AgentSannyii Team",
    createdAt: "2026-02-03",
    updatedAt: "2026-02-03",
    featured: true,
  },
  {
    id: "image-cropper",
    type: "public",
    title: "图片裁切工具",
    description: "自定义输出尺寸和比例，拖拽裁切区域实时预览。",
    category: "Image",
    tags: ["image", "crop", "resize", "ratio"],
    icon: "🖼️",
    color: "#00f5ff",
    runtime: "offline",
    status: "live",
    version: "1.0.0",
    file: "image-cropper.html",
    author: "AgentSannyii Team",
    createdAt: "2026-02-03",
    updatedAt: "2026-02-03",
    featured: true,
  },
  {
    id: "macos-icon-generator",
    type: "public",
    title: "macOS App Icon Generator",
    description: "上传正方形图片，一键生成多尺寸 macOS 应用图标并打包下载。",
    category: "Image",
    tags: ["macos", "icon", "generator", "zip"],
    icon: "🍎",
    color: "#00f5ff",
    runtime: "online",
    status: "live",
    version: "1.0.0",
    file: "macos-icon-generator.html",
    author: "AgentSannyii Team",
    createdAt: "2026-02-03",
    updatedAt: "2026-02-03",
    featured: false,
  },
];

// ============================================================================
// Category definitions
// ============================================================================

export const toolCategories: ToolCategoryMeta[] = [
  {
    id: "image",
    name: "Image",
    icon: "🎨",
    color: "#00f5ff",
    description: "Image editing, conversion, and manipulation tools",
  },
  {
    id: "video",
    name: "Video",
    icon: "🎬",
    color: "#ff2a9d",
    description: "Video processing, conversion, and editing utilities",
  },
  {
    id: "file",
    name: "File",
    icon: "📁",
    color: "#bd34fe",
    description: "File management, conversion, and organization tools",
  },
  {
    id: "text",
    name: "Text",
    icon: "📝",
    color: "#4facfe",
    description: "Text processing, cleaning, and transformation utilities",
  },
  {
    id: "productivity",
    name: "Productivity",
    icon: "⚡",
    color: "#ffd700",
    description: "Tools to boost your productivity and workflow",
  },
];

// ============================================================================
// Utility functions
// ============================================================================

/**
 * Get category metadata by ID
 */
export function getCategoryById(id: string): ToolCategoryMeta | undefined {
  return toolCategories.find((c) => c.id === id.toLowerCase());
}

/**
 * Get category color
 */
export function getCategoryColor(category: string): string {
  const cat = toolCategories.find((c) => c.id === category.toLowerCase());
  return cat?.color || "#00f5ff";
}

/**
 * Get category icon
 */
export function getCategoryIcon(category: string): string {
  const cat = toolCategories.find((c) => c.id === category.toLowerCase());
  return cat?.icon || "🔧";
}

/**
 * Check if tool is offline-ready
 */
export function isOfflineTool(tool: Tool): boolean {
  return tool.runtime === "offline";
}

/**
 * Get tool source path (server-only usage)
 */
export function getToolPath(tool: PublicTool): string {
  return `src/content/tools/html/${tool.file}`;
}

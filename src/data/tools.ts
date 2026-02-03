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
 * Stored as standalone HTML files in /public/tools/
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
];

// ============================================================================
// Placeholder tools for the gallery (will be replaced with real data)
// ============================================================================

export const toolCards: Array<{
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  runtime: string;
  status: ToolStatus;
}> = [
  {
    id: "text-cleaner",
    title: "Text Cleaner",
    description: "Remove extra spaces, fix line breaks, standardize quotes, and convert case.",
    category: "Text",
    runtime: "Offline",
    status: "live",
  },
  {
    id: "image-slicer",
    title: "Image Slice Lab",
    description: "Cut sprites or social images into precise tiles with live previews.",
    category: "Image",
    runtime: "Offline",
    status: "draft",
  },
  {
    id: "gif-splitter",
    title: "GIF Splitter",
    description: "Extract frames or segments from animated GIFs in one click.",
    category: "Video",
    runtime: "Offline",
    status: "draft",
  },
  {
    id: "format-converter",
    title: "Format Converter",
    description: "Batch convert images and docs between modern formats.",
    category: "File",
    runtime: "Offline",
    status: "draft",
  },
  {
    id: "video-catcher",
    title: "Video Catcher",
    description: "Download, trim, and repackage videos into share-ready clips.",
    category: "Video",
    runtime: "Online",
    status: "draft",
  },
  {
    id: "prompt-card",
    title: "Prompt Card Builder",
    description: "Generate prompt templates as printable HTML cards.",
    category: "Productivity",
    runtime: "Offline",
    status: "draft",
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
 * Get tool file path (for public tools)
 */
export function getToolPath(tool: PublicTool): string {
  return `/tools/${tool.file}`;
}

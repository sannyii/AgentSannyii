import { PublicTool, UserTool, Tool, toolCategories, getCategoryById, publicTools } from "@/data/tools";

// ============================================================================
// Tool Loading Service
// Handles loading tools from public repository or user storage
// ============================================================================

/**
 * Load public tool metadata from local index
 */
export async function loadPublicToolsMeta(): Promise<PublicTool[]> {
  return publicTools;
}

/**
 * Get a tool by ID (checks public tools first, then user tools)
 */
export async function getToolById(id: string): Promise<Tool | null> {
  // Try public tools first
  const publicTools = await loadPublicToolsMeta();
  const publicTool = publicTools.find((t) => t.id === id);
  if (publicTool) {
    return publicTool;
  }

  // Try user tools from localStorage (for MVP)
  const userTools = getUserToolsFromStorage();
  const userTool = userTools.find((t) => t.id === id);
  if (userTool) {
    return userTool;
  }

  return null;
}

/**
 * Load HTML content for a tool
 */
export async function loadToolHtml(tool: Tool): Promise<string> {
  if (tool.type === "public") {
    // For public tools, fetch from the public directory
    const response = await fetch(`/tools/${tool.file}`);
    if (!response.ok) {
      throw new Error(`Failed to load tool HTML: ${tool.file}`);
    }
    return response.text();
  } else {
    // User tool - HTML is stored in the object
    return tool.htmlContent;
  }
}

// ============================================================================
// User Tools - LocalStorage (MVP Implementation)
// ============================================================================

const USER_TOOLS_KEY = "agentjarvis_user_tools";

/**
 * Get all user tools from localStorage
 */
export function getUserToolsFromStorage(): UserTool[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(USER_TOOLS_KEY);
    if (!stored) return [];
    
    const tools = JSON.parse(stored) as UserTool[];
    return tools.map((t) => ({ ...t, type: "user" as const }));
  } catch (error) {
    console.error("Error loading user tools:", error);
    return [];
  }
}

/**
 * Save a user tool to localStorage
 */
export function saveUserToolToStorage(tool: UserTool): void {
  if (typeof window === "undefined") return;
  
  try {
    const existing = getUserToolsFromStorage();
    const index = existing.findIndex((t) => t.id === tool.id);
    
    if (index >= 0) {
      // Update existing
      existing[index] = tool;
    } else {
      // Add new
      existing.push(tool);
    }
    
    localStorage.setItem(USER_TOOLS_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error("Error saving user tool:", error);
  }
}

/**
 * Delete a user tool from localStorage
 */
export function deleteUserToolFromStorage(id: string): void {
  if (typeof window === "undefined") return;
  
  try {
    const existing = getUserToolsFromStorage();
    const filtered = existing.filter((t) => t.id !== id);
    localStorage.setItem(USER_TOOLS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting user tool:", error);
  }
}

// ============================================================================
// Tool Statistics & Analytics
// ============================================================================

const TOOL_STATS_KEY = "agentjarvis_tool_stats";

interface ToolStats {
  toolId: string;
  views: number;
  downloads: number;
  lastUsed: string;
}

/**
 * Record a tool view
 */
export function recordToolView(toolId: string): void {
  if (typeof window === "undefined") return;
  
  try {
    const stats = getToolStats();
    const existing = stats.find((s) => s.toolId === toolId);
    
    if (existing) {
      existing.views++;
      existing.lastUsed = new Date().toISOString();
    } else {
      stats.push({
        toolId,
        views: 1,
        downloads: 0,
        lastUsed: new Date().toISOString(),
      });
    }
    
    localStorage.setItem(TOOL_STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Error recording tool view:", error);
  }
}

/**
 * Record a tool download
 */
export function recordToolDownload(toolId: string): void {
  if (typeof window === "undefined") return;
  
  try {
    const stats = getToolStats();
    const existing = stats.find((s) => s.toolId === toolId);
    
    if (existing) {
      existing.downloads++;
    } else {
      stats.push({
        toolId,
        views: 0,
        downloads: 1,
        lastUsed: new Date().toISOString(),
      });
    }
    
    localStorage.setItem(TOOL_STATS_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Error recording tool download:", error);
  }
}

/**
 * Get all tool stats
 */
export function getToolStats(): ToolStats[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(TOOL_STATS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get related tools based on category and tags
 */
export function getRelatedTools(currentTool: Tool, allTools: Tool[], limit = 3): Tool[] {
  return allTools
    .filter((t) => t.id !== currentTool.id)
    .filter((t) => 
      t.category === currentTool.category ||
      t.tags.some((tag) => currentTool.tags.includes(tag))
    )
    .slice(0, limit);
}

/**
 * Search tools by query
 */
export function searchTools(tools: Tool[], query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Get featured tools
 */
export async function getFeaturedTools(): Promise<PublicTool[]> {
  const tools = await loadPublicToolsMeta();
  return tools.filter((t) => t.featured);
}

// Re-export useful functions from data/tools
export { 
  getCategoryById, 
  getCategoryColor, 
  getCategoryIcon,
  toolCategories
} from "@/data/tools";

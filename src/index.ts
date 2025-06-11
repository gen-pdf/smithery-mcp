#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
// Import tool implementations
import { generate_pdf } from "./tools/generate_pdf.js";
import { log } from "./utils/logger.js";

// Configuration schema for the Gen-PDF API key
export const configSchema = z.object({
  genPdfApiKey: z
    .string()
    .optional()
    .describe("Gen-PDF API key for PDF generation operations"),
  debug: z.boolean().default(false).describe("Enable debug logging"),
});

/**
 * Gen-PDF Generation MCP Server
 *
 * This MCP server integrates Gen-PDF's PDF generation capabilities with Claude and other MCP-compatible clients.
 * Gen-PDF is a markdown-to-PDF conversion service that creates professional documents with advanced typography,
 * code highlighting, math expressions, and customizable styling options.
 *
 * The server provides a tool that enables:
 * - Converting markdown content to professional PDF documents
 * - Customizable styling options (dark mode, fonts, margins)
 * - Advanced formatting (code highlighting, LaTeX math, tables)
 * - Real-time PDF generation with hosted file links
 */

export default function ({ config }: { config: z.infer<typeof configSchema> }) {
  try {
    if (config.debug) {
      log("Starting Gen-PDF MCP Server in debug mode");
    }

    // Create MCP server
    const server = new McpServer({
      name: "gen-pdf-server",
      version: "1.0.0",
    });

    log("Server initialized with modern MCP SDK and Smithery CLI support");

    // Register the generate_pdf tool
    generate_pdf(server, { genPdfApiKey: config.genPdfApiKey });

    if (config.debug) {
      log("Registered generate_pdf tool for PDF generation");
    }

    // Return the server object (Smithery CLI handles transport)
    return server.server;
  } catch (error) {
    log(
      `Server initialization error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    throw error;
  }
}

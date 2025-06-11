import { z } from "zod";
import axios from "axios";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { GenPdfRequest, GenPdfResponse } from "../types.js";
import { createRequestLogger } from "../utils/logger.js";

const API_CONFIG = {
  BASE_URL: "https://proxy.gen-pdf.com",
  ENDPOINTS: {
    GENERATE_PDF: "/mcp/generate-pdf",
  },
  TIMEOUT: 30000, // 30 seconds for PDF generation
};

export function generate_pdf(
  server: McpServer,
  config?: { genPdfApiKey?: string }
): void {
  server.tool(
    "generate_pdf",
    "Generate a professional PDF document from markdown content using Gen-PDF. Supports advanced formatting, code highlighting, math expressions, tables, and customizable styling options including dark mode.",
    {
      markdownDocument: z
        .string()
        .describe("Markdown content to convert to PDF"),
      documentTitle: z.string().describe("Title for the PDF document"),
      documentSubtitle: z
        .string()
        .optional()
        .describe("Subtitle for the PDF document"),
      enablePageNumbering: z
        .boolean()
        .optional()
        .describe("Enable page numbering (default: false)"),
      darkMode: z
        .boolean()
        .optional()
        .describe("Enable dark theme for the document (default: false)"),
      pageMargin: z.string().optional().describe("Page margins (default: 2cm)"),
    },
    async ({
      markdownDocument,
      documentTitle,
      documentSubtitle,
      enablePageNumbering,
      darkMode,
      pageMargin,
    }) => {
      const requestId = `generate_pdf-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)}`;
      const logger = createRequestLogger(requestId, "generate_pdf");

      logger.start(`Document: "${documentTitle}"`);

      try {
        // Create a fresh axios instance for each request
        const axiosInstance = axios.create({
          baseURL: API_CONFIG.BASE_URL,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${process.env.GEN_PDF_API_KEY || ""}`,
          },
        });

        const pdfRequest: GenPdfRequest = {
          document: markdownDocument,
          title: documentTitle,
          pageNumbering: enablePageNumbering ?? false,
        };

        logger.log("Sending request to Gen-PDF API for PDF generation");

        const response = await axiosInstance.post<GenPdfResponse>(
          API_CONFIG.ENDPOINTS.GENERATE_PDF,
          pdfRequest,
          { timeout: API_CONFIG.TIMEOUT }
        );

        console.log(response.data);

        logger.log("Received response from Gen-PDF API");

        if (!response.data || !response.data.url) {
          logger.log("Warning: PDF generation failed");
          return {
            content: [
              {
                type: "text" as const,
                text: `PDF generation failed: ${"Unknown error"}`,
              },
            ],
            isError: true,
          };
        }

        logger.log(
          `PDF generated successfully. Document ID: ${response.data.url}`
        );

        const result = {
          content: [
            {
              type: "text" as const,
              text: `✅ PDF generated successfully! 🔗 **Download Link**: ${response.data.url}`,
            },
          ],
        };

        logger.complete();
        return result;
      } catch (error) {
        logger.error(error);

        if (axios.isAxiosError(error)) {
          // Handle Axios errors specifically
          const statusCode = error.response?.status || "unknown";
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message;

          logger.log(`Axios error (${statusCode}): ${errorMessage}`);

          let userFriendlyMessage = `PDF generation failed (${statusCode}): ${errorMessage}`;

          if (statusCode === 401) {
            userFriendlyMessage =
              "Authentication failed. Please check your GEN_PDF_API_KEY is valid and properly configured.";
          } else if (statusCode === 429) {
            userFriendlyMessage =
              "Rate limit exceeded. Please try again in a few moments.";
          } else if (statusCode === 500) {
            userFriendlyMessage =
              "Internal server error. Please try again or contact support if the issue persists.";
          }

          return {
            content: [
              {
                type: "text" as const,
                text: userFriendlyMessage,
              },
            ],
            isError: true,
          };
        }

        // Handle generic errors
        return {
          content: [
            {
              type: "text" as const,
              text: `PDF generation error: ${
                error instanceof Error ? error.message : String(error)
              }`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}

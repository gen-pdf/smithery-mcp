// Gen-PDF API Types
export interface GenPdfRequest {
  document: string;
  title?: string;
  subtitle?: string;
  authors?: string[];
  pageMargin?: "small" | "medium" | "large";
  cover?: boolean;
  toc?: boolean;
  enablePageNumbering?: boolean;
}

export interface GenPdfResponse {
  url: string;
}

// Tool Types
export interface GeneratePdfArgs {
  markdown: string;
  documentTitle: string;
  darkMode?: boolean;
  fontFamily?: string;
  fontSize?: string;
  pageMargin?: string;
  enableMath?: boolean;
  enableCodeHighlighting?: boolean;
}

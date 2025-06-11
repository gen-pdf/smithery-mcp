# Gen-PDF MCP Server 📄

[![npm version](https://badge.fury.io/js/gen-pdf-mcp-server.svg)](https://www.npmjs.com/package/gen-pdf-mcp-server)
[![smithery badge](https://smithery.ai/badge/gen-pdf)](https://smithery.ai/server/gen-pdf)

A Model Context Protocol (MCP) server that enables AI assistants like Claude to generate professional PDF documents from markdown content using the Gen-PDF API. This setup allows AI models to create high-quality PDF documents with advanced typography and styling in real-time.

## Remote Gen-PDF MCP 🌐

Connect directly to Gen-PDF's hosted MCP server (instead of running it locally).

### Remote Gen-PDF MCP URL

```
https://mcp.gen-pdf.com/mcp?genPdfApiKey=your-gen-pdf-api-key
```

Replace `your-gen-pdf-api-key` with your actual Gen-PDF API key from [dashboard.gen-pdf.com/api-keys](https://dashboard.gen-pdf.com/api-keys).

### Claude Desktop Configuration for Remote MCP

Add this to your Claude Desktop configuration file:

```json
{
  "mcpServers": {
    "gen-pdf": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.gen-pdf.com/mcp?genPdfApiKey=your-gen-pdf-api-key"
      ]
    }
  }
}
```

### NPM Installation

```bash
npm install -g gen-pdf-mcp-server
```

### Using Smithery

To install the Gen-PDF MCP server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/gen-pdf):

```bash
npx -y @smithery/cli install gen-pdf --client claude
```

## Configuration ⚙️

### 1. Configure Claude Desktop to recognize the Gen-PDF MCP server

You can find claude_desktop_config.json inside the settings of Claude Desktop app:

Open the Claude Desktop app and enable Developer Mode from the top-left menu bar.

Once enabled, open Settings (also from the top-left menu bar) and navigate to the Developer Option, where you'll find the Edit Config button. Clicking it will open the claude_desktop_config.json file, allowing you to make the necessary edits.

OR (if you want to open claude_desktop_config.json from terminal)

#### For macOS:

1. Open your Claude Desktop configuration:

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

#### For Windows:

1. Open your Claude Desktop configuration:

```powershell
code %APPDATA%\Claude\claude_desktop_config.json
```

### 2. Add the Gen-PDF server configuration:

```json
{
  "mcpServers": {
    "gen-pdf": {
      "command": "npx",
      "args": ["-y", "gen-pdf-mcp-server"],
      "env": {
        "GEN_PDF_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

Replace `your-api-key-here` with your actual Gen-PDF API key from [dashboard.gen-pdf.com/api-keys](https://dashboard.gen-pdf.com/api-keys).

### 3. Available Tool

The Gen-PDF MCP server includes one powerful tool:

- **generate_pdf**: Converts markdown content into professionally formatted PDF documents with customizable styling options including dark mode, typography controls, and advanced document formatting.

## Tool Usage

### generate_pdf

Convert markdown content to a professional PDF document:

````markdown
Please generate a PDF from this markdown content:

# My Report

This is a **bold** statement with some `inline code`.

## Features

- Professional typography
- Code syntax highlighting
- Math equation support: $E = mc^2$
- Tables and lists
- Dark mode support

## Code Example

```javascript
function hello() {
  console.log("Hello, world!");
}
```
````

Options: Enable dark mode and set title to "Technical Report"

````

The tool will return a direct link to the generated PDF file hosted on Gen-PDF's CDN.

### Features Supported:
- **Headers (H1-H6)**: Custom spacing and typography
- **Text Formatting**: Bold, italic, strikethrough
- **Code Blocks**: Syntax highlighting for 50+ languages
- **Inline Code**: Highlighted code snippets
- **Mathematical Expressions**: LaTeX math support
- **Tables**: Auto-formatted tables with proper sizing
- **Lists**: Ordered and unordered lists with nesting
- **Links**: Clickable PDF links
- **Images**: Automatic image sizing and embedding
- **Dark Mode**: Professional dark theme option
- **Custom Typography**: IBM Plex Sans font family

## Using via NPX

If you prefer to run the server directly, you can use npx:

```bash
# Run the Gen-PDF MCP server
npx gen-pdf-mcp-server

# Set your API key via environment variable
GEN_PDF_API_KEY=your-api-key npx gen-pdf-mcp-server
```

## Troubleshooting 🔧

### Common Issues

1. **Server Not Found**

   - Verify the npm link is correctly set up
   - Check Claude Desktop configuration syntax (json file)

2. **API Key Issues**

   - Confirm your GEN_PDF_API_KEY is valid
   - Check the GEN_PDF_API_KEY is correctly set in the Claude Desktop config
   - Verify no spaces or quotes around the API key
   - Get your API key from [dashboard.gen-pdf.com/api-keys](https://dashboard.gen-pdf.com/api-keys)

3. **Connection Issues**

   - Restart Claude Desktop completely
   - Check Claude Desktop logs for error messages
   - Verify the Gen-PDF API service is accessible

4. **PDF Generation Issues**
   - Ensure your markdown syntax is valid
   - Check for unsupported markdown features
   - Verify the API endpoint is responding

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
DEBUG=1 npx gen-pdf-mcp-server
```

### Example Configuration

Complete Claude Desktop configuration example:

```json
{
  "mcpServers": {
    "gen-pdf": {
      "command": "npx",
      "args": ["-y", "gen-pdf-mcp-server"],
      "env": {
        "GEN_PDF_API_KEY": "your-actual-api-key-here",
        "DEBUG": "1"
      }
    }
  }
}
```

---

Built with ❤️ by the Gen-PDF team
````

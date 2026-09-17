// MCP API Route
import { NextRequest, NextResponse } from 'next/server'
import { initializeMCPServer, getMCPServer } from '@/lib/mcp/servers/mcpServer'

// Initialize MCP server on first request
let mcpServerInitialized = false

export async function POST(request: NextRequest) {
  try {
    // Initialize MCP server if not already done
    if (!mcpServerInitialized) {
      initializeMCPServer()
      mcpServerInitialized = true
    }

    const server = getMCPServer()

    // For now, we'll just echo back the request body as a simple example
    // In a real implementation, we would handle MCP protocol messages here
    const body = await request.json()

    // This is a placeholder - replace with actual MCP protocol handling
    return NextResponse.json({ 
      status: 'ok', 
      message: 'MCP server received request',
      echo: body 
    })
  } catch (error) {
    console.error('MCP API error:', error)
    return NextResponse.json({ 
      status: 'error', 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}

// Handle GET requests for health check or info
export async function GET(request: NextRequest) {
  try {
    if (!mcpServerInitialized) {
      initializeMCPServer()
      mcpServerInitialized = true
    }

    const server = getMCPServer()

    return NextResponse.json({ 
      status: 'ok', 
      message: 'MCP server is running',
      // Add any server info here
    })
  } catch (error) {
    console.error('MCP API error:', error)
    return NextResponse.json({ 
      status: 'error', 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}
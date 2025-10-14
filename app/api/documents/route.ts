import { NextResponse } from "next/server"
import { mockDocuments } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ documents: mockDocuments })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Simulate document upload and chunking
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newDocument = {
      id: `doc-${Date.now()}`,
      title: body.title || "Untitled Document",
      content: body.content || "",
      department: body.department || "General",
      uploadedAt: new Date().toISOString(),
      chunkCount: Math.floor(body.content?.length / 500) || 10,
    }

    return NextResponse.json({ document: newDocument, message: "Document uploaded successfully" })
  } catch (error) {
    console.error("[v0] Error uploading document:", error)
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
  }
}

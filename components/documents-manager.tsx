"use client"

import { useState } from "react"
import { Upload, FileText, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Document } from "@/lib/types"
import { mockDocuments } from "@/lib/mock-data"

export function DocumentsManager() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)

  const departments = Array.from(new Set(documents.map((doc) => doc.department)))

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = !selectedDepartment || doc.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const handleUpload = () => {
    // Simulated upload
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      title: "New Document",
      content: "Document content...",
      department: "General",
      uploadedAt: new Date().toISOString(),
      chunkCount: 10,
    }
    setDocuments((prev) => [newDoc, ...prev])
  }

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">Document Management</h1>
          <p className="text-pretty text-muted-foreground">Upload and manage documents for your knowledge base</p>
        </div>
        <Button onClick={handleUpload} className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Documents</p>
            <p className="text-2xl font-bold text-foreground">{documents.length}</p>
          </div>
        </Card>
        <Card className="border-border bg-card p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Chunks</p>
            <p className="text-2xl font-bold text-foreground">
              {documents.reduce((sum, doc) => sum + doc.chunkCount, 0)}
            </p>
          </div>
        </Card>
        <Card className="border-border bg-card p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Departments</p>
            <p className="text-2xl font-bold text-foreground">{departments.length}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedDepartment === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDepartment(null)}
          >
            All
          </Button>
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDepartment(dept)}
            >
              {dept}
            </Button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="border-border bg-card p-4 transition-colors hover:bg-secondary">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-balance font-semibold leading-tight text-foreground">{doc.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {doc.department}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(doc.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Chunks:</span>
                  <span className="font-medium text-foreground">{doc.chunkCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded:</span>
                  <span className="font-medium text-foreground">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="border-border bg-card p-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">No documents found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        </Card>
      )}
    </div>
  )
}

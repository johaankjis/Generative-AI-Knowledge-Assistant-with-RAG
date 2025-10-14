"use client"

import type React from "react"

import { useState } from "react"
import { Send, Loader2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ChatMessage } from "@/lib/types"
import { cn } from "@/lib/utils"

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
        sources: data.sources,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">AI Knowledge Assistant</h1>
        <p className="text-pretty text-muted-foreground">
          Ask questions about your enterprise documents and get accurate, real-time answers powered by RAG.
        </p>
      </div>

      {/* Messages */}
      <Card className="flex-1 overflow-y-auto border-border bg-card p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Start a conversation</h3>
              <p className="text-sm text-muted-foreground">
                Ask questions about company policies, procedures, or any information from your knowledge base.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("What is our vacation policy?")}
                className="text-xs"
              >
                What is our vacation policy?
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("How do I deploy to production?")}
                className="text-xs"
              >
                How do I deploy to production?
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("What are the security best practices?")}
                className="text-xs"
              >
                Security best practices?
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] space-y-2 rounded-lg p-4",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.sources && message.sources.length > 0 && (
                    <div className="space-y-2 border-t border-border pt-2">
                      <p className="text-xs font-medium text-muted-foreground">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.sources.map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <FileText className="mr-1 h-3 w-3" />
                            {source.doc_title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start gap-3">
                <div className="max-w-[80%] rounded-lg bg-secondary p-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your documents..."
          className="min-h-[60px] resize-none bg-card text-foreground"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e)
            }
          }}
        />
        <Button type="submit" disabled={!input.trim() || isLoading} size="icon" className="h-[60px] w-[60px]">
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </form>
    </div>
  )
}

export interface DocumentChunk {
  chunk_id: string
  doc_id: string
  text: string
  embedding_vector?: number[]
  metadata: {
    source: string
    timestamp: string
    department: string
    page?: number
  }
}

export interface Document {
  id: string
  title: string
  content: string
  department: string
  uploadedAt: string
  chunkCount: number
}

export interface QueryLog {
  query_id: string
  user_query: string
  retrieved_chunks: string[]
  response_text: string
  latency_ms: number
  accuracy_metrics: {
    precision: number
    recall: number
    factual_consistency: number
  }
  timestamp: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  sources?: {
    doc_id: string
    doc_title: string
    chunk_text: string
  }[]
}

export interface AnalyticsMetrics {
  totalQueries: number
  avgLatency: number
  avgAccuracy: number
  avgPrecision: number
  avgRecall: number
  queriesOverTime: {
    date: string
    count: number
  }[]
  latencyOverTime: {
    date: string
    latency: number
  }[]
  accuracyOverTime: {
    date: string
    accuracy: number
  }[]
}

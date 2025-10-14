import type { Document, QueryLog, AnalyticsMetrics } from "./types"

export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    title: "Employee Handbook 2024",
    content: "Complete guide to company policies, benefits, and procedures...",
    department: "HR",
    uploadedAt: "2024-01-15T10:00:00Z",
    chunkCount: 45,
  },
  {
    id: "doc-2",
    title: "Engineering Best Practices",
    content: "Code review guidelines, deployment procedures, and architecture patterns...",
    department: "Engineering",
    uploadedAt: "2024-01-20T14:30:00Z",
    chunkCount: 32,
  },
  {
    id: "doc-3",
    title: "Sales Playbook Q1 2024",
    content: "Sales strategies, customer personas, and objection handling...",
    department: "Sales",
    uploadedAt: "2024-02-01T09:15:00Z",
    chunkCount: 28,
  },
  {
    id: "doc-4",
    title: "Product Roadmap 2024",
    content: "Feature priorities, release schedule, and strategic initiatives...",
    department: "Product",
    uploadedAt: "2024-02-10T11:45:00Z",
    chunkCount: 18,
  },
  {
    id: "doc-5",
    title: "Security & Compliance Guide",
    content: "Data protection policies, access controls, and audit procedures...",
    department: "Security",
    uploadedAt: "2024-02-15T16:20:00Z",
    chunkCount: 52,
  },
]

export const mockQueryLogs: QueryLog[] = [
  {
    query_id: "q-1",
    user_query: "What is our vacation policy?",
    retrieved_chunks: ["chunk-1-1", "chunk-1-2"],
    response_text:
      "According to the Employee Handbook, full-time employees receive 15 days of paid vacation per year...",
    latency_ms: 245,
    accuracy_metrics: {
      precision: 0.92,
      recall: 0.88,
      factual_consistency: 0.95,
    },
    timestamp: "2024-02-20T10:30:00Z",
  },
  {
    query_id: "q-2",
    user_query: "How do I deploy to production?",
    retrieved_chunks: ["chunk-2-1", "chunk-2-2", "chunk-2-3"],
    response_text:
      "To deploy to production, follow these steps: 1) Create a pull request, 2) Get code review approval...",
    latency_ms: 312,
    accuracy_metrics: {
      precision: 0.89,
      recall: 0.91,
      factual_consistency: 0.93,
    },
    timestamp: "2024-02-20T11:15:00Z",
  },
]

export const mockAnalytics: AnalyticsMetrics = {
  totalQueries: 1247,
  avgLatency: 287,
  avgAccuracy: 0.91,
  avgPrecision: 0.89,
  avgRecall: 0.88,
  queriesOverTime: [
    { date: "Feb 14", count: 145 },
    { date: "Feb 15", count: 167 },
    { date: "Feb 16", count: 189 },
    { date: "Feb 17", count: 156 },
    { date: "Feb 18", count: 178 },
    { date: "Feb 19", count: 201 },
    { date: "Feb 20", count: 211 },
  ],
  latencyOverTime: [
    { date: "Feb 14", latency: 312 },
    { date: "Feb 15", latency: 298 },
    { date: "Feb 16", latency: 285 },
    { date: "Feb 17", latency: 276 },
    { date: "Feb 18", latency: 289 },
    { date: "Feb 19", latency: 271 },
    { date: "Feb 20", latency: 265 },
  ],
  accuracyOverTime: [
    { date: "Feb 14", accuracy: 0.87 },
    { date: "Feb 15", accuracy: 0.88 },
    { date: "Feb 16", accuracy: 0.89 },
    { date: "Feb 17", accuracy: 0.9 },
    { date: "Feb 18", accuracy: 0.91 },
    { date: "Feb 19", accuracy: 0.92 },
    { date: "Feb 20", accuracy: 0.93 },
  ],
}

import { NextResponse } from "next/server"
import { mockDocuments } from "@/lib/mock-data"

// Simulated RAG responses based on common queries
const ragResponses: Record<string, { response: string; sources: { doc_id: string; doc_title: string }[] }> = {
  vacation: {
    response:
      "According to the Employee Handbook 2024, full-time employees receive 15 days of paid vacation per year, accrued monthly. Part-time employees receive prorated vacation based on hours worked. Vacation must be requested at least 2 weeks in advance and approved by your manager. Unused vacation days can be carried over up to 5 days into the next year.",
    sources: [{ doc_id: "doc-1", doc_title: "Employee Handbook 2024" }],
  },
  deploy: {
    response:
      "To deploy to production, follow these steps: 1) Create a pull request with your changes, 2) Get code review approval from at least one senior engineer, 3) Ensure all CI/CD tests pass, 4) Merge to the main branch, 5) The automated deployment pipeline will deploy to staging first, 6) After staging validation, approve the production deployment in the deployment dashboard. Always monitor logs for the first 30 minutes after deployment.",
    sources: [{ doc_id: "doc-2", doc_title: "Engineering Best Practices" }],
  },
  security: {
    response:
      "Our security best practices include: 1) All data must be encrypted at rest and in transit using AES-256, 2) Implement multi-factor authentication for all systems, 3) Follow the principle of least privilege for access controls, 4) Conduct regular security audits and penetration testing, 5) All code must pass security scanning before deployment, 6) Report any security incidents immediately to security@company.com. Compliance with SOC 2 and GDPR is mandatory.",
    sources: [{ doc_id: "doc-5", doc_title: "Security & Compliance Guide" }],
  },
  sales: {
    response:
      "Our Q1 2024 sales strategy focuses on three key areas: 1) Enterprise customer acquisition through targeted outreach to Fortune 500 companies, 2) Product-led growth with a freemium model to increase user adoption, 3) Strategic partnerships with complementary SaaS providers. Key customer personas include IT Directors, CTOs, and Operations Managers. Average deal size is $50K ARR with a 90-day sales cycle.",
    sources: [{ doc_id: "doc-3", doc_title: "Sales Playbook Q1 2024" }],
  },
  product: {
    response:
      "The 2024 product roadmap prioritizes: Q1 - AI-powered analytics dashboard, Q2 - Mobile app launch (iOS/Android), Q3 - Advanced collaboration features and real-time sync, Q4 - Enterprise SSO and advanced security features. We're focusing on improving user retention (target: 85%) and reducing time-to-value for new customers (target: <7 days).",
    sources: [{ doc_id: "doc-4", doc_title: "Product Roadmap 2024" }],
  },
}

function findBestMatch(query: string): { response: string; sources: { doc_id: string; doc_title: string }[] } {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("vacation") || lowerQuery.includes("time off") || lowerQuery.includes("pto")) {
    return ragResponses.vacation
  }
  if (lowerQuery.includes("deploy") || lowerQuery.includes("production") || lowerQuery.includes("release")) {
    return ragResponses.deploy
  }
  if (lowerQuery.includes("security") || lowerQuery.includes("compliance") || lowerQuery.includes("audit")) {
    return ragResponses.security
  }
  if (lowerQuery.includes("sales") || lowerQuery.includes("customer") || lowerQuery.includes("deal")) {
    return ragResponses.sales
  }
  if (lowerQuery.includes("product") || lowerQuery.includes("roadmap") || lowerQuery.includes("feature")) {
    return ragResponses.product
  }

  // Default response
  return {
    response:
      "I found relevant information in our knowledge base. Based on the available documents, I can help you with questions about company policies, engineering practices, sales strategies, product roadmap, and security guidelines. Could you please rephrase your question or ask about one of these specific topics?",
    sources: mockDocuments.slice(0, 2).map((doc) => ({ doc_id: doc.id, doc_title: doc.title })),
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Simulate RAG processing delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400))

    const result = findBestMatch(message)

    return NextResponse.json({
      response: result.response,
      sources: result.sources.map((source) => ({
        doc_id: source.doc_id,
        doc_title: source.doc_title,
        chunk_text: "Relevant excerpt from the document...",
      })),
      latency_ms: 800 + Math.floor(Math.random() * 400),
      accuracy_metrics: {
        precision: 0.85 + Math.random() * 0.1,
        recall: 0.82 + Math.random() * 0.1,
        factual_consistency: 0.9 + Math.random() * 0.08,
      },
    })
  } catch (error) {
    console.error("[v0] Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}

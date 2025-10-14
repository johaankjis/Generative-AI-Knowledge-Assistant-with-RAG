# Generative AI Knowledge Assistant with RAG

A modern, enterprise-ready AI Knowledge Assistant powered by Retrieval-Augmented Generation (RAG) technology. Built with Next.js 15, React 19, and TypeScript, this application provides intelligent document search and question-answering capabilities for enterprise knowledge bases.

![RAG Assistant](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### Core Functionality
- **🤖 Intelligent Chat Interface**: Natural language question-answering powered by RAG
- **📄 Document Management**: Upload, organize, and manage enterprise documents by department
- **📊 Analytics Dashboard**: Real-time performance metrics and accuracy tracking
- **🔍 Source Attribution**: Transparent citations with document sources for every answer
- **⚡ Fast Response Times**: Optimized query processing with sub-second latency

### RAG Capabilities
- **Document Chunking**: Automatic segmentation of documents for efficient retrieval
- **Semantic Search**: Context-aware document retrieval
- **Multi-Document Support**: Query across multiple documents simultaneously
- **Department-Based Organization**: Organize documents by HR, Engineering, Sales, Product, Security, etc.

### Performance Monitoring
- **Accuracy Metrics**: Track precision, recall, and factual consistency
- **Latency Tracking**: Monitor query response times
- **Query Analytics**: Visualize usage patterns and trends over time
- **Real-time Dashboards**: Interactive charts and metrics visualization

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.2.4](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

### Development Tools
- **Font**: [Geist](https://vercel.com/font) (Sans & Mono)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Theme**: Dark mode with next-themes
- **Form Handling**: React Hook Form with Zod validation

## 📋 Prerequisites

- **Node.js**: 18.x or higher
- **Package Manager**: pnpm (recommended), npm, or yarn
- **Operating System**: macOS, Windows, or Linux

## 🚀 Getting Started

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/johaankjis/Generative-AI-Knowledge-Assistant-with-RAG.git
cd Generative-AI-Knowledge-Assistant-with-RAG
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. **Run the development server**
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   └── chat/           # Chat endpoint with RAG logic
│   ├── analytics/          # Analytics page
│   ├── documents/          # Document management page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (Chat interface)
│   └── globals.css         # Global styles
├── components/              # React Components
│   ├── chat-interface.tsx  # Main chat UI component
│   ├── documents-manager.tsx # Document upload & management
│   ├── analytics-dashboard.tsx # Metrics visualization
│   ├── navigation.tsx      # Top navigation bar
│   └── ui/                 # Reusable UI components (Radix UI)
├── lib/                     # Utility functions and types
│   ├── types.ts            # TypeScript interfaces
│   ├── mock-data.ts        # Sample data for demo
│   └── utils.ts            # Helper functions
├── public/                  # Static assets
├── styles/                  # Additional styles
└── package.json            # Dependencies and scripts
```

## 💡 Usage

### Chat Interface

1. Navigate to the home page
2. Type your question in the input field
3. Click "Send" or press Enter
4. View the AI-generated response with source citations

**Example Questions:**
- "What is our vacation policy?"
- "How do I deploy to production?"
- "What are our security best practices?"
- "What's on the product roadmap?"

### Document Management

1. Navigate to the "Documents" tab
2. Click "Upload Document" to add new documents
3. Use the search bar to filter documents
4. Filter by department using the department badges
5. Delete documents using the trash icon

### Analytics Dashboard

1. Navigate to the "Analytics" tab
2. View key metrics:
   - Total queries processed
   - Average latency
   - Accuracy scores (precision, recall)
3. Analyze trends with interactive charts:
   - Queries over time
   - Latency trends
   - Accuracy evolution

## 🔧 Development

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

### API Routes

#### POST `/api/chat`

Processes user queries with RAG and returns responses with source citations.

**Request Body:**
```json
{
  "message": "What is our vacation policy?"
}
```

**Response:**
```json
{
  "response": "According to the Employee Handbook...",
  "sources": [
    {
      "doc_id": "doc-1",
      "doc_title": "Employee Handbook 2024",
      "chunk_text": "Relevant excerpt..."
    }
  ],
  "latency_ms": 245,
  "accuracy_metrics": {
    "precision": 0.92,
    "recall": 0.88,
    "factual_consistency": 0.95
  }
}
```

## 📊 Data Models

### Document
```typescript
interface Document {
  id: string
  title: string
  content: string
  department: string
  uploadedAt: string
  chunkCount: number
}
```

### Chat Message
```typescript
interface ChatMessage {
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
```

### Analytics Metrics
```typescript
interface AnalyticsMetrics {
  totalQueries: number
  avgLatency: number
  avgAccuracy: number
  avgPrecision: number
  avgRecall: number
  queriesOverTime: Array<{ date: string; count: number }>
  latencyOverTime: Array<{ date: string; latency: number }>
  accuracyOverTime: Array<{ date: string; accuracy: number }>
}
```

## 🎨 Customization

### Theme

The application uses a dark theme by default. To customize colors, modify the CSS variables in `app/globals.css`.

### UI Components

All UI components are built with Radix UI and can be customized through the `components/ui/` directory.

### Mock Data

For development and demo purposes, the application uses mock data from `lib/mock-data.ts`. Replace this with your actual RAG implementation.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker containers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Font from [Vercel](https://vercel.com/font)
- Inspired by modern RAG architectures and enterprise knowledge management systems

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

**Made with ❤️ using Next.js and RAG technology**

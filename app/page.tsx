import { ChatInterface } from "@/components/chat-interface"

export default function HomePage() {
  return (
    <div className="mx-auto h-[calc(100vh-4rem)] max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <ChatInterface />
    </div>
  )
}

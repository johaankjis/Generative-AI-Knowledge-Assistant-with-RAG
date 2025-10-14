"use client"

import { Card } from "@/components/ui/card"
import { Activity, Clock, Target, TrendingUp } from "lucide-react"
import { mockAnalytics } from "@/lib/mock-data"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function AnalyticsDashboard() {
  const metrics = mockAnalytics

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">Analytics & Performance</h1>
        <p className="text-pretty text-muted-foreground">
          Monitor RAG system performance, accuracy metrics, and evaluation benchmarks
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-1/10 p-2">
              <Activity className="h-5 w-5 text-chart-1" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Queries</p>
              <p className="text-2xl font-bold text-foreground">{metrics.totalQueries.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-2/10 p-2">
              <Clock className="h-5 w-5 text-chart-2" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg Latency</p>
              <p className="text-2xl font-bold text-foreground">{metrics.avgLatency}ms</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-3/10 p-2">
              <Target className="h-5 w-5 text-chart-3" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg Accuracy</p>
              <p className="text-2xl font-bold text-foreground">{(metrics.avgAccuracy * 100).toFixed(1)}%</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-chart-4/10 p-2">
              <TrendingUp className="h-5 w-5 text-chart-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Avg Precision</p>
              <p className="text-2xl font-bold text-foreground">{(metrics.avgPrecision * 100).toFixed(1)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Queries Over Time */}
        <Card className="border-border bg-card p-6">
          <div className="mb-4 space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Query Volume</h3>
            <p className="text-sm text-muted-foreground">Number of queries over the last 7 days</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={metrics.queriesOverTime}>
              <defs>
                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.22 264)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.22 264)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 264)" />
              <XAxis dataKey="date" stroke="oklch(0.65 0.05 264)" tick={{ fill: "oklch(0.65 0.05 264)" }} />
              <YAxis stroke="oklch(0.65 0.05 264)" tick={{ fill: "oklch(0.65 0.05 264)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.01 264)",
                  border: "1px solid oklch(0.25 0.02 264)",
                  borderRadius: "8px",
                  color: "oklch(0.98 0.01 264)",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="oklch(0.65 0.22 264)"
                strokeWidth={2}
                fill="url(#colorQueries)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Latency Over Time */}
        <Card className="border-border bg-card p-6">
          <div className="mb-4 space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Response Latency</h3>
            <p className="text-sm text-muted-foreground">Average response time over the last 7 days</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics.latencyOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 264)" />
              <XAxis dataKey="date" stroke="oklch(0.65 0.05 264)" tick={{ fill: "oklch(0.65 0.05 264)" }} />
              <YAxis stroke="oklch(0.65 0.05 264)" tick={{ fill: "oklch(0.65 0.05 264)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.01 264)",
                  border: "1px solid oklch(0.25 0.02 264)",
                  borderRadius: "8px",
                  color: "oklch(0.98 0.01 264)",
                }}
              />
              <Line type="monotone" dataKey="latency" stroke="oklch(0.55 0.25 280)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Accuracy Trend */}
      <Card className="border-border bg-card p-6">
        <div className="mb-4 space-y-1">
          <h3 className="text-lg font-semibold text-foreground">Accuracy Trend</h3>
          <p className="text-sm text-muted-foreground">Response accuracy improvement over time</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={metrics.accuracyOverTime}>
            <defs>
              <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.7 0.18 320)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.7 0.18 320)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 264)" />
            <XAxis dataKey="date" stroke="oklch(0.65 0.05 264)" tick={{ fill: "oklch(0.65 0.05 264)" }} />
            <YAxis
              domain={[0.8, 1]}
              stroke="oklch(0.65 0.05 264)"
              tick={{ fill: "oklch(0.65 0.05 264)" }}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0.01 264)",
                border: "1px solid oklch(0.25 0.02 264)",
                borderRadius: "8px",
                color: "oklch(0.98 0.01 264)",
              }}
              formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
            />
            <Area
              type="monotone"
              dataKey="accuracy"
              stroke="oklch(0.7 0.18 320)"
              strokeWidth={2}
              fill="url(#colorAccuracy)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Evaluation Metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Precision</p>
            <p className="text-3xl font-bold text-foreground">{(metrics.avgPrecision * 100).toFixed(1)}%</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-chart-1 transition-all" style={{ width: `${metrics.avgPrecision * 100}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">Measures relevance of retrieved documents</p>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Recall</p>
            <p className="text-3xl font-bold text-foreground">{(metrics.avgRecall * 100).toFixed(1)}%</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-chart-2 transition-all" style={{ width: `${metrics.avgRecall * 100}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">Measures completeness of retrieval</p>
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Overall Accuracy</p>
            <p className="text-3xl font-bold text-foreground">{(metrics.avgAccuracy * 100).toFixed(1)}%</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-chart-3 transition-all" style={{ width: `${metrics.avgAccuracy * 100}%` }} />
            </div>
            <p className="text-xs text-muted-foreground">Combined factual consistency score</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

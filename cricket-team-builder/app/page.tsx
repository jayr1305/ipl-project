import TeamBuilder from "@/components/team-builder"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <header className="border-b bg-white dark:bg-slate-800">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Cricket Team Builder</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1">
        <TeamBuilder />
      </main>

      <footer className="border-t bg-white dark:bg-slate-800 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Cricket Team Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


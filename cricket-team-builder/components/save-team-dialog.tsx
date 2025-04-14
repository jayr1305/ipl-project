"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePlayerStore } from "@/lib/store"
import { Save } from "lucide-react"

export function SaveTeamDialog() {
  const [teamName, setTeamName] = useState("")
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const { team } = usePlayerStore()

  const handleSave = () => {
    // In a real app, this would save to a database
    // For now, we'll just save to localStorage
    const savedTeams = JSON.parse(localStorage.getItem("savedTeams") || "[]")
    const newTeam = {
      id: Date.now().toString(),
      name: teamName || "My Team",
      players: team.filter((p) => p !== null),
      date: new Date().toISOString(),
    }

    localStorage.setItem("savedTeams", JSON.stringify([...savedTeams, newTeam]))
    setSaved(true)

    // Reset after 2 seconds
    setTimeout(() => {
      setSaved(false)
      setOpen(false)
      setTeamName("")
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Your Team</DialogTitle>
          <DialogDescription>Give your team a name to save it for later.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team-name" className="text-right">
              Team Name
            </Label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="My Dream Team"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {saved ? (
            <Button disabled className="bg-green-600">
              Team Saved!
            </Button>
          ) : (
            <Button onClick={handleSave}>Save Team</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


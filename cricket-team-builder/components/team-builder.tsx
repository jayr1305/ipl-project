"use client"

import { useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { PlayerCard } from "@/components/player-card"
import { TeamSlot } from "@/components/team-slot"
import { TeamStats } from "@/components/team-stats"
import { DragOverlay } from "@/components/drag-overlay"
import { usePlayerStore } from "@/lib/store"
import { useMobile } from "@/hooks/use-mobile"
import type { Player } from "@/lib/types"

export default function TeamBuilder() {
  const isMobile = useMobile()
  const {
    players,
    team,
    teamFull,
    isLoading,
    initializePlayers,
    addPlayerToTeam,
    removePlayerFromTeam,
    getAvailablePlayers,
  } = usePlayerStore()

  useEffect(() => {
    initializePlayers()
  }, [initializePlayers])

  // Choose the appropriate backend based on device
  const backend = isMobile ? TouchBackend : HTML5Backend

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading players...</p>
      </div>
    )
  }

  return (
    <DndProvider backend={backend}>
      <div className="container mx-auto py-8 px-4">
        <p className="text-center mb-8 text-muted-foreground">
          Drag and drop players to build your dream cricket team. Select 11 players and 1 substitute.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Selection Area */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Team</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {team.map((player, index) => (
                <TeamSlot
                  key={index}
                  index={index}
                  player={player}
                  onDropPlayer={addPlayerToTeam}
                  onRemovePlayer={removePlayerFromTeam}
                  isSubstitute={index === 11}
                />
              ))}
            </div>

            {/* Team Stats */}
            {teamFull && (
              <div className="mt-8">
                <TeamStats team={team.filter((p) => p !== null) as Player[]} />
              </div>
            )}
          </div>

          {/* Available Players */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Available Players</h2>
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
              {getAvailablePlayers().map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}

              {getAvailablePlayers().length === 0 && (
                <p className="text-center text-muted-foreground py-8">All players have been selected</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom drag layer for better UX */}
      <DragOverlay />
    </DndProvider>
  )
}


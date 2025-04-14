import { create } from "zustand"
import type { Player } from "@/types/player"
import { generatePlayers } from "@/lib/generate-players"

interface PlayerState {
  players: Player[]
  team: (Player | null)[]
  isLoading: boolean
  teamFull: boolean
  initializePlayers: () => void
  addPlayerToTeam: (playerId: string, slotIndex: number) => void
  removePlayerFromTeam: (slotIndex: number) => void
  getAvailablePlayers: () => Player[]
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  players: [],
  team: Array(12).fill(null),
  isLoading: true,
  teamFull: false,

  initializePlayers: () => {
    const players = generatePlayers(25)
    set({ players, isLoading: false })
  },

  addPlayerToTeam: (playerId: string, slotIndex: number) => {
    const { players, team } = get()
    const playerToAdd = players.find((p) => p.id === playerId)

    if (!playerToAdd) return

    // Check if player is already in the team
    const existingSlotIndex = team.findIndex((p) => p?.id === playerId)

    // Create a new team array
    const newTeam = [...team]

    // If player is already in team, swap positions
    if (existingSlotIndex !== -1) {
      // Swap players
      const temp = newTeam[slotIndex]
      newTeam[slotIndex] = newTeam[existingSlotIndex]
      newTeam[existingSlotIndex] = temp
    } else {
      // Add player to the team
      newTeam[slotIndex] = playerToAdd
    }

    // Check if team is full
    const filledSlots = newTeam.filter((player) => player !== null).length

    set({
      team: newTeam,
      teamFull: filledSlots === 12,
    })
  },

  removePlayerFromTeam: (slotIndex: number) => {
    const { team } = get()
    const newTeam = [...team]
    newTeam[slotIndex] = null

    // Check if team is still full
    const filledSlots = newTeam.filter((player) => player !== null).length

    set({
      team: newTeam,
      teamFull: filledSlots === 12,
    })
  },

  getAvailablePlayers: () => {
    const { players, team } = get()
    const teamPlayerIds = team.filter((p) => p !== null).map((p) => p!.id)
    return players.filter((p) => !teamPlayerIds.includes(p.id))
  },
}))


export interface Player {
  id: string
  name: string
  role: PlayerRole
  battingSkill: number
  bowlingSkill: number
  fieldingSkill: number
  experience: number
  overallRating: number
}

export type PlayerRole = "Batsman" | "Bowler" | "All-rounder" | "Wicket-keeper"


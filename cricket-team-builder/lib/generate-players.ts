import type { Player, PlayerRole } from "@/types/player"

// List of cricket player names for random generation
const playerNames = [
  "Virat Kohli",
  "Joe Root",
  "Kane Williamson",
  "Steve Smith",
  "Babar Azam",
  "Rohit Sharma",
  "David Warner",
  "Quinton de Kock",
  "Ben Stokes",
  "Jasprit Bumrah",
  "Pat Cummins",
  "Kagiso Rabada",
  "Trent Boult",
  "Mitchell Starc",
  "Rashid Khan",
  "Shakib Al Hasan",
  "Jos Buttler",
  "Rishabh Pant",
  "Ravindra Jadeja",
  "Hardik Pandya",
  "Kieron Pollard",
  "Andre Russell",
  "Nicholas Pooran",
  "Faf du Plessis",
  "Glenn Maxwell",
  "Lockie Ferguson",
  "Jofra Archer",
  "Mohammed Shami",
  "Ravichandran Ashwin",
  "Yuzvendra Chahal",
  "Shai Hope",
  "Dimuth Karunaratne",
  "Tom Latham",
  "Marnus Labuschagne",
  "Shaheen Afridi",
]

// Generate a random number between min and max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate a random player role
function randomRole(): PlayerRole {
  const roles: PlayerRole[] = ["Batsman", "Bowler", "All-rounder", "Wicket-keeper"]
  const weights = [40, 40, 15, 5] // Probability weights

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  let random = Math.random() * totalWeight

  for (let i = 0; i < roles.length; i++) {
    if (random < weights[i]) {
      return roles[i]
    }
    random -= weights[i]
  }

  return "Batsman" // Default fallback
}

// Generate a player with random stats based on their role
function generatePlayer(name: string, role: PlayerRole): Player {
  let battingSkill: number
  let bowlingSkill: number
  let fieldingSkill: number

  // Adjust stats based on role
  switch (role) {
    case "Batsman":
      battingSkill = randomInt(70, 95)
      bowlingSkill = randomInt(10, 40)
      fieldingSkill = randomInt(60, 85)
      break
    case "Bowler":
      battingSkill = randomInt(20, 60)
      bowlingSkill = randomInt(75, 95)
      fieldingSkill = randomInt(60, 85)
      break
    case "All-rounder":
      battingSkill = randomInt(60, 85)
      bowlingSkill = randomInt(60, 85)
      fieldingSkill = randomInt(65, 90)
      break
    case "Wicket-keeper":
      battingSkill = randomInt(65, 90)
      bowlingSkill = randomInt(5, 20)
      fieldingSkill = randomInt(75, 95)
      break
  }

  const experience = randomInt(40, 95)

  // Calculate overall rating (weighted average)
  const overallRating = Math.round(battingSkill * 0.35 + bowlingSkill * 0.35 + fieldingSkill * 0.15 + experience * 0.15)

  return {
    id: crypto.randomUUID(),
    name,
    role,
    battingSkill,
    bowlingSkill,
    fieldingSkill,
    experience,
    overallRating,
  }
}

// Shuffle an array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Generate a specified number of players with random stats
export function generatePlayers(count: number): Player[] {
  // Shuffle the names array to get random names
  const shuffledNames = shuffleArray(playerNames)
  const players: Player[] = []

  // Ensure we have enough names
  const namesToUse =
    count <= shuffledNames.length
      ? shuffledNames.slice(0, count)
      : [
          ...shuffledNames,
          ...Array(count - shuffledNames.length)
            .fill(null)
            .map((_, i) => `Player ${i + 1}`),
        ]

  // Generate players with balanced roles
  for (let i = 0; i < count; i++) {
    const role = randomRole()
    players.push(generatePlayer(namesToUse[i], role))
  }

  return players
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Player } from "@/types/player"
import { BoltIcon as Bat, CircleDashed, Shield, Swords, Trophy, Users } from "lucide-react"
import { SaveTeamDialog } from "@/components/save-team-dialog"

interface TeamStatsProps {
  team: Player[]
}

export function TeamStats({ team }: TeamStatsProps) {
  // Calculate team stats
  const avgBatting = Math.round(team.reduce((sum, p) => sum + p.battingSkill, 0) / team.length)
  const avgBowling = Math.round(team.reduce((sum, p) => sum + p.bowlingSkill, 0) / team.length)
  const avgFielding = Math.round(team.reduce((sum, p) => sum + p.fieldingSkill, 0) / team.length)
  const avgExperience = Math.round(team.reduce((sum, p) => sum + p.experience, 0) / team.length)

  // Calculate team strength (weighted average)
  const teamStrength = Math.round(avgBatting * 0.35 + avgBowling * 0.35 + avgFielding * 0.15 + avgExperience * 0.15)

  // Count player roles
  const roleCounts = team.reduce(
    (counts, player) => {
      counts[player.role] = (counts[player.role] || 0) + 1
      return counts
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Team Analysis</h3>
        <SaveTeamDialog />
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Team Strength: {teamStrength}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Bat size={16} className="text-blue-500" />
                  Batting
                </span>
                <span className="text-sm font-medium">{avgBatting}/100</span>
              </div>
              <Progress value={avgBatting} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-1">
                  <CircleDashed size={16} className="text-green-500" />
                  Bowling
                </span>
                <span className="text-sm font-medium">{avgBowling}/100</span>
              </div>
              <Progress value={avgBowling} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Shield size={16} className="text-purple-500" />
                  Fielding
                </span>
                <span className="text-sm font-medium">{avgFielding}/100</span>
              </div>
              <Progress value={avgFielding} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Swords size={16} className="text-orange-500" />
                  Experience
                </span>
                <span className="text-sm font-medium">{avgExperience}/100</span>
              </div>
              <Progress value={avgExperience} className="h-2" />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Users size={16} />
              Team Composition
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(roleCounts).map(([role, count]) => (
                <div key={role} className="flex justify-between text-sm">
                  <span>{role}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Team Rating</div>
              <div className="text-2xl font-bold">{getTeamRating(teamStrength)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getTeamRating(strength: number): string {
  if (strength >= 85) return "World Class"
  if (strength >= 75) return "Excellent"
  if (strength >= 65) return "Very Good"
  if (strength >= 55) return "Good"
  if (strength >= 45) return "Average"
  return "Developing"
}


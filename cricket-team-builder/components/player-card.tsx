"use client"

import { useDrag } from "react-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Player } from "@/types/player"
import { BoltIcon as Bat, CircleDashed, Gauge, Shield, Swords } from "lucide-react"
import { motion } from "framer-motion"

interface PlayerCardProps {
  player: Player
  inTeam?: boolean
  onRemove?: () => void
  isSubstitute?: boolean
  isDragging?: boolean
}

export function PlayerCard({
  player,
  inTeam = false,
  onRemove,
  isSubstitute = false,
  isDragging = false,
}: PlayerCardProps) {
  const [{ isDragging: isBeingDragged }, drag] = useDrag(() => ({
    type: "PLAYER",
    item: { id: player.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Use the passed isDragging prop or the one from the hook
  const dragging = isDragging || isBeingDragged

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        ref={drag}
        className={`
          ${dragging ? "opacity-50" : "opacity-100"}
          ${inTeam ? "border-primary" : ""}
          cursor-move transition-all hover:shadow-md
          ${isSubstitute ? "border-amber-500 dark:border-amber-400" : ""}
        `}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage
                src={`/placeholder1.jpg?height=48&width=48&text=${player.name.charAt(0)}`}
                alt={player.name}
              />
              <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">{player.role}</p>
                </div>

                {isSubstitute && (
                  <Badge
                    variant="outline"
                    className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                  >
                    Substitute
                  </Badge>
                )}

                {inTeam && onRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove()
                    }}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-1 text-sm">
              <Bat size={16} className="text-blue-500" />
              <span>Batting: {player.battingSkill}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <CircleDashed size={16} className="text-green-500" />
              <span>Bowling: {player.bowlingSkill}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Shield size={16} className="text-purple-500" />
              <span>Fielding: {player.fieldingSkill}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Swords size={16} className="text-orange-500" />
              <span>Experience: {player.experience}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Gauge size={16} className="text-red-500" />
              <span className="font-semibold">Overall: {player.overallRating}</span>
            </div>
            <Badge variant={getRatingVariant(player.overallRating)}>{getRatingLabel(player.overallRating)}</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function getRatingVariant(rating: number): "default" | "secondary" | "destructive" | "outline" {
  if (rating >= 85) return "default"
  if (rating >= 70) return "secondary"
  if (rating >= 50) return "outline"
  return "destructive"
}

function getRatingLabel(rating: number): string {
  if (rating >= 85) return "Star"
  if (rating >= 70) return "Good"
  if (rating >= 50) return "Average"
  return "Rookie"
}


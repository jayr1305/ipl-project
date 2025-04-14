"use client"

import { useDrop } from "react-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { PlayerCard } from "@/components/player-card"
import type { Player } from "@/types/player"
import { PlusCircle } from "lucide-react"
import { motion } from "framer-motion"

interface TeamSlotProps {
  index: number
  player: Player | null
  onDropPlayer: (playerId: string, slotIndex: number) => void
  onRemovePlayer: (slotIndex: number) => void
  isSubstitute?: boolean
}

export function TeamSlot({ index, player, onDropPlayer, onRemovePlayer, isSubstitute = false }: TeamSlotProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "PLAYER",
    drop: (item: { id: string }) => {
      onDropPlayer(item.id, index)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div
        ref={drop}
        className={`
          min-h-[180px] transition-all
          ${isOver && canDrop ? "scale-105 ring-2 ring-primary" : ""}
          ${isSubstitute ? "border-amber-500" : ""}
        `}
      >
        {player ? (
          <PlayerCard
            player={player}
            inTeam={true}
            onRemove={() => onRemovePlayer(index)}
            isSubstitute={isSubstitute}
          />
        ) : (
          <Card
            className={`
            h-full flex items-center justify-center border-dashed
            ${isOver ? "bg-primary/10 border-primary" : "bg-muted/40"}
            ${isSubstitute ? "border-amber-500/50" : ""}
          `}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {isSubstitute ? "Drop substitute here" : "Drop player here"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Position {index + 1}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  )
}


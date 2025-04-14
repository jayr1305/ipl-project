"use client"

import { useDragLayer } from "react-dnd"
import { PlayerCard } from "@/components/player-card"
import { usePlayerStore } from "@/lib/store"

export function DragOverlay() {
  const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  const player = usePlayerStore((state) => state.players.find((p) => p.id === item?.id))

  if (!isDragging || !currentOffset || !player) {
    return null
  }

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
          opacity: 0.8,
          width: "280px",
        }}
      >
        {itemType === "PLAYER" && <PlayerCard player={player} isDragging={true} />}
      </div>
    </div>
  )
}


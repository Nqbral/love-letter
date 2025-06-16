import BackCard from '@public/backcard.png';
import { Card } from '@shadow-network/shared/classes/Card';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function DeckAndDiscardedCards({ gameState }: Props) {
  const [drawedCardRounds, setDrawedCardsRounds] = useState<Card[]>([]);

  useEffect(() => {}, [gameState]);

  return (
    <div className="border-sm flex flex-col items-center gap-4 border-1 border-slate-700 px-8 py-4 text-sm sm:text-base">
      <div className="flex flex-row gap-6 md:gap-8 lg:gap-12">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">Pioche ({gameState?.deck.length})</div>
          <Image
            src={BackCard}
            alt="deck"
            className="w-12 sm:w-16 md:w-20 lg:w-24"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div>Défausse</div>
          <div className="flex h-full flex-row items-center gap-2">
            <div className="h-[70px] w-12 rounded-sm border-1 border-dashed border-slate-700 sm:h-[90px] sm:w-16 md:h-[110px] md:w-20 lg:h-[140px] lg:w-24" />
            <div className="h-[70px] w-12 rounded-sm border-1 border-dashed border-slate-700 sm:h-[90px] sm:w-16 md:h-[110px] md:w-20 lg:h-[140px] lg:w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Player } from '@love-letter/shared/classes/Player';
import BackCard from '@public/backcard.png';
import Image from 'next/image';

type Props = {
  player: Player;
};

export default function PlayerDisplay({ player }: Props) {
  const offset = 2;

  return (
    <div className="flex flex-col items-center gap-2 rounded-sm border-1 border-slate-700 px-4 py-4 sm:min-w-36 sm:px-0 lg:h-[210px]">
      <div className={`text-${player.color} text-sm sm:text-base`}>
        {player.userName}
      </div>
      <div className="block text-xs sm:text-sm md:text-base lg:hidden">
        {player.hand.length} carte(s)
      </div>
      <div className="relative hidden h-full w-32 lg:block">
        {player.hand.map((_, index) => (
          <Image
            key={`card-player-${player.userId}-${index}`}
            src={BackCard}
            alt={`img-backcard-player-${player.userId}-${index}`}
            className="absolute top-0 left-0 w-16 sm:block sm:w-24"
            style={{
              transform: `translateX(${index * offset * 4 + 4 * (5 - player.hand.length)}px)`,
              zIndex: index,
            }}
          />
        ))}
      </div>
    </div>
  );
}

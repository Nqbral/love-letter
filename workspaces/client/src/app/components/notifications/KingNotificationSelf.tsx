'use client';

import { Cards } from '@shared/common/Cards';
import { PlayerGame } from '@shared/common/Player';
import { articleCard } from 'app/helper/ArticleCard';
import { MedievalSharp } from 'next/font/google';
import { ToastContentProps } from 'react-toastify';

const medievalsharp = MedievalSharp({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-medievalsharp',
  weight: ['400'],
});

type Props = ToastContentProps<{
  playerTargeted: PlayerGame;
  cardPlayer: Cards;
  cardPlayerTargeted: Cards;
}>;

export default function KingNotificationSelf({ data }: Props) {
  const cardPlayer = articleCard(data.cardPlayer)?.get('card');
  const cardPlayerTargeted = articleCard(data.cardPlayerTargeted)?.get('card');

  return (
    <div className={`${medievalsharp.className}`}>
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <h3 className="text-primary text-lg">Action de jeu</h3>
        <div className="w-full text-center text-sm text-white">
          Vous avez échangé votre main avec{' '}
          <span className={data.playerTargeted.color}>
            {data.playerTargeted.playerName}
          </span>
          <br />
          Votre <span className="font-bold">{cardPlayer}</span> que vous aviez
          dans votre main va dans la sienne et vous récupérer la carte{' '}
          <span className="font-bold">{cardPlayerTargeted}</span>.
        </div>
      </div>
    </div>
  );
}

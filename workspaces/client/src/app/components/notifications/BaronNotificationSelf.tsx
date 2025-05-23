'use client';

import { Cards } from '@shared/common/Cards';
import { ResultEvent } from '@shared/common/EventDescription';
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
  result: ResultEvent;
}>;

export default function BaronNotificationSelf({ data }: Props) {
  const cardPlayer = articleCard(data.cardPlayer)?.get('card');
  const articleCardPlayer = articleCard(data.cardPlayer)?.get('articleCard');
  const cardPlayerTargeted = articleCard(data.cardPlayerTargeted)?.get('card');
  const articleCardPlayerTargeted = articleCard(data.cardPlayerTargeted)?.get(
    'articleCard',
  );

  return (
    <div className={`${medievalsharp.className}`}>
      <div className="flex w-full flex-col items-center gap-4 text-center">
        <h3 className="text-primary text-lg">Action de jeu</h3>
        <div className="w-full text-center text-sm text-white">
          Vous avez joué le <span className="font-bold">Baron</span> sur{' '}
          <span className={data.playerTargeted.color}>
            {data.playerTargeted.playerName}
          </span>
          .
          {data.result == ResultEvent.VictoryBaron && (
            <div className="text-center">
              Vous avez gagné avec {articleCardPlayer}
              <span className="font-bold">{cardPlayer}</span> contre{' '}
              {articleCardPlayerTargeted}
              <span className="font-bold">{cardPlayerTargeted}</span>.
            </div>
          )}
          {data.result == ResultEvent.LooseBaron && (
            <div className="text-center">
              Vous avez perdu avec {articleCardPlayer}
              <span className="font-bold">{cardPlayer}</span> contre{' '}
              {articleCardPlayerTargeted}
              <span className="font-bold">{cardPlayerTargeted}</span>.
            </div>
          )}
          {data.result == ResultEvent.DrawBaron && (
            <div className="text-center">
              Égalité avec {articleCardPlayerTargeted}
              <span className="font-bold">{cardPlayerTargeted}</span>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

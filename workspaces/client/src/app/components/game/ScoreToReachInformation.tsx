import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function ScoreToReachInformation({ gameState }: Props) {
  return (
    <div className="text-primary-hover text-center text-sm italic md:text-base">
      Le premier joueur à avoir {gameState?.scoreToReach} points, gagne la
      partie.
    </div>
  );
}

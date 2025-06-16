import SecondaryButton from '@components/buttons/SecondaryButton';
import CardSelector from '@components/game/CardSelector';
import PlayerSelector from '@components/game/PlayerSelector';
import { Player } from '@love-letter/shared/classes/Player';
import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';
import { useState } from 'react';

import ModalTemplate from './ModalTemplate';

type Props = {
  setModalTypeCard: (type: string | null) => void;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
};

export default function ModalPlayGuard({
  setModalTypeCard,
  gameState,
  myPlayer,
}: Props) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
        <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
          Jouer la carte Garde
        </h2>
        <PlayerSelector
          players={gameState?.players}
          myPlayerId={myPlayer?.userId ?? ''}
          mode="exceptMe"
          setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={selectedPlayer}
        />
        <CardSelector
          setSelectedCard={setSelectedCard}
          selectedCard={selectedCard}
        />
        <SecondaryButton
          buttonText="Retour"
          onClick={() => {
            setModalTypeCard(null);
            setSelectedPlayer(null);
            setSelectedCard(null);
          }}
        />
      </div>
    </ModalTemplate>
  );
}

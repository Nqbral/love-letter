import PrimaryButton from '@components/buttons/PrimaryButton';
import RedButton from '@components/buttons/RedButton';
import SecondaryButton from '@components/buttons/SecondaryButton';
import { useSocket } from '@contexts/SocketContext';
import { CLIENT_EVENTS } from '@love-letter/shared/consts/ClientEvents';
import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';
import { useRouter } from 'next/navigation';

import ModalTemplate from './ModalTemplate';

type Props = {
  lobbyState: ServerPayloads[ServerEvents.LobbyState] | null;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function ModalFinishedRound({ lobbyState, gameState }: Props) {
  const { userId, emitEvent } = useSocket();
  const isOwner = userId === lobbyState?.ownerId;
  const router = useRouter();

  const handleStart = () => {
    emitEvent(CLIENT_EVENTS.LOBBY_START_GAME, undefined);
  };

  const handleLeave = () => {
    emitEvent(CLIENT_EVENTS.LOBBY_LEAVE, undefined);
    router.push('/');
  };
  const handleDelete = () => emitEvent(CLIENT_EVENTS.LOBBY_DELETE, undefined);

  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
        <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
          Partie terminée
        </h2>

        <h3 className="text-lg text-emerald-400 md:text-xl">Docteurs</h3>
        <div className="flex flex-row items-center gap-2 text-xs sm:text-sm md:text-base"></div>

        <h3 className="text-lg text-red-400 md:text-xl">Infectés</h3>
        <div className="flex flex-row items-center gap-2 text-xs sm:text-sm md:text-base"></div>

        <div className="flex flex-col items-center justify-center gap-1 md:flex-row md:gap-3">
          {isOwner ? (
            <>
              <PrimaryButton
                buttonText="Démarrer une autre manche"
                onClick={handleStart}
              />
              <RedButton
                buttonText="Supprimer le lobby"
                onClick={handleDelete}
              />
            </>
          ) : (
            <SecondaryButton
              buttonText="Quitter la partie"
              onClick={handleLeave}
            />
          )}
        </div>
      </div>
    </ModalTemplate>
  );
}

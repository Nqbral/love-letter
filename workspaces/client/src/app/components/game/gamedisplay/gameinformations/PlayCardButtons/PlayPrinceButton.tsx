import PrimaryOrSecondaryButton from '@components/buttons/PrimaryOrSecondaryButton';
import useSocketManager from '@components/hooks/useSocketManager';
import { ClientEvents } from '@shared/client/ClientEvents';
import { ServerEvents } from '@shared/server/ServerEvents';
import { ServerPayloads } from '@shared/server/ServerPayloads';

type Props = {
  primary: boolean;
  disabled: boolean;
  showNotYourTurn: () => void;
  gameState: ServerPayloads[ServerEvents.GameState];
};

export default function PlayPrinceButton({
  primary,
  disabled,
  showNotYourTurn,
  gameState,
}: Props) {
  const { sm } = useSocketManager();

  const playPrince = () => {
    if (disabled) {
      showNotYourTurn();
      return;
    }

    sm.emit({
      event: ClientEvents.GamePlayPrince,
      data: {
        lobbyId: gameState.lobbyId,
      },
    });
  };

  return (
    <PrimaryOrSecondaryButton
      buttonText="Jouer le Prince"
      onClick={playPrince}
      primary={primary}
    />
  );
}

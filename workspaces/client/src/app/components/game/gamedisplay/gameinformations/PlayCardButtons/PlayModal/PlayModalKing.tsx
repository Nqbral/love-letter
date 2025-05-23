import PrimaryButton from '@components/buttons/PrimaryButton';
import SecondaryButton from '@components/buttons/SecondaryButton';
import useSocketManager from '@components/hooks/useSocketManager';
import ModalTemplate from '@components/modal/ModalTemplate';
import { ClientEvents } from '@shared/client/ClientEvents';
import { Cards } from '@shared/common/Cards';
import { PlayerGame } from '@shared/common/Player';
import { ServerEvents } from '@shared/server/ServerEvents';
import { ServerPayloads } from '@shared/server/ServerPayloads';
import { useEffect, useState } from 'react';

type Props = {
  handleClose: () => void;
  gameState: ServerPayloads[ServerEvents.GameState];
  playersParsed: Map<string, PlayerGame>;
  myPlayer: PlayerGame;
};

export default function PlayModalKing({
  handleClose,
  gameState,
  playersParsed,
  myPlayer,
}: Props) {
  const { sm } = useSocketManager();
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [listPlayers, setListPlayers] = useState<PlayerGame[]>([]);
  const [noPlayerAvailable, setNoPlayerAvailable] = useState(false);

  useEffect(() => {
    const list = Array.from(playersParsed.values()).filter((player) => {
      return (
        player.id != myPlayer.id &&
        player.alive &&
        !player.activeCards.includes(Cards.Handmaid)
      );
    });

    setNoPlayerAvailable(list.length == 0);
    setListPlayers(list);
  }, [playersParsed, myPlayer.id]);

  const playKingNoEffect = () => {
    sm.emit({
      event: ClientEvents.GamePlayKing,
      data: {
        lobbyId: gameState.lobbyId,
        playerIdTarget: '',
        noEffect: true,
      },
    });

    backButton();
  };

  const playKing = () => {
    if (selectedPlayer == '') {
      setErrorMessage('Veuillez sélectionnez un joueur !');
      return;
    }
    sm.emit({
      event: ClientEvents.GamePlayKing,
      data: {
        lobbyId: gameState.lobbyId,
        playerIdTarget: selectedPlayer,
        noEffect: false,
      },
    });

    backButton();
  };

  const backButton = () => {
    setSelectedPlayer('');
    setErrorMessage('');
    handleClose();
  };

  return (
    <ModalTemplate>
      <div className="flex w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-secondary-hover pb-2 text-2xl">Jouer le Roi</h2>
        {noPlayerAvailable ? (
          <>
            <p className="text-primary-hover">
              Tous les joueurs encore en lice sont protégés par une{' '}
              <span className="font-bold">Servante</span>. Jouer le Roi
              n&apos;aura aucun effet.
            </p>
            <div>
              <div className="flex flex-row gap-12">
                <PrimaryButton
                  buttonText="Jouer sans effet"
                  onClick={playKingNoEffect}
                  disabled={false}
                />
                <SecondaryButton
                  buttonText="Retour"
                  onClick={backButton}
                  disabled={false}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <p>
              Sélectionnez le joueur avec lequel vous voulez échanger votre
              seconde carte
            </p>
            <ul className="flex w-64 flex-col rounded-lg">
              {listPlayers.map((player, index) => {
                if (player.alive && player.id != myPlayer.id) {
                  let classes = player.color + ' py-2 transition-colors';
                  const isPlayer = player.id == selectedPlayer;

                  classes += isPlayer
                    ? ' bg-neutral-900 hover:bg-neutral-700'
                    : ' bg-neutral-800 hover:bg-neutral-700';

                  if (index == 0) {
                    classes += ' rounded-t-lg';
                  }

                  if (index == listPlayers.length - 1) {
                    classes += ' rounded-b-lg';
                  }

                  return (
                    <li
                      key={'select-player-king-' + player.id}
                      onClick={() => setSelectedPlayer(player.id)}
                      className={classes}
                    >
                      {player.playerName}{' '}
                      {player.id == selectedPlayer && '(Sélectionné)'}
                    </li>
                  );
                }

                return <div key={'select-player-king-' + player.id} />;
              })}
            </ul>
            {errorMessage != '' && (
              <p className="text-red-600 italic">{errorMessage}</p>
            )}
            <div className="flex flex-row gap-12">
              <PrimaryButton
                buttonText="Échanger"
                onClick={playKing}
                disabled={false}
              />
              <SecondaryButton
                buttonText="Retour"
                onClick={backButton}
                disabled={false}
              />
            </div>
          </>
        )}
      </div>
    </ModalTemplate>
  );
}

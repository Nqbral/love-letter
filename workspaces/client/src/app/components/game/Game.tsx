import Deck from '@components/game/gamedisplay/Deck';
import GameInformations from '@components/game/gamedisplay/GameInformations';
import OtherPlayer from '@components/game/gamedisplay/OtherPlayer';
import Player from '@components/game/gamedisplay/Player';
import useSocketManager from '@components/hooks/useSocketManager';
import { reviver } from '@love-letter/shared/common/JsonHelper';
import { PlayerGame } from '@love-letter/shared/common/Player';
import { ServerEvents } from '@love-letter/shared/server/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/server/ServerPayloads';
import { useEffect, useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState];
};

export default function Game({ gameState }: Props) {
  const { sm } = useSocketManager();
  const [playersTurnOrder, setPlayersTurnOrder] = useState(['']);
  const [playersParsed, setPlayersParsed] = useState(new Map());
  const [myPlayer, setMyPlayer] = useState<PlayerGame>({
    id: '',
    playerName: '',
    color: '',
    score: 0,
    cards: [],
    activeCards: [],
  });

  useEffect(() => {
    const socketId = sm.getSocketId();

    if (gameState.players == '' || myPlayer.id != '') {
      return;
    }
    const playersParsed = JSON.parse(gameState.players, reviver);
    setPlayersParsed(playersParsed);

    if (socketId != null) {
      setMyPlayer(playersParsed.get(socketId));

      const indexMyPlayerTurn = gameState.playersTurnOrder.findIndex(
        (playerTurn) => {
          return playerTurn == socketId;
        },
      );

      if (indexMyPlayerTurn != -1) {
        const lengthPlayersTurnOrder = gameState.playersTurnOrder.length;
        if (indexMyPlayerTurn === 0) {
          setPlayersTurnOrder(
            gameState.playersTurnOrder.slice(1, lengthPlayersTurnOrder),
          );
          return;
        }
        if (indexMyPlayerTurn === lengthPlayersTurnOrder - 1) {
          setPlayersTurnOrder(
            gameState.playersTurnOrder.slice(0, indexMyPlayerTurn),
          );
          return;
        }
        setPlayersTurnOrder(
          gameState.playersTurnOrder
            .slice(indexMyPlayerTurn + 1, lengthPlayersTurnOrder)
            .concat(gameState.playersTurnOrder.slice(0, indexMyPlayerTurn)),
        );
      }
    }
  }, [gameState]);
  return (
    <div className="flex min-h-screen w-full flex-row gap-6">
      <ToastContainer />
      <GameInformations
        myPlayer={myPlayer}
        gameState={gameState}
        playersParsed={playersParsed}
      />
      <div className="flex w-full flex-row items-center">
        <Deck gameState={gameState} />
        <div className="flex h-full w-full flex-col items-center justify-around">
          <Player myPlayer={myPlayer} />
          <div className="flex flex-row gap-32">
            {playersTurnOrder[0] != '' &&
              playersTurnOrder.map((playerTurn) => {
                return (
                  <OtherPlayer
                    key={playerTurn}
                    player={playersParsed.get(playerTurn)}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

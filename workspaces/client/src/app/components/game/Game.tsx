import ModalFinishedByLeaving from '@components/modal/ModalFinishedByLeaving';
import ModalFinishedRound from '@components/modal/ModalFinishedRound';
import ModalPauseDisconnect from '@components/modal/ModalPauseDisconnect';
import ModalPlaySecurityAgent from '@components/modal/ModalPlaySecurityAgent';
import ModalRecapRound from '@components/modal/ModalRecapRound';
import { useSocket } from '@contexts/SocketContext';
import { Player } from '@love-letter/shared/classes/Player';
import { GAME_STATES } from '@love-letter/shared/consts/GameStates';
import { LOBBY_STATES } from '@love-letter/shared/consts/LobbyStates';
import { NAME_CARD } from '@love-letter/shared/consts/NameCard';
import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';
import { Modal } from '@mui/material';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Slide, ToastContainer } from 'react-toastify';

import DeckAndDiscardedCards from './DeckAndDiscardedCards';
import GameInformations from './GameInformations';
import MyPlayerDisplay from './MyPlayerDisplay';
import PlayersDisplay from './PlayersDisplay';
import ScoreToReachInformation from './ScoreToReachInformation';
import RoundInformations from './gameinformations/RoundInformations';

type Props = {
  lobbyState: ServerPayloads[ServerEvents.LobbyState] | null;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function Game({ lobbyState, gameState }: Props) {
  const { userId } = useSocket();
  const [myPlayer, setPlayer] = useState<Player | undefined>(undefined);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [modalTypeCard, setModalTypeCard] = useState<string | null>(null);

  const handleCardAction = (cardName: string | null) => {
    setModalTypeCard(cardName);
  };

  useEffect(() => {
    if (gameState != null) {
      setPlayer(
        gameState.players.find((player) => {
          return player.userId == userId;
        }),
      );
    }
  }, [gameState, userId]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Modals */}
      <Modal
        open={lobbyState?.stateLobby == LOBBY_STATES.GAME_PAUSED}
        onClose={() => {}}
        aria-labelledby="modal-disconnected-pause"
        aria-describedby="modal-disconnected-pause"
      >
        <ModalPauseDisconnect lobbyState={lobbyState} />
      </Modal>

      <Modal
        open={lobbyState?.stateLobby == LOBBY_STATES.GAME_FINISHED_BY_LEAVING}
        onClose={() => {}}
        aria-labelledby="modal-finished-by-leaving"
        aria-describedby="modal-finished-by-leaving"
      >
        <ModalFinishedByLeaving lobbyState={lobbyState} />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.RECAP_ROUND
        }
        onClose={() => {}}
        aria-labelledby="modal-recap-round"
        aria-describedby="modal-recap-round"
      >
        <ModalRecapRound player={myPlayer} gameState={gameState} />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.GAME_FINISHED
        }
        onClose={() => {}}
        aria-labelledby="modal-recap-game"
        aria-describedby="modal-recap-game"
      >
        <ModalFinishedRound lobbyState={lobbyState} gameState={gameState} />
      </Modal>

      {/* MODALS USER PLAY */}
      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          modalTypeCard == NAME_CARD.SECURITY_AGENT
        }
        onClose={() => setModalTypeCard(null)}
        aria-labelledby="modal-security-agent"
      >
        <ModalPlaySecurityAgent
          setModalTypeCard={setModalTypeCard}
          gameState={gameState}
          myPlayer={myPlayer}
        />
      </Modal>

      {/* TOAST CONTAINER */}
      <ToastContainer transition={Slide} />

      {/* GAME */}
      <div className="flex h-screen min-h-screen w-full flex-row pt-20">
        <button
          className="fixed top-20 left-4 z-50 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={28} />
        </button>

        <div className="hidden h-full w-96 pl-4 lg:flex lg:flex-col">
          <GameInformations player={myPlayer} gameState={gameState} />
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-neutral-950 p-4 shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
        >
          <button
            className="mb-4 ml-auto"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
          <GameInformations player={myPlayer} gameState={gameState} />
        </div>

        <div className="flex w-full flex-col items-center gap-4 sm:gap-6">
          <div className="lg:hidden">
            <RoundInformations gameState={gameState} player={myPlayer} />
          </div>
          <ScoreToReachInformation gameState={gameState} />
          <PlayersDisplay gameState={gameState} myPlayer={myPlayer} />
          <DeckAndDiscardedCards gameState={gameState} />
          <MyPlayerDisplay
            gameState={gameState}
            myPlayer={myPlayer}
            handleCardAction={handleCardAction}
          />
        </div>
      </div>
    </>
  );
}

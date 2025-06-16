import { Player } from '@love-letter/shared/classes/Player';
import { NAME_CARD } from '@love-letter/shared/consts/NameCard';

type Props = {
  players: Player[] | undefined;
  myPlayerId: string;
  mode: 'all' | 'exceptMe'; // 'all' = inclut le joueur actuel, 'exceptMe' = l'exclut
  setSelectedPlayer: (id: string) => void;
  selectedPlayer: string | null;
};

export default function PlayerSelector({
  players,
  myPlayerId,
  mode,
  setSelectedPlayer,
  selectedPlayer,
}: Props) {
  const filteredPlayers = players?.filter((p) => {
    const hasHandmaid = p.activeCards.some(
      (c) => c.nameCard === NAME_CARD.HANDMAID,
    );
    if (hasHandmaid) return false;
    if (mode === 'exceptMe' && p.userId === myPlayerId) return false;
    return true;
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center text-sm sm:text-base">
        Veuillez sélectionner un joueur.
      </div>
      <ul className="flex w-64 flex-col items-center text-xs sm:text-sm">
        {filteredPlayers?.map((player, index) => (
          <li key={player.userId} className="w-full">
            <button
              className={`w-full px-4 py-2 text-${player.color} hover:bg-neutral-700 ${selectedPlayer === player.userId ? 'bg-neutral-900' : 'bg-neutral-800'} transition-colors ${index == 0 && 'rounded-t-lg'} ${index == filteredPlayers.length - 1 && 'rounded-b-lg'}`}
              onClick={() => setSelectedPlayer(player.userId)}
            >
              {player.userId == myPlayerId ? 'Vous-même' : player.userName}{' '}
              {selectedPlayer === player.userId ? '(Sélectionné)' : ''}
            </button>
          </li>
        ))}
        {filteredPlayers?.length === 0 && (
          <li className="text-sm text-gray-500">Aucun joueur sélectionnable</li>
        )}
      </ul>
    </div>
  );
}

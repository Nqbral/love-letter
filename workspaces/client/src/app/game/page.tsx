import GameManager from '@components/game/GameManager';

export default function GamePage() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-4">
      <GameManager />
    </div>
  );
}

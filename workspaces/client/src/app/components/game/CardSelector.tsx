import { NAME_CARD } from '@love-letter/shared/consts/NameCard';

import ListTileCardSelector from './list_tiles/ListTileCardSelector';

type Props = {
  selectedCard: string | null;
  setSelectedCard: (cardName: string | null) => void;
};

export default function CardSelector({ selectedCard, setSelectedCard }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center text-sm sm:text-base">
        Veuillez sélectionner une carte.
      </div>
      <ul className="flex w-64 flex-col items-center text-xs sm:text-sm">
        <ListTileCardSelector
          cardName={NAME_CARD.SPY}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.PRIEST}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.BARON}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.HANDMAID}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.PRINCE}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.CHANCELLOR}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.KING}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.COUNTESS}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.PRINCESS}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      </ul>
    </div>
  );
}

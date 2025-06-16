import CustomNotification from '@components/notifications/CustomNotification';
import { useSocket } from '@contexts/SocketContext';
import { Card } from '@love-letter/shared/classes/Card';
import { CLIENT_EVENTS } from '@love-letter/shared/consts/ClientEvents';
import { NAME_CARD } from '@love-letter/shared/consts/NameCard';
import Baron from '@public/baron.png';
import Chancellor from '@public/chancellor.png';
import Countess from '@public/countess.png';
import Guard from '@public/guard.png';
import Handmaid from '@public/handmaid.png';
import King from '@public/king.png';
import Priest from '@public/priest.png';
import Prince from '@public/prince.png';
import Princess from '@public/princess.png';
import Spy from '@public/spy.png';
import Image from 'next/image';
import { toast } from 'react-toastify';

import TooltipDescription from './TooltipDescription';

type Props = {
  isPlayerTurn: boolean;
  cards: Card[] | undefined;
  handleCardAction: (cardName: string | null) => void;
};

export default function PlayerCards({
  isPlayerTurn,
  cards,
  handleCardAction,
}: Props) {
  const { emitEvent } = useSocket();

  const onPlayCard = (card: Card) => {
    if (!isPlayerTurn) {
      toast(CustomNotification, {
        data: {
          title: 'Erreur',
          content: "Ce n'est pas à votre tour de jouer.",
        },
        hideProgressBar: true,
        closeButton: false,
        style: {
          width: 280,
        },
      });
      return;
    }

    switch (card.nameCard) {
      case NAME_CARD.SPY:
        emitEvent(CLIENT_EVENTS.GAME_PLAY_SPY, undefined);
        break;
      case NAME_CARD.GUARD:
        handleCardAction(NAME_CARD.GUARD);
        break;
      case NAME_CARD.PRIEST:
        handleCardAction(NAME_CARD.PRIEST);
        break;
      case NAME_CARD.BARON:
        handleCardAction(NAME_CARD.BARON);
        break;
      case NAME_CARD.HANDMAID:
        emitEvent(CLIENT_EVENTS.GAME_PLAY_HANDMAID, undefined);
        break;
      case NAME_CARD.PRINCE:
        handleCardAction(NAME_CARD.PRINCE);
        break;
      case NAME_CARD.CHANCELLOR:
        emitEvent(CLIENT_EVENTS.GAME_PLAY_CHANCELLOR, undefined);
        break;
      case NAME_CARD.KING:
        handleCardAction(NAME_CARD.KING);
        break;
      case NAME_CARD.COUNTESS:
        emitEvent(CLIENT_EVENTS.GAME_PLAY_COUNTESS, undefined);
        break;
      case NAME_CARD.PRINCESS:
        handleCardAction(NAME_CARD.PRINCESS);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {cards?.map((card, index) => {
        let imageSrc, altText;
        switch (card.nameCard) {
          case NAME_CARD.SPY:
            imageSrc = Spy;
            altText = 'spy_player_card';
            break;
          case NAME_CARD.GUARD:
            imageSrc = Guard;
            altText = 'guard_player_card';
            break;
          case NAME_CARD.PRIEST:
            imageSrc = Priest;
            altText = 'priest_player_card';
            break;
          case NAME_CARD.BARON:
            imageSrc = Baron;
            altText = 'baron_player_card';
            break;
          case NAME_CARD.HANDMAID:
            imageSrc = Handmaid;
            altText = 'handmaid_player_card';
            break;
          case NAME_CARD.PRINCE:
            imageSrc = Prince;
            altText = 'prince_player_card';
            break;
          case NAME_CARD.CHANCELLOR:
            imageSrc = Chancellor;
            altText = 'chancellor_player_card';
            break;
          case NAME_CARD.KING:
            imageSrc = King;
            altText = 'king_player_card';
            break;
          case NAME_CARD.COUNTESS:
            imageSrc = Countess;
            altText = 'countess_player_card';
            break;
          case NAME_CARD.PRINCESS:
            imageSrc = Princess;
            altText = 'princess_player_card';
            break;
          default:
            return null;
        }
        return (
          <TooltipDescription
            key={`my_player_card_${index}`}
            nameCard={card.nameCard}
            value={card.value}
            nbCards={card.nbCards}
            description={card.description}
          >
            <div
              className="w-12 transform cursor-pointer transition-transform hover:scale-105 sm:w-16 md:w-20 lg:w-24"
              onClick={() => onPlayCard(card)}
            >
              <Image src={imageSrc} alt={altText} />
            </div>
          </TooltipDescription>
        );
      })}
    </>
  );
}

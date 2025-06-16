import CustomNotification from '@components/notifications/CustomNotification';
import { useSocket } from '@contexts/SocketContext';
import { Card } from '@love-letter/shared/classes/Card';
import { CLIENT_EVENTS } from '@love-letter/shared/consts/ClientEvents';
import { NAME_CARD } from '@love-letter/shared/consts/NameCard';
import MagnateImg from '@public/baron.png';
import StrategistImg from '@public/chancellor.png';
import DiplomatImg from '@public/countess.png';
import SecurityAgentImg from '@public/guard.png';
import DiscreetAssistantImg from '@public/handmaid.png';
import DirectorOfOperationsImg from '@public/king.png';
import InformantImg from '@public/priest.png';
import UndercoverAgentImg from '@public/prince.png';
import DoubleAgentImg from '@public/princess.png';
import SecretOperatorImg from '@public/spy.png';
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
      case NAME_CARD.SECRET_OPERATOR:
        emitEvent(CLIENT_EVENTS.GAME_PLAY_SECRET_OPERATOR, undefined);
        break;
      case NAME_CARD.SECURITY_AGENT:
        handleCardAction(NAME_CARD.SECURITY_AGENT);
        break;
      case NAME_CARD.INFORMANT:
        handleCardAction(NAME_CARD.INFORMANT);
        break;
      case NAME_CARD.MAGNATE:
        handleCardAction(NAME_CARD.MAGNATE);
        break;
      case NAME_CARD.DISCREET_ASSISTANT:
        emitEvent(CLIENT_EVENTS.GAME_PLAY_DISCREET_ASSISTANT, undefined);
        break;
      case NAME_CARD.UNDERCOVER_AGENT:
        handleCardAction(NAME_CARD.UNDERCOVER_AGENT);
        break;
      case NAME_CARD.STRATEGIST:
        emitEvent(CLIENT_EVENTS.GAME_PLAY_STRATEGIST, undefined);
        break;
      case NAME_CARD.DIRECTOR_OF_OPERATIONS:
        handleCardAction(NAME_CARD.DIRECTOR_OF_OPERATIONS);
        break;
      case NAME_CARD.DIPLOMAT:
        emitEvent(CLIENT_EVENTS.GAME_PLAY_DIPLOMAT, undefined);
        break;
      case NAME_CARD.DOUBLE_AGENT:
        handleCardAction(NAME_CARD.DOUBLE_AGENT);
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
          case NAME_CARD.SECRET_OPERATOR:
            imageSrc = SecretOperatorImg;
            altText = 'secret_operator_player_card';
            break;
          case NAME_CARD.SECURITY_AGENT:
            imageSrc = SecurityAgentImg;
            altText = 'security_agent_player_card';
            break;
          case NAME_CARD.INFORMANT:
            imageSrc = InformantImg;
            altText = 'informant_player_card';
            break;
          case NAME_CARD.MAGNATE:
            imageSrc = MagnateImg;
            altText = 'magnate_player_card';
            break;
          case NAME_CARD.DISCREET_ASSISTANT:
            imageSrc = DiscreetAssistantImg;
            altText = 'discreet_assistant_player_card';
            break;
          case NAME_CARD.UNDERCOVER_AGENT:
            imageSrc = UndercoverAgentImg;
            altText = 'undercover_player_card';
            break;
          case NAME_CARD.STRATEGIST:
            imageSrc = StrategistImg;
            altText = 'strategist_player_card';
            break;
          case NAME_CARD.DIRECTOR_OF_OPERATIONS:
            imageSrc = DirectorOfOperationsImg;
            altText = 'director_of_operations_player_card';
            break;
          case NAME_CARD.DIPLOMAT:
            imageSrc = DiplomatImg;
            altText = 'diplomat_player_card';
            break;
          case NAME_CARD.DOUBLE_AGENT:
            imageSrc = DoubleAgentImg;
            altText = 'double_agent_player_card';
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

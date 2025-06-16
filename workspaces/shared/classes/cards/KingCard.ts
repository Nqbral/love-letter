import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class KingCard extends Card {
  constructor() {
    super(
      NAME_CARD.KING,
      7,
      1,
      "Échangez votre main avec celle d'un autre joueur."
    );
  }
}

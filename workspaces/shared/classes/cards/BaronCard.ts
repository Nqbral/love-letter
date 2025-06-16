import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class BaronCard extends Card {
  constructor() {
    super(
      NAME_CARD.BARON,
      3,
      2,
      "Comparez votre main avec celle d'un autre joueur."
    );
  }
}

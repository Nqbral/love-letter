import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class HandmaidCard extends Card {
  constructor() {
    super(
      NAME_CARD.HANDMAID,
      4,
      2,
      "Vous êtes protégé jusqu'à votre prochain tour."
    );
  }
}

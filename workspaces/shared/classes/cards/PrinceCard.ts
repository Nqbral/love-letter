import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class PrinceCard extends Card {
  constructor() {
    super(
      NAME_CARD.PRINCE,
      5,
      2,
      "Choisissez un joueur (y compris vous-même) pour défausser sa main."
    );
  }
}

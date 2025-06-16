import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class PriestCard extends Card {
  constructor() {
    super(NAME_CARD.PRIEST, 2, 2, "Regardez la main d'un autre joueur.");
  }
}

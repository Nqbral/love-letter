import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class CountessCard extends Card {
  constructor() {
    super(
      NAME_CARD.COUNTESS,
      8,
      1,
      "Doit être jouée si vous avez le Roi ou le Prince en main."
    );
  }
}

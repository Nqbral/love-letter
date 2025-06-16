import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class PrincessCard extends Card {
  constructor() {
    super(
      NAME_CARD.PRINCESS,
      9,
      1,
      "Si vous jouez ou défaussez cette carte, vous êtes éliminé."
    );
  }
}

import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class ChancellorCard extends Card {
  constructor() {
    super(
      NAME_CARD.CHANCELLOR,
      6,
      2,
      "Piochez deux cartes, gardez-en une et replacez les autres sous la pioche."
    );
  }
}

import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class SpyCard extends Card {
  constructor() {
    super(
      NAME_CARD.SPY,
      0,
      1,
      "Si vous êtes le seul joueur en lice avec une espionne jouée à la fin de la manche, gagnez un jeton de faveur."
    );
  }
}

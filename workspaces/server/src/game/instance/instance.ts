import { AuthenticatedSocket } from '@app/types/AuthenticatedSocket';
import { HttpService } from '@nestjs/axios';
import { WsException } from '@nestjs/websockets';
import { Card } from '@shared/classes/Card';
import { HistoryEvent } from '@shared/classes/HistoryEvent';
import { Player } from '@shared/classes/Player';
import { BaronCard } from '@shared/classes/cards/BaronCard';
import { ChancellorCard } from '@shared/classes/cards/ChancellorCard';
import { CountessCard } from '@shared/classes/cards/CountessCard';
import { GuardCard } from '@shared/classes/cards/GuardCard';
import { HandmaidCard } from '@shared/classes/cards/HandmaidCard';
import { KingCard } from '@shared/classes/cards/KingCard';
import { PriestCard } from '@shared/classes/cards/PriestCard';
import { PrinceCard } from '@shared/classes/cards/PrinceCard';
import { PrincessCard } from '@shared/classes/cards/PrincessCard';
import { SpyCard } from '@shared/classes/cards/SpyCard';
import { GAME_STATES } from '@shared/consts/GameStates';
import { LOBBY_STATES } from '@shared/consts/LobbyStates';
import { NAME_CARD } from '@shared/consts/NameCard';
import { ServerEvents } from '@shared/enums/ServerEvents';
import { ServerPayloads } from '@shared/types/ServerPayloads';
import { lastValueFrom } from 'rxjs';

import { Lobby } from '../lobby/lobby';

export class Instance {
  private stateGame: string = '';
  private roundNumber: number = 1;
  private playerTurn: Player | null = null;
  private playersTurnOrder: Player[] = [];
  private deck: Card[] = [];
  private lastPlayedCard: Card | null;
  private secondPlayedCard: Card | null;
  private discardedCard: Card | null;
  private historyEvents: HistoryEvent[] = [];
  private scoreToReach: number = 0;

  constructor(
    private readonly lobby: Lobby,
    private readonly httpService: HttpService,
  ) {}

  public triggerStart(client: AuthenticatedSocket) {
    if (client.userId !== this.lobby.owner.userId) {
      throw new WsException('Only the owner can start the game.');
    }

    if (this.lobby.players.length < 2) {
      throw new WsException('Not enough players to start the game.');
    }

    if (this.lobby.players.length > 6) {
      throw new WsException('Too much players to start the game.');
    }

    this.initPlayers();
    this.initCards();
    this.initTurnOrder();
    this.initScoreToReach();
    this.setRandomTurn();
    this.playerDrawCard();

    if (this.lobby.stateLobby != LOBBY_STATES.GAME_STARTED) {
      this.lobby.stateLobby = LOBBY_STATES.GAME_STARTED;
      this.lobby.dispatchLobbyState();
    }

    this.dispatchGameState();
  }

  private async updatePlayerStats(
    userId: string,
    token: string,
    stats: { gamesPlayed?: number; wins?: number; losses?: number },
  ) {
    try {
      const response = await lastValueFrom(
        this.httpService.put(
          `${process.env.NEXT_PUBLIC_WS_API_AUTH_URL}/user/stats/last-hope`,
          stats,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      return response.data;
    } catch (err) {
      console.error(
        `Erreur lors de la mise à jour des stats du joueur ${userId}`,
        err?.response?.data || err.message,
      );
    }
  }

  private async triggerFinish() {
    this.stateGame = GAME_STATES.GAME_FINISHED;

    this.dispatchGameState();
  }

  private initCards(): void {
    this.deck = [];

    this.deck.push(new PrincessCard());
    this.deck.push(new CountessCard());
    this.deck.push(new KingCard());

    for (let index = 0; index < 2; index++) {
      this.deck.push(new ChancellorCard());
      this.deck.push(new PrinceCard());
      this.deck.push(new HandmaidCard());
      this.deck.push(new BaronCard());
      this.deck.push(new PriestCard());
      this.deck.push(new SpyCard());
    }

    for (let index = 0; index < 6; index++) {
      this.deck.push(new GuardCard());
    }

    this.deck = this.shuffle(this.deck);

    this.discardedCard = this.deck.pop() ?? null;

    this.lobby.players.forEach((playerGame) => {
      let card = this.deck.pop();

      if (card != undefined) {
        playerGame.hand = [card];
      }
    });
  }

  private initTurnOrder(): void {
    this.playersTurnOrder = this.lobby.players.sort(() => 0.5 - Math.random());
  }

  private initScoreToReach(): void {
    switch (this.lobby.players.length) {
      case 2:
        this.scoreToReach = 6;
        break;
      case 3:
        this.scoreToReach = 5;
        break;
      case 4:
        this.scoreToReach = 4;
        break;
      case 5:
      case 6:
        this.scoreToReach = 3;
        break;
      default:
        throw new WsException(
          'Init score to reach error : number of players incorrect.',
        );
    }
  }

  private initPlayers(): void {
    this.lobby.players.forEach((player) => {
      player.ready = false;
      player.alive = true;
      player.hand = [];
      player.activeCards = [];
    });
  }

  private setRandomTurn(): void {
    this.playerTurn =
      this.lobby.players[Math.floor(Math.random() * this.lobby.players.length)];
  }

  private playerDrawCard() {
    if (this.deck.length == 0) {
      return;
    }

    if (this.playerTurn != null) {
      let card = this.deck.pop();

      if (card != undefined) {
        this.playerTurn.hand.push(card);
      }
    }
  }

  private shuffle(array: any[]): any[] {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  private findPlayerOnUserId(userId: string): Player {
    let player = this.lobby.players.find((player) => player.userId == userId);

    if (player == undefined) {
      throw new WsException('Player not found in lobby');
    }

    return player;
  }

  public playCard(
    client: AuthenticatedSocket,
    cardName: string,
    data: any,
  ): void {
    if (client.userId != this.playerTurn?.userId) {
      throw new WsException('This is not the turn of the player.');
    }

    let player = this.findPlayerOnUserId(client.userId);

    const indexCardPlayer = player.hand.findIndex((card) => {
      return card.nameCard == cardName;
    });

    if (indexCardPlayer == -1) {
      throw new WsException("The card has not been found in the player's hand");
    }

    switch (cardName) {
      case NAME_CARD.SPY:
        this.playSpy(player);
        break;
      default:
        throw new WsException('Type of card not handled');
    }
  }

  public playSpy(player: Player): void {
    player.activeCards.push(new SpyCard());
  }

  public dispatchGameState(): void {
    this.lobby.updatedAt = new Date();

    const payload: ServerPayloads[ServerEvents.GameState] = {
      lobbyId: this.lobby.id,
      stateGame: this.stateGame,
      roundNumber: this.roundNumber,
      players: this.lobby.players,
      playerTurn: this.playerTurn,
      playersTurnOrder: this.playersTurnOrder,
      deck: this.deck,
      lastPlayedCard: this.lastPlayedCard,
      secondPlayedCard: this.secondPlayedCard,
      scoreToReach: this.scoreToReach,
      historyEvents: this.historyEvents,
    };

    this.lobby.dispatchToLobby(ServerEvents.GameState, payload);
  }
}

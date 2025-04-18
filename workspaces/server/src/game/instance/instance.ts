import { Lobby } from '@app/game/lobby/lobby';
import { ServerException } from '@app/game/server.exception';
import { AuthenticatedSocket } from '@app/game/types';
import { Cards, CardsNumber } from '@shared/common/Cards';
import { GameState } from '@shared/common/GameState';
import { replacer } from '@shared/common/JsonHelper';
import { PlayerGame } from '@shared/common/Player';
import { ServerEvents } from '@shared/server/ServerEvents';
import { ServerPayloads } from '@shared/server/ServerPayloads';
import { SocketExceptions } from '@shared/server/SocketExceptions';
import { isString } from 'class-validator';
import { Socket } from 'socket.io';

export class Instance {
  public currentRound: number = 1;

  public scores: Record<Socket['id'], number> = {};

  public gameState: GameState = GameState.InLobby;

  public deck: Cards[] = [];

  public playerTurn: Socket['id'];

  public players: Map<Socket['id'], PlayerGame> = new Map<
    Socket['id'],
    PlayerGame
  >();

  public playersActiveCard: Map<Socket['id'], Cards[]> = new Map<
    Socket['id'],
    Cards[]
  >();

  public playersTurnOrder: Socket['id'][] = [];

  public discardedCard: Cards;

  public lastPlayedCard: Cards;

  constructor(private readonly lobby: Lobby) {}

  public triggerStart(client: AuthenticatedSocket): void {
    if (this.gameState == GameState.GameStart) {
      return;
    }

    if (client.id != this.lobby.owner.id) {
      throw new ServerException(
        SocketExceptions.LobbyError,
        'Only the owner of the lobby can start the game',
      );
    }

    if (
      this.lobby.maxClients > Array.from(this.lobby.players.values()).length
    ) {
      throw new ServerException(
        SocketExceptions.LobbyError,
        'The lobby is not full',
      );
    }

    this.gameState = GameState.GameStart;

    this.initPlayers();
    this.initializeCards();
    this.initializeTurns();
    this.setRandomTurn();
    this.playerDrawCard();

    this.lobby.dispatchLobbyState();
    this.dispatchGameState();
  }

  public triggerFinish(): void {
    if (this.gameState === GameState.GameFinished) {
      return;
    }

    this.gameState = GameState.GameFinished;

    this.lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(
      ServerEvents.GameMessage,
      {
        message: 'Game finished !',
      },
    );
  }

  private initializeCards(): void {
    const cards = Object.values(Cards).filter((c) => isString(c)) as Cards[];
    for (const card of cards) {
      for (let i = 0; i < CardsNumber[card]; i++) {
        this.deck.push(card);
      }
    }

    // Shuffle array randomly
    this.deck = this.deck.sort((a, b) => 0.5 - Math.random());
    // Discard one card
    this.deck.pop();

    // Give each player one card
    this.players.forEach((playerGame, socketId) => {
      let card = this.deck.pop();
      let player = this.players.get(socketId);

      if (player != null && card != undefined) {
        player.cards = [card];
      }
    });
  }

  private initPlayers(): void {
    this.lobby.players.forEach((value, key) => {
      this.players.set(key, {
        id: value.id,
        color: value.color,
        playerName: value.playerName,
        score: 0,
        cards: [],
        activeCards: [],
      });
    });
  }

  private initializeTurns(): void {
    this.playersTurnOrder = Array.from(this.players.keys()).sort(
      (a, b) => 0.5 - Math.random(),
    );
  }

  // Set the turn on one of the player randomly (at start game only)
  private setRandomTurn(): void {
    const arr = Array.from(this.lobby.players.keys());
    this.playerTurn = arr[Math.floor(Math.random() * arr.length)];
  }

  private playerDrawCard() {
    if (this.deck.length == 0) {
      return;
    }
    let player = this.players.get(this.playerTurn);
    if (player != null) {
      let card = this.deck.pop();
      if (card != undefined) {
        player.cards.push(card);
      }
    }
  }

  public dispatchGameState(): void {
    this.lobby.updatedAt = new Date();
    const payload: ServerPayloads[ServerEvents.GameState] = {
      lobbyId: this.lobby.id,
      players: JSON.stringify(this.players, replacer),
      discardedCard: this.discardedCard,
      lastPlayedCard: this.lastPlayedCard,
      playerTurn: this.playerTurn,
      playersTurnOrder: this.playersTurnOrder,
      deck: this.deck,
    };

    this.lobby.dispatchToLobby(ServerEvents.GameState, payload);
  }
}

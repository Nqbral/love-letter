import {
  LobbyCreateDto,
  LobbyJoinDto,
  LobbyRenamePlayerDto,
  PlayCardGameDto,
} from '@app/game/dtos';
import { LobbyManager } from '@app/game/lobby/lobby.manager';
import { AuthenticatedSocket } from '@app/game/types';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { ClientEvents } from '@shared/client/ClientEvents';
import { Cards } from '@shared/common/Cards';
import { ServerEvents } from '@shared/server/ServerEvents';
import { ServerPayloads } from '@shared/server/ServerPayloads';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection {
  private readonly logger: Logger = new Logger(GameGateway.name);

  constructor(private readonly lobbyManager: LobbyManager) {}

  afterInit(server: Server): any {
    // Pass server instance to managers
    this.lobbyManager.server = server;

    this.logger.log('Game server initialized !');
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    // Call initializers to set up socket
    this.lobbyManager.initializeSocket(client as AuthenticatedSocket);
  }

  async handleDisconnect(client: AuthenticatedSocket): Promise<void> {
    // Handle termination of socket
    this.lobbyManager.terminateSocket(client);
  }

  /** Handle client events */
  @SubscribeMessage(ClientEvents.Ping)
  onPing(
    client: AuthenticatedSocket,
    data: LobbyCreateDto,
  ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
    return {
      event: ServerEvents.Pong,
      data: {
        message: 'Pong',
      },
    };
  }

  @SubscribeMessage(ClientEvents.LobbyCreate)
  onLobbyCreate(
    client: AuthenticatedSocket,
    data: LobbyCreateDto,
  ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
    const lobby = this.lobbyManager.createLobby(
      data.nbPlayers,
      client,
      data.lobbyName,
    );
    lobby.addClient(client);

    return {
      event: ServerEvents.GameMessage,
      data: {
        message: 'Lobby created',
      },
    };
  }

  @SubscribeMessage(ClientEvents.LobbyJoin)
  onLobbyJoin(client: AuthenticatedSocket, data: LobbyJoinDto): void {
    this.lobbyManager.joinLobby(data.lobbyId, client);
  }

  @SubscribeMessage(ClientEvents.PlayerRename)
  onPlayerRename(
    client: AuthenticatedSocket,
    data: LobbyRenamePlayerDto,
  ): void {
    this.lobbyManager.renamePlayer(data.lobbyId, client, data.playerName);
  }

  @SubscribeMessage(ClientEvents.LobbyLeave)
  onLeaveLobby(client: AuthenticatedSocket, data: LobbyRenamePlayerDto): void {
    this.lobbyManager.leaveLobby(data.lobbyId, client);
  }

  @SubscribeMessage(ClientEvents.LobbyDelete)
  onDeleteLobby(client: AuthenticatedSocket, data: LobbyRenamePlayerDto): void {
    this.lobbyManager.deleteLobby(data.lobbyId, client);
  }

  @SubscribeMessage(ClientEvents.StartGame)
  onStartGame(client: AuthenticatedSocket, data: LobbyRenamePlayerDto): void {
    this.lobbyManager.startGame(data.lobbyId, client);
  }

  @SubscribeMessage(ClientEvents.GamePlaySpy)
  onPlaySpy(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.Spy, client);
  }

  @SubscribeMessage(ClientEvents.GamePlayGuard)
  onPlayGuard(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.Guard, client);
  }

  @SubscribeMessage(ClientEvents.GamePlayPriest)
  onPlayPriest(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.Priest, client);
  }

  @SubscribeMessage(ClientEvents.GamePlayBaron)
  onPlayBaron(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.Baron, client);
  }

  @SubscribeMessage(ClientEvents.GamePlayHandmaid)
  onPlayHandmaid(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.Handmaid, client);
  }

  @SubscribeMessage(ClientEvents.GamePlayPrince)
  onPlayPrince(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.Prince, client);
  }

  @SubscribeMessage(ClientEvents.GamePlayChancellor)
  onPlayChancellor(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.Chancellor, client);
  }

  @SubscribeMessage(ClientEvents.GamePlayKing)
  onPlayKing(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.King, client);
  }

  @SubscribeMessage(ClientEvents.GamePlayCountess)
  onPlayCountess(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.Countess, client);
  }

  @SubscribeMessage(ClientEvents.GamePlayPrincess)
  onPlayPrincess(client: AuthenticatedSocket, data: PlayCardGameDto): void {
    this.lobbyManager.playCard(data.lobbyId, Cards.Princess, client);
  }
}

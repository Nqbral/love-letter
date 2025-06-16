import { CLIENT_EVENTS } from "../consts/ClientEvents";

export type ClientSocketEvents = {
  // Lobby
  [CLIENT_EVENTS.LOBBY_CREATE]: undefined;
  [CLIENT_EVENTS.LOBBY_JOIN]: { lobbyIdJoin: string };
  [CLIENT_EVENTS.LOBBY_START_GAME]: undefined;
  [CLIENT_EVENTS.LOBBY_LEAVE]: undefined;
  [CLIENT_EVENTS.LOBBY_DELETE]: undefined;

  // Game
  [CLIENT_EVENTS.GAME_READY]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_SPY]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_GUARD]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_PRIEST]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_BARON]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_HANDMAID]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_PRINCE]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_CHANCELLOR]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_KING]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_COUNTESS]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_PRINCESS]: undefined;
};

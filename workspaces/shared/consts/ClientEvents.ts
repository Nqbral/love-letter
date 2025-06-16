export const CLIENT_EVENTS = {
  // Lobby
  LOBBY_CREATE: "client.lobby.create",
  LOBBY_JOIN: "client.lobby.join",
  LOBBY_START_GAME: "client.lobby.start.game",
  LOBBY_LEAVE: "client.lobby.leave",
  LOBBY_DELETE: "client.lobby.delete",

  // Game
  GAME_READY: "client.game.ready",
  GAME_PLAY_SPY: "client.game.play.spy",
  GAME_PLAY_GUARD: "client.game.play.guard",
  GAME_PLAY_PRIEST: "client.game.play.priest",
  GAME_PLAY_BARON: "client.game.play.baron",
  GAME_PLAY_HANDMAID: "client.game.play.handmaid",
  GAME_PLAY_PRINCE: "client.game.play.prince",
  GAME_PLAY_CHANCELLOR: "client.game.play.chancellor",
  GAME_PLAY_KING: "client.game.play.king",
  GAME_PLAY_COUNTESS: "client.game.play.countess",
  GAME_PLAY_PRINCESS: "client.game.play.princess",
} as const;

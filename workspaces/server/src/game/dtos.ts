import { Cards } from '@shared/common/Cards';
import { IsBoolean, IsInt, IsString, Max, Min } from 'class-validator';

//Lobby
export class LobbyCreateDto {
  @IsInt()
  @Min(2)
  @Max(6)
  nbPlayers: number;

  @IsString()
  lobbyName: string;
}

export class LobbyJoinDto {
  @IsString()
  lobbyId: string;
}

export class LobbyRenamePlayerDto {
  @IsString()
  lobbyId: string;

  @IsString()
  playerName: string;
}

export class LobbyDeleteDto {
  @IsString()
  lobbyId: string;
}

//Game
export class StartGameDto {
  @IsString()
  lobbyId: string;
}

export class PlayCardGameDto {
  @IsString()
  lobbyId: string;
}

export class PlayGuardGameDto extends PlayCardGameDto {
  @IsString()
  playerIdTarget: string;

  @IsString()
  cardTarget: string;

  @IsBoolean()
  noEffect: boolean;
}

export class PlayPriestGameDto extends PlayCardGameDto {
  @IsString()
  playerIdTarget: string;

  @IsBoolean()
  noEffect: boolean;
}

export class PlayBaronGameDto extends PlayCardGameDto {
  @IsString()
  playerIdTarget: string;

  @IsBoolean()
  noEffect: boolean;
}

export class PlayChancellorPartTwoDto extends PlayCardGameDto {
  indexCardsDiscarded: number[];
  cardsDiscarded: Cards[];
}

export class PlayPrinceGameDto extends PlayCardGameDto {
  @IsString()
  playerIdTarget: string;
}

export class PlayKingGameDto extends PlayCardGameDto {
  @IsString()
  playerIdTarget: string;

  @IsBoolean()
  noEffect: boolean;
}

export class LobbyLaunchNextRoundDto {
  @IsString()
  lobbyId: string;
}

export class LobbyRelaunchGameDto {
  @IsString()
  lobbyId: string;
}

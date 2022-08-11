import type { Principal } from '@dfinity/principal';
export type Balance = bigint;
export type BalanceResponse = { 'ok' : Balance } |
  { 'err' : CommonError };
export type CommonError = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export interface Cosmicrafts {
  'cancelGame' : (arg_0: bigint) => Promise<boolean>,
  'checkUsernameAvailable' : (arg_0: UserName) => Promise<boolean>,
  'checkWalletExists' : (arg_0: UserWallet, arg_1: string) => Promise<boolean>,
  'createGame' : (
      arg_0: string,
      arg_1: string,
      arg_2: bigint,
      arg_3: Array<bigint>,
      arg_4: bigint,
      arg_5: bigint,
      arg_6: bigint,
      arg_7: string,
      arg_8: bigint,
      arg_9: string,
      arg_10: string,
    ) => Promise<GameStatus>,
  'createPlayer' : (arg_0: string, arg_1: string, arg_2: string) => Promise<
      boolean
    >,
  'findGame' : (
      arg_0: string,
      arg_1: string,
      arg_2: bigint,
      arg_3: Array<bigint>,
      arg_4: bigint,
      arg_5: bigint,
      arg_6: bigint,
      arg_7: string,
      arg_8: bigint,
    ) => Promise<GameStatus>,
  'getAllUsers' : () => Promise<Array<Users>>,
  'getClientLastAlive' : (arg_0: bigint) => Promise<bigint>,
  'getGameInProgressData' : (arg_0: bigint) => Promise<GameStatus>,
  'getGameMatchStatus' : (arg_0: bigint) => Promise<GameStatus>,
  'getMasterLastAlive' : (arg_0: bigint) => Promise<bigint>,
  'getPlayer' : () => Promise<[] | [Player]>,
  'getPlayerPreferences' : () => Promise<[] | [PlayerPreferences]>,
  'getPlayerScore' : () => Promise<BalanceResponse>,
  'getTokenized' : (arg_0: string, arg_1: string) => Promise<[] | [Users]>,
  'getUser' : (arg_0: string) => Promise<[] | [Users]>,
  'getUserCharacter' : (arg_0: string) => Promise<string>,
  'getUserLanguage' : (arg_0: string) => Promise<bigint>,
  'getUserMatchData' : (arg_0: bigint) => Promise<P2Status>,
  'getUserPreferences' : (arg_0: string) => Promise<string>,
  'getUserProgress' : (arg_0: string) => Promise<[] | [Users]>,
  'principalToString' : () => Promise<Principal>,
  'saveMatchLastAlive' : (arg_0: bigint, arg_1: bigint) => Promise<boolean>,
  'savePlayerCharacter' : (arg_0: bigint) => Promise<boolean>,
  'savePlayerLanguage' : (arg_0: bigint) => Promise<boolean>,
  'savePlayerPreferences' : (arg_0: string) => Promise<boolean>,
  'savePlayerScore' : (arg_0: bigint) => Promise<[boolean, string]>,
  'saveUser' : (arg_0: UserName, arg_1: string, arg_2: UserWallet) => Promise<
      [] | [Users]
    >,
  'saveUserCharacter' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'saveUserLanguage' : (arg_0: string, arg_1: bigint) => Promise<boolean>,
  'saveUserPreferences' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'saveUserScore' : (
      arg_0: string,
      arg_1: ScoreCC,
      arg_2: Highscore,
    ) => Promise<boolean>,
  'setGameInProgressData' : (
      arg_0: string,
      arg_1: bigint,
      arg_2: bigint,
      arg_3: string,
      arg_4: bigint,
    ) => Promise<boolean>,
  'setGameWinner' : (arg_0: bigint, arg_1: bigint) => Promise<boolean>,
  'setPlayerAlive' : (arg_0: bigint, arg_1: bigint) => Promise<boolean>,
  'setTokenized' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'setUserInProgressData' : (
      arg_0: string,
      arg_1: bigint,
      arg_2: bigint,
      arg_3: string,
    ) => Promise<P2Status>,
}
export interface GameStatus {
  'status' : string,
  'masterAvatar' : bigint,
  'clientXp' : bigint,
  'masterXp' : bigint,
  'clientDeck' : Array<bigint>,
  'clientIcon' : bigint,
  'gameId' : bigint,
  'gameStartTime' : string,
  'player2Name' : string,
  'clientAvatar' : bigint,
  'masterDeck' : Array<bigint>,
  'player1' : string,
  'player2' : string,
  'masterIcon' : bigint,
  'gameWinner' : bigint,
  'gameStep' : bigint,
  'clientLvl' : bigint,
  'masterLastAlive' : bigint,
  'clientLastAlive' : bigint,
  'player1Name' : string,
  'gameLastUpdate' : string,
  'userStatus' : string,
  'masterLvl' : bigint,
}
export type GamesPlayed = bigint;
export type GamesWon = bigint;
export type Highscore = bigint;
export type Highscore__1 = bigint;
export type Level = bigint;
export type Level__1 = bigint;
export type LinkedWallets = Array<Wallet>;
export interface P2Status {
  'status' : string,
  'lastAlive' : bigint,
  'gameLastUpdate' : string,
}
export interface Player {
  'id' : PlayerId,
  'aid' : string,
  'linkedWallets' : LinkedWallets,
  'level' : Level__1,
  'playerName' : PlayerName,
}
export type PlayerId = Principal;
export type PlayerName = string;
export interface PlayerPreferences {
  'gamePlayerData' : string,
  'language' : bigint,
  'playerChar' : string,
  'playerCharID' : bigint,
}
export interface PlayerPreferences2 {
  'gameUserData' : string,
  'language' : bigint,
  'playerChar' : string,
}
export type ScoreCC = bigint;
export type ScoreCC__1 = bigint;
export type TokenIdentifier = string;
export type UserId = Principal;
export type UserName = string;
export type UserName__1 = string;
export type UserWallet = string;
export type UserWallet__1 = string;
export interface Users {
  'id' : UserId,
  'gamesPlayed' : GamesPlayed,
  'user' : UserName__1,
  'level' : Level,
  'preferences' : PlayerPreferences2,
  'score' : ScoreCC__1,
  'wallet' : UserWallet__1,
  'tokenized' : string,
  'gamesWon' : GamesWon,
  'highscore' : Highscore__1,
}
export interface Wallet {
  'principal' : Principal,
  'accountID' : string,
  'walletName' : string,
}
export interface _SERVICE extends Cosmicrafts {}

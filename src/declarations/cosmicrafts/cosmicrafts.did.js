export const idlFactory = ({ IDL }) => {
  const UserName = IDL.Text;
  const UserWallet = IDL.Text;
  const GameStatus = IDL.Record({
    'status' : IDL.Text,
    'masterAvatar' : IDL.Nat,
    'clientXp' : IDL.Nat,
    'masterXp' : IDL.Nat,
    'clientIcon' : IDL.Text,
    'gameId' : IDL.Nat,
    'gameStartTime' : IDL.Text,
    'player2Name' : IDL.Text,
    'clientAvatar' : IDL.Nat,
    'player1' : IDL.Text,
    'player2' : IDL.Text,
    'masterIcon' : IDL.Text,
    'gameWinner' : IDL.Nat,
    'gameStep' : IDL.Nat,
    'clientLvl' : IDL.Nat,
    'masterLastAlive' : IDL.Nat64,
    'clientLastAlive' : IDL.Nat64,
    'player1Name' : IDL.Text,
    'gameLastUpdate' : IDL.Text,
    'userStatus' : IDL.Text,
    'masterLvl' : IDL.Nat,
  });
  const UserId = IDL.Principal;
  const GamesPlayed = IDL.Nat;
  const UserName__1 = IDL.Text;
  const Level = IDL.Nat;
  const PlayerPreferences2 = IDL.Record({
    'gameUserData' : IDL.Text,
    'language' : IDL.Nat,
    'playerChar' : IDL.Text,
  });
  const ScoreCC__1 = IDL.Nat;
  const UserWallet__1 = IDL.Text;
  const GamesWon = IDL.Nat;
  const Highscore__1 = IDL.Nat;
  const Users = IDL.Record({
    'id' : UserId,
    'gamesPlayed' : GamesPlayed,
    'user' : UserName__1,
    'level' : Level,
    'preferences' : PlayerPreferences2,
    'score' : ScoreCC__1,
    'wallet' : UserWallet__1,
    'tokenized' : IDL.Text,
    'gamesWon' : GamesWon,
    'highscore' : Highscore__1,
  });
  const PlayerId = IDL.Principal;
  const Wallet = IDL.Record({
    'principal' : IDL.Principal,
    'accountID' : IDL.Text,
    'walletName' : IDL.Text,
  });
  const LinkedWallets = IDL.Vec(Wallet);
  const Level__1 = IDL.Nat;
  const PlayerName = IDL.Text;
  const Player = IDL.Record({
    'id' : PlayerId,
    'aid' : IDL.Text,
    'linkedWallets' : LinkedWallets,
    'level' : Level__1,
    'playerName' : PlayerName,
  });
  const PlayerPreferences = IDL.Record({
    'gamePlayerData' : IDL.Text,
    'language' : IDL.Nat,
    'playerChar' : IDL.Text,
  });
  const Balance = IDL.Nat;
  const TokenIdentifier = IDL.Text;
  const CommonError = IDL.Variant({
    'InvalidToken' : TokenIdentifier,
    'Other' : IDL.Text,
  });
  const BalanceResponse = IDL.Variant({ 'ok' : Balance, 'err' : CommonError });
  const P2Status = IDL.Record({
    'status' : IDL.Text,
    'lastAlive' : IDL.Nat64,
    'gameLastUpdate' : IDL.Text,
  });
  const ScoreCC = IDL.Nat;
  const Highscore = IDL.Nat;
  const Cosmicrafts = IDL.Service({
    'cancelGame' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'checkUsernameAvailable' : IDL.Func([UserName], [IDL.Bool], ['query']),
    'checkWalletExists' : IDL.Func(
        [UserWallet, IDL.Text],
        [IDL.Bool],
        ['query'],
      ),
    'createGame' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
          IDL.Text,
          IDL.Nat64,
          IDL.Text,
          IDL.Text,
        ],
        [GameStatus],
        [],
      ),
    'createPlayer' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Bool], []),
    'findGame' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
          IDL.Text,
          IDL.Nat64,
        ],
        [GameStatus],
        [],
      ),
    'getAllUsers' : IDL.Func([], [IDL.Vec(Users)], ['query']),
    'getClientLastAlive' : IDL.Func([IDL.Nat], [IDL.Nat64], ['query']),
    'getGameInProgressData' : IDL.Func([IDL.Nat], [GameStatus], ['query']),
    'getGameMatchStatus' : IDL.Func([IDL.Nat], [GameStatus], ['query']),
    'getMasterLastAlive' : IDL.Func([IDL.Nat], [IDL.Nat64], ['query']),
    'getPlayer' : IDL.Func([], [IDL.Opt(Player)], []),
    'getPlayerPreferences' : IDL.Func([], [IDL.Opt(PlayerPreferences)], []),
    'getPlayerScore' : IDL.Func([], [BalanceResponse], []),
    'getTokenized' : IDL.Func([IDL.Text, IDL.Text], [IDL.Opt(Users)], []),
    'getUser' : IDL.Func([IDL.Text], [IDL.Opt(Users)], ['query']),
    'getUserCharacter' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'getUserLanguage' : IDL.Func([IDL.Text], [IDL.Nat], ['query']),
    'getUserMatchData' : IDL.Func([IDL.Nat], [P2Status], ['query']),
    'getUserPreferences' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'getUserProgress' : IDL.Func([IDL.Text], [IDL.Opt(Users)], ['query']),
    'principalToString' : IDL.Func([], [IDL.Principal], []),
    'saveMatchLastAlive' : IDL.Func([IDL.Nat, IDL.Nat64], [IDL.Bool], []),
    'savePlayerCharacter' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'savePlayerLanguage' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'savePlayerPreferences' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'savePlayerScore' : IDL.Func([IDL.Nat], [IDL.Bool, IDL.Text], []),
    'saveUser' : IDL.Func(
        [UserName, IDL.Text, UserWallet],
        [IDL.Opt(Users)],
        [],
      ),
    'saveUserCharacter' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'saveUserLanguage' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    'saveUserPreferences' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'saveUserScore' : IDL.Func([IDL.Text, ScoreCC, Highscore], [IDL.Bool], []),
    'setGameInProgressData' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat64, IDL.Text, IDL.Nat],
        [IDL.Bool],
        [],
      ),
    'setGameWinner' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
    'setPlayerAlive' : IDL.Func([IDL.Nat, IDL.Nat64], [IDL.Bool], []),
    'setTokenized' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'setUserInProgressData' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Nat64, IDL.Text],
        [P2Status],
        [],
      ),
  });
  return Cosmicrafts;
};
export const init = ({ IDL }) => { return []; };

import React, { useState, useEffect, useContext } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

/// Game functions
import { AppContext } from "./context";
import { loginII, handleAuthenticated, loginStoic, loginPlug, loginInfinityWallet, getAID, getAIDpopup, getCanister, getPlayerAddress, getPlayerCanister, getScoreTokenCanister } from "./functions/login";

/// CANISTERS
//import * as _principal             from "@vvv-interactive/nftanvil-tools/cjs/principal.js";
import { idlFactory as cosmicCan }     from "./declarations/cosmicrafts/cosmicrafts.did.js";
import { idlFactory as playerCan }     from "./declarations/players_canister/players_canister.did.js";
import { idlFactory as scoreTokenCan } from "./declarations/score_token/score_token.did.js";
/// STATS
import { Usergeek } from "usergeek-ic-js"
/// CHAT
import { ChatAppContext } from "./chatSDK/chatAppContext";
import { Principal } from "@dfinity/principal";
/// HELPERS
import { ShowError } from "./functions/helpers";

const unityContext = new UnityContext({
  loaderUrl: "GameBuild/Build/GameBuild.loader.js",
  dataUrl: "GameBuild/Build/GameBuild.data",
  frameworkUrl: "GameBuild/Build/GameBuild.framework.js",
  codeUrl: "GameBuild/Build/GameBuild.wasm",
});

const canisterId       = "onhpa-giaaa-aaaak-qaafa-cai";
const playerCanisterId = "7saxw-4aaaa-aaaak-qadmq-cai";
const scoreCanisterId  = "e3q2w-lqaaa-aaaai-aazva-cai";
const host = 'https://raw.ic0.app/';

let gameManagerActive = false;
let playerIndex = 0;
let winnerPlayer = 0;

function App() {
  //const [user, setUser] = useState(null); /// For game
  /// User data
  let { aID, setAID, 
        cosmicrafts, setCosmicrafts,
        identity, setIdentity
      } = useContext(AppContext);
  const [playerAddress, setPlayerAddress] = useState(null);
  const [player, setPlayer] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [playerConfigData, setPlayerConfigData] = useState(null);
  const [playerCharSelected, setPlayerCharSelected] = useState(null);
  const [walletService, setWalletService] = useState("");
  const [unityPlayerData, setUnityPlayerData] = useState(null);
  const [aII, setAII] = useState(null);
  const [plugID, setPlugID] = useState(null);
  const [iwID, setIWID] = useState(null);
  const [pop, setPop] = useState(null); /// Pop-up from InfinityWallet and Plug Wallet

  /// In game data
  const [playerCanister,      setPlayerCanister]      = useState(null);
  const [scoreCanister,       setScoreCanister]       = useState(null);
  const [multiplayerCanister, setMultiplayerCanister] = useState(null);
  const [isLoading,           setIsLoading]           = useState(true);
  const [prog,                setProg]                = useState(0);
  const [game,                setGame]                = useState({});
  const [gameId,              setGameId]              = useState(0); /// For IC
  const [playerPrincipal,     setPlayerPrincipal]     = useState(null);
  const [dashboardSet,        setDashboardSet]        = useState(false);
  

  /// CHAT
  let { setUnityApp, setCoreCanisterExternal } = useContext(ChatAppContext);

  useEffect(() => {
    setUnityApp(unityContext);
  }, []);

  /// Useful info
  /** Unity
   * LoginCanvas, onNameData
   * 0 = Ask for player's name
   * 1 = Send to main menu
   * 2 = Send to claim NFTs screen
   * 3 = User not registered or approved
   */
  
  useEffect(() => { if(cosmicrafts !== null && player === null && playerCanister !== null && scoreCanister !== null) {getOrSetPlayer();} }, [cosmicrafts, playerCanister, scoreCanister]);

  //useEffect(() => { if(betaNFTsCanister !== null) { } }, [betaNFTsCanister]);
  
  useEffect(() => { if(identity !== null && identity !== undefined) { generateMap(false); } }, [identity]);

  useEffect(() => { if(aII !== null) { iiLogin(); } }, [aII]);

  useEffect(() => {}, [playerPrincipal, aID]);

  useEffect(() => { if(plugID !== null) { generatePlugCan(); } }, [plugID]);

  useEffect(() => { if(iwID !== null) { generateIWCan(); } }, [iwID]);

  useEffect(() => {}, [playerName, walletService]);

  useEffect(() => { if(player !== null) { initializeGame(); } }, [player]);

  useEffect(() => { if(unityPlayerData !== null) { sendDataToUnity(); } }, [unityPlayerData]);

  useEffect(() => { if(pop !== null) { generateAID(); } }, [pop]);


  /// Level
  const xp_table = [
                    0,
                    2500,
                    3750,
                    5625,
                    8438,
                    12656,
                    18984,
                    28477,
                    42715,
                    64072,
                    96108,
                    144163,
                    216244,
                    324366,
                    486549,
                    729823,
                    1094735,
                    1642102,
                    2463153,
                    3694730,
                    5542095,
                    8313142,
                    12469713,
                    18704569,
                    28056854,
                    42085280,
                    63127921,
                    94691881,
                    142037822,
                    213056732,
                    319585099,
                    479377648,
                    719066472,
                    1078599708,
                    1617899562,
                    2426849343,
                    3640274015,
                    5460411023,
                    8190616534,
                    12285924801,
                    18428887202,
                    27643330802,
                    41464996204,
                    62197494305,
                    93296241458,
                    139944362187,
                    209916543280,
                    314874814921,
                    472312222381,
                    708468333571,
                    1062702500357,
                    1594053750535,
                    2391080625803,
                    3586620938704,
                    5379931408056,
                    8069897112084,
                    12104845668126,
                    18157268502189,
                    27235902753284,
                    40853854129926,
                    61280781194888,
                    91921171792333,
                    137881757688499,
                    206822636532748,
                    310233954799122
  ];

  const getLevel = (xp) => {
    for(let i = 0; i < xp_table.length; i++){
      if(xp < xp_table[i]){
        return i;
      }
    }
    return 1;
  };

  useEffect(() => {
    initUsergeek();
  }, []);

  let lastCheck = 0;
  let enemyLastAlive = 0;
  let timeoutWait = 30;
  let inGame = false;

  const initUsergeek = () => {
    try{
      Usergeek.init({
        apiKey: "0175019CC7D93DC047C139592BCFB7F0",
        host: "https://fbbjb-oyaaa-aaaah-qaojq-cai.raw.ic0.app/"
      });
    } catch (err){
      ShowError("Error on Usergeek init", err);
    }
  };


  ////////// START //////////

  /* PLAYER ENTERS THE FIRST SCREEN OF THE GAME TO SELECT WALLET*/
  /// Login
  /// Receive player's wallet chosen
  unityContext.on("JSWalletsLogin", (walletSelected) => {
    login(walletSelected);
  });
  /// Proceed depending on wallet service
  const login = async (walletSelected) => {
    let _now = new Date();
    console.log("START LOADING", _now);
    switch(walletSelected){
      case "identityWallet": /// Internet Identity
        setWalletService("II");
        await loginII(setAII);
        setPop(false);
        break;
      case "stoicWallet": /// Stoic Identity
      let _stoicIdentity = await loginStoic();
        setIdentity(_stoicIdentity);
        setWalletService("Stoic");
        setPlayerPrincipal(_stoicIdentity.getPrincipal());
        setPop(false);
        break;
      case "plugWallet": /// Plug wallet
        let _id = await loginPlug();
        setPlayerPrincipal(_id);
        setPlugID(_id);
        setWalletService("Plug");
        setPop(true);
        break;
      case "infinityWallet": /// Infinity Swap
        let _idIW = await loginInfinityWallet();
        setPlayerPrincipal(_idIW);
        setIWID(_idIW);
        setWalletService("InfinityWallet");
        setPop(true);
        break;
      default: /// Other
        ShowError("Error on wallet selected", "WALLET OPTION NOT VALID");
        alert("Error on wallet selected");
        window.location.reload(false);
        break;
    }
  };

  /// Generate Account Identifier
  /// This is set with a useEffect[pop] to check if we have an identity or a principal
  const generateAID = async () => {
    if(pop === false){ // II && Stoic
      setAID(await getAID(identity));
      return true;
    } 
    if(pop === true){ // IW && Plug
      setAID(await getAIDpopup(playerPrincipal));
      return true;
    }
    /// pop === null
    return false;
  };

  /// Internet Identity (II)
  const iiLogin = async () => {
    setIdentity(await handleAuthenticated(aII));
  };

  /// II & Stoic
  const generateMap = async (_pop) => {
    generatePlayerAddress();
    if(_pop === false){
      generateCanister();
    }
  };
  const generatePlayerAddress = () => {
    setPlayerAddress(getPlayerAddress());
  };
  const generateCanister = async () => {
    setCosmicrafts(await getCanister(identity));
    setMultiplayerCanister(await getCanister(null));
    setPlayerCanister(await getPlayerCanister(identity));
    setScoreCanister(await getScoreTokenCanister(identity));
  };

  ///Plug wallet
  const generatePlugCan = async () => {
    (async () => {
      setWalletService("Plug");
      const _cosmicraftsCanister = await window.ic.plug.createActor({
        canisterId: canisterId,
        interfaceFactory: cosmicCan,
      });
      const _playerCanister = await window.ic.plug.createActor({
        canisterId: playerCanisterId,
        interfaceFactory: playerCan,
      });
      const _scoreCanister = await window.ic.plug.createActor({
        canisterId: scoreCanisterId,
        interfaceFactory: scoreTokenCan,
      });
      setCosmicrafts(_cosmicraftsCanister);
      setPlayerCanister(_playerCanister);
      setScoreCanister(_scoreCanister);
      setMultiplayerCanister(await getCanister(null));
    })()
  };

  const generateIWCan = async () => {
    try{
      (async () => {
        setWalletService("InfinitySwap");
        const _cosmicraftsCanister = await window.ic.infinityWallet.createActor({
          canisterId: canisterId,
          interfaceFactory: cosmicCan,
        });
        const _playerCanister = await window.ic.infinityWallet.createActor({
          canisterId: playerCanisterId,
          interfaceFactory: playerCan,
        });
        const _scoreCanister = await window.ic.infinityWallet.createActor({
          canisterId: scoreCanisterId,
          interfaceFactory: scoreTokenCan,
        });
        setCosmicrafts(_cosmicraftsCanister);
        setPlayerCanister(_playerCanister);
        setScoreCanister(_scoreCanister);
        setMultiplayerCanister(await getCanister(null));
      })()
    } catch(e){
      ShowError("IW E", e);
      alert("Your Wallet session has expired. Please login again in their app and then reload this page");
    }
  };

  unityContext.on("JSGoToMenu", () => {
    /// After claiming all NFTs, load player's data and send user to main menu
    sendDataToUnity();
  });

  const getOrSetPlayer = async () => {
    try{
      let _myPrincipal = (playerPrincipal !== null) ? playerPrincipal : await cosmicrafts.principalToString();
      Usergeek.setPrincipal(_myPrincipal);
      Usergeek.trackSession();
      let _player = await playerCanister.getMyPlayer();
      if(_player === null || _player.length === 0){
        unityContext.send("LoginCanvas", "OnNameData", 0);
      } else {
        setPlayer(_player[0]);
      }
    } catch(e){
      alert("Your Wallet session has expired. Please login again in their app and then reload this page");
      ShowError("Get or set player error", e);
    }
  };

  /// New Player
  unityContext.on("JSLoginPanel", (newPlayerName) => {
    setPlayerName(newPlayerName);
  });
  useEffect(() => {
    if(playerName !== ""){
      createPlayer();
    }
  }, [playerName]);
  const createPlayer = async () => {
    if(playerName !== ""){
      let _newPlayer = await cosmicrafts.createPlayer(aID, playerName, walletService);
      if(_newPlayer){
        let _player = await playerCanister.getMyPlayer();
        setPlayer(_player[0]);
      } else {
        ShowError("No player created", "ERROR WHILE CREATING PLAYER ON CANISTER");
        alert("Error creating player, please try agan");
      }
    } else {
      alert("Invalid name");
    }
  };

  /// Set Player for Unity
  const initializeGame = async () => {
    if(player !== null){
      localStorage.removeItem("cosmic_user");
      let _unityPlayerData = {
        "WalletId": player.id.toString(),
        "NikeName": player.playerName
      };
      setUnityPlayerData(_unityPlayerData);
    }
  };

  /// Initial data to Unity
  const sendDataToUnity = async () => {
    unityContext.send("LoginCanvas", "OnNameData", 1);
  };

  unityContext.on("DashboardStarts", () => {
    if(dashboardSet === false){
      waitForDashboardToLoad();
    }
  });

  const waitForDashboardToLoad = async () => {
    Usergeek.trackEvent("Load Player's data");
    let _pref = await playerCanister.getMyPreferences();
    let _principal = (pop === true) ? Principal.fromText(playerPrincipal) : playerPrincipal;
    let score = await scoreCanister.balance({ user : {principal : _principal}, token : "" });
    score = (score.ok !== undefined) ? parseInt(score.ok) : 0;
    //// TO DO: GET REAL LEVEL, XP AND BattlePoints
    let _prog = JSON.stringify({"Xp": score, "Level": getLevel(score), "BattlePoints": score});
    let _lang = (_pref.length > 0 && _pref[0].gamePlayerData !== "") ? _pref[0].gamePlayerData : JSON.stringify({"language": 0});
    let _char = (_pref.length > 0 && parseInt(_pref[0].playerCharID) !== 0 ) ? parseInt(_pref[0].playerCharID) : 1;
    unityContext.send("Dashboard", "GL_SetPlayerData", JSON.stringify(unityPlayerData));
    //unityContext.send("Dashboard", "GL_SetCharacterSelected", _char);
    unityContext.send("Dashboard", "GL_SetCharacterSelected", 1);
    unityContext.send("Dashboard", "GL_SetConfigData", _lang);
    unityContext.send("Dashboard", "GL_SetProgressData", _prog);
    console.log("Dashboard", "GL_SetPlayerData", JSON.stringify(unityPlayerData));
    console.log("Dashboard", "GL_SetCharacterSelected", 1);
    console.log("Dashboard", "GL_SetConfigData", _lang);
    console.log("Dashboard", "GL_SetProgressData", _prog);
    setPlayerConfigData(_lang);
    setPlayerCharSelected(_char);
    //setIsLoading(false);
    setDashboardSet(true);
    setCoreCanisterExternal(identity);
  };


  //////////////////////// Communication with Unity ////////////////////////////////////
    ///// Unity default functions
    unityContext.on("loaded", () => {
      // When game has loaded all files
      setIsLoading(false);
    });
    unityContext.on("progress", (progression) => {
      /// Game's loading progression
      setProg(progression);
    });

    
    /// Game functions

    /// Save Player Data
      /// Get User's preferences to save
      unityContext.on("SavePlayerConfig", (json) => {
        saveUserPreferences(json);
      });
      /// Save User's preferences on IC
      const saveUserPreferences = async (json) => {
          let _c = await cosmicrafts.savePlayerPreferences(json);
      };

      /// Get User's character to save
      unityContext.on("SavePlayerCharacter", (json) => {
          saveUserCharacter(json);
      });
      /// Save User's character on IC
      const saveUserCharacter = async (idNFT) => {
        let _c = await cosmicrafts.savePlayerCharacter(idNFT);
      };
    //// Save Player Data ////

    unityContext.on("error", function (message) { ShowError("ERROR FROM UNITY:", message); });

    useEffect (() => {
        if(game != {}){
            sendMatchDataGame();
        }
    }, [game])

    useEffect (() => { }, [gameId]);



    const sendMatchDataGame = () => {
      /////////// Esto cambiará por NFTs
        let _dataStr = JSON.stringify(game);
        unityContext.send("MatchMulti", "GLGetICPData", _dataStr);
    }

    unityContext.on("GameStarts", () => {
      setGameManagerActive(true);
    });

    const setGameManagerActive = (val) => {
      gameManagerActive = val;
    };

    //////////////////////////////////////
    /////////////// Master ///////////////
    //////////////////////////////////////
      /// Check if p2 has new data
      const getUserMatchData = async (gameId) => {
        if(parseInt(gameId) !== NaN && parseInt(gameId) > 0 && winnerPlayer === 0){
          const _time = new Date();
          let _ud = await multiplayerCanister.getUserMatchData(parseInt(gameId));
          if(_ud.status != ""){
              enemyLastAlive = parseInt(_ud.lastAlive);
              lastCheck = _time.getTime();
              if((enemyLastAlive + timeoutWait * 1000) < lastCheck){
                  setGameWinner(1);
              }
              syncMaster(_ud.status); /// status has the full p2's game data
          }
          let _md = await multiplayerCanister.getGameInProgressData(parseInt(gameId));
          if((parseInt(_md.gameStep) == 1 || parseInt(_md.gameStep) == 2) && parseInt(_md.gameWinner) === 0){
              setTimeout(function(){
                getUserMatchData(parseInt(gameId));
              }, 200);
          }
        }
      };
      ///Send p2 data to Master
      const syncMaster = async (data) => {
        if(inGame === true && gameManagerActive === true){
          unityContext.send("GameManager", "GL_SyncMaster", data);
        }
      };
      unityContext.on("SendMasterData", (data) => {
        let _d = JSON.parse(data);
        if(_d.GameStep >= 2){
          if(_d.GameWinner !== undefined && _d.GameWinner !== null && _d.GameWinner > 0){
            if(winnerPlayer === 0){
              endGameForMaster(_d.GameWinner);
              winnerPlayer = _d.GameWinner;
              sendMasterData(data, _d.GameId, _d.MasterScore);
            }
          } else {
            if(winnerPlayer === 0){
              sendMasterData(data, _d.GameId, _d.MasterScore);
            }
          }
        }
      });
      /// Game progress
      const sendMasterData = async (data, gameId, playerScore) => {
          const _time = new Date();
          let _dt = JSON.parse(data);
          let _cd = await multiplayerCanister.setGameInProgressData(data, parseInt(gameId), _time.getTime(), _time.toISOString(), _dt.GameStep, playerScore);
      };
      /// Game Ends
      const endGameForMaster = async (_gw) => {
        await setGameWinner(_gw);
        await syncWinnerMaster(_gw);
      };
      //// Send winner to Master
      const syncWinnerMaster = async (_pw) => {
        if(gameManagerActive === true){
          unityContext.send("GameManager", "GL_SyncWinner", _pw);
        }
      }
    //////////////////////////////////////
    //////////// End Master //////////////
    //////////////////////////////////////

    //////////////////////////////////////
    /////////////// Client ///////////////
    //////////////////////////////////////
      /// Check if Master has new data
      const getMasterMatchData = async (gameId) => {
        const _time = new Date();
        let _md = await multiplayerCanister.getGameInProgressData(parseInt(gameId));
        let winnerSavedIC = 0;
        if(_md.status != ""){
          if( _md.gameWinner !== undefined && parseInt(_md.gameWinner) !== 0 && parseInt(_md.gameWinner) !== NaN){
            endGameForClient(parseInt(_md.gameWinner));
          }
          enemyLastAlive = parseInt(_md.masterLastAlive);
          syncUser(_md.status);
          lastCheck = _time.getTime();
          if((enemyLastAlive + timeoutWait * 1000) < lastCheck){
            //saveMasterDisconected(parseInt(gameId));
          }
          let _status = JSON.parse(_md.status);
          winnerSavedIC = _status.GameWinner;
        }
        if(winnerPlayer === 0 || winnerSavedIC === 0){
          if((parseInt(_md.gameStep) >= 1 || gameManagerActive === true)){
            setTimeout(function(){
              getMasterMatchData(parseInt(gameId));
            }, 400);
          }
        }
      };
      ///Send Master's data to p2
      const syncUser = async (data) => {
        if(inGame == true && gameManagerActive === true){
          unityContext.send("GameManager", "GL_SyncClient", data);
        }
      };
      /// Game Ends
      const endGameForClient = async (_gw) => {
        if(_gw !== undefined && _gw !== null && winnerPlayer === 0){
          winnerPlayer = _gw;
          await setGameWinner(_gw);
        }
      };
      unityContext.on("SendClientData", (data) => {
        let _d = JSON.parse(data);
        if(gameManagerActive === true){
          sendClientData(data, parseInt(_d.GameId), _d.ClientScore);
        }
      });
      const sendClientData = async (data, gameId, _clientScore) => {
          const _time = new Date();
          let _cd = await multiplayerCanister.setUserInProgressData(data, gameId, _time.getTime(), _time.toISOString(), _clientScore);
      };
      const userIsAlive = async (gameId) => {
        let _time = new Date();
        const _ua = await multiplayerCanister.setPlayerAlive(gameId, _time.getTime());
        if(gameManagerActive === true){
          setTimeout(function(){
              userIsAlive(gameId);
          }, 5000);
        }
      };

      //// Disconections
      const saveMasterDisconected = async (gameId) => {
          let _gameData = await multiplayerCanister.getGameInProgressData(parseInt(gameId));
          let _statusTxt = JSON.parse(_gameData.status);
          _statusTxt.GameWinner = 2;
          _gameData.status = JSON.stringify(_statusTxt);
          let _cd = await multiplayerCanister.setGameInProgressData(_gameData.status, parseInt(gameId), _gameData.masterLastAlive, _gameData.gameLastUpdate, _gameData.GameStep);
          syncUser(_gameData.status);
      };

      const setGameWinner = async (_pw) => {
        let _gameData = await multiplayerCanister.setGameWinner(_pw, parseInt(gameId), playerIndex);
      };

      /// Receive score from game end
      unityContext.on("SaveScore", (score) => {
        saveScore(score);
        inGame = false;
        gameManagerActive = false;
      });

      /// Save the score
      const saveScore = async (score) => {
        Usergeek.trackEvent("Game finished");
        //let _isWinner = await cosmicrafts.isPlayerWinner(parseInt(gameId));
        //sendXPEarnedToUnity(score, won);
        let saved = await cosmicrafts.savePlayerScore(score);
        playerIndex = 0;
        updateCXP();
      };

      const getUserIcpBalance = async () => {
        let _icpBalance = await cosmicrafts.getICPBalance();
      };

      //// Go to Main Menu after game
      unityContext.on("ExitGame", (json) => {
        //setGameWinner(winnerPlayer);
        inGame = false;
        gameManagerActive = false;
        setGame({});
        setGameId(0);
        playerIndex = 0;
        winnerPlayer = 0;
        updateCXP();
      });

      const updateCXP = async () => {
        const getScore = new Promise((resolve, reject) => {
          resolve(cosmicrafts.getPlayerScore());
        });
        getScore.then((_score) => {
          let score = (_score.ok !== undefined) ? parseInt(_score.ok) : 0;
          let _prog = JSON.stringify({"Xp": score, "Level": getLevel(score), "BattlePoints": score});
          unityContext.send("Dashboard", "GL_SetProgressData", _prog);
          unityContext.send("Dashboard", "GL_SetPlayerData", JSON.stringify(unityPlayerData));
          unityContext.send("Dashboard", "GL_SetCharacterSelected", playerCharSelected);
          unityContext.send("Dashboard", "GL_SetConfigData", playerConfigData);
        });
      };

  return (
    <>
    {
      isLoading !== false ?
      <>
        <video autoPlay muted loop id="loadingVideo">
          <source src="Loader.webm" type="video/webm" />
        </video>
      </>
      :
      <>
      </>
    }
      <Unity 
        unityContext={unityContext} 
        style={{
          height: "100%",
          width: "100%",
        }} 
      />
    </>
  );
}

export default App;

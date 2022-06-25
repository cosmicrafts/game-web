import React, { useState, useEffect, useContext } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

/// Game functions
import { AppContext } from "./context";
import { getMine, getNFTsData, structureNFTsForUnity } from "./functions/nfts";
import { loginII, loginStoic, loginPlug, getMap, getAID, getCanister, getPlayerAddress } from "./functions/login";

/// CANISTERS
import { nftCanister }             from "@vvv-interactive/nftanvil-canisters/cjs/nft.js";
import * as _principal             from "@vvv-interactive/nftanvil-tools/cjs/principal.js";
/// TOOLS
import { decodeLink }     from "@vvv-interactive/nftanvil-tools/cjs/data.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { encodeTokenId, decodeTokenId, tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";

const unityContext = new UnityContext({
  loaderUrl: "Build/CosmicraftsGame.loader.js",
  dataUrl: "Build/CosmicraftsGame.data",
  frameworkUrl: "Build/CosmicraftsGame.framework.js",
  codeUrl: "Build/CosmicraftsGame.wasm",
});

function App() {
  //const [user, setUser] = useState(null); /// For game
  /// User data
  let { map, setMap, 
        aID, setAID, 
        cosmicrafts, setCosmicrafts,
        myNFTsIDs, setMyNFTsIDs, 
        allMyNFTs, setAllMyNFTs,
        identity, setIdentity
      } = useContext(AppContext);
  const [playerAddress, setPlayerAddress] = useState(null);
  const [icp, setIcp] = useState(0);
  const [player, setPlayer] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [walletService, setWalletService] = useState("");
  const [unityPlayerData, setUnityPlayerData] = useState(null);

  useEffect(() => {}, [player, playerName, walletService]);
  useEffect(() => { console.log("Unity Player Data", unityPlayerData); if(unityPlayerData !== null) { sendDataToUnity(); } }, [unityPlayerData]);
  
  /// In game data
  const [isLoading, setIsLoading] = useState(true);
  const [prog, setProg] = useState(0);
  const [game, setGame] = useState({});
  const [gameId, setGameId] = useState(0); /// For IC
  const [playerWinner, setPlayerWinner] = useState(0);
  
  /// NFTs
  const [prices, setPrices] = useState(false);
  const [filterQuality, setFilterQuality] = useState(-1);
  const [sortBy, setSortBy] = useState("priceasc");
  const [walletToSend, setWalletToSend] = useState("");
  const [giftlink, setGiftlink] = useState("");
  
  useEffect(() => { if(cosmicrafts !== null && player === null) {getOrSetPlayer();} }, [cosmicrafts]);
  
  useEffect(() => { if(identity !== null && identity !== undefined) { console.log("IDENTITY", identity); generateMap(); } }, [identity]);

  let lastCheck = 0;
  let enemyLastAlive = 0;
  let timeoutWait = 30;
  let inGame = false;

  /// Login
  unityContext.on("JSWalletsLogin", (walletSelected) => {
    login(walletSelected);
  });
  const login = async (walletSelected) => {
    switch(walletSelected){
      case "identityWallet":
        setIdentity(await loginII());
        setWalletService("II");
        break;
      case "stoicWallet":
        setIdentity(await loginStoic());
        setWalletService("Stoic");
        break;
      case "PlugWallet":
        setAID(await loginPlug());
        setWalletService("Plug");
        break;
      default:
        setAID(await loginII());
        setWalletService("E_II");
        break;
    }
  };

  const generateAID = async () => {
    setAID(await getAID(identity));
  };
  const generateMap = async () => {
    setMap(await getMap());
    generateAID();
    generateCanister();
    generatePlayerAddress();
  };
  const generateCanister = async () => {
    setCosmicrafts(await getCanister(identity));
  };
  const generatePlayerAddress = async () => {
    setPlayerAddress(await getPlayerAddress());
  };
  
  /// NFTs
  useEffect(() => {
    if(myNFTsIDs !== []){
      setAllMyNFTs(getNFTsData(true, myNFTsIDs, filterQuality, prices, sortBy));
    }
  }, [myNFTsIDs]);

  const nft_transfer = async _ref4 => {
    let {
      id,
      toAddress
    } = _ref4;

    //let tid = (0, tokenFromText)(id);
    console.log("ID", id);
    let _encodeId = tokenToText(id);
    console.log("ENCODE", _encodeId);
    //let tid = tokenFromText(_encodeId);
    let tid = id;
    let {
      slot
    } = (0, decodeTokenId)(tid);
    let canister = (0, _principal.PrincipalFromSlot)(map.space, slot).toText();
    let _identity = identity;
    console.log("IDENTITY TRANSFER", _identity);
    let nftcan = nftCanister(canister, {
      agentOptions: {
        host: 'https://mainnet.dfinity.network',
        _identity 
      }
    });
    console.log("nftcan", nftcan);
    let address = aID;
    console.log("SUB ACC", playerAddress);
    let subaccount = [AccountIdentifier.TextToArray(playerAddress) || null].filter(Boolean);
    //let subaccount = getSubAccountArray(0);
    //let subaccount = false;
    /*let t = await nftcan.transfer({
      from: {
        address: AccountIdentifier.TextToArray(address)
      },
      to: {
        address: AccountIdentifier.TextToArray(toAddress)
      },
      token: tid,
      amount: 1,
      memo: [],
      subaccount
    });*/
    console.log("PRIN", aID, _identity.getPrincipal());
    /*console.log({
      subaccount: subaccount,
      spender: _identity.getPrincipal(),
      allowance: 1n,
      token: id
    });*/
    let a = await nftcan.approve({
      subaccount: [],
      spender: identity.getPrincipal(),
      allowance: 1n,
      token: id
    });
    console.log("ALLOW", a);
    let _all = await nftcan.allowance({
      owner: {
        address: AccountIdentifier.TextToArray(address)
      },
      spender: identity.getPrincipal(),
      token: tid,
    });
    console.log("ALLOWANCE", _all);
    /*let t = await nftcan.transfer({
      to: {
        address: AccountIdentifier.TextToArray(toAddress)
      },
      token: tid,
      from: {
        address: AccountIdentifier.TextToArray(address)
      },
      memo: [],
      subaccount
    });
    if (!t.ok) throw new Error(JSON.stringify(t.err));
    let {
      transactionId
    } = t.ok;
    //dispatch(nft_fetch(id));
    return t;*/
  };

  const claimGift = async () => {
    if(giftlink !== ""){
      console.log("CODE", giftlink);
      let _r = await nft_claim_link(giftlink);
      console.log("Claimed", _r);
    } else {
      alert("Invalid code");
    }
  }

  const nft_claim_link = async (code) => {
    let {
      slot,
      tokenIndex,
      key
    } = (0, decodeLink)(code);
    let canister = (0, _principal.PrincipalFromSlot)(map.space, slot);

    /*let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });*/
    let _identity = identity;
    let nftcan = nftCanister(canister, {
      agentOptions: {
        host: 'https://mainnet.dfinity.network',
        _identity 
      }
    });
    let address = aID; /// Verificar
    let tid = (0, encodeTokenId)(slot, tokenIndex);
    let resp = await nftcan.claim_link({
      to: {
        address: AccountIdentifier.TextToArray(address)
      },
      key: Array.from(key),
      token: tid
    });
    ///dispatch(nft_fetch((0, _token.tokenToText)(tid)));
    return resp;
  };

  useEffect(() => {
    if(allMyNFTs.length > 0){
      //
    }
  }, [allMyNFTs]);

  const sendNFT = async (nft) => {
    console.log("NFT TO SEND", nft);
    /**/
    let id = nft[0];
    let toAddress = walletToSend;
    nft_transfer({ id, toAddress })
  };
  


  const getOrSetPlayer = async () => {
    let _player = await cosmicrafts.getPlayer();
    if(_player === null || _player.length === 0){
      unityContext.send("LoginCanvas", "OnNameData", 0);
      /// Assign new NFTs to account
      return false;
    }
    unityContext.send("LoginCanvas", "OnNameData", 1);
    setMyNFTsIDs(await getMine(map, aID, setMyNFTsIDs));
    setPlayer(_player[0]);
    initializeGame(_player[0]);
  };

  /// New Player
  unityContext.on("JSLoginPanel", (newPlayerName) => {
    console.log("New name", newPlayerName);
    setPlayerName(newPlayerName);
  });
  useEffect(() => {
    if(playerName !== ""){
      createPlayer();
    }
  }, [playerName]);
  const createPlayer = async () => {
    if(playerName !== ""){
      console.log(aID, playerName, walletService);
      let _player = await cosmicrafts.createPlayer(aID, playerName, walletService);
      unityContext.send("LoginCanvas", "OnNameData", 1);
      setPlayer(_player[0]);
      initializeGame(_player[0]);
    } else {
      alert("The player's name is not valid");
    }
  };


  /// Initial data to Unity
  const sendDataToUnity = async () => {
    let _nfts = await structureNFTsForUnity(allMyNFTs, map);
    setAllMyNFTs(_nfts);
    console.log("ALL NFTS");
    console.log(_nfts);
    if(_nfts.charactersData.length > 0) {unityContext.send("Dashboard", "GL_SetCollectionCharactersData", JSON.stringify(_nfts.charactersData));}
    if(_nfts.shipsData.length > 0)      {unityContext.send("Dashboard", "GL_SetCollectionUnitsData", JSON.stringify(_nfts.shipsData));}
    if(_nfts.spellsData.length > 0)     {unityContext.send("Dashboard", "GL_SetCollectionSkillsData", JSON.stringify(_nfts.spellsData));}
    let _pref = await cosmicrafts.getPlayerPreferences();
    let score = await cosmicrafts.getPlayerScore();
    _pref = (_pref !== null && _pref.length > 0 && _pref[0].playerChar !== "") ? _pref[0] : { playerChar: JSON.stringify({"Name": _nfts.charactersData[0].Name, "IconURL": _nfts.charactersData[0].Icon}), gamePlayerData : JSON.stringify({"language": 0}) };
    score = (score.ok !== undefined) ? parseInt(score.ok) : 0;
    let _prog = JSON.stringify({"Xp": 0, "Level": 0, "BattlePoints": score});
    console.log("GL_SetPlayerData", unityPlayerData);
    console.log("GL_SetCharacterSelected", _nfts.charactersData[0].LocalID);
    console.log("GL_SetConfigData", _pref.gamePlayerData);
    console.log("GL_SetProgressData", _prog);
    unityContext.send("Dashboard", "GL_SetPlayerData", JSON.stringify(unityPlayerData));
    unityContext.send("Dashboard", "GL_SetCharacterSelected", _nfts.charactersData[0].LocalID);
    unityContext.send("Dashboard", "GL_SetConfigData", _pref.gamePlayerData);
    unityContext.send("Dashboard", "GL_SetProgressData", _prog);
    console.log("ALL SENT");
    setIsLoading(false);
  };



  /// Communication with Unity
  const saveScore = async (score) => {
    let saved = await cosmicrafts.savePlayerScore(score);
    console.log("SCORE", saved);
  };
    

  const initializeGame = async (_player) => {
    if(_player !== null){
      localStorage.removeItem("cosmic_user");
      let _unityPlayerData = {
        "WalletId": _player.aid,
        "NikeName": _player.playerName
      };
      setUnityPlayerData(_unityPlayerData);
    }
  };

    unityContext.on("loaded", () => {
      //
    });

    unityContext.on("SaveScore", (score) => {
        saveScore(score);
        inGame = false;
    });

    unityContext.on("progress", (progression) => {
        setProg(progression);
    });

    //// MP
      unityContext.on("SearchGame", (json) => {
          let data = JSON.parse(json);
          searchGame(data, json);
      });

      unityContext.on("CancelGame", (gameId) => {
          cancelGame(gameId);
      });
    //// MP ////

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
      const saveUserCharacter = async (json) => {
          let _c = await cosmicrafts.savePlayerCharacter(json);
      };

      const cancelGame = async (gameId) => {
          let _ok = await cosmicrafts.cancelGame(parseInt(gameId));
          console.log("Game canceled", _ok);
      };
    //// Save Player Data ////

    unityContext.on("error", function (message) { console.log("ERROR FROM UNITY:", message); });

    useEffect (() => {
        if(game != {}){
            sendMatchDataGame();
        }
    }, [game])

    useEffect (() => {
        if(playerWinner > 0){
            setGameWinner();
        }
    }, [playerWinner]);

    useEffect (() => {
        console.log(gameId);
    }, [gameId]);

    const createGame = async (data, gameStatus) => {
        const _time = new Date();
        let _game = await cosmicrafts.createGame(data.WalletId, data.NikeName, data.CharacterKey, data.Xp, data.Level, data.Avatar, gameStatus, _time.getTime(), _time.toISOString().split('T')[0], _time.toISOString().split('T')[0]);
        let _g = {
            "GameId": parseInt(_game.gameId),
            "GameStep": parseInt(_game.gameStep),
            "MasterPlayerName": _game.player1Name,
            "MasterWalletId": _game.player1,
            "ClientPlayerName": _game.player2Name,
            "ClientWalletId": _game.player2,
            "MasterLvl": parseInt(_game.masterLvl),
            "ClientLvl": parseInt(_game.clientLvl),
            "MasterXp": parseInt(_game.masterXp),
            "ClientXp": parseInt(_game.clientXp),
            "MasterAvatar": parseInt(_game.masterAvatar),
            "ClientAvatar": parseInt(_game.clientAvatar),
            "MasterCharacter": _game.masterIcon,
            "ClientCharacter": _game.clientIcon,
            "masterLastAlive": parseInt(_time.getTime()),
            "clientLastAlive": parseInt(_game.clientLastAlive),
            "GameStart": _game.GameStartTime,
            "LastUpdate": _game.gameLastUpdate,
            "GameWinner": parseInt(_game.gameWinner)
        };
        if(_g.GameId != 0){
            setGameId(_g.GameId);
            setGame(_g);
            inGame = true;
            setTimeout(function(){
                getMatchStatus(_g);
            }, 200);
        } else {
            console.log("Game already created");
        }
    };

    const searchGame = async (data, gameStatus) => {
        const _time = new Date();
        let _game = await cosmicrafts.findGame(data.WalletId, data.NikeName, data.CharacterKey, data.Xp, data.Level, data.Avatar, String(_time.getTime()), _time.getTime());
        let _g = {
            "GameId": parseInt(_game.gameId),
            "GameStep": parseInt(_game.gameStep),
            "MasterPlayerName": _game.player1Name,
            "MasterWalletId": _game.player1,
            "ClientPlayerName": _game.player2Name,
            "ClientWalletId": _game.player2,
            "MasterLvl": parseInt(_game.masterLvl),
            "ClientLvl": parseInt(_game.clientLvl),
            "MasterXp": parseInt(_game.masterXp),
            "ClientXp": parseInt(_game.clientXp),
            "MasterAvatar": parseInt(_game.masterAvatar),
            "ClientAvatar": parseInt(_game.clientAvatar),
            "MasterCharacter": _game.masterIcon,
            "ClientCharacter": _game.clientIcon,
            "masterLastAlive": parseInt(_game.masterLastAlive),
            "clientLastAlive": parseInt(_game.clientLastAlive),
            "GameStart": _game.GameStartTime,
            "LastUpdate": _game.gameLastUpdate,
            "GameWinner": parseInt(_game.gameWinner)
        };
        if(_g.GameId != 0){
            setGameId(_g.GameId);
            setGame(_g);
            inGame = true;
            getMasterMatchData(_game.gameId);
            userIsAlive(_game.gameId);
        } else {
            createGame(data, gameStatus);
        }
    };

    const getMatchStatus = async (_gm) => {
        if(_gm.GameId != undefined){
            let _game = await cosmicrafts.getGameMatchStatus(_gm.GameId);
            if(_game != null && _game.gameId != null && parseInt(_game.gameId) != null && parseInt(_game.gameId) !== 0){
                let _g = {
                    "GameId": parseInt(_game.gameId),
                    "GameStep": parseInt(_game.gameStep),
                    "MasterPlayerName": _game.player1Name,
                    "MasterWalletId": _game.player1,
                    "ClientPlayerName": _game.player2Name,
                    "ClientWalletId": _game.player2,
                    "MasterLvl": parseInt(_game.masterLvl),
                    "ClientLvl": parseInt(_game.clientLvl),
                    "MasterXp": parseInt(_game.masterXp),
                    "ClientXp": parseInt(_game.clientXp),
                    "MasterAvatar": parseInt(_game.masterAvatar),
                    "ClientAvatar": parseInt(_game.clientAvatar),
                    "MasterCharacter": _game.masterIcon,
                    "ClientCharacter": _game.clientIcon,
                    "masterLastAlive": parseInt(_game.masterLastAlive),
                    "clientLastAlive": parseInt(_game.clientLastAlive),
                    "GameStart": _game.GameStartTime,
                    "LastUpdate": _game.gameLastUpdate,
                    "GameWinner": parseInt(_game.gameWinner)
                };
                if(_g.GameStep == 0){
                    setTimeout(function(){
                        const _time = new Date();
                        getMatchStatus(_g);
                        cosmicrafts.saveMatchLastAlive(_game.gameId, _time.getTime());
                    }, 200);
                } else {
                    setGame(_g);
                    inGame = true;
                    getUserMatchData(_game.gameId);
                }
            }  else {
                let _g = {
                    "GameId": parseInt(_gm.GameId),
                    "GameStep": parseInt(_gm.GameStep),
                    "MasterPlayerName": _gm.MasterPlayerName,
                    "MasterWalletId": _gm.MasterWalletId,
                    "ClientPlayerName": _gm.ClientPlayerName,
                    "ClientWalletId": _gm.ClientWalletId,
                    "MasterLvl": parseInt(_gm.MasterLvl),
                    "ClientLvl": parseInt(_gm.ClientLvl),
                    "MasterXp": parseInt(_gm.MasterXp),
                    "ClientXp": parseInt(_gm.ClientXp),
                    "MasterAvatar": parseInt(_gm.MasterAvatar),
                    "ClientAvatar": parseInt(_gm.ClientAvatar),
                    "MasterCharacter": _gm.MasterIcon,
                    "ClientCharacter": _gm.ClientIcon,
                    "masterLastAlive": parseInt(_gm.masterLastAlive),
                    "clientLastAlive": parseInt(_gm.clientLastAlive),
                    "GameStart": _gm.GameStartTime,
                    "LastUpdate": _gm.gameLastUpdate,
                    "GameWinner": parseInt(_gm.gameWinner)
                };
                setTimeout(function(){
                    getMatchStatus(_g);
                }, 200);
            }
        } else {
            setTimeout(function(){
                getMatchStatus(_gm);
            }, 200);
        }
    }

    const sendMatchDataGame = () => {
        let _dataStr = JSON.stringify(game);
        unityContext.send("MatchMulti", "GLGetICPData", _dataStr);
    }

    /// If player is Master
        /// Check if p2 has new data
        const getUserMatchData = async (gameId) => {
            const _time = new Date();
            let _pw = 0;
            let _ud = await cosmicrafts.getUserMatchData(parseInt(gameId));
            let _md = await cosmicrafts.getGameInProgressData(parseInt(gameId));
            if(_ud.status != "" && _time.getTime() >= lastCheck){
                enemyLastAlive = parseInt(_ud.lastAlive);
                lastCheck = _time.getTime();
                if((enemyLastAlive + timeoutWait * 1000) < lastCheck){
                    setPlayerWinner(1);
                    _pw = 1;
                }
                syncMaster(_ud.status);
            }
            if(parseInt(_md.gameStep) == 1 || parseInt(_md.gameStep) == 2){
                setTimeout(function(){
                    getUserMatchData(parseInt(gameId));
                }, 100);
            }
        };
        ///Send p2 data to Master
        const syncMaster = async (data) => {
            if(inGame === true){
                unityContext.send("Manager", "GL_SyncMaster", data);
            }
        }
        const sendMasterData = async (data, gameId) => {
            const _time = new Date();
            let _dt = JSON.parse(data);
            let _cd = await cosmicrafts.setGameInProgressData(data, parseInt(gameId), _time.getTime(), _time.toISOString(), _dt.GameStep);
        };
        unityContext.on("SendMasterData", (data) => {
            let _d = JSON.parse(data);
            _d.GameWinner = playerWinner;
            let _dataJson = JSON.stringify(_d);
            if(_d.GameStep >= 2){
                if(playerWinner > 0){
                    syncWinnerMaster();
                }
                sendMasterData(_dataJson, _d.GameId);
            }
        });
        //// Send winner to Master
        const syncWinnerMaster = async () => {
            unityContext.send("Manager", "GL_SyncWinner", playerWinner);
        }

    /// If player is p2
        /// Check if Master has new data
        const getMasterMatchData = async (gameId) => {
            const _time = new Date();
            let _md = await cosmicrafts.getGameInProgressData(parseInt(gameId));
            let _pw = 0;
            if(_md.status != "" && _time.getTime() > lastCheck){
                if(parseInt(_md.gameWinner) != 0){
                    setPlayerWinner(parseInt(_md.gameWinner));
                }
                enemyLastAlive = parseInt(_md.masterLastAlive);
                syncUser(_md.status);
                lastCheck = _time.getTime();
                if((enemyLastAlive + timeoutWait * 1000) < lastCheck){
                    setPlayerWinner(2);
                    _pw = 2;
                    saveMasterDisconected(parseInt(gameId));
                }
            }
            if(parseInt(_md.gameStep) == 1 || parseInt(_md.gameStep) == 2){
                setTimeout(function(){
                    getMasterMatchData(parseInt(gameId));
                }, 100);
            }
        };
        ///Send Master's data to p2
        const syncUser = async (data) => {
            if(inGame == true){
                unityContext.send("Manager", "GL_SyncClient", data);
            }
        }
        const sendClientData = async (data, gameId) => {
            const _time = new Date();
            let _cd = await cosmicrafts.setUserInProgressData(data, gameId, _time.getTime(), _time.toISOString());
        };
        unityContext.on("SendClientData", (data) => {
            let _d = JSON.parse(data);
            if(playerWinner == 0){
                sendClientData(data, parseInt(_d.GameId));
            }
        });
        const userIsAlive = async (gameId) => {
            let _time = new Date();
            const _ua = await cosmicrafts.setPlayerAlive(gameId, _time.getTime());
            if(playerWinner == 0){
                setTimeout(function(){
                    userIsAlive(gameId);
                }, 5000);
            }
        };

        //// Disconections
        const saveMasterDisconected = async (gameId) => {
            let _gameData = await cosmicrafts.getGameInProgressData(parseInt(gameId));
            let _statusTxt = JSON.parse(_gameData.status);
            _statusTxt.GameWinner = 2;
            _gameData.status = JSON.stringify(_statusTxt);
            let _cd = await cosmicrafts.setGameInProgressData(_gameData.status, parseInt(gameId), _gameData.masterLastAlive, _gameData.gameLastUpdate, _gameData.GameStep);
            syncUser(_gameData.status);
        };

        const setGameWinner = async () => {
            let _gameData = await cosmicrafts.setGameWinner(playerWinner, parseInt(gameId));
        };

        //// Go to Main Menu after game
        unityContext.on("ExitGame", (json) => {
            console.log("GAME END");
            inGame = false;
            setGame({});
            setGameId(0);
            setPlayerWinner(0);
        });


  return (
    <>
      <Unity 
        unityContext={unityContext} 
        style={{
          height: "auto",
          width: "100%",
        }} 
      />
      <input value={giftlink} onChange={(val) => { console.log(val.target.value); setGiftlink(val.target.value); }} placeholder="Gift link" />
      <button onClick={() => { claimGift(); }}>CLAIM</button>
    </>
  );
}

export default App;

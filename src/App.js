import React, { useState, useEffect, useContext } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

/// Game functions
import { AppContext } from "./context";
import { getMine, getNFTsData, structureNFTsForUnity, structureBetaNFTClaimed, structureNFTsForMP } from "./functions/nfts";
import { loginII, handleAuthenticated, loginStoic, loginPlug, loginInfinityWallet, getMap, getAID, getAIDpopup, getCanister, getPlayerAddress, getBetaNFTsCanister } from "./functions/login";

/// CANISTERS
import { nftCanister }             from "@vvv-interactive/nftanvil-canisters/cjs/nft.js";
import * as _principal             from "@vvv-interactive/nftanvil-tools/cjs/principal.js";
import { idlFactory as betaCan }   from "./declarations/nfts_beta_test/nfts_beta_test.did.js";
import { idlFactory as cosmicCan } from "./declarations/cosmicrafts/cosmicrafts.did.js";
/// TOOLS
import { decodeLink }     from "@vvv-interactive/nftanvil-tools/cjs/data.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { encodeTokenId, decodeTokenId, tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
/// STATS
import { Usergeek } from "usergeek-ic-js"

const unityContext = new UnityContext({
  loaderUrl: "Build/CosmicraftsGame.loader.js",
  dataUrl: "Build/CosmicraftsGame.data",
  frameworkUrl: "Build/CosmicraftsGame.framework.js",
  codeUrl: "Build/CosmicraftsGame.wasm",
});

/*const unityContext = new UnityContext({
  loaderUrl: "https://storage.cosmicrafts.com/Build/CosmicraftsGame.loader.js",
  dataUrl: "https://storage.cosmicrafts.com/Build/CosmicraftsGame.data",
  frameworkUrl: "https://storage.cosmicrafts.com/Build/CosmicraftsGame.framework.js",
  codeUrl: "https://storage.cosmicrafts.com/Build/CosmicraftsGame.wasm",
});*/


const betaCanisterId = "k7h5q-jyaaa-aaaan-qaaaq-cai";
const canisterId = "onhpa-giaaa-aaaak-qaafa-cai";
// const host = 'https://mainnet.dfinity.network';
const host = 'https://raw.ic0.app/';

let gameManagerActive = false;
let playerIndex = 0;
let winnerPlayer = 0;

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
  const [multiplayerCanister, setMultiplayerCanister] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [prog, setProg] = useState(0);
  const [game, setGame] = useState({});
  const [gameId, setGameId] = useState(0); /// For IC
  const [playerPrincipal, setPlayerPrincipal] = useState(null);
  //const [gameManagerActive, setGameManagerActive] = useState(false);
  const [dashboardSet, setDashboardSet] = useState(false);
  
  /// NFTs
  const [prices, setPrices] = useState(false);
  const [filterQuality, setFilterQuality] = useState(-1);
  const [sortBy, setSortBy] = useState("priceasc");
  const [walletToSend, setWalletToSend] = useState("");
  const [giftlink, setGiftlink] = useState("");
  const [betaNFTsCanister, setBetaNFTsCanister] = useState(null);
  const [betaNFTsCodes, setBetaNFTsCodes] = useState(null);

  /// Useful info
  /** Unity
   * LoginCanvas, onNameData
   * 0 = Ask for player's name
   * 1 = Send to main menu
   * 2 = Send to claim NFTs screen
   * 3 = User not registered or approved
   */
  
  useEffect(() => { if(cosmicrafts !== null && player === null) {getOrSetPlayer();} }, [cosmicrafts]);

  useEffect(() => { if(betaNFTsCanister !== null) { } }, [betaNFTsCanister]);
  
  useEffect(() => { if(identity !== null && identity !== undefined) { generateMap(false); } }, [identity]);

  useEffect(() => { if(aII !== null) { iiLogin(); } }, [aII]);

  useEffect(() => {}, [playerPrincipal]);

  useEffect(() => { if(plugID !== null) { generatePlugCan(); } }, [plugID]);

  useEffect(() => { if(iwID !== null) { generateIWCan(); } }, [iwID]);

  useEffect(() => {}, [playerName, walletService]);

  useEffect(() => { if(player !== null) { initializeGame(); } }, [player]);

  useEffect(() => { if(map !== null && aID !== null) { getMyNFTs(); } }, [map, aID]);

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

  
  /// NFTs
  useEffect(() => {
    console.log("myNFTsIDs",myNFTsIDs);
    if(myNFTsIDs !== []){
      let _ships = getNFTsData(true, myNFTsIDs, filterQuality, prices, sortBy, 1);
      let _chars = getNFTsData(true, myNFTsIDs, filterQuality, prices, sortBy, 2);
      let _aNFTs = _ships.concat(_chars);
      let _nfts = structureNFTsForUnity(_aNFTs, map);
      setAllMyNFTs(_nfts);
      console.log("ALLLLLLLL", _ships, _chars);
    }
  }, [myNFTsIDs]);
  
  useEffect(() => {
    console.log("allMyNFTs effect", allMyNFTs);
    if(allMyNFTs !== [] && allMyNFTs.length > 0){
      if(allMyNFTs.charactersData.length < 1 || allMyNFTs.shipsData.length < 8) {
        console.log("Unfinished claiming");
        sendPlayerToFinishClaiming();
        return false;
      } else {
        unityContext.send("LoginCanvas", "OnNameData", 1);
      }
    }
  }, [allMyNFTs]);
  
  /*useEffect(() => {
    Lottie.loadAnimation({
      container: document.querySelector("#loading-animation"),
      animationData: loadingAnimation
    }).setSpeed(0.5);
  }, []);*/

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
      console.log("Usergeek init ok");
    } catch (err){
      console.log("Error on Usergeek init", err);
    }
  };

  const getMyNFTs = async () => {
    console.log("getMine prev");
    setMyNFTsIDs(await getMine(map, aID));
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
    switch(walletSelected){
      case "identityWallet": /// Internet Identity
        setWalletService("II");
        await loginII(setAII);
        break;
      case "stoicWallet": /// Stoic Identity
        setIdentity(await loginStoic());
        setWalletService("Stoic");
        break;
      case "plugWallet": /// Plug wallet
        let _id = await loginPlug();
        setPlayerPrincipal(_id);
        setPlugID(_id);
        setWalletService("Plug");
        break;
      case "infinityWallet": /// Infinity Swap
        let _idIW = await loginInfinityWallet();
        console.log("IW", _idIW);
        setPlayerPrincipal(_idIW);
        setIWID(_idIW);
        setWalletService("InfinityWallet");
        break;
      default: /// Other
        console.log("Error on wallet selected");
        alert("Error on wallet selected");
        window.location.reload(false);
        break;
    }
  };

  /// Generate Account Identifier
  /// This is set with a useEffect[pop] to check if we have an identity or a principal
  const generateAID = async () => {
    console.log("pop", pop);
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
    setMap(await getMap());
    setPop(_pop);
    await generatePlayerAddress();
    if(_pop === false){
      generateCanister();
    }
  };
  const generatePlayerAddress = async () => {
    setPlayerAddress(await getPlayerAddress());
  };
  const generateCanister = async () => {
    setBetaNFTsCanister(await getBetaNFTsCanister(identity));
    setCosmicrafts(await getCanister(identity));
    setMultiplayerCanister(await getCanister(null));
  };

  ///Plug wallet
  const generatePlugCan = async () => {
    (async () => {
      const _betaNFTsCanister = await window.ic.plug.createActor({
        canisterId: betaCanisterId,
        interfaceFactory: betaCan,
      });
      setBetaNFTsCanister(_betaNFTsCanister);
      setWalletService("Plug");
      const _cosmicraftsCanister = await window.ic.plug.createActor({
        canisterId: canisterId,
        interfaceFactory: cosmicCan,
      });
      setCosmicrafts(_cosmicraftsCanister);
      setMultiplayerCanister(await getCanister(null));
      await generateMap(true);
    })()
  };

  const generateIWCan = async () => {
    try{
      (async () => {
        const _betaNFTsCanister = await window.ic.infinityWallet.createActor({
          canisterId: betaCanisterId,
          interfaceFactory: betaCan,
        });
        setBetaNFTsCanister(_betaNFTsCanister);
        setWalletService("InfinitySwap");
        const _cosmicraftsCanister = await window.ic.infinityWallet.createActor({
          canisterId: canisterId,
          interfaceFactory: cosmicCan,
        });
        setCosmicrafts(_cosmicraftsCanister);
        setMultiplayerCanister(await getCanister(null));
        await generateMap(true);
      })()
    } catch(e){
      console.log("IW E", e);
      alert("Your Wallet session has expired. Please login again in their app and then reload this page");
    }
  };
  

  const getBetaNFTsList = async () => {
    let _prev  = await betaNFTsCanister.getBetaData();
    console.log("Previously assigned codes", _prev);
    let _codes = await betaNFTsCanister.getAllCodes();
    console.log("All codes", _codes[0]);
    setBetaNFTsCodes(_codes[0]);
  };

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
        host: host,
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
        host: host,
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

  const sendNFT = async (nft) => {
    console.log("NFT TO SEND", nft);
    /**/
    let id = nft[0];
    let toAddress = walletToSend;
    nft_transfer({ id, toAddress })
  };

  unityContext.on("JSClaimNft", (index) => {
    getNFTCode(parseInt(index));
  });

  unityContext.on("JSClaimAllNft", (indexes) => {
    claimBatchNFTs(indexes);
  });

  unityContext.on("JSGoToMenu", () => {
    /// After claiming all NFTs, load player's data and send user to main menu
    sendDataToUnity();
  });

  const getNFTCode = async (index) => {
    let _code = getCodeFromIndex(index);
    let _r = await nft_claim_link(_code.code);
    let _data = structureBetaNFTClaimed(parseInt(_code.id), index, map, true);
    getMyNFTs();
    unityContext.send("NFTs Reward", "OnClaimNFTCompleted", JSON.stringify(_data));
  };

  const getCodeFromIndex = (index) => {
    if(index < 8){ 
      return betaNFTsCodes.nftsCodes[index];
    } else {
      return betaNFTsCodes.nftChar;
    }
  };

  const claimBatchNFTs = async (indexes) => {
    console.log(indexes);
    try{
      let _indexes = indexes.split(",");
      let _ships = [];
      for(let i = 0; i < _indexes.length; i++){
        let _code = getCodeFromIndex(_indexes[i]);
        let _r = await nft_claim_link(_code.code);
        console.log("Claimed", _r);
        console.log("Structurate", _code, _indexes[i], map);
        let _data = structureBetaNFTClaimed(parseInt(_code.id), _indexes[i], map, false);
        _ships.push(_data);
      }
      getMyNFTs();
      unityContext.send("NFTs Reward", "OnClaimNFTCompleted", JSON.stringify(_ships));
    } catch(e){
      console.log("Failed while reading array of indexes", e);
    }
  };

  const getOrSetPlayer = async () => {
    try{
      console.log("Will try to get player");
      let _myPrincipal = await cosmicrafts.principalToString();
      console.log("Principal logged", _myPrincipal, _myPrincipal.toString());
      Usergeek.setPrincipal(_myPrincipal);
      Usergeek.trackSession();
      let _player = await cosmicrafts.getPlayer();
      console.log("Player:", _player);
      if(_player === null || _player.length === 0){
        console.log("Get approved");
        let _approved = await betaNFTsCanister.getBetaPlayer();
        console.log(_approved);
        if(_approved !== undefined && _approved !== null && _approved.length > 0 && parseInt(_approved[0].allowed) === 1){
          console.log("Get BetaNFTList");
          await getBetaNFTsList();
          console.log("Send 0 to OnNameData");
          unityContext.send("LoginCanvas", "OnNameData", 0);
        } else {
          console.log("Send 3 to OnNameData");
          unityContext.send("LoginCanvas", "OnNameData", 3);
        }
        return false;
      } else {
        console.log("Set player");
        setPlayer(_player[0]);
      }
    } catch(e){
      alert("Your Wallet session has expired. Please login again in their app and then reload this page");
      console.log("Get or set player error", e);
    }
  };

  const sendPlayerToFinishClaiming = async () => {
    await getBetaNFTsList();
    unityContext.send("LoginCanvas", "OnNameData", 2);
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
      console.log(aID, playerName, walletService);
      let _newPlayer = await cosmicrafts.createPlayer(aID, playerName, walletService);
      if(_newPlayer){
        let _player = await cosmicrafts.getPlayer();
        setPlayer(_player[0]);
        ////unityContext.send("LoginCanvas", "OnNameData", 2); /// Unnecesary?
      } else {
        console.log("No player created");
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
        //"WalletId": player.aid,
        "WalletId": player.id.toString(),
        "NikeName": player.playerName
      };
      setUnityPlayerData(_unityPlayerData);
    }
  };

  /// Initial data to Unity
  const sendDataToUnity = async () => {
    if(allMyNFTs.charactersData.length < 1 || allMyNFTs.shipsData.length < 8) {
      console.log("Unfinished claiming");
      await getBetaNFTsList();
      unityContext.send("LoginCanvas", "OnNameData", 2);
      return false;
    }
    unityContext.send("LoginCanvas", "OnNameData", 1);
  };

  unityContext.on("DashboardStarts", () => {
    if(dashboardSet === false){
      waitForDashboardToLoad();
    }
  });

  const waitForDashboardToLoad = async () => {
    Usergeek.trackEvent("Load Player's data");
    console.log("NFTS TO UNITY", allMyNFTs);
    if(allMyNFTs.charactersData.length > 0) { unityContext.send("Dashboard", "GL_SetCollectionCharactersData", JSON.stringify(allMyNFTs.charactersData)); }
    if(allMyNFTs.shipsData.length > 0)      { unityContext.send("Dashboard", "GL_SetCollectionUnitsData",      JSON.stringify(allMyNFTs.shipsData));      }
    if(allMyNFTs.spellsData.length > 0)     { unityContext.send("Dashboard", "GL_SetCollectionSkillsData",     JSON.stringify(allMyNFTs.spellsData));     }
    let _pref = await cosmicrafts.getPlayerPreferences();
    let score = await cosmicrafts.getPlayerScore();
    score = (score.ok !== undefined) ? parseInt(score.ok) : 0;
    //// TO DO: GET REAL LEVEL, XP AND BattlePoints
    let _prog = JSON.stringify({"Xp": score, "Level": getLevel(score), "BattlePoints": score});
    let _lang = (_pref.length > 0 && _pref[0].gamePlayerData !== "") ? _pref[0].gamePlayerData : JSON.stringify({"language": 0});
    let _char = (_pref.length > 0 && parseInt(_pref[0].playerCharID) !== 0 ) ? parseInt(_pref[0].playerCharID) : allMyNFTs.charactersData[0].ID;
    unityContext.send("Dashboard", "GL_SetPlayerData", JSON.stringify(unityPlayerData));
    unityContext.send("Dashboard", "GL_SetCharacterSelected", _char);
    unityContext.send("Dashboard", "GL_SetConfigData", _lang);
    unityContext.send("Dashboard", "GL_SetProgressData", _prog);
    setPlayerConfigData(_lang);
    setPlayerCharSelected(_char);
    //setIsLoading(false);
    setDashboardSet(true);
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
    //// MP
      unityContext.on("SearchGame", (json) => {
        console.log("Will search game", json);
        let data = JSON.parse(json);
        searchGame(data, json);
      });

      unityContext.on("CancelGame", (gameId) => {
        console.log("Canceling: ", gameId);
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
      const saveUserCharacter = async (idNFT) => {
        console.log("Save users character", idNFT);
        let _c = await cosmicrafts.savePlayerCharacter(idNFT);
      };

      const cancelGame = async (gameId) => {
          let _ok = await multiplayerCanister.cancelGame(parseInt(gameId));
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
        console.log(gameId);
    }, [gameId]);

    const getCharacter = (id) => {
      let nfts = structureNFTsForMP([id], map);
      return nfts.charactersData[0];
    };

    const getDeckNFTs = (ids) => {
      let nfts = structureNFTsForMP(ids, map);
      return nfts.shipsData;
    };

    const createGame = async (data, gameStatus) => {
        const _time = new Date();
        console.log("Create new game!");
        let _game = await multiplayerCanister.createGame(data.WalletId, data.NikeName, data.CharacterNFTId, data.DeckNFTsId, data.Xp, data.Level, data.Avatar, gameStatus, _time.getTime(), _time.toISOString().split('T')[0], _time.toISOString().split('T')[0]);
        let masterCharacter = getCharacter(_game.masterIcon);
        let masterDeck = getDeckNFTs(_game.masterDeck);
        console.log("Master", masterCharacter, masterDeck);
        playerIndex = 1;
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
            "MasterCharacter": masterCharacter, /// Full structure for P1's Hero NFT
            "ClientCharacter": null, /// Full structure for P2's Hero NFT, null at this poins as no player has joined this game
            "MasterDeck": masterDeck, /// Full structure for P1's NFTs deck
            "ClientDeck": null, /// Full structure for P2's NFTs deck, null at this poins as no player has joined this game
            "masterLastAlive": parseInt(_time.getTime()),
            "clientLastAlive": parseInt(_game.clientLastAlive),
            "GameStart": _game.GameStartTime,
            "LastUpdate": _game.gameLastUpdate,
            "GameWinner": parseInt(_game.gameWinner)
        };
        console.log("create _g", _g);
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
        let _game = await multiplayerCanister.findGame(data.WalletId, data.NikeName, parseInt(data.CharacterNFTId), data.DeckNFTsId, data.Xp, data.Level, data.Avatar, String(_time.getTime()), _time.getTime());
        let masterCharacter = (parseInt(_game.masterIcon) !== 0) ? getCharacter(parseInt(_game.masterIcon)) : null;
        let clientCharacter = (parseInt(_game.clientIcon) !== 0) ? getCharacter(parseInt(_game.clientIcon)) : null;
        let masterDeck = (_game.masterDeck !== []) ? getDeckNFTs(_game.masterDeck) : null;
        let clientDeck = (_game.clientDeck !== []) ? getDeckNFTs(_game.clientDeck) : null;
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
            "MasterCharacter": masterCharacter, //////// Aquí va la estructura completa del NFT del master
            "ClientCharacter": clientCharacter, //////// Aquí va la estructura completa del NFT del cliente
            "MasterDeck": masterDeck, ///////////////////////////////////////////// Estructura completa de las naves del deck del master
            "ClientDeck": clientDeck, ///////////////////////////////////////////// Estructura completa de las naves del deck del client
            "masterLastAlive": parseInt(_game.masterLastAlive),
            "clientLastAlive": parseInt(_game.clientLastAlive),
            "GameStart": _game.GameStartTime,
            "LastUpdate": _game.gameLastUpdate,
            "GameWinner": parseInt(_game.gameWinner)
        };
        console.log("search _g", _g);
        if(_g.GameId != 0){
            setGameId(_g.GameId);
            setGame(_g);
            inGame = true;
            getMasterMatchData(_game.gameId);
            userIsAlive(_game.gameId);
            playerIndex = 2;
        } else {
            createGame(data, gameStatus);
        }
    };

    const getMatchStatus = async (_gm) => {
        if(_gm.GameId != undefined){
            let _game = await multiplayerCanister.getGameMatchStatus(_gm.GameId);
            let masterCharacter = (parseInt(_game.masterIcon) !== 0) ? getCharacter(parseInt(_game.masterIcon)) : null;
            let clientCharacter = (parseInt(_game.clientIcon) !== 0) ? getCharacter(parseInt(_game.clientIcon)) : null;
            let masterDeck = (_game.masterDeck !== []) ? getDeckNFTs(_game.masterDeck) : null;
            let clientDeck = (_game.clientDeck !== []) ? getDeckNFTs(_game.clientDeck) : null;
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
                    "MasterCharacter": masterCharacter,
                    "ClientCharacter": clientCharacter,
                    "MasterDeck": masterDeck,
                    "ClientDeck": clientDeck,
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
                        multiplayerCanister.saveMatchLastAlive(_game.gameId, _time.getTime());
                    }, 200);
                } else {
                  console.log("Start game", _g);
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
      /////////// Esto cambiará por NFTs
        let _dataStr = JSON.stringify(game);
        unityContext.send("MatchMulti", "GLGetICPData", _dataStr);
    }

    unityContext.on("GameStarts", () => {
      console.log("GameStarts from UNITY");
      setGameManagerActive(true);
    });

    const setGameManagerActive = (val) => {
      gameManagerActive = val;
      console.log("gameManagerChange", val, gameManagerActive);
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
          console.log("Match data", _md);
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
        console.log("Master data from Unity", _d);
        if(_d.GameStep >= 2){
          if(_d.GameWinner !== undefined && _d.GameWinner !== null && _d.GameWinner > 0){
            if(winnerPlayer === 0){
              console.log("Game winner on Master", _d.GameWinner);
              endGameForMaster(_d.GameWinner);
              winnerPlayer = _d.GameWinner;
              sendMasterData(data, _d.GameId, _d.MasterScore);
            } else {
              console.log("Winner set as", winnerPlayer);
              console.log("Game Step", _d.GameStep);
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
          console.log("Master's score", playerScore);
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
        console.log("Get game's progress", _md);
        let winnerSavedIC = 0;
        if(_md.status != "" /*&& _time.getTime() > lastCheck*/){
          if( _md.gameWinner !== undefined && parseInt(_md.gameWinner) !== 0 && parseInt(_md.gameWinner) !== NaN){
            //winnerPlayer = parseInt(_md.gameWinner);
            console.log("Winner on Client", parseInt(_md.gameWinner));
            endGameForClient(parseInt(_md.gameWinner));
          }
          enemyLastAlive = parseInt(_md.masterLastAlive);
          syncUser(_md.status);
          lastCheck = _time.getTime();
          if((enemyLastAlive + timeoutWait * 1000) < lastCheck){
            console.log("Enemy disconected");
            //saveMasterDisconected(parseInt(gameId));
          }
          let _status = JSON.parse(_md.status);
          winnerSavedIC = _status.GameWinner;
          console.log("winnerSavedIC", winnerSavedIC);
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
          console.log("Send to User", data);
          unityContext.send("GameManager", "GL_SyncClient", data);
        }
      };
      /// Game Ends
      const endGameForClient = async (_gw) => {
        if(_gw !== undefined && _gw !== null && winnerPlayer === 0){
          winnerPlayer = _gw;
          await setGameWinner(_gw);
        } else {
          console.log("Player already set on client", winnerPlayer);
        }
      };
      unityContext.on("SendClientData", (data) => {
        console.log("Client's data", data);
        let _d = JSON.parse(data);
        if(gameManagerActive === true){
          sendClientData(data, parseInt(_d.GameId), _d.ClientScore);
        }
      });
      const sendClientData = async (data, gameId, _clientScore) => {
          const _time = new Date();
          console.log("Client's score", _clientScore);
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
        console.log("Player winner", _pw);
        let _gameData = await multiplayerCanister.setGameWinner(_pw, parseInt(gameId), playerIndex);
        console.log("Saved winner", _gameData);
      };

      /// Receive score from game end
      unityContext.on("SaveScore", (score) => {
        console.log("SAVE SCORE AT THE END OF THE GAME");
        saveScore(score);
        inGame = false;
        gameManagerActive = false;
      });

      /// Save the score
      const saveScore = async (score) => {
        Usergeek.trackEvent("Game finished");
        let saved = await cosmicrafts.savePlayerScore(score);
        console.log("SCORE", saved);
        playerIndex = 0;
        updateCXP();
      };

      //// Go to Main Menu after game
      unityContext.on("ExitGame", (json) => {
        //setGameWinner(winnerPlayer);
        console.log("GAME END, WINNER", winnerPlayer);
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
          console.log("New score", score);
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
          height: "auto",
          width: "100%",
        }} 
      />
    </>
  );
}

export default App;

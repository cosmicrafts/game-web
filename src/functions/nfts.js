import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { PrincipalFromSlot }  from "@vvv-interactive/nftanvil-tools/cjs/principal.js";
import { tokenUrl }           from "@vvv-interactive/nftanvil-tools/cjs/token.js";

import { accountCanister }    from "@vvv-interactive/nftanvil-canisters/cjs/account.js";

import artNFTs from "../nft-anvil/resources/artnfts.json";
import testNFTs from "../nft-anvil/resources/game_nfts_test.json"; /// a00fdafece4bfb0e25dc7eccd5a757ddcb32691a6d567fab56d48bb0dcadd8a8

export const getMine = async (map, aID) => {
    if (!aID) return null;
    
    let address = aID;
  
    if(address === undefined || address === null) return null;

    let can = PrincipalFromSlot(
      map.space,
      AccountIdentifier.TextToSlot(address, map.account)
    ).toText();
    
    let acc = accountCanister(can, {agentOptions: {
      host: 'https://mainnet.dfinity.network',
    }});
  
    let pageIdx = 0;
    let max = 100;
    let final = [];
    do {
      try{
        let list = await acc.list(
          AccountIdentifier.TextToArray(address),
          pageIdx * max,
          (pageIdx + 1) * max
        );
  
        list = list.filter((x) => x !== 0n).map((x) => Number(x));
  
        if (list.length === 0) break;
  
        final.push(...list);
        pageIdx++;
      }catch(e){
        console.log("DO", e);
        break;
      }
    } while (true);

    console.log("FINAL NFTS", final);

    return final;
  };

export const getNFTsData = (_showMine, myNFTsIDs, filterQuality, prices, sortBy) => {
    let nftcut = (_showMine && myNFTsIDs !== null)
      ? testNFTs.filter((x) => {
          return myNFTsIDs.indexOf(x[0]) !== -1;
        })
      : testNFTs;
      
      let filtered = nftcut.filter((x) => {
        if (filterQuality == -1) return true;
        return x[1] == filterQuality;
      });
    
    if(_showMine){
      return filtered;
    }

    console.log("Filtered", filtered);

    let priced = filtered
      .map((x) => {
        if(prices[x[0]] !== undefined){
          let pr = prices[x[0]][1];
          //console.log([x[0]], "PRICE", pr);
          if (sortBy === "priceasc" && !pr) return false;
          if (sortBy === "pricedesc" && !pr) return false;
          return [...x, pr];
        }
      })
      .filter(Boolean);

    let price_min = false;
    let price_max = false;

    let sorted = !sortBy
      ? priced
      : priced.sort((a, b) => {
          if (sortBy === "priceasc") return a[6] - b[6];
          if (sortBy === "pricedesc") return b[6] - a[6];

          let q = a[4] ? a[4].find((z) => z[0] === sortBy) : false;
          q = q ? q[1] : 0;

          let m = b[4] ? b[4].find((z) => z[0] === sortBy) : false;
          m = m ? m[1] : 0;

          return m - q;
        });

    sorted.forEach((x) => {
      if (!x[6]) return;
      if (price_min === false || x[6] < price_min) price_min = x[6];
      if (price_max === false || x[6] > price_max) price_max = x[6];
    });

    console.log("Sorted", sorted);

    return sorted;
}

const parserFormat = (arr) => {
    let _f = {};
    for(let i = 0; i < arr.length; i++){
      _f[arr[i][0]] = arr[i][1];
    }
    return _f;
};

export const structureNFTsForUnity = async (allMyNFTs, map) => {
    let _nfts = allMyNFTs;
    let shipsData = [];
    let charactersData = [];
    let spellsData = [];
    for(let i = 0; i < _nfts.length; i++){
      //let url = tokenUrl(map.space, _nfts[i][0], "thumb");
      let url = tokenUrl(map.space, _nfts[i][0], "content");
      let _att = parserFormat(_nfts[i][4]);
      let _tags = _nfts[i][5];
      switch(_att.EntType){
        case 0:
          let _char = {
            "ID": _nfts[i][0],
            "NameID": _nfts[i][2],
            "Description": _nfts[i][3],
            "IconURL": url,
            "Faction": _att.Faction,
            "Rarity": _nfts[i][0].quality,
            "EntType": _att.EntType,
            "LocalID": _att.LocalID,
            "Level": _att.Level,
            "Name": _tags[0]
          };
          charactersData.push(_char); 
          break;
        case 1:
          let _spell = {
            "ID": _nfts[i][0],
            "NameID": _nfts[i][2],
            "Description": _nfts[i][3],
            "IconURL": url,
            "Faction": _att.Faction,
            "Rarity": _nfts[i][0].quality,
            "EntType": _att.EntType,
            "LocalID": _att.LocalID,
            "Level": _att.Level,
            "Name": _tags[0],
            "EnergyCost": _att.EnergyCost
          };
          spellsData.push(_spell); 
          break;
        case 2: case 3:
          let _ship = {
            "ID": _nfts[i][0],
            "NameID": _nfts[i][2],
            "Description": _nfts[i][3],
            "IconURL": url,
            "Faction": _att.Faction,
            "Rarity": _nfts[i][0].quality,
            "EntType": _att.EntType,
            "LocalID": _att.LocalID,
            "Level": _att.Level,
            "Name": _tags[0],
            "EnergyCost": _att.EnergyCost,
            "HitPoints": _att.HitPoints,
            "Shield": _att.Shield,
            "Speed": parseFloat(_att.Speed)/100,
            "Dammage": _att.Dammage
          };
          shipsData.push(_ship); 
          break;
      }
    }
    let res = {
      charactersData: charactersData,
      shipsData: shipsData,
      spellsData: spellsData
    }
    return res;
};
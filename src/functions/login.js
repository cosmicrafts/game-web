import { router }         from "@vvv-interactive/nftanvil-canisters/cjs/router.js";
import { ledgerCanister } from "@vvv-interactive/nftanvil-canisters/cjs/ledger.js";

import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { principalToAccountIdentifier, getSubAccountArray } from "@vvv-interactive/nftanvil-tools/cjs/token.js";

import { BigIntToString }     from "@vvv-interactive/nftanvil-tools/cjs/data.js";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { StoicIdentity } from "ic-stoic-identity";

import { idlFactory } from "../declarations/cosmicrafts";

const canisterId = "onhpa-giaaa-aaaak-qaafa-cai";
const whitelist = [canisterId, "fo275-uiaaa-aaaai-qe3lq-cai"];

// INTERNET IDENTITY
export const loginII = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      return authClient.getIdentity();
    } else {
      await authClient.login({
        onSuccess: async () => {
          return authClient.getIdentity();
        },
      });
    }
};

// STOIC IDENTITY
export const loginStoic = async () => {
    let _stoicIdentity = await StoicIdentity.load().then(async identity => {
      if (identity !== false) {
        //ID is a already connected wallet!
      } else {
        //No existing connection, lets make one!
        identity = await StoicIdentity.connect();
      }
      return identity;
      
      let ledger = ledgerCanister({
          agentOptions: {
              host: 'https://mainnet.dfinity.network',
              identity 
            },
        });
        //setLedgerCan(ledger);
        
        /*await ledger.account_balance({
            account: AccountIdentifier.TextToArray(c),
        }).then((icp) => {
            let e8s = icp.e8s;
            setIcp(e8s);
            console.log("e8s", e8s);
            
            if (e8s >= 30000n) {
                // automatically wrap ICP
                //dispatch(user_pwr_buy({ amount: e8s - 10000n }));
            }
        });*/
        
        //Disconnect after
        //StoicIdentity.disconnect();
    });
    return _stoicIdentity;
  };

// PLUG WALLET
export const loginPlug = async () => {
    const isConnected = await window.ic.plug.requestConnect({
        whitelist,
    });
    const principalId = await window.ic.plug.agent.getPrincipal();
    var principal = principalId.toString();
    console.log(principal);
    ////setUserW(principal);
    /*let address, subaccount;

    if (principal !== "") {
      for (let i = 0; i < 100000; i++) {
        let c = principalToAccountIdentifier(principal, i);
        //console.log("SUBACCOUNT_ARRAY", getSubAccountArray(i));

        if (c.substring(0, 3) === "a00") {
          address = c;
          subaccount = AccountIdentifier.ArrayToText(getSubAccountArray(i));

          break;
        }
      }
    }*/
    //dispatch(user_login(false, principal));
    //console.log("USER PLUG", user);
    //console.log("ADDRESS ", address);
    //console.log("SUBACCOUNT", subaccount);
    //saveLoggedData(principal, "Plug");
  };

export const getMap = async () => {
    let _map = await router.config_get();
    _map.router = _map.router.toString();
    _map = BigIntToString(_map);
    return _map;
};

export const getAID = async (identity) => {
    return principalToAccountIdentifier(identity.getPrincipal().toString(), 0);
};

export const getCanister = async (identity) => {
    const _cosmicrafts = Actor.createActor(idlFactory, {
        agent: new HttpAgent({
          host: 'https://mainnet.dfinity.network',
          identity,
        }),
        canisterId,
    });
    return _cosmicrafts;
};
export const getPlayerAddress = async () => {
   return AccountIdentifier.ArrayToText(getSubAccountArray(0));
};
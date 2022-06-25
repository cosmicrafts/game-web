import { createSlice } from "@reduxjs/toolkit";
import { AuthClient } from "@dfinity/auth-client";
import { router } from "@vvv-interactive/nftanvil-canisters/cjs/router.js";
// import Cookies from "js-cookie";
import { ledgerCanister } from "@vvv-interactive/nftanvil-canisters/cjs/ledger.js";
import { pwrCanister } from "@vvv-interactive/nftanvil-canisters/cjs/pwr.js";

import authentication from "../auth";

import {
  principalToAccountIdentifier,
  getSubAccountArray,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";

import { BigIntToString } from "@vvv-interactive/nftanvil-tools/cjs/data.js";

import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { PrincipalFromSlot } from "@vvv-interactive/nftanvil-tools/cjs/principal.js";

const initialState = {
  address: null,
  subaccount: null,
  principal: null,
  anonymous: true,
  focused: true,
  icp: "0",
  anv: "0",
  map: {},
  acccan: "",
  oracle: {
    icpCycles: "160000",
    icpFee: "10000",
    pwrFee: "10000",
    anvFee: "10000",
  },
  pro: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetReducer: () => initialState,
    balancesSet: (state, action) => {
      return {
        ...state,
        icp: action.payload.icp,
        anv: action.payload.anv,
        oracle: action.payload.oracle,
      };
    },
    focusSet: (state, action) => {
      return { ...state, focused: action.payload };
    },
    proSet: (state, action) => {
      return {
        ...state,
        pro: action.payload,
      };
    },

    authSet: (state, action) => {
      const { address, subaccount, principal, anonymous, map, acccan } =
        action.payload;
      return {
        ...state,
        address,
        principal,
        anonymous,
        subaccount,
        ...(map ? { map, acccan } : {}),
      };
    },
    mapSet: (state, action) => {
      return {
        ...state,
        map: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetReducer, proSet, authSet, balancesSet, focusSet, mapSet } =
  userSlice.actions;

export const user_login = (anon = false, otherIdentity = null) => (dispatch) => {
  dispatch(user_auth(anon, otherIdentity));
};

export const user_auth =
  (allowAnonymous = true, otherIdentity = null) =>
  async (dispatch, getState) => {
    await authentication.create();
    let authClient = authentication.client;
    console.log("NEW CLIENT", authClient);

    if (!allowAnonymous && !(await authClient.isAuthenticated())) {
      if(otherIdentity === null){
        await new Promise(async (resolve, reject) => {
          authClient.login({
            //maxTimeToLive: 10000000000n,
            ...(process.env.REACT_APP_IDENTITY_PROVIDER
              ? { identityProvider: process.env.REACT_APP_IDENTITY_PROVIDER }
              : {}),
            onSuccess: async (e) => {
              console.log("SUCCESS LOGIN II", e);
              resolve();
            },
            onError: reject,
          });
        });
      }
    }

    let principal, anonymous;
    if(otherIdentity === null){
      const identity = await authClient.getIdentity();
      console.log("II ANVIL", identity);
      anonymous = !(await authClient.isAuthenticated());
      principal = identity.getPrincipal().toString();
    } else {
      console.log("OTHER PRINCIPAL", otherIdentity);
      principal = otherIdentity.getPrincipal().toString();
      anonymous = false;
    }
    
    let address, subaccount;

    if (!anonymous) {
      for (let i = 0; i < 100000; i++) {
        let c = principalToAccountIdentifier(principal, i);
        if(otherIdentity !== null){
          address = c;
          subaccount = AccountIdentifier.ArrayToText(getSubAccountArray(i));
          break;
        }

        if (c.substring(0, 3) === "a00") {
          address = c;
          subaccount = AccountIdentifier.ArrayToText(getSubAccountArray(i));
          break;
        }
      }
    }

    let pro = window.localStorage.getItem("pro") == "true";
    if (pro) dispatch(proSet(true));

    router.setOptions(process.env.REACT_APP_ROUTER_CANISTER_ID, {
    //router.setOptions("kbzti-laaaa-aaaai-qe2ma-cai", {
      agentOptions: authentication.getAgentOptions(),
    });

    let map = await router.config_get();

    map.router = map.router.toString();
    map = BigIntToString(map);

    if (process.env.REACT_APP_LOCAL_BACKEND) {
      console.log(
        "Proxy command:\n icx-proxy --address 127.0.0.1:8453 --dns-alias " +
          map.nft_avail
            .map(
              (slot) =>
                `${slot}.lvh.me:${PrincipalFromSlot(map.space, slot).toText()}`
            )
            .join(" ")
      );
    }

    let acccan = address
      ? PrincipalFromSlot(
          map.space,
          AccountIdentifier.TextToSlot(address, map.account)
        ).toText()
      : null;

    dispatch(
      authSet({ address, subaccount, principal, anonymous, map, acccan })
    );
    dispatch(user_refresh_balances());
  };

export const user_refresh_config = () => async (dispatch, getState) => {
  let map = await router.config_get();
  map = BigIntToString(map);
  dispatch(mapSet(map));
};

export const user_refresh_balances = (newIdentity = null) => async (dispatch, getState) => {
  if ((!authentication || !authentication.client) && newIdentity === null) return;
  if ((!(await authentication.client.isAuthenticated())) && newIdentity === null) return;
  await dispatch(user_refresh_icp_balance(newIdentity));
  if ((!(await authentication.client.isAuthenticated())) && newIdentity === null) return;
  dispatch(user_refresh_pwr_balance());
  dispatch(user_restore_purchase());
};

export const user_logout = () => async (dispatch, getState) => {
  var authClient = await AuthClient.create();

  authClient.logout();

  const identity = await authClient.getIdentity();
  router.setOptions(process.env.REACT_APP_ROUTER_CANISTER_ID, {
  //router.setOptions("kbzti-laaaa-aaaai-qe2ma-cai", {
    agentOptions: authentication.getAgentOptions(),
  });

  let principal = identity.getPrincipal().toString();
  let anonymous = !(await authClient.isAuthenticated());

  //dispatch(authSet({ address: null, principal, anonymous }));

  dispatch(resetReducer());
  dispatch(user_auth());
};

export const user_refresh_icp_balance = (newIdentity = null) => async (dispatch, getState) => {
  let identity = authentication.client.getIdentity();

  let s = getState();

  let address = s.user.address;
  if (!address) return;

  let ledger = ledgerCanister({
    agentOptions: authentication.getAgentOptions(),
  });

  await ledger
    .account_balance({
      account: AccountIdentifier.TextToArray(address),
    })
    .then((icp) => {
      let e8s = icp.e8s;

      if (e8s >= 30000n) {
        // automatically wrap ICP
        dispatch(user_pwr_buy({ amount: e8s - 10000n, newIdentity: newIdentity }));
      }
    })
    .catch((e) => {
      if (!process.env.REACT_APP_LOCAL_BACKEND) console.log(e); // Will always show bug in dev mode because there is ledger canister on the local replica
    });
};

export const user_refresh_pwr_balance = () => async (dispatch, getState) => {
  let identity = authentication.client.getIdentity();

  let s = getState();

  let address = s.user.address;
  if (!address) return;

  let pwrcan = pwrCanister(
    PrincipalFromSlot(
      s.user.map.space,
      AccountIdentifier.TextToSlot(address, s.user.map.pwr)
    ),
    { agentOptions: authentication.getAgentOptions() }
  );

  await pwrcan
    .balance({
      user: { address: AccountIdentifier.TextToArray(address) },
    })
    .then(async ({ pwr, anv, oracle }) => {
      // if (Number(pwr) === 0) {
      //   //TODO: Remove in production
      //   let fres = await pwrcan.faucet({
      //     aid: AccountIdentifier.TextToArray(address),
      //     amount: 800000000n,
      //   });
      //   dispatch(refresh_pwr_balance());
      //   return;
      // }

      oracle = BigIntToString(oracle);
      dispatch(
        balancesSet({ icp: pwr.toString(), anv: anv.toString(), oracle })
      );
    })
    .catch((e) => {
      // We are most probably logged out. There is currently no better way to handle expired agentjs chain
      if (e.toString().includes("delegation has expired"))
        dispatch(user_logout());
    });
};

export const user_pwr_transfer =
  ({ to, amount, memo = [] }) =>
  async (dispatch, getState) => {
    let identity = authentication.client.getIdentity();

    let s = getState();

    let address = s.user.address;
    let subaccount = [
      AccountIdentifier.TextToArray(s.user.subaccount) || null,
    ].filter(Boolean);

    let pwr = pwrCanister(
      PrincipalFromSlot(
        s.user.map.space,
        AccountIdentifier.TextToSlot(address, s.user.map.pwr)
      ),
      {
        agentOptions: authentication.getAgentOptions(),
      }
    );

    let trez = await pwr.pwr_transfer({
      amount,
      from: { address: AccountIdentifier.TextToArray(address) },
      to: { address: AccountIdentifier.TextToArray(to) },
      subaccount: subaccount,
      memo,
    });

    if (!("ok" in trez)) throw new Error(JSON.stringify(trez));

    dispatch(user_refresh_balances());

    return trez;
  };

export const user_transfer_icp =
  ({ to, amount }) =>
  async (dispatch, getState) => {
    let identity = authentication.client.getIdentity();

    let s = getState();

    let address = s.user.address;
    let subaccount = [
      AccountIdentifier.TextToArray(s.user.subaccount) || null,
    ].filter(Boolean);

    let pwr = pwrCanister(
      PrincipalFromSlot(
        s.user.map.space,
        AccountIdentifier.TextToSlot(address, s.user.map.pwr)
      ),
      {
        agentOptions: authentication.getAgentOptions(),
      }
    );

    let trez = await pwr.pwr_withdraw({
      amount,
      from: { address: AccountIdentifier.TextToArray(address) },
      to: { address: AccountIdentifier.TextToArray(to) },
      subaccount: subaccount,
    });

    if (!("ok" in trez)) throw new Error(JSON.stringify(trez));

    dispatch(user_refresh_balances());

    return trez;
  };

export const user_pwr_buy =
  ({ amount, newIdentity }) =>
  async (dispatch, getState) => {
    let s = getState();

    let identity = authentication.client.getIdentity();
    let address = s.user.address;

    console.log("AGENT OPTIONS", authentication.getAgentOptions());
    console.log("NEW IDEWNTITY", newIdentity);
    let pwr;
    if(newIdentity === null){
      pwr = pwrCanister(
        PrincipalFromSlot(
          s.user.map.space,
          AccountIdentifier.TextToSlot(address, s.user.map.pwr)
        ),
        {
          agentOptions: authentication.getAgentOptions(),
        }
      );
    } else {
      pwr = pwrCanister(
        PrincipalFromSlot(
          s.user.map.space,
          AccountIdentifier.TextToSlot(address, s.user.map.pwr)
        ),
        {
          agentOptions: authentication.getAgentOptions(),
        },
        newIdentity
      );
    }
    console.log("WORKS", pwr);

    let subaccount = [
      AccountIdentifier.TextToArray(s.user.subaccount) || null,
    ].filter(Boolean);

    let intent;
    try{
      intent = await pwr.pwr_purchase_intent({
        user: { address: AccountIdentifier.TextToArray(address) },
        subaccount,
      });
    } catch(e){
      console.log("Error pwr.pwr_purchase_intent", e);
      return;
    }
    if (intent.err) throw intent.err;

    let paymentAddress = intent.ok;

    let ledger = ledgerCanister({
      agentOptions: authentication.getAgentOptions(),
    });

    let ledger_result = await ledger.transfer({
      memo: 0,
      amount: { e8s: amount },
      fee: { e8s: 10000n },
      from_subaccount: subaccount,
      to: paymentAddress,
      created_at_time: [],
    });

    if (ledger_result.Ok) {
    } else {
      console.error(ledger_result.Err);
      return;
    }

    try {
      let claim = await pwr.pwr_purchase_claim({
        user: { address: AccountIdentifier.TextToArray(address) },
        subaccount,
      });

      if (claim.err) throw claim.err;

      let { transactionId } = claim.ok;
    } catch (e) {}

    dispatch(user_refresh_balances());
  };

export const user_restore_purchase = () => async (dispatch, getState) => {
  let s = getState();

  let identity = authentication.client.getIdentity();

  let address = s.user.address;
  let pwr;
  //console.log("AGENT OPTIONS", authentication.getAgentOptions());
  try{
    pwr = pwrCanister(
      PrincipalFromSlot(
        s.user.map.space,
        AccountIdentifier.TextToSlot(address, s.user.map.pwr)
      ),
      {
        agentOptions: authentication.getAgentOptions(),
      }
    );
  }catch(e){}

  let subaccount = [
    AccountIdentifier.TextToArray(s.user.subaccount) || null,
  ].filter(Boolean);

  try {
    let claim = await pwr.pwr_purchase_claim({
      user: { address: AccountIdentifier.TextToArray(address) },
      subaccount,
    });

    if (claim.err) throw claim.err;

    let { transactionId } = claim.ok;

    dispatch(user_refresh_pwr_balance());
  } catch (e) {}
};

export const window_focus = () => async (dispatch, getState) => {
  dispatch(focusSet(true));
  dispatch(user_refresh_balances());
};

export const window_blur = () => async (dispatch, getState) => {
  dispatch(focusSet(false));
};

export default userSlice.reducer;

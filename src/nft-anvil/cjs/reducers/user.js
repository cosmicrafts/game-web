"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.window_focus = exports.window_blur = exports.user_transfer_icp = exports.user_restore_purchase = exports.user_refresh_pwr_balance = exports.user_refresh_icp_balance = exports.user_refresh_config = exports.user_refresh_balances = exports.user_pwr_transfer = exports.user_pwr_buy = exports.user_logout = exports.user_login = exports.user_auth = exports.userSlice = exports.resetReducer = exports.proSet = exports.mapSet = exports.focusSet = exports.default = exports.balancesSet = exports.authSet = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _authClient = require("@dfinity/auth-client");

var _router = require("@vvv-interactive/nftanvil-canisters/cjs/router.js");

var _ledger = require("@vvv-interactive/nftanvil-canisters/cjs/ledger.js");

var _pwr = require("@vvv-interactive/nftanvil-canisters/cjs/pwr.js");

var _auth = _interopRequireDefault(require("../auth"));

var _token = require("@vvv-interactive/nftanvil-tools/cjs/token.js");

var _data = require("@vvv-interactive/nftanvil-tools/cjs/data.js");

var AccountIdentifier = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js"));

var _principal = require("@vvv-interactive/nftanvil-tools/cjs/principal.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Cookies from "js-cookie";
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
    anvFee: "10000"
  },
  pro: false
};
const userSlice = (0, _toolkit.createSlice)({
  name: "user",
  initialState,
  reducers: {
    resetReducer: () => initialState,
    balancesSet: (state, action) => {
      return { ...state,
        icp: action.payload.icp,
        anv: action.payload.anv,
        oracle: action.payload.oracle
      };
    },
    focusSet: (state, action) => {
      return { ...state,
        focused: action.payload
      };
    },
    proSet: (state, action) => {
      return { ...state,
        pro: action.payload
      };
    },
    authSet: (state, action) => {
      const {
        address,
        subaccount,
        principal,
        anonymous,
        map,
        acccan
      } = action.payload;
      return { ...state,
        address,
        principal,
        anonymous,
        subaccount,
        ...(map ? {
          map,
          acccan
        } : {})
      };
    },
    mapSet: (state, action) => {
      return { ...state,
        map: action.payload
      };
    }
  }
}); // Action creators are generated for each case reducer function

exports.userSlice = userSlice;
const {
  resetReducer,
  proSet,
  authSet,
  balancesSet,
  focusSet,
  mapSet
} = userSlice.actions;
exports.mapSet = mapSet;
exports.focusSet = focusSet;
exports.balancesSet = balancesSet;
exports.authSet = authSet;
exports.proSet = proSet;
exports.resetReducer = resetReducer;

const user_login = () => dispatch => {
  dispatch(user_auth(false));
};

exports.user_login = user_login;

const user_auth = function () {
  let allowAnonymous = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return async (dispatch, getState) => {
    await _auth.default.create();
    let authClient = _auth.default.client;

    if (!allowAnonymous && !(await authClient.isAuthenticated())) {
      await new Promise(async (resolve, reject) => {
        authClient.login({ //maxTimeToLive: 10000000000n,
          ...(process.env.REACT_APP_IDENTITY_PROVIDER ? {
            identityProvider: process.env.REACT_APP_IDENTITY_PROVIDER
          } : {}),
          onSuccess: async e => {
            console.log(authClient);
            resolve();
          },
          onError: reject
        });
      });
    }

    const identity = await authClient.getIdentity();
    let principal = identity.getPrincipal().toString();
    let anonymous = !(await authClient.isAuthenticated());
    let address, subaccount;

    if (!anonymous) {
      for (let i = 0; i < 100000; i++) {
        let c = (0, _token.principalToAccountIdentifier)(principal, i);

        if (c.substring(0, 3) === "a00") {
          address = c;
          subaccount = AccountIdentifier.ArrayToText((0, _token.getSubAccountArray)(i)); //console.log(subaccount);

          break;
        }
      }
    }

    let pro = window.localStorage.getItem("pro") == "true";
    if (pro) dispatch(proSet(true));

    _router.router.setOptions(process.env.REACT_APP_ROUTER_CANISTER_ID, {
      agentOptions: _auth.default.getAgentOptions()
    });

    let map = await _router.router.config_get();
    map.router = map.router.toString();
    map = (0, _data.BigIntToString)(map); // console.log("ROUTER MAP", map);

    if (process.env.REACT_APP_LOCAL_BACKEND) {
      console.log("Proxy command:\n icx-proxy --address 127.0.0.1:8453 --dns-alias " + map.nft_avail.map(slot => `${slot}.lvh.me:${(0, _principal.PrincipalFromSlot)(map.space, slot).toText()}`).join(" "));
    }

    let acccan = address ? (0, _principal.PrincipalFromSlot)(map.space, AccountIdentifier.TextToSlot(address, map.account)).toText() : null;
    dispatch(authSet({
      address,
      subaccount,
      principal,
      anonymous,
      map,
      acccan
    }));
    dispatch(user_refresh_balances());
  };
};

exports.user_auth = user_auth;

const user_refresh_config = () => async (dispatch, getState) => {
  let map = await _router.router.config_get();
  map = (0, _data.BigIntToString)(map); // console.log("ROUTER MAP", map);

  dispatch(mapSet(map));
};

exports.user_refresh_config = user_refresh_config;

const user_refresh_balances = () => async (dispatch, getState) => {
  if (!_auth.default || !_auth.default.client) return;
  if (!(await _auth.default.client.isAuthenticated())) return;
  await dispatch(user_refresh_icp_balance());
  if (!(await _auth.default.client.isAuthenticated())) return;
  dispatch(user_refresh_pwr_balance());
  dispatch(user_restore_purchase());
};

exports.user_refresh_balances = user_refresh_balances;

const user_logout = () => async (dispatch, getState) => {
  var authClient = await _authClient.AuthClient.create();
  authClient.logout();
  const identity = await authClient.getIdentity();

  _router.router.setOptions(process.env.REACT_APP_ROUTER_CANISTER_ID, {
    agentOptions: _auth.default.getAgentOptions()
  });

  let principal = identity.getPrincipal().toString();
  let anonymous = !(await authClient.isAuthenticated()); //dispatch(authSet({ address: null, principal, anonymous }));

  dispatch(resetReducer());
  dispatch(user_auth());
};

exports.user_logout = user_logout;

const user_refresh_icp_balance = () => async (dispatch, getState) => {
  let identity = _auth.default.client.getIdentity();

  let s = getState();
  let address = s.user.address;
  if (!address) return;
  let ledger = (0, _ledger.ledgerCanister)({
    agentOptions: _auth.default.getAgentOptions()
  });
  await ledger.account_balance({
    account: AccountIdentifier.TextToArray(address)
  }).then(icp => {
    let e8s = icp.e8s;

    if (e8s >= 30000n) {
      // automatically wrap ICP
      dispatch(user_pwr_buy({
        amount: e8s - 10000n
      }));
    }
  }).catch(e => {
    if (!process.env.REACT_APP_LOCAL_BACKEND) console.log(e); // Will always show bug in dev mode because there is ledger canister on the local replica
  });
};

exports.user_refresh_icp_balance = user_refresh_icp_balance;

const user_refresh_pwr_balance = () => async (dispatch, getState) => {
  let identity = _auth.default.client.getIdentity();

  let s = getState();
  let address = s.user.address;
  if (!address) return;
  let pwrcan = (0, _pwr.pwrCanister)((0, _principal.PrincipalFromSlot)(s.user.map.space, AccountIdentifier.TextToSlot(address, s.user.map.pwr)), {
    agentOptions: _auth.default.getAgentOptions()
  });
  await pwrcan.balance({
    user: {
      address: AccountIdentifier.TextToArray(address)
    }
  }).then(async _ref => {
    let {
      pwr,
      anv,
      oracle
    } = _ref;
    // if (Number(pwr) === 0) {
    //   //TODO: Remove in production
    //   let fres = await pwrcan.faucet({
    //     aid: AccountIdentifier.TextToArray(address),
    //     amount: 800000000n,
    //   });
    //   dispatch(refresh_pwr_balance());
    //   return;
    // }
    oracle = (0, _data.BigIntToString)(oracle);
    dispatch(balancesSet({
      icp: pwr.toString(),
      anv: anv.toString(),
      oracle
    }));
  }).catch(e => {
    // We are most probably logged out. There is currently no better way to handle expired agentjs chain
    if (e.toString().includes("delegation has expired")) dispatch(user_logout());
  });
};

exports.user_refresh_pwr_balance = user_refresh_pwr_balance;

const user_pwr_transfer = _ref2 => {
  let {
    to,
    amount,
    memo = []
  } = _ref2;
  return async (dispatch, getState) => {
    let identity = _auth.default.client.getIdentity();

    let s = getState();
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let pwr = (0, _pwr.pwrCanister)((0, _principal.PrincipalFromSlot)(s.user.map.space, AccountIdentifier.TextToSlot(address, s.user.map.pwr)), {
      agentOptions: _auth.default.getAgentOptions()
    });
    let trez = await pwr.pwr_transfer({
      amount,
      from: {
        address: AccountIdentifier.TextToArray(address)
      },
      to: {
        address: AccountIdentifier.TextToArray(to)
      },
      subaccount: subaccount,
      memo
    });
    if (!("ok" in trez)) throw new Error(JSON.stringify(trez));
    dispatch(user_refresh_balances());
    return trez;
  };
};

exports.user_pwr_transfer = user_pwr_transfer;

const user_transfer_icp = _ref3 => {
  let {
    to,
    amount
  } = _ref3;
  return async (dispatch, getState) => {
    let identity = _auth.default.client.getIdentity();

    let s = getState();
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let pwr = (0, _pwr.pwrCanister)((0, _principal.PrincipalFromSlot)(s.user.map.space, AccountIdentifier.TextToSlot(address, s.user.map.pwr)), {
      agentOptions: _auth.default.getAgentOptions()
    });
    let trez = await pwr.pwr_withdraw({
      amount,
      from: {
        address: AccountIdentifier.TextToArray(address)
      },
      to: {
        address: AccountIdentifier.TextToArray(to)
      },
      subaccount: subaccount
    });
    if (!("ok" in trez)) throw new Error(JSON.stringify(trez));
    dispatch(user_refresh_balances());
    return trez;
  };
};

exports.user_transfer_icp = user_transfer_icp;

const user_pwr_buy = _ref4 => {
  let {
    amount
  } = _ref4;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let address = s.user.address;
    let pwr = (0, _pwr.pwrCanister)((0, _principal.PrincipalFromSlot)(s.user.map.space, AccountIdentifier.TextToSlot(address, s.user.map.pwr)), {
      agentOptions: _auth.default.getAgentOptions()
    });
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let intent = await pwr.pwr_purchase_intent({
      user: {
        address: AccountIdentifier.TextToArray(address)
      },
      subaccount
    });
    if (intent.err) throw intent.err;
    let paymentAddress = intent.ok;
    let ledger = (0, _ledger.ledgerCanister)({
      agentOptions: _auth.default.getAgentOptions()
    });
    let ledger_result = await ledger.transfer({
      memo: 0,
      amount: {
        e8s: amount
      },
      fee: {
        e8s: 10000n
      },
      from_subaccount: subaccount,
      to: paymentAddress,
      created_at_time: []
    });

    if (ledger_result.Ok) {} else {
      console.error(ledger_result.Err);
      return;
    }

    try {
      let claim = await pwr.pwr_purchase_claim({
        user: {
          address: AccountIdentifier.TextToArray(address)
        },
        subaccount
      });
      if (claim.err) throw claim.err;
      let {
        transactionId
      } = claim.ok;
    } catch (e) {}

    dispatch(user_refresh_balances());
  };
};

exports.user_pwr_buy = user_pwr_buy;

const user_restore_purchase = () => async (dispatch, getState) => {
  let s = getState();

  let identity = _auth.default.client.getIdentity();

  let address = s.user.address;
  let pwr = (0, _pwr.pwrCanister)((0, _principal.PrincipalFromSlot)(s.user.map.space, AccountIdentifier.TextToSlot(address, s.user.map.pwr)), {
    agentOptions: _auth.default.getAgentOptions()
  });
  let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);

  try {
    let claim = await pwr.pwr_purchase_claim({
      user: {
        address: AccountIdentifier.TextToArray(address)
      },
      subaccount
    });
    if (claim.err) throw claim.err;
    let {
      transactionId
    } = claim.ok;
    dispatch(user_refresh_pwr_balance());
  } catch (e) {}
};

exports.user_restore_purchase = user_restore_purchase;

const window_focus = () => async (dispatch, getState) => {
  dispatch(focusSet(true));
  dispatch(user_refresh_balances());
};

exports.window_focus = window_focus;

const window_blur = () => async (dispatch, getState) => {
  dispatch(focusSet(false));
};

exports.window_blur = window_blur;
var _default = userSlice.reducer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy91c2VyLmpzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsImFkZHJlc3MiLCJzdWJhY2NvdW50IiwicHJpbmNpcGFsIiwiYW5vbnltb3VzIiwiZm9jdXNlZCIsImljcCIsImFudiIsIm1hcCIsImFjY2NhbiIsIm9yYWNsZSIsImljcEN5Y2xlcyIsImljcEZlZSIsInB3ckZlZSIsImFudkZlZSIsInBybyIsInVzZXJTbGljZSIsIm5hbWUiLCJyZWR1Y2VycyIsInJlc2V0UmVkdWNlciIsImJhbGFuY2VzU2V0Iiwic3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIiwiZm9jdXNTZXQiLCJwcm9TZXQiLCJhdXRoU2V0IiwibWFwU2V0IiwiYWN0aW9ucyIsInVzZXJfbG9naW4iLCJkaXNwYXRjaCIsInVzZXJfYXV0aCIsImFsbG93QW5vbnltb3VzIiwiZ2V0U3RhdGUiLCJhdXRoZW50aWNhdGlvbiIsImNyZWF0ZSIsImF1dGhDbGllbnQiLCJjbGllbnQiLCJpc0F1dGhlbnRpY2F0ZWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImxvZ2luIiwicHJvY2VzcyIsImVudiIsIlJFQUNUX0FQUF9JREVOVElUWV9QUk9WSURFUiIsImlkZW50aXR5UHJvdmlkZXIiLCJvblN1Y2Nlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsIm9uRXJyb3IiLCJpZGVudGl0eSIsImdldElkZW50aXR5IiwiZ2V0UHJpbmNpcGFsIiwidG9TdHJpbmciLCJpIiwiYyIsInN1YnN0cmluZyIsIkFjY291bnRJZGVudGlmaWVyIiwiQXJyYXlUb1RleHQiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicm91dGVyIiwic2V0T3B0aW9ucyIsIlJFQUNUX0FQUF9ST1VURVJfQ0FOSVNURVJfSUQiLCJhZ2VudE9wdGlvbnMiLCJnZXRBZ2VudE9wdGlvbnMiLCJjb25maWdfZ2V0IiwiUkVBQ1RfQVBQX0xPQ0FMX0JBQ0tFTkQiLCJuZnRfYXZhaWwiLCJzbG90Iiwic3BhY2UiLCJ0b1RleHQiLCJqb2luIiwiVGV4dFRvU2xvdCIsImFjY291bnQiLCJ1c2VyX3JlZnJlc2hfYmFsYW5jZXMiLCJ1c2VyX3JlZnJlc2hfY29uZmlnIiwidXNlcl9yZWZyZXNoX2ljcF9iYWxhbmNlIiwidXNlcl9yZWZyZXNoX3B3cl9iYWxhbmNlIiwidXNlcl9yZXN0b3JlX3B1cmNoYXNlIiwidXNlcl9sb2dvdXQiLCJBdXRoQ2xpZW50IiwibG9nb3V0IiwicyIsInVzZXIiLCJsZWRnZXIiLCJhY2NvdW50X2JhbGFuY2UiLCJUZXh0VG9BcnJheSIsInRoZW4iLCJlOHMiLCJ1c2VyX3B3cl9idXkiLCJhbW91bnQiLCJjYXRjaCIsInB3cmNhbiIsInB3ciIsImJhbGFuY2UiLCJpbmNsdWRlcyIsInVzZXJfcHdyX3RyYW5zZmVyIiwidG8iLCJtZW1vIiwiZmlsdGVyIiwiQm9vbGVhbiIsInRyZXoiLCJwd3JfdHJhbnNmZXIiLCJmcm9tIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwidXNlcl90cmFuc2Zlcl9pY3AiLCJwd3Jfd2l0aGRyYXciLCJpbnRlbnQiLCJwd3JfcHVyY2hhc2VfaW50ZW50IiwiZXJyIiwicGF5bWVudEFkZHJlc3MiLCJvayIsImxlZGdlcl9yZXN1bHQiLCJ0cmFuc2ZlciIsImZlZSIsImZyb21fc3ViYWNjb3VudCIsImNyZWF0ZWRfYXRfdGltZSIsIk9rIiwiZXJyb3IiLCJFcnIiLCJjbGFpbSIsInB3cl9wdXJjaGFzZV9jbGFpbSIsInRyYW5zYWN0aW9uSWQiLCJ3aW5kb3dfZm9jdXMiLCJ3aW5kb3dfYmx1ciIsInJlZHVjZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFLQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7QUFkQTtBQWdCQSxNQUFNQSxZQUFZLEdBQUc7QUFDbkJDLEVBQUFBLE9BQU8sRUFBRSxJQURVO0FBRW5CQyxFQUFBQSxVQUFVLEVBQUUsSUFGTztBQUduQkMsRUFB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QUUwRCxpQkFBaUIsQ0FBQytCLFdBQWxCLENBQThCekYsT0FBOUI7QUFBWCxPQURpQztBQUV2Q0MsTUFBQUE7QUFGdUMsS0FBdkIsQ0FBbEI7QUFLQSxRQUFJNEgsS0FBSyxDQUFDWCxHQUFWLEVBQWUsTUFBTVcsS0FBSyxDQUFDWCxHQUFaO0FBRWYsUUFBSTtBQUFFYSxNQUFBQTtBQUFGLFFBQW9CRixLQUFLLENBQUNULEVBQTlCO0FBRUF2RixJQUFBQSxRQUFRLENBQUNtRCx3QkFBd0IsRUFBekIsQ0FBUjtBQUNELEdBWEQsQ0FXRSxPQUFPakMsQ0FBUCxFQUFVLENBQUU7QUFDZixDQWpDTTs7OztBQW1DQSxNQUFNaUYsWUFBWSxHQUFHLE1BQU0sT0FBT25HLFFBQVAsRUFBaUJHLFFBQWpCLEtBQThCO0FBQzlESCxFQUFBQSxRQUFRLENBQUNOLFFBQVEsQ0FBQyxJQUFELENBQVQsQ0FBUjtBQUNBTSxFQUFBQSxRQUFRLENBQUNnRCxxQkFBcUIsRUFBdEIsQ0FBUjtBQUNELENBSE07Ozs7QUFLQSxNQUFNb0QsV0FBVyxHQUFHLE1BQU0sT0FBT3BHLFFBQVAsRUFBaUJHLFFBQWpCLEtBQThCO0FBQzdESCxFQUFBQSxRQUFRLENBQUNOLFFBQVEsQ0FBQyxLQUFELENBQVQsQ0FBUjtBQUNELENBRk07OztlQUlRUixTQUFTLENBQUNtSCxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2xpY2UgfSBmcm9tIFwiQHJlZHV4anMvdG9vbGtpdFwiO1xuaW1wb3J0IHsgQXV0aENsaWVudCB9IGZyb20gXCJAZGZpbml0eS9hdXRoLWNsaWVudFwiO1xuaW1wb3J0IHsgcm91dGVyIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtY2FuaXN0ZXJzL2Nqcy9yb3V0ZXIuanNcIjtcbi8vIGltcG9ydCBDb29raWVzIGZyb20gXCJqcy1jb29raWVcIjtcbmltcG9ydCB7IGxlZGdlckNhbmlzdGVyIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtY2FuaXN0ZXJzL2Nqcy9sZWRnZXIuanNcIjtcbmltcG9ydCB7IHB3ckNhbmlzdGVyIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtY2FuaXN0ZXJzL2Nqcy9wd3IuanNcIjtcblxuaW1wb3J0IGF1dGhlbnRpY2F0aW9uIGZyb20gXCIuLi9hdXRoXCI7XG5cbmltcG9ydCB7XG4gIHByaW5jaXBhbFRvQWNjb3VudElkZW50aWZpZXIsXG4gIGdldFN1YkFjY291bnRBcnJheSxcbn0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL3Rva2VuLmpzXCI7XG5cbmltcG9ydCB7IEJpZ0ludFRvU3RyaW5nIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL2RhdGEuanNcIjtcblxuaW1wb3J0ICogYXMgQWNjb3VudElkZW50aWZpZXIgZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL2FjY291bnRpZGVudGlmaWVyLmpzXCI7XG5pbXBvcnQgeyBQcmluY2lwYWxGcm9tU2xvdCB9IGZyb20gXCJAdnZ2LWludGVyYWN0aXZlL25mdGFudmlsLXRvb2xzL2Nqcy9wcmluY2lwYWwuanNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBhZGRyZXNzOiBudWxsLFxuICBzdWJhY2NvdW50OiBudWxsLFxuICBwcmluY2lwYWw6IG51bGwsXG4gIGFub255bW91czogdHJ1ZSxcbiAgZm9jdXNlZDogdHJ1ZSxcbiAgaWNwOiBcIjBcIixcbiAgYW52OiBcIjBcIixcbiAgbWFwOiB7fSxcbiAgYWNjY2FuOiBcIlwiLFxuICBvcmFjbGU6IHtcbiAgICBpY3BDeWNsZXM6IFwiMTYwMDAwXCIsXG4gICAgaWNwRmVlOiBcIjEwMDAwXCIsXG4gICAgcHdyRmVlOiBcIjEwMDAwXCIsXG4gICAgYW52RmVlOiBcIjEwMDAwXCIsXG4gIH0sXG4gIHBybzogZmFsc2UsXG59O1xuXG5leHBvcnQgY29uc3QgdXNlclNsaWNlID0gY3JlYXRlU2xpY2Uoe1xuICBuYW1lOiBcInVzZXJcIixcbiAgaW5pdGlhbFN0YXRlLFxuICByZWR1Y2Vyczoge1xuICAgIHJlc2V0UmVkdWNlcjogKCkgPT4gaW5pdGlhbFN0YXRlLFxuICAgIGJhbGFuY2VzU2V0OiAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGljcDogYWN0aW9uLnBheWxvYWQuaWNwLFxuICAgICAgICBhbnY6IGFjdGlvbi5wYXlsb2FkLmFudixcbiAgICAgICAgb3JhY2xlOiBhY3Rpb24ucGF5bG9hZC5vcmFjbGUsXG4gICAgICB9O1xuICAgIH0sXG4gICAgZm9jdXNTZXQ6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZm9jdXNlZDogYWN0aW9uLnBheWxvYWQgfTtcbiAgICB9LFxuICAgIHByb1NldDogKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBwcm86IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgfTtcbiAgICB9LFxuXG4gICAgYXV0aFNldDogKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgIGNvbnN0IHsgYWRkcmVzcywgc3ViYWNjb3VudCwgcHJpbmNpcGFsLCBhbm9ueW1vdXMsIG1hcCwgYWNjY2FuIH0gPVxuICAgICAgICBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBwcmluY2lwYWwsXG4gICAgICAgIGFub255bW91cyxcbiAgICAgICAgc3ViYWNjb3VudCxcbiAgICAgICAgLi4uKG1hcCA/IHsgbWFwLCBhY2NjYW4gfSA6IHt9KSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBtYXBTZXQ6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWFwOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgIH07XG4gICAgfSxcbiAgfSxcbn0pO1xuXG4vLyBBY3Rpb24gY3JlYXRvcnMgYXJlIGdlbmVyYXRlZCBmb3IgZWFjaCBjYXNlIHJlZHVjZXIgZnVuY3Rpb25cbmV4cG9ydCBjb25zdCB7IHJlc2V0UmVkdWNlciwgcHJvU2V0LCBhdXRoU2V0LCBiYWxhbmNlc1NldCwgZm9jdXNTZXQsIG1hcFNldCB9ID1cbiAgdXNlclNsaWNlLmFjdGlvbnM7XG5cbmV4cG9ydCBjb25zdCB1c2VyX2xvZ2luID0gKCkgPT4gKGRpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHVzZXJfYXV0aChmYWxzZSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZXJfYXV0aCA9XG4gIChhbGxvd0Fub255bW91cyA9IHRydWUpID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBhd2FpdCBhdXRoZW50aWNhdGlvbi5jcmVhdGUoKTtcbiAgICBsZXQgYXV0aENsaWVudCA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudDtcblxuICAgIGlmICghYWxsb3dBbm9ueW1vdXMgJiYgIShhd2FpdCBhdXRoQ2xpZW50LmlzQXV0aGVudGljYXRlZCgpKSkge1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBhdXRoQ2xpZW50LmxvZ2luKHtcbiAgICAgICAgICAvL21heFRpbWVUb0xpdmU6IDEwMDAwMDAwMDAwbixcbiAgICAgICAgICAuLi4ocHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0lERU5USVRZX1BST1ZJREVSXG4gICAgICAgICAgICA/IHsgaWRlbnRpdHlQcm92aWRlcjogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0lERU5USVRZX1BST1ZJREVSIH1cbiAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgIG9uU3VjY2VzczogYXN5bmMgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGF1dGhDbGllbnQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FcnJvcjogcmVqZWN0LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgYXV0aENsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gICAgbGV0IHByaW5jaXBhbCA9IGlkZW50aXR5LmdldFByaW5jaXBhbCgpLnRvU3RyaW5nKCk7XG4gICAgbGV0IGFub255bW91cyA9ICEoYXdhaXQgYXV0aENsaWVudC5pc0F1dGhlbnRpY2F0ZWQoKSk7XG4gICAgbGV0IGFkZHJlc3MsIHN1YmFjY291bnQ7XG5cbiAgICBpZiAoIWFub255bW91cykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwMDA7IGkrKykge1xuICAgICAgICBsZXQgYyA9IHByaW5jaXBhbFRvQWNjb3VudElkZW50aWZpZXIocHJpbmNpcGFsLCBpKTtcblxuICAgICAgICBpZiAoYy5zdWJzdHJpbmcoMCwgMykgPT09IFwiYTAwXCIpIHtcbiAgICAgICAgICBhZGRyZXNzID0gYztcbiAgICAgICAgICBzdWJhY2NvdW50ID0gQWNjb3VudElkZW50aWZpZXIuQXJyYXlUb1RleHQoZ2V0U3ViQWNjb3VudEFycmF5KGkpKTtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKHN1YmFjY291bnQpO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcHJvID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvXCIpID09IFwidHJ1ZVwiO1xuICAgIGlmIChwcm8pIGRpc3BhdGNoKHByb1NldCh0cnVlKSk7XG5cbiAgICByb3V0ZXIuc2V0T3B0aW9ucyhwcm9jZXNzLmVudi5SRUFDVF9BUFBfUk9VVEVSX0NBTklTVEVSX0lELCB7XG4gICAgICBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpLFxuICAgIH0pO1xuXG4gICAgbGV0IG1hcCA9IGF3YWl0IHJvdXRlci5jb25maWdfZ2V0KCk7XG5cbiAgICBtYXAucm91dGVyID0gbWFwLnJvdXRlci50b1N0cmluZygpO1xuICAgIG1hcCA9IEJpZ0ludFRvU3RyaW5nKG1hcCk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlJPVVRFUiBNQVBcIiwgbWFwKTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5SRUFDVF9BUFBfTE9DQUxfQkFDS0VORCkge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiUHJveHkgY29tbWFuZDpcXG4gaWN4LXByb3h5IC0tYWRkcmVzcyAxMjcuMC4wLjE6ODQ1MyAtLWRucy1hbGlhcyBcIiArXG4gICAgICAgICAgbWFwLm5mdF9hdmFpbFxuICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgKHNsb3QpID0+XG4gICAgICAgICAgICAgICAgYCR7c2xvdH0ubHZoLm1lOiR7UHJpbmNpcGFsRnJvbVNsb3QobWFwLnNwYWNlLCBzbG90KS50b1RleHQoKX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuam9pbihcIiBcIilcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IGFjY2NhbiA9IGFkZHJlc3NcbiAgICAgID8gUHJpbmNpcGFsRnJvbVNsb3QoXG4gICAgICAgICAgbWFwLnNwYWNlLFxuICAgICAgICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb1Nsb3QoYWRkcmVzcywgbWFwLmFjY291bnQpXG4gICAgICAgICkudG9UZXh0KClcbiAgICAgIDogbnVsbDtcblxuICAgIGRpc3BhdGNoKFxuICAgICAgYXV0aFNldCh7IGFkZHJlc3MsIHN1YmFjY291bnQsIHByaW5jaXBhbCwgYW5vbnltb3VzLCBtYXAsIGFjY2NhbiB9KVxuICAgICk7XG4gICAgZGlzcGF0Y2godXNlcl9yZWZyZXNoX2JhbGFuY2VzKCkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdXNlcl9yZWZyZXNoX2NvbmZpZyA9ICgpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgbGV0IG1hcCA9IGF3YWl0IHJvdXRlci5jb25maWdfZ2V0KCk7XG4gIG1hcCA9IEJpZ0ludFRvU3RyaW5nKG1hcCk7XG4gIC8vIGNvbnNvbGUubG9nKFwiUk9VVEVSIE1BUFwiLCBtYXApO1xuICBkaXNwYXRjaChtYXBTZXQobWFwKSk7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlcl9yZWZyZXNoX2JhbGFuY2VzID0gKCkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBpZiAoIWF1dGhlbnRpY2F0aW9uIHx8ICFhdXRoZW50aWNhdGlvbi5jbGllbnQpIHJldHVybjtcbiAgaWYgKCEoYXdhaXQgYXV0aGVudGljYXRpb24uY2xpZW50LmlzQXV0aGVudGljYXRlZCgpKSkgcmV0dXJuO1xuICBhd2FpdCBkaXNwYXRjaCh1c2VyX3JlZnJlc2hfaWNwX2JhbGFuY2UoKSk7XG4gIGlmICghKGF3YWl0IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5pc0F1dGhlbnRpY2F0ZWQoKSkpIHJldHVybjtcbiAgZGlzcGF0Y2godXNlcl9yZWZyZXNoX3B3cl9iYWxhbmNlKCkpO1xuICBkaXNwYXRjaCh1c2VyX3Jlc3RvcmVfcHVyY2hhc2UoKSk7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlcl9sb2dvdXQgPSAoKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIHZhciBhdXRoQ2xpZW50ID0gYXdhaXQgQXV0aENsaWVudC5jcmVhdGUoKTtcblxuICBhdXRoQ2xpZW50LmxvZ291dCgpO1xuXG4gIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgYXV0aENsaWVudC5nZXRJZGVudGl0eSgpO1xuICByb3V0ZXIuc2V0T3B0aW9ucyhwcm9jZXNzLmVudi5SRUFDVF9BUFBfUk9VVEVSX0NBTklTVEVSX0lELCB7XG4gICAgYWdlbnRPcHRpb25zOiBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbiAgfSk7XG5cbiAgbGV0IHByaW5jaXBhbCA9IGlkZW50aXR5LmdldFByaW5jaXBhbCgpLnRvU3RyaW5nKCk7XG4gIGxldCBhbm9ueW1vdXMgPSAhKGF3YWl0IGF1dGhDbGllbnQuaXNBdXRoZW50aWNhdGVkKCkpO1xuXG4gIC8vZGlzcGF0Y2goYXV0aFNldCh7IGFkZHJlc3M6IG51bGwsIHByaW5jaXBhbCwgYW5vbnltb3VzIH0pKTtcblxuICBkaXNwYXRjaChyZXNldFJlZHVjZXIoKSk7XG4gIGRpc3BhdGNoKHVzZXJfYXV0aCgpKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VyX3JlZnJlc2hfaWNwX2JhbGFuY2UgPSAoKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gIGxldCBzID0gZ2V0U3RhdGUoKTtcblxuICBsZXQgYWRkcmVzcyA9IHMudXNlci5hZGRyZXNzO1xuICBpZiAoIWFkZHJlc3MpIHJldHVybjtcblxuICBsZXQgbGVkZ2VyID0gbGVkZ2VyQ2FuaXN0ZXIoe1xuICAgIGFnZW50T3B0aW9uczogYXV0aGVudGljYXRpb24uZ2V0QWdlbnRPcHRpb25zKCksXG4gIH0pO1xuXG4gIGF3YWl0IGxlZGdlclxuICAgIC5hY2NvdW50X2JhbGFuY2Uoe1xuICAgICAgYWNjb3VudDogQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkoYWRkcmVzcyksXG4gICAgfSlcbiAgICAudGhlbigoaWNwKSA9PiB7XG4gICAgICBsZXQgZThzID0gaWNwLmU4cztcblxuICAgICAgaWYgKGU4cyA+PSAzMDAwMG4pIHtcbiAgICAgICAgLy8gYXV0b21hdGljYWxseSB3cmFwIElDUFxuICAgICAgICBkaXNwYXRjaCh1c2VyX3B3cl9idXkoeyBhbW91bnQ6IGU4cyAtIDEwMDAwbiB9KSk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgIGlmICghcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0xPQ0FMX0JBQ0tFTkQpIGNvbnNvbGUubG9nKGUpOyAvLyBXaWxsIGFsd2F5cyBzaG93IGJ1ZyBpbiBkZXYgbW9kZSBiZWNhdXNlIHRoZXJlIGlzIGxlZGdlciBjYW5pc3RlciBvbiB0aGUgbG9jYWwgcmVwbGljYVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZXJfcmVmcmVzaF9wd3JfYmFsYW5jZSA9ICgpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgbGV0IGlkZW50aXR5ID0gYXV0aGVudGljYXRpb24uY2xpZW50LmdldElkZW50aXR5KCk7XG5cbiAgbGV0IHMgPSBnZXRTdGF0ZSgpO1xuXG4gIGxldCBhZGRyZXNzID0gcy51c2VyLmFkZHJlc3M7XG4gIGlmICghYWRkcmVzcykgcmV0dXJuO1xuXG4gIGxldCBwd3JjYW4gPSBwd3JDYW5pc3RlcihcbiAgICBQcmluY2lwYWxGcm9tU2xvdChcbiAgICAgIHMudXNlci5tYXAuc3BhY2UsXG4gICAgICBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9TbG90KGFkZHJlc3MsIHMudXNlci5tYXAucHdyKVxuICAgICksXG4gICAgeyBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpIH1cbiAgKTtcblxuICBhd2FpdCBwd3JjYW5cbiAgICAuYmFsYW5jZSh7XG4gICAgICB1c2VyOiB7IGFkZHJlc3M6IEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KGFkZHJlc3MpIH0sXG4gICAgfSlcbiAgICAudGhlbihhc3luYyAoeyBwd3IsIGFudiwgb3JhY2xlIH0pID0+IHtcbiAgICAgIC8vIGlmIChOdW1iZXIocHdyKSA9PT0gMCkge1xuICAgICAgLy8gICAvL1RPRE86IFJlbW92ZSBpbiBwcm9kdWN0aW9uXG4gICAgICAvLyAgIGxldCBmcmVzID0gYXdhaXQgcHdyY2FuLmZhdWNldCh7XG4gICAgICAvLyAgICAgYWlkOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSxcbiAgICAgIC8vICAgICBhbW91bnQ6IDgwMDAwMDAwMG4sXG4gICAgICAvLyAgIH0pO1xuICAgICAgLy8gICBkaXNwYXRjaChyZWZyZXNoX3B3cl9iYWxhbmNlKCkpO1xuICAgICAgLy8gICByZXR1cm47XG4gICAgICAvLyB9XG5cbiAgICAgIG9yYWNsZSA9IEJpZ0ludFRvU3RyaW5nKG9yYWNsZSk7XG4gICAgICBkaXNwYXRjaChcbiAgICAgICAgYmFsYW5jZXNTZXQoeyBpY3A6IHB3ci50b1N0cmluZygpLCBhbnY6IGFudi50b1N0cmluZygpLCBvcmFjbGUgfSlcbiAgICAgICk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgIC8vIFdlIGFyZSBtb3N0IHByb2JhYmx5IGxvZ2dlZCBvdXQuIFRoZXJlIGlzIGN1cnJlbnRseSBubyBiZXR0ZXIgd2F5IHRvIGhhbmRsZSBleHBpcmVkIGFnZW50anMgY2hhaW5cbiAgICAgIGlmIChlLnRvU3RyaW5nKCkuaW5jbHVkZXMoXCJkZWxlZ2F0aW9uIGhhcyBleHBpcmVkXCIpKVxuICAgICAgICBkaXNwYXRjaCh1c2VyX2xvZ291dCgpKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VyX3B3cl90cmFuc2ZlciA9XG4gICh7IHRvLCBhbW91bnQsIG1lbW8gPSBbXSB9KSA9PlxuICBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgbGV0IGlkZW50aXR5ID0gYXV0aGVudGljYXRpb24uY2xpZW50LmdldElkZW50aXR5KCk7XG5cbiAgICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgICBsZXQgYWRkcmVzcyA9IHMudXNlci5hZGRyZXNzO1xuICAgIGxldCBzdWJhY2NvdW50ID0gW1xuICAgICAgQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkocy51c2VyLnN1YmFjY291bnQpIHx8IG51bGwsXG4gICAgXS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICBsZXQgcHdyID0gcHdyQ2FuaXN0ZXIoXG4gICAgICBQcmluY2lwYWxGcm9tU2xvdChcbiAgICAgICAgcy51c2VyLm1hcC5zcGFjZSxcbiAgICAgICAgQWNjb3VudElkZW50aWZpZXIuVGV4dFRvU2xvdChhZGRyZXNzLCBzLnVzZXIubWFwLnB3cilcbiAgICAgICksXG4gICAgICB7XG4gICAgICAgIGFnZW50T3B0aW9uczogYXV0aGVudGljYXRpb24uZ2V0QWdlbnRPcHRpb25zKCksXG4gICAgICB9XG4gICAgKTtcblxuICAgIGxldCB0cmV6ID0gYXdhaXQgcHdyLnB3cl90cmFuc2Zlcih7XG4gICAgICBhbW91bnQsXG4gICAgICBmcm9tOiB7IGFkZHJlc3M6IEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KGFkZHJlc3MpIH0sXG4gICAgICB0bzogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheSh0bykgfSxcbiAgICAgIHN1YmFjY291bnQ6IHN1YmFjY291bnQsXG4gICAgICBtZW1vLFxuICAgIH0pO1xuXG4gICAgaWYgKCEoXCJva1wiIGluIHRyZXopKSB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkodHJleikpO1xuXG4gICAgZGlzcGF0Y2godXNlcl9yZWZyZXNoX2JhbGFuY2VzKCkpO1xuXG4gICAgcmV0dXJuIHRyZXo7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB1c2VyX3RyYW5zZmVyX2ljcCA9XG4gICh7IHRvLCBhbW91bnQgfSkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gICAgbGV0IHMgPSBnZXRTdGF0ZSgpO1xuXG4gICAgbGV0IGFkZHJlc3MgPSBzLnVzZXIuYWRkcmVzcztcbiAgICBsZXQgc3ViYWNjb3VudCA9IFtcbiAgICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KHMudXNlci5zdWJhY2NvdW50KSB8fCBudWxsLFxuICAgIF0uZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgbGV0IHB3ciA9IHB3ckNhbmlzdGVyKFxuICAgICAgUHJpbmNpcGFsRnJvbVNsb3QoXG4gICAgICAgIHMudXNlci5tYXAuc3BhY2UsXG4gICAgICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb1Nsb3QoYWRkcmVzcywgcy51c2VyLm1hcC5wd3IpXG4gICAgICApLFxuICAgICAge1xuICAgICAgICBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpLFxuICAgICAgfVxuICAgICk7XG5cbiAgICBsZXQgdHJleiA9IGF3YWl0IHB3ci5wd3Jfd2l0aGRyYXcoe1xuICAgICAgYW1vdW50LFxuICAgICAgZnJvbTogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSB9LFxuICAgICAgdG86IHsgYWRkcmVzczogQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkodG8pIH0sXG4gICAgICBzdWJhY2NvdW50OiBzdWJhY2NvdW50LFxuICAgIH0pO1xuXG4gICAgaWYgKCEoXCJva1wiIGluIHRyZXopKSB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkodHJleikpO1xuXG4gICAgZGlzcGF0Y2godXNlcl9yZWZyZXNoX2JhbGFuY2VzKCkpO1xuXG4gICAgcmV0dXJuIHRyZXo7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB1c2VyX3B3cl9idXkgPVxuICAoeyBhbW91bnQgfSkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGxldCBzID0gZ2V0U3RhdGUoKTtcblxuICAgIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuICAgIGxldCBhZGRyZXNzID0gcy51c2VyLmFkZHJlc3M7XG5cbiAgICBsZXQgcHdyID0gcHdyQ2FuaXN0ZXIoXG4gICAgICBQcmluY2lwYWxGcm9tU2xvdChcbiAgICAgICAgcy51c2VyLm1hcC5zcGFjZSxcbiAgICAgICAgQWNjb3VudElkZW50aWZpZXIuVGV4dFRvU2xvdChhZGRyZXNzLCBzLnVzZXIubWFwLnB3cilcbiAgICAgICksXG4gICAgICB7XG4gICAgICAgIGFnZW50T3B0aW9uczogYXV0aGVudGljYXRpb24uZ2V0QWdlbnRPcHRpb25zKCksXG4gICAgICB9XG4gICAgKTtcblxuICAgIGxldCBzdWJhY2NvdW50ID0gW1xuICAgICAgQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkocy51c2VyLnN1YmFjY291bnQpIHx8IG51bGwsXG4gICAgXS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICBsZXQgaW50ZW50ID0gYXdhaXQgcHdyLnB3cl9wdXJjaGFzZV9pbnRlbnQoe1xuICAgICAgdXNlcjogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSB9LFxuICAgICAgc3ViYWNjb3VudCxcbiAgICB9KTtcbiAgICBpZiAoaW50ZW50LmVycikgdGhyb3cgaW50ZW50LmVycjtcblxuICAgIGxldCBwYXltZW50QWRkcmVzcyA9IGludGVudC5vaztcblxuICAgIGxldCBsZWRnZXIgPSBsZWRnZXJDYW5pc3Rlcih7XG4gICAgICBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpLFxuICAgIH0pO1xuXG4gICAgbGV0IGxlZGdlcl9yZXN1bHQgPSBhd2FpdCBsZWRnZXIudHJhbnNmZXIoe1xuICAgICAgbWVtbzogMCxcbiAgICAgIGFtb3VudDogeyBlOHM6IGFtb3VudCB9LFxuICAgICAgZmVlOiB7IGU4czogMTAwMDBuIH0sXG4gICAgICBmcm9tX3N1YmFjY291bnQ6IHN1YmFjY291bnQsXG4gICAgICB0bzogcGF5bWVudEFkZHJlc3MsXG4gICAgICBjcmVhdGVkX2F0X3RpbWU6IFtdLFxuICAgIH0pO1xuXG4gICAgaWYgKGxlZGdlcl9yZXN1bHQuT2spIHtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihsZWRnZXJfcmVzdWx0LkVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBjbGFpbSA9IGF3YWl0IHB3ci5wd3JfcHVyY2hhc2VfY2xhaW0oe1xuICAgICAgICB1c2VyOiB7IGFkZHJlc3M6IEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KGFkZHJlc3MpIH0sXG4gICAgICAgIHN1YmFjY291bnQsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGNsYWltLmVycikgdGhyb3cgY2xhaW0uZXJyO1xuXG4gICAgICBsZXQgeyB0cmFuc2FjdGlvbklkIH0gPSBjbGFpbS5vaztcbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgZGlzcGF0Y2godXNlcl9yZWZyZXNoX2JhbGFuY2VzKCkpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgdXNlcl9yZXN0b3JlX3B1cmNoYXNlID0gKCkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgbGV0IGlkZW50aXR5ID0gYXV0aGVudGljYXRpb24uY2xpZW50LmdldElkZW50aXR5KCk7XG5cbiAgbGV0IGFkZHJlc3MgPSBzLnVzZXIuYWRkcmVzcztcblxuICBsZXQgcHdyID0gcHdyQ2FuaXN0ZXIoXG4gICAgUHJpbmNpcGFsRnJvbVNsb3QoXG4gICAgICBzLnVzZXIubWFwLnNwYWNlLFxuICAgICAgQWNjb3VudElkZW50aWZpZXIuVGV4dFRvU2xvdChhZGRyZXNzLCBzLnVzZXIubWFwLnB3cilcbiAgICApLFxuICAgIHtcbiAgICAgIGFnZW50T3B0aW9uczogYXV0aGVudGljYXRpb24uZ2V0QWdlbnRPcHRpb25zKCksXG4gICAgfVxuICApO1xuXG4gIGxldCBzdWJhY2NvdW50ID0gW1xuICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KHMudXNlci5zdWJhY2NvdW50KSB8fCBudWxsLFxuICBdLmZpbHRlcihCb29sZWFuKTtcblxuICB0cnkge1xuICAgIGxldCBjbGFpbSA9IGF3YWl0IHB3ci5wd3JfcHVyY2hhc2VfY2xhaW0oe1xuICAgICAgdXNlcjogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSB9LFxuICAgICAgc3ViYWNjb3VudCxcbiAgICB9KTtcblxuICAgIGlmIChjbGFpbS5lcnIpIHRocm93IGNsYWltLmVycjtcblxuICAgIGxldCB7IHRyYW5zYWN0aW9uSWQgfSA9IGNsYWltLm9rO1xuXG4gICAgZGlzcGF0Y2godXNlcl9yZWZyZXNoX3B3cl9iYWxhbmNlKCkpO1xuICB9IGNhdGNoIChlKSB7fVxufTtcblxuZXhwb3J0IGNvbnN0IHdpbmRvd19mb2N1cyA9ICgpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgZGlzcGF0Y2goZm9jdXNTZXQodHJ1ZSkpO1xuICBkaXNwYXRjaCh1c2VyX3JlZnJlc2hfYmFsYW5jZXMoKSk7XG59O1xuXG5leHBvcnQgY29uc3Qgd2luZG93X2JsdXIgPSAoKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGRpc3BhdGNoKGZvY3VzU2V0KGZhbHNlKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VyU2xpY2UucmVkdWNlcjtcbiJdfQ==
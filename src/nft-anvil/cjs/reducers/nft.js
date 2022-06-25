"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nft_use = exports.nft_unsocket = exports.nft_transfer_link = exports.nft_transfer = exports.nft_set_price = exports.nft_recharge_quote = exports.nft_recharge = exports.nft_purchase = exports.nft_plug = exports.nft_mint_quote = exports.nft_mint = exports.nft_media_get = exports.nft_fetch = exports.nft_enter_code = exports.nft_claim_link = exports.nft_burn = exports.nft_approve = exports.nftSlice = exports.nftSet = exports.default = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _auth = _interopRequireDefault(require("../auth"));

var _token = require("@vvv-interactive/nftanvil-tools/cjs/token.js");

var _nft = require("@vvv-interactive/nftanvil-canisters/cjs/nft.js");

var _data = require("@vvv-interactive/nftanvil-tools/cjs/data.js");

var AccountIdentifier = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js"));

var TransactionId = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/transactionid.js"));

var _principal = require("@vvv-interactive/nftanvil-tools/cjs/principal.js");

var _pricing = require("@vvv-interactive/nftanvil-tools/cjs/pricing.js");

var _pwr = require("@vvv-interactive/nftanvil-canisters/cjs/pwr.js");

var _user = require("./user");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global BigInt */
const nftSlice = (0, _toolkit.createSlice)({
  name: "nft",
  initialState: {},
  reducers: {
    nftSet: (state, action) => {
      return { ...state,
        [action.payload.id]: action.payload.meta
      };
    }
  }
});
exports.nftSlice = nftSlice;
const {
  nftSet
} = nftSlice.actions;
exports.nftSet = nftSet;

const nft_fetch = id => async (dispatch, getState) => {
  var _meta$content, _meta$content2;

  let identity = _auth.default.client.getIdentity();

  let s = getState();
  let tid = (0, _token.tokenFromText)(id);
  let {
    index,
    slot
  } = (0, _token.decodeTokenId)(tid);
  let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
  let nftcan = (0, _nft.nftCanister)(canister, {
    agentOptions: _auth.default.getAgentOptions()
  });
  let resp = await nftcan.metadata(tid);
  if (!resp) throw Error("Can't fetch NFT meta");
  if (resp.err) throw Error("Fetching NFT meta error " + JSON.stringify(resp.err));
  let {
    bearer,
    data,
    vars
  } = resp.ok;
  let now = Math.ceil(Date.now() / 1000 / 60);
  let meta = {
    bearer: AccountIdentifier.ArrayToText(bearer),
    // inherant
    tokenIndex: index,
    canister,
    // data
    domain: data.domain[0],
    // use: data.use[0],
    // hold: data.hold[0],
    thumb: data.thumb,
    content: data.content[0],
    created: data.created,
    quality: data.quality,
    lore: data.lore[0],
    name: data.name[0],
    custom: data.custom.length,
    author: AccountIdentifier.ArrayToText(data.author),
    secret: data.secret,
    entropy: data.entropy,
    attributes: data.attributes,
    transfer: data.transfer,
    authorShare: data.authorShare,
    tags: data.tags,
    //vars
    ttl: vars.ttl[0],
    cooldownUntil: vars.cooldownUntil[0],
    boundUntil: vars.boundUntil[0],
    pwr: [vars.pwrOps.toString(), vars.pwrStorage.toString()],
    sockets: vars.sockets.map(x => (0, _token.tokenToText)(x)),
    //TokenIdentifier.ArrayToText(x)),
    price: { ...vars.price,
      amount: vars.price.amount.toString()
    },
    history: vars.history,
    rechargeable: data.rechargeable
  };
  meta.transferable = meta.transfer.unrestricted === null || meta.transfer.bindsDuration && meta.boundUntil < now;
  if (meta.thumb.internal) meta.thumb.internal.url = (0, _token.tokenUrl)(s.user.map.space, tid, "thumb");
  if (meta.thumb.ipfs) meta.thumb.ipfs.url = (0, _token.ipfsTokenUrl)(meta.thumb.ipfs.cid);
  let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);

  if ((_meta$content = meta.content) !== null && _meta$content !== void 0 && _meta$content.internal) {
    if (meta.secret) meta.content.internal.url = await nft_media_get(s, {
      id,
      contentType: meta.content.internal.contentType,
      size: meta.content.internal.size,
      position: "content",
      subaccount
    });else meta.content.internal.url = (0, _token.tokenUrl)(s.user.map.space, tid, "content");
  }

  if ((_meta$content2 = meta.content) !== null && _meta$content2 !== void 0 && _meta$content2.ipfs) meta.content.ipfs.url = (0, _token.ipfsTokenUrl)(meta.content.ipfs.cid);
  dispatch(nftSet({
    id,
    meta
  }));
  return meta;
};

exports.nft_fetch = nft_fetch;

const nft_media_get = async (s, _ref) => {
  let {
    id,
    contentType,
    size,
    position,
    subaccount = false
  } = _ref;

  let identity = _auth.default.client.getIdentity();

  let tid = (0, _token.tokenFromText)(id);
  let {
    index,
    slot
  } = (0, _token.decodeTokenId)(tid);
  let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
  let nftcan = (0, _nft.nftCanister)(canister, {
    agentOptions: _auth.default.getAgentOptions()
  });
  let src = await nft_fetch_file(nftcan, size, contentType, index, position, subaccount);
  return src;
};

exports.nft_media_get = nft_media_get;

const nft_fetch_file = async function (nft, size, contentType, tokenIndex, position) {
  let subaccount = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let chunkSize = 1024 * 512;
  let chunks = Math.ceil(size / chunkSize);
  return await Promise.all(Array(chunks).fill(0).map((_, chunkIdx) => {
    return nft.fetch_chunk({
      tokenIndex,
      chunkIdx,
      position: {
        [position]: null
      },
      subaccount: subaccount ? subaccount : []
    });
  })).then(chunks => {
    const blob = new Blob(chunks.map(chunk => {
      return new Uint8Array(chunk[0]).buffer;
    }), {
      type: contentType
    });
    return URL.createObjectURL(blob);
  });
};

const nft_purchase = _ref2 => {
  let {
    id,
    amount,
    affiliate = []
  } = _ref2;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let tid = (0, _token.tokenFromText)(id);
    let {
      slot
    } = (0, _token.decodeTokenId)(tid);
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    console.log("BUYING", id, amount);
    let pwr = (0, _pwr.pwrCanister)((0, _principal.PrincipalFromSlot)(s.user.map.space, AccountIdentifier.TextToSlot(address, s.user.map.pwr)), {
      agentOptions: _auth.default.getAgentOptions()
    });
    let prez = await pwr.nft_purchase(BigInt(slot), {
      token: (0, _token.tokenFromText)(id),
      user: {
        address: AccountIdentifier.TextToArray(address)
      },
      subaccount,
      affiliate,
      amount
    });
    if (prez.err) throw new Error(JSON.stringify(prez.err));
    dispatch((0, _user.user_refresh_balances)());
    dispatch(nft_fetch(id));
    console.log("purchase result", prez);
  };
}; // export const nft_purchase_intent =
//   ({ id }) =>
//   async (dispatch, getState) => {
//     let s = getState();
//     let identity = authentication.client.getIdentity();
//     let tid = tokenFromText(id);
//     let { slot } = decodeTokenId(tid);
//     //console.log("t", id, slot, tokenFromText(id));
//     let canister = PrincipalFromSlot(s.user.map.space, slot).toText();
//     let nftcan = nftCanister(canister, {
//       agentOptions: authentication.getAgentOptions(),
//     });
//     let address = s.user.address;
//     let subaccount = [
//       AccountIdentifier.TextToArray(s.user.subaccount) || null,
//     ].filter(Boolean);
//     let t = await nftcan.purchase_intent({
//       user: { address: AccountIdentifier.TextToArray(address) },
//       token: tokenFromText(id),
//       subaccount,
//     });
//     if (!("ok" in t)) throw t;
//     return t.ok;
//   };


exports.nft_purchase = nft_purchase;

const nft_set_price = _ref3 => {
  let {
    id,
    price
  } = _ref3;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let tid = (0, _token.tokenFromText)(id);
    let {
      slot
    } = (0, _token.decodeTokenId)(tid);
    console.log("Setting price", id, {
      slot
    });
    let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
    let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let t = await nftcan.set_price({
      user: {
        address: AccountIdentifier.TextToArray(address)
      },
      token: tid,
      price: price,
      subaccount
    });
    if (!("ok" in t)) throw new Error(JSON.stringify(t.err));
    dispatch(nft_fetch(id));
  };
};

exports.nft_set_price = nft_set_price;

const nft_transfer = _ref4 => {
  let {
    id,
    toAddress
  } = _ref4;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let tid = (0, _token.tokenFromText)(id);
    let {
      slot
    } = (0, _token.decodeTokenId)(tid);
    let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
    let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let t = await nftcan.transfer({
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
    });
    if (!t.ok) throw new Error(JSON.stringify(t.err));
    let {
      transactionId
    } = t.ok;
    dispatch(nft_fetch(id));
    return t;
  };
};

exports.nft_transfer = nft_transfer;

const nft_plug = _ref5 => {
  let {
    plug_id,
    socket_id
  } = _ref5;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let {
      slot
    } = (0, _token.decodeTokenId)((0, _token.tokenFromText)(plug_id));
    let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
    let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let t = await nftcan.plug({
      user: {
        address: AccountIdentifier.TextToArray(address)
      },
      subaccount,
      plug: (0, _token.tokenFromText)(plug_id),
      socket: (0, _token.tokenFromText)(socket_id),
      memo: []
    });
    if (!t.ok) throw t.err;
    dispatch(nft_fetch(plug_id));
    dispatch(nft_fetch(socket_id));
    return t.ok;
  };
};

exports.nft_plug = nft_plug;

const nft_unsocket = _ref6 => {
  let {
    plug_id,
    socket_id
  } = _ref6;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let {
      slot
    } = (0, _token.decodeTokenId)((0, _token.tokenFromText)(socket_id));
    let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
    let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let t = await nftcan.unsocket({
      user: {
        address: AccountIdentifier.TextToArray(address)
      },
      subaccount,
      plug: (0, _token.tokenFromText)(plug_id),
      socket: (0, _token.tokenFromText)(socket_id),
      memo: []
    });
    if (!t.ok) throw t.err;
    dispatch(nft_fetch(plug_id));
    dispatch(nft_fetch(socket_id));
    return t.ok;
  };
};

exports.nft_unsocket = nft_unsocket;

const nft_recharge = _ref7 => {
  let {
    id,
    amount
  } = _ref7;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let tid = (0, _token.tokenFromText)(id);
    let {
      slot
    } = (0, _token.decodeTokenId)(tid); // let canister = PrincipalFromSlot(s.user.map.space, slot).toText();

    let address = s.user.address; // let nftcan = nftCanister(canister, { agentOptions: authentication.getAgentOptions() });

    let pwr = (0, _pwr.pwrCanister)((0, _principal.PrincipalFromSlot)(s.user.map.space, AccountIdentifier.TextToSlot(address, s.user.map.pwr)), {
      agentOptions: _auth.default.getAgentOptions()
    });
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let t;

    try {
      let t = await pwr.nft_recharge(slot, {
        user: {
          address: AccountIdentifier.TextToArray(address)
        },
        token: tid,
        subaccount,
        amount
      });
      if (!("ok" in t)) throw t.err;
      let {
        transactionId
      } = {
        transactionId: 0
      }; //t.ok;

      dispatch((0, _user.user_refresh_balances)());
      dispatch(nft_fetch(id));
      return t.ok;
    } catch (e) {
      console.error("Recharge error", e);
    }
  };
};

exports.nft_recharge = nft_recharge;

const nft_burn = _ref8 => {
  let {
    id
  } = _ref8;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let tid = (0, _token.tokenFromText)(id);
    let {
      slot
    } = (0, _token.decodeTokenId)(tid);
    let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
    let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let rez = await nftcan.burn({
      user: {
        address: AccountIdentifier.TextToArray(address)
      },
      token: tid,
      amount: 1,
      memo: [],
      subaccount
    });
    if (rez.err) throw rez.err;
    dispatch((0, _user.user_refresh_balances)());
    let {
      transactionId
    } = rez.ok;
    return rez.ok;
  };
};

exports.nft_burn = nft_burn;

const nft_approve = _ref9 => {
  let {
    id,
    spender
  } = _ref9;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let tid = (0, _token.tokenFromText)(id);
    let {
      slot
    } = (0, _token.decodeTokenId)(tid);
    let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
    let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let rez = await nftcan.approve({
      token: tid,
      allowance: 1,
      subaccount,
      spender
    });
    if (rez.err) throw rez.err;
    dispatch(nft_fetch(id));
    return rez.ok;
  };
};

exports.nft_approve = nft_approve;

const nft_use = _ref10 => {
  let {
    id,
    use,
    memo
  } = _ref10;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let tid = (0, _token.tokenFromText)(id);
    let {
      slot
    } = (0, _token.decodeTokenId)(tid);
    let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
    let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let r = await nftcan.use({
      user: {
        address: AccountIdentifier.TextToArray(address)
      },
      token: tid,
      memo,
      use,
      subaccount,
      customVar: []
    });
    if (!r.ok) throw r.err;
    dispatch((0, _user.user_refresh_balances)());
    dispatch(nft_fetch(id));
    return r.ok;
  };
};

exports.nft_use = nft_use;

const nft_transfer_link = _ref11 => {
  let {
    id
  } = _ref11;
  return async (dispatch, getState) => {
    let s = getState();

    let identity = _auth.default.client.getIdentity();

    let tid = (0, _token.tokenFromText)(id);
    let {
      index,
      slot
    } = (0, _token.decodeTokenId)(tid);
    let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot).toText();
    let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });
    let address = s.user.address;
    let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
    let {
      key,
      hash
    } = (0, _data.generateKeyHashPair)();
    let rez = await nftcan.transfer_link({
      from: {
        address: AccountIdentifier.TextToArray(address)
      },
      hash: Array.from(hash),
      token: tid,
      subaccount
    });
    if (rez.err) throw rez.err;
    let code = (0, _data.encodeLink)(slot, index, key);
    return code;
  };
};

exports.nft_transfer_link = nft_transfer_link;

const nft_claim_link = _ref12 => {
  let {
    code
  } = _ref12;
  return async (dispatch, getState) => {
    let s = getState();
    let {
      slot,
      tokenIndex,
      key
    } = (0, _data.decodeLink)(code);
    let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot);

    let identity = _auth.default.client.getIdentity();

    let nftcan = (0, _nft.nftCanister)(canister, {
      agentOptions: _auth.default.getAgentOptions()
    });
    let address = s.user.address;
    let tid = (0, _token.encodeTokenId)(slot, tokenIndex);
    let resp = await nftcan.claim_link({
      to: {
        address: AccountIdentifier.TextToArray(address)
      },
      key: Array.from(key),
      token: tid
    });
    dispatch(nft_fetch((0, _token.tokenToText)(tid)));
    return resp;
  };
};

exports.nft_claim_link = nft_claim_link;

const nft_enter_code = code => async (dispatch, getState) => {
  let s = getState();
  let {
    slot,
    tokenIndex
  } = (0, _data.decodeLink)(code);
  if (!s.user.map.space) throw Error("Map not loaded");
  let canister = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot);
  let id = (0, _token.encodeTokenId)(slot, tokenIndex);
  return "/" + (0, _token.tokenToText)(id) + "/" + code;
};

exports.nft_enter_code = nft_enter_code;

const nft_recharge_quote = _ref13 => {
  let {
    id
  } = _ref13;
  return async (dispatch, getState) => {
    let s = getState();
    const icpCycles = BigInt(s.user.oracle.icpCycles);
    let nft = s.nft[id];
    const ops = (0, _pricing.priceOps)({
      ttl: null
    }) / icpCycles;
    const transfer = BigInt(s.user.oracle.pwrFee);
    const storage = (0, _pricing.priceStorage)({
      custom: nft.custom || 0,
      content: nft.content,
      thumb: nft.thumb,
      quality: nft.quality,
      ttl: null
    }) / icpCycles;
    let full = ops + transfer + storage;
    let current = BigInt(nft.pwr[0]) + BigInt(nft.pwr[1]);
    let diff = full - current + BigInt(s.user.oracle.pwrFee);
    if (diff < 30000n) diff = 0n; //console.log({ full, current, diff });

    return diff;
  };
};

exports.nft_recharge_quote = nft_recharge_quote;

const nft_mint_quote = vals => async (dispatch, getState) => {
  let s = getState();
  const icpCycles = BigInt(s.user.oracle.icpCycles);
  const transfer = BigInt(s.user.oracle.pwrFee);
  const ops = (0, _pricing.priceOps)({
    ttl: vals.ttl
  }) / icpCycles;
  const storage = (0, _pricing.priceStorage)({
    custom: 0,
    //NOTE: this frontend doesn't support custom data. If someone wants to add such, it should be done with scripts
    content: vals.content,
    thumb: vals.thumb,
    quality: vals.quality,
    ttl: vals.ttl
  }) / icpCycles;
  return {
    transfer,
    ops,
    storage
  };
};

exports.nft_mint_quote = nft_mint_quote;

const nft_mint = vals => async (dispatch, getState) => {
  let s = getState();
  const key_nftstorage = s.user.key_nftstorage;
  let available = s.user.map.nft_avail;
  let slot = available[Math.floor(Math.random() * available.length)];
  let canisterId = (0, _principal.PrincipalFromSlot)(s.user.map.space, slot);

  let identity = _auth.default.client.getIdentity();

  let address = s.user.address;
  let nft = (0, _nft.nftCanister)(canisterId, {
    agentOptions: _auth.default.getAgentOptions()
  });
  let pwr = (0, _pwr.pwrCanister)((0, _principal.PrincipalFromSlot)(s.user.map.space, AccountIdentifier.TextToSlot(address, s.user.map.pwr)), {
    agentOptions: _auth.default.getAgentOptions()
  }); // console.log(
  //   "PWR Canister",
  //   PrincipalFromSlot(
  //     s.user.map.space,
  //     AccountIdentifier.TextToSlot(address, s.user.map.pwr)
  //   ).toText()
  // );
  // console.log(
  //   "NFT Canister",
  //   PrincipalFromSlot(s.user.map.space, slot).toText()
  // );

  let subaccount = [AccountIdentifier.TextToArray(s.user.subaccount) || null].filter(Boolean);
  if (!address) throw Error("Annonymous cant mint"); // Wont let annonymous mint

  try {
    var _mrez$err, _mrez$err2, _vals$content$, _vals$content$$intern, _vals$thumb, _vals$thumb$internal;

    // console.log("mint vals", slot, vals);
    let mrez = await pwr.nft_mint(BigInt(slot), {
      user: {
        address: AccountIdentifier.TextToArray(address)
      },
      subaccount,
      metadata: vals
    });

    if ((mrez === null || mrez === void 0 ? void 0 : (_mrez$err = mrez.err) === null || _mrez$err === void 0 ? void 0 : _mrez$err.OutOfMemory) === null) {
      await dispatch((0, _user.user_refresh_config)());
      await dispatch(nft_mint(vals));
      return;
    }

    if ((mrez === null || mrez === void 0 ? void 0 : (_mrez$err2 = mrez.err) === null || _mrez$err2 === void 0 ? void 0 : _mrez$err2.InsufficientBalance) === null) {
      throw Error("Insufficient Balance");
    } // console.log("REZ", mrez);


    if (!("ok" in mrez)) throw Error(JSON.stringify(mrez.err));
    let {
      tokenIndex,
      transactionId
    } = mrez.ok;
    let id = (0, _token.tokenToText)((0, _token.encodeTokenId)(slot, tokenIndex));

    if (vals !== null && vals !== void 0 && (_vals$content$ = vals.content[0]) !== null && _vals$content$ !== void 0 && (_vals$content$$intern = _vals$content$.internal) !== null && _vals$content$$intern !== void 0 && _vals$content$$intern.url) {
      await (0, _data.uploadFile)(nft, tokenIndex, "content", await (0, _data.chunkBlob)(vals.content[0].internal.url), subaccount);
    }

    if (vals !== null && vals !== void 0 && (_vals$thumb = vals.thumb) !== null && _vals$thumb !== void 0 && (_vals$thumb$internal = _vals$thumb.internal) !== null && _vals$thumb$internal !== void 0 && _vals$thumb$internal.url) {
      await (0, _data.uploadFile)(nft, tokenIndex, "thumb", await (0, _data.chunkBlob)(vals.thumb.internal.url), subaccount);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }

  dispatch((0, _user.user_refresh_balances)());
};

exports.nft_mint = nft_mint;
var _default = nftSlice.reducer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9uZnQuanMiXSwibmFtZXMiOlsibmZ0U2xpY2UiLCJuYW1lIiwiaW5pdGlhbFN0YXRlIiwicmVkdWNlcnMiLCJuZnRTZXQiLCJzdGF0ZSIsImFjdGlvbiIsInBheWxvYWQiLCJpZCIsIm1ldGEiLCJhY3Rpb25zIiwibmZ0X2ZldGNoIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImlkZW50aXR5IiwiYXV0aGVudGljYXRpb24iLCJjbGllbnQiLCJnZXRJZGVudGl0eSIsInMiLCJ0aWQiLCJpbmRleCIsInNsb3QiLCJjYW5pc3RlciIsInVzZXIiLCJtYXAiLCJzcGFjZSIsInRvVGV4dCIsIm5mdGNhbiIsImFnZW50T3B0aW9ucyIsImdldEFnZW50T3B0aW9ucyIsInJlc3AiLCJtZXRhZGF0YSIsIkVycm9yIiwiZXJyIiwiSlNPTiIsInN0cmluZ2lmeSIsImJlYXJlciIsImRhdGEiLCJ2YXJzIiwib2siLCJub3ciLCJNYXRoIiwiY2VpbCIsIkRhdGUiLCJBY2NvdW50SWRlbnRpZmllciIsIkFycmF5VG9UZXh0IiwidG9rZW5JbmRleCIsImRvbWFpbiIsInRodW1iIiwiY29udGVudCIsImNyZWF0ZWQiLCJxdWFsaXR5IiwibG9yZSIsImN1c3RvbSIsImxlbmd0aCIsImF1dGhvciIsInNlY3JldCIsImVudHJvcHkiLCJhdHRyaWJ1dGVzIiwidHJhbnNmZXIiLCJhdXRob3JTaGFyZSIsInRhZ3MiLCJ0dGwiLCJjb29sZG93blVudGlsIiwiYm91bmRVbnRpbCIsInB3ciIsInB3ck9wcyIsInRvU3RyaW5nIiwicHdyU3RvcmFnZSIsInNvY2tldHMiLCJ4IiwicHJpY2UiLCJhbW91bnQiLCJoaXN0b3J5IiwicmVjaGFyZ2VhYmxlIiwidHJhbnNmZXJhYmxlIiwidW5yZXN0cmljdGVkIiwiYmluZHNEdXJhdGlvbiIsImludGVybmFsIiwidXJsIiwiaXBmcyIsImNpZCIsInN1YmFjY291bnQiLCJUZXh0VG9BcnJheSIsImZpbHRlciIsIkJvb2xlYW4iLCJuZnRfbWVkaWFfZ2V0IiwiY29udGVudFR5cGUiLCJzaXplIiwicG9zaXRpb24iLCJzcmMiLCJuZnRfZmV0Y2hfZmlsZSIsIm5mdCIsImNodW5rU2l6ZSIsImNodW5rcyIsIlByb21pc2UiLCJhbGwiLCJBcnJheSIsImZpbGwiLCJfIiwiY2h1bmtJZHgiLCJmZXRjaF9jaHVuayIsInRoZW4iLCJibG9iIiwiQmxvYiIsImNodW5rIiwiVWludDhBcnJheSIsImJ1ZmZlciIsInR5cGUiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJuZnRfcHVyY2hhc2UiLCJhZmZpbGlhdGUiLCJhZGRyZXNzIiwiY29uc29sZSIsImxvZyIsIlRleHRUb1Nsb3QiLCJwcmV6IiwiQmlnSW50IiwidG9rZW4iLCJuZnRfc2V0X3ByaWNlIiwidCIsInNldF9wcmljZSIsIm5mdF90cmFuc2ZlciIsInRvQWRkcmVzcyIsImZyb20iLCJ0byIsIm1lbW8iLCJ0cmFuc2FjdGlvbklkIiwibmZ0X3BsdWciLCJwbHVnX2lkIiwic29ja2V0X2lkIiwicGx1ZyIsInNvY2tldCIsIm5mdF91bnNvY2tldCIsInVuc29ja2V0IiwibmZ0X3JlY2hhcmdlIiwiZSIsImVycm9yIiwibmZ0X2J1cm4iLCJyZXoiLCJidXJuIiwibmZ0X2FwcHJvdmUiLCJzcGVuZGVyIiwiYXBwcm92ZSIsImFsbG93YW5jZSIsIm5mdF91c2UiLCJ1c2UiLCJyIiwiY3VzdG9tVmFyIiwibmZ0X3RyYW5zZmVyX2xpbmsiLCJrZXkiLCJoYXNoIiwidHJhbnNmZXJfbGluayIsImNvZGUiLCJuZnRfY2xhaW1fbGluayIsImNsYWltX2xpbmsiLCJuZnRfZW50ZXJfY29kZSIsIm5mdF9yZWNoYXJnZV9xdW90ZSIsImljcEN5Y2xlcyIsIm9yYWNsZSIsIm9wcyIsInB3ckZlZSIsInN0b3JhZ2UiLCJmdWxsIiwiY3VycmVudCIsImRpZmYiLCJuZnRfbWludF9xdW90ZSIsInZhbHMiLCJuZnRfbWludCIsImtleV9uZnRzdG9yYWdlIiwiYXZhaWxhYmxlIiwibmZ0X2F2YWlsIiwiZmxvb3IiLCJyYW5kb20iLCJjYW5pc3RlcklkIiwibXJleiIsIk91dE9mTWVtb3J5IiwiSW5zdWZmaWNpZW50QmFsYW5jZSIsInJlZHVjZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFRQTs7QUFDQTs7QUFRQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFLQTs7QUFFQTs7Ozs7Ozs7QUE5QkE7QUFnQ08sTUFBTUEsUUFBUSxHQUFHLDBCQUFZO0FBQ2xDQyxFQUFBQSxJQUFJLEVBQUUsS0FENEI7QUFFbENDLEVBQUFBLFlBQVksRUFBRSxFQUZvQjtBQUdsQ0MsRUFBQUEsUUFBUSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRSxDQUFDQyxLQUFELEVBQVFDLE1BQVIsS0FBbUI7QUFDekIsYUFBTyxFQUNMLEdBQUdELEtBREU7QUFFTCxTQUFDQyxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsRUFBaEIsR0FBcUJGLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlRTtBQUYvQixPQUFQO0FBSUQ7QUFOTztBQUh3QixDQUFaLENBQWpCOztBQWFBLE1BQU07QUFBRUwsRUFBQUE7QUFBRixJQUFhSixRQUFRLENBQUNVLE9BQTVCOzs7QUFFQSxNQUFNQyxTQUFTLEdBQUlILEVBQUQsSUFBUSxPQUFPSSxRQUFQLEVBQWlCQyxRQUFqQixLQUE4QjtBQUFBOztBQUM3RCxNQUFJQyxRQUFRLEdBQUdDLGNBQWVDLE1BQWYsQ0FBc0JDLFdBQXRCLEVBQWY7O0FBQ0EsTUFBSUMsQ0FBQyxHQUFHTCxRQUFRLEVBQWhCO0FBRUEsTUFBSU0sR0FBRyxHQUFHLDBCQUFjWCxFQUFkLENBQVY7QUFDQSxNQUFJO0FBQUVZLElBQUFBLEtBQUY7QUFBU0MsSUFBQUE7QUFBVCxNQUFrQiwwQkFBY0YsR0FBZCxDQUF0QjtBQUNBLE1BQUlHLFFBQVEsR0FBRyxrQ0FBa0JKLENBQUMsQ0FBQ0ssSUFBRixDQUFPQyxHQUFQLENBQVdDLEtBQTdCLEVBQW9DSixJQUFwQyxFQUEwQ0ssTUFBMUMsRUFBZjtBQUVBLE1BQUlD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LENBN0ZNOzs7ZUErRlFaLFFBQVEsQ0FBQ21MLE8iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgQmlnSW50ICovXG5pbXBvcnQgeyBjcmVhdGVTbGljZSB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XG5pbXBvcnQgYXV0aGVudGljYXRpb24gZnJvbSBcIi4uL2F1dGhcIjtcbmltcG9ydCB7XG4gIGVuY29kZVRva2VuSWQsXG4gIGRlY29kZVRva2VuSWQsXG4gIHRva2VuVXJsLFxuICBpcGZzVG9rZW5VcmwsXG4gIHRva2VuVG9UZXh0LFxuICB0b2tlbkZyb21UZXh0LFxufSBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvdG9rZW4uanNcIjtcbmltcG9ydCB7IG5mdENhbmlzdGVyIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtY2FuaXN0ZXJzL2Nqcy9uZnQuanNcIjtcbmltcG9ydCB7XG4gIGNodW5rQmxvYixcbiAgZW5jb2RlTGluayxcbiAgZGVjb2RlTGluayxcbiAgZ2VuZXJhdGVLZXlIYXNoUGFpcixcbiAgdXBsb2FkRmlsZSxcbn0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL2RhdGEuanNcIjtcblxuaW1wb3J0ICogYXMgQWNjb3VudElkZW50aWZpZXIgZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL2FjY291bnRpZGVudGlmaWVyLmpzXCI7XG5pbXBvcnQgKiBhcyBUcmFuc2FjdGlvbklkIGZyb20gXCJAdnZ2LWludGVyYWN0aXZlL25mdGFudmlsLXRvb2xzL2Nqcy90cmFuc2FjdGlvbmlkLmpzXCI7XG5pbXBvcnQgeyBQcmluY2lwYWxGcm9tU2xvdCB9IGZyb20gXCJAdnZ2LWludGVyYWN0aXZlL25mdGFudmlsLXRvb2xzL2Nqcy9wcmluY2lwYWwuanNcIjtcbmltcG9ydCB7XG4gIHByaWNlU3RvcmFnZSxcbiAgcHJpY2VPcHMsXG59IGZyb20gXCJAdnZ2LWludGVyYWN0aXZlL25mdGFudmlsLXRvb2xzL2Nqcy9wcmljaW5nLmpzXCI7XG5cbmltcG9ydCB7IHB3ckNhbmlzdGVyIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtY2FuaXN0ZXJzL2Nqcy9wd3IuanNcIjtcblxuaW1wb3J0IHsgdXNlcl9yZWZyZXNoX2JhbGFuY2VzLCB1c2VyX3JlZnJlc2hfY29uZmlnIH0gZnJvbSBcIi4vdXNlclwiO1xuXG5leHBvcnQgY29uc3QgbmZ0U2xpY2UgPSBjcmVhdGVTbGljZSh7XG4gIG5hbWU6IFwibmZ0XCIsXG4gIGluaXRpYWxTdGF0ZToge30sXG4gIHJlZHVjZXJzOiB7XG4gICAgbmZ0U2V0OiAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFthY3Rpb24ucGF5bG9hZC5pZF06IGFjdGlvbi5wYXlsb2FkLm1ldGEsXG4gICAgICB9O1xuICAgIH0sXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IHsgbmZ0U2V0IH0gPSBuZnRTbGljZS5hY3Rpb25zO1xuXG5leHBvcnQgY29uc3QgbmZ0X2ZldGNoID0gKGlkKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgbGV0IHRpZCA9IHRva2VuRnJvbVRleHQoaWQpO1xuICBsZXQgeyBpbmRleCwgc2xvdCB9ID0gZGVjb2RlVG9rZW5JZCh0aWQpO1xuICBsZXQgY2FuaXN0ZXIgPSBQcmluY2lwYWxGcm9tU2xvdChzLnVzZXIubWFwLnNwYWNlLCBzbG90KS50b1RleHQoKTtcblxuICBsZXQgbmZ0Y2FuID0gbmZ0Q2FuaXN0ZXIoY2FuaXN0ZXIsIHtcbiAgICBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpLFxuICB9KTtcblxuICBsZXQgcmVzcCA9IGF3YWl0IG5mdGNhbi5tZXRhZGF0YSh0aWQpO1xuICBpZiAoIXJlc3ApIHRocm93IEVycm9yKFwiQ2FuJ3QgZmV0Y2ggTkZUIG1ldGFcIik7XG4gIGlmIChyZXNwLmVycilcbiAgICB0aHJvdyBFcnJvcihcIkZldGNoaW5nIE5GVCBtZXRhIGVycm9yIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcC5lcnIpKTtcblxuICBsZXQgeyBiZWFyZXIsIGRhdGEsIHZhcnMgfSA9IHJlc3Aub2s7XG4gIGxldCBub3cgPSBNYXRoLmNlaWwoRGF0ZS5ub3coKSAvIDEwMDAgLyA2MCk7XG5cbiAgbGV0IG1ldGEgPSB7XG4gICAgYmVhcmVyOiBBY2NvdW50SWRlbnRpZmllci5BcnJheVRvVGV4dChiZWFyZXIpLFxuXG4gICAgLy8gaW5oZXJhbnRcbiAgICB0b2tlbkluZGV4OiBpbmRleCxcbiAgICBjYW5pc3RlcixcblxuICAgIC8vIGRhdGFcblxuICAgIGRvbWFpbjogZGF0YS5kb21haW5bMF0sXG4gICAgLy8gdXNlOiBkYXRhLnVzZVswXSxcbiAgICAvLyBob2xkOiBkYXRhLmhvbGRbMF0sXG4gICAgdGh1bWI6IGRhdGEudGh1bWIsXG4gICAgY29udGVudDogZGF0YS5jb250ZW50WzBdLFxuICAgIGNyZWF0ZWQ6IGRhdGEuY3JlYXRlZCxcbiAgICBxdWFsaXR5OiBkYXRhLnF1YWxpdHksXG4gICAgbG9yZTogZGF0YS5sb3JlWzBdLFxuICAgIG5hbWU6IGRhdGEubmFtZVswXSxcbiAgICBjdXN0b206IGRhdGEuY3VzdG9tLmxlbmd0aCxcbiAgICBhdXRob3I6IEFjY291bnRJZGVudGlmaWVyLkFycmF5VG9UZXh0KGRhdGEuYXV0aG9yKSxcbiAgICBzZWNyZXQ6IGRhdGEuc2VjcmV0LFxuICAgIGVudHJvcHk6IGRhdGEuZW50cm9weSxcbiAgICBhdHRyaWJ1dGVzOiBkYXRhLmF0dHJpYnV0ZXMsXG4gICAgdHJhbnNmZXI6IGRhdGEudHJhbnNmZXIsXG4gICAgYXV0aG9yU2hhcmU6IGRhdGEuYXV0aG9yU2hhcmUsXG4gICAgdGFnczogZGF0YS50YWdzLFxuICAgIC8vdmFyc1xuICAgIHR0bDogdmFycy50dGxbMF0sXG4gICAgY29vbGRvd25VbnRpbDogdmFycy5jb29sZG93blVudGlsWzBdLFxuICAgIGJvdW5kVW50aWw6IHZhcnMuYm91bmRVbnRpbFswXSxcbiAgICBwd3I6IFt2YXJzLnB3ck9wcy50b1N0cmluZygpLCB2YXJzLnB3clN0b3JhZ2UudG9TdHJpbmcoKV0sXG4gICAgc29ja2V0czogdmFycy5zb2NrZXRzLm1hcCgoeCkgPT4gdG9rZW5Ub1RleHQoeCkpLCAvL1Rva2VuSWRlbnRpZmllci5BcnJheVRvVGV4dCh4KSksXG4gICAgcHJpY2U6IHsgLi4udmFycy5wcmljZSwgYW1vdW50OiB2YXJzLnByaWNlLmFtb3VudC50b1N0cmluZygpIH0sXG4gICAgaGlzdG9yeTogdmFycy5oaXN0b3J5LFxuICAgIHJlY2hhcmdlYWJsZTogZGF0YS5yZWNoYXJnZWFibGUsXG4gIH07XG5cbiAgbWV0YS50cmFuc2ZlcmFibGUgPVxuICAgIG1ldGEudHJhbnNmZXIudW5yZXN0cmljdGVkID09PSBudWxsIHx8XG4gICAgKG1ldGEudHJhbnNmZXIuYmluZHNEdXJhdGlvbiAmJiBtZXRhLmJvdW5kVW50aWwgPCBub3cpO1xuXG4gIGlmIChtZXRhLnRodW1iLmludGVybmFsKVxuICAgIG1ldGEudGh1bWIuaW50ZXJuYWwudXJsID0gdG9rZW5Vcmwocy51c2VyLm1hcC5zcGFjZSwgdGlkLCBcInRodW1iXCIpO1xuICBpZiAobWV0YS50aHVtYi5pcGZzKSBtZXRhLnRodW1iLmlwZnMudXJsID0gaXBmc1Rva2VuVXJsKG1ldGEudGh1bWIuaXBmcy5jaWQpO1xuXG4gIGxldCBzdWJhY2NvdW50ID0gW1xuICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KHMudXNlci5zdWJhY2NvdW50KSB8fCBudWxsLFxuICBdLmZpbHRlcihCb29sZWFuKTtcblxuICBpZiAobWV0YS5jb250ZW50Py5pbnRlcm5hbCkge1xuICAgIGlmIChtZXRhLnNlY3JldClcbiAgICAgIG1ldGEuY29udGVudC5pbnRlcm5hbC51cmwgPSBhd2FpdCBuZnRfbWVkaWFfZ2V0KHMsIHtcbiAgICAgICAgaWQsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBtZXRhLmNvbnRlbnQuaW50ZXJuYWwuY29udGVudFR5cGUsXG4gICAgICAgIHNpemU6IG1ldGEuY29udGVudC5pbnRlcm5hbC5zaXplLFxuICAgICAgICBwb3NpdGlvbjogXCJjb250ZW50XCIsXG4gICAgICAgIHN1YmFjY291bnQsXG4gICAgICB9KTtcbiAgICBlbHNlIG1ldGEuY29udGVudC5pbnRlcm5hbC51cmwgPSB0b2tlblVybChzLnVzZXIubWFwLnNwYWNlLCB0aWQsIFwiY29udGVudFwiKTtcbiAgfVxuICBpZiAobWV0YS5jb250ZW50Py5pcGZzKVxuICAgIG1ldGEuY29udGVudC5pcGZzLnVybCA9IGlwZnNUb2tlblVybChtZXRhLmNvbnRlbnQuaXBmcy5jaWQpO1xuXG4gIGRpc3BhdGNoKG5mdFNldCh7IGlkLCBtZXRhIH0pKTtcbiAgcmV0dXJuIG1ldGE7XG59O1xuXG5leHBvcnQgY29uc3QgbmZ0X21lZGlhX2dldCA9IGFzeW5jIChcbiAgcyxcbiAgeyBpZCwgY29udGVudFR5cGUsIHNpemUsIHBvc2l0aW9uLCBzdWJhY2NvdW50ID0gZmFsc2UgfVxuKSA9PiB7XG4gIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gIGxldCB0aWQgPSB0b2tlbkZyb21UZXh0KGlkKTtcbiAgbGV0IHsgaW5kZXgsIHNsb3QgfSA9IGRlY29kZVRva2VuSWQodGlkKTtcbiAgbGV0IGNhbmlzdGVyID0gUHJpbmNpcGFsRnJvbVNsb3Qocy51c2VyLm1hcC5zcGFjZSwgc2xvdCkudG9UZXh0KCk7XG5cbiAgbGV0IG5mdGNhbiA9IG5mdENhbmlzdGVyKGNhbmlzdGVyLCB7XG4gICAgYWdlbnRPcHRpb25zOiBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbiAgfSk7XG5cbiAgbGV0IHNyYyA9IGF3YWl0IG5mdF9mZXRjaF9maWxlKFxuICAgIG5mdGNhbixcbiAgICBzaXplLFxuICAgIGNvbnRlbnRUeXBlLFxuICAgIGluZGV4LFxuICAgIHBvc2l0aW9uLFxuICAgIHN1YmFjY291bnRcbiAgKTtcblxuICByZXR1cm4gc3JjO1xufTtcblxuY29uc3QgbmZ0X2ZldGNoX2ZpbGUgPSBhc3luYyAoXG4gIG5mdCxcbiAgc2l6ZSxcbiAgY29udGVudFR5cGUsXG4gIHRva2VuSW5kZXgsXG4gIHBvc2l0aW9uLFxuICBzdWJhY2NvdW50ID0gZmFsc2VcbikgPT4ge1xuICBsZXQgY2h1bmtTaXplID0gMTAyNCAqIDUxMjtcbiAgbGV0IGNodW5rcyA9IE1hdGguY2VpbChzaXplIC8gY2h1bmtTaXplKTtcblxuICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgQXJyYXkoY2h1bmtzKVxuICAgICAgLmZpbGwoMClcbiAgICAgIC5tYXAoKF8sIGNodW5rSWR4KSA9PiB7XG4gICAgICAgIHJldHVybiBuZnQuZmV0Y2hfY2h1bmsoe1xuICAgICAgICAgIHRva2VuSW5kZXgsXG4gICAgICAgICAgY2h1bmtJZHgsXG4gICAgICAgICAgcG9zaXRpb246IHsgW3Bvc2l0aW9uXTogbnVsbCB9LFxuICAgICAgICAgIHN1YmFjY291bnQ6IHN1YmFjY291bnQgPyBzdWJhY2NvdW50IDogW10sXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgKS50aGVuKChjaHVua3MpID0+IHtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoXG4gICAgICBjaHVua3MubWFwKChjaHVuaykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoY2h1bmtbMF0pLmJ1ZmZlcjtcbiAgICAgIH0pLFxuICAgICAgeyB0eXBlOiBjb250ZW50VHlwZSB9XG4gICAgKTtcblxuICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBuZnRfcHVyY2hhc2UgPVxuICAoeyBpZCwgYW1vdW50LCBhZmZpbGlhdGUgPSBbXSB9KSA9PlxuICBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgbGV0IHMgPSBnZXRTdGF0ZSgpO1xuXG4gICAgbGV0IGlkZW50aXR5ID0gYXV0aGVudGljYXRpb24uY2xpZW50LmdldElkZW50aXR5KCk7XG5cbiAgICBsZXQgdGlkID0gdG9rZW5Gcm9tVGV4dChpZCk7XG4gICAgbGV0IHsgc2xvdCB9ID0gZGVjb2RlVG9rZW5JZCh0aWQpO1xuXG4gICAgbGV0IGFkZHJlc3MgPSBzLnVzZXIuYWRkcmVzcztcbiAgICBsZXQgc3ViYWNjb3VudCA9IFtcbiAgICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KHMudXNlci5zdWJhY2NvdW50KSB8fCBudWxsLFxuICAgIF0uZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgY29uc29sZS5sb2coXCJCVVlJTkdcIiwgaWQsIGFtb3VudCk7XG5cbiAgICBsZXQgcHdyID0gcHdyQ2FuaXN0ZXIoXG4gICAgICBQcmluY2lwYWxGcm9tU2xvdChcbiAgICAgICAgcy51c2VyLm1hcC5zcGFjZSxcbiAgICAgICAgQWNjb3VudElkZW50aWZpZXIuVGV4dFRvU2xvdChhZGRyZXNzLCBzLnVzZXIubWFwLnB3cilcbiAgICAgICksXG4gICAgICB7XG4gICAgICAgIGFnZW50T3B0aW9uczogYXV0aGVudGljYXRpb24uZ2V0QWdlbnRPcHRpb25zKCksXG4gICAgICB9XG4gICAgKTtcblxuICAgIGxldCBwcmV6ID0gYXdhaXQgcHdyLm5mdF9wdXJjaGFzZShCaWdJbnQoc2xvdCksIHtcbiAgICAgIHRva2VuOiB0b2tlbkZyb21UZXh0KGlkKSxcbiAgICAgIHVzZXI6IHsgYWRkcmVzczogQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkoYWRkcmVzcykgfSxcbiAgICAgIHN1YmFjY291bnQsXG4gICAgICBhZmZpbGlhdGUsXG4gICAgICBhbW91bnQsXG4gICAgfSk7XG5cbiAgICBpZiAocHJlei5lcnIpIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShwcmV6LmVycikpO1xuXG4gICAgZGlzcGF0Y2godXNlcl9yZWZyZXNoX2JhbGFuY2VzKCkpO1xuICAgIGRpc3BhdGNoKG5mdF9mZXRjaChpZCkpO1xuICAgIGNvbnNvbGUubG9nKFwicHVyY2hhc2UgcmVzdWx0XCIsIHByZXopO1xuICB9O1xuXG4vLyBleHBvcnQgY29uc3QgbmZ0X3B1cmNoYXNlX2ludGVudCA9XG4vLyAgICh7IGlkIH0pID0+XG4vLyAgIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbi8vICAgICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbi8vICAgICBsZXQgaWRlbnRpdHkgPSBhdXRoZW50aWNhdGlvbi5jbGllbnQuZ2V0SWRlbnRpdHkoKTtcblxuLy8gICAgIGxldCB0aWQgPSB0b2tlbkZyb21UZXh0KGlkKTtcbi8vICAgICBsZXQgeyBzbG90IH0gPSBkZWNvZGVUb2tlbklkKHRpZCk7XG4vLyAgICAgLy9jb25zb2xlLmxvZyhcInRcIiwgaWQsIHNsb3QsIHRva2VuRnJvbVRleHQoaWQpKTtcbi8vICAgICBsZXQgY2FuaXN0ZXIgPSBQcmluY2lwYWxGcm9tU2xvdChzLnVzZXIubWFwLnNwYWNlLCBzbG90KS50b1RleHQoKTtcblxuLy8gICAgIGxldCBuZnRjYW4gPSBuZnRDYW5pc3RlcihjYW5pc3Rlciwge1xuLy8gICAgICAgYWdlbnRPcHRpb25zOiBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbi8vICAgICB9KTtcblxuLy8gICAgIGxldCBhZGRyZXNzID0gcy51c2VyLmFkZHJlc3M7XG4vLyAgICAgbGV0IHN1YmFjY291bnQgPSBbXG4vLyAgICAgICBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShzLnVzZXIuc3ViYWNjb3VudCkgfHwgbnVsbCxcbi8vICAgICBdLmZpbHRlcihCb29sZWFuKTtcblxuLy8gICAgIGxldCB0ID0gYXdhaXQgbmZ0Y2FuLnB1cmNoYXNlX2ludGVudCh7XG4vLyAgICAgICB1c2VyOiB7IGFkZHJlc3M6IEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KGFkZHJlc3MpIH0sXG4vLyAgICAgICB0b2tlbjogdG9rZW5Gcm9tVGV4dChpZCksXG4vLyAgICAgICBzdWJhY2NvdW50LFxuLy8gICAgIH0pO1xuXG4vLyAgICAgaWYgKCEoXCJva1wiIGluIHQpKSB0aHJvdyB0O1xuXG4vLyAgICAgcmV0dXJuIHQub2s7XG4vLyAgIH07XG5cbmV4cG9ydCBjb25zdCBuZnRfc2V0X3ByaWNlID1cbiAgKHsgaWQsIHByaWNlIH0pID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgICBsZXQgaWRlbnRpdHkgPSBhdXRoZW50aWNhdGlvbi5jbGllbnQuZ2V0SWRlbnRpdHkoKTtcbiAgICBsZXQgdGlkID0gdG9rZW5Gcm9tVGV4dChpZCk7XG4gICAgbGV0IHsgc2xvdCB9ID0gZGVjb2RlVG9rZW5JZCh0aWQpO1xuXG4gICAgY29uc29sZS5sb2coXCJTZXR0aW5nIHByaWNlXCIsIGlkLCB7IHNsb3QgfSk7XG5cbiAgICBsZXQgY2FuaXN0ZXIgPSBQcmluY2lwYWxGcm9tU2xvdChzLnVzZXIubWFwLnNwYWNlLCBzbG90KS50b1RleHQoKTtcblxuICAgIGxldCBuZnRjYW4gPSBuZnRDYW5pc3RlcihjYW5pc3Rlciwge1xuICAgICAgYWdlbnRPcHRpb25zOiBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbiAgICB9KTtcblxuICAgIGxldCBhZGRyZXNzID0gcy51c2VyLmFkZHJlc3M7XG5cbiAgICBsZXQgc3ViYWNjb3VudCA9IFtcbiAgICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KHMudXNlci5zdWJhY2NvdW50KSB8fCBudWxsLFxuICAgIF0uZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgbGV0IHQgPSBhd2FpdCBuZnRjYW4uc2V0X3ByaWNlKHtcbiAgICAgIHVzZXI6IHsgYWRkcmVzczogQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkoYWRkcmVzcykgfSxcbiAgICAgIHRva2VuOiB0aWQsXG4gICAgICBwcmljZTogcHJpY2UsXG4gICAgICBzdWJhY2NvdW50LFxuICAgIH0pO1xuICAgIGlmICghKFwib2tcIiBpbiB0KSkgdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KHQuZXJyKSk7XG4gICAgZGlzcGF0Y2gobmZ0X2ZldGNoKGlkKSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBuZnRfdHJhbnNmZXIgPVxuICAoeyBpZCwgdG9BZGRyZXNzIH0pID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgICBsZXQgaWRlbnRpdHkgPSBhdXRoZW50aWNhdGlvbi5jbGllbnQuZ2V0SWRlbnRpdHkoKTtcblxuICAgIGxldCB0aWQgPSB0b2tlbkZyb21UZXh0KGlkKTtcbiAgICBsZXQgeyBzbG90IH0gPSBkZWNvZGVUb2tlbklkKHRpZCk7XG4gICAgbGV0IGNhbmlzdGVyID0gUHJpbmNpcGFsRnJvbVNsb3Qocy51c2VyLm1hcC5zcGFjZSwgc2xvdCkudG9UZXh0KCk7XG5cbiAgICBsZXQgbmZ0Y2FuID0gbmZ0Q2FuaXN0ZXIoY2FuaXN0ZXIsIHtcbiAgICAgIGFnZW50T3B0aW9uczogYXV0aGVudGljYXRpb24uZ2V0QWdlbnRPcHRpb25zKCksXG4gICAgfSk7XG5cbiAgICBsZXQgYWRkcmVzcyA9IHMudXNlci5hZGRyZXNzO1xuXG4gICAgbGV0IHN1YmFjY291bnQgPSBbXG4gICAgICBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShzLnVzZXIuc3ViYWNjb3VudCkgfHwgbnVsbCxcbiAgICBdLmZpbHRlcihCb29sZWFuKTtcblxuICAgIGxldCB0ID0gYXdhaXQgbmZ0Y2FuLnRyYW5zZmVyKHtcbiAgICAgIGZyb206IHsgYWRkcmVzczogQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkoYWRkcmVzcykgfSxcbiAgICAgIHRvOiB7IGFkZHJlc3M6IEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KHRvQWRkcmVzcykgfSxcbiAgICAgIHRva2VuOiB0aWQsXG4gICAgICBhbW91bnQ6IDEsXG4gICAgICBtZW1vOiBbXSxcbiAgICAgIHN1YmFjY291bnQsXG4gICAgfSk7XG5cbiAgICBpZiAoIXQub2spIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh0LmVycikpO1xuICAgIGxldCB7IHRyYW5zYWN0aW9uSWQgfSA9IHQub2s7XG5cbiAgICBkaXNwYXRjaChuZnRfZmV0Y2goaWQpKTtcblxuICAgIHJldHVybiB0O1xuICB9O1xuXG5leHBvcnQgY29uc3QgbmZ0X3BsdWcgPVxuICAoeyBwbHVnX2lkLCBzb2NrZXRfaWQgfSkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGxldCBzID0gZ2V0U3RhdGUoKTtcblxuICAgIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gICAgbGV0IHsgc2xvdCB9ID0gZGVjb2RlVG9rZW5JZCh0b2tlbkZyb21UZXh0KHBsdWdfaWQpKTtcbiAgICBsZXQgY2FuaXN0ZXIgPSBQcmluY2lwYWxGcm9tU2xvdChzLnVzZXIubWFwLnNwYWNlLCBzbG90KS50b1RleHQoKTtcblxuICAgIGxldCBuZnRjYW4gPSBuZnRDYW5pc3RlcihjYW5pc3Rlciwge1xuICAgICAgYWdlbnRPcHRpb25zOiBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbiAgICB9KTtcblxuICAgIGxldCBhZGRyZXNzID0gcy51c2VyLmFkZHJlc3M7XG4gICAgbGV0IHN1YmFjY291bnQgPSBbXG4gICAgICBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShzLnVzZXIuc3ViYWNjb3VudCkgfHwgbnVsbCxcbiAgICBdLmZpbHRlcihCb29sZWFuKTtcblxuICAgIGxldCB0ID0gYXdhaXQgbmZ0Y2FuLnBsdWcoe1xuICAgICAgdXNlcjogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSB9LFxuICAgICAgc3ViYWNjb3VudCxcbiAgICAgIHBsdWc6IHRva2VuRnJvbVRleHQocGx1Z19pZCksXG4gICAgICBzb2NrZXQ6IHRva2VuRnJvbVRleHQoc29ja2V0X2lkKSxcbiAgICAgIG1lbW86IFtdLFxuICAgIH0pO1xuICAgIGlmICghdC5vaykgdGhyb3cgdC5lcnI7XG4gICAgZGlzcGF0Y2gobmZ0X2ZldGNoKHBsdWdfaWQpKTtcbiAgICBkaXNwYXRjaChuZnRfZmV0Y2goc29ja2V0X2lkKSk7XG4gICAgcmV0dXJuIHQub2s7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBuZnRfdW5zb2NrZXQgPVxuICAoeyBwbHVnX2lkLCBzb2NrZXRfaWQgfSkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGxldCBzID0gZ2V0U3RhdGUoKTtcblxuICAgIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gICAgbGV0IHsgc2xvdCB9ID0gZGVjb2RlVG9rZW5JZCh0b2tlbkZyb21UZXh0KHNvY2tldF9pZCkpO1xuICAgIGxldCBjYW5pc3RlciA9IFByaW5jaXBhbEZyb21TbG90KHMudXNlci5tYXAuc3BhY2UsIHNsb3QpLnRvVGV4dCgpO1xuXG4gICAgbGV0IG5mdGNhbiA9IG5mdENhbmlzdGVyKGNhbmlzdGVyLCB7XG4gICAgICBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpLFxuICAgIH0pO1xuXG4gICAgbGV0IGFkZHJlc3MgPSBzLnVzZXIuYWRkcmVzcztcbiAgICBsZXQgc3ViYWNjb3VudCA9IFtcbiAgICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KHMudXNlci5zdWJhY2NvdW50KSB8fCBudWxsLFxuICAgIF0uZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgbGV0IHQgPSBhd2FpdCBuZnRjYW4udW5zb2NrZXQoe1xuICAgICAgdXNlcjogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSB9LFxuICAgICAgc3ViYWNjb3VudCxcbiAgICAgIHBsdWc6IHRva2VuRnJvbVRleHQocGx1Z19pZCksXG4gICAgICBzb2NrZXQ6IHRva2VuRnJvbVRleHQoc29ja2V0X2lkKSxcbiAgICAgIG1lbW86IFtdLFxuICAgIH0pO1xuICAgIGlmICghdC5vaykgdGhyb3cgdC5lcnI7XG4gICAgZGlzcGF0Y2gobmZ0X2ZldGNoKHBsdWdfaWQpKTtcbiAgICBkaXNwYXRjaChuZnRfZmV0Y2goc29ja2V0X2lkKSk7XG4gICAgcmV0dXJuIHQub2s7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBuZnRfcmVjaGFyZ2UgPVxuICAoeyBpZCwgYW1vdW50IH0pID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgICBsZXQgaWRlbnRpdHkgPSBhdXRoZW50aWNhdGlvbi5jbGllbnQuZ2V0SWRlbnRpdHkoKTtcblxuICAgIGxldCB0aWQgPSB0b2tlbkZyb21UZXh0KGlkKTtcbiAgICBsZXQgeyBzbG90IH0gPSBkZWNvZGVUb2tlbklkKHRpZCk7XG4gICAgLy8gbGV0IGNhbmlzdGVyID0gUHJpbmNpcGFsRnJvbVNsb3Qocy51c2VyLm1hcC5zcGFjZSwgc2xvdCkudG9UZXh0KCk7XG4gICAgbGV0IGFkZHJlc3MgPSBzLnVzZXIuYWRkcmVzcztcblxuICAgIC8vIGxldCBuZnRjYW4gPSBuZnRDYW5pc3RlcihjYW5pc3RlciwgeyBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpIH0pO1xuICAgIGxldCBwd3IgPSBwd3JDYW5pc3RlcihcbiAgICAgIFByaW5jaXBhbEZyb21TbG90KFxuICAgICAgICBzLnVzZXIubWFwLnNwYWNlLFxuICAgICAgICBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9TbG90KGFkZHJlc3MsIHMudXNlci5tYXAucHdyKVxuICAgICAgKSxcbiAgICAgIHtcbiAgICAgICAgYWdlbnRPcHRpb25zOiBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgbGV0IHN1YmFjY291bnQgPSBbXG4gICAgICBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShzLnVzZXIuc3ViYWNjb3VudCkgfHwgbnVsbCxcbiAgICBdLmZpbHRlcihCb29sZWFuKTtcblxuICAgIGxldCB0O1xuICAgIHRyeSB7XG4gICAgICBsZXQgdCA9IGF3YWl0IHB3ci5uZnRfcmVjaGFyZ2Uoc2xvdCwge1xuICAgICAgICB1c2VyOiB7IGFkZHJlc3M6IEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KGFkZHJlc3MpIH0sXG4gICAgICAgIHRva2VuOiB0aWQsXG4gICAgICAgIHN1YmFjY291bnQsXG4gICAgICAgIGFtb3VudCxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIShcIm9rXCIgaW4gdCkpIHRocm93IHQuZXJyO1xuXG4gICAgICBsZXQgeyB0cmFuc2FjdGlvbklkIH0gPSB7IHRyYW5zYWN0aW9uSWQ6IDAgfTsgLy90Lm9rO1xuXG4gICAgICBkaXNwYXRjaCh1c2VyX3JlZnJlc2hfYmFsYW5jZXMoKSk7XG4gICAgICBkaXNwYXRjaChuZnRfZmV0Y2goaWQpKTtcbiAgICAgIHJldHVybiB0Lm9rO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZWNoYXJnZSBlcnJvclwiLCBlKTtcbiAgICB9XG4gIH07XG5cbmV4cG9ydCBjb25zdCBuZnRfYnVybiA9XG4gICh7IGlkIH0pID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgICBsZXQgaWRlbnRpdHkgPSBhdXRoZW50aWNhdGlvbi5jbGllbnQuZ2V0SWRlbnRpdHkoKTtcblxuICAgIGxldCB0aWQgPSB0b2tlbkZyb21UZXh0KGlkKTtcbiAgICBsZXQgeyBzbG90IH0gPSBkZWNvZGVUb2tlbklkKHRpZCk7XG4gICAgbGV0IGNhbmlzdGVyID0gUHJpbmNpcGFsRnJvbVNsb3Qocy51c2VyLm1hcC5zcGFjZSwgc2xvdCkudG9UZXh0KCk7XG5cbiAgICBsZXQgbmZ0Y2FuID0gbmZ0Q2FuaXN0ZXIoY2FuaXN0ZXIsIHtcbiAgICAgIGFnZW50T3B0aW9uczogYXV0aGVudGljYXRpb24uZ2V0QWdlbnRPcHRpb25zKCksXG4gICAgfSk7XG5cbiAgICBsZXQgYWRkcmVzcyA9IHMudXNlci5hZGRyZXNzO1xuICAgIGxldCBzdWJhY2NvdW50ID0gW1xuICAgICAgQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkocy51c2VyLnN1YmFjY291bnQpIHx8IG51bGwsXG4gICAgXS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICBsZXQgcmV6ID0gYXdhaXQgbmZ0Y2FuLmJ1cm4oe1xuICAgICAgdXNlcjogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSB9LFxuICAgICAgdG9rZW46IHRpZCxcbiAgICAgIGFtb3VudDogMSxcbiAgICAgIG1lbW86IFtdLFxuICAgICAgc3ViYWNjb3VudCxcbiAgICB9KTtcblxuICAgIGlmIChyZXouZXJyKSB0aHJvdyByZXouZXJyO1xuXG4gICAgZGlzcGF0Y2godXNlcl9yZWZyZXNoX2JhbGFuY2VzKCkpO1xuICAgIGxldCB7IHRyYW5zYWN0aW9uSWQgfSA9IHJlei5vaztcbiAgICByZXR1cm4gcmV6Lm9rO1xuICB9O1xuXG5leHBvcnQgY29uc3QgbmZ0X2FwcHJvdmUgPVxuICAoeyBpZCwgc3BlbmRlciB9KSA9PlxuICBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgbGV0IHMgPSBnZXRTdGF0ZSgpO1xuXG4gICAgbGV0IGlkZW50aXR5ID0gYXV0aGVudGljYXRpb24uY2xpZW50LmdldElkZW50aXR5KCk7XG4gICAgbGV0IHRpZCA9IHRva2VuRnJvbVRleHQoaWQpO1xuICAgIGxldCB7IHNsb3QgfSA9IGRlY29kZVRva2VuSWQodGlkKTtcbiAgICBsZXQgY2FuaXN0ZXIgPSBQcmluY2lwYWxGcm9tU2xvdChzLnVzZXIubWFwLnNwYWNlLCBzbG90KS50b1RleHQoKTtcblxuICAgIGxldCBuZnRjYW4gPSBuZnRDYW5pc3RlcihjYW5pc3Rlciwge1xuICAgICAgYWdlbnRPcHRpb25zOiBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbiAgICB9KTtcblxuICAgIGxldCBhZGRyZXNzID0gcy51c2VyLmFkZHJlc3M7XG4gICAgbGV0IHN1YmFjY291bnQgPSBbXG4gICAgICBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShzLnVzZXIuc3ViYWNjb3VudCkgfHwgbnVsbCxcbiAgICBdLmZpbHRlcihCb29sZWFuKTtcblxuICAgIGxldCByZXogPSBhd2FpdCBuZnRjYW4uYXBwcm92ZSh7XG4gICAgICB0b2tlbjogdGlkLFxuICAgICAgYWxsb3dhbmNlOiAxLFxuICAgICAgc3ViYWNjb3VudCxcbiAgICAgIHNwZW5kZXIsXG4gICAgfSk7XG4gICAgaWYgKHJlei5lcnIpIHRocm93IHJlei5lcnI7XG4gICAgZGlzcGF0Y2gobmZ0X2ZldGNoKGlkKSk7XG5cbiAgICByZXR1cm4gcmV6Lm9rO1xuICB9O1xuXG5leHBvcnQgY29uc3QgbmZ0X3VzZSA9XG4gICh7IGlkLCB1c2UsIG1lbW8gfSkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGxldCBzID0gZ2V0U3RhdGUoKTtcblxuICAgIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gICAgbGV0IHRpZCA9IHRva2VuRnJvbVRleHQoaWQpO1xuICAgIGxldCB7IHNsb3QgfSA9IGRlY29kZVRva2VuSWQodGlkKTtcbiAgICBsZXQgY2FuaXN0ZXIgPSBQcmluY2lwYWxGcm9tU2xvdChzLnVzZXIubWFwLnNwYWNlLCBzbG90KS50b1RleHQoKTtcblxuICAgIGxldCBuZnRjYW4gPSBuZnRDYW5pc3RlcihjYW5pc3Rlciwge1xuICAgICAgYWdlbnRPcHRpb25zOiBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbiAgICB9KTtcblxuICAgIGxldCBhZGRyZXNzID0gcy51c2VyLmFkZHJlc3M7XG4gICAgbGV0IHN1YmFjY291bnQgPSBbXG4gICAgICBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShzLnVzZXIuc3ViYWNjb3VudCkgfHwgbnVsbCxcbiAgICBdLmZpbHRlcihCb29sZWFuKTtcblxuICAgIGxldCByID0gYXdhaXQgbmZ0Y2FuLnVzZSh7XG4gICAgICB1c2VyOiB7IGFkZHJlc3M6IEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KGFkZHJlc3MpIH0sXG4gICAgICB0b2tlbjogdGlkLFxuICAgICAgbWVtbyxcbiAgICAgIHVzZSxcbiAgICAgIHN1YmFjY291bnQsXG4gICAgICBjdXN0b21WYXI6IFtdLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyLm9rKSB0aHJvdyByLmVycjtcbiAgICBkaXNwYXRjaCh1c2VyX3JlZnJlc2hfYmFsYW5jZXMoKSk7XG4gICAgZGlzcGF0Y2gobmZ0X2ZldGNoKGlkKSk7XG4gICAgcmV0dXJuIHIub2s7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBuZnRfdHJhbnNmZXJfbGluayA9XG4gICh7IGlkIH0pID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgICBsZXQgaWRlbnRpdHkgPSBhdXRoZW50aWNhdGlvbi5jbGllbnQuZ2V0SWRlbnRpdHkoKTtcblxuICAgIGxldCB0aWQgPSB0b2tlbkZyb21UZXh0KGlkKTtcbiAgICBsZXQgeyBpbmRleCwgc2xvdCB9ID0gZGVjb2RlVG9rZW5JZCh0aWQpO1xuICAgIGxldCBjYW5pc3RlciA9IFByaW5jaXBhbEZyb21TbG90KHMudXNlci5tYXAuc3BhY2UsIHNsb3QpLnRvVGV4dCgpO1xuXG4gICAgbGV0IG5mdGNhbiA9IG5mdENhbmlzdGVyKGNhbmlzdGVyLCB7XG4gICAgICBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpLFxuICAgIH0pO1xuXG4gICAgbGV0IGFkZHJlc3MgPSBzLnVzZXIuYWRkcmVzcztcbiAgICBsZXQgc3ViYWNjb3VudCA9IFtcbiAgICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KHMudXNlci5zdWJhY2NvdW50KSB8fCBudWxsLFxuICAgIF0uZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgbGV0IHsga2V5LCBoYXNoIH0gPSBnZW5lcmF0ZUtleUhhc2hQYWlyKCk7XG5cbiAgICBsZXQgcmV6ID0gYXdhaXQgbmZ0Y2FuLnRyYW5zZmVyX2xpbmsoe1xuICAgICAgZnJvbTogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSB9LFxuICAgICAgaGFzaDogQXJyYXkuZnJvbShoYXNoKSxcbiAgICAgIHRva2VuOiB0aWQsXG4gICAgICBzdWJhY2NvdW50LFxuICAgIH0pO1xuICAgIGlmIChyZXouZXJyKSB0aHJvdyByZXouZXJyO1xuXG4gICAgbGV0IGNvZGUgPSBlbmNvZGVMaW5rKHNsb3QsIGluZGV4LCBrZXkpO1xuXG4gICAgcmV0dXJuIGNvZGU7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBuZnRfY2xhaW1fbGluayA9XG4gICh7IGNvZGUgfSkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGxldCBzID0gZ2V0U3RhdGUoKTtcbiAgICBsZXQgeyBzbG90LCB0b2tlbkluZGV4LCBrZXkgfSA9IGRlY29kZUxpbmsoY29kZSk7XG5cbiAgICBsZXQgY2FuaXN0ZXIgPSBQcmluY2lwYWxGcm9tU2xvdChzLnVzZXIubWFwLnNwYWNlLCBzbG90KTtcblxuICAgIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gICAgbGV0IG5mdGNhbiA9IG5mdENhbmlzdGVyKGNhbmlzdGVyLCB7XG4gICAgICBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpLFxuICAgIH0pO1xuXG4gICAgbGV0IGFkZHJlc3MgPSBzLnVzZXIuYWRkcmVzcztcblxuICAgIGxldCB0aWQgPSBlbmNvZGVUb2tlbklkKHNsb3QsIHRva2VuSW5kZXgpO1xuXG4gICAgbGV0IHJlc3AgPSBhd2FpdCBuZnRjYW4uY2xhaW1fbGluayh7XG4gICAgICB0bzogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSB9LFxuICAgICAga2V5OiBBcnJheS5mcm9tKGtleSksXG4gICAgICB0b2tlbjogdGlkLFxuICAgIH0pO1xuXG4gICAgZGlzcGF0Y2gobmZ0X2ZldGNoKHRva2VuVG9UZXh0KHRpZCkpKTtcblxuICAgIHJldHVybiByZXNwO1xuICB9O1xuXG5leHBvcnQgY29uc3QgbmZ0X2VudGVyX2NvZGUgPSAoY29kZSkgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgbGV0IHsgc2xvdCwgdG9rZW5JbmRleCB9ID0gZGVjb2RlTGluayhjb2RlKTtcblxuICBpZiAoIXMudXNlci5tYXAuc3BhY2UpIHRocm93IEVycm9yKFwiTWFwIG5vdCBsb2FkZWRcIik7XG5cbiAgbGV0IGNhbmlzdGVyID0gUHJpbmNpcGFsRnJvbVNsb3Qocy51c2VyLm1hcC5zcGFjZSwgc2xvdCk7XG5cbiAgbGV0IGlkID0gZW5jb2RlVG9rZW5JZChzbG90LCB0b2tlbkluZGV4KTtcbiAgcmV0dXJuIFwiL1wiICsgdG9rZW5Ub1RleHQoaWQpICsgXCIvXCIgKyBjb2RlO1xufTtcblxuZXhwb3J0IGNvbnN0IG5mdF9yZWNoYXJnZV9xdW90ZSA9XG4gICh7IGlkIH0pID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBsZXQgcyA9IGdldFN0YXRlKCk7XG4gICAgY29uc3QgaWNwQ3ljbGVzID0gQmlnSW50KHMudXNlci5vcmFjbGUuaWNwQ3ljbGVzKTtcblxuICAgIGxldCBuZnQgPSBzLm5mdFtpZF07XG5cbiAgICBjb25zdCBvcHMgPSBwcmljZU9wcyh7IHR0bDogbnVsbCB9KSAvIGljcEN5Y2xlcztcblxuICAgIGNvbnN0IHRyYW5zZmVyID0gQmlnSW50KHMudXNlci5vcmFjbGUucHdyRmVlKTtcblxuICAgIGNvbnN0IHN0b3JhZ2UgPVxuICAgICAgcHJpY2VTdG9yYWdlKHtcbiAgICAgICAgY3VzdG9tOiBuZnQuY3VzdG9tIHx8IDAsXG4gICAgICAgIGNvbnRlbnQ6IG5mdC5jb250ZW50LFxuICAgICAgICB0aHVtYjogbmZ0LnRodW1iLFxuICAgICAgICBxdWFsaXR5OiBuZnQucXVhbGl0eSxcbiAgICAgICAgdHRsOiBudWxsLFxuICAgICAgfSkgLyBpY3BDeWNsZXM7XG5cbiAgICBsZXQgZnVsbCA9IG9wcyArIHRyYW5zZmVyICsgc3RvcmFnZTtcblxuICAgIGxldCBjdXJyZW50ID0gQmlnSW50KG5mdC5wd3JbMF0pICsgQmlnSW50KG5mdC5wd3JbMV0pO1xuICAgIGxldCBkaWZmID0gZnVsbCAtIGN1cnJlbnQgKyBCaWdJbnQocy51c2VyLm9yYWNsZS5wd3JGZWUpO1xuICAgIGlmIChkaWZmIDwgMzAwMDBuKSBkaWZmID0gMG47XG5cbiAgICAvL2NvbnNvbGUubG9nKHsgZnVsbCwgY3VycmVudCwgZGlmZiB9KTtcblxuICAgIHJldHVybiBkaWZmO1xuICB9O1xuXG5leHBvcnQgY29uc3QgbmZ0X21pbnRfcXVvdGUgPSAodmFscykgPT4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgY29uc3QgaWNwQ3ljbGVzID0gQmlnSW50KHMudXNlci5vcmFjbGUuaWNwQ3ljbGVzKTtcbiAgY29uc3QgdHJhbnNmZXIgPSBCaWdJbnQocy51c2VyLm9yYWNsZS5wd3JGZWUpO1xuICBjb25zdCBvcHMgPSBwcmljZU9wcyh7IHR0bDogdmFscy50dGwgfSkgLyBpY3BDeWNsZXM7XG5cbiAgY29uc3Qgc3RvcmFnZSA9XG4gICAgcHJpY2VTdG9yYWdlKHtcbiAgICAgIGN1c3RvbTogMCwgLy9OT1RFOiB0aGlzIGZyb250ZW5kIGRvZXNuJ3Qgc3VwcG9ydCBjdXN0b20gZGF0YS4gSWYgc29tZW9uZSB3YW50cyB0byBhZGQgc3VjaCwgaXQgc2hvdWxkIGJlIGRvbmUgd2l0aCBzY3JpcHRzXG4gICAgICBjb250ZW50OiB2YWxzLmNvbnRlbnQsXG4gICAgICB0aHVtYjogdmFscy50aHVtYixcbiAgICAgIHF1YWxpdHk6IHZhbHMucXVhbGl0eSxcbiAgICAgIHR0bDogdmFscy50dGwsXG4gICAgfSkgLyBpY3BDeWNsZXM7XG5cbiAgcmV0dXJuIHsgdHJhbnNmZXIsIG9wcywgc3RvcmFnZSB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG5mdF9taW50ID0gKHZhbHMpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgbGV0IHMgPSBnZXRTdGF0ZSgpO1xuICBjb25zdCBrZXlfbmZ0c3RvcmFnZSA9IHMudXNlci5rZXlfbmZ0c3RvcmFnZTtcblxuICBsZXQgYXZhaWxhYmxlID0gcy51c2VyLm1hcC5uZnRfYXZhaWw7XG4gIGxldCBzbG90ID0gYXZhaWxhYmxlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZS5sZW5ndGgpXTtcblxuICBsZXQgY2FuaXN0ZXJJZCA9IFByaW5jaXBhbEZyb21TbG90KHMudXNlci5tYXAuc3BhY2UsIHNsb3QpO1xuXG4gIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuICBsZXQgYWRkcmVzcyA9IHMudXNlci5hZGRyZXNzO1xuXG4gIGxldCBuZnQgPSBuZnRDYW5pc3RlcihjYW5pc3RlcklkLCB7XG4gICAgYWdlbnRPcHRpb25zOiBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbiAgfSk7XG5cbiAgbGV0IHB3ciA9IHB3ckNhbmlzdGVyKFxuICAgIFByaW5jaXBhbEZyb21TbG90KFxuICAgICAgcy51c2VyLm1hcC5zcGFjZSxcbiAgICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb1Nsb3QoYWRkcmVzcywgcy51c2VyLm1hcC5wd3IpXG4gICAgKSxcbiAgICB7XG4gICAgICBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpLFxuICAgIH1cbiAgKTtcblxuICAvLyBjb25zb2xlLmxvZyhcbiAgLy8gICBcIlBXUiBDYW5pc3RlclwiLFxuICAvLyAgIFByaW5jaXBhbEZyb21TbG90KFxuICAvLyAgICAgcy51c2VyLm1hcC5zcGFjZSxcbiAgLy8gICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb1Nsb3QoYWRkcmVzcywgcy51c2VyLm1hcC5wd3IpXG4gIC8vICAgKS50b1RleHQoKVxuICAvLyApO1xuXG4gIC8vIGNvbnNvbGUubG9nKFxuICAvLyAgIFwiTkZUIENhbmlzdGVyXCIsXG4gIC8vICAgUHJpbmNpcGFsRnJvbVNsb3Qocy51c2VyLm1hcC5zcGFjZSwgc2xvdCkudG9UZXh0KClcbiAgLy8gKTtcblxuICBsZXQgc3ViYWNjb3VudCA9IFtcbiAgICBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShzLnVzZXIuc3ViYWNjb3VudCkgfHwgbnVsbCxcbiAgXS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgaWYgKCFhZGRyZXNzKSB0aHJvdyBFcnJvcihcIkFubm9ueW1vdXMgY2FudCBtaW50XCIpOyAvLyBXb250IGxldCBhbm5vbnltb3VzIG1pbnRcblxuICB0cnkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibWludCB2YWxzXCIsIHNsb3QsIHZhbHMpO1xuICAgIGxldCBtcmV6ID0gYXdhaXQgcHdyLm5mdF9taW50KEJpZ0ludChzbG90KSwge1xuICAgICAgdXNlcjogeyBhZGRyZXNzOiBBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhZGRyZXNzKSB9LFxuICAgICAgc3ViYWNjb3VudCxcbiAgICAgIG1ldGFkYXRhOiB2YWxzLFxuICAgIH0pO1xuXG4gICAgaWYgKG1yZXo/LmVycj8uT3V0T2ZNZW1vcnkgPT09IG51bGwpIHtcbiAgICAgIGF3YWl0IGRpc3BhdGNoKHVzZXJfcmVmcmVzaF9jb25maWcoKSk7XG4gICAgICBhd2FpdCBkaXNwYXRjaChuZnRfbWludCh2YWxzKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1yZXo/LmVycj8uSW5zdWZmaWNpZW50QmFsYW5jZSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJJbnN1ZmZpY2llbnQgQmFsYW5jZVwiKTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coXCJSRVpcIiwgbXJleik7XG4gICAgaWYgKCEoXCJva1wiIGluIG1yZXopKSB0aHJvdyBFcnJvcihKU09OLnN0cmluZ2lmeShtcmV6LmVycikpO1xuXG4gICAgbGV0IHsgdG9rZW5JbmRleCwgdHJhbnNhY3Rpb25JZCB9ID0gbXJlei5vaztcbiAgICBsZXQgaWQgPSB0b2tlblRvVGV4dChlbmNvZGVUb2tlbklkKHNsb3QsIHRva2VuSW5kZXgpKTtcblxuICAgIGlmICh2YWxzPy5jb250ZW50WzBdPy5pbnRlcm5hbD8udXJsKSB7XG4gICAgICBhd2FpdCB1cGxvYWRGaWxlKFxuICAgICAgICBuZnQsXG4gICAgICAgIHRva2VuSW5kZXgsXG4gICAgICAgIFwiY29udGVudFwiLFxuICAgICAgICBhd2FpdCBjaHVua0Jsb2IodmFscy5jb250ZW50WzBdLmludGVybmFsLnVybCksXG4gICAgICAgIHN1YmFjY291bnRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZhbHM/LnRodW1iPy5pbnRlcm5hbD8udXJsKSB7XG4gICAgICBhd2FpdCB1cGxvYWRGaWxlKFxuICAgICAgICBuZnQsXG4gICAgICAgIHRva2VuSW5kZXgsXG4gICAgICAgIFwidGh1bWJcIixcbiAgICAgICAgYXdhaXQgY2h1bmtCbG9iKHZhbHMudGh1bWIuaW50ZXJuYWwudXJsKSxcbiAgICAgICAgc3ViYWNjb3VudFxuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIHRocm93IGU7XG4gIH1cblxuICBkaXNwYXRjaCh1c2VyX3JlZnJlc2hfYmFsYW5jZXMoKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBuZnRTbGljZS5yZWR1Y2VyO1xuIl19
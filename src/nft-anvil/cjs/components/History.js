"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NftHistory = exports.HistoryTx = exports.HistoryRedirect = exports.History = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@chakra-ui/react");

var _principal = require("@dfinity/principal");

var _NFT = require("./NFT");

var _itemgrid = _interopRequireDefault(require("../assets/itemgrid.png"));

var _itemgrid_light = _interopRequireDefault(require("../assets/itemgrid_light.png"));

var _reactUse = require("react-use");

var _moment = _interopRequireDefault(require("moment"));

var _index = require("../index.js");

var _history = require("../reducers/history");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _data = require("@vvv-interactive/nftanvil-tools/cjs/data.js");

var _token = require("@vvv-interactive/nftanvil-tools/cjs/token.js");

var _principal2 = require("@vvv-interactive/nftanvil-tools/cjs/principal.js");

var AccountIdentifier = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js"));

var TransactionId = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/transactionid.js"));

var _Code = require("./Code");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* global BigInt */
const SHOW = 10; // max records shown on screen

const TAIL_INTERVAL = 1000; // every 1 sec

const HistoryRedirect = () => {
  const [isLoading, setLoading] = (0, _react.useState)(true);
  const dispatch = (0, _index.useAnvilDispatch)();

  const load = async () => {
    setLoading(false);
    let {
      total,
      canister
    } = await dispatch((0, _history.loadInfo)());
    let from = total - SHOW;
    if (from <= 0) from = 0;
    let to = total; // dispatch(push(`/history/${canister}/${from}/${to}`));
  };

  (0, _react.useEffect)(() => {
    load();
  }, [dispatch]);
  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    mt: "15"
  }, /*#__PURE__*/_react.default.createElement(_react2.Spinner, null));
};

exports.HistoryRedirect = HistoryRedirect;

const KeyVal = _ref => {
  let {
    k,
    v
  } = _ref;
  const dark = (0, _react2.useColorModeValue)(true, false);
  return /*#__PURE__*/_react.default.createElement(_react2.Flex, null, /*#__PURE__*/_react.default.createElement(Key, {
    dark: dark
  }, k), /*#__PURE__*/_react.default.createElement(Val, null, v));
};

const Key = _styled.default.div`
  text-transform: capitalize;
  color: ${p => p.dark ? "gray.200" : "gray.900"};
  width: 130px;
  font-size: 12px;
  font-family: Verdana;
  text-transform: uppercase;
`;
const Val = _styled.default.div`
  width: 100%;
  word-break: break-all;
  a {
    color: rgb(133, 200, 255);
  }

  font-size: 12px;
  font-weight: normal;
`;

const HistoryEvent = _ref2 => {
  let {
    ev,
    canister,
    idx,
    showThumb = true
  } = _ref2;
  const boxColor = (0, _react2.useColorModeValue)("white", "gray.700");
  const space = (0, _index.useAnvilSelector)(state => state.user.map.space);
  if (!(ev !== null && ev !== void 0 && ev.info)) return null;
  let etype = Object.keys(ev.info)[0];
  let action = Object.keys(ev.info[etype])[0];
  let details = ev.info[etype][action];
  let transactionId = TransactionId.toText(TransactionId.encode((0, _principal2.PrincipalToSlot)(space, _principal.Principal.fromText(canister)), idx));
  let timestamp = Number(BigInt(details.created) / 1000000n); //TODO: This is will be done in a better way

  const inner = /*#__PURE__*/_react.default.createElement(_react2.Box, {
    bg: boxColor,
    borderRadius: "4",
    border: 1,
    p: 3,
    mb: 2
  }, /*#__PURE__*/_react.default.createElement(KeyVal, {
    k: "TX",
    v: /*#__PURE__*/_react.default.createElement(_Code.TX, null, transactionId)
  }), /*#__PURE__*/_react.default.createElement(KeyVal, {
    k: "Timestamp",
    v: (0, _moment.default)(timestamp).format("LLLL")
  }), /*#__PURE__*/_react.default.createElement(KeyVal, {
    k: "Type",
    v: /*#__PURE__*/_react.default.createElement("b", null, etype + "-" + action)
  }), Object.keys(details).map((key, idx) => {
    if (key === "created") return null;
    let val = details[key];

    if (val.length === 32) {
      val = AccountIdentifier.ArrayToText(val);
      val = /*#__PURE__*/_react.default.createElement(_Code.ACC, {
        short: true
      }, val);
    }

    if (key === "token" || key === "socket" || key === "plug") {
      val = (0, _token.tokenToText)(val); //tokenFromBlob(val);

      val = /*#__PURE__*/_react.default.createElement(_Code.NFTA, null, val);
    }

    if (key === "use") {
      val = JSON.stringify(val);
    }

    if (key === "memo") {
      val = (0, _data.toHexString)(val);
    }

    if (key === "marketplace" || key === "affiliate" || key === "author") {
      if (!val || val.length === 0) return null;
      if (Array.isArray(val)) val = val[0];
      if (!val) return null;
      return /*#__PURE__*/_react.default.createElement("div", {
        key: key
      }, /*#__PURE__*/_react.default.createElement(KeyVal, {
        key: idx + "addr",
        k: key,
        v: /*#__PURE__*/_react.default.createElement(_react2.HStack, null, /*#__PURE__*/_react.default.createElement(_Code.ACC, {
          short: true
        }, AccountIdentifier.ArrayToText(val.address)), /*#__PURE__*/_react.default.createElement("div", null, val.share / 100 + "%"))
      }));
    }

    if (key === "spender") {
      val = _principal.Principal.fromUint8Array(val._arr).toText();
    }

    if (key === "amount") {
      if (val.e8s) val = /*#__PURE__*/_react.default.createElement(_Code.ICP, null, val.e8s);else val = /*#__PURE__*/_react.default.createElement(_Code.ICP, null, val);
    }

    if (key === "pwr") {
      val = /*#__PURE__*/_react.default.createElement(_Code.ICP, null, val);
    }

    if (key === "price") {
      val = /*#__PURE__*/_react.default.createElement(_react2.HStack, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Code.ICP, null, val.amount)), val.marketplace[0] ? /*#__PURE__*/_react.default.createElement("div", null, "marketplace share", " ", (val.marketplace[0].share / 100).toFixed(2), "% -", /*#__PURE__*/_react.default.createElement(_Code.ACC, {
        short: true
      }, AccountIdentifier.ArrayToText(val.marketplace[0].address))) : null);
    }

    return /*#__PURE__*/_react.default.createElement(KeyVal, {
      key: idx,
      k: key,
      v: val
    });
  }), /*#__PURE__*/_react.default.createElement(KeyVal, {
    k: "Hash",
    v: /*#__PURE__*/_react.default.createElement(_Code.HASH, null, (0, _data.toHexString)(ev.hash))
  }));

  if (!showThumb) return inner;
  return /*#__PURE__*/_react.default.createElement(_react2.Stack, {
    direction: "horizontal",
    spacing: "0"
  }, "token" in details ? /*#__PURE__*/_react.default.createElement(_react2.Box, {
    w: "250px",
    mb: "7px",
    mr: "7px"
  }, /*#__PURE__*/_react.default.createElement(_NFT.NFTLarge, {
    id: (0, _token.tokenToText)(details.token)
  })) : null, inner);
};

const History = p => {
  const total = (0, _index.useAnvilSelector)(state => state.history.total);
  const events = (0, _index.useAnvilSelector)(state => state.history.events);
  const focused = (0, _index.useAnvilSelector)(state => state.user.focused);
  const canister = p.match.params.canister;
  let from = parseInt(p.match.params.from, 10);
  if (from <= 0) from = 0;
  const to = parseInt(p.match.params.to, 10);
  const [isLoading, setLoading] = (0, _react.useState)(true);
  const [isTailing, setTailing] = (0, _react.useState)(true);
  const dispatch = (0, _index.useAnvilDispatch)();

  const load = async () => {
    dispatch((0, _history.loadHistory)({
      canister,
      from,
      to
    }));
    setLoading(false);
  };

  (0, _react.useEffect)(() => {
    load();
  }, [dispatch, from, to, canister]);
  (0, _reactUse.useInterval)(async () => {
    let {
      total,
      canister
    } = await dispatch((0, _history.loadInfo)());

    if (to !== total) {// dispatch(push(`/history/${canister}/${total - SHOW}/${total}`));
    }
  }, focused && isTailing ? TAIL_INTERVAL : null);
  if (!events || !events.length) return null;
  let evlist = [];

  for (let idx = events.length; idx >= 0; idx--) {
    evlist.push( /*#__PURE__*/_react.default.createElement(HistoryEvent, {
      key: idx,
      idx: idx + from,
      canister: canister,
      ev: events[idx] ? events[idx][0] : null,
      showThumb: false
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    mt: 8,
    maxW: "590px",
    w: "100%"
  }, /*#__PURE__*/_react.default.createElement(_react2.Flex, null, /*#__PURE__*/_react.default.createElement(_react2.ButtonGroup, {
    mb: "2",
    variant: "outline",
    size: "sm",
    spacing: "3"
  }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    disabled: from <= 0,
    variant: "solid"
  }, "Prev"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    disabled: total <= to,
    variant: "solid"
  }, "Next")), /*#__PURE__*/_react.default.createElement(_react2.Spacer, null), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    size: "sm",
    variant: isTailing ? "solid" : "outline",
    colorScheme: isTailing ? "teal" : "",
    onClick: () => setTailing(!isTailing)
  }, "Tail")), evlist);
};

exports.History = History;

const HistoryTx = p => {
  const total = (0, _index.useAnvilSelector)(state => state.history.total);
  const events = (0, _index.useAnvilSelector)(state => state.history.events);
  const space = (0, _index.useAnvilSelector)(state => state.user.map.space);
  const tx = p.match.params.tx;
  const {
    slot,
    idx: from
  } = TransactionId.decode(TransactionId.fromText(tx));
  let canister = (0, _principal2.PrincipalFromSlot)(space, slot).toText(); //console.log({ canister, slot, from, space });
  // const from = parseInt(tx.substr(tx.lastIndexOf("-") + 1), 10);

  const to = from + 1;
  const [isLoading, setLoading] = (0, _react.useState)(true);
  const dispatch = (0, _index.useAnvilDispatch)();

  const load = async () => {
    dispatch((0, _history.loadHistory)({
      canister,
      from,
      to
    }));
    setLoading(false);
  };

  (0, _react.useEffect)(() => {
    load();
  }, [dispatch, from, to, canister]);
  if (!events || !events.length) return null;
  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    mt: 8
  }, /*#__PURE__*/_react.default.createElement(_react2.ButtonGroup, {
    mb: "2",
    variant: "outline",
    size: "sm",
    spacing: "3"
  }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    variant: "solid"
  }, "Back to history")), events.map((ev, idx) => /*#__PURE__*/_react.default.createElement(HistoryEvent, {
    key: idx,
    idx: idx + from,
    canister: canister,
    ev: ev[0]
  })));
};

exports.HistoryTx = HistoryTx;

const NftHistory = _ref3 => {
  let {
    transactions,
    showThumb
  } = _ref3;
  const [events, setEvents] = (0, _react.useState)([]);
  const dispatch = (0, _index.useAnvilDispatch)();

  const load = async () => {
    let evs = await dispatch((0, _history.loadNftHistory)({
      transactions
    }));
    setEvents(evs);
  };

  (0, _react.useEffect)(() => {
    load();
  }, [dispatch, transactions]);
  if (!events || !events.length) return null;
  return /*#__PURE__*/_react.default.createElement(_react2.Center, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
    mt: 8,
    maxW: "590px",
    w: "100%"
  }, events.map((_ref4, n) => {
    let {
      idx,
      canister,
      data
    } = _ref4;
    return /*#__PURE__*/_react.default.createElement(HistoryEvent, {
      key: n,
      idx: idx,
      canister: canister,
      ev: data,
      showThumb: showThumb
    });
  })));
};

exports.NftHistory = NftHistory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0hpc3RvcnkuanMiXSwibmFtZXMiOlsiU0hPVyIsIlRBSUxfSU5URVJWQUwiLCJIaXN0b3J5UmVkaXJlY3QiLCJpc0xvYWRpbmciLCJzZXRMb2FkaW5nIiwiZGlzcGF0Y2giLCJsb2FkIiwidG90YWwiLCJjYW5pc3RlciIsImZyb20iLCJ0byIsIktleVZhbCIsImsiLCJ2IiwiZGFyayIsIktleSIsInN0eWxlZCIsImRpdiIsInAiLCJWYWwiLCJIaXN0b3J5RXZlbnQiLCJldiIsImlkeCIsInNob3dUaHVtYiIsImJveENvbG9yIiwic3BhY2UiLCJzdGF0ZSIsInVzZXIiLCJtYXAiLCJpbmZvIiwiZXR5cGUiLCJPYmplY3QiLCJrZXlzIiwiYWN0aW9uIiwiZGV0YWlscyIsInRyYW5zYWN0aW9uSWQiLCJUcmFuc2FjdGlvbklkIiwidG9UZXh0IiwiZW5jb2RlIiwiUHJpbmNpcGFsIiwiZnJvbVRleHQiLCJ0aW1lc3RhbXAiLCJOdW1iZXIiLCJCaWdJbnQiLCJjcmVhdGVkIiwiaW5uZXIiLCJmb3JtYXQiLCJrZXkiLCJ2YWwiLCJsZW5ndGgiLCJBY2NvdW50SWRlbnRpZmllciIsIkFycmF5VG9UZXh0IiwiSlNPTiIsInN0cmluZ2lmeSIsIkFycmF5IiwiaXNBcnJheSIsImFkZHJlc3MiLCJzaGFyZSIsImZyb21VaW50OEFycmF5IiwiX2FyciIsImU4cyIsImFtb3VudCIsIm1hcmtldHBsYWNlIiwidG9GaXhlZCIsImhhc2giLCJ0b2tlbiIsIkhpc3RvcnkiLCJoaXN0b3J5IiwiZXZlbnRzIiwiZm9jdXNlZCIsIm1hdGNoIiwicGFyYW1zIiwicGFyc2VJbnQiLCJpc1RhaWxpbmciLCJzZXRUYWlsaW5nIiwiZXZsaXN0IiwicHVzaCIsIkhpc3RvcnlUeCIsInR4Iiwic2xvdCIsImRlY29kZSIsIk5mdEhpc3RvcnkiLCJ0cmFuc2FjdGlvbnMiLCJzZXRFdmVudHMiLCJldnMiLCJuIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQWNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUlBOztBQU1BOztBQUVBOztBQUlBOztBQUtBOztBQU1BOztBQUNBOztBQUVBOzs7Ozs7OztBQXREQTtBQTBEQSxNQUFNQSxJQUFJLEdBQUcsRUFBYixDLENBQWlCOztBQUNqQixNQUFNQyxhQUFhLEdBQUcsSUFBdEIsQyxDQUE0Qjs7QUFFckIsTUFBTUMsZUFBZSxHQUFHLE1BQU07QUFDbkMsUUFBTSxDQUFDQyxTQUFELEVBQVlDLFVBQVosSUFBMEIscUJBQVMsSUFBVCxDQUFoQztBQUVBLFFBQU1DLFFBQVEsR0FBRyw4QkFBakI7O0FBRUEsUUFBTUMsSUFBSSxHQUFHLFlBQVk7QUFDdkJGLElBQUFBLFVBQVUsQ0FBQyxLQUFELENBQVY7QUFFQSxRQUFJO0FBQUVHLE1BQUFBLEtBQUY7QUFBU0MsTUFBQUE7QUFBVCxRQUFzQixNQUFNSCxRQUFRLENBQUMsd0JBQUQsQ0FBeEM7QUFDQSxRQUFJSSxJQUFJLEdBQUdGLEtBQUssR0FBR1AsSUFBbkI7QUFDQSxRQUFJUyxJQUFJLElBQUksQ0FBWixFQUFlQSxJQUFJLEdBQUcsQ0FBUDtBQUNmLFFBQUlDLEVBQUUsR0FBR0gsS0FBVCxDQU51QixDQU92QjtBQUNELEdBUkQ7O0FBVUEsd0JBQVUsTUFBTTtBQUNkRCxJQUFBQSxJQUFJO0FBQ0wsR0FGRCxFQUVHLENBQUNELFFBQUQsQ0FGSDtBQUlBLHNCQUNFLDZCQUFDLFdBQUQ7QUFBSyxJQUFBLEVBQUUsRUFBRTtBQUFULGtCQUNFLDZCQUFDLGVBQUQsT0FERixDQURGO0FBS0QsQ0F4Qk07Ozs7QUEwQlAsTUFBTU0sTUFBTSxHQUFHLFFBQWM7QUFBQSxNQUFiO0FBQUVDLElBQUFBLENBQUY7QUFBS0MsSUFBQUE7QUFBTCxHQUFhO0FBQzNCLFFBQU1DLElBQUksR0FBRywrQkFBa0IsSUFBbEIsRUFBd0IsS0FBeEIsQ0FBYjtBQUNBLHNCQUNFLDZCQUFDLFlBQUQscUJBQ0UsNkJBQUMsR0FBRDtBQUFLLElBQUEsSUFBSSxFQUFFQTtBQUFYLEtBQWtCRixDQUFsQixDQURGLGVBRUUsNkJBQUMsR0FBRCxRQUFNQyxDQUFOLENBRkYsQ0FERjtBQU1ELENBUkQ7O0FBVUEsTUFBTUUsR0FBRyxHQUFHQyxnQkFBT0MsR0FBSTtBQUN2QjtBQUNBLFdBQVlDLENBQUQsSUFBUUEsQ0FBQyxDQUFDSixJQUFGLEdBQVMsVUFBVCxHQUFzQixVQUFZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FQQTtBQVNBLE1BQU1LLEdBQUcsR0FBR0gsZ0JBQU9DLEdBQUk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBVEE7O0FBV0EsTUFBTUcsWUFBWSxHQUFHLFNBQTZDO0FBQUEsTUFBNUM7QUFBRUMsSUFBQUEsRUFBRjtBQUFNYixJQUFBQSxRQUFOO0FBQWdCYyxJQUFBQSxHQUFoQjtBQUFxQkMsSUFBQUEsU0FBUyxHQUFHO0FBQWpDLEdBQTRDO0FBQ2hFLFFBQU1DLFFBQVEsR0FBRywrQkFBa0IsT0FBbEIsRUFBMkIsVUFBM0IsQ0FBakI7QUFDQSxRQUFNQyxLQUFLLEdBQUcsNkJBQWFDLEtBQUQsSUFBV0EsS0FBSyxDQUFDQyxJQUFOLENBQVdDLEdBQVgsQ0FBZUgsS0FBdEMsQ0FBZDtBQUVBLE1BQUksRUFBQ0osRUFBRCxhQUFDQSxFQUFELGVBQUNBLEVBQUUsQ0FBRVEsSUFBTCxDQUFKLEVBQWUsT0FBTyxJQUFQO0FBQ2YsTUFBSUMsS0FBSyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWVgsRUFBRSxDQUFDUSxJQUFmLEVBQXFCLENBQXJCLENBQVo7QUFDQSxNQUFJSSxNQUFNLEdBQUdGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZWCxFQUFFLENBQUNRLElBQUgsQ0FBUUMsS0FBUixDQUFaLEVBQTRCLENBQTVCLENBQWI7QUFDQSxNQUFJSSxPQUFPLEdBQUdiLEVBQUUsQ0FBQ1EsSUFBSCxDQUFRQyxLQUFSLEVBQWVHLE1BQWYsQ0FBZDtBQUVBLE1BQUlFLGFBQWEsR0FBR0MsYUFBYSxDQUFDQyxNQUFkLENBQ2xCRCxhQUFhLENBQUNFLE1BQWQsQ0FDRSxpQ0FBZ0JiLEtBQWhCLEVBQXVCYyxxQkFBVUMsUUFBVixDQUFtQmhDLFFBQW5CLENBQXZCLENBREYsRUFFRWMsR0FGRixDQURrQixDQUFwQjtBQU1BLE1BQUltQixTQUFTLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDVCxPQUFPLENBQUNVLE9BQVQsQ0FBTixHQUEwQixRQUEzQixDQUF0QixDQWZnRSxDQWdCaEU7O0FBRUEsUUFBTUMsS0FBSyxnQkFDVCw2QkFBQyxXQUFEO0FBQUssSUFBQSxFQUFFLEVBQUVyQixRQUFUO0FBQW1CLElBQUEsWUFBWSxFQUFFLEdBQWpDO0FBQXNDLElBQUEsTUFBTSxFQUFFLENBQTlDO0FBQWlELElBQUEsQ0FBQyxFQUFFLENBQXBEO0FBQXVELElBQUEsRUFBRSxFQUFFO0FBQTNELGtCQUNFLDZCQUFDLE1BQUQ7QUFBUSxJQUFBLENBQUMsRUFBRSxJQUFYO0FBQWlCLElBQUEsQ0FBQyxlQUFFLDZCQUFDLFFBQUQsUUFBS1csYUFBTDtBQUFwQixJQURGLGVBRUUsNkJBQUMsTUFBRDtBQUFRLElBQUEsQ0FBQyxFQUFFLFdBQVg7QUFBd0IsSUFBQSxDQUFDLEVBQUUscUJBQU9NLFNBQVAsRUFBa0JLLE1BQWxCLENBQXlCLE1BQXpCO0FBQTNCLElBRkYsZUFJRSw2QkFBQyxNQUFEO0FBQVEsSUFBQSxDQUFDLEVBQUUsTUFBWDtBQUFtQixJQUFBLENBQUMsZUFBRSx3Q0FBSWhCLEtBQUssR0FBRyxHQUFSLEdBQWNHLE1BQWxCO0FBQXRCLElBSkYsRUFNR0YsTUFBTSxDQUFDQyxJQUFQLENBQVlFLE9BQVosRUFBcUJOLEdBQXJCLENBQXlCLENBQUNtQixHQUFELEVBQU16QixHQUFOLEtBQWM7QUFDdEMsUUFBSXlCLEdBQUcsS0FBSyxTQUFaLEVBQXVCLE9BQU8sSUFBUDtBQUV2QixRQUFJQyxHQUFHLEdBQUdkLE9BQU8sQ0FBQ2EsR0FBRCxDQUFqQjs7QUFDQSxRQUFJQyxHQUFHLENBQUNDLE1BQUosS0FBZSxFQUFuQixFQUF1QjtBQUNyQkQsTUFBQUEsR0FBRyxHQUFHRSxpQkFBaUIsQ0FBQ0MsV0FBbEIsQ0FBOEJILEdBQTlCLENBQU47QUFDQUEsTUFBQUEsR0FBRyxnQkFBRyw2QkFBQyxTQUFEO0FBQUssUUFBQSxLQUFLLEVBQUU7QUFBWixTQUFtQkEsR0FBbkIsQ0FBTjtBQUNEOztBQUVELFFBQUlELEdBQUcsS0FBSyxPQUFSLElBQW1CQSxHQUFHLEtBQUssUUFBM0IsSUFBdUNBLEdBQUcsS0FBSyxNQUFuRCxFQUEyRDtBQUN6REMsTUFBQUEsR0FBRyxHQUFHLHdCQUFZQSxHQUFaLENBQU4sQ0FEeUQsQ0FDakM7O0FBQ3hCQSxNQUFBQSxHQUFHLGdCQUFHLDZCQUFDLFVBQUQsUUFBT0EsR0FBUCxDQUFOO0FBQ0Q7O0FBRUQsUUFBSUQsR0FBRyxLQUFLLEtBQVosRUFBbUI7QUFDakJDLE1BQUFBLEdBQUcsR0FBR0ksSUFBSSxDQUFDQyxTQUFMLENBQWVMLEdBQWYsQ0FBTjtBQUNEOztBQUVELFFBQUlELEdBQUcsS0FBSyxNQUFaLEVBQW9CO0FBQ2xCQyxNQUFBQSxHQUFHLEdBQUcsdUJBQVlBLEdBQVosQ0FBTjtBQUNEOztBQUVELFFBQUlELEdBQUcsS0FBSyxhQUFSLElBQXlCQSxHQUFHLEtBQUssV0FBakMsSUFBZ0RBLEdBQUcsS0FBSyxRQUE1RCxFQUFzRTtBQUNwRSxVQUFJLENBQUNDLEdBQUQsSUFBUUEsR0FBRyxDQUFDQyxNQUFKLEtBQWUsQ0FBM0IsRUFBOEIsT0FBTyxJQUFQO0FBQzlCLFVBQUlLLEtBQUssQ0FBQ0MsT0FBTixDQUFjUCxHQUFkLENBQUosRUFBd0JBLEdBQUcsR0FBR0EsR0FBRyxDQUFDLENBQUQsQ0FBVDtBQUN4QixVQUFJLENBQUNBLEdBQUwsRUFBVSxPQUFPLElBQVA7QUFFViwwQkFDRTtBQUFLLFFBQUEsR0FBRyxFQUFFRDtBQUFWLHNCQUNFLDZCQUFDLE1BQUQ7QUFDRSxRQUFBLEdBQUcsRUFBRXpCLEdBQUcsR0FBRyxNQURiO0FBRUUsUUFBQSxDQUFDLEVBQUV5QixHQUZMO0FBR0UsUUFBQSxDQUFDLGVBQ0MsNkJBQUMsY0FBRCxxQkFDRSw2QkFBQyxTQUFEO0FBQUssVUFBQSxLQUFLLEVBQUU7QUFBWixXQUNHRyxpQkFBaUIsQ0FBQ0MsV0FBbEIsQ0FBOEJILEdBQUcsQ0FBQ1EsT0FBbEMsQ0FESCxDQURGLGVBSUUsMENBQU1SLEdBQUcsQ0FBQ1MsS0FBSixHQUFZLEdBQVosR0FBa0IsR0FBeEIsQ0FKRjtBQUpKLFFBREYsQ0FERjtBQWdCRDs7QUFFRCxRQUFJVixHQUFHLEtBQUssU0FBWixFQUF1QjtBQUNyQkMsTUFBQUEsR0FBRyxHQUFHVCxxQkFBVW1CLGNBQVYsQ0FBeUJWLEdBQUcsQ0FBQ1csSUFBN0IsRUFBbUN0QixNQUFuQyxFQUFOO0FBQ0Q7O0FBRUQsUUFBSVUsR0FBRyxLQUFLLFFBQVosRUFBc0I7QUFDcEIsVUFBSUMsR0FBRyxDQUFDWSxHQUFSLEVBQWFaLEdBQUcsZ0JBQUcsNkJBQUMsU0FBRCxRQUFNQSxHQUFHLENBQUNZLEdBQVYsQ0FBTixDQUFiLEtBQ0taLEdBQUcsZ0JBQUcsNkJBQUMsU0FBRCxRQUFNQSxHQUFOLENBQU47QUFDTjs7QUFFRCxRQUFJRCxHQUFHLEtBQUssS0FBWixFQUFtQjtBQUNqQkMsTUFBQUEsR0FBRyxnQkFBRyw2QkFBQyxTQUFELFFBQU1BLEdBQU4sQ0FBTjtBQUNEOztBQUVELFFBQUlELEdBQUcsS0FBSyxPQUFaLEVBQXFCO0FBQ25CQyxNQUFBQSxHQUFHLGdCQUNELDZCQUFDLGNBQUQscUJBQ0UsdURBQ0UsNkJBQUMsU0FBRCxRQUFNQSxHQUFHLENBQUNhLE1BQVYsQ0FERixDQURGLEVBSUdiLEdBQUcsQ0FBQ2MsV0FBSixDQUFnQixDQUFoQixpQkFDQywrREFDb0IsR0FEcEIsRUFFRyxDQUFDZCxHQUFHLENBQUNjLFdBQUosQ0FBZ0IsQ0FBaEIsRUFBbUJMLEtBQW5CLEdBQTJCLEdBQTVCLEVBQWlDTSxPQUFqQyxDQUF5QyxDQUF6QyxDQUZILHNCQUdFLDZCQUFDLFNBQUQ7QUFBSyxRQUFBLEtBQUssRUFBRTtBQUFaLFNBQ0diLGlCQUFpQixDQUFDQyxXQUFsQixDQUE4QkgsR0FBRyxDQUFDYyxXQUFKLENBQWdCLENBQWhCLEVBQW1CTixPQUFqRCxDQURILENBSEYsQ0FERCxHQVFHLElBWk4sQ0FERjtBQWdCRDs7QUFFRCx3QkFBTyw2QkFBQyxNQUFEO0FBQVEsTUFBQSxHQUFHLEVBQUVsQyxHQUFiO0FBQWtCLE1BQUEsQ0FBQyxFQUFFeUIsR0FBckI7QUFBMEIsTUFBQSxDQUFDLEVBQUVDO0FBQTdCLE1BQVA7QUFDRCxHQTlFQSxDQU5ILGVBcUZFLDZCQUFDLE1BQUQ7QUFBUSxJQUFBLENBQUMsRUFBRSxNQUFYO0FBQW1CLElBQUEsQ0FBQyxlQUFFLDZCQUFDLFVBQUQsUUFBTyx1QkFBWTNCLEVBQUUsQ0FBQzJDLElBQWYsQ0FBUDtBQUF0QixJQXJGRixDQURGOztBQTBGQSxNQUFJLENBQUN6QyxTQUFMLEVBQWdCLE9BQU9zQixLQUFQO0FBRWhCLHNCQUNFLDZCQUFDLGFBQUQ7QUFBTyxJQUFBLFNBQVMsRUFBQyxZQUFqQjtBQUE4QixJQUFBLE9BQU8sRUFBQztBQUF0QyxLQUNHLFdBQVdYLE9BQVgsZ0JBQ0MsNkJBQUMsV0FBRDtBQUFLLElBQUEsQ0FBQyxFQUFDLE9BQVA7QUFBZSxJQUFBLEVBQUUsRUFBQyxLQUFsQjtBQUF3QixJQUFBLEVBQUUsRUFBQztBQUEzQixrQkFDRSw2QkFBQyxhQUFEO0FBQVUsSUFBQSxFQUFFLEVBQUUsd0JBQVlBLE9BQU8sQ0FBQytCLEtBQXBCO0FBQWQsSUFERixDQURELEdBSUcsSUFMTixFQU1HcEIsS0FOSCxDQURGO0FBVUQsQ0F4SEQ7O0FBMEhPLE1BQU1xQixPQUFPLEdBQUloRCxDQUFELElBQU87QUFDNUIsUUFBTVgsS0FBSyxHQUFHLDZCQUFhbUIsS0FBRCxJQUFXQSxLQUFLLENBQUN5QyxPQUFOLENBQWM1RCxLQUFyQyxDQUFkO0FBQ0EsUUFBTTZELE1BQU0sR0FBRyw2QkFBYTFDLEtBQUQsSUFBV0EsS0FBSyxDQUFDeUMsT0FBTixDQUFjQyxNQUFyQyxDQUFmO0FBQ0EsUUFBTUMsT0FBTyxHQUFHLDZCQUFhM0MsS0FBRCxJQUFXQSxLQUFLLENBQUNDLElBQU4sQ0FBVzBDLE9BQWxDLENBQWhCO0FBRUEsUUFBTTdELFFBQVEsR0FBR1UsQ0FBQyxDQUFDb0QsS0FBRixDQUFRQyxNQUFSLENBQWUvRCxRQUFoQztBQUNBLE1BQUlDLElBQUksR0FBRytELFFBQVEsQ0FBQ3RELENBQUMsQ0FBQ29ELEtBQUYsQ0FBUUMsTUFBUixDQUFlOUQsSUFBaEIsRUFBc0IsRUFBdEIsQ0FBbkI7QUFDQSxNQUFJQSxJQUFJLElBQUksQ0FBWixFQUFlQSxJQUFJLEdBQUcsQ0FBUDtBQUVmLFFBQU1DLEVBQUUsR0FBRzhELFFBQVEsQ0FBQ3RELENBQUMsQ0FBQ29ELEtBQUYsQ0FBUUMsTUFBUixDQUFlN0QsRUFBaEIsRUFBb0IsRUFBcEIsQ0FBbkI7QUFDQSxRQUFNLENBQUNQLFNBQUQsRUFBWUMsVUFBWixJQUEwQixxQkFBUyxJQUFULENBQWhDO0FBRUEsUUFBTSxDQUFDcUUsU0FBRCxFQUFZQyxVQUFaLElBQTBCLHFCQUFTLElBQVQsQ0FBaEM7QUFFQSxRQUFNckUsUUFBUSxHQUFHLDhCQUFqQjs7QUFFQSxRQUFNQyxJQUFJLEdBQUcsWUFBWTtBQUN2QkQsSUFBQUEsUUFBUSxDQUFDLDBCQUFZO0FBQUVHLE1BQUFBLFFBQUY7QUFBWUMsTUFBQUEsSUFBWjtBQUFrQkMsTUFBQUE7QUFBbEIsS0FBWixDQUFELENBQVI7QUFDQU4sSUFBQUEsVUFBVSxDQUFDLEtBQUQsQ0FBVjtBQUNELEdBSEQ7O0FBS0Esd0JBQVUsTUFBTTtBQUNkRSxJQUFBQSxJQUFJO0FBQ0wsR0FGRCxFQUVHLENBQUNELFFBQUQsRUFBV0ksSUFBWCxFQUFpQkMsRUFBakIsRUFBcUJGLFFBQXJCLENBRkg7QUFJQSw2QkFDRSxZQUFZO0FBQ1YsUUFBSTtBQUFFRCxNQUFBQSxLQUFGO0FBQVNDLE1BQUFBO0FBQVQsUUFBc0IsTUFBTUgsUUFBUSxDQUFDLHdCQUFELENBQXhDOztBQUNBLFFBQUlLLEVBQUUsS0FBS0gsS0FBWCxFQUFrQixDQUNoQjtBQUNEO0FBQ0YsR0FOSCxFQU9FOEQsT0FBTyxJQUFJSSxTQUFYLEdBQXVCeEUsYUFBdkIsR0FBdUMsSUFQekM7QUFVQSxNQUFJLENBQUNtRSxNQUFELElBQVcsQ0FBQ0EsTUFBTSxDQUFDbkIsTUFBdkIsRUFBK0IsT0FBTyxJQUFQO0FBRS9CLE1BQUkwQixNQUFNLEdBQUcsRUFBYjs7QUFDQSxPQUFLLElBQUlyRCxHQUFHLEdBQUc4QyxNQUFNLENBQUNuQixNQUF0QixFQUE4QjNCLEdBQUcsSUFBSSxDQUFyQyxFQUF3Q0EsR0FBRyxFQUEzQyxFQUErQztBQUM3Q3FELElBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxlQUNFLDZCQUFDLFlBQUQ7QUFDRSxNQUFBLEdBQUcsRUFBRXRELEdBRFA7QUFFRSxNQUFBLEdBQUcsRUFBRUEsR0FBRyxHQUFHYixJQUZiO0FBR0UsTUFBQSxRQUFRLEVBQUVELFFBSFo7QUFJRSxNQUFBLEVBQUUsRUFBRTRELE1BQU0sQ0FBQzlDLEdBQUQsQ0FBTixHQUFjOEMsTUFBTSxDQUFDOUMsR0FBRCxDQUFOLENBQVksQ0FBWixDQUFkLEdBQStCLElBSnJDO0FBS0UsTUFBQSxTQUFTLEVBQUU7QUFMYixNQURGO0FBU0Q7O0FBRUQsc0JBQ0UsNkJBQUMsV0FBRDtBQUFLLElBQUEsRUFBRSxFQUFFLENBQVQ7QUFBWSxJQUFBLElBQUksRUFBRSxPQUFsQjtBQUEyQixJQUFBLENBQUMsRUFBQztBQUE3QixrQkFPRSw2QkFBQyxZQUFELHFCQUNFLDZCQUFDLG1CQUFEO0FBQWEsSUFBQSxFQUFFLEVBQUMsR0FBaEI7QUFBb0IsSUFBQSxPQUFPLEVBQUMsU0FBNUI7QUFBc0MsSUFBQSxJQUFJLEVBQUMsSUFBM0M7QUFBZ0QsSUFBQSxPQUFPLEVBQUM7QUFBeEQsa0JBQ0UsNkJBQUMsY0FBRDtBQUFRLElBQUEsUUFBUSxFQUFFYixJQUFJLElBQUksQ0FBMUI7QUFBNkIsSUFBQSxPQUFPLEVBQUM7QUFBckMsWUFERixlQUtFLDZCQUFDLGNBQUQ7QUFBUSxJQUFBLFFBQVEsRUFBRUYsS0FBSyxJQUFJRyxFQUEzQjtBQUErQixJQUFBLE9BQU8sRUFBQztBQUF2QyxZQUxGLENBREYsZUFVRSw2QkFBQyxjQUFELE9BVkYsZUFXRSw2QkFBQyxjQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUMsSUFEUDtBQUVFLElBQUEsT0FBTyxFQUFFK0QsU0FBUyxHQUFHLE9BQUgsR0FBYSxTQUZqQztBQUdFLElBQUEsV0FBVyxFQUFFQSxTQUFTLEdBQUcsTUFBSCxHQUFZLEVBSHBDO0FBSUUsSUFBQSxPQUFPLEVBQUUsTUFBTUMsVUFBVSxDQUFDLENBQUNELFNBQUY7QUFKM0IsWUFYRixDQVBGLEVBMkJHRSxNQTNCSCxDQURGO0FBK0JELENBakZNOzs7O0FBbUZBLE1BQU1FLFNBQVMsR0FBSTNELENBQUQsSUFBTztBQUM5QixRQUFNWCxLQUFLLEdBQUcsNkJBQWFtQixLQUFELElBQVdBLEtBQUssQ0FBQ3lDLE9BQU4sQ0FBYzVELEtBQXJDLENBQWQ7QUFDQSxRQUFNNkQsTUFBTSxHQUFHLDZCQUFhMUMsS0FBRCxJQUFXQSxLQUFLLENBQUN5QyxPQUFOLENBQWNDLE1BQXJDLENBQWY7QUFDQSxRQUFNM0MsS0FBSyxHQUFHLDZCQUFhQyxLQUFELElBQVdBLEtBQUssQ0FBQ0MsSUFBTixDQUFXQyxHQUFYLENBQWVILEtBQXRDLENBQWQ7QUFFQSxRQUFNcUQsRUFBRSxHQUFHNUQsQ0FBQyxDQUFDb0QsS0FBRixDQUFRQyxNQUFSLENBQWVPLEVBQTFCO0FBRUEsUUFBTTtBQUFFQyxJQUFBQSxJQUFGO0FBQVF6RCxJQUFBQSxHQUFHLEVBQUViO0FBQWIsTUFBc0IyQixhQUFhLENBQUM0QyxNQUFkLENBQXFCNUMsYUFBYSxDQUFDSSxRQUFkLENBQXVCc0MsRUFBdkIsQ0FBckIsQ0FBNUI7QUFDQSxNQUFJdEUsUUFBUSxHQUFHLG1DQUFrQmlCLEtBQWxCLEVBQXlCc0QsSUFBekIsRUFBK0IxQyxNQUEvQixFQUFmLENBUjhCLENBUzlCO0FBQ0E7O0FBRUEsUUFBTTNCLEVBQUUsR0FBR0QsSUFBSSxHQUFHLENBQWxCO0FBRUEsUUFBTSxDQUFDTixTQUFELEVBQVlDLFVBQVosSUFBMEIscUJBQVMsSUFBVCxDQUFoQztBQUVBLFFBQU1DLFFBQVEsR0FBRyw4QkFBakI7O0FBRUEsUUFBTUMsSUFBSSxHQUFHLFlBQVk7QUFDdkJELElBQUFBLFFBQVEsQ0FBQywwQkFBWTtBQUFFRyxNQUFBQSxRQUFGO0FBQVlDLE1BQUFBLElBQVo7QUFBa0JDLE1BQUFBO0FBQWxCLEtBQVosQ0FBRCxDQUFSO0FBQ0FOLElBQUFBLFVBQVUsQ0FBQyxLQUFELENBQVY7QUFDRCxHQUhEOztBQUtBLHdCQUFVLE1BQU07QUFDZEUsSUFBQUEsSUFBSTtBQUNMLEdBRkQsRUFFRyxDQUFDRCxRQUFELEVBQVdJLElBQVgsRUFBaUJDLEVBQWpCLEVBQXFCRixRQUFyQixDQUZIO0FBSUEsTUFBSSxDQUFDNEQsTUFBRCxJQUFXLENBQUNBLE1BQU0sQ0FBQ25CLE1BQXZCLEVBQStCLE9BQU8sSUFBUDtBQUUvQixzQkFDRSw2QkFBQyxXQUFEO0FBQUssSUFBQSxFQUFFLEVBQUU7QUFBVCxrQkFDRSw2QkFBQyxtQkFBRDtBQUFhLElBQUEsRUFBRSxFQUFDLEdBQWhCO0FBQW9CLElBQUEsT0FBTyxFQUFDLFNBQTVCO0FBQXNDLElBQUEsSUFBSSxFQUFDLElBQTNDO0FBQWdELElBQUEsT0FBTyxFQUFDO0FBQXhELGtCQUNFLDZCQUFDLGNBQUQ7QUFBUSxJQUFBLE9BQU8sRUFBQztBQUFoQix1QkFERixDQURGLEVBSUdtQixNQUFNLENBQUN4QyxHQUFQLENBQVcsQ0FBQ1AsRUFBRCxFQUFLQyxHQUFMLGtCQUNWLDZCQUFDLFlBQUQ7QUFDRSxJQUFBLEdBQUcsRUFBRUEsR0FEUDtBQUVFLElBQUEsR0FBRyxFQUFFQSxHQUFHLEdBQUdiLElBRmI7QUFHRSxJQUFBLFFBQVEsRUFBRUQsUUFIWjtBQUlFLElBQUEsRUFBRSxFQUFFYSxFQUFFLENBQUMsQ0FBRDtBQUpSLElBREQsQ0FKSCxDQURGO0FBZUQsQ0E1Q007Ozs7QUE4Q0EsTUFBTTRELFVBQVUsR0FBRyxTQUFpQztBQUFBLE1BQWhDO0FBQUVDLElBQUFBLFlBQUY7QUFBZ0IzRCxJQUFBQTtBQUFoQixHQUFnQztBQUN6RCxRQUFNLENBQUM2QyxNQUFELEVBQVNlLFNBQVQsSUFBc0IscUJBQVMsRUFBVCxDQUE1QjtBQUVBLFFBQU05RSxRQUFRLEdBQUcsOEJBQWpCOztBQUVBLFFBQU1DLElBQUksR0FBRyxZQUFZO0FBQ3ZCLFFBQUk4RSxHQUFHLEdBQUcsTUFBTS9FLFFBQVEsQ0FBQyw2QkFBZTtBQUFFNkUsTUFBQUE7QUFBRixLQUFmLENBQUQsQ0FBeEI7QUFDQUMsSUFBQUEsU0FBUyxDQUFDQyxHQUFELENBQVQ7QUFDRCxHQUhEOztBQUtBLHdCQUFVLE1BQU07QUFDZDlFLElBQUFBLElBQUk7QUFDTCxHQUZELEVBRUcsQ0FBQ0QsUUFBRCxFQUFXNkUsWUFBWCxDQUZIO0FBSUEsTUFBSSxDQUFDZCxNQUFELElBQVcsQ0FBQ0EsTUFBTSxDQUFDbkIsTUFBdkIsRUFBK0IsT0FBTyxJQUFQO0FBRS9CLHNCQUNFLDZCQUFDLGNBQUQscUJBQ0UsNkJBQUMsV0FBRDtBQUFLLElBQUEsRUFBRSxFQUFFLENBQVQ7QUFBWSxJQUFBLElBQUksRUFBRSxPQUFsQjtBQUEyQixJQUFBLENBQUMsRUFBQztBQUE3QixLQUNHbUIsTUFBTSxDQUFDeEMsR0FBUCxDQUFXLFFBQTBCeUQsQ0FBMUI7QUFBQSxRQUFDO0FBQUUvRCxNQUFBQSxHQUFGO0FBQU9kLE1BQUFBLFFBQVA7QUFBaUI4RSxNQUFBQTtBQUFqQixLQUFEO0FBQUEsd0JBQ1YsNkJBQUMsWUFBRDtBQUNFLE1BQUEsR0FBRyxFQUFFRCxDQURQO0FBRUUsTUFBQSxHQUFHLEVBQUUvRCxHQUZQO0FBR0UsTUFBQSxRQUFRLEVBQUVkLFFBSFo7QUFJRSxNQUFBLEVBQUUsRUFBRThFLElBSk47QUFLRSxNQUFBLFNBQVMsRUFBRS9EO0FBTGIsTUFEVTtBQUFBLEdBQVgsQ0FESCxDQURGLENBREY7QUFlRCxDQS9CTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBCaWdJbnQgKi9cbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIEJveCxcbiAgU3Bpbm5lcixcbiAgV3JhcCxcbiAgdXNlQ29sb3JNb2RlVmFsdWUsXG4gIENlbnRlcixcbiAgQnV0dG9uLFxuICBTdGFjayxcbiAgRmxleCxcbiAgQnV0dG9uR3JvdXAsXG4gIFNwYWNlcixcbiAgSFN0YWNrLFxufSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUHJpbmNpcGFsIH0gZnJvbSBcIkBkZmluaXR5L3ByaW5jaXBhbFwiO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuaW1wb3J0IHsgTkZUIH0gZnJvbSBcIi4vTkZUXCI7XG5pbXBvcnQgaXRlbWdyaWQgZnJvbSBcIi4uL2Fzc2V0cy9pdGVtZ3JpZC5wbmdcIjtcbmltcG9ydCBpdGVtZ3JpZF9saWdodCBmcm9tIFwiLi4vYXNzZXRzL2l0ZW1ncmlkX2xpZ2h0LnBuZ1wiO1xuaW1wb3J0IHsgdXNlV2luZG93U2l6ZSwgdXNlSW50ZXJ2YWwgfSBmcm9tIFwicmVhY3QtdXNlXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcblxuaW1wb3J0IHtcbiAgdXNlQW52aWxTZWxlY3RvciBhcyB1c2VTZWxlY3RvcixcbiAgdXNlQW52aWxEaXNwYXRjaCBhcyB1c2VEaXNwYXRjaCxcbn0gZnJvbSBcIi4uL2luZGV4LmpzXCI7XG5pbXBvcnQge1xuICBsb2FkSW5mbyxcbiAgbG9hZEhpc3RvcnksXG4gIHRhaWxIaXN0b3J5LFxuICBsb2FkTmZ0SGlzdG9yeSxcbn0gZnJvbSBcIi4uL3JlZHVjZXJzL2hpc3RvcnlcIjtcbmltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuXG5pbXBvcnQge1xuICB0b0hleFN0cmluZyxcbiAgYnl0ZXNUb0Jhc2U1OCxcbn0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL2RhdGEuanNcIjtcbmltcG9ydCB7XG4gIHRva2VuRnJvbUJsb2IsXG4gIHRva2VuVG9UZXh0LFxuICBkZWNvZGVUb2tlbklkLFxufSBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvdG9rZW4uanNcIjtcbmltcG9ydCB7XG4gIFByaW5jaXBhbEZyb21TbG90LFxuICBQcmluY2lwYWxUb0lkeCxcbiAgUHJpbmNpcGFsVG9TbG90LFxufSBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvcHJpbmNpcGFsLmpzXCI7XG5cbmltcG9ydCAqIGFzIEFjY291bnRJZGVudGlmaWVyIGZyb20gXCJAdnZ2LWludGVyYWN0aXZlL25mdGFudmlsLXRvb2xzL2Nqcy9hY2NvdW50aWRlbnRpZmllci5qc1wiO1xuaW1wb3J0ICogYXMgVHJhbnNhY3Rpb25JZCBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvdHJhbnNhY3Rpb25pZC5qc1wiO1xuXG5pbXBvcnQgeyBUWCwgQUNDLCBORlRBLCBIQVNILCBQV1IsIElDUCB9IGZyb20gXCIuL0NvZGVcIjtcblxuaW1wb3J0IHsgTkZUTGFyZ2UgfSBmcm9tIFwiLi9ORlRcIjtcblxuY29uc3QgU0hPVyA9IDEwOyAvLyBtYXggcmVjb3JkcyBzaG93biBvbiBzY3JlZW5cbmNvbnN0IFRBSUxfSU5URVJWQUwgPSAxMDAwOyAvLyBldmVyeSAxIHNlY1xuXG5leHBvcnQgY29uc3QgSGlzdG9yeVJlZGlyZWN0ID0gKCkgPT4ge1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuICBjb25zdCBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldExvYWRpbmcoZmFsc2UpO1xuXG4gICAgbGV0IHsgdG90YWwsIGNhbmlzdGVyIH0gPSBhd2FpdCBkaXNwYXRjaChsb2FkSW5mbygpKTtcbiAgICBsZXQgZnJvbSA9IHRvdGFsIC0gU0hPVztcbiAgICBpZiAoZnJvbSA8PSAwKSBmcm9tID0gMDtcbiAgICBsZXQgdG8gPSB0b3RhbDtcbiAgICAvLyBkaXNwYXRjaChwdXNoKGAvaGlzdG9yeS8ke2NhbmlzdGVyfS8ke2Zyb219LyR7dG99YCkpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9hZCgpO1xuICB9LCBbZGlzcGF0Y2hdKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggbXQ9e1wiMTVcIn0+XG4gICAgICA8U3Bpbm5lciAvPlxuICAgIDwvQm94PlxuICApO1xufTtcblxuY29uc3QgS2V5VmFsID0gKHsgaywgdiB9KSA9PiB7XG4gIGNvbnN0IGRhcmsgPSB1c2VDb2xvck1vZGVWYWx1ZSh0cnVlLCBmYWxzZSk7XG4gIHJldHVybiAoXG4gICAgPEZsZXg+XG4gICAgICA8S2V5IGRhcms9e2Rhcmt9PntrfTwvS2V5PlxuICAgICAgPFZhbD57dn08L1ZhbD5cbiAgICA8L0ZsZXg+XG4gICk7XG59O1xuXG5jb25zdCBLZXkgPSBzdHlsZWQuZGl2YFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgY29sb3I6ICR7KHApID0+IChwLmRhcmsgPyBcImdyYXkuMjAwXCIgOiBcImdyYXkuOTAwXCIpfTtcbiAgd2lkdGg6IDEzMHB4O1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtZmFtaWx5OiBWZXJkYW5hO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuYDtcblxuY29uc3QgVmFsID0gc3R5bGVkLmRpdmBcbiAgd2lkdGg6IDEwMCU7XG4gIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgYSB7XG4gICAgY29sb3I6IHJnYigxMzMsIDIwMCwgMjU1KTtcbiAgfVxuXG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbmA7XG5cbmNvbnN0IEhpc3RvcnlFdmVudCA9ICh7IGV2LCBjYW5pc3RlciwgaWR4LCBzaG93VGh1bWIgPSB0cnVlIH0pID0+IHtcbiAgY29uc3QgYm94Q29sb3IgPSB1c2VDb2xvck1vZGVWYWx1ZShcIndoaXRlXCIsIFwiZ3JheS43MDBcIik7XG4gIGNvbnN0IHNwYWNlID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS51c2VyLm1hcC5zcGFjZSk7XG5cbiAgaWYgKCFldj8uaW5mbykgcmV0dXJuIG51bGw7XG4gIGxldCBldHlwZSA9IE9iamVjdC5rZXlzKGV2LmluZm8pWzBdO1xuICBsZXQgYWN0aW9uID0gT2JqZWN0LmtleXMoZXYuaW5mb1tldHlwZV0pWzBdO1xuICBsZXQgZGV0YWlscyA9IGV2LmluZm9bZXR5cGVdW2FjdGlvbl07XG5cbiAgbGV0IHRyYW5zYWN0aW9uSWQgPSBUcmFuc2FjdGlvbklkLnRvVGV4dChcbiAgICBUcmFuc2FjdGlvbklkLmVuY29kZShcbiAgICAgIFByaW5jaXBhbFRvU2xvdChzcGFjZSwgUHJpbmNpcGFsLmZyb21UZXh0KGNhbmlzdGVyKSksXG4gICAgICBpZHhcbiAgICApXG4gICk7XG4gIGxldCB0aW1lc3RhbXAgPSBOdW1iZXIoQmlnSW50KGRldGFpbHMuY3JlYXRlZCkgLyAxMDAwMDAwbik7XG4gIC8vVE9ETzogVGhpcyBpcyB3aWxsIGJlIGRvbmUgaW4gYSBiZXR0ZXIgd2F5XG5cbiAgY29uc3QgaW5uZXIgPSAoXG4gICAgPEJveCBiZz17Ym94Q29sb3J9IGJvcmRlclJhZGl1cz17XCI0XCJ9IGJvcmRlcj17MX0gcD17M30gbWI9ezJ9PlxuICAgICAgPEtleVZhbCBrPXtcIlRYXCJ9IHY9ezxUWD57dHJhbnNhY3Rpb25JZH08L1RYPn0gLz5cbiAgICAgIDxLZXlWYWwgaz17XCJUaW1lc3RhbXBcIn0gdj17bW9tZW50KHRpbWVzdGFtcCkuZm9ybWF0KFwiTExMTFwiKX0gLz5cblxuICAgICAgPEtleVZhbCBrPXtcIlR5cGVcIn0gdj17PGI+e2V0eXBlICsgXCItXCIgKyBhY3Rpb259PC9iPn0gLz5cblxuICAgICAge09iamVjdC5rZXlzKGRldGFpbHMpLm1hcCgoa2V5LCBpZHgpID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJjcmVhdGVkXCIpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCB2YWwgPSBkZXRhaWxzW2tleV07XG4gICAgICAgIGlmICh2YWwubGVuZ3RoID09PSAzMikge1xuICAgICAgICAgIHZhbCA9IEFjY291bnRJZGVudGlmaWVyLkFycmF5VG9UZXh0KHZhbCk7XG4gICAgICAgICAgdmFsID0gPEFDQyBzaG9ydD17dHJ1ZX0+e3ZhbH08L0FDQz47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ID09PSBcInRva2VuXCIgfHwga2V5ID09PSBcInNvY2tldFwiIHx8IGtleSA9PT0gXCJwbHVnXCIpIHtcbiAgICAgICAgICB2YWwgPSB0b2tlblRvVGV4dCh2YWwpOyAvL3Rva2VuRnJvbUJsb2IodmFsKTtcbiAgICAgICAgICB2YWwgPSA8TkZUQT57dmFsfTwvTkZUQT47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ID09PSBcInVzZVwiKSB7XG4gICAgICAgICAgdmFsID0gSlNPTi5zdHJpbmdpZnkodmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgPT09IFwibWVtb1wiKSB7XG4gICAgICAgICAgdmFsID0gdG9IZXhTdHJpbmcodmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgPT09IFwibWFya2V0cGxhY2VcIiB8fCBrZXkgPT09IFwiYWZmaWxpYXRlXCIgfHwga2V5ID09PSBcImF1dGhvclwiKSB7XG4gICAgICAgICAgaWYgKCF2YWwgfHwgdmFsLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkgdmFsID0gdmFsWzBdO1xuICAgICAgICAgIGlmICghdmFsKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17a2V5fT5cbiAgICAgICAgICAgICAgPEtleVZhbFxuICAgICAgICAgICAgICAgIGtleT17aWR4ICsgXCJhZGRyXCJ9XG4gICAgICAgICAgICAgICAgaz17a2V5fVxuICAgICAgICAgICAgICAgIHY9e1xuICAgICAgICAgICAgICAgICAgPEhTdGFjaz5cbiAgICAgICAgICAgICAgICAgICAgPEFDQyBzaG9ydD17dHJ1ZX0+XG4gICAgICAgICAgICAgICAgICAgICAge0FjY291bnRJZGVudGlmaWVyLkFycmF5VG9UZXh0KHZhbC5hZGRyZXNzKX1cbiAgICAgICAgICAgICAgICAgICAgPC9BQ0M+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e3ZhbC5zaGFyZSAvIDEwMCArIFwiJVwifTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9IU3RhY2s+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgPT09IFwic3BlbmRlclwiKSB7XG4gICAgICAgICAgdmFsID0gUHJpbmNpcGFsLmZyb21VaW50OEFycmF5KHZhbC5fYXJyKS50b1RleHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgPT09IFwiYW1vdW50XCIpIHtcbiAgICAgICAgICBpZiAodmFsLmU4cykgdmFsID0gPElDUD57dmFsLmU4c308L0lDUD47XG4gICAgICAgICAgZWxzZSB2YWwgPSA8SUNQPnt2YWx9PC9JQ1A+O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleSA9PT0gXCJwd3JcIikge1xuICAgICAgICAgIHZhbCA9IDxJQ1A+e3ZhbH08L0lDUD47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ID09PSBcInByaWNlXCIpIHtcbiAgICAgICAgICB2YWwgPSAoXG4gICAgICAgICAgICA8SFN0YWNrPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxJQ1A+e3ZhbC5hbW91bnR9PC9JQ1A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7dmFsLm1hcmtldHBsYWNlWzBdID8gKFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICBtYXJrZXRwbGFjZSBzaGFyZXtcIiBcIn1cbiAgICAgICAgICAgICAgICAgIHsodmFsLm1hcmtldHBsYWNlWzBdLnNoYXJlIC8gMTAwKS50b0ZpeGVkKDIpfSUgLVxuICAgICAgICAgICAgICAgICAgPEFDQyBzaG9ydD17dHJ1ZX0+XG4gICAgICAgICAgICAgICAgICAgIHtBY2NvdW50SWRlbnRpZmllci5BcnJheVRvVGV4dCh2YWwubWFya2V0cGxhY2VbMF0uYWRkcmVzcyl9XG4gICAgICAgICAgICAgICAgICA8L0FDQz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8L0hTdGFjaz5cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDxLZXlWYWwga2V5PXtpZHh9IGs9e2tleX0gdj17dmFsfSAvPjtcbiAgICAgIH0pfVxuICAgICAgPEtleVZhbCBrPXtcIkhhc2hcIn0gdj17PEhBU0g+e3RvSGV4U3RyaW5nKGV2Lmhhc2gpfTwvSEFTSD59IC8+XG4gICAgPC9Cb3g+XG4gICk7XG5cbiAgaWYgKCFzaG93VGh1bWIpIHJldHVybiBpbm5lcjtcblxuICByZXR1cm4gKFxuICAgIDxTdGFjayBkaXJlY3Rpb249XCJob3Jpem9udGFsXCIgc3BhY2luZz1cIjBcIj5cbiAgICAgIHtcInRva2VuXCIgaW4gZGV0YWlscyA/IChcbiAgICAgICAgPEJveCB3PVwiMjUwcHhcIiBtYj1cIjdweFwiIG1yPVwiN3B4XCI+XG4gICAgICAgICAgPE5GVExhcmdlIGlkPXt0b2tlblRvVGV4dChkZXRhaWxzLnRva2VuKX0gLz5cbiAgICAgICAgPC9Cb3g+XG4gICAgICApIDogbnVsbH1cbiAgICAgIHtpbm5lcn1cbiAgICA8L1N0YWNrPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEhpc3RvcnkgPSAocCkgPT4ge1xuICBjb25zdCB0b3RhbCA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUuaGlzdG9yeS50b3RhbCk7XG4gIGNvbnN0IGV2ZW50cyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUuaGlzdG9yeS5ldmVudHMpO1xuICBjb25zdCBmb2N1c2VkID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS51c2VyLmZvY3VzZWQpO1xuXG4gIGNvbnN0IGNhbmlzdGVyID0gcC5tYXRjaC5wYXJhbXMuY2FuaXN0ZXI7XG4gIGxldCBmcm9tID0gcGFyc2VJbnQocC5tYXRjaC5wYXJhbXMuZnJvbSwgMTApO1xuICBpZiAoZnJvbSA8PSAwKSBmcm9tID0gMDtcblxuICBjb25zdCB0byA9IHBhcnNlSW50KHAubWF0Y2gucGFyYW1zLnRvLCAxMCk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgW2lzVGFpbGluZywgc2V0VGFpbGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgY29uc3QgbG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICBkaXNwYXRjaChsb2FkSGlzdG9yeSh7IGNhbmlzdGVyLCBmcm9tLCB0byB9KSk7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkKCk7XG4gIH0sIFtkaXNwYXRjaCwgZnJvbSwgdG8sIGNhbmlzdGVyXSk7XG5cbiAgdXNlSW50ZXJ2YWwoXG4gICAgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHsgdG90YWwsIGNhbmlzdGVyIH0gPSBhd2FpdCBkaXNwYXRjaChsb2FkSW5mbygpKTtcbiAgICAgIGlmICh0byAhPT0gdG90YWwpIHtcbiAgICAgICAgLy8gZGlzcGF0Y2gocHVzaChgL2hpc3RvcnkvJHtjYW5pc3Rlcn0vJHt0b3RhbCAtIFNIT1d9LyR7dG90YWx9YCkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZm9jdXNlZCAmJiBpc1RhaWxpbmcgPyBUQUlMX0lOVEVSVkFMIDogbnVsbFxuICApO1xuXG4gIGlmICghZXZlbnRzIHx8ICFldmVudHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICBsZXQgZXZsaXN0ID0gW107XG4gIGZvciAobGV0IGlkeCA9IGV2ZW50cy5sZW5ndGg7IGlkeCA+PSAwOyBpZHgtLSkge1xuICAgIGV2bGlzdC5wdXNoKFxuICAgICAgPEhpc3RvcnlFdmVudFxuICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgaWR4PXtpZHggKyBmcm9tfVxuICAgICAgICBjYW5pc3Rlcj17Y2FuaXN0ZXJ9XG4gICAgICAgIGV2PXtldmVudHNbaWR4XSA/IGV2ZW50c1tpZHhdWzBdIDogbnVsbH1cbiAgICAgICAgc2hvd1RodW1iPXtmYWxzZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEJveCBtdD17OH0gbWF4Vz17XCI1OTBweFwifSB3PVwiMTAwJVwiPlxuICAgICAgey8qIDxCb3ggcD17M30+XG4gICAgICAgIDxkaXY+SGlzdG9yeSBjYW5pc3Rlcjoge2NhbmlzdGVyfSA8L2Rpdj5cbiAgICAgICAgPGRpdj5Gcm9tIHtmcm9tfSA8L2Rpdj5cbiAgICAgICAgPGRpdj5UbyB7dG99IDwvZGl2PlxuICAgICAgICA8ZGl2PlRvdGFsIHt0b3RhbH0gPC9kaXY+XG4gICAgICA8L0JveD4gKi99XG4gICAgICA8RmxleD5cbiAgICAgICAgPEJ1dHRvbkdyb3VwIG1iPVwiMlwiIHZhcmlhbnQ9XCJvdXRsaW5lXCIgc2l6ZT1cInNtXCIgc3BhY2luZz1cIjNcIj5cbiAgICAgICAgICA8QnV0dG9uIGRpc2FibGVkPXtmcm9tIDw9IDB9IHZhcmlhbnQ9XCJzb2xpZFwiPlxuICAgICAgICAgICAgUHJldlxuICAgICAgICAgIDwvQnV0dG9uPlxuXG4gICAgICAgICAgPEJ1dHRvbiBkaXNhYmxlZD17dG90YWwgPD0gdG99IHZhcmlhbnQ9XCJzb2xpZFwiPlxuICAgICAgICAgICAgTmV4dFxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0J1dHRvbkdyb3VwPlxuICAgICAgICA8U3BhY2VyIC8+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgIHZhcmlhbnQ9e2lzVGFpbGluZyA/IFwic29saWRcIiA6IFwib3V0bGluZVwifVxuICAgICAgICAgIGNvbG9yU2NoZW1lPXtpc1RhaWxpbmcgPyBcInRlYWxcIiA6IFwiXCJ9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGFpbGluZyghaXNUYWlsaW5nKX1cbiAgICAgICAgPlxuICAgICAgICAgIFRhaWxcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0ZsZXg+XG4gICAgICB7ZXZsaXN0fVxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEhpc3RvcnlUeCA9IChwKSA9PiB7XG4gIGNvbnN0IHRvdGFsID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5oaXN0b3J5LnRvdGFsKTtcbiAgY29uc3QgZXZlbnRzID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5oaXN0b3J5LmV2ZW50cyk7XG4gIGNvbnN0IHNwYWNlID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS51c2VyLm1hcC5zcGFjZSk7XG5cbiAgY29uc3QgdHggPSBwLm1hdGNoLnBhcmFtcy50eDtcblxuICBjb25zdCB7IHNsb3QsIGlkeDogZnJvbSB9ID0gVHJhbnNhY3Rpb25JZC5kZWNvZGUoVHJhbnNhY3Rpb25JZC5mcm9tVGV4dCh0eCkpO1xuICBsZXQgY2FuaXN0ZXIgPSBQcmluY2lwYWxGcm9tU2xvdChzcGFjZSwgc2xvdCkudG9UZXh0KCk7XG4gIC8vY29uc29sZS5sb2coeyBjYW5pc3Rlciwgc2xvdCwgZnJvbSwgc3BhY2UgfSk7XG4gIC8vIGNvbnN0IGZyb20gPSBwYXJzZUludCh0eC5zdWJzdHIodHgubGFzdEluZGV4T2YoXCItXCIpICsgMSksIDEwKTtcblxuICBjb25zdCB0byA9IGZyb20gKyAxO1xuXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuXG4gIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgZGlzcGF0Y2gobG9hZEhpc3RvcnkoeyBjYW5pc3RlciwgZnJvbSwgdG8gfSkpO1xuICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9hZCgpO1xuICB9LCBbZGlzcGF0Y2gsIGZyb20sIHRvLCBjYW5pc3Rlcl0pO1xuXG4gIGlmICghZXZlbnRzIHx8ICFldmVudHMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggbXQ9ezh9PlxuICAgICAgPEJ1dHRvbkdyb3VwIG1iPVwiMlwiIHZhcmlhbnQ9XCJvdXRsaW5lXCIgc2l6ZT1cInNtXCIgc3BhY2luZz1cIjNcIj5cbiAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic29saWRcIj5CYWNrIHRvIGhpc3Rvcnk8L0J1dHRvbj5cbiAgICAgIDwvQnV0dG9uR3JvdXA+XG4gICAgICB7ZXZlbnRzLm1hcCgoZXYsIGlkeCkgPT4gKFxuICAgICAgICA8SGlzdG9yeUV2ZW50XG4gICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgaWR4PXtpZHggKyBmcm9tfVxuICAgICAgICAgIGNhbmlzdGVyPXtjYW5pc3Rlcn1cbiAgICAgICAgICBldj17ZXZbMF19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBOZnRIaXN0b3J5ID0gKHsgdHJhbnNhY3Rpb25zLCBzaG93VGh1bWIgfSkgPT4ge1xuICBjb25zdCBbZXZlbnRzLCBzZXRFdmVudHNdID0gdXNlU3RhdGUoW10pO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuICBjb25zdCBsb2FkID0gYXN5bmMgKCkgPT4ge1xuICAgIGxldCBldnMgPSBhd2FpdCBkaXNwYXRjaChsb2FkTmZ0SGlzdG9yeSh7IHRyYW5zYWN0aW9ucyB9KSk7XG4gICAgc2V0RXZlbnRzKGV2cyk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2FkKCk7XG4gIH0sIFtkaXNwYXRjaCwgdHJhbnNhY3Rpb25zXSk7XG5cbiAgaWYgKCFldmVudHMgfHwgIWV2ZW50cy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPENlbnRlcj5cbiAgICAgIDxCb3ggbXQ9ezh9IG1heFc9e1wiNTkwcHhcIn0gdz1cIjEwMCVcIj5cbiAgICAgICAge2V2ZW50cy5tYXAoKHsgaWR4LCBjYW5pc3RlciwgZGF0YSB9LCBuKSA9PiAoXG4gICAgICAgICAgPEhpc3RvcnlFdmVudFxuICAgICAgICAgICAga2V5PXtufVxuICAgICAgICAgICAgaWR4PXtpZHh9XG4gICAgICAgICAgICBjYW5pc3Rlcj17Y2FuaXN0ZXJ9XG4gICAgICAgICAgICBldj17ZGF0YX1cbiAgICAgICAgICAgIHNob3dUaHVtYj17c2hvd1RodW1ifVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgPC9Cb3g+XG4gICAgPC9DZW50ZXI+XG4gICk7XG59O1xuIl19
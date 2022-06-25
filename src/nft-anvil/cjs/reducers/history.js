"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSlice = exports.tailHistory = exports.setInfo = exports.setEvents = exports.loadNftHistory = exports.loadInfo = exports.loadHistory = exports.default = exports.cluster_info = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _authClient = require("@dfinity/auth-client");

var _router = require("@vvv-interactive/nftanvil-canisters/cjs/router.js");

var _ledger = require("@vvv-interactive/nftanvil-canisters/cjs/ledger.js");

var _history = require("@vvv-interactive/nftanvil-canisters/cjs/history.js");

var _auth = _interopRequireDefault(require("../auth"));

var _token = require("@vvv-interactive/nftanvil-tools/cjs/token.js");

var _principal = require("@dfinity/principal");

var AccountIdentifier = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js"));

var TransactionId = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/transactionid.js"));

var _principal2 = require("@vvv-interactive/nftanvil-tools/cjs/principal.js");

var _reactToastify = require("react-toastify");

var _lodash = _interopRequireDefault(require("lodash"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSlice = (0, _toolkit.createSlice)({
  name: "history",
  initialState: {
    lastUpdated: 0,
    total: 0,
    from: 0,
    to: 0,
    events: []
  },
  reducers: {
    setEvents: (state, action) => {
      return { ...state,
        lastUpdated: Math.floor(Date.now() / 1000),
        events: action.payload
      };
    },
    setInfo: (state, action) => {
      return { ...state,
        ...action.payload
      };
    }
  }
}); // Action creators are generated for each case reducer function

exports.userSlice = userSlice;
const {
  setEvents,
  setInfo
} = userSlice.actions;
exports.setInfo = setInfo;
exports.setEvents = setEvents;

const loadInfo = () => async (dispatch, getState) => {
  let identity = _auth.default.client.getIdentity();

  let s = getState();
  let history = (0, _history.historyCanister)((0, _principal2.PrincipalFromSlot)(s.user.map.space, s.user.map.history), {
    agentOptions: await _auth.default.getAgentOptions()
  });
  let {
    total,
    previous
  } = await history.info();
  let p = {
    total,
    canister: (0, _principal2.PrincipalFromSlot)(s.user.map.space, s.user.map.history).toText()
  };
  dispatch(setInfo({
    total
  }));
  return p;
};

exports.loadInfo = loadInfo;

const tailHistory = _ref => {
  let {
    canister
  } = _ref;
  return async (dispatch, getState) => {};
};

exports.tailHistory = tailHistory;

const loadHistory = _ref2 => {
  let {
    canister,
    from,
    to
  } = _ref2;
  return async (dispatch, getState) => {
    let identity = _auth.default.client.getIdentity();

    let s = getState();
    dispatch(loadInfo());
    let history = (0, _history.historyCanister)(_principal.Principal.fromText(canister), {
      agentOptions: await _auth.default.getAgentOptions()
    });
    let events = await history.list({
      from,
      to
    });
    events = mapValuesDeep(events, v => {
      return typeof v === "bigint" ? v.toString() : v;
    });
    dispatch(setEvents(events));
  };
};

exports.loadHistory = loadHistory;

const loadNftHistory = _ref3 => {
  let {
    transactions
  } = _ref3;
  return async (dispatch, getState) => {
    let identity = _auth.default.client.getIdentity();

    let s = getState();
    let r = await Promise.all(transactions.map(async tx_id => {
      let {
        slot,
        idx
      } = TransactionId.decode(tx_id);
      let canister = (0, _principal2.PrincipalFromSlot)(s.user.map.space, slot);
      let history = (0, _history.historyCanister)(canister, {
        agentOptions: await _auth.default.getAgentOptions()
      });
      let resp = await history.list({
        from: idx,
        to: idx + 1
      });
      return {
        idx,
        canister: canister.toText(),
        data: resp[0] ? resp[0][0] : null
      };
    }));
    return r;
  };
};

exports.loadNftHistory = loadNftHistory;

const mapValuesDeep = (obj, cb) => {
  if (_lodash.default.isArray(obj)) {
    return obj.map(innerObj => mapValuesDeep(innerObj, cb));
  } else if (_lodash.default.isObject(obj)) {
    return _lodash.default.mapValues(obj, val => mapValuesDeep(val, cb));
  } else {
    return cb(obj);
  }
};

const cluster_info = () => async (dispatch, getState) => {
  let identity = _auth.default.client.getIdentity();

  let s = getState();
  let map = await _router.router.config_get();
  let log = await _router.router.log_get();
  return {
    map,
    log
  };
};

exports.cluster_info = cluster_info;
var _default = userSlice.reducer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9oaXN0b3J5LmpzIl0sIm5hbWVzIjpbInVzZXJTbGljZSIsIm5hbWUiLCJpbml0aWFsU3RhdGUiLCJsYXN0VXBkYXRlZCIsInRvdGFsIiwiZnJvbSIsInRvIiwiZXZlbnRzIiwicmVkdWNlcnMiLCJzZXRFdmVudHMiLCJzdGF0ZSIsImFjdGlvbiIsIk1hdGgiLCJmbG9vciIsIkRhdGUiLCJub3ciLCJwYXlsb2FkIiwic2V0SW5mbyIsImFjdGlvbnMiLCJsb2FkSW5mbyIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJpZGVudGl0eSIsImF1dGhlbnRpY2F0aW9uIiwiY2xpZW50IiwiZ2V0SWRlbnRpdHkiLCJzIiwiaGlzdG9yeSIsInVzZXIiLCJtYXAiLCJzcGFjZSIsImFnZW50T3B0aW9ucyIsImdldEFnZW50T3B0aW9ucyIsInByZXZpb3VzIiwiaW5mbyIsInAiLCJjYW5pc3RlciIsInRvVGV4dCIsInRhaWxIaXN0b3J5IiwibG9hZEhpc3RvcnkiLCJQcmluY2lwYWwiLCJmcm9tVGV4dCIsImxpc3QiLCJtYXBWYWx1ZXNEZWVwIiwidiIsInRvU3RyaW5nIiwibG9hZE5mdEhpc3RvcnkiLCJ0cmFuc2FjdGlvbnMiLCJyIiwiUHJvbWlzZSIsImFsbCIsInR4X2lkIiwic2xvdCIsImlkeCIsIlRyYW5zYWN0aW9uSWQiLCJkZWNvZGUiLCJyZXNwIiwiZGF0YSIsIm9iaiIsImNiIiwiXyIsImlzQXJyYXkiLCJpbm5lck9iaiIsImlzT2JqZWN0IiwibWFwVmFsdWVzIiwidmFsIiwiY2x1c3Rlcl9pbmZvIiwicm91dGVyIiwiY29uZmlnX2dldCIsImxvZyIsImxvZ19nZXQiLCJyZWR1Y2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRU8sTUFBTUEsU0FBUyxHQUFHLDBCQUFZO0FBQ25D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QSxNQUFJUSxHQUFHLEdBQUcsTUFBTXNDLGVBQU9DLFVBQVAsRUFBaEI7QUFFQSxNQUFJQyxHQUFHLEdBQUcsTUFBTUYsZUFBT0csT0FBUCxFQUFoQjtBQUVBLFNBQU87QUFBRXpDLElBQUFBLEdBQUY7QUFBT3dDLElBQUFBO0FBQVAsR0FBUDtBQUNELENBVk07OztlQVlRckUsU0FBUyxDQUFDdUUsTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNsaWNlIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcbmltcG9ydCB7IEF1dGhDbGllbnQgfSBmcm9tIFwiQGRmaW5pdHkvYXV0aC1jbGllbnRcIjtcbmltcG9ydCB7IHJvdXRlciB9IGZyb20gXCJAdnZ2LWludGVyYWN0aXZlL25mdGFudmlsLWNhbmlzdGVycy9janMvcm91dGVyLmpzXCI7XG5pbXBvcnQgeyBsZWRnZXIgfSBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC1jYW5pc3RlcnMvY2pzL2xlZGdlci5qc1wiO1xuaW1wb3J0IHsgaGlzdG9yeUNhbmlzdGVyIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtY2FuaXN0ZXJzL2Nqcy9oaXN0b3J5LmpzXCI7XG5cbmltcG9ydCBhdXRoZW50aWNhdGlvbiBmcm9tIFwiLi4vYXV0aFwiO1xuXG5pbXBvcnQgeyBwcmluY2lwYWxUb0FjY291bnRJZGVudGlmaWVyIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL3Rva2VuLmpzXCI7XG5cbmltcG9ydCB7IFByaW5jaXBhbCB9IGZyb20gXCJAZGZpbml0eS9wcmluY2lwYWxcIjtcblxuaW1wb3J0ICogYXMgQWNjb3VudElkZW50aWZpZXIgZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL2FjY291bnRpZGVudGlmaWVyLmpzXCI7XG5pbXBvcnQgKiBhcyBUcmFuc2FjdGlvbklkIGZyb20gXCJAdnZ2LWludGVyYWN0aXZlL25mdGFudmlsLXRvb2xzL2Nqcy90cmFuc2FjdGlvbmlkLmpzXCI7XG5cbmltcG9ydCB7IFByaW5jaXBhbEZyb21TbG90IH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL3ByaW5jaXBhbC5qc1wiO1xuXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gXCJyZWFjdC10b2FzdGlmeVwiO1xuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgY29uc3QgdXNlclNsaWNlID0gY3JlYXRlU2xpY2Uoe1xuICBuYW1lOiBcImhpc3RvcnlcIixcbiAgaW5pdGlhbFN0YXRlOiB7XG4gICAgbGFzdFVwZGF0ZWQ6IDAsXG4gICAgdG90YWw6IDAsXG4gICAgZnJvbTogMCxcbiAgICB0bzogMCxcbiAgICBldmVudHM6IFtdLFxuICB9LFxuICByZWR1Y2Vyczoge1xuICAgIHNldEV2ZW50czogKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsYXN0VXBkYXRlZDogTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCksXG4gICAgICAgIGV2ZW50czogYWN0aW9uLnBheWxvYWQsXG4gICAgICB9O1xuICAgIH0sXG4gICAgc2V0SW5mbzogKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCAuLi5hY3Rpb24ucGF5bG9hZCB9O1xuICAgIH0sXG4gIH0sXG59KTtcblxuLy8gQWN0aW9uIGNyZWF0b3JzIGFyZSBnZW5lcmF0ZWQgZm9yIGVhY2ggY2FzZSByZWR1Y2VyIGZ1bmN0aW9uXG5leHBvcnQgY29uc3QgeyBzZXRFdmVudHMsIHNldEluZm8gfSA9IHVzZXJTbGljZS5hY3Rpb25zO1xuXG5leHBvcnQgY29uc3QgbG9hZEluZm8gPSAoKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuICBsZXQgcyA9IGdldFN0YXRlKCk7XG5cbiAgbGV0IGhpc3RvcnkgPSBoaXN0b3J5Q2FuaXN0ZXIoXG4gICAgUHJpbmNpcGFsRnJvbVNsb3Qocy51c2VyLm1hcC5zcGFjZSwgcy51c2VyLm1hcC5oaXN0b3J5KSxcbiAgICB7IGFnZW50T3B0aW9uczogYXdhaXQgYXV0aGVudGljYXRpb24uZ2V0QWdlbnRPcHRpb25zKCkgfVxuICApO1xuXG4gIGxldCB7IHRvdGFsLCBwcmV2aW91cyB9ID0gYXdhaXQgaGlzdG9yeS5pbmZvKCk7XG4gIGxldCBwID0ge1xuICAgIHRvdGFsLFxuICAgIGNhbmlzdGVyOiBQcmluY2lwYWxGcm9tU2xvdChzLnVzZXIubWFwLnNwYWNlLCBzLnVzZXIubWFwLmhpc3RvcnkpLnRvVGV4dCgpLFxuICB9O1xuICBkaXNwYXRjaChzZXRJbmZvKHsgdG90YWwgfSkpO1xuICByZXR1cm4gcDtcbn07XG5cbmV4cG9ydCBjb25zdCB0YWlsSGlzdG9yeSA9XG4gICh7IGNhbmlzdGVyIH0pID0+XG4gIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHt9O1xuXG5leHBvcnQgY29uc3QgbG9hZEhpc3RvcnkgPVxuICAoeyBjYW5pc3RlciwgZnJvbSwgdG8gfSkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gICAgbGV0IHMgPSBnZXRTdGF0ZSgpO1xuICAgIGRpc3BhdGNoKGxvYWRJbmZvKCkpO1xuXG4gICAgbGV0IGhpc3RvcnkgPSBoaXN0b3J5Q2FuaXN0ZXIoUHJpbmNpcGFsLmZyb21UZXh0KGNhbmlzdGVyKSwge1xuICAgICAgYWdlbnRPcHRpb25zOiBhd2FpdCBhdXRoZW50aWNhdGlvbi5nZXRBZ2VudE9wdGlvbnMoKSxcbiAgICB9KTtcblxuICAgIGxldCBldmVudHMgPSBhd2FpdCBoaXN0b3J5Lmxpc3Qoe1xuICAgICAgZnJvbSxcbiAgICAgIHRvLFxuICAgIH0pO1xuXG4gICAgZXZlbnRzID0gbWFwVmFsdWVzRGVlcChldmVudHMsICh2KSA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHYgPT09IFwiYmlnaW50XCIgPyB2LnRvU3RyaW5nKCkgOiB2O1xuICAgIH0pO1xuXG4gICAgZGlzcGF0Y2goc2V0RXZlbnRzKGV2ZW50cykpO1xuICB9O1xuXG5leHBvcnQgY29uc3QgbG9hZE5mdEhpc3RvcnkgPVxuICAoeyB0cmFuc2FjdGlvbnMgfSkgPT5cbiAgYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGxldCBpZGVudGl0eSA9IGF1dGhlbnRpY2F0aW9uLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuICAgIGxldCBzID0gZ2V0U3RhdGUoKTtcblxuICAgIGxldCByID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICB0cmFuc2FjdGlvbnMubWFwKGFzeW5jICh0eF9pZCkgPT4ge1xuICAgICAgICBsZXQgeyBzbG90LCBpZHggfSA9IFRyYW5zYWN0aW9uSWQuZGVjb2RlKHR4X2lkKTtcblxuICAgICAgICBsZXQgY2FuaXN0ZXIgPSBQcmluY2lwYWxGcm9tU2xvdChzLnVzZXIubWFwLnNwYWNlLCBzbG90KTtcblxuICAgICAgICBsZXQgaGlzdG9yeSA9IGhpc3RvcnlDYW5pc3RlcihjYW5pc3Rlciwge1xuICAgICAgICAgIGFnZW50T3B0aW9uczogYXdhaXQgYXV0aGVudGljYXRpb24uZ2V0QWdlbnRPcHRpb25zKCksXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcmVzcCA9IGF3YWl0IGhpc3RvcnkubGlzdCh7XG4gICAgICAgICAgZnJvbTogaWR4LFxuICAgICAgICAgIHRvOiBpZHggKyAxLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZHgsXG4gICAgICAgICAgY2FuaXN0ZXI6IGNhbmlzdGVyLnRvVGV4dCgpLFxuICAgICAgICAgIGRhdGE6IHJlc3BbMF0gPyByZXNwWzBdWzBdIDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICByZXR1cm4gcjtcbiAgfTtcblxuY29uc3QgbWFwVmFsdWVzRGVlcCA9IChvYmosIGNiKSA9PiB7XG4gIGlmIChfLmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmoubWFwKChpbm5lck9iaikgPT4gbWFwVmFsdWVzRGVlcChpbm5lck9iaiwgY2IpKTtcbiAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4gXy5tYXBWYWx1ZXMob2JqLCAodmFsKSA9PiBtYXBWYWx1ZXNEZWVwKHZhbCwgY2IpKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY2Iob2JqKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNsdXN0ZXJfaW5mbyA9ICgpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgbGV0IGlkZW50aXR5ID0gYXV0aGVudGljYXRpb24uY2xpZW50LmdldElkZW50aXR5KCk7XG5cbiAgbGV0IHMgPSBnZXRTdGF0ZSgpO1xuXG4gIGxldCBtYXAgPSBhd2FpdCByb3V0ZXIuY29uZmlnX2dldCgpO1xuXG4gIGxldCBsb2cgPSBhd2FpdCByb3V0ZXIubG9nX2dldCgpO1xuXG4gIHJldHVybiB7IG1hcCwgbG9nIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VyU2xpY2UucmVkdWNlcjtcbiJdfQ==
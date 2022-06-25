"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify_domain_twitter = exports.verify_domain = exports.load_inventory = exports.inventorySlice = exports.default = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _account = require("@vvv-interactive/nftanvil-canisters/cjs/account.js");

var _auth = _interopRequireDefault(require("../auth"));

var _immer = require("immer");

var AccountIdentifier = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js"));

var _principal = require("@vvv-interactive/nftanvil-tools/cjs/principal.js");

var _token = require("@vvv-interactive/nftanvil-tools/cjs/token.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inventorySlice = (0, _toolkit.createSlice)({
  name: "inventory",
  initialState: {},
  reducers: {
    pageSet: (state, action) => {
      return (0, _immer.produce)(state, draft => {
        if (!draft[action.payload.aid]) draft[action.payload.aid] = [];
        draft[action.payload.aid][action.payload.pageIdx] = action.payload.list;
        return draft;
      });
    },
    metaSet: (state, action) => {
      return { ...state,
        [action.payload.aid + "meta"]: action.payload.meta
      };
    },
    verifiedDomainSet: (state, action) => {
      return { ...state,
        [action.payload.domain + "_domain"]: action.payload.data
      };
    }
  }
});
exports.inventorySlice = inventorySlice;
const {
  pageSet,
  metaSet,
  verifiedDomainSet
} = inventorySlice.actions;

const load_inventory = (aid, pageIdx, max) => async (dispatch, getState) => {
  var _s$user$map$account;

  let identity = _auth.default.client ? _auth.default.client.getIdentity() : null;
  let s = getState();
  if (!((_s$user$map$account = s.user.map.account) !== null && _s$user$map$account !== void 0 && _s$user$map$account.length)) return null;
  let can = (0, _principal.PrincipalFromSlot)(s.user.map.space, AccountIdentifier.TextToSlot(aid, s.user.map.account));
  let acc = (0, _account.accountCanister)(can, {
    agentOptions: _auth.default.getAgentOptions()
  });
  let meta = await acc.meta(AccountIdentifier.TextToArray(aid));
  if (meta[0]) dispatch(metaSet({
    aid,
    meta: meta[0]
  })); // console.log("ACC META", meta);

  pageIdx = parseInt(pageIdx, 10);
  let list = await acc.list(AccountIdentifier.TextToArray(aid), pageIdx * max, (pageIdx + 1) * max);
  list = list.filter(x => x !== 0n).map(x => (0, _token.tokenToText)(x));
  dispatch(pageSet({
    aid,
    pageIdx,
    list
  }));
};

exports.load_inventory = load_inventory;

const verify_domain_twitter = domain => async (dispatch, getState) => {
  let s = getState();

  if (s.inventory[domain + "_domain"] === undefined) {
    dispatch(verifiedDomainSet({
      domain,
      data: -1
    }));
    let data = await new Promise((resolve, reject) => {
      fetch("https://nftpkg.com/api/v1/verify?url=" + domain).then(response => {
        return response.json();
      }).then(data => {
        try {
          resolve(data.text.replace(/[\s]+/gs, ""));
        } catch (e) {
          console.log(e);
          resolve(false);
        }
      }).catch(e => {
        resolve(false);
      });
    });
    dispatch(verifiedDomainSet({
      domain,
      data
    }));
  }
};

exports.verify_domain_twitter = verify_domain_twitter;

const verify_domain = domain => async (dispatch, getState) => {
  let s = getState();

  if (s.inventory[domain + "_domain"] === undefined) {
    dispatch(verifiedDomainSet({
      domain,
      data: -1
    }));
    let data = await new Promise((resolve, reject) => {
      fetch("https://" + domain + "/.well-known/nftanvil.json").then(response => response.json()).then(data => {
        try {
          resolve(data);
        } catch (e) {
          console.log(e);
          resolve(false);
        }
      }).catch(e => {
        console.log(e);
        resolve(false);
      });
    });
    dispatch(verifiedDomainSet({
      domain,
      data
    }));
  }
};

exports.verify_domain = verify_domain;
var _default = inventorySlice.reducer;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9pbnZlbnRvcnkuanMiXSwibmFtZXMiOlsiaW52ZW50b3J5U2xpY2UiLCJuYW1lIiwiaW5pdGlhbFN0YXRlIiwicmVkdWNlcnMiLCJwYWdlU2V0Iiwic3RhdGUiLCJhY3Rpb24iLCJkcmFmdCIsInBheWxvYWQiLCJhaWQiLCJwYWdlSWR4IiwibGlzdCIsIm1ldGFTZXQiLCJtZXRhIiwidmVyaWZpZWREb21haW5TZXQiLCJkb21haW4iLCJkYXRhIiwiYWN0aW9ucyIsImxvYWRfaW52ZW50b3J5IiwibWF4IiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImlkZW50aXR5IiwiYXV0aGVudGljYXRpb24iLCJjbGllbnQiLCJnZXRJZGVudGl0eSIsInMiLCJ1c2VyIiwibWFwIiwiYWNjb3VudCIsImxlbmd0aCIsImNhbiIsInNwYWNlIiwiQWNjb3VudElkZW50aWZpZXIiLCJUZXh0VG9TbG90IiwiYWNjIiwiYWdlbnRPcHRpb25zIiwiZ2V0QWdlbnRPcHRpb25zIiwiVGV4dFRvQXJyYXkiLCJwYXJzZUludCIsImZpbHRlciIsIngiLCJ2ZXJpZnlfZG9tYWluX3R3aXR0ZXIiLCJpbnZlbnRvcnkiLCJ1bmRlZmluZWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInRleHQiLCJyZXBsYWNlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsInZlcmlmeV9kb21haW4iLCJyZWR1Y2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRU8sTUFBTUEsY0FBYyxHQUFHLDBCQUFZO0FBQ3hDQyxFQUFBQSxJQUFJLEVBQUUsV0FEa0M7QUFFeENDLEVBQUFBLFlBQVksRUFBRSxFQUYwQjtBQUd4Q0MsRUFBQUEsUUFBUSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRSxDQUFDQyxLQUFELEVBQVFD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RixPQVRILEVBVUdXLEtBVkgsQ0FVVUgsQ0FBRCxJQUFPO0FBQ1pDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixDQUFaO0FBQ0FSLFFBQUFBLE9BQU8sQ0FBQyxLQUFELENBQVA7QUFDRCxPQWJIO0FBY0QsS0FmZ0IsQ0FBakI7QUFpQkExQixJQUFBQSxRQUFRLENBQUNOLGlCQUFpQixDQUFDO0FBQUVDLE1BQUFBLE1BQUY7QUFBVUMsTUFBQUE7QUFBVixLQUFELENBQWxCLENBQVI7QUFDRDtBQUNGLENBekJNOzs7ZUEyQlFoQixjQUFjLENBQUMyRCxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2xpY2UgfSBmcm9tIFwiQHJlZHV4anMvdG9vbGtpdFwiO1xuaW1wb3J0IHsgYWNjb3VudENhbmlzdGVyIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtY2FuaXN0ZXJzL2Nqcy9hY2NvdW50LmpzXCI7XG5pbXBvcnQgYXV0aGVudGljYXRpb24gZnJvbSBcIi4uL2F1dGhcIjtcbmltcG9ydCB7IHByb2R1Y2UgfSBmcm9tIFwiaW1tZXJcIjtcbmltcG9ydCAqIGFzIEFjY291bnRJZGVudGlmaWVyIGZyb20gXCJAdnZ2LWludGVyYWN0aXZlL25mdGFudmlsLXRvb2xzL2Nqcy9hY2NvdW50aWRlbnRpZmllci5qc1wiO1xuaW1wb3J0IHsgUHJpbmNpcGFsRnJvbVNsb3QgfSBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvcHJpbmNpcGFsLmpzXCI7XG5pbXBvcnQgeyB0b2tlblRvVGV4dCB9IGZyb20gXCJAdnZ2LWludGVyYWN0aXZlL25mdGFudmlsLXRvb2xzL2Nqcy90b2tlbi5qc1wiO1xuXG5leHBvcnQgY29uc3QgaW52ZW50b3J5U2xpY2UgPSBjcmVhdGVTbGljZSh7XG4gIG5hbWU6IFwiaW52ZW50b3J5XCIsXG4gIGluaXRpYWxTdGF0ZToge30sXG4gIHJlZHVjZXJzOiB7XG4gICAgcGFnZVNldDogKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAgIHJldHVybiBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcbiAgICAgICAgaWYgKCFkcmFmdFthY3Rpb24ucGF5bG9hZC5haWRdKSBkcmFmdFthY3Rpb24ucGF5bG9hZC5haWRdID0gW107XG4gICAgICAgIGRyYWZ0W2FjdGlvbi5wYXlsb2FkLmFpZF1bYWN0aW9uLnBheWxvYWQucGFnZUlkeF0gPSBhY3Rpb24ucGF5bG9hZC5saXN0O1xuICAgICAgICByZXR1cm4gZHJhZnQ7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIG1ldGFTZXQ6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgW2FjdGlvbi5wYXlsb2FkLmFpZCArIFwibWV0YVwiXTogYWN0aW9uLnBheWxvYWQubWV0YSB9O1xuICAgIH0sXG4gICAgdmVyaWZpZWREb21haW5TZXQ6IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW2FjdGlvbi5wYXlsb2FkLmRvbWFpbiArIFwiX2RvbWFpblwiXTogYWN0aW9uLnBheWxvYWQuZGF0YSxcbiAgICAgIH07XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5jb25zdCB7IHBhZ2VTZXQsIG1ldGFTZXQsIHZlcmlmaWVkRG9tYWluU2V0IH0gPSBpbnZlbnRvcnlTbGljZS5hY3Rpb25zO1xuXG5leHBvcnQgY29uc3QgbG9hZF9pbnZlbnRvcnkgPVxuICAoYWlkLCBwYWdlSWR4LCBtYXgpID0+IGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBsZXQgaWRlbnRpdHkgPSBhdXRoZW50aWNhdGlvbi5jbGllbnRcbiAgICAgID8gYXV0aGVudGljYXRpb24uY2xpZW50LmdldElkZW50aXR5KClcbiAgICAgIDogbnVsbDtcbiAgICBsZXQgcyA9IGdldFN0YXRlKCk7XG4gICAgaWYgKCFzLnVzZXIubWFwLmFjY291bnQ/Lmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgY2FuID0gUHJpbmNpcGFsRnJvbVNsb3QoXG4gICAgICBzLnVzZXIubWFwLnNwYWNlLFxuICAgICAgQWNjb3VudElkZW50aWZpZXIuVGV4dFRvU2xvdChhaWQsIHMudXNlci5tYXAuYWNjb3VudClcbiAgICApO1xuICAgIGxldCBhY2MgPSBhY2NvdW50Q2FuaXN0ZXIoY2FuLCB7XG4gICAgICBhZ2VudE9wdGlvbnM6IGF1dGhlbnRpY2F0aW9uLmdldEFnZW50T3B0aW9ucygpLFxuICAgIH0pO1xuXG4gICAgbGV0IG1ldGEgPSBhd2FpdCBhY2MubWV0YShBY2NvdW50SWRlbnRpZmllci5UZXh0VG9BcnJheShhaWQpKTtcbiAgICBpZiAobWV0YVswXSkgZGlzcGF0Y2gobWV0YVNldCh7IGFpZCwgbWV0YTogbWV0YVswXSB9KSk7XG4gICAgLy8gY29uc29sZS5sb2coXCJBQ0MgTUVUQVwiLCBtZXRhKTtcblxuICAgIHBhZ2VJZHggPSBwYXJzZUludChwYWdlSWR4LCAxMCk7XG4gICAgbGV0IGxpc3QgPSBhd2FpdCBhY2MubGlzdChcbiAgICAgIEFjY291bnRJZGVudGlmaWVyLlRleHRUb0FycmF5KGFpZCksXG4gICAgICBwYWdlSWR4ICogbWF4LFxuICAgICAgKHBhZ2VJZHggKyAxKSAqIG1heFxuICAgICk7XG4gICAgbGlzdCA9IGxpc3QuZmlsdGVyKCh4KSA9PiB4ICE9PSAwbikubWFwKCh4KSA9PiB0b2tlblRvVGV4dCh4KSk7XG4gICAgZGlzcGF0Y2gocGFnZVNldCh7IGFpZCwgcGFnZUlkeCwgbGlzdCB9KSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCB2ZXJpZnlfZG9tYWluX3R3aXR0ZXIgPSAoZG9tYWluKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGxldCBzID0gZ2V0U3RhdGUoKTtcblxuICBpZiAocy5pbnZlbnRvcnlbZG9tYWluICsgXCJfZG9tYWluXCJdID09PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwYXRjaCh2ZXJpZmllZERvbWFpblNldCh7IGRvbWFpbiwgZGF0YTogLTEgfSkpO1xuXG4gICAgbGV0IGRhdGEgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmZXRjaChcImh0dHBzOi8vbmZ0cGtnLmNvbS9hcGkvdjEvdmVyaWZ5P3VybD1cIiArIGRvbWFpbilcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhLnRleHQucmVwbGFjZSgvW1xcc10rL2dzLCBcIlwiKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRpc3BhdGNoKHZlcmlmaWVkRG9tYWluU2V0KHsgZG9tYWluLCBkYXRhIH0pKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHZlcmlmeV9kb21haW4gPSAoZG9tYWluKSA9PiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGxldCBzID0gZ2V0U3RhdGUoKTtcblxuICBpZiAocy5pbnZlbnRvcnlbZG9tYWluICsgXCJfZG9tYWluXCJdID09PSB1bmRlZmluZWQpIHtcbiAgICBkaXNwYXRjaCh2ZXJpZmllZERvbWFpblNldCh7IGRvbWFpbiwgZGF0YTogLTEgfSkpO1xuXG4gICAgbGV0IGRhdGEgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmZXRjaChcImh0dHBzOi8vXCIgKyBkb21haW4gKyBcIi8ud2VsbC1rbm93bi9uZnRhbnZpbC5qc29uXCIpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkaXNwYXRjaCh2ZXJpZmllZERvbWFpblNldCh7IGRvbWFpbiwgZGF0YSB9KSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGludmVudG9yeVNsaWNlLnJlZHVjZXI7XG4iXX0=
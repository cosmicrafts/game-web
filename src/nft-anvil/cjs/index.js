"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnvilProvider = AnvilProvider;
Object.defineProperty(exports, "InventoryLarge", {
  enumerable: true,
  get: function () {
    return _Inventory.InventoryLarge;
  }
});
exports.TestAnvilComponent = void 0;
Object.defineProperty(exports, "load_inventory", {
  enumerable: true,
  get: function () {
    return _inventory.load_inventory;
  }
});
Object.defineProperty(exports, "nft_approve", {
  enumerable: true,
  get: function () {
    return _nft.nft_approve;
  }
});
Object.defineProperty(exports, "nft_burn", {
  enumerable: true,
  get: function () {
    return _nft.nft_burn;
  }
});
Object.defineProperty(exports, "nft_claim_link", {
  enumerable: true,
  get: function () {
    return _nft.nft_claim_link;
  }
});
Object.defineProperty(exports, "nft_enter_code", {
  enumerable: true,
  get: function () {
    return _nft.nft_enter_code;
  }
});
Object.defineProperty(exports, "nft_fetch", {
  enumerable: true,
  get: function () {
    return _nft.nft_fetch;
  }
});
Object.defineProperty(exports, "nft_media_get", {
  enumerable: true,
  get: function () {
    return _nft.nft_media_get;
  }
});
Object.defineProperty(exports, "nft_plug", {
  enumerable: true,
  get: function () {
    return _nft.nft_plug;
  }
});
Object.defineProperty(exports, "nft_purchase", {
  enumerable: true,
  get: function () {
    return _nft.nft_purchase;
  }
});
Object.defineProperty(exports, "nft_recharge", {
  enumerable: true,
  get: function () {
    return _nft.nft_recharge;
  }
});
Object.defineProperty(exports, "nft_recharge_quote", {
  enumerable: true,
  get: function () {
    return _nft.nft_recharge_quote;
  }
});
Object.defineProperty(exports, "nft_set_price", {
  enumerable: true,
  get: function () {
    return _nft.nft_set_price;
  }
});
Object.defineProperty(exports, "nft_transfer", {
  enumerable: true,
  get: function () {
    return _nft.nft_transfer;
  }
});
Object.defineProperty(exports, "nft_transfer_link", {
  enumerable: true,
  get: function () {
    return _nft.nft_transfer_link;
  }
});
Object.defineProperty(exports, "nft_unsocket", {
  enumerable: true,
  get: function () {
    return _nft.nft_unsocket;
  }
});
Object.defineProperty(exports, "nft_use", {
  enumerable: true,
  get: function () {
    return _nft.nft_use;
  }
});
exports.useAnvilStore = exports.useAnvilSelector = exports.useAnvilDispatch = void 0;
Object.defineProperty(exports, "user_auth", {
  enumerable: true,
  get: function () {
    return _user.user_auth;
  }
});
Object.defineProperty(exports, "user_login", {
  enumerable: true,
  get: function () {
    return _user.user_login;
  }
});
Object.defineProperty(exports, "user_logout", {
  enumerable: true,
  get: function () {
    return _user.user_logout;
  }
});
Object.defineProperty(exports, "user_pwr_transfer", {
  enumerable: true,
  get: function () {
    return _user.user_pwr_transfer;
  }
});
Object.defineProperty(exports, "user_refresh_balances", {
  enumerable: true,
  get: function () {
    return _user.user_refresh_balances;
  }
});
Object.defineProperty(exports, "user_refresh_config", {
  enumerable: true,
  get: function () {
    return _user.user_refresh_config;
  }
});
Object.defineProperty(exports, "user_transfer_icp", {
  enumerable: true,
  get: function () {
    return _user.user_transfer_icp;
  }
});
Object.defineProperty(exports, "verify_domain", {
  enumerable: true,
  get: function () {
    return _inventory.verify_domain;
  }
});
Object.defineProperty(exports, "verify_domain_twitter", {
  enumerable: true,
  get: function () {
    return _inventory.verify_domain_twitter;
  }
});

var _react = _interopRequireDefault(require("react"));

var _toolkit = require("@reduxjs/toolkit");

var _inventory = _interopRequireWildcard(require("./reducers/inventory"));

var _user = _interopRequireWildcard(require("./reducers/user"));

var _nft = _interopRequireWildcard(require("./reducers/nft"));

var _Inventory = require("./components/Inventory.js");

var _reactRedux = require("react-redux");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TestAnvilComponent = () => {
  return /*#__PURE__*/_react.default.createElement("div", null, "fun component sweet 123 123 123");
};

exports.TestAnvilComponent = TestAnvilComponent;

const MyContext = /*#__PURE__*/_react.default.createContext(null); // Export your custom hooks if you wish to use them in other files.


const useAnvilStore = (0, _reactRedux.createStoreHook)(MyContext);
exports.useAnvilStore = useAnvilStore;
const useAnvilDispatch = (0, _reactRedux.createDispatchHook)(MyContext);
exports.useAnvilDispatch = useAnvilDispatch;
const useAnvilSelector = (0, _reactRedux.createSelectorHook)(MyContext);
exports.useAnvilSelector = useAnvilSelector;
const myStore = (0, _toolkit.configureStore)({
  // devTools: { name: "Anvil" },
  reducer: {
    user: _user.default,
    nft: _nft.default,
    inventory: _inventory.default
  },
  devTools: process.env.NODE_ENV !== "production"
});

function AnvilProvider(_ref) {
  let {
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    context: MyContext,
    store: myStore
  }, children);
} // Extra


setTimeout(() => {
  myStore.dispatch((0, _user.user_auth)());
}, 100);

if (typeof window !== "undefined") {
  window.addEventListener("focus", () => myStore.dispatch((0, _user.window_focus)()));
  window.addEventListener("blur", () => myStore.dispatch((0, _user.window_blur)()));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJUZXN0QW52aWxDb21wb25lbnQiLCJNeUNvbnRleHQiLCJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VBbnZpbFN0b3JlIiwidXNlQW52aWxEaXNwYXRjaCIsInVzZUFudmlsU2VsZWN0b3IiLCJteVN0b3JlIiwicmVkdWNlciIsInVzZXIiLCJ1c2VyUmVkdWNlciIsIm5mdCIsIm5mdFJlZHVjZXIiLCJpbnZlbnRvcnkiLCJpbnZlbnRvcnlSZWR1Y2VyIiwiZGV2VG9vbHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJBbnZpbFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJzZXRUaW1lb3V0IiwiZGlzcGF0Y2giLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFNQTs7QUFZQTs7QUFxREE7O0FBRUE7Ozs7Ozs7O0FBTk8sTUFBTUEsa0JBQWtCLEdBQUcsTUFBTTtBQUN0QyxzQkFBTyw0RUFBUDtBQUNELENBRk07Ozs7QUFhUCxNQUFNQyxTQUFTLGdCQUFHQyxlQUFNQyxhQUFOLENBQW9CLElBQXBCLENBQWxCLEMsQ0FFQTs7O0FBQ08sTUFBTUMsYUFBYSxHQUFHLGlDQUFnQkgsU0FBaEIsQ0FBdEI7O0FBQ0EsTUFBTUksZ0JBQWdCLEdBQUcsb0NBQW1CSixTQUFuQixDQUF6Qjs7QUFDQSxNQUFNSyxnQkFBZ0IsR0FBRyxvQ0FBbUJMLFNBQW5CLENBQXpCOztBQUVQLE1BQU1NLE9BQU8sR0FBRyw2QkFBZTtBQUM3QjtBQUNBQyxFQUFBQSxPQUFPLEVBQUU7QUFDUEMsSUFBQUEsSUFBSSxFQUFFQyxhQURDO0FBRVBDLElBQUFBLEdBQUcsRUFBRUMsWUFGRTtBQUdQQyxJQUFBQSxTQUFTLEVBQUVDO0FBSEosR0FGb0I7QUFPN0JDLEVBQUFBLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUI7QUFQTixDQUFmLENBQWhCOztBQVVPLFNBQVNDLGFBQVQsT0FBcUM7QUFBQSxNQUFkO0FBQUVDLElBQUFBO0FBQUYsR0FBYztBQUMxQyxzQkFDRSw2QkFBQyxvQkFBRDtBQUFVLElBQUEsT0FBTyxFQUFFbkIsU0FBbkI7QUFBOEIsSUFBQSxLQUFLLEVBQUVNO0FBQXJDLEtBQ0dhLFFBREgsQ0FERjtBQUtELEMsQ0FFRDs7O0FBRUFDLFVBQVUsQ0FBQyxNQUFNO0FBQ2ZkLEVBQUFBLE9BQU8sQ0FBQ2UsUUFBUixDQUFpQixzQkFBakI7QUFDRCxDQUZTLEVBRVAsR0FGTyxDQUFWOztBQUlBLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQztBQUNqQ0EsRUFBQUEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxNQUFNakIsT0FBTyxDQUFDZSxRQUFSLENBQWlCLHlCQUFqQixDQUF2QztBQUNBQyxFQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLE1BQU1qQixPQUFPLENBQUNlLFFBQVIsQ0FBaUIsd0JBQWpCLENBQXRDO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjb25maWd1cmVTdG9yZSB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XG5cbmltcG9ydCBpbnZlbnRvcnlSZWR1Y2VyLCB7XG4gIGxvYWRfaW52ZW50b3J5LFxuICB2ZXJpZnlfZG9tYWluX3R3aXR0ZXIsXG4gIHZlcmlmeV9kb21haW4sXG59IGZyb20gXCIuL3JlZHVjZXJzL2ludmVudG9yeVwiO1xuXG5pbXBvcnQgdXNlclJlZHVjZXIsIHtcbiAgdXNlcl9hdXRoLFxuICB1c2VyX2xvZ2luLFxuICB1c2VyX2xvZ291dCxcbiAgdXNlcl9yZWZyZXNoX2JhbGFuY2VzLFxuICB1c2VyX3JlZnJlc2hfY29uZmlnLFxuICB1c2VyX3RyYW5zZmVyX2ljcCxcbiAgdXNlcl9wd3JfdHJhbnNmZXIsXG4gIHdpbmRvd19mb2N1cyxcbiAgd2luZG93X2JsdXIsXG59IGZyb20gXCIuL3JlZHVjZXJzL3VzZXJcIjtcblxuaW1wb3J0IG5mdFJlZHVjZXIsIHtcbiAgbmZ0X2ZldGNoLFxuICBuZnRfbWVkaWFfZ2V0LFxuICBuZnRfcHVyY2hhc2UsXG4gIC8vIG5mdF9wdXJjaGFzZV9pbnRlbnQsXG4gIG5mdF90cmFuc2ZlcixcbiAgbmZ0X3BsdWcsXG4gIG5mdF91bnNvY2tldCxcbiAgbmZ0X3JlY2hhcmdlLFxuICBuZnRfYnVybixcbiAgbmZ0X2FwcHJvdmUsXG4gIG5mdF91c2UsXG4gIG5mdF90cmFuc2Zlcl9saW5rLFxuICBuZnRfY2xhaW1fbGluayxcbiAgbmZ0X2VudGVyX2NvZGUsXG4gIG5mdF9yZWNoYXJnZV9xdW90ZSxcbiAgbmZ0X3NldF9wcmljZSxcbn0gZnJvbSBcIi4vcmVkdWNlcnMvbmZ0XCI7XG5cbmV4cG9ydCB7IGxvYWRfaW52ZW50b3J5LCB2ZXJpZnlfZG9tYWluLCB2ZXJpZnlfZG9tYWluX3R3aXR0ZXIgfTtcblxuZXhwb3J0IHtcbiAgdXNlcl9hdXRoLFxuICB1c2VyX2xvZ2luLFxuICB1c2VyX2xvZ291dCxcbiAgdXNlcl9yZWZyZXNoX2JhbGFuY2VzLFxuICB1c2VyX3JlZnJlc2hfY29uZmlnLFxuICB1c2VyX3RyYW5zZmVyX2ljcCxcbiAgdXNlcl9wd3JfdHJhbnNmZXIsXG59O1xuXG5leHBvcnQge1xuICBuZnRfZmV0Y2gsXG4gIG5mdF9tZWRpYV9nZXQsXG4gIG5mdF9wdXJjaGFzZSxcbiAgLy8gbmZ0X3B1cmNoYXNlX2ludGVudCxcbiAgbmZ0X3RyYW5zZmVyLFxuICBuZnRfcGx1ZyxcbiAgbmZ0X3Vuc29ja2V0LFxuICBuZnRfcmVjaGFyZ2UsXG4gIG5mdF9idXJuLFxuICBuZnRfYXBwcm92ZSxcbiAgbmZ0X3VzZSxcbiAgbmZ0X3RyYW5zZmVyX2xpbmssXG4gIG5mdF9jbGFpbV9saW5rLFxuICBuZnRfZW50ZXJfY29kZSxcbiAgbmZ0X3JlY2hhcmdlX3F1b3RlLFxuICBuZnRfc2V0X3ByaWNlLFxufTtcbmV4cG9ydCBjb25zdCBUZXN0QW52aWxDb21wb25lbnQgPSAoKSA9PiB7XG4gIHJldHVybiA8ZGl2PmZ1biBjb21wb25lbnQgc3dlZXQgMTIzIDEyMyAxMjM8L2Rpdj47XG59O1xuXG5pbXBvcnQgeyBJbnZlbnRvcnlMYXJnZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvSW52ZW50b3J5LmpzXCI7XG5leHBvcnQgeyBJbnZlbnRvcnlMYXJnZSB9O1xuaW1wb3J0IHtcbiAgUHJvdmlkZXIsXG4gIGNyZWF0ZVN0b3JlSG9vayxcbiAgY3JlYXRlRGlzcGF0Y2hIb29rLFxuICBjcmVhdGVTZWxlY3Rvckhvb2ssXG59IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuXG5jb25zdCBNeUNvbnRleHQgPSBSZWFjdC5jcmVhdGVDb250ZXh0KG51bGwpO1xuXG4vLyBFeHBvcnQgeW91ciBjdXN0b20gaG9va3MgaWYgeW91IHdpc2ggdG8gdXNlIHRoZW0gaW4gb3RoZXIgZmlsZXMuXG5leHBvcnQgY29uc3QgdXNlQW52aWxTdG9yZSA9IGNyZWF0ZVN0b3JlSG9vayhNeUNvbnRleHQpO1xuZXhwb3J0IGNvbnN0IHVzZUFudmlsRGlzcGF0Y2ggPSBjcmVhdGVEaXNwYXRjaEhvb2soTXlDb250ZXh0KTtcbmV4cG9ydCBjb25zdCB1c2VBbnZpbFNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3JIb29rKE15Q29udGV4dCk7XG5cbmNvbnN0IG15U3RvcmUgPSBjb25maWd1cmVTdG9yZSh7XG4gIC8vIGRldlRvb2xzOiB7IG5hbWU6IFwiQW52aWxcIiB9LFxuICByZWR1Y2VyOiB7XG4gICAgdXNlcjogdXNlclJlZHVjZXIsXG4gICAgbmZ0OiBuZnRSZWR1Y2VyLFxuICAgIGludmVudG9yeTogaW52ZW50b3J5UmVkdWNlcixcbiAgfSxcbiAgZGV2VG9vbHM6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gQW52aWxQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8UHJvdmlkZXIgY29udGV4dD17TXlDb250ZXh0fSBzdG9yZT17bXlTdG9yZX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Qcm92aWRlcj5cbiAgKTtcbn1cblxuLy8gRXh0cmFcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gIG15U3RvcmUuZGlzcGF0Y2godXNlcl9hdXRoKCkpO1xufSwgMTAwKTtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiBteVN0b3JlLmRpc3BhdGNoKHdpbmRvd19mb2N1cygpKSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiBteVN0b3JlLmRpc3BhdGNoKHdpbmRvd19ibHVyKCkpKTtcbn1cbiJdfQ==
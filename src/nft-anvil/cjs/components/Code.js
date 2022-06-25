"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TX = exports.PWR = exports.PRI = exports.NFTA = exports.ICP = exports.HASH = exports.ANV = exports.ACC = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var AccountIdentifier = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js"));

var _index = require("../index.js");

var _react2 = require("@chakra-ui/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* global BigInt */
const Stx = _styled.default.span`
  font-family: Verdana;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgb(117, 130, 149);
  b {
    color: rgb(110, 200, 170);
  }
`;

const TX = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(Stx, null, /*#__PURE__*/_react.default.createElement("b", null, "TX"), children.slice(2));
};

exports.TX = TX;
const Sacc = _styled.default.span`
  font-family: Verdana;
  font-size: 80%;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${props => props.mode === "light" ? "rgb(230, 240, 240)" : "rgb(90, 100, 100)"};
  b {
    color: rgb(170, 255, 0);
  }
`;
const hexColors = {
  light: {
    0: "#49fc32",
    1: "#a7ef15",
    2: "#e8dc16",
    3: "#ffbb33",
    4: "#ff906c",
    5: "#ff87b3",
    6: "#ff92ff",
    7: "#ffa9ff",
    8: "#c8c8ff",
    9: "#00e4ff",
    A: "#00f3ff",
    B: "#29f7db",
    C: "#c9e1bb",
    D: "#ffc8d1",
    E: "#e8cfff",
    F: "#cdd9fd"
  },
  dark: {
    0: "#219812",
    1: "#6f9f0d",
    2: "#8c8509",
    3: "#946507",
    4: "#902705",
    5: "#840835",
    6: "#8e088e",
    7: "#950b95",
    8: "#09098b",
    9: "#097b88",
    A: "#07757a",
    B: "#067969",
    C: "#38850b",
    D: "#a41d33",
    E: "#4e1187",
    F: "#153081"
  }
};

const ACC = _ref2 => {
  let {
    children,
    short = false
  } = _ref2;
  const mode = (0, _react2.useColorModeValue)("dark", "light");
  const color = hexColors[mode];
  let a = children.slice(0, 5).toUpperCase().split("").map((x, idx) => /*#__PURE__*/_react.default.createElement("span", {
    key: idx,
    style: {
      color: color[x]
    }
  }, x));
  let b = children.slice(5, -5);
  let c = children.slice(-5).toUpperCase().split("").map((x, idx) => /*#__PURE__*/_react.default.createElement("span", {
    key: idx,
    style: {
      color: color[x]
    }
  }, x));
  return /*#__PURE__*/_react.default.createElement(Sacc, {
    mode: mode
  }, /*#__PURE__*/_react.default.createElement("b", null, a), short ? "..." : b, /*#__PURE__*/_react.default.createElement("b", null, c));
};

exports.ACC = ACC;
const Spri = _styled.default.span`
  font-family: Verdana;
  font-size: 80%;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgb(220, 220, 220);
  b {
    color: rgb(220, 220, 220);
  }
`;

const PRI = _ref3 => {
  let {
    children
  } = _ref3;
  let p = children.split("-");
  return /*#__PURE__*/_react.default.createElement(Spri, null, p.map((x, idx) => {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: idx
    }, idx !== 0 ? "-" : null, /*#__PURE__*/_react.default.createElement("b", null, x));
  }));
};

exports.PRI = PRI;
const Snfta = _styled.default.span`
  font-family: Verdana;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgb(117, 130, 149);
  b {
    color: rgb(250, 0, 120);
  }
`;

const NFTA = _ref4 => {
  let {
    children
  } = _ref4;
  if (!children) return /*#__PURE__*/_react.default.createElement(Snfta, null, /*#__PURE__*/_react.default.createElement("b", null, "NFTA"));
  return /*#__PURE__*/_react.default.createElement(Snfta, null, /*#__PURE__*/_react.default.createElement("b", null, "NFTA"), children.slice(4));
};

exports.NFTA = NFTA;
const Sanv = _styled.default.span`
  font-family: Verdana;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgb(220, 80, 255);
  span {
    color: rgb(160, 0, 255);
    vertical-align: super;
    font-size: 8px;
    position: relative;
    top: 0.1em;
  }
  b {
    color: rgb(160, 40, 250);
  }
`;

const ANV = _ref5 => {
  let {
    children
  } = _ref5;
  if (!children) return /*#__PURE__*/_react.default.createElement(Sanv, null, /*#__PURE__*/_react.default.createElement("b", null, "ANV"));
  let val = AccountIdentifier.eToAnv(children);
  let [a, b] = val.toString().split(".");
  return /*#__PURE__*/_react.default.createElement(Sanv, null, a, ".", /*#__PURE__*/_react.default.createElement("span", null, b), " ", /*#__PURE__*/_react.default.createElement("b", null, "ANV"));
};

exports.ANV = ANV;
const Spwr = _styled.default.span`
  font-family: Verdana;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgb(220, 80, 255);
  span {
    color: rgb(160, 0, 255);
    vertical-align: super;
    font-size: 8px;
    position: relative;
    top: 0.1em;
  }
  b {
    color: rgb(160, 40, 250);
  }
`;

const PWR = _ref6 => {
  let {
    children
  } = _ref6;
  if (!children) return /*#__PURE__*/_react.default.createElement(Spwr, null, /*#__PURE__*/_react.default.createElement("b", null, "PWR"));
  let val = AccountIdentifier.e8sToPwr(children);
  let [a, b] = val.toString().split(".");
  return /*#__PURE__*/_react.default.createElement(Spwr, null, a, ".", /*#__PURE__*/_react.default.createElement("span", null, b), " ", /*#__PURE__*/_react.default.createElement("b", null, "PWR"));
};

exports.PWR = PWR;
const Sicp = _styled.default.span`
  font-family: Verdana;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgb(120, 200, 255);
  span {
    color: rgb(60, 160, 230);
    vertical-align: super;
    font-size: 8px;
    position: relative;
    top: 0.1em;
  }
  b {
    color: rgb(0, 160, 250);
  }
`;

const ICP = _ref7 => {
  let {
    children,
    digits = 4
  } = _ref7;
  const icpCycles = BigInt((0, _index.useAnvilSelector)(state => state.user.oracle.icpCycles));
  if (!children) return /*#__PURE__*/_react.default.createElement(Sicp, null, /*#__PURE__*/_react.default.createElement("b", null, "ICP"));
  const xdr = Number(BigInt(children) * icpCycles / 10000000000n) / 100;
  let val = AccountIdentifier.e8sToIcp(children);
  let [a, b] = val.toString().split(".");
  b = b.substring(0, digits);
  return /*#__PURE__*/_react.default.createElement(_react2.Tooltip, {
    hasArrow: true,
    placement: "left",
    label: `${xdr.toFixed(2)} XDR`
  }, /*#__PURE__*/_react.default.createElement(Sicp, null, a, ".", /*#__PURE__*/_react.default.createElement("span", null, b), " ", /*#__PURE__*/_react.default.createElement("b", null, "ICP")));
};

exports.ICP = ICP;
const Shash = _styled.default.span`
  font-family: Verdana;
  font-size: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${props => props.mode === "light" ? "#377a5f" : "rgb(110, 200, 170)"};

  b {
    color: ${props => props.mode === "light" ? "#005e47" : "rgb(140, 240, 220)"};
  }
`;

const HASH = _ref8 => {
  let {
    children,
    short = false
  } = _ref8;
  const mode = (0, _react2.useColorModeValue)("light", "dark");
  let t = short ? children = children.slice(0, 4) + ".." + children.slice(-4) : children;
  let txt = t.split("").map((x, idx) => Math.floor(idx / 2) % 2 == 0 ? /*#__PURE__*/_react.default.createElement("b", {
    key: idx
  }, x) : x);
  return /*#__PURE__*/_react.default.createElement(Shash, {
    mode: mode
  }, txt);
};

exports.HASH = HASH;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0NvZGUuanMiXSwibmFtZXMiOlsiU3R4Iiwic3R5bGVkIiwic3BhbiIsIlRYIiwiY2hpbGRyZW4iLCJzbGljZSIsIlNhY2MiLCJwcm9wcyIsIm1vZGUiLCJoZXhDb2xvcnMiLCJsaWdodCIsIkEiLCJCIiwiQyIsIkQiLCJFIiwiRiIsImRhcmsiLCJBQ0MiLCJzaG9ydCIsImNvbG9yIiwiYSIsInRvVXBwZXJDYXNlIiwic3BsaXQiLCJtYXAiLCJ4IiwiaWR4IiwiYiIsImMiLCJTcHJpIiwiUFJJIiwicCIsIlNuZnRhIiwiTkZUQSIsIlNhbnYiLCJBTlYiLCJ2YWwiLCJBY2NvdW50SWRlbnRpZmllciIsImVUb0FudiIsInRvU3RyaW5nIiwiU3B3ciIsIlBXUiIsImU4c1RvUHdyIiwiU2ljcCIsIklDUCIsImRpZ2l0cyIsImljcEN5Y2xlcyIsIkJpZ0ludCIsInN0YXRlIiwidXNlciIsIm9yYWNsZSIsInhkciIsIk51bWJlciIsImU4c1RvSWNwIiwic3Vic3RyaW5nIiwidG9GaXhlZCIsIlNoYXNoIiwiSEFTSCIsInQiLCJ0eHQiLCJNYXRoIiwiZmxvb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFLQTs7Ozs7Ozs7QUFYQTtBQWFBLE1BQU1BLEdBQUcsR0FBR0MsZ0JBQU9DLElBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQVJBOztBQVVPLE1BQU1DLEVBQUUsR0FBRyxRQUFrQjtBQUFBLE1BQWpCO0FBQUVDLElBQUFBO0FBQUYsR0FBaUI7QUFDbEMsc0JBQ0UsNkJBQUMsR0FBRCxxQkFDRSw2Q0FERixFQUVHQSxRQUFRLENBQUNDLEtBQVQsQ0FBZSxDQUFmLENBRkgsQ0FERjtBQU1ELENBUE07OztBQVNQLE1BQU1DLElBQUksR0FBR0wsZ0JBQU9DLElBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFZSyxLQUFELElBQ1BBLEtBQUss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OztBQWNPLE1BQU1pRCxJQUFJLEdBQUcsU0FBaUM7QUFBQSxNQUFoQztBQUFFckQsSUFBQUEsUUFBRjtBQUFZZSxJQUFBQSxLQUFLLEdBQUc7QUFBcEIsR0FBZ0M7QUFDbkQsUUFBTVgsSUFBSSxHQUFHLCtCQUFrQixPQUFsQixFQUEyQixNQUEzQixDQUFiO0FBQ0EsTUFBSWtELENBQUMsR0FBR3ZDLEtBQUssR0FDUmYsUUFBUSxHQUFHQSxRQUFRLENBQUNDLEtBQVQsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLElBQXVCLElBQXZCLEdBQThCRCxRQUFRLENBQUNDLEtBQVQsQ0FBZSxDQUFDLENBQWhCLENBRGpDLEdBRVRELFFBRko7QUFJQSxNQUFJdUQsR0FBRyxHQUFHRCxDQUFDLENBQ1JuQyxLQURPLENBQ0QsRUFEQyxFQUVQQyxHQUZPLENBRUgsQ0FBQ0MsQ0FBRCxFQUFJQyxHQUFKLEtBQWFrQyxJQUFJLENBQUNDLEtBQUwsQ0FBV25DLEdBQUcsR0FBRyxDQUFqQixJQUFzQixDQUF0QixJQUEyQixDQUEzQixnQkFBK0I7QUFBRyxJQUFBLEdBQUcsRUFBRUE7QUFBUixLQUFjRCxDQUFkLENBQS9CLEdBQXNEQSxDQUZoRSxDQUFWO0FBR0Esc0JBQU8sNkJBQUMsS0FBRDtBQUFPLElBQUEsSUFBSSxFQUFFakI7QUFBYixLQUFvQm1ELEdBQXBCLENBQVA7QUFDRCxDQVZNIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIEJpZ0ludCAqL1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHN0eWxlZCBmcm9tIFwiQGVtb3Rpb24vc3R5bGVkXCI7XG5pbXBvcnQgKiBhcyBBY2NvdW50SWRlbnRpZmllciBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvYWNjb3VudGlkZW50aWZpZXIuanNcIjtcblxuaW1wb3J0IHtcbiAgdXNlQW52aWxTZWxlY3RvciBhcyB1c2VTZWxlY3RvcixcbiAgdXNlQW52aWxEaXNwYXRjaCBhcyB1c2VEaXNwYXRjaCxcbn0gZnJvbSBcIi4uL2luZGV4LmpzXCI7XG5cbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ29sb3JNb2RlVmFsdWUgfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuY29uc3QgU3R4ID0gc3R5bGVkLnNwYW5gXG4gIGZvbnQtZmFtaWx5OiBWZXJkYW5hO1xuICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBjb2xvcjogcmdiKDExNywgMTMwLCAxNDkpO1xuICBiIHtcbiAgICBjb2xvcjogcmdiKDExMCwgMjAwLCAxNzApO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgVFggPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN0eD5cbiAgICAgIDxiPlRYPC9iPlxuICAgICAge2NoaWxkcmVuLnNsaWNlKDIpfVxuICAgIDwvU3R4PlxuICApO1xufTtcblxuY29uc3QgU2FjYyA9IHN0eWxlZC5zcGFuYFxuICBmb250LWZhbWlseTogVmVyZGFuYTtcbiAgZm9udC1zaXplOiA4MCU7XG4gIGxldHRlci1zcGFjaW5nOiAycHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGNvbG9yOiAkeyhwcm9wcykgPT5cbiAgICBwcm9wcy5tb2RlID09PSBcImxpZ2h0XCIgPyBcInJnYigyMzAsIDI0MCwgMjQwKVwiIDogXCJyZ2IoOTAsIDEwMCwgMTAwKVwifTtcbiAgYiB7XG4gICAgY29sb3I6IHJnYigxNzAsIDI1NSwgMCk7XG4gIH1cbmA7XG5cbmNvbnN0IGhleENvbG9ycyA9IHtcbiAgbGlnaHQ6IHtcbiAgICAwOiBcIiM0OWZjMzJcIixcbiAgICAxOiBcIiNhN2VmMTVcIixcbiAgICAyOiBcIiNlOGRjMTZcIixcbiAgICAzOiBcIiNmZmJiMzNcIixcbiAgICA0OiBcIiNmZjkwNmNcIixcbiAgICA1OiBcIiNmZjg3YjNcIixcbiAgICA2OiBcIiNmZjkyZmZcIixcbiAgICA3OiBcIiNmZmE5ZmZcIixcbiAgICA4OiBcIiNjOGM4ZmZcIixcbiAgICA5OiBcIiMwMGU0ZmZcIixcbiAgICBBOiBcIiMwMGYzZmZcIixcbiAgICBCOiBcIiMyOWY3ZGJcIixcbiAgICBDOiBcIiNjOWUxYmJcIixcbiAgICBEOiBcIiNmZmM4ZDFcIixcbiAgICBFOiBcIiNlOGNmZmZcIixcbiAgICBGOiBcIiNjZGQ5ZmRcIixcbiAgfSxcbiAgZGFyazoge1xuICAgIDA6IFwiIzIxOTgxMlwiLFxuICAgIDE6IFwiIzZmOWYwZFwiLFxuICAgIDI6IFwiIzhjODUwOVwiLFxuICAgIDM6IFwiIzk0NjUwN1wiLFxuICAgIDQ6IFwiIzkwMjcwNVwiLFxuICAgIDU6IFwiIzg0MDgzNVwiLFxuICAgIDY6IFwiIzhlMDg4ZVwiLFxuICAgIDc6IFwiIzk1MGI5NVwiLFxuICAgIDg6IFwiIzA5MDk4YlwiLFxuICAgIDk6IFwiIzA5N2I4OFwiLFxuICAgIEE6IFwiIzA3NzU3YVwiLFxuICAgIEI6IFwiIzA2Nzk2OVwiLFxuICAgIEM6IFwiIzM4ODUwYlwiLFxuICAgIEQ6IFwiI2E0MWQzM1wiLFxuICAgIEU6IFwiIzRlMTE4N1wiLFxuICAgIEY6IFwiIzE1MzA4MVwiLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IEFDQyA9ICh7IGNoaWxkcmVuLCBzaG9ydCA9IGZhbHNlIH0pID0+IHtcbiAgY29uc3QgbW9kZSA9IHVzZUNvbG9yTW9kZVZhbHVlKFwiZGFya1wiLCBcImxpZ2h0XCIpO1xuICBjb25zdCBjb2xvciA9IGhleENvbG9yc1ttb2RlXTtcblxuICBsZXQgYSA9IGNoaWxkcmVuXG4gICAgLnNsaWNlKDAsIDUpXG4gICAgLnRvVXBwZXJDYXNlKClcbiAgICAuc3BsaXQoXCJcIilcbiAgICAubWFwKCh4LCBpZHgpID0+IChcbiAgICAgIDxzcGFuIGtleT17aWR4fSBzdHlsZT17eyBjb2xvcjogY29sb3JbeF0gfX0+XG4gICAgICAgIHt4fVxuICAgICAgPC9zcGFuPlxuICAgICkpO1xuICBsZXQgYiA9IGNoaWxkcmVuLnNsaWNlKDUsIC01KTtcbiAgbGV0IGMgPSBjaGlsZHJlblxuICAgIC5zbGljZSgtNSlcbiAgICAudG9VcHBlckNhc2UoKVxuICAgIC5zcGxpdChcIlwiKVxuICAgIC5tYXAoKHgsIGlkeCkgPT4gKFxuICAgICAgPHNwYW4ga2V5PXtpZHh9IHN0eWxlPXt7IGNvbG9yOiBjb2xvclt4XSB9fT5cbiAgICAgICAge3h9XG4gICAgICA8L3NwYW4+XG4gICAgKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2FjYyBtb2RlPXttb2RlfT5cbiAgICAgIDxiPnthfTwvYj5cbiAgICAgIHtzaG9ydCA/IFwiLi4uXCIgOiBifVxuICAgICAgPGI+e2N9PC9iPlxuICAgIDwvU2FjYz5cbiAgKTtcbn07XG5cbmNvbnN0IFNwcmkgPSBzdHlsZWQuc3BhbmBcbiAgZm9udC1mYW1pbHk6IFZlcmRhbmE7XG4gIGZvbnQtc2l6ZTogODAlO1xuICBsZXR0ZXItc3BhY2luZzogMnB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBjb2xvcjogcmdiKDIyMCwgMjIwLCAyMjApO1xuICBiIHtcbiAgICBjb2xvcjogcmdiKDIyMCwgMjIwLCAyMjApO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUFJJID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBsZXQgcCA9IGNoaWxkcmVuLnNwbGl0KFwiLVwiKTtcbiAgcmV0dXJuIChcbiAgICA8U3ByaT5cbiAgICAgIHtwLm1hcCgoeCwgaWR4KSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPHNwYW4ga2V5PXtpZHh9PlxuICAgICAgICAgICAge2lkeCAhPT0gMCA/IFwiLVwiIDogbnVsbH1cbiAgICAgICAgICAgIDxiPnt4fTwvYj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L1Nwcmk+XG4gICk7XG59O1xuXG5jb25zdCBTbmZ0YSA9IHN0eWxlZC5zcGFuYFxuICBmb250LWZhbWlseTogVmVyZGFuYTtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6IHJnYigxMTcsIDEzMCwgMTQ5KTtcbiAgYiB7XG4gICAgY29sb3I6IHJnYigyNTAsIDAsIDEyMCk7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBORlRBID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBpZiAoIWNoaWxkcmVuKVxuICAgIHJldHVybiAoXG4gICAgICA8U25mdGE+XG4gICAgICAgIDxiPk5GVEE8L2I+XG4gICAgICA8L1NuZnRhPlxuICAgICk7XG4gIHJldHVybiAoXG4gICAgPFNuZnRhPlxuICAgICAgPGI+TkZUQTwvYj5cbiAgICAgIHtjaGlsZHJlbi5zbGljZSg0KX1cbiAgICA8L1NuZnRhPlxuICApO1xufTtcblxuY29uc3QgU2FudiA9IHN0eWxlZC5zcGFuYFxuICBmb250LWZhbWlseTogVmVyZGFuYTtcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6IHJnYigyMjAsIDgwLCAyNTUpO1xuICBzcGFuIHtcbiAgICBjb2xvcjogcmdiKDE2MCwgMCwgMjU1KTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogc3VwZXI7XG4gICAgZm9udC1zaXplOiA4cHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogMC4xZW07XG4gIH1cbiAgYiB7XG4gICAgY29sb3I6IHJnYigxNjAsIDQwLCAyNTApO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQU5WID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBpZiAoIWNoaWxkcmVuKVxuICAgIHJldHVybiAoXG4gICAgICA8U2Fudj5cbiAgICAgICAgPGI+QU5WPC9iPlxuICAgICAgPC9TYW52PlxuICAgICk7XG4gIGxldCB2YWwgPSBBY2NvdW50SWRlbnRpZmllci5lVG9BbnYoY2hpbGRyZW4pO1xuICBsZXQgW2EsIGJdID0gdmFsLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpO1xuICByZXR1cm4gKFxuICAgIDxTYW52PlxuICAgICAge2F9LjxzcGFuPntifTwvc3Bhbj4gPGI+QU5WPC9iPlxuICAgIDwvU2Fudj5cbiAgKTtcbn07XG5cbmNvbnN0IFNwd3IgPSBzdHlsZWQuc3BhbmBcbiAgZm9udC1mYW1pbHk6IFZlcmRhbmE7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGNvbG9yOiByZ2IoMjIwLCA4MCwgMjU1KTtcbiAgc3BhbiB7XG4gICAgY29sb3I6IHJnYigxNjAsIDAsIDI1NSk7XG4gICAgdmVydGljYWwtYWxpZ246IHN1cGVyO1xuICAgIGZvbnQtc2l6ZTogOHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDAuMWVtO1xuICB9XG4gIGIge1xuICAgIGNvbG9yOiByZ2IoMTYwLCA0MCwgMjUwKTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFBXUiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgaWYgKCFjaGlsZHJlbilcbiAgICByZXR1cm4gKFxuICAgICAgPFNwd3I+XG4gICAgICAgIDxiPlBXUjwvYj5cbiAgICAgIDwvU3B3cj5cbiAgICApO1xuICBsZXQgdmFsID0gQWNjb3VudElkZW50aWZpZXIuZThzVG9Qd3IoY2hpbGRyZW4pO1xuICBsZXQgW2EsIGJdID0gdmFsLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpO1xuICByZXR1cm4gKFxuICAgIDxTcHdyPlxuICAgICAge2F9LjxzcGFuPntifTwvc3Bhbj4gPGI+UFdSPC9iPlxuICAgIDwvU3B3cj5cbiAgKTtcbn07XG5cbmNvbnN0IFNpY3AgPSBzdHlsZWQuc3BhbmBcbiAgZm9udC1mYW1pbHk6IFZlcmRhbmE7XG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGNvbG9yOiByZ2IoMTIwLCAyMDAsIDI1NSk7XG4gIHNwYW4ge1xuICAgIGNvbG9yOiByZ2IoNjAsIDE2MCwgMjMwKTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogc3VwZXI7XG4gICAgZm9udC1zaXplOiA4cHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHRvcDogMC4xZW07XG4gIH1cbiAgYiB7XG4gICAgY29sb3I6IHJnYigwLCAxNjAsIDI1MCk7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBJQ1AgPSAoeyBjaGlsZHJlbiwgZGlnaXRzID0gNCB9KSA9PiB7XG4gIGNvbnN0IGljcEN5Y2xlcyA9IEJpZ0ludCh1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLnVzZXIub3JhY2xlLmljcEN5Y2xlcykpO1xuXG4gIGlmICghY2hpbGRyZW4pXG4gICAgcmV0dXJuIChcbiAgICAgIDxTaWNwPlxuICAgICAgICA8Yj5JQ1A8L2I+XG4gICAgICA8L1NpY3A+XG4gICAgKTtcblxuICBjb25zdCB4ZHIgPSBOdW1iZXIoKEJpZ0ludChjaGlsZHJlbikgKiBpY3BDeWNsZXMpIC8gMTAwMDAwMDAwMDBuKSAvIDEwMDtcblxuICBsZXQgdmFsID0gQWNjb3VudElkZW50aWZpZXIuZThzVG9JY3AoY2hpbGRyZW4pO1xuICBsZXQgW2EsIGJdID0gdmFsLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpO1xuICBiID0gYi5zdWJzdHJpbmcoMCwgZGlnaXRzKTtcbiAgcmV0dXJuIChcbiAgICA8VG9vbHRpcCBoYXNBcnJvdyBwbGFjZW1lbnQ9XCJsZWZ0XCIgbGFiZWw9e2Ake3hkci50b0ZpeGVkKDIpfSBYRFJgfT5cbiAgICAgIDxTaWNwPlxuICAgICAgICB7YX0uPHNwYW4+e2J9PC9zcGFuPiA8Yj5JQ1A8L2I+XG4gICAgICA8L1NpY3A+XG4gICAgPC9Ub29sdGlwPlxuICApO1xufTtcblxuY29uc3QgU2hhc2ggPSBzdHlsZWQuc3BhbmBcbiAgZm9udC1mYW1pbHk6IFZlcmRhbmE7XG4gIGZvbnQtc2l6ZTogOHB4O1xuICBsZXR0ZXItc3BhY2luZzogMnB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBjb2xvcjogJHsocHJvcHMpID0+XG4gICAgcHJvcHMubW9kZSA9PT0gXCJsaWdodFwiID8gXCIjMzc3YTVmXCIgOiBcInJnYigxMTAsIDIwMCwgMTcwKVwifTtcblxuICBiIHtcbiAgICBjb2xvcjogJHsocHJvcHMpID0+XG4gICAgICBwcm9wcy5tb2RlID09PSBcImxpZ2h0XCIgPyBcIiMwMDVlNDdcIiA6IFwicmdiKDE0MCwgMjQwLCAyMjApXCJ9O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgSEFTSCA9ICh7IGNoaWxkcmVuLCBzaG9ydCA9IGZhbHNlIH0pID0+IHtcbiAgY29uc3QgbW9kZSA9IHVzZUNvbG9yTW9kZVZhbHVlKFwibGlnaHRcIiwgXCJkYXJrXCIpO1xuICBsZXQgdCA9IHNob3J0XG4gICAgPyAoY2hpbGRyZW4gPSBjaGlsZHJlbi5zbGljZSgwLCA0KSArIFwiLi5cIiArIGNoaWxkcmVuLnNsaWNlKC00KSlcbiAgICA6IGNoaWxkcmVuO1xuXG4gIGxldCB0eHQgPSB0XG4gICAgLnNwbGl0KFwiXCIpXG4gICAgLm1hcCgoeCwgaWR4KSA9PiAoTWF0aC5mbG9vcihpZHggLyAyKSAlIDIgPT0gMCA/IDxiIGtleT17aWR4fT57eH08L2I+IDogeCkpO1xuICByZXR1cm4gPFNoYXNoIG1vZGU9e21vZGV9Pnt0eHR9PC9TaGFzaD47XG59O1xuIl19
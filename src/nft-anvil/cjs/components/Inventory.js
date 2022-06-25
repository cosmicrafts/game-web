"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryLarge = exports.Inventory = void 0;

var _react = require("@chakra-ui/react");

var _icons = require("@chakra-ui/icons");

var _react2 = _interopRequireWildcard(require("react"));

var _NFT = require("./NFT");

var _itemgrid = _interopRequireDefault(require("../assets/itemgrid.png"));

var _itemgrid_light = _interopRequireDefault(require("../assets/itemgrid_light.png"));

var _reactUse = require("react-use");

var _index = require("../index.js");

var _inventory = require("../reducers/inventory");

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _Code = require("./Code");

var _History = require("./History");

var _token = require("@vvv-interactive/nftanvil-tools/cjs/token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const InventoryBox = _styled.default.div`
  background: url(${props => props.bg});
  background-size: 72px 72px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin-top: 28px;
  padding: 0px;
  border-radius: 8px;
`;

const Inventory = _ref => {
  let {
    address
  } = _ref;
  const maxItems = 100;
  const acc = (0, _index.useAnvilSelector)(state => state.user.map.account);
  const {
    width,
    height
  } = (0, _reactUse.useWindowSize)();
  const [pageIdx, setPageIdx] = (0, _react2.useState)(0);
  const [isLoading, setLoading] = (0, _react2.useState)(true);
  const dispatch = (0, _index.useAnvilDispatch)();

  const load = async () => {
    await dispatch((0, _inventory.load_inventory)(address, pageIdx, maxItems));
    setLoading(false);
  };

  let bg = (0, _react.useColorModeValue)(_itemgrid_light.default, _itemgrid.default);
  (0, _react2.useEffect)(() => {
    if (!(acc !== null && acc !== void 0 && acc.length)) return null;
    load();
  }, [address, acc, pageIdx]);
  const items = (0, _index.useAnvilSelector)(state => state.inventory[address] && state.inventory[address][pageIdx]);
  const meta = (0, _index.useAnvilSelector)(state => state.inventory[address + "meta"]);
  if (!items) return null;
  const cols = Math.min(Math.floor((width - 50) / 72), 10);
  const rows = Math.ceil(maxItems / cols);
  return /*#__PURE__*/_react2.default.createElement(_react.Stack, {
    mt: "8"
  }, /*#__PURE__*/_react2.default.createElement(Pagination, {
    address: address,
    pageIdx: pageIdx,
    end: items.length < maxItems,
    setPageIdx: setPageIdx
  }), /*#__PURE__*/_react2.default.createElement(_react.Center, null, /*#__PURE__*/_react2.default.createElement(InventoryBox, {
    width: cols * 72,
    height: rows * 72,
    bg: bg
  }, isLoading ? /*#__PURE__*/_react2.default.createElement(_react.Box, {
    h: "72px"
  }, /*#__PURE__*/_react2.default.createElement(_react.Center, null, /*#__PURE__*/_react2.default.createElement(_react.Spinner, {
    size: "lg",
    mt: "11px"
  }))) : /*#__PURE__*/_react2.default.createElement(_react.Wrap, {
    direction: "horizontal",
    spacing: "0"
  }, items && items.map(id => /*#__PURE__*/_react2.default.createElement("a", {
    key: id,
    href: "https://nftanvil.com/" + id,
    target: "_anvil"
  }, /*#__PURE__*/_react2.default.createElement(_NFT.NFT, {
    id: id
  })))))), /*#__PURE__*/_react2.default.createElement(Pagination, {
    address: address,
    pageIdx: pageIdx,
    end: items.length < maxItems,
    setPageIdx: setPageIdx
  }));
};

exports.Inventory = Inventory;

const InventoryLarge = _ref2 => {
  let {
    address
  } = _ref2;
  const maxItems = 40;
  const acc = (0, _index.useAnvilSelector)(state => state.user.map.account); // const { width, height } = useWindowSize();

  const [pageIdx, setPageIdx] = (0, _react2.useState)(0);
  const [isLoading, setLoading] = (0, _react2.useState)(true);
  const dispatch = (0, _index.useAnvilDispatch)();

  const load = async () => {
    await dispatch((0, _inventory.load_inventory)(address, pageIdx, maxItems)).catch(e => {
      console.log(e);
    });
    setLoading(false);
  };

  let bg = (0, _react.useColorModeValue)(_itemgrid_light.default, _itemgrid.default);
  (0, _react2.useEffect)(() => {
    if (!(acc !== null && acc !== void 0 && acc.length)) return null;
    load();
  }, [address, acc, pageIdx]);
  const items = (0, _index.useAnvilSelector)(state => state.inventory[address] && state.inventory[address][pageIdx]);
  const meta = (0, _index.useAnvilSelector)(state => state.inventory[address + "meta"]);
  if (!items) return null;
  console.log({
    items,
    meta,
    address,
    pageIdx,
    maxItems
  });
  return /*#__PURE__*/_react2.default.createElement(_react.Stack, {
    mt: "8"
  }, /*#__PURE__*/_react2.default.createElement(Pagination, {
    address: address,
    pageIdx: pageIdx,
    end: items.length < maxItems,
    lg: true,
    setPageIdx: setPageIdx
  }), /*#__PURE__*/_react2.default.createElement(_react.Center, null, /*#__PURE__*/_react2.default.createElement(_react.Box, {
    mt: "4",
    mb: "4",
    w: "100%",
    bg: bg
  }, isLoading ? /*#__PURE__*/_react2.default.createElement(_react.Box, {
    h: "72px"
  }, /*#__PURE__*/_react2.default.createElement(_react.Center, null, /*#__PURE__*/_react2.default.createElement(_react.Spinner, {
    size: "lg",
    mt: "11px"
  }))) : /*#__PURE__*/_react2.default.createElement(_react.Wrap, {
    direction: "horizontal",
    spacing: "5",
    justify: "center"
  }, items && items.map(id => /*#__PURE__*/_react2.default.createElement(_NFT.NFTLarge, {
    id: id,
    key: id
  }))))), /*#__PURE__*/_react2.default.createElement(Pagination, {
    address: address,
    pageIdx: pageIdx,
    end: items.length < maxItems,
    lg: true,
    setPageIdx: setPageIdx
  }));
};

exports.InventoryLarge = InventoryLarge;

const Pagination = _ref3 => {
  let {
    address,
    pageIdx,
    setPageIdx,
    end,
    lg = false
  } = _ref3;
  return /*#__PURE__*/_react2.default.createElement(_react.Text, {
    fontSize: "11px",
    textAlign: "center"
  }, /*#__PURE__*/_react2.default.createElement(_Code.ACC, {
    short: true
  }, address), /*#__PURE__*/_react2.default.createElement(_react.IconButton, {
    ml: "2",
    size: "xs",
    icon: /*#__PURE__*/_react2.default.createElement(_icons.ChevronLeftIcon, null),
    variant: "solid",
    disabled: pageIdx - 1 < 0,
    onClick: () => {
      setPageIdx(pageIdx - 1);
    }
  }), /*#__PURE__*/_react2.default.createElement(_react.IconButton, {
    ml: "2",
    size: "xs",
    icon: /*#__PURE__*/_react2.default.createElement(_icons.ChevronRightIcon, null),
    variant: "outline",
    disabled: end,
    onClick: () => {
      setPageIdx(pageIdx + 1);
    }
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0ludmVudG9yeS5qcyJdLCJuYW1lcyI6WyJJbnZlbnRvcnlCb3giLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsImJnIiwid2lkdGgiLCJoZWlnaHQiLCJJbnZlbnRvcnkiLCJhZGRyZXNzIiwibWF4SXRlbXMiLCJhY2MiLCJzdGF0ZSIsInVzZXIiLCJtYXAiLCJhY2NvdW50IiwicGFnZUlkeCIsInNldFBhZ2VJZHgiLCJpc0xvYWRpbmciLCJzZXRMb2FkaW5nIiwiZGlzcGF0Y2giLCJsb2FkIiwiaXRlbWdyaWRfbGlnaHQiLCJpdGVtZ3JpZCIsImxlbmd0aCIsIml0ZW1zIiwiaW52ZW50b3J5IiwibWV0YSIsImNvbHMiLCJNYXRoIiwibWluIiwiZmxvb3IiLCJyb3dzIiwiY2VpbCIsImlkIiwiSW52ZW50b3J5TGFyZ2UiLCJjYXRjaCIsImUiLCJjb25zb2xlIiwibG9nIiwiUGFnaW5hdGlvbiIsImVuZCIsImxnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBV0E7O0FBTUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBSUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsWUFBWSxHQUFHQyxnQkFBT0MsR0FBSTtBQUNoQyxvQkFBcUJDLEtBQUQsSUFBV0EsS0FBSyxDQUFDQyxFQUFHO0FBQ3hDO0FBQ0EsV0FBWUQsS0FBRCxJQUFXQSxLQUFLLENBQUNFLEtBQU07QUFDbEMsWUFBYUYsS0FBRCxJQUFXQSxLQUFLLENBQUNHLE1BQU87QUFDcEM7QUFDQTtBQUNBO0FBQ0EsQ0FSQTs7QUFVTyxNQUFNQyxTQUFTLEdBQUcsUUFBaUI7QUFBQSxNQUFoQjtBQUFFQyxJQUFBQTtBQUFGLEdBQWdCO0FBQ3hDLFFBQU1DLFFBQVEsR0FBRyxHQUFqQjtBQUVBLFFBQU1DLEdBQUcsR0FBRyw2QkFBYUMsS0FBRCxJQUFXQSxLQUFLLENBQUNDLElBQU4sQ0FBV0MsR0FBWCxDQUFlQyxPQUF0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QWMsQ0FMMUI7QUFNRSxJQUFBLE9BQU8sRUFBRSxNQUFNO0FBQ2JDLE1BQUFBLFVBQVUsQ0FBQ0QsT0FBTyxHQUFHLENBQVgsQ0FBVjtBQUNEO0FBUkgsSUFIRixlQWNFLDhCQUFDLGlCQUFEO0FBQ0UsSUFBQSxFQUFFLEVBQUMsR0FETDtBQUVFLElBQUEsSUFBSSxFQUFDLElBRlA7QUFHRSxJQUFBLElBQUksZUFBRSw4QkFBQyx1QkFBRCxPQUhSO0FBSUUsSUFBQSxPQUFPLEVBQUMsU0FKVjtBQUtFLElBQUEsUUFBUSxFQUFFeUIsR0FMWjtBQU1FLElBQUEsT0FBTyxFQUFFLE1BQU07QUFDYnhCLE1BQUFBLFVBQVUsQ0FBQ0QsT0FBTyxHQUFHLENBQVgsQ0FBVjtBQUNEO0FBUkgsSUFkRixDQURGO0FBMkJELENBNUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQm94LFxuICBTcGlubmVyLFxuICBXcmFwLFxuICB1c2VDb2xvck1vZGVWYWx1ZSxcbiAgQ2VudGVyLFxuICBTdGFjayxcbiAgVGV4dCxcbiAgSWNvbkJ1dHRvbixcbn0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcblxuaW1wb3J0IHtcbiAgSGFtYnVyZ2VySWNvbixcbiAgQ2hldnJvbkxlZnRJY29uLFxuICBDaGV2cm9uUmlnaHRJY29uLFxufSBmcm9tIFwiQGNoYWtyYS11aS9pY29uc1wiO1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBORlRMYXJnZSwgTkZUIH0gZnJvbSBcIi4vTkZUXCI7XG5pbXBvcnQgaXRlbWdyaWQgZnJvbSBcIi4uL2Fzc2V0cy9pdGVtZ3JpZC5wbmdcIjtcbmltcG9ydCBpdGVtZ3JpZF9saWdodCBmcm9tIFwiLi4vYXNzZXRzL2l0ZW1ncmlkX2xpZ2h0LnBuZ1wiO1xuaW1wb3J0IHsgdXNlV2luZG93U2l6ZSB9IGZyb20gXCJyZWFjdC11c2VcIjtcblxuaW1wb3J0IHtcbiAgdXNlQW52aWxTZWxlY3RvciBhcyB1c2VTZWxlY3RvcixcbiAgdXNlQW52aWxEaXNwYXRjaCBhcyB1c2VEaXNwYXRjaCxcbn0gZnJvbSBcIi4uL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBsb2FkX2ludmVudG9yeSB9IGZyb20gXCIuLi9yZWR1Y2Vycy9pbnZlbnRvcnlcIjtcbmltcG9ydCBzdHlsZWQgZnJvbSBcIkBlbW90aW9uL3N0eWxlZFwiO1xuaW1wb3J0IHsgVFgsIEFDQywgTkZUQSwgSEFTSCwgUFdSLCBJQ1AgfSBmcm9tIFwiLi9Db2RlXCI7XG5pbXBvcnQgeyBOZnRIaXN0b3J5IH0gZnJvbSBcIi4vSGlzdG9yeVwiO1xuaW1wb3J0IHsgdG9rZW5Ub1RleHQgfSBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvdG9rZW5cIjtcblxuY29uc3QgSW52ZW50b3J5Qm94ID0gc3R5bGVkLmRpdmBcbiAgYmFja2dyb3VuZDogdXJsKCR7KHByb3BzKSA9PiBwcm9wcy5iZ30pO1xuICBiYWNrZ3JvdW5kLXNpemU6IDcycHggNzJweDtcbiAgd2lkdGg6ICR7KHByb3BzKSA9PiBwcm9wcy53aWR0aH1weDtcbiAgaGVpZ2h0OiAkeyhwcm9wcykgPT4gcHJvcHMuaGVpZ2h0fXB4O1xuICBtYXJnaW4tdG9wOiAyOHB4O1xuICBwYWRkaW5nOiAwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbmA7XG5cbmV4cG9ydCBjb25zdCBJbnZlbnRvcnkgPSAoeyBhZGRyZXNzIH0pID0+IHtcbiAgY29uc3QgbWF4SXRlbXMgPSAxMDA7XG5cbiAgY29uc3QgYWNjID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS51c2VyLm1hcC5hY2NvdW50KTtcbiAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB1c2VXaW5kb3dTaXplKCk7XG4gIGNvbnN0IFtwYWdlSWR4LCBzZXRQYWdlSWR4XSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuXG4gIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZGlzcGF0Y2gobG9hZF9pbnZlbnRvcnkoYWRkcmVzcywgcGFnZUlkeCwgbWF4SXRlbXMpKTtcbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgfTtcbiAgbGV0IGJnID0gdXNlQ29sb3JNb2RlVmFsdWUoaXRlbWdyaWRfbGlnaHQsIGl0ZW1ncmlkKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghYWNjPy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIGxvYWQoKTtcbiAgfSwgW2FkZHJlc3MsIGFjYywgcGFnZUlkeF0pO1xuXG4gIGNvbnN0IGl0ZW1zID0gdXNlU2VsZWN0b3IoXG4gICAgKHN0YXRlKSA9PiBzdGF0ZS5pbnZlbnRvcnlbYWRkcmVzc10gJiYgc3RhdGUuaW52ZW50b3J5W2FkZHJlc3NdW3BhZ2VJZHhdXG4gICk7XG4gIGNvbnN0IG1ldGEgPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLmludmVudG9yeVthZGRyZXNzICsgXCJtZXRhXCJdKTtcblxuICBpZiAoIWl0ZW1zKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBjb2xzID0gTWF0aC5taW4oTWF0aC5mbG9vcigod2lkdGggLSA1MCkgLyA3MiksIDEwKTtcbiAgY29uc3Qgcm93cyA9IE1hdGguY2VpbChtYXhJdGVtcyAvIGNvbHMpO1xuXG4gIHJldHVybiAoXG4gICAgPFN0YWNrIG10PVwiOFwiPlxuICAgICAgPFBhZ2luYXRpb25cbiAgICAgICAgYWRkcmVzcz17YWRkcmVzc31cbiAgICAgICAgcGFnZUlkeD17cGFnZUlkeH1cbiAgICAgICAgZW5kPXtpdGVtcy5sZW5ndGggPCBtYXhJdGVtc31cbiAgICAgICAgc2V0UGFnZUlkeD17c2V0UGFnZUlkeH1cbiAgICAgIC8+XG5cbiAgICAgIDxDZW50ZXI+XG4gICAgICAgIDxJbnZlbnRvcnlCb3ggd2lkdGg9e2NvbHMgKiA3Mn0gaGVpZ2h0PXtyb3dzICogNzJ9IGJnPXtiZ30+XG4gICAgICAgICAge2lzTG9hZGluZyA/IChcbiAgICAgICAgICAgIDxCb3ggaD1cIjcycHhcIj5cbiAgICAgICAgICAgICAgPENlbnRlcj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwibGdcIiBtdD1cIjExcHhcIiAvPlxuICAgICAgICAgICAgICA8L0NlbnRlcj5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8V3JhcCBkaXJlY3Rpb249e1wiaG9yaXpvbnRhbFwifSBzcGFjaW5nPVwiMFwiPlxuICAgICAgICAgICAgICB7aXRlbXMgJiZcbiAgICAgICAgICAgICAgICBpdGVtcy5tYXAoKGlkKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2lkfVxuICAgICAgICAgICAgICAgICAgICBocmVmPXtcImh0dHBzOi8vbmZ0YW52aWwuY29tL1wiICsgaWR9XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9hbnZpbFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxORlQgaWQ9e2lkfSAvPlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9XcmFwPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvSW52ZW50b3J5Qm94PlxuICAgICAgPC9DZW50ZXI+XG5cbiAgICAgIDxQYWdpbmF0aW9uXG4gICAgICAgIGFkZHJlc3M9e2FkZHJlc3N9XG4gICAgICAgIHBhZ2VJZHg9e3BhZ2VJZHh9XG4gICAgICAgIGVuZD17aXRlbXMubGVuZ3RoIDwgbWF4SXRlbXN9XG4gICAgICAgIHNldFBhZ2VJZHg9e3NldFBhZ2VJZHh9XG4gICAgICAvPlxuXG4gICAgICB7Lyoge21ldGEgPyAoXG4gICAgICAgIDxOZnRIaXN0b3J5IHRyYW5zYWN0aW9ucz17bWV0YS50cmFuc2FjdGlvbnN9IHNob3dUaHVtYj17dHJ1ZX0gLz5cbiAgICAgICkgOiBudWxsfSAqL31cbiAgICA8L1N0YWNrPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEludmVudG9yeUxhcmdlID0gKHsgYWRkcmVzcyB9KSA9PiB7XG4gIGNvbnN0IG1heEl0ZW1zID0gNDA7XG5cbiAgY29uc3QgYWNjID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS51c2VyLm1hcC5hY2NvdW50KTtcbiAgLy8gY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB1c2VXaW5kb3dTaXplKCk7XG4gIGNvbnN0IFtwYWdlSWR4LCBzZXRQYWdlSWR4XSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuXG4gIGNvbnN0IGxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZGlzcGF0Y2gobG9hZF9pbnZlbnRvcnkoYWRkcmVzcywgcGFnZUlkeCwgbWF4SXRlbXMpKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSk7XG4gICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gIH07XG5cbiAgbGV0IGJnID0gdXNlQ29sb3JNb2RlVmFsdWUoaXRlbWdyaWRfbGlnaHQsIGl0ZW1ncmlkKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghYWNjPy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIGxvYWQoKTtcbiAgfSwgW2FkZHJlc3MsIGFjYywgcGFnZUlkeF0pO1xuXG4gIGNvbnN0IGl0ZW1zID0gdXNlU2VsZWN0b3IoXG4gICAgKHN0YXRlKSA9PiBzdGF0ZS5pbnZlbnRvcnlbYWRkcmVzc10gJiYgc3RhdGUuaW52ZW50b3J5W2FkZHJlc3NdW3BhZ2VJZHhdXG4gICk7XG5cbiAgY29uc3QgbWV0YSA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUuaW52ZW50b3J5W2FkZHJlc3MgKyBcIm1ldGFcIl0pO1xuXG4gIGlmICghaXRlbXMpIHJldHVybiBudWxsO1xuXG4gIGNvbnNvbGUubG9nKHsgaXRlbXMsIG1ldGEsIGFkZHJlc3MsIHBhZ2VJZHgsIG1heEl0ZW1zIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPFN0YWNrIG10PVwiOFwiPlxuICAgICAgPFBhZ2luYXRpb25cbiAgICAgICAgYWRkcmVzcz17YWRkcmVzc31cbiAgICAgICAgcGFnZUlkeD17cGFnZUlkeH1cbiAgICAgICAgZW5kPXtpdGVtcy5sZW5ndGggPCBtYXhJdGVtc31cbiAgICAgICAgbGc9e3RydWV9XG4gICAgICAgIHNldFBhZ2VJZHg9e3NldFBhZ2VJZHh9XG4gICAgICAvPlxuXG4gICAgICA8Q2VudGVyPlxuICAgICAgICA8Qm94IG10PVwiNFwiIG1iPVwiNFwiIHc9e1wiMTAwJVwifSBiZz17Ymd9PlxuICAgICAgICAgIHtpc0xvYWRpbmcgPyAoXG4gICAgICAgICAgICA8Qm94IGg9XCI3MnB4XCI+XG4gICAgICAgICAgICAgIDxDZW50ZXI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImxnXCIgbXQ9XCIxMXB4XCIgLz5cbiAgICAgICAgICAgICAgPC9DZW50ZXI+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFdyYXAgZGlyZWN0aW9uPXtcImhvcml6b250YWxcIn0gc3BhY2luZz1cIjVcIiBqdXN0aWZ5PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgIHtpdGVtcyAmJiBpdGVtcy5tYXAoKGlkKSA9PiA8TkZUTGFyZ2UgaWQ9e2lkfSBrZXk9e2lkfSAvPil9XG4gICAgICAgICAgICA8L1dyYXA+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0NlbnRlcj5cblxuICAgICAgPFBhZ2luYXRpb25cbiAgICAgICAgYWRkcmVzcz17YWRkcmVzc31cbiAgICAgICAgcGFnZUlkeD17cGFnZUlkeH1cbiAgICAgICAgZW5kPXtpdGVtcy5sZW5ndGggPCBtYXhJdGVtc31cbiAgICAgICAgbGc9e3RydWV9XG4gICAgICAgIHNldFBhZ2VJZHg9e3NldFBhZ2VJZHh9XG4gICAgICAvPlxuXG4gICAgICB7Lyoge21ldGEgPyAoXG4gICAgICAgIDxOZnRIaXN0b3J5IHRyYW5zYWN0aW9ucz17bWV0YS50cmFuc2FjdGlvbnN9IHNob3dUaHVtYj17dHJ1ZX0gLz5cbiAgICAgICkgOiBudWxsfSAqL31cbiAgICA8L1N0YWNrPlxuICApO1xufTtcblxuY29uc3QgUGFnaW5hdGlvbiA9ICh7IGFkZHJlc3MsIHBhZ2VJZHgsIHNldFBhZ2VJZHgsIGVuZCwgbGcgPSBmYWxzZSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFRleHQgZm9udFNpemU9XCIxMXB4XCIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICA8QUNDIHNob3J0PXt0cnVlfT57YWRkcmVzc308L0FDQz5cblxuICAgICAgPEljb25CdXR0b25cbiAgICAgICAgbWw9XCIyXCJcbiAgICAgICAgc2l6ZT1cInhzXCJcbiAgICAgICAgaWNvbj17PENoZXZyb25MZWZ0SWNvbiAvPn1cbiAgICAgICAgdmFyaWFudD1cInNvbGlkXCJcbiAgICAgICAgZGlzYWJsZWQ9e3BhZ2VJZHggLSAxIDwgMH1cbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIHNldFBhZ2VJZHgocGFnZUlkeCAtIDEpO1xuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAgPEljb25CdXR0b25cbiAgICAgICAgbWw9XCIyXCJcbiAgICAgICAgc2l6ZT1cInhzXCJcbiAgICAgICAgaWNvbj17PENoZXZyb25SaWdodEljb24gLz59XG4gICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lXCJcbiAgICAgICAgZGlzYWJsZWQ9e2VuZH1cbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIHNldFBhZ2VJZHgocGFnZUlkeCArIDEpO1xuICAgICAgICB9fVxuICAgICAgLz5cbiAgICA8L1RleHQ+XG4gICk7XG59O1xuIl19
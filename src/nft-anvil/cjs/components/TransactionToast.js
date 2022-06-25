"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionToast = exports.TransactionFailed = void 0;

var _react = _interopRequireWildcard(require("react"));

var TransactionId = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/transactionid.js"));

var _index = require("../index.js");

var _Code = require("./Code");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const TransactionToast = props => {
  const dispatch = (0, _index.useAnvilDispatch)();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, props.title), props.tokenId ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Code.NFTA, null, props.tokenId)) : null, props.transactionId ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: "10px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Code.TX, null, TransactionId.toText(props.transactionId))) : null);
};

exports.TransactionToast = TransactionToast;

const TransactionFailed = _ref => {
  let {
    title,
    message
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, title), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: "10px"
    }
  }, message));
};

exports.TransactionFailed = TransactionFailed;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1RyYW5zYWN0aW9uVG9hc3QuanMiXSwibmFtZXMiOlsiVHJhbnNhY3Rpb25Ub2FzdCIsInByb3BzIiwiZGlzcGF0Y2giLCJ0aXRsZSIsInRva2VuSWQiLCJmb250U2l6ZSIsInRyYW5zYWN0aW9uSWQiLCJUcmFuc2FjdGlvbklkIiwidG9UZXh0IiwiVHJhbnNhY3Rpb25GYWlsZWQiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBSUE7Ozs7OztBQUVPLE1BQU1BLGdCQUFnQixHQUFJQyxLQUFELElBQVc7QUFDekMsUUFBTUMsUUFBUSxHQUFHLDhCQUFqQjtBQUVBLHNCQUNFLHVEQU9FLDBDQUFNRCxLQUFLLENBQUNFLEtBQVosQ0FQRixFQVFHRixLQUFLLENBQUNHLE9BQU4sZ0JBQ0M7QUFBSyxJQUFBLEtBQUssRUFBRTtBQUFFQyxNQUFBQSxRQUFRLEVBQUU7QUFBWjtBQUFaLGtCQUNFLDZCQUFDLFVBQUQsUUFBT0osS0FBSyxDQUFDRyxPQUFiLENBREYsQ0FERCxHQUlHLElBWk4sRUFhR0gsS0FBSyxDQUFDSyxhQUFOLGdCQUNDO0FBQUssSUFBQSxLQUFLLEVBQUU7QUFBRUQsTUFBQUEsUUFBUSxFQUFFO0FBQVo7QUFBWixrQkFDRSw2QkFBQyxRQUFELFFBQUtFLGFBQWEsQ0FBQ0MsTUFBZCxDQUFxQlAsS0FBSyxDQUFDSyxhQUEzQixDQUFMLENBREYsQ0FERCxHQUlHLElBakJOLENBREY7QUFxQkQsQ0F4Qk07Ozs7QUEwQkEsTUFBTUcsaUJBQWlCLEdBQUcsUUFBd0I7QUFBQSxNQUF2QjtBQUFFTixJQUFBQSxLQUFGO0FBQVNPLElBQUFBO0FBQVQsR0FBdUI7QUFDdkQsc0JBQ0UsdURBQ0UsMENBQU1QLEtBQU4sQ0FERixlQUVFO0FBQUssSUFBQSxLQUFLLEVBQUU7QUFBRUUsTUFBQUEsUUFBUSxFQUFFO0FBQVo7QUFBWixLQUFtQ0ssT0FBbkMsQ0FGRixDQURGO0FBTUQsQ0FQTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCAqIGFzIFRyYW5zYWN0aW9uSWQgZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL3RyYW5zYWN0aW9uaWQuanNcIjtcbmltcG9ydCB7XG4gIHVzZUFudmlsU2VsZWN0b3IgYXMgdXNlU2VsZWN0b3IsXG4gIHVzZUFudmlsRGlzcGF0Y2ggYXMgdXNlRGlzcGF0Y2gsXG59IGZyb20gXCIuLi9pbmRleC5qc1wiO1xuaW1wb3J0IHsgVFgsIEFDQywgTkZUQSwgSEFTSCB9IGZyb20gXCIuL0NvZGVcIjtcblxuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uVG9hc3QgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgIC8vIG9uQ2xpY2s9eygpID0+IHtcbiAgICAvLyAgIGlmIChwcm9wcy50b2tlbklkKSBkaXNwYXRjaChwdXNoKHByb3BzLnRva2VuSWQpKTtcbiAgICAvLyAgIGVsc2UgaWYgKHByb3BzLnRyYW5zYWN0aW9uSWQpXG4gICAgLy8gICAgIGRpc3BhdGNoKHB1c2goXCIvXCIgKyBUcmFuc2FjdGlvbklkLnRvVGV4dChwcm9wcy50cmFuc2FjdGlvbklkKSkpO1xuICAgIC8vIH19XG4gICAgPlxuICAgICAgPGRpdj57cHJvcHMudGl0bGV9PC9kaXY+XG4gICAgICB7cHJvcHMudG9rZW5JZCA/IChcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogXCIxMHB4XCIgfX0+XG4gICAgICAgICAgPE5GVEE+e3Byb3BzLnRva2VuSWR9PC9ORlRBPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuICAgICAge3Byb3BzLnRyYW5zYWN0aW9uSWQgPyAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IFwiMTBweFwiIH19PlxuICAgICAgICAgIDxUWD57VHJhbnNhY3Rpb25JZC50b1RleHQocHJvcHMudHJhbnNhY3Rpb25JZCl9PC9UWD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBUcmFuc2FjdGlvbkZhaWxlZCA9ICh7IHRpdGxlLCBtZXNzYWdlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdj57dGl0bGV9PC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiBcIjEwcHhcIiB9fT57bWVzc2FnZX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=
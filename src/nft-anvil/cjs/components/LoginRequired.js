"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginRequired = LoginRequired;

var _react = _interopRequireWildcard(require("react"));

var _user = require("../reducers/user");

var _index = require("../index.js");

var _react2 = require("@chakra-ui/react");

var _dfinity = _interopRequireDefault(require("../assets/dfinity.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function LoginRequired(_ref) {
  let {
    label,
    children
  } = _ref;
  const anonymous = (0, _index.useAnvilSelector)(state => state.user.anonymous);
  const dispatch = (0, _index.useAnvilDispatch)();
  return anonymous ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    variant: "solid",
    rightIcon: /*#__PURE__*/_react.default.createElement("img", {
      alt: "",
      src: _dfinity.default,
      style: {
        width: "40px",
        height: "40px"
      }
    }),
    mt: 4,
    w: "100%",
    colorScheme: "teal",
    size: "lg",
    onClick: () => dispatch((0, _user.login)())
  }, label || "Authenticate")) : children;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0xvZ2luUmVxdWlyZWQuanMiXSwibmFtZXMiOlsiTG9naW5SZXF1aXJlZCIsImxhYmVsIiwiY2hpbGRyZW4iLCJhbm9ueW1vdXMiLCJzdGF0ZSIsInVzZXIiLCJkaXNwYXRjaCIsIkRmaW5pdHkiLCJ3aWR0aCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUlBOztBQUNBOzs7Ozs7OztBQUVPLFNBQVNBLGFBQVQsT0FBNEM7QUFBQSxNQUFyQjtBQUFFQyxJQUFBQSxLQUFGO0FBQVNDLElBQUFBO0FBQVQsR0FBcUI7QUFDakQsUUFBTUMsU0FBUyxHQUFHLDZCQUFhQyxLQUFELElBQVdBLEtBQUssQ0FBQ0MsSUFBTixDQUFXRixTQUFsQyxDQUFsQjtBQUNBLFFBQU1HLFFBQVEsR0FBRyw4QkFBakI7QUFFQSxTQUFPSCxTQUFTLGdCQUNkLHlFQUNFLDZCQUFDLGNBQUQ7QUFDRSxJQUFBLE9BQU8sRUFBQyxPQURWO0FBRUUsSUFBQSxTQUFTLGVBQ1A7QUFBSyxNQUFBLEdBQUcsRUFBQyxFQUFUO0FBQVksTUFBQSxHQUFHLEVBQUVJLGdCQUFqQjtBQUEwQixNQUFBLEtBQUssRUFBRTtBQUFFQyxRQUFBQSxLQUFLLEVBQUUsTUFBVDtBQUFpQkMsUUFBQUEsTUFBTSxFQUFFO0FBQXpCO0FBQWpDLE1BSEo7QUFLRSxJQUFBLEVBQUUsRUFBRSxDQUxOO0FBTUUsSUFBQSxDQUFDLEVBQUUsTUFOTDtBQU9FLElBQUEsV0FBVyxFQUFDLE1BUGQ7QUFRRSxJQUFBLElBQUksRUFBQyxJQVJQO0FBU0UsSUFBQSxPQUFPLEVBQUUsTUFBTUgsUUFBUSxDQUFDLGtCQUFEO0FBVHpCLEtBV0dMLEtBQUssSUFBSSxjQVhaLENBREYsQ0FEYyxHQWlCZEMsUUFqQkY7QUFtQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBsb2dpbiB9IGZyb20gXCIuLi9yZWR1Y2Vycy91c2VyXCI7XG5pbXBvcnQge1xuICB1c2VBbnZpbFNlbGVjdG9yIGFzIHVzZVNlbGVjdG9yLFxuICB1c2VBbnZpbERpc3BhdGNoIGFzIHVzZURpc3BhdGNoLFxufSBmcm9tIFwiLi4vaW5kZXguanNcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5pbXBvcnQgRGZpbml0eSBmcm9tIFwiLi4vYXNzZXRzL2RmaW5pdHkuc3ZnXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBMb2dpblJlcXVpcmVkKHsgbGFiZWwsIGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgYW5vbnltb3VzID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS51c2VyLmFub255bW91cyk7XG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuICByZXR1cm4gYW5vbnltb3VzID8gKFxuICAgIDw+XG4gICAgICA8QnV0dG9uXG4gICAgICAgIHZhcmlhbnQ9XCJzb2xpZFwiXG4gICAgICAgIHJpZ2h0SWNvbj17XG4gICAgICAgICAgPGltZyBhbHQ9XCJcIiBzcmM9e0RmaW5pdHl9IHN0eWxlPXt7IHdpZHRoOiBcIjQwcHhcIiwgaGVpZ2h0OiBcIjQwcHhcIiB9fSAvPlxuICAgICAgICB9XG4gICAgICAgIG10PXs0fVxuICAgICAgICB3PXtcIjEwMCVcIn1cbiAgICAgICAgY29sb3JTY2hlbWU9XCJ0ZWFsXCJcbiAgICAgICAgc2l6ZT1cImxnXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gZGlzcGF0Y2gobG9naW4oKSl9XG4gICAgICA+XG4gICAgICAgIHtsYWJlbCB8fCBcIkF1dGhlbnRpY2F0ZVwifVxuICAgICAgPC9CdXR0b24+XG4gICAgPC8+XG4gICkgOiAoXG4gICAgY2hpbGRyZW5cbiAgKTtcbn1cbiJdfQ==
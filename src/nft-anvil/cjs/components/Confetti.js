"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Conf;

var _react = _interopRequireDefault(require("react"));

var _useWindowSize = _interopRequireDefault(require("react-use/lib/useWindowSize"));

var _reactConfetti = _interopRequireDefault(require("react-confetti"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Conf() {
  const {
    width,
    height
  } = (0, _useWindowSize.default)();
  return /*#__PURE__*/_react.default.createElement(_reactConfetti.default, {
    width: width,
    height: height
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0NvbmZldHRpLmpzIl0sIm5hbWVzIjpbIkNvbmYiLCJ3aWR0aCIsImhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRWUsU0FBU0EsSUFBVCxHQUFnQjtBQUM3QixRQUFNO0FBQUVDLElBQUFBLEtBQUY7QUFBU0MsSUFBQUE7QUFBVCxNQUFvQiw2QkFBMUI7QUFDQSxzQkFBTyw2QkFBQyxzQkFBRDtBQUFVLElBQUEsS0FBSyxFQUFFRCxLQUFqQjtBQUF3QixJQUFBLE1BQU0sRUFBRUM7QUFBaEMsSUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHVzZVdpbmRvd1NpemUgZnJvbSBcInJlYWN0LXVzZS9saWIvdXNlV2luZG93U2l6ZVwiO1xuaW1wb3J0IENvbmZldHRpIGZyb20gXCJyZWFjdC1jb25mZXR0aVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb25mKCkge1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHVzZVdpbmRvd1NpemUoKTtcbiAgcmV0dXJuIDxDb25mZXR0aSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSAvPjtcbn1cbiJdfQ==
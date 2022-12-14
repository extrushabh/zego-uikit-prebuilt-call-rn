"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ZegoMoreButton;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ZegoMoreButton(props) {
  const {
    onPress
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: require('./resources/white_button_more.png')
  })));
}
//# sourceMappingURL=ZegoMoreButton.js.map
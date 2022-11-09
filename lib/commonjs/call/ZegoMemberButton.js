"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ZegoMemberButton;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ZegoMemberButton(props) {
  const {
    onPressed
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPressed
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: require('./resources/white_button_members.png')
  })));
}
//# sourceMappingURL=ZegoMemberButton.js.map
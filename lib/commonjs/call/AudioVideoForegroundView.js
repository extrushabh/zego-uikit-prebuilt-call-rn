"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AudioVideoForegroundView;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _zegoUikitRn = require("@zegocloud/zego-uikit-rn");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function AudioVideoForegroundView(props) {
  const {
    userInfo,
    showUserNameOnView,
    showCameraStateOnView,
    showMicrophoneStateOnView
  } = props;
  const {
    userID = '',
    userName = ''
  } = userInfo;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.foregroundViewContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.bottomContainer
  }, showUserNameOnView ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.nameLabelContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.nameLabel
  }, userName)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null), showCameraStateOnView ? /*#__PURE__*/_react.default.createElement(_zegoUikitRn.ZegoCameraStateIcon, {
    userID: userID,
    style: styles.deviceIcon
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null), showMicrophoneStateOnView ? /*#__PURE__*/_react.default.createElement(_zegoUikitRn.ZegoMicrophoneStateIcon, {
    userID: userID,
    style: styles.deviceIcon
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)));
}
const styles = _reactNative.StyleSheet.create({
  foregroundViewContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#2A2A2A',
    opacity: 0.5,
    position: 'absolute',
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 6,
    bottom: 5,
    right: 5
  },
  nameLabelContainer: {
    alignSelf: 'center'
  },
  nameLabel: {
    color: '#FFFFFF',
    fontSize: 12
  },
  deviceIcon: {
    flex: 1,
    position: 'absolute'
  }
});
//# sourceMappingURL=AudioVideoForegroundView.js.map
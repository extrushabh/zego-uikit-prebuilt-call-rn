"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ZegoCallMemberList;
var _react = _interopRequireDefault(require("react"));
var _zegoUikitRn = require("@zegocloud/zego-uikit-rn");
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ZegoCallMemberList(props) {
  const {
    showMicrophoneState,
    showCameraState,
    itemBuilder,
    onCloseCallMemberList
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: onCloseCallMemberList
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.downArrowIcon,
    source: require('./resources/white_button_back.png')
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, "Member")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.divide
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.memberListContainer
  }, /*#__PURE__*/_react.default.createElement(_zegoUikitRn.ZegoMemberList, {
    showMicrophoneState: showMicrophoneState,
    showCameraState: showCameraState,
    itemBuilder: itemBuilder
  })));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'rgba(34,34,34,0.8)',
    width: '100%',
    height: 571,
    zIndex: 4,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 49
  },
  downArrowIcon: {
    marginLeft: 11.5,
    marginRight: 5
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF'
  },
  divide: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.15
  },
  memberListContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 14
  }
});
//# sourceMappingURL=ZegoCallMemberList.js.map
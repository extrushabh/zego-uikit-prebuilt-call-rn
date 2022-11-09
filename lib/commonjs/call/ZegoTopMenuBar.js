"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ZegoTopBar;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ZegoMenuBarButtonName = _interopRequireDefault(require("./ZegoMenuBarButtonName"));
var _ZegoMemberButton = _interopRequireDefault(require("./ZegoMemberButton"));
var _zegoUikitRn = require("@zegocloud/zego-uikit-rn");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ZegoTopBar(props) {
  const {
    menuTitle,
    menuBarButtonsMaxCount,
    menuBarButtons,
    menuBarExtendedButtons,
    onHangUp,
    onHangUpConfirmation,
    onOpenCallMemberList,
    turnOnCameraWhenJoining,
    turnOnMicrophoneWhenJoining,
    useSpeakerWhenJoining
  } = props;
  const getButtonByButtonIndex = buttonIndex => {
    switch (buttonIndex) {
      case _ZegoMenuBarButtonName.default.toggleCameraButton:
        return /*#__PURE__*/_react.default.createElement(_zegoUikitRn.ZegoToggleCameraButton, {
          key: 1,
          isOn: turnOnCameraWhenJoining
        });
      case _ZegoMenuBarButtonName.default.toggleMicrophoneButton:
        return /*#__PURE__*/_react.default.createElement(_zegoUikitRn.ZegoToggleMicrophoneButton, {
          key: 2,
          isOn: turnOnMicrophoneWhenJoining
        });
      case _ZegoMenuBarButtonName.default.hangUpButton:
        return /*#__PURE__*/_react.default.createElement(_zegoUikitRn.ZegoLeaveButton, {
          key: 0,
          onLeaveConfirmation: onHangUpConfirmation,
          onPressed: onHangUp
        });
      case _ZegoMenuBarButtonName.default.switchAudioOutputButton:
        return /*#__PURE__*/_react.default.createElement(_zegoUikitRn.ZegoSwitchAudioOutputButton, {
          key: 4,
          useSpeaker: useSpeakerWhenJoining
        });
      case _ZegoMenuBarButtonName.default.switchCameraButton:
        return /*#__PURE__*/_react.default.createElement(_zegoUikitRn.ZegoSwitchCameraButton, {
          key: 3
        });
      case _ZegoMenuBarButtonName.default.showMemberListButton:
        return /*#__PURE__*/_react.default.createElement(_ZegoMemberButton.default, {
          key: 5,
          onPressed: onOpenCallMemberList
        });
    }
  };
  const getDisplayButtons = () => {
    let allButtons = [];
    menuBarButtons.slice(0, menuBarButtonsMaxCount).forEach(buttonIndex => {
      allButtons.push(getButtonByButtonIndex(buttonIndex));
    });
    allButtons = allButtons.concat(menuBarExtendedButtons);
    return allButtons;
  };
  const getButtonStyle = () => {
    return styles.customIconContainer;
  };
  const allButtons = getDisplayButtons();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.topBarContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.left
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, null, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    style: styles.downArrowIcon,
    source: require('./resources/white_button_arrow.png')
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.title
  }, menuTitle)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.right
  }, allButtons.map((button, index) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: index,
    style: getButtonStyle()
  }, button))));
}
const styles = _reactNative.StyleSheet.create({
  topBarContainer: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    top: 35,
    height: 44,
    zIndex: 3,
    justifyContent: 'space-between',
    paddingLeft: 3.5,
    paddingRight: 13.5
  },
  left: {
    opacity: 0,
    flexDirection: 'row',
    alignItems: "center"
  },
  right: {
    flexDirection: 'row',
    alignItems: "center"
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 4
  },
  customIconContainer: {
    marginLeft: 10
  }
});
//# sourceMappingURL=ZegoTopMenuBar.js.map
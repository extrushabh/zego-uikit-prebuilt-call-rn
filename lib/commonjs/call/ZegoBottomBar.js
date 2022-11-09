"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ZegoBottomBar;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _zegoUikitRn = require("@zegocloud/zego-uikit-rn");
var _ZegoMoreButton = _interopRequireDefault(require("./ZegoMoreButton"));
var _ZegoMenuBarButtonName = _interopRequireDefault(require("./ZegoMenuBarButtonName"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ZegoBottomBar(props) {
  const {
    menuBarButtonsMaxCount = 5,
    menuBarButtons = [],
    menuBarExtendedButtons = [],
    onHangUp,
    onHangUpConfirmation,
    turnOnCameraWhenJoining,
    turnOnMicrophoneWhenJoining,
    useSpeakerWhenJoining,
    onMorePress
  } = props;
  const [isNormalStyle, setIsNormalStyle] = (0, _react.useState)(true);
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
    }
  };
  const getDisplayButtons = () => {
    var maxCount = menuBarButtonsMaxCount < 1 ? 1 : menuBarButtonsMaxCount;
    maxCount = maxCount > 5 ? 5 : maxCount;
    const needMoreButton = menuBarButtons.length + menuBarExtendedButtons.length > maxCount;
    const firstLevelButtons = [];
    const secondLevelButtons = [];
    menuBarButtons.forEach(buttonIndex => {
      const limitCount = needMoreButton ? maxCount - 1 : maxCount;
      if (firstLevelButtons.length < limitCount) {
        firstLevelButtons.push(getButtonByButtonIndex(buttonIndex));
      } else {
        secondLevelButtons.push(getButtonByButtonIndex(buttonIndex));
      }
    });
    menuBarExtendedButtons.forEach(button => {
      const limitCount = needMoreButton ? maxCount - 1 : maxCount;
      if (firstLevelButtons.length < limitCount) {
        firstLevelButtons.push(button);
      } else {
        secondLevelButtons.push(button);
      }
    });
    if (needMoreButton) {
      firstLevelButtons.push( /*#__PURE__*/_react.default.createElement(_ZegoMoreButton.default, {
        onPress: () => {
          setIsNormalStyle(false);
          if (onMorePress) onMorePress();
        }
      }));
    }
    return {
      firstLevelButtons: firstLevelButtons,
      secondLevelButtons: secondLevelButtons
    };
  };
  const getButtonStyle = () => {
    const btnStyles = [styles.ctrlBtn1, styles.ctrlBtn2, styles.ctrlBtn3, styles.ctrlBtn4, styles.ctrlBtn5];
    return btnStyles[firstLevelButtons.length - 1];
  };
  var allButtons = getDisplayButtons();
  var firstLevelButtons = allButtons['firstLevelButtons'];
  var secondLevelButtons = allButtons['secondLevelButtons'];
  return isNormalStyle ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.normalBar
  }, firstLevelButtons.map((button, index) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: index,
    style: getButtonStyle()
  }, button))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.popupContainer, styles.fillParent]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.popupMask, styles.fillParent]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: styles.fillParent,
    onPress: () => {
      setIsNormalStyle(true);
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.popupBar
  }, secondLevelButtons.map((button, index) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: index,
    style: {
      marginBottom: 20,
      marginRight: 32 / 2,
      marginLeft: 32 / 2
    }
  }, button))));
}
const styles = _reactNative.StyleSheet.create({
  normalBar: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
    width: '100%',
    bottom: 0,
    height: 50,
    zIndex: 2
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  fillParent: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  popupMask: {
    backgroundColor: '#262A2D',
    opacity: 0.3
  },
  popupBar: {
    flex: 1,
    paddingTop: 27,
    paddingBottom: 3,
    paddingLeft: 28.5,
    paddingRight: 28.5,
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    bottom: 0,
    zIndex: 2,
    backgroundColor: '#262A2D'
  },
  ctrlBtn1: {
    marginLeft: 0,
    marginRight: 0
  },
  ctrlBtn2: {
    marginLeft: 79 / 2,
    marginRight: 79 / 2
  },
  ctrlBtn3: {
    marginLeft: 59.5 / 2,
    marginRight: 59.5 / 2
  },
  ctrlBtn4: {
    marginLeft: 37 / 2,
    marginRight: 37 / 2
  },
  ctrlBtn5: {
    marginLeft: 23 / 2,
    marginRight: 23 / 2
  }
});
//# sourceMappingURL=ZegoBottomBar.js.map
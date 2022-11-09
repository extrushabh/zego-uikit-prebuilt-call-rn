"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ZegoUIKitPrebuiltCall;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _zegoUikitRn = _interopRequireWildcard(require("@zegocloud/zego-uikit-rn"));
var _AudioVideoForegroundView = _interopRequireDefault(require("./AudioVideoForegroundView"));
var _ZegoBottomBar = _interopRequireDefault(require("./ZegoBottomBar"));
var _ZegoTopMenuBar = _interopRequireDefault(require("./ZegoTopMenuBar"));
var _ZegoCallMemberList = _interopRequireDefault(require("./ZegoCallMemberList"));
var _ZegoMenuBarButtonName = _interopRequireDefault(require("./ZegoMenuBarButtonName"));
var _ZegoMenuBarStyle = _interopRequireDefault(require("./ZegoMenuBarStyle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ZegoUIKitPrebuiltCall(props) {
  const {
    appID,
    appSign,
    userID,
    userName,
    callID,
    config,
    token,
    onRequireNewToken
  } = props;
  const {
    audioVideoViewConfig = {},
    turnOnCameraWhenJoining = true,
    turnOnMicrophoneWhenJoining = true,
    useSpeakerWhenJoining = true,
    bottomMenuBarConfig = {},
    topMenuBarConfig = {},
    memberListConfig = {},
    layout = {},
    hangUpConfirmInfo,
    // {title: '', cancelButtonName: '', confirmButtonName: ''}

    onHangUp,
    onHangUpConfirmation,
    onOnlySelfInRoom
  } = config;
  const {
    showMicrophoneStateOnView = true,
    showCameraStateOnView = false,
    showUserNameOnView = true,
    showSoundWavesInAudioMode = true,
    useVideoViewAspectFill = true,
    foregroundBuilder
  } = audioVideoViewConfig;
  const {
    buttons = [_ZegoMenuBarButtonName.default.toggleCameraButton, _ZegoMenuBarButtonName.default.switchCameraButton, _ZegoMenuBarButtonName.default.hangUpButton, _ZegoMenuBarButtonName.default.toggleMicrophoneButton, _ZegoMenuBarButtonName.default.switchAudioOutputButton],
    maxCount = 5,
    extendButtons = [],
    hideAutomatically = true,
    hideByClick = true,
    style = _ZegoMenuBarStyle.default.light
  } = bottomMenuBarConfig;
  const {
    isVisible = true,
    title: topTitle = userName || '',
    buttons: topButtons = [],
    maxCount: topMaxCount = 3,
    extendButtons: topExtendButtons = [],
    hideAutomatically: topHideAutomatically = true,
    hideByClick: topHideByClick = true,
    style: topStyle = _ZegoMenuBarStyle.default.light
  } = topMenuBarConfig;
  const {
    showMicrophoneState = true,
    showCameraState = true,
    itemBuilder
  } = memberListConfig;
  const [isMenubarVisable, setIsMenubarVidable] = (0, _react.useState)(true);
  const [isTopMenubarVisable, setTopIsMenubarVidable] = (0, _react.useState)(true);
  const [isCallMemberListVisable, setIsCallMemberListVisable] = (0, _react.useState)(false);
  var hideCountdown = 5;
  var hideCountdownOnTopMenu = 5;
  const onFullPageTouch = () => {
    hideCountdown = 5;
    hideCountdownOnTopMenu = 5;
    if (isMenubarVisable) {
      if (hideByClick) {
        setIsMenubarVidable(false);
        setIsCallMemberListVisable(false);
      }
    } else {
      setIsMenubarVidable(true);
    }
    if (isTopMenubarVisable) {
      if (topHideByClick) {
        setTopIsMenubarVidable(false);
        setIsCallMemberListVisable(false);
      }
    } else {
      setTopIsMenubarVidable(true);
    }
  };
  const grantPermissions = async callback => {
    // Android: Dynamically obtaining device permissions
    if (Platform.OS === 'android') {
      // Check if permission granted
      let grantedAudio = _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      let grantedCamera = _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.CAMERA);
      const ungrantedPermissions = [];
      try {
        const isAudioGranted = await grantedAudio;
        const isVideoGranted = await grantedCamera;
        if (!isAudioGranted) {
          ungrantedPermissions.push(_reactNative.PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        }
        if (!isVideoGranted) {
          ungrantedPermissions.push(_reactNative.PermissionsAndroid.PERMISSIONS.CAMERA);
        }
      } catch (error) {
        ungrantedPermissions.push(_reactNative.PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, _reactNative.PermissionsAndroid.PERMISSIONS.CAMERA);
      }
      // If not, request it
      return _reactNative.PermissionsAndroid.requestMultiple(ungrantedPermissions).then(data => {
        console.warn('requestMultiple', data);
        if (callback) {
          callback();
        }
      });
    } else if (callback) {
      callback();
    }
  };
  // Default operation for click the leave button
  const showLeaveAlert = () => {
    return new Promise((resolve, reject) => {
      if (hangUpConfirmInfo) {
        const {
          title = "Leave the call",
          message = "Are you sure to leave the call?",
          cancelButtonName = "Cancel",
          confirmButtonName = "Confirm"
        } = hangUpConfirmInfo;
        _reactNative.Alert.alert(title, message, [{
          text: cancelButtonName,
          onPress: () => {
            reject();
          },
          style: "cancel"
        }, {
          text: confirmButtonName,
          onPress: () => {
            resolve();
          }
        }], {
          cancelable: false
        });
      } else {
        resolve();
      }
    });
  };
  (0, _react.useEffect)(() => {
    const callbackID = 'ZegoUIKitPrebuiltCall' + String(Math.floor(Math.random() * 10000));
    _zegoUikitRn.default.onOnlySelfInRoom(callbackID, () => {
      if (typeof onOnlySelfInRoom == 'function') {
        onOnlySelfInRoom();
      }
    });
    _zegoUikitRn.default.onRequireNewToken(callbackID, onRequireNewToken);
    return () => {
      _zegoUikitRn.default.onOnlySelfInRoom(callbackID);
      _zegoUikitRn.default.onRequireNewToken(callbackID);
    };
  }, []);
  (0, _react.useEffect)(() => {
    _zegoUikitRn.default.init(appID, appSign, {
      userID: userID,
      userName: userName
    }).then(() => {
      _zegoUikitRn.default.turnCameraOn('', turnOnCameraWhenJoining);
      _zegoUikitRn.default.turnMicrophoneOn('', turnOnMicrophoneWhenJoining);
      _zegoUikitRn.default.setAudioOutputToSpeaker(useSpeakerWhenJoining);
      grantPermissions(() => {
        if (appSign) {
          _zegoUikitRn.default.joinRoom(callID);
        } else {
          _zegoUikitRn.default.joinRoom(callID, token || onRequireNewToken());
        }
      });
    });
    return () => {
      _zegoUikitRn.default.leaveRoom();
    };
  }, []);
  function useInterval(callback, delay) {
    const savedCallback = (0, _react.useRef)();
    (0, _react.useEffect)(() => {
      savedCallback.current = callback;
    });
    (0, _react.useEffect)(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  function onOpenCallMemberList() {
    setIsCallMemberListVisable(true);
  }
  function onCloseCallMemberList() {
    setIsCallMemberListVisable(false);
  }
  useInterval(() => {
    hideCountdown--;
    if (hideCountdown <= 0) {
      hideCountdown = 5;
      if (hideAutomatically) {
        setIsMenubarVidable(false);
      }
    }
  }, 1000);
  useInterval(() => {
    hideCountdownOnTopMenu--;
    if (hideCountdownOnTopMenu <= 0) {
      hideCountdownOnTopMenu = 5;
      if (topHideAutomatically) {
        setTopIsMenubarVidable(false);
      }
    }
  }, 1000);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, styles.fillParent]
  }, isVisible && isTopMenubarVisable ? /*#__PURE__*/_react.default.createElement(_ZegoTopMenuBar.default, {
    menuTitle: topTitle,
    menuBarButtonsMaxCount: topMaxCount,
    menuBarButtons: topButtons,
    menuBarExtendedButtons: topExtendButtons,
    onHangUp: onHangUp,
    onHangUpConfirmation: onHangUpConfirmation ? onHangUpConfirmation : showLeaveAlert,
    turnOnCameraWhenJoining: turnOnCameraWhenJoining,
    turnOnMicrophoneWhenJoining: turnOnMicrophoneWhenJoining,
    useSpeakerWhenJoining: useSpeakerWhenJoining,
    onOpenCallMemberList: onOpenCallMemberList
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.fillParent,
    pointerEvents: "auto",
    onTouchStart: onFullPageTouch
  }, /*#__PURE__*/_react.default.createElement(_zegoUikitRn.ZegoAudioVideoContainer, {
    style: [styles.audioVideoView, styles.fillParent],
    audioVideoConfig: {
      showSoundWavesInAudioMode: showSoundWavesInAudioMode,
      useVideoViewAspectFill: useVideoViewAspectFill
    },
    layout: layout,
    foregroundBuilder: foregroundBuilder ? foregroundBuilder : _ref => {
      let {
        userInfo
      } = _ref;
      return /*#__PURE__*/_react.default.createElement(_AudioVideoForegroundView.default, {
        userInfo: userInfo,
        showMicrophoneStateOnView: showMicrophoneStateOnView,
        showCameraStateOnView: showCameraStateOnView,
        showUserNameOnView: showUserNameOnView
      });
    }
  })), isMenubarVisable ? /*#__PURE__*/_react.default.createElement(_ZegoBottomBar.default, {
    menuBarButtonsMaxCount: maxCount,
    menuBarButtons: buttons,
    menuBarExtendedButtons: extendButtons,
    onHangUp: onHangUp,
    onHangUpConfirmation: onHangUpConfirmation ? onHangUpConfirmation : showLeaveAlert,
    turnOnCameraWhenJoining: turnOnCameraWhenJoining,
    turnOnMicrophoneWhenJoining: turnOnMicrophoneWhenJoining,
    useSpeakerWhenJoining: useSpeakerWhenJoining,
    onMorePress: () => {
      hideCountdown = 5;
    }
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null), isCallMemberListVisable ? /*#__PURE__*/_react.default.createElement(_ZegoCallMemberList.default, {
    showMicrophoneState: showMicrophoneState,
    showCameraState: showCameraState,
    itemBuilder: itemBuilder,
    onCloseCallMemberList: onCloseCallMemberList
  }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0
  },
  fillParent: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  audioVideoView: {
    flex: 1,
    zIndex: 2,
    right: 0,
    top: 0
  }
});
//# sourceMappingURL=index.js.map
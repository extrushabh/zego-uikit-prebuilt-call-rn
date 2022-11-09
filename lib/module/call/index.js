import React, { useEffect, useState, useRef } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import { StyleSheet, View } from 'react-native';
import ZegoUIKit, { ZegoAudioVideoContainer } from '@zegocloud/zego-uikit-rn';
import AudioVideoForegroundView from './AudioVideoForegroundView';
import ZegoBottomBar from './ZegoBottomBar';
import ZegoTopMenuBar from './ZegoTopMenuBar';
import ZegoCallMemberList from './ZegoCallMemberList';
import ZegoMenuBarButtonName from './ZegoMenuBarButtonName';
import ZegoMenuBarStyle from './ZegoMenuBarStyle';
export default function ZegoUIKitPrebuiltCall(props) {
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
    buttons = [ZegoMenuBarButtonName.toggleCameraButton, ZegoMenuBarButtonName.switchCameraButton, ZegoMenuBarButtonName.hangUpButton, ZegoMenuBarButtonName.toggleMicrophoneButton, ZegoMenuBarButtonName.switchAudioOutputButton],
    maxCount = 5,
    extendButtons = [],
    hideAutomatically = true,
    hideByClick = true,
    style = ZegoMenuBarStyle.light
  } = bottomMenuBarConfig;
  const {
    isVisible = true,
    title: topTitle = userName || '',
    buttons: topButtons = [],
    maxCount: topMaxCount = 3,
    extendButtons: topExtendButtons = [],
    hideAutomatically: topHideAutomatically = true,
    hideByClick: topHideByClick = true,
    style: topStyle = ZegoMenuBarStyle.light
  } = topMenuBarConfig;
  const {
    showMicrophoneState = true,
    showCameraState = true,
    itemBuilder
  } = memberListConfig;
  const [isMenubarVisable, setIsMenubarVidable] = useState(true);
  const [isTopMenubarVisable, setTopIsMenubarVidable] = useState(true);
  const [isCallMemberListVisable, setIsCallMemberListVisable] = useState(false);
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
      let grantedAudio = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      let grantedCamera = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      const ungrantedPermissions = [];
      try {
        const isAudioGranted = await grantedAudio;
        const isVideoGranted = await grantedCamera;
        if (!isAudioGranted) {
          ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        }
        if (!isVideoGranted) {
          ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
        }
      } catch (error) {
        ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.CAMERA);
      }
      // If not, request it
      return PermissionsAndroid.requestMultiple(ungrantedPermissions).then(data => {
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
        Alert.alert(title, message, [{
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
  useEffect(() => {
    const callbackID = 'ZegoUIKitPrebuiltCall' + String(Math.floor(Math.random() * 10000));
    ZegoUIKit.onOnlySelfInRoom(callbackID, () => {
      if (typeof onOnlySelfInRoom == 'function') {
        onOnlySelfInRoom();
      }
    });
    ZegoUIKit.onRequireNewToken(callbackID, onRequireNewToken);
    return () => {
      ZegoUIKit.onOnlySelfInRoom(callbackID);
      ZegoUIKit.onRequireNewToken(callbackID);
    };
  }, []);
  useEffect(() => {
    ZegoUIKit.init(appID, appSign, {
      userID: userID,
      userName: userName
    }).then(() => {
      ZegoUIKit.turnCameraOn('', turnOnCameraWhenJoining);
      ZegoUIKit.turnMicrophoneOn('', turnOnMicrophoneWhenJoining);
      ZegoUIKit.setAudioOutputToSpeaker(useSpeakerWhenJoining);
      grantPermissions(() => {
        if (appSign) {
          ZegoUIKit.joinRoom(callID);
        } else {
          ZegoUIKit.joinRoom(callID, token || onRequireNewToken());
        }
      });
    });
    return () => {
      ZegoUIKit.leaveRoom();
    };
  }, []);
  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    });
    useEffect(() => {
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
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, styles.fillParent]
  }, isVisible && isTopMenubarVisable ? /*#__PURE__*/React.createElement(ZegoTopMenuBar, {
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
  }) : /*#__PURE__*/React.createElement(View, null), /*#__PURE__*/React.createElement(View, {
    style: styles.fillParent,
    pointerEvents: "auto",
    onTouchStart: onFullPageTouch
  }, /*#__PURE__*/React.createElement(ZegoAudioVideoContainer, {
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
      return /*#__PURE__*/React.createElement(AudioVideoForegroundView, {
        userInfo: userInfo,
        showMicrophoneStateOnView: showMicrophoneStateOnView,
        showCameraStateOnView: showCameraStateOnView,
        showUserNameOnView: showUserNameOnView
      });
    }
  })), isMenubarVisable ? /*#__PURE__*/React.createElement(ZegoBottomBar, {
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
  }) : /*#__PURE__*/React.createElement(View, null), isCallMemberListVisable ? /*#__PURE__*/React.createElement(ZegoCallMemberList, {
    showMicrophoneState: showMicrophoneState,
    showCameraState: showCameraState,
    itemBuilder: itemBuilder,
    onCloseCallMemberList: onCloseCallMemberList
  }) : /*#__PURE__*/React.createElement(View, null));
}
const styles = StyleSheet.create({
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
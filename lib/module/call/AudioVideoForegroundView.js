import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ZegoMicrophoneStateIcon, ZegoCameraStateIcon } from '@zegocloud/zego-uikit-rn';
export default function AudioVideoForegroundView(props) {
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
  return /*#__PURE__*/React.createElement(View, {
    style: styles.foregroundViewContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.bottomContainer
  }, showUserNameOnView ? /*#__PURE__*/React.createElement(View, {
    style: styles.nameLabelContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.nameLabel
  }, userName)) : /*#__PURE__*/React.createElement(View, null), showCameraStateOnView ? /*#__PURE__*/React.createElement(ZegoCameraStateIcon, {
    userID: userID,
    style: styles.deviceIcon
  }) : /*#__PURE__*/React.createElement(View, null), showMicrophoneStateOnView ? /*#__PURE__*/React.createElement(ZegoMicrophoneStateIcon, {
    userID: userID,
    style: styles.deviceIcon
  }) : /*#__PURE__*/React.createElement(View, null)));
}
const styles = StyleSheet.create({
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
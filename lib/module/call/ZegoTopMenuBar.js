import React, { useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback, SafeAreaView, StyleSheet } from "react-native";
import ZegoMenuBarButtonName from "./ZegoMenuBarButtonName";
import ZegoMemberButton from "./ZegoMemberButton";
import { ZegoLeaveButton, ZegoSwitchAudioOutputButton, ZegoSwitchCameraButton, ZegoToggleCameraButton, ZegoToggleMicrophoneButton } from '@zegocloud/zego-uikit-rn';
export default function ZegoTopBar(props) {
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
      case ZegoMenuBarButtonName.toggleCameraButton:
        return /*#__PURE__*/React.createElement(ZegoToggleCameraButton, {
          key: 1,
          isOn: turnOnCameraWhenJoining
        });
      case ZegoMenuBarButtonName.toggleMicrophoneButton:
        return /*#__PURE__*/React.createElement(ZegoToggleMicrophoneButton, {
          key: 2,
          isOn: turnOnMicrophoneWhenJoining
        });
      case ZegoMenuBarButtonName.hangUpButton:
        return /*#__PURE__*/React.createElement(ZegoLeaveButton, {
          key: 0,
          onLeaveConfirmation: onHangUpConfirmation,
          onPressed: onHangUp
        });
      case ZegoMenuBarButtonName.switchAudioOutputButton:
        return /*#__PURE__*/React.createElement(ZegoSwitchAudioOutputButton, {
          key: 4,
          useSpeaker: useSpeakerWhenJoining
        });
      case ZegoMenuBarButtonName.switchCameraButton:
        return /*#__PURE__*/React.createElement(ZegoSwitchCameraButton, {
          key: 3
        });
      case ZegoMenuBarButtonName.showMemberListButton:
        return /*#__PURE__*/React.createElement(ZegoMemberButton, {
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
  return /*#__PURE__*/React.createElement(View, {
    style: styles.topBarContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.left
  }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, null, /*#__PURE__*/React.createElement(Image, {
    style: styles.downArrowIcon,
    source: require('./resources/white_button_arrow.png')
  })), /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, menuTitle)), /*#__PURE__*/React.createElement(View, {
    style: styles.right
  }, allButtons.map((button, index) => /*#__PURE__*/React.createElement(View, {
    key: index,
    style: getButtonStyle()
  }, button))));
}
const styles = StyleSheet.create({
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
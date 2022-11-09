"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ONE_ON_ONE_VOICE_CALL_CONFIG = exports.ONE_ON_ONE_VIDEO_CALL_CONFIG = exports.GROUP_VOICE_CALL_CONFIG = exports.GROUP_VIDEO_CALL_CONFIG = void 0;
Object.defineProperty(exports, "ZegoMenuBarButtonName", {
  enumerable: true,
  get: function () {
    return _ZegoMenuBarButtonName.default;
  }
});
Object.defineProperty(exports, "ZegoMenuBarStyle", {
  enumerable: true,
  get: function () {
    return _ZegoMenuBarStyle.default;
  }
});
exports.default = void 0;
var _call = _interopRequireDefault(require("./call"));
var _ZegoMenuBarButtonName = _interopRequireDefault(require("./call/ZegoMenuBarButtonName"));
var _ZegoMenuBarStyle = _interopRequireDefault(require("./call/ZegoMenuBarStyle"));
var _zegoUikitRn = require("@zegocloud/zego-uikit-rn");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ONE_ON_ONE_VIDEO_CALL_CONFIG = {
  turnOnCameraWhenJoining: true,
  turnOnMicrophoneWhenJoining: true,
  useSpeakerWhenJoining: true,
  layout: {
    mode: _zegoUikitRn.ZegoLayoutMode.pictureInPicture
  },
  bottomMenuBarConfig: {
    buttons: [_ZegoMenuBarButtonName.default.toggleCameraButton, _ZegoMenuBarButtonName.default.switchCameraButton, _ZegoMenuBarButtonName.default.hangUpButton, _ZegoMenuBarButtonName.default.toggleMicrophoneButton, _ZegoMenuBarButtonName.default.switchAudioOutputButton],
    style: _ZegoMenuBarStyle.default.light
  },
  topMenuBarConfig: {
    buttons: [],
    isVisible: false
  },
  audioVideoViewConfig: {
    useVideoViewAspectFill: true
  }
};
exports.ONE_ON_ONE_VIDEO_CALL_CONFIG = ONE_ON_ONE_VIDEO_CALL_CONFIG;
const ONE_ON_ONE_VOICE_CALL_CONFIG = {
  turnOnCameraWhenJoining: false,
  turnOnMicrophoneWhenJoining: true,
  useSpeakerWhenJoining: false,
  layout: {
    mode: _zegoUikitRn.ZegoLayoutMode.pictureInPicture
  },
  bottomMenuBarConfig: {
    buttons: [_ZegoMenuBarButtonName.default.toggleMicrophoneButton, _ZegoMenuBarButtonName.default.hangUpButton, _ZegoMenuBarButtonName.default.switchAudioOutputButton],
    style: _ZegoMenuBarStyle.default.light
  },
  topMenuBarConfig: {
    buttons: [],
    isVisible: false
  },
  audioVideoViewConfig: {
    useVideoViewAspectFill: true
  }
};
exports.ONE_ON_ONE_VOICE_CALL_CONFIG = ONE_ON_ONE_VOICE_CALL_CONFIG;
const GROUP_VIDEO_CALL_CONFIG = {
  turnOnCameraWhenJoining: true,
  turnOnMicrophoneWhenJoining: true,
  useSpeakerWhenJoining: true,
  layout: {
    mode: _zegoUikitRn.ZegoLayoutMode.gallery
  },
  bottomMenuBarConfig: {
    buttons: [_ZegoMenuBarButtonName.default.toggleCameraButton, _ZegoMenuBarButtonName.default.switchCameraButton, _ZegoMenuBarButtonName.default.hangUpButton, _ZegoMenuBarButtonName.default.toggleMicrophoneButton, _ZegoMenuBarButtonName.default.switchAudioOutputButton]
  },
  topMenuBarConfig: {
    buttons: [_ZegoMenuBarButtonName.default.showMemberListButton]
  }
};
exports.GROUP_VIDEO_CALL_CONFIG = GROUP_VIDEO_CALL_CONFIG;
const GROUP_VOICE_CALL_CONFIG = {
  turnOnCameraWhenJoining: false,
  turnOnMicrophoneWhenJoining: true,
  useSpeakerWhenJoining: true,
  layout: {
    mode: _zegoUikitRn.ZegoLayoutMode.gallery
  },
  bottomMenuBarConfig: {
    buttons: [_ZegoMenuBarButtonName.default.hangUpButton, _ZegoMenuBarButtonName.default.toggleMicrophoneButton, _ZegoMenuBarButtonName.default.switchAudioOutputButton]
  },
  topMenuBarConfig: {
    buttons: [_ZegoMenuBarButtonName.default.showMemberListButton]
  },
  memberListConfig: {
    showCameraState: false
  }
};
exports.GROUP_VOICE_CALL_CONFIG = GROUP_VOICE_CALL_CONFIG;
var _default = _call.default;
exports.default = _default;
//# sourceMappingURL=index.js.map
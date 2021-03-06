"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RevealFromBottomAndroidSpec = exports.FadeOutToBottomAndroidSpec = exports.FadeInFromBottomAndroidSpec = exports.TransitionIOSSpec = void 0;

var _reactNativeReanimated = require("react-native-reanimated");

// These are the exact values from UINavigationController's animation configuration
const TransitionIOSSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01
  }
}; // See http://androidxref.com/7.1.1_r6/xref/frameworks/base/core/res/res/anim/activity_open_enter.xml

exports.TransitionIOSSpec = TransitionIOSSpec;
const FadeInFromBottomAndroidSpec = {
  animation: 'timing',
  config: {
    duration: 350,
    easing: _reactNativeReanimated.Easing.out(_reactNativeReanimated.Easing.poly(5))
  }
}; // See http://androidxref.com/7.1.1_r6/xref/frameworks/base/core/res/res/anim/activity_close_exit.xml

exports.FadeInFromBottomAndroidSpec = FadeInFromBottomAndroidSpec;
const FadeOutToBottomAndroidSpec = {
  animation: 'timing',
  config: {
    duration: 150,
    easing: _reactNativeReanimated.Easing.in(_reactNativeReanimated.Easing.linear)
  }
}; // See http://androidxref.com/9.0.0_r3/xref/frameworks/base/core/res/res/anim/activity_open_enter.xml

exports.FadeOutToBottomAndroidSpec = FadeOutToBottomAndroidSpec;
const RevealFromBottomAndroidSpec = {
  animation: 'timing',
  config: {
    duration: 425,
    // This is super rough approximation of the path used for the curve by android
    // See http://androidxref.com/9.0.0_r3/xref/frameworks/base/core/res/res/interpolator/fast_out_extra_slow_in.xml
    easing: _reactNativeReanimated.Easing.bezier(0.35, 0.45, 0, 1)
  }
};
exports.RevealFromBottomAndroidSpec = RevealFromBottomAndroidSpec;
//# sourceMappingURL=TransitionSpecs.js.map
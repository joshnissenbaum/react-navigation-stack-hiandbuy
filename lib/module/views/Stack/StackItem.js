function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
export default class StackItem extends React.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleOpen", () => {
      const {
        scene,
        onTransitionEnd,
        onOpenRoute
      } = this.props;
      onTransitionEnd && onTransitionEnd({
        route: scene.route
      }, false);
      onOpenRoute({
        route: scene.route
      });
    });

    _defineProperty(this, "handleClose", () => {
      const {
        scene,
        onTransitionEnd,
        onCloseRoute
      } = this.props;
      onTransitionEnd && onTransitionEnd({
        route: scene.route
      }, true);
      onCloseRoute({
        route: scene.route
      });
    });

    _defineProperty(this, "handleTransitionStart", ({
      closing
    }) => {
      const {
        scene,
        onTransitionStart,
        onPageChangeConfirm,
        onPageChangeCancel,
        onGoBack
      } = this.props;

      if (closing) {
        onPageChangeConfirm && onPageChangeConfirm();
      } else {
        onPageChangeCancel && onPageChangeCancel();
      }

      onTransitionStart && onTransitionStart({
        route: scene.route
      }, closing);
      closing && onGoBack({
        route: scene.route
      });
    });
  }

  render() {
    const {
      index,
      layout,
      active,
      focused,
      closing,
      current,
      navigation,
      scene,
      previousScene,
      safeAreaInsetTop,
      safeAreaInsetRight,
      safeAreaInsetBottom,
      safeAreaInsetLeft,
      cardTransparent,
      cardOverlayEnabled,
      cardShadowEnabled,
      cardStyle,
      gestureEnabled,
      onPageChangeStart,
      onPageChangeCancel,
      gestureResponseDistance,
      floatingHeaderHeight,
      headerShown,
      getPreviousRoute,
      headerMode,
      headerTransparent,
      renderHeader,
      renderScene,
      gestureDirection,
      transitionSpec,
      cardStyleInterpolator,
      headerStyleInterpolator,
      gestureVelocityImpact
    } = this.props;
    const insets = {
      top: safeAreaInsetTop,
      right: safeAreaInsetRight,
      bottom: safeAreaInsetBottom,
      left: safeAreaInsetLeft
    };
    return /*#__PURE__*/React.createElement(Card, {
      index: index,
      active: active,
      transparent: cardTransparent,
      gestureDirection: gestureDirection,
      layout: layout,
      insets: insets,
      current: current,
      next: scene.progress.next,
      closing: closing,
      onOpen: this.handleOpen,
      onClose: this.handleClose,
      overlayEnabled: cardOverlayEnabled,
      shadowEnabled: cardShadowEnabled,
      gestureEnabled: gestureEnabled,
      onTransitionStart: this.handleTransitionStart,
      onGestureBegin: onPageChangeStart,
      onGestureCanceled: onPageChangeCancel,
      gestureResponseDistance: gestureResponseDistance,
      transitionSpec: transitionSpec,
      styleInterpolator: cardStyleInterpolator,
      accessibilityElementsHidden: !focused,
      importantForAccessibility: focused ? 'auto' : 'no-hide-descendants',
      pointerEvents: "box-none",
      containerStyle: headerMode === 'float' && !headerTransparent && headerShown !== false ? {
        marginTop: floatingHeaderHeight
      } : null,
      contentStyle: cardStyle,
      style: StyleSheet.absoluteFill,
      gestureVelocityImpact: gestureVelocityImpact
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.container
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.scene
    }, renderScene({
      route: scene.route
    })), headerMode === 'screen' ? renderHeader({
      mode: 'screen',
      layout,
      insets,
      scenes: [previousScene, scene],
      navigation,
      getPreviousRoute,
      styleInterpolator: headerStyleInterpolator
    }) : null));
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  scene: {
    flex: 1
  }
});
//# sourceMappingURL=StackItem.js.map
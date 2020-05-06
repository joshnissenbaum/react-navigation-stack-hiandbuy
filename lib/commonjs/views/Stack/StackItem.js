"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Card = _interopRequireDefault(require("./Card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StackItem extends React.PureComponent {
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
    return /*#__PURE__*/React.createElement(_Card.default, {
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
      style: _reactNative.StyleSheet.absoluteFill,
      gestureVelocityImpact: gestureVelocityImpact
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
      style: styles.container
    }, /*#__PURE__*/React.createElement(_reactNative.View, {
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

exports.default = StackItem;

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  scene: {
    flex: 1
  }
});
//# sourceMappingURL=StackItem.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var Screens = _interopRequireWildcard(require("react-native-screens"));

var _HeaderSegment = require("../Header/HeaderSegment");

var _StackItem = _interopRequireDefault(require("./StackItem"));

var _TransitionPresets = require("../../TransitionConfigs/TransitionPresets");

var _HeaderStyleInterpolators = require("../../TransitionConfigs/HeaderStyleInterpolators");

var _validateDeprecatedOptions = _interopRequireDefault(require("../../utils/validateDeprecatedOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const dimensions = _reactNative.Dimensions.get('window');

const layout = {
  width: dimensions.width,
  height: dimensions.height
};
let AnimatedScreen;

const MaybeScreenContainer = (_ref) => {
  let {
    enabled
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["enabled"]);

  if (_reactNative.Platform.OS !== 'ios' && enabled && Screens.screensEnabled()) {
    return /*#__PURE__*/React.createElement(Screens.ScreenContainer, rest);
  }

  return /*#__PURE__*/React.createElement(_reactNative.View, rest);
};

const MaybeScreen = (_ref2) => {
  let {
    enabled,
    active
  } = _ref2,
      rest = _objectWithoutProperties(_ref2, ["enabled", "active"]);

  if (_reactNative.Platform.OS !== 'ios' && enabled && Screens.screensEnabled()) {
    AnimatedScreen = AnimatedScreen || _reactNativeReanimated.default.createAnimatedComponent(Screens.NativeScreen);
    return /*#__PURE__*/React.createElement(AnimatedScreen, _extends({
      active: active
    }, rest));
  }

  return /*#__PURE__*/React.createElement(_reactNative.View, rest);
};

const FALLBACK_DESCRIPTOR = Object.freeze({
  options: {}
});
const {
  cond,
  eq
} = _reactNativeReanimated.default;
const ANIMATED_ONE = new _reactNativeReanimated.default.Value(1);

const getFloatingHeaderHeights = (routes, insets, descriptors, layout, previous) => {
  const defaultHeaderHeight = (0, _HeaderSegment.getDefaultHeaderHeight)(layout, insets);
  return routes.reduce((acc, curr) => {
    const {
      options = {}
    } = descriptors[curr.key] || {};

    const {
      height = previous[curr.key]
    } = _reactNative.StyleSheet.flatten(options.headerStyle || {});

    acc[curr.key] = typeof height === 'number' ? height : defaultHeaderHeight;
    return acc;
  }, {});
};

class Stack extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      routes: [],
      scenes: [],
      progress: {},
      layout,
      descriptors: this.props.descriptors,
      // Used when card's header is null and mode is float to make transition
      // between screens with headers and those without headers smooth.
      // This is not a great heuristic here. We don't know synchronously
      // on mount what the header height is so we have just used the most
      // common cases here.
      floatingHeaderHeights: {}
    });

    _defineProperty(this, "handleLayout", e => {
      const {
        height,
        width
      } = e.nativeEvent.layout;

      if (height === this.state.layout.height && width === this.state.layout.width) {
        return;
      }

      const layout = {
        width,
        height
      };
      this.setState(state => ({
        layout,
        floatingHeaderHeights: getFloatingHeaderHeights(this.props.routes, this.props.insets, state.descriptors, layout, {})
      }));
    });

    _defineProperty(this, "handleFloatingHeaderLayout", ({
      route,
      height
    }) => {
      const previousHeight = this.state.floatingHeaderHeights[route.key];

      if (previousHeight && previousHeight === height) {
        return;
      }

      this.setState(state => ({
        floatingHeaderHeights: _objectSpread({}, state.floatingHeaderHeights, {
          [route.key]: height
        })
      }));
    });

    _defineProperty(this, "handleTransitionStart", ({
      route
    }, closing) => {
      const {
        descriptors
      } = this.props;
      const descriptor = descriptors[route.key];
      descriptor && descriptor.options.onTransitionStart && descriptor.options.onTransitionStart({
        closing
      });
    });

    _defineProperty(this, "handleTransitionEnd", ({
      route
    }, closing) => {
      const descriptor = this.props.descriptors[route.key];
      descriptor && descriptor.options.onTransitionEnd && descriptor.options.onTransitionEnd({
        closing
      });
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.routes === state.routes && props.descriptors === state.descriptors) {
      return null;
    }

    const progress = props.routes.reduce((acc, curr) => {
      const descriptor = props.descriptors[curr.key];
      acc[curr.key] = state.progress[curr.key] || new _reactNativeReanimated.default.Value(props.openingRoutesKeys.includes(curr.key) && descriptor && descriptor.options.animationEnabled !== false ? 0 : 1);
      return acc;
    }, {});
    return {
      routes: props.routes,
      scenes: props.routes.map((route, index, self) => {
        const previousRoute = self[index - 1];
        const nextRoute = self[index + 1];
        const current = progress[route.key];
        const previous = previousRoute ? progress[previousRoute.key] : undefined;
        const next = nextRoute ? progress[nextRoute.key] : undefined;
        const oldScene = state.scenes[index];
        const scene = {
          route,
          previous: previousRoute,
          descriptor: props.descriptors[route.key] || state.descriptors[route.key] || (oldScene ? oldScene.descriptor : FALLBACK_DESCRIPTOR),
          progress: {
            current,
            next,
            previous
          }
        };

        if (oldScene && scene.route === oldScene.route && scene.progress.current === oldScene.progress.current && scene.progress.next === oldScene.progress.next && scene.progress.previous === oldScene.progress.previous && scene.descriptor === oldScene.descriptor) {
          return oldScene;
        }

        return scene;
      }),
      progress,
      descriptors: props.descriptors,
      floatingHeaderHeights: getFloatingHeaderHeights(props.routes, props.insets, state.descriptors, state.layout, state.floatingHeaderHeights)
    };
  }

  render() {
    const {
      mode,
      insets,
      descriptors,
      navigation,
      routes,
      closingRoutesKeys,
      onOpenRoute,
      onCloseRoute,
      onGoBack,
      getPreviousRoute,
      getGesturesEnabled,
      renderHeader,
      renderScene,
      headerMode,
      onPageChangeStart,
      onPageChangeConfirm,
      onPageChangeCancel
    } = this.props;
    const {
      scenes,
      layout,
      progress,
      floatingHeaderHeights
    } = this.state;
    const focusedRoute = navigation.state.routes[navigation.state.index];
    const focusedDescriptor = descriptors[focusedRoute.key];
    const focusedOptions = focusedDescriptor ? focusedDescriptor.options : {};
    let defaultTransitionPreset = mode === 'modal' ? _TransitionPresets.ModalTransition : _TransitionPresets.DefaultTransition;

    if (headerMode === 'screen') {
      defaultTransitionPreset = _objectSpread({}, defaultTransitionPreset, {
        headerStyleInterpolator: _HeaderStyleInterpolators.forNoAnimation
      });
    }

    const {
      top = insets.top,
      right = insets.right,
      bottom = insets.bottom,
      left = insets.left
    } = focusedOptions.safeAreaInsets || {};
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MaybeScreenContainer, {
      enabled: mode !== 'modal',
      style: styles.container,
      onLayout: this.handleLayout
    }, routes.map((route, index, self) => {
      const focused = focusedRoute.key === route.key;
      const current = progress[route.key];
      const scene = scenes[index];
      const next = self[index + 1] ? progress[self[index + 1].key] : ANIMATED_ONE; // Display current screen and a screen beneath. On Android screen beneath is hidden on animation finished bs of RNS's issue.

      const isScreenActive = index === self.length - 1 ? 1 : _reactNative.Platform.OS === 'android' ? cond(eq(next, 1), 0, 1) : index === self.length - 2 ? 1 : 0;

      if (process.env.NODE_ENV !== 'production' && scene.descriptor && scene.descriptor.options) {
        (0, _validateDeprecatedOptions.default)(scene.descriptor.options);
      }

      const {
        safeAreaInsets,
        header,
        headerShown,
        headerTransparent,
        cardTransparent,
        cardShadowEnabled,
        cardOverlayEnabled,
        cardStyle,
        gestureResponseDistance,
        gestureDirection = defaultTransitionPreset.gestureDirection,
        transitionSpec = defaultTransitionPreset.transitionSpec,
        cardStyleInterpolator = defaultTransitionPreset.cardStyleInterpolator,
        headerStyleInterpolator = defaultTransitionPreset.headerStyleInterpolator,
        gestureVelocityImpact
      } = scene.descriptor ? scene.descriptor.options : {};
      let transitionConfig = {
        transitionSpec,
        cardStyleInterpolator,
        headerStyleInterpolator
      }; // When a screen is not the last, it should use next screen's transition config
      // Many transitions also animate the previous screen, so using 2 different transitions doesn't look right
      // For example combining a slide and a modal transition would look wrong otherwise
      // With this approach, combining different transition styles in the same navigator mostly looks right
      // This will still be broken when 2 transitions have different idle state (e.g. modal presentation),
      // but majority of the transitions look alright

      if (index !== self.length - 1) {
        const nextScene = scenes[index + 1];

        if (nextScene) {
          const {
            transitionSpec = defaultTransitionPreset.transitionSpec,
            cardStyleInterpolator = defaultTransitionPreset.cardStyleInterpolator,
            headerStyleInterpolator = defaultTransitionPreset.headerStyleInterpolator
          } = nextScene.descriptor ? nextScene.descriptor.options : {};
          transitionConfig = {
            transitionSpec,
            cardStyleInterpolator,
            headerStyleInterpolator
          };
        }
      }

      const {
        top: safeAreaInsetTop = insets.top,
        right: safeAreaInsetRight = insets.right,
        bottom: safeAreaInsetBottom = insets.bottom,
        left: safeAreaInsetLeft = insets.left
      } = safeAreaInsets || {};
      return /*#__PURE__*/React.createElement(MaybeScreen, {
        key: route.key,
        style: _reactNative.StyleSheet.absoluteFill,
        enabled: mode !== 'modal',
        active: isScreenActive,
        pointerEvents: "box-none"
      }, /*#__PURE__*/React.createElement(_StackItem.default, _extends({
        index: index,
        active: index === self.length - 1,
        focused: focused,
        closing: closingRoutesKeys.includes(route.key),
        layout: layout,
        current: current,
        scene: scene,
        previousScene: scenes[index - 1],
        navigation: navigation,
        safeAreaInsetTop: safeAreaInsetTop,
        safeAreaInsetRight: safeAreaInsetRight,
        safeAreaInsetBottom: safeAreaInsetBottom,
        safeAreaInsetLeft: safeAreaInsetLeft,
        cardTransparent: cardTransparent,
        cardOverlayEnabled: cardOverlayEnabled,
        cardShadowEnabled: cardShadowEnabled,
        cardStyle: cardStyle,
        onPageChangeStart: onPageChangeStart,
        onPageChangeConfirm: onPageChangeConfirm,
        onPageChangeCancel: onPageChangeCancel,
        floatingHeaderHeight: floatingHeaderHeights[route.key],
        headerShown: header !== null && headerShown !== false,
        getPreviousRoute: getPreviousRoute,
        headerMode: headerMode,
        headerTransparent: headerTransparent,
        renderHeader: renderHeader,
        renderScene: renderScene,
        onOpenRoute: onOpenRoute,
        onCloseRoute: onCloseRoute,
        onTransitionStart: this.handleTransitionStart,
        onTransitionEnd: this.handleTransitionEnd,
        onGoBack: onGoBack,
        gestureDirection: gestureDirection,
        transitionSpec: transitionSpec,
        cardStyleInterpolator: cardStyleInterpolator,
        headerStyleInterpolator: headerStyleInterpolator,
        gestureEnabled: index !== 0 && getGesturesEnabled({
          route
        }),
        gestureResponseDistance: gestureResponseDistance,
        gestureVelocityImpact: gestureVelocityImpact
      }, transitionConfig)));
    })), headerMode === 'float' ? renderHeader({
      mode: 'float',
      layout,
      insets: {
        top,
        right,
        bottom,
        left
      },
      scenes,
      navigation,
      getPreviousRoute,
      onContentHeightChange: this.handleFloatingHeaderLayout,
      styleInterpolator: focusedOptions.headerStyleInterpolator !== undefined ? focusedOptions.headerStyleInterpolator : defaultTransitionPreset.headerStyleInterpolator,
      style: styles.floating
    }) : null);
  }

}

exports.default = Stack;

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  },
  floating: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
});
//# sourceMappingURL=Stack.js.map
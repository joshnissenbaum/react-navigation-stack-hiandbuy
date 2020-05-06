"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _memoize = _interopRequireDefault(require("../../utils/memoize"));

var _StackGestureContext = _interopRequireDefault(require("../../utils/StackGestureContext"));

var _PointerEventsView = _interopRequireDefault(require("./PointerEventsView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const TRUE = 1;
const TRUE_NODE = new _reactNativeReanimated.default.Value(TRUE);
const FALSE = 0;
const FALSE_NODE = new _reactNativeReanimated.default.Value(FALSE);
const NOOP_NODE = FALSE_NODE;
const UNSET = -1;
const UNSET_NODE = new _reactNativeReanimated.default.Value(UNSET);
const MINUS_ONE_NODE = UNSET_NODE;
const TOP = -1;
const BOTTOM = 1;
const DIRECTION_VERTICAL = -1;
const DIRECTION_HORIZONTAL = 1;
const GESTURE_VELOCITY_IMPACT = 0.3;
/**
 * The distance of touch start from the edge of the screen where the gesture will be recognized
 */

const GESTURE_RESPONSE_DISTANCE_HORIZONTAL = 50;
const GESTURE_RESPONSE_DISTANCE_VERTICAL = 135;
const {
  abs,
  add,
  block,
  call,
  cond,
  divide,
  eq,
  greaterThan,
  lessThan,
  max,
  min,
  multiply,
  neq,
  onChange,
  set,
  spring,
  sub,
  timing,
  startClock,
  stopClock,
  clockRunning,
  Clock,
  Value
} = _reactNativeReanimated.default; // We need to be prepared for both version of reanimated. With and w/out proc

let memoizedSpring = spring; // @ts-ignore

if (_reactNativeReanimated.default.proc) {
  // @ts-ignore
  const springHelper = _reactNativeReanimated.default.proc((finished, velocity, position, time, prevPosition, toValue, damping, mass, stiffness, overshootClamping, restSpeedThreshold, restDisplacementThreshold, clock) => spring(clock, {
    finished,
    velocity,
    position,
    time,
    // @ts-ignore
    prevPosition
  }, {
    toValue,
    damping,
    mass,
    stiffness,
    overshootClamping,
    restDisplacementThreshold,
    restSpeedThreshold
  })); // @ts-ignore


  memoizedSpring = function memoizedSpring(clock, state, config) {
    return springHelper(state.finished, state.velocity, state.position, state.time, new Value(0), config.toValue, config.damping, config.mass, config.stiffness, config.overshootClamping, config.restSpeedThreshold, config.restDisplacementThreshold, clock);
  };
}

function transformSpringConfigToAnimatedValues(config) {
  return {
    damping: new _reactNativeReanimated.default.Value(config.damping),
    stiffness: new _reactNativeReanimated.default.Value(config.stiffness),
    mass: new _reactNativeReanimated.default.Value(config.mass),
    restDisplacementThreshold: new _reactNativeReanimated.default.Value(config.restDisplacementThreshold),
    restSpeedThreshold: new _reactNativeReanimated.default.Value(config.restSpeedThreshold),
    overshootClamping: new _reactNativeReanimated.default.Value(config.overshootClamping)
  };
}

function transformTimingConfigToAnimatedValues(config) {
  return {
    duration: new _reactNativeReanimated.default.Value(config.duration),
    easing: config.easing
  };
}

class Card extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "isVisible", new Value(TRUE));

    _defineProperty(this, "nextIsVisible", new Value(UNSET));

    _defineProperty(this, "verticalGestureDirection", new Value(this.props.gestureDirection === 'vertical-inverted' ? TOP : BOTTOM));

    _defineProperty(this, "isClosing", new Value(FALSE));

    _defineProperty(this, "noAnimationStartedSoFar", true);

    _defineProperty(this, "isRunningAnimation", false);

    _defineProperty(this, "clock", new Clock());

    _defineProperty(this, "direction", new Value(this.props.gestureDirection === 'vertical' || this.props.gestureDirection === 'vertical-inverted' ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL));

    _defineProperty(this, "layout", {
      width: new Value(this.props.layout.width),
      height: new Value(this.props.layout.height)
    });

    _defineProperty(this, "gestureVelocityImpact", new Value(this.props.gestureVelocityImpact));

    _defineProperty(this, "openingSpecConfig", this.props.transitionSpec.open.animation === 'timing' ? transformTimingConfigToAnimatedValues(this.props.transitionSpec.open.config) : transformSpringConfigToAnimatedValues(this.props.transitionSpec.open.config));

    _defineProperty(this, "closingSpecConfig", this.props.transitionSpec.close.animation === 'timing' ? transformTimingConfigToAnimatedValues(this.props.transitionSpec.close.config) : transformSpringConfigToAnimatedValues(this.props.transitionSpec.close.config));

    _defineProperty(this, "distance", cond(eq(this.direction, DIRECTION_VERTICAL), this.layout.height, this.layout.width));

    _defineProperty(this, "gestureUntraversed", new Value(0));

    _defineProperty(this, "gesture", new Value(0));

    _defineProperty(this, "offset", new Value(0));

    _defineProperty(this, "velocityUntraversed", new Value(0));

    _defineProperty(this, "velocity", new Value(0));

    _defineProperty(this, "didMovementHappen", new Value(0));

    _defineProperty(this, "gestureState", new Value(0));

    _defineProperty(this, "isSwiping", new Value(FALSE));

    _defineProperty(this, "isSwipeCancelled", new Value(FALSE));

    _defineProperty(this, "isSwipeGesture", new Value(FALSE));

    _defineProperty(this, "toValue", new Value(0));

    _defineProperty(this, "frameTime", new Value(0));

    _defineProperty(this, "transitionVelocity", new Value(0));

    _defineProperty(this, "transitionState", {
      position: this.props.current,
      time: new Value(0),
      finished: new Value(FALSE)
    });

    _defineProperty(this, "interactionHandle", void 0);

    _defineProperty(this, "handleStartInteraction", () => {
      if (this.interactionHandle === undefined) {
        this.interactionHandle = _reactNative.InteractionManager.createInteractionHandle();
      }
    });

    _defineProperty(this, "handleEndInteraction", () => {
      if (this.interactionHandle !== undefined) {
        _reactNative.InteractionManager.clearInteractionHandle(this.interactionHandle);

        this.interactionHandle = undefined;
      }
    });

    _defineProperty(this, "handleTransitionEnd", () => {
      this.handleEndInteraction();
      this.isRunningAnimation = false;
      this.interpolatedStyle = this.getInterpolatedStyle(this.props.styleInterpolator, this.props.index, this.props.current, this.props.next, this.props.layout, this.props.insets.top, this.props.insets.right, this.props.insets.bottom, this.props.insets.left);
    });

    _defineProperty(this, "runTransition", isVisible => {
      const {
        open: openingSpec,
        close: closingSpec
      } = this.props.transitionSpec;
      return [cond(eq(this.props.current, isVisible), call([this.didMovementHappen, this.isVisible], ([didMovementHappen]) => {
        if (didMovementHappen) {
          // if we go back to the same position,
          // let's pretend that whole animation happen
          // for making the logic consistent
          // It's especially vital for having inputs properly focused.
          this.handleStartInteraction();
          const {
            onTransitionStart
          } = this.props;
          onTransitionStart && onTransitionStart({
            closing: false
          });
          this.handleTransitionEnd();
          this.props.onOpen(true);
        }
      }), [cond(clockRunning(this.clock), NOOP_NODE, [// Animation wasn't running before
      // Set the initial values and start the clock
      set(this.toValue, isVisible), // The velocity value is ideal for translating the whole screen
      // But since we have 0-1 scale, we need to adjust the velocity
      set(this.transitionVelocity, multiply(cond(this.distance, divide(this.velocity, this.distance), FALSE_NODE), -1)), set(this.frameTime, FALSE_NODE), set(this.transitionState.time, FALSE_NODE), set(this.transitionState.finished, FALSE_NODE), set(this.isVisible, isVisible), startClock(this.clock), call([this.isVisible], ([value]) => {
        this.handleStartInteraction();
        const {
          onTransitionStart
        } = this.props;
        this.noAnimationStartedSoFar = false;
        this.isRunningAnimation = true;
        onTransitionStart && onTransitionStart({
          closing: !value
        });
      })]), cond(eq(isVisible, TRUE_NODE), openingSpec.animation === 'spring' ? memoizedSpring(this.clock, _objectSpread({}, this.transitionState, {
        velocity: this.transitionVelocity
      }), // @ts-ignore
      _objectSpread({}, this.openingSpecConfig, {
        toValue: this.toValue
      })) : timing(this.clock, _objectSpread({}, this.transitionState, {
        frameTime: this.frameTime
      }), _objectSpread({}, this.openingSpecConfig, {
        toValue: this.toValue
      })), closingSpec.animation === 'spring' ? memoizedSpring(this.clock, _objectSpread({}, this.transitionState, {
        velocity: this.transitionVelocity
      }), // @ts-ignore
      _objectSpread({}, this.closingSpecConfig, {
        toValue: this.toValue
      })) : timing(this.clock, _objectSpread({}, this.transitionState, {
        frameTime: this.frameTime
      }), _objectSpread({}, this.closingSpecConfig, {
        toValue: this.toValue
      }))), cond(this.transitionState.finished, [// Reset values
      set(this.isSwipeGesture, FALSE_NODE), set(this.gesture, FALSE_NODE), set(this.velocity, FALSE_NODE), // When the animation finishes, stop the clock
      stopClock(this.clock), call([this.isVisible], ([value]) => {
        const isOpen = Boolean(value);
        const {
          onOpen,
          onClose
        } = this.props;
        this.handleTransitionEnd();

        if (isOpen) {
          onOpen(true);
        } else {
          onClose(true);
        }
      })])]), set(this.didMovementHappen, 0)];
    });

    _defineProperty(this, "extrapolatedPosition", add(this.gesture, multiply(this.velocity, this.gestureVelocityImpact)));

    _defineProperty(this, "exec", [set(this.gesture, cond(eq(this.direction, DIRECTION_HORIZONTAL), multiply(this.gestureUntraversed, _reactNative.I18nManager.isRTL ? MINUS_ONE_NODE : TRUE_NODE), this.gestureUntraversed)), set(this.velocity, multiply(this.velocityUntraversed, _reactNative.I18nManager.isRTL ? MINUS_ONE_NODE : TRUE_NODE)), onChange(this.isClosing, cond(this.isClosing, set(this.nextIsVisible, FALSE_NODE))), onChange(this.nextIsVisible, cond(neq(this.nextIsVisible, UNSET_NODE), [// Stop any running animations
    cond(clockRunning(this.clock), [call([], this.handleTransitionEnd), stopClock(this.clock)]), set(this.gesture, FALSE_NODE), // Update the index to trigger the transition
    set(this.isVisible, this.nextIsVisible), set(this.nextIsVisible, UNSET_NODE)]))]);

    _defineProperty(this, "execNoGesture", block([...this.exec, this.runTransition(this.isVisible)]));

    _defineProperty(this, "execWithGesture", block([...this.exec, onChange(this.isSwiping, call([this.isSwiping, this.isSwipeCancelled], ([isSwiping, isSwipeCancelled]) => {
      const {
        onGestureBegin,
        onGestureEnd,
        onGestureCanceled
      } = this.props;

      if (isSwiping === TRUE) {
        this.handleStartInteraction();
        onGestureBegin && onGestureBegin();
      } else {
        this.handleEndInteraction();

        if (isSwipeCancelled === TRUE) {
          onGestureCanceled && onGestureCanceled();
        } else {
          onGestureEnd && onGestureEnd();
        }
      }
    })), onChange(this.gestureUntraversed, set(this.didMovementHappen, 1)), cond(eq(this.gestureState, _reactNativeGestureHandler.State.ACTIVE), [cond(this.isSwiping, NOOP_NODE, [// We weren't dragging before, set it to true
    set(this.isSwipeCancelled, FALSE_NODE), set(this.isSwiping, TRUE_NODE), set(this.isSwipeGesture, TRUE_NODE), // Also update the drag offset to the last position
    set(this.offset, this.props.current)]), // Update position with next offset + gesture distance
    set(this.props.current, min(max(sub(this.offset, cond(this.distance, divide(cond(eq(this.direction, DIRECTION_HORIZONTAL), multiply(this.gestureUntraversed, _reactNative.I18nManager.isRTL ? MINUS_ONE_NODE : TRUE_NODE), this.gestureUntraversed), this.distance), TRUE_NODE)), FALSE_NODE), TRUE_NODE)), // Stop animations while we're dragging
    // and invoke proper listener
    cond(clockRunning(this.clock), call([this.toValue], ([target]) => {
      this.isRunningAnimation = false;

      if (target) {
        this.props.onOpen(false);
      } else {
        this.props.onClose(false);
      }
    })), stopClock(this.clock)], [set(this.isSwipeCancelled, eq(this.gestureState, _reactNativeGestureHandler.State.CANCELLED)), set(this.isSwiping, FALSE_NODE), this.runTransition(cond(greaterThan(abs(this.extrapolatedPosition), divide(this.distance, 2)), cond(lessThan(cond(eq(this.velocity, FALSE_NODE), this.gesture, this.velocity), FALSE_NODE), TRUE_NODE, FALSE_NODE), this.isVisible))])]));

    _defineProperty(this, "handleGestureEventHorizontal", _reactNativeReanimated.default.event([{
      nativeEvent: {
        translationX: this.gestureUntraversed,
        velocityX: this.velocityUntraversed,
        state: this.gestureState
      }
    }]));

    _defineProperty(this, "handleGestureEventVertical", _reactNativeReanimated.default.event([{
      nativeEvent: {
        translationY: this.gestureUntraversed,
        velocityY: this.velocityUntraversed,
        state: this.gestureState
      }
    }]));

    _defineProperty(this, "getInterpolatedStyle", (0, _memoize.default)((styleInterpolator, index, current, next, layout, insetTop, insetRight, insetBottom, insetLeft) => styleInterpolator({
      index,
      current: {
        progress: current
      },
      next: next && {
        progress: next
      },
      closing: this.isClosing,
      layouts: {
        screen: layout
      },
      insets: {
        top: insetTop,
        right: insetRight,
        bottom: insetBottom,
        left: insetLeft
      }
    })));

    _defineProperty(this, "interpolatedStyle", this.getInterpolatedStyle(this.props.styleInterpolator, this.props.index, this.props.current, this.props.next, this.props.layout, this.props.insets.top, this.props.insets.right, this.props.insets.bottom, this.props.insets.left));

    _defineProperty(this, "gestureRef", React.createRef());
  }

  componentDidUpdate(prevProps) {
    const {
      layout,
      gestureDirection,
      closing,
      gestureVelocityImpact
    } = this.props;
    const {
      width,
      height
    } = layout;

    if (width !== prevProps.layout.width) {
      this.layout.width.setValue(width);
    }

    if (height !== prevProps.layout.height) {
      this.layout.height.setValue(height);
    }

    if (gestureVelocityImpact !== prevProps.gestureVelocityImpact) {
      this.gestureVelocityImpact.setValue(gestureVelocityImpact);
    }

    if (gestureDirection !== prevProps.gestureDirection) {
      this.direction.setValue(gestureDirection === 'vertical' || gestureDirection === 'vertical-inverted' ? DIRECTION_VERTICAL : DIRECTION_HORIZONTAL);
      this.verticalGestureDirection.setValue(gestureDirection === 'vertical-inverted' ? TOP : BOTTOM);
    }

    if (closing !== prevProps.closing) {
      // If the style updates during render, setting the value here doesn't work
      // We need to defer it a bit so the animation starts properly
      requestAnimationFrame(() => requestAnimationFrame(() => this.isClosing.setValue(closing ? TRUE : FALSE)));
    }
  }

  componentWillUnmount() {
    this.handleEndInteraction(); // It might sometimes happen than animation will be unmounted
    // during running. However, we need to invoke listener onClose
    // manually in this case

    if (this.isRunningAnimation || this.noAnimationStartedSoFar) {
      this.props.onClose(false);
    }
  }

  gestureActivationCriteria() {
    const {
      layout,
      gestureDirection,
      gestureResponseDistance
    } = this.props;
    const distance = gestureDirection === 'vertical' || gestureDirection === 'vertical-inverted' ? gestureResponseDistance && gestureResponseDistance.vertical !== undefined ? gestureResponseDistance.vertical : GESTURE_RESPONSE_DISTANCE_VERTICAL : gestureResponseDistance && gestureResponseDistance.horizontal !== undefined ? gestureResponseDistance.horizontal : GESTURE_RESPONSE_DISTANCE_HORIZONTAL;

    if (gestureDirection === 'vertical') {
      return {
        maxDeltaX: 15,
        minOffsetY: 5,
        hitSlop: {
          bottom: -layout.height + distance
        }
      };
    } else if (gestureDirection === 'vertical-inverted') {
      return {
        maxDeltaX: 15,
        minOffsetY: -5,
        hitSlop: {
          top: -layout.height + distance
        }
      };
    } else {
      const hitSlop = -layout.width + distance;

      if (_reactNative.I18nManager.isRTL) {
        return {
          minOffsetX: -5,
          maxDeltaY: 20,
          hitSlop: {
            left: hitSlop
          }
        };
      } else {
        return {
          minOffsetX: 5,
          maxDeltaY: 20,
          hitSlop: {
            right: hitSlop
          }
        };
      }
    }
  }

  render() {
    const _this$props = this.props,
          {
      active,
      transparent,
      styleInterpolator,
      index,
      current,
      next,
      layout,
      insets,
      overlayEnabled,
      shadowEnabled,
      gestureEnabled,
      gestureDirection,
      children,
      containerStyle: customContainerStyle,
      contentStyle
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["active", "transparent", "styleInterpolator", "index", "current", "next", "layout", "insets", "overlayEnabled", "shadowEnabled", "gestureEnabled", "gestureDirection", "children", "containerStyle", "contentStyle"]);

    if (!this.isRunningAnimation) {
      this.interpolatedStyle = this.getInterpolatedStyle(styleInterpolator, index, current, next, layout, insets.top, insets.right, insets.bottom, insets.left);
    }

    const {
      containerStyle,
      cardStyle,
      overlayStyle,
      shadowStyle,
      overlayBackgroundComponent
    } = this.interpolatedStyle;
    const handleGestureEvent = gestureEnabled ? gestureDirection === 'vertical' || gestureDirection === 'vertical-inverted' ? this.handleGestureEventVertical : this.handleGestureEventHorizontal : undefined;
    let overrideFlex = null;

    if (cardStyle) {
      const style = _reactNative.StyleSheet.flatten(cardStyle);

      if (style.hasOwnProperty('flex')) {
        overrideFlex = {
          flex: style.flex
        };
      }
    }

    return /*#__PURE__*/React.createElement(_StackGestureContext.default.Provider, {
      value: this.gestureRef
    }, /*#__PURE__*/React.createElement(_reactNative.View, _extends({
      pointerEvents: "box-none"
    }, rest), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.Code, {
      key: gestureEnabled ? 'gesture-code' : 'no-gesture-code',
      exec: gestureEnabled ? this.execWithGesture : this.execNoGesture
    }), overlayEnabled && overlayStyle ? /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      pointerEvents: "none",
      style: [styles.overlay, overlayStyle]
    }) : null, overlayBackgroundComponent && overlayBackgroundComponent(), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      style: [styles.container, containerStyle, customContainerStyle],
      pointerEvents: "box-none"
    }, /*#__PURE__*/React.createElement(_reactNativeGestureHandler.PanGestureHandler, _extends({
      ref: this.gestureRef,
      enabled: layout.width !== 0 && gestureEnabled,
      onGestureEvent: handleGestureEvent,
      onHandlerStateChange: handleGestureEvent
    }, this.gestureActivationCriteria()), /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      style: [styles.container, cardStyle]
    }, shadowEnabled && shadowStyle && !transparent ? /*#__PURE__*/React.createElement(_reactNativeReanimated.default.View, {
      style: [styles.shadow, gestureDirection === 'horizontal' ? styles.shadowHorizontal : styles.shadowVertical, shadowStyle],
      pointerEvents: "none"
    }) : null, /*#__PURE__*/React.createElement(_PointerEventsView.default, {
      active: active,
      progress: this.props.current,
      style: [styles.content, overrideFlex, transparent ? styles.transparent : styles.opaque, contentStyle]
    }, children))))));
  }

}

exports.default = Card;

_defineProperty(Card, "defaultProps", {
  overlayEnabled: _reactNative.Platform.OS !== 'ios',
  shadowEnabled: true,
  gestureEnabled: true,
  gestureVelocityImpact: GESTURE_VELOCITY_IMPACT
});

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    overflow: 'hidden'
  },
  overlay: _objectSpread({}, _reactNative.StyleSheet.absoluteFillObject, {
    backgroundColor: '#000'
  }),
  shadow: {
    position: 'absolute',
    backgroundColor: '#fff',
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3
  },
  shadowHorizontal: {
    top: 0,
    left: 0,
    bottom: 0,
    width: 3,
    shadowOffset: {
      width: -1,
      height: 1
    }
  },
  shadowVertical: {
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    shadowOffset: {
      width: 1,
      height: -1
    }
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  opaque: {
    backgroundColor: '#eee'
  }
});
//# sourceMappingURL=Card.js.map
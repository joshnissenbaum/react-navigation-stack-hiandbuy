function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
const MIN_PROGRESS = 0.99;
const TRUE = 1;
const FALSE = 0;
const NOOP = 0;
const {
  block,
  greaterThan,
  cond,
  set,
  call,
  onChange
} = Animated;
/**
 * Component that automatically computes the `pointerEvents` property
 * whenever position changes.
 */

export default class PointerEventsView extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "pointerEventsEnabled", new Animated.Value(this.props.active ? TRUE : FALSE));

    _defineProperty(this, "exec", block([cond(greaterThan(this.props.progress, MIN_PROGRESS), cond(this.pointerEventsEnabled, NOOP, set(this.pointerEventsEnabled, TRUE)), cond(this.pointerEventsEnabled, set(this.pointerEventsEnabled, FALSE))), onChange(this.pointerEventsEnabled, call([this.pointerEventsEnabled], ([value]) => {
      this.setPointerEventsEnabled(Boolean(this.props.active && value));
    }))]));

    _defineProperty(this, "setPointerEventsEnabled", enabled => {
      const pointerEvents = enabled ? 'box-none' : 'none';
      this.root && this.root.setNativeProps({
        pointerEvents
      });
    });

    _defineProperty(this, "root", null);
  }

  componentDidUpdate(prevProps) {
    if (this.props.active !== prevProps.active) {
      this.pointerEventsEnabled.setValue(this.props.active ? TRUE : FALSE);
      this.setPointerEventsEnabled(this.props.active);
    }
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _this$props = this.props,
          {
      active,
      progress
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["active", "progress"]);

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Animated.Code, {
      exec: this.exec
    }), /*#__PURE__*/React.createElement(View, _extends({
      ref: c => this.root = c
    }, rest)));
  }

}
//# sourceMappingURL=PointerEventsView.js.map
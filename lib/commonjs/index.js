"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createStackNavigator", {
  enumerable: true,
  get: function get() {
    return _createStackNavigator.default;
  }
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return _Header.default;
  }
});
Object.defineProperty(exports, "HeaderTitle", {
  enumerable: true,
  get: function get() {
    return _HeaderTitle.default;
  }
});
Object.defineProperty(exports, "HeaderBackButton", {
  enumerable: true,
  get: function get() {
    return _HeaderBackButton.default;
  }
});
Object.defineProperty(exports, "StackGestureContext", {
  enumerable: true,
  get: function get() {
    return _StackGestureContext.default;
  }
});
Object.defineProperty(exports, "NavigationStackState", {
  enumerable: true,
  get: function get() {
    return _types.NavigationStackState;
  }
});
Object.defineProperty(exports, "NavigationStackProp", {
  enumerable: true,
  get: function get() {
    return _types.NavigationStackProp;
  }
});
Object.defineProperty(exports, "NavigationStackOptions", {
  enumerable: true,
  get: function get() {
    return _types.NavigationStackOptions;
  }
});
Object.defineProperty(exports, "NavigationStackConfig", {
  enumerable: true,
  get: function get() {
    return _types.NavigationStackConfig;
  }
});
Object.defineProperty(exports, "NavigationStackScreenComponent", {
  enumerable: true,
  get: function get() {
    return _types.NavigationStackScreenComponent;
  }
});
Object.defineProperty(exports, "NavigationStackScreenProps", {
  enumerable: true,
  get: function get() {
    return _types.NavigationStackScreenProps;
  }
});
Object.defineProperty(exports, "HeaderProps", {
  enumerable: true,
  get: function get() {
    return _types.HeaderProps;
  }
});
Object.defineProperty(exports, "HeaderBackButtonProps", {
  enumerable: true,
  get: function get() {
    return _types.HeaderBackButtonProps;
  }
});
Object.defineProperty(exports, "HeaderTitleProps", {
  enumerable: true,
  get: function get() {
    return _types.HeaderTitleProps;
  }
});
Object.defineProperty(exports, "TransitionPreset", {
  enumerable: true,
  get: function get() {
    return _types.TransitionPreset;
  }
});
Object.defineProperty(exports, "CardStyleInterpolator", {
  enumerable: true,
  get: function get() {
    return _types.CardStyleInterpolator;
  }
});
Object.defineProperty(exports, "HeaderStyleInterpolator", {
  enumerable: true,
  get: function get() {
    return _types.HeaderStyleInterpolator;
  }
});
exports.TransitionPresets = exports.TransitionSpecs = exports.HeaderStyleInterpolators = exports.CardStyleInterpolators = exports.Assets = void 0;

var CardStyleInterpolators = _interopRequireWildcard(require("./TransitionConfigs/CardStyleInterpolators"));

exports.CardStyleInterpolators = CardStyleInterpolators;

var HeaderStyleInterpolators = _interopRequireWildcard(require("./TransitionConfigs/HeaderStyleInterpolators"));

exports.HeaderStyleInterpolators = HeaderStyleInterpolators;

var TransitionSpecs = _interopRequireWildcard(require("./TransitionConfigs/TransitionSpecs"));

exports.TransitionSpecs = TransitionSpecs;

var TransitionPresets = _interopRequireWildcard(require("./TransitionConfigs/TransitionPresets"));

exports.TransitionPresets = TransitionPresets;

var _createStackNavigator = _interopRequireDefault(require("./navigators/createStackNavigator"));

var _Header = _interopRequireDefault(require("./views/Header/Header"));

var _HeaderTitle = _interopRequireDefault(require("./views/Header/HeaderTitle"));

var _HeaderBackButton = _interopRequireDefault(require("./views/Header/HeaderBackButton"));

var _StackGestureContext = _interopRequireDefault(require("./utils/StackGestureContext"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Navigators
 */
const Assets = [require('./views/assets/back-icon.png'), require('./views/assets/back-icon-mask.png')];
/**
 * Views
 */

exports.Assets = Assets;
//# sourceMappingURL=index.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _reactNavigation = require("react-navigation");

var _Stack = _interopRequireDefault(require("./Stack"));

var _HeaderContainer = _interopRequireDefault(require("../Header/HeaderContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DEFAULT_INSETS = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

class StackView extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      routes: [],
      previousRoutes: [],
      previousDescriptors: {},
      openingRouteKeys: [],
      closingRouteKeys: [],
      replacingRouteKeys: [],
      descriptors: {}
    });

    _defineProperty(this, "getGesturesEnabled", ({
      route
    }) => {
      const descriptor = this.state.descriptors[route.key];

      if (descriptor) {
        const {
          gestureEnabled,
          animationEnabled
        } = descriptor.options;

        if (animationEnabled === false) {
          // When animation is disabled, also disable gestures
          // The gesture to dismiss a route will look weird when not animated
          return false;
        }

        return gestureEnabled !== undefined ? gestureEnabled : _reactNative.Platform.OS !== 'android';
      }

      return false;
    });

    _defineProperty(this, "getPreviousRoute", ({
      route
    }) => {
      const {
        closingRouteKeys,
        replacingRouteKeys
      } = this.state;
      const routes = this.state.routes.filter(r => r.key === route.key || !closingRouteKeys.includes(r.key) && !replacingRouteKeys.includes(r.key));
      const index = routes.findIndex(r => r.key === route.key);
      return routes[index - 1];
    });

    _defineProperty(this, "renderScene", ({
      route
    }) => {
      const descriptor = this.state.descriptors[route.key] || this.props.descriptors[route.key];

      if (!descriptor) {
        return null;
      }

      const {
        navigation,
        getComponent
      } = descriptor;
      const SceneComponent = getComponent();
      return /*#__PURE__*/React.createElement(_reactNavigation.SceneView, {
        screenProps: this.props.screenProps,
        navigation: navigation,
        component: SceneComponent
      });
    });

    _defineProperty(this, "renderHeader", props => {
      return /*#__PURE__*/React.createElement(_HeaderContainer.default, props);
    });

    _defineProperty(this, "handleTransitionComplete", ({
      route
    }) => {
      // TODO: remove when the new event system lands
      this.props.navigation.dispatch(_reactNavigation.StackActions.completeTransition({
        toChildKey: route.key
      }));
    });

    _defineProperty(this, "handleGoBack", ({
      route
    }) => {
      // This event will trigger when a gesture ends
      // We need to perform the transition before removing the route completely
      // @ts-ignore
      this.props.navigation.dispatch(_reactNavigation.StackActions.pop({
        key: route.key
      }));
    });

    _defineProperty(this, "handleOpenRoute", ({
      route
    }) => {
      this.handleTransitionComplete({
        route
      });
      this.setState(state => ({
        routes: state.replacingRouteKeys.length ? state.routes.filter(r => !state.replacingRouteKeys.includes(r.key)) : state.routes,
        openingRouteKeys: state.openingRouteKeys.filter(key => key !== route.key),
        replacingRouteKeys: [],
        closingRouteKeys: state.closingRouteKeys.filter(key => key !== route.key)
      }));
    });

    _defineProperty(this, "handleCloseRoute", ({
      route
    }) => {
      const index = this.state.routes.findIndex(r => r.key === route.key); // While closing route we need to point to the previous one assuming that
      // this previous one in routes array

      this.handleTransitionComplete({
        route: this.state.routes[Math.max(index - 1, 0)]
      }); // This event will trigger when the animation for closing the route ends
      // In this case, we need to clean up any state tracking the route and pop it immediately
      // @ts-ignore

      this.setState(state => ({
        routes: state.routes.filter(r => r.key !== route.key),
        openingRouteKeys: state.openingRouteKeys.filter(key => key !== route.key),
        closingRouteKeys: state.closingRouteKeys.filter(key => key !== route.key)
      }));
    });
  }

  static getDerivedStateFromProps(props, state) {
    // Here we determine which routes were added or removed to animate them
    // We keep a copy of the route being removed in local state to be able to animate it
    const {
      navigation
    } = props; // If there was no change in routes, we don't need to compute anything

    if (navigation.state.routes === state.previousRoutes && state.routes.length) {
      if (props.descriptors !== state.previousDescriptors) {
        const descriptors = state.routes.reduce((acc, route) => {
          acc[route.key] = props.descriptors[route.key] || state.descriptors[route.key];
          return acc;
        }, {});
        return {
          previousDescriptors: props.descriptors,
          descriptors
        };
      }

      return null;
    }

    let routes = navigation.state.index < navigation.state.routes.length - 1 ? // Remove any extra routes from the state
    // The last visible route should be the focused route, i.e. at current index
    navigation.state.routes.slice(0, navigation.state.index + 1) : navigation.state.routes;

    if (navigation.state.index < navigation.state.routes.length - 1) {
      console.warn('StackRouter provided invalid state, index should always be the last route in the stack.');
    } // Now we need to determine which routes were added and removed


    let {
      openingRouteKeys,
      closingRouteKeys,
      replacingRouteKeys,
      previousRoutes
    } = state;
    const previousFocusedRoute = previousRoutes[previousRoutes.length - 1];
    const nextFocusedRoute = routes[routes.length - 1];

    if (previousFocusedRoute && previousFocusedRoute.key !== nextFocusedRoute.key) {
      // We only need to animate routes if the focused route changed
      // Animating previous routes won't be visible coz the focused route is on top of everything
      const isAnimationEnabled = route => {
        const descriptor = props.descriptors[route.key] || state.descriptors[route.key];
        return descriptor ? descriptor.options.animationEnabled !== false : true;
      };

      if (!previousRoutes.find(r => r.key === nextFocusedRoute.key)) {
        // A new route has come to the focus, we treat this as a push
        // A replace can also trigger this, the animation should look like push
        if (isAnimationEnabled(nextFocusedRoute) && !openingRouteKeys.includes(nextFocusedRoute.key)) {
          // In this case, we need to animate pushing the focused route
          // We don't care about animating any other added routes because they won't be visible
          openingRouteKeys = [...openingRouteKeys, nextFocusedRoute.key];
          closingRouteKeys = closingRouteKeys.filter(key => key !== nextFocusedRoute.key);
          replacingRouteKeys = replacingRouteKeys.filter(key => key !== nextFocusedRoute.key);

          if (!routes.find(r => r.key === previousFocusedRoute.key)) {
            // The previous focused route isn't present in state, we treat this as a replace
            replacingRouteKeys = [...replacingRouteKeys, previousFocusedRoute.key];
            openingRouteKeys = openingRouteKeys.filter(key => key !== previousFocusedRoute.key);
            closingRouteKeys = closingRouteKeys.filter(key => key !== previousFocusedRoute.key); // Keep the old route in state because it's visible under the new route, and removing it will feel abrupt
            // We need to insert it just before the focused one (the route being pushed)
            // After the push animation is completed, routes being replaced will be removed completely

            routes = routes.slice();
            routes.splice(routes.length - 1, 0, previousFocusedRoute);
          }
        }
      } else if (!routes.find(r => r.key === previousFocusedRoute.key)) {
        // The previously focused route was removed, we treat this as a pop
        if (isAnimationEnabled(previousFocusedRoute) && !closingRouteKeys.includes(previousFocusedRoute.key)) {
          // Sometimes a route can be closed before the opening animation finishes
          // So we also need to remove it from the opening list
          closingRouteKeys = [...closingRouteKeys, previousFocusedRoute.key];
          openingRouteKeys = openingRouteKeys.filter(key => key !== previousFocusedRoute.key);
          replacingRouteKeys = replacingRouteKeys.filter(key => key !== previousFocusedRoute.key); // Keep a copy of route being removed in the state to be able to animate it

          routes = [...routes, previousFocusedRoute];
        }
      } else {// Looks like some routes were re-arranged and no focused routes were added/removed
        // i.e. the currently focused route already existed and the previously focused route still exists
        // We don't know how to animate this
      }
    } else if (replacingRouteKeys.length || closingRouteKeys.length) {
      // Keep the routes we are closing or replacing
      routes = routes.slice();
      routes.splice(routes.length - 1, 0, ...state.routes.filter(({
        key
      }) => replacingRouteKeys.includes(key) || closingRouteKeys.includes(key)));
    }

    if (!routes.length) {
      throw new Error("There should always be at least one route.");
    }

    const descriptors = routes.reduce((acc, route) => {
      acc[route.key] = props.descriptors[route.key] || state.descriptors[route.key];
      return acc;
    }, {});
    return {
      routes,
      previousRoutes: navigation.state.routes,
      previousDescriptors: props.descriptors,
      openingRouteKeys,
      closingRouteKeys,
      replacingRouteKeys,
      descriptors
    };
  }

  render() {
    const {
      navigation,
      navigationConfig,
      onPageChangeStart,
      onPageChangeConfirm,
      onPageChangeCancel
    } = this.props;

    const {
      mode = 'card'
    } = navigationConfig,
          config = _objectWithoutProperties(navigationConfig, ["mode"]);

    const {
      routes,
      descriptors,
      openingRouteKeys,
      closingRouteKeys
    } = this.state;
    const headerMode = mode !== 'modal' && _reactNative.Platform.OS === 'ios' ? 'float' : 'screen';
    return /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaProvider, null, /*#__PURE__*/React.createElement(_reactNativeSafeAreaContext.SafeAreaConsumer, null, insets => /*#__PURE__*/React.createElement(_Stack.default, _extends({
      mode: mode,
      insets: insets || DEFAULT_INSETS,
      getPreviousRoute: this.getPreviousRoute,
      getGesturesEnabled: this.getGesturesEnabled,
      routes: routes,
      openingRoutesKeys: openingRouteKeys,
      closingRoutesKeys: closingRouteKeys,
      onGoBack: this.handleGoBack,
      onOpenRoute: this.handleOpenRoute,
      onCloseRoute: this.handleCloseRoute,
      onPageChangeStart: onPageChangeStart,
      onPageChangeConfirm: onPageChangeConfirm,
      onPageChangeCancel: onPageChangeCancel,
      renderHeader: this.renderHeader,
      renderScene: this.renderScene,
      headerMode: headerMode,
      navigation: navigation,
      descriptors: descriptors
    }, config))));
  }

}

var _default = StackView;
exports.default = _default;
//# sourceMappingURL=StackView.js.map
let shownWarnings = [];
const validations = [{
  check: o => o.header === null,
  deprecated: 'header: null',
  updated: 'headerShown: false'
}, {
  check: o => o.header != null && typeof o.header !== 'function',
  deprecated: 'header: <SomeElement />',
  updated: 'header: () => <SomeElement />'
}, {
  check: o => o.headerTitle !== undefined && typeof o.headerTitle !== 'string' && typeof o.headerTitle !== 'function',
  deprecated: 'headerTitle: <SomeElement />',
  updated: 'headerTitle: () => <SomeElement />'
}, ...['headerLeft', 'headerRight', 'headerBackground', 'backImage'].map(p => ({
  check: o => o[p] !== undefined && typeof o[p] !== 'function',
  deprecated: "".concat(p, ": <SomeElement />"),
  updated: "".concat(p, ": () => <SomeElement />")
}))];
export default function validateDeprecatedOptions(options) {
  const warnings = []; // Validate options to show warnings for deprecations

  validations.forEach(v => {
    if (shownWarnings.includes(v.deprecated)) {
      return;
    }

    if (v.check(options)) {
      warnings.push(v);
      shownWarnings.push(v.deprecated);
    }
  });

  if (warnings.length) {
    console.warn("Deprecation in 'navigationOptions':\n".concat(warnings.map(v => "- '".concat(v.deprecated, "' will be removed in a future version. Use '").concat(v.updated, "' instead")).join('\n')));
  }
}
//# sourceMappingURL=validateDeprecatedOptions.js.map
(function() {
  function install(hook, vm) {
    hook.afterEach(function(html, next) {
      // Regular expression to find #color:colorname{text} or #RRGGBB{text}
      const colorRegex = /(?<escape>\\?)(?<colorSpecifier>(?:#color:[a-z]+)|(?<escape>\\?)(?:#[0-9a-fA-F]{6}))\{(?<text>.+?)(?<!\\)}/g;

      // Replace matches with colored spans
      const newHtml = html.replace(colorRegex, (match, escape, colorSpecifier, text) => {
        let colorValue;
        if(escape == "\\"){
          return match;
        }

        if (colorSpecifier.startsWith('#color:')) {
          // It's a color name. Extract the name after '#color:'
          colorValue = colorSpecifier.substring(7); // Remove "#color:" prefix
        } else {
          // It's a hex code.
          if (!/^[0-9a-fA-F]{6}$/.test(colorSpecifier.slice(1))) {
            console.warn("Invalid hex color code:", colorSpecifier, "in:", match);
            return match; // Return the original string if the color is invalid
          }
          colorValue = colorSpecifier;
        }

        return `<span style="color: ${colorValue} !important;">${text}</span>`;
      });

      next(newHtml);
    });
  }

  // Add the plugin to the window
  window.$docsify = window.$docsify || {}; // Ensure $docsify exists
  window.$docsify.plugins = [].concat(window.$docsify.plugins || [], install);  // Simplified plugin registration
})();
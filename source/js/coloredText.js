(function() {
  function install(hook, vm) {
    hook.afterEach(function(html, next) {
      // Regular expression to find #RRGGBB{text}
      const colorRegex = /#([0-9a-fA-F]{6})\{([^}]+?)\}/g; // Modified regex

      // Replace matches with colored spans
      const newHtml = html.replace(colorRegex, (match, hexColor, text) => {
        // Validate the hex color code
        if (!/^[0-9a-fA-F]{6}$/.test(hexColor)) {
          console.warn("Invalid hex color code:", hexColor, "in:", match);
          return match; // Return the original string if the color is invalid
        }

        return `<span style="color: #${hexColor} !important;">${text}</span>`;
      });

      next(newHtml);
    });
  }

  // Add the plugin to the window
  window.$docsify = window.$docsify || {}; // Ensure $docsify exists
  window.$docsify.plugins = [].concat(window.$docsify.plugins || [], install);  // Simplified plugin registration
})();
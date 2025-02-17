(function() {
    function install(hook, vm) {
      hook.afterEach(function(html, next) {
        // Regular expression to find #RRGGBB{text}
        const colorRegex = /#([0-9a-fA-F]{6})\{([^}]+)\}/g;
  
        // Replace matches with colored spans
        const newHtml = html.replace(colorRegex, (match, hexColor, text) => {
          return `<span style="color: #${hexColor};">${text}</span>`;
        });
  
        next(newHtml);
      });
    }
  
    // Add the plugin to the window
    $docsify.plugins = [].concat($docsify.plugins || [], {
      install: install,
      version: '1.0.0' // Optional, but good practice
    });
})();
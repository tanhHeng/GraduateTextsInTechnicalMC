(function() {
    function install(hook, vm) {
      hook.afterEach(function(html, next) {
        // Regular expression to find #color:colorname{text} or #RRGGBB{text}
        const colorRegex = /(?<escape>\\?)(?:(?:&lt;)|(?:\<))color\s(?<color>.+?)(?:(?:&gt;)|(?:\>))/g;
        // console.log(html)
        // Replace matches with colored spans
        const newHtml = html.replace(colorRegex, (match, escape, color) => {

            if (escape == "\\") {
                return match.slice(1, )
            }
            return `<color style="color: ${color}">`;
        });
  
        next(newHtml);
      });
    }
  
    // Add the plugin to the window
    window.$docsify = window.$docsify || {}; // Ensure $docsify exists
    window.$docsify.plugins = [].concat(window.$docsify.plugins || [], install);  // Simplified plugin registration
  })();
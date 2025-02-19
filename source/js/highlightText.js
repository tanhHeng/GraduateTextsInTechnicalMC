(function() {
    function install(hook, vm) {
      hook.beforeEach(function(html, next) {
        // 修改正则表达式，使用具名捕获组
        const highlightRegex = /(?<escape>\\?)==(?<text>[^=]+)==/g;
        const codeBlockRegex = /<pre><code[^>]*>[\s\S]*?<\/code><\/pre>/g;
  
        // 首先移除代码块，避免代码块的内容被替换
        let codeBlocks = [];
        let replacedHtml = html.replace(codeBlockRegex, (match) => {
          codeBlocks.push(match);
          return `CODE_BLOCK_${codeBlocks.length - 1}_END`; // 替换为占位符
        });
  
        const newHtml = replacedHtml.replace(highlightRegex, (match, escape, text) => {
          if (escape === "\\") {
            return match.substring(1); // 去掉转义字符，并返回原始字符串
          }
          return `<mark>${text}</mark>`; // 进行高亮
        });
  
        // 恢复代码块
        let finalHtml = newHtml.replace(/CODE_BLOCK_(\d+)_END/g, (match, index) => {
          return codeBlocks[parseInt(index)];
        });
        next(finalHtml);
      });
    }
  
    // Add the plugin to the window
    window.$docsify = window.$docsify || {}; // Ensure $docsify exists
    window.$docsify.plugins = [].concat(window.$docsify.plugins || [], install); // Simplified plugin registration
  })();
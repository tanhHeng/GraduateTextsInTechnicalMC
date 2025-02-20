(function() {
  function install(hook, vm) {
    hook.beforeEach(function(html, next) {
      // 修改正则表达式，使用具名捕获组
      const escapeRegex = /\\==/g;
      const highlightRegex = /==(?<text>[^=]+)==/g;
      const codeBlockRegex = /<pre><code[^>]*>[\s\S]*?<\/code><\/pre>/g;
      // 首先移除代码块，避免代码块的内容被替换
      let codeBlocks = [];
      let replacedHtml = html.replace(codeBlockRegex, (match) => {
        codeBlocks.push(match);
        return `CODE_BLOCK_${codeBlocks.length - 1}_END`; // 替换为占位符
      });
      // 移除\==，替换为占位符
      replacedHtml = html.replace(escapeRegex,(match)=>{
        return `ESCAPE_BLOCK`;
      });
      // 高亮逻辑
      const newHtml = replacedHtml.replace(highlightRegex, (match, text) => {
        return `<mark>${text}</mark>`; // 进行高亮
      });
      // 恢复代码块
      let finalHtml = newHtml.replace(/CODE_BLOCK_(\d+)_END/g, (match, index) => {
        return codeBlocks[parseInt(index)];
      });
      // 恢复转义==
      finalHtml = newHtml.replace(/ESCAPE_BLOCK/g,(match,index)=>{
        return `==`;
      });
      next(finalHtml);
    });
  }

  // Add the plugin to the window
  window.$docsify = window.$docsify || {}; // Ensure $docsify exists
  window.$docsify.plugins = [].concat(window.$docsify.plugins || [], install); // Simplified plugin registration
})();
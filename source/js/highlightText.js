// This plugin implements a custom syntax for highlighting text in markdowns: ==highlighted text==,
// which will be rendered as <mark>highlighted text</mark>.
(function () {
  function install(hook, _vm) {
    hook.beforeEach(function (html, next) {
      // 修改正则表达式，使用具名捕获组
      const highlightRegex = /==/g;
      const codeBlockRegex = /```[\s\S]*?```/g;

      // 移除代码块
      const codeBlocks = [];
      const htmlNoCodeBlock = html.replace(codeBlockRegex, (match) => {
        codeBlocks.push(match);
        return "CODE_BLOCK_PLACEHOLDER";
      });
      console.log(codeBlocks);
      console.log(html);

      // 高亮逻辑
      let isOpen = true;
      const htmlHighlighted = htmlNoCodeBlock.replace(
        highlightRegex,
        (_match, _text) => {
          if (isOpen) {
            isOpen = false;
            return `<mark>`;
          }
          isOpen = true;
          return `</mark>`;
        }
      );

      // 还原代码块
      let codeBlockIndex = 0;
      const htmlCodeBlockResumed = htmlHighlighted.replace(
        /CODE_BLOCK_PLACEHOLDER/g,
        () => codeBlocks[codeBlockIndex++]
      );

      next(htmlCodeBlockResumed);
    });
  };

  // Add the plugin to the window
  window.$docsify = window.$docsify || {}; // Ensure $docsify exists
  window.$docsify.plugins = [].concat(window.$docsify.plugins || [], install); // Simplified plugin registration
})();
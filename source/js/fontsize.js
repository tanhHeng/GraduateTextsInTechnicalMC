function adjustFontSize(action) {
    const markdownSection = document.querySelector('.markdown-section#main');
    let currentSize = parseFloat(window.getComputedStyle(markdownSection).fontSize);

    if (action === 'increase') {
        currentSize += 1;
    } else if (action === 'decrease') {
        currentSize -= 1;
    }

    markdownSection.style.setProperty('--font-size', `${currentSize}px`);

    localStorage.setItem('font-size', currentSize);
}

function applyInitialStyles() {
    // 从 localStorage 加载保存的字体大小
    const savedSize = localStorage.getItem('font-size');
    if (savedSize) {
        const markdownSection = document.querySelector('.markdown-section#main');
        markdownSection.style.setProperty('--font-size', `${savedSize}px`);
    }
}

document.addEventListener('DOMContentLoaded', applyInitialStyles);

function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
        return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
        if (head.firstChild) {
            head.insertBefore(style, head.firstChild);
        } else {
            head.appendChild(style);
        }
    } else {
        head.appendChild(style);
    }

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

var css = `
.markdown-section {
    --font-size: 15px; 
    font-size: var(--font-size);
}

.markdown-section ol,
.markdown-section p,
.markdown-section ul {
    line-height: calc(var(--font-size) * 2.1);
}

button.font-size-button {
    position: absolute;
    top: 15px;
    left: 55px;
    padding: 6px;
    background-color: #fff;
    cursor: pointer;
    z-index: 1000;
    font-size: 16px;
    border: none;
    border-radius: 5px;
}

button.font-size-button[onclick="adjustFontSize('decrease')"] {
    left: 100px; 
}

.docsify-dark-mode button.font-size-button {
    background-color: var(--dark-base-background);
    color: var(--dark-base-color);
}
`;

styleInject(css);

function install(hook, vm) {
    hook.afterEach(function (html) {
        var fontSizeButtons = `
            <button onclick="adjustFontSize('increase')" class="font-size-button" aria-label="Increase font size" title="Increase font size">A+</button>
            <button onclick="adjustFontSize('decrease')" class="font-size-button" aria-label="Decrease font size" title="Decrease font size">A-</button>
        `;
        return fontSizeButtons + html;
    });
}

$docsify.plugins = [].concat(install, $docsify.plugins);

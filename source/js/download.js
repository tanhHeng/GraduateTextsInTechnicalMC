function createDownloadButton(text, path) {
    const baseUrl = 'https://github.tbedu.top/https://github.com/tanhHeng/GraduateTextsInTechnicalMC/raw/main/';

    const encodedPath = path
        .trim()
        .split('/')
        .map(segment => encodeURIComponent(segment))
        .join('/');

    const downloadUrl = baseUrl + encodedPath;

    return `
    <a href="${downloadUrl}" download class="download-button">
      ${text.trim()}
      <svg class="download-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </svg>
    </a>
  `;
}

var css = `

.download-button {
    display: inline-flex;
    align-items: center;
    padding: 3px 3px;
    font-size: calc(var(--font-size) + 1px);
    color: rgba(66, 185, 131, 0.9) !important;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(69, 160, 73, 0.04);
    border-radius: 8px;
    transition: background-color 0.3s, border-color 0.3s, transform 0.2s;
    margin: 2px 5px;
    cursor: pointer;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.08);
}

.download-button:hover {
    background-color: rgba(0, 0, 0, 0.06);
    border-color: rgba(4, 4, 4, 0.18);
    transform: scale(1.05);
}

.download-button:active {
    background-color: rgba(255, 255, 255, 0.95);
    border-color: #388E3C;
    transform: scale(0.98);
}

.download-button:focus {
    outline: none;
    box-shadow: 0 0 5px 2px rgba(72, 163, 81, 0.1);
}

.download-icon {
  width: calc(var(--font-size) + 7px);
  height: calc(var(--font-size) + 7px);
}
`;
styleInject(css);

function install(hook, vm) {
    hook.afterEach(function (html) {
        const modifiedHtml = html.replace(
            /\[\[([^|\]]+)\|([^\]]+)\]\]/g,
            (match, text, path) => createDownloadButton(text, path)
        );
        return modifiedHtml;
    });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(install, window.$docsify.plugins || []);
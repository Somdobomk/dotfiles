'use strict'

module.exports = {
  config: {
    updateChannel: 'stable',

    // Typography
    fontSize: 16,
    fontFamily: 'GeistMono Nerd Font',
    fontWeight: 'normal',
    fontWeightBold: 'bold',
    lineHeight: 1,
    letterSpacing: 0,
    disableLigatures: false,

    // Cursor
    cursorColor: '#e69875',
    cursorAccentColor: '#272e33',
    cursorShape: 'BLOCK',
    cursorBlink: true,

    // Everforest Dark Hard
    foregroundColor: '#d3c6aa',
    backgroundColor: '#272e33',
    selectionColor: 'rgba(167, 192, 128, 0.30)',
    borderColor: '#414b50',

    // Layout
    padding: '12px 14px',
    workingDirectory: '',

    // Shell
    shell: '',
    shellArgs: ['--login'],
    env: {},

    // Behavior
    bell: false,
    copyOnSelect: false,
    quickEdit: false,
    defaultSSHApp: true,
    macOptionSelectionMode: 'vertical',
    webGLRenderer: true,
    disableAutoUpdates: false,
    screenReaderMode: false,

    // Optional custom styling
    css: '',
    termCSS: '',
  },

  plugins: ['hyper-everforest'],
  localPlugins: [],
  keymaps: {},
}

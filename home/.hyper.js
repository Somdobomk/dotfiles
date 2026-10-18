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
    cursorColor: '#e67e80',
    cursorAccentColor: '#272e33',
    cursorShape: 'BLOCK',
    cursorBlink: true,

    // Everforest Dark Hard, copied from Zed's "Everforest Dark Hard (material)"
    foregroundColor: '#d3c6aa',
    backgroundColor: '#272e33',
    selectionColor: '#4c3743',
    borderColor: '#1e2326',
    colors: {
      black: '#1e2326',
      red: '#e67e80',
      green: '#a7c080',
      yellow: '#dbbc7f',
      blue: '#7fbbb3',
      magenta: '#d699b6',
      cyan: '#83c092',
      white: '#d3c6aa',
      lightBlack: '#859289',
      lightRed: '#e67e80',
      lightGreen: '#a7c080',
      lightYellow: '#dbbc7f',
      lightBlue: '#7fbbb3',
      lightMagenta: '#d699b6',
      lightCyan: '#83c092',
      lightWhite: '#d3c6aa',
    },

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

  plugins: [],
  localPlugins: [],
  keymaps: {},
}

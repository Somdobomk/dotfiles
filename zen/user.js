// Zen reads this on every start.
// Loads chrome/userChrome.css.
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
// Draw right-click menus in the browser instead of with macOS, so
// userChrome.css can color them and the UI font applies. Ignored on Windows.
user_pref("widget.macos.native-context-menus", false);

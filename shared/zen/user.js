// Zen reads this on every start.
// Loads chrome/userChrome.css.
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
// Draw right-click menus in the browser instead of with macOS, so
// userChrome.css can color them and the UI font applies. Ignored on Windows.
user_pref("widget.macos.native-context-menus", false);
// Don't let the window background show through web pages. The Transparent Zen
// mod turned this on, which left pages gray where they have no background.
user_pref("browser.tabs.allow_transparent_browser", false);

-- Rex config, migrated from zellij (~/.config/zellij/config.kdl) and
-- WezTerm (~/.config/wezterm/wezterm.lua).
-- WezTerm's cmd+d, shift+cmd+d, cmd+[, cmd+], shift+cmd+enter, cmd+w and
-- shift+cmd+p already match Rex defaults, so they are not repeated here.
--
-- Shared by macOS and Windows (dotfiles: shared/home/.config/rex). Rex reads it from
-- ~/.config/rex on macOS and %AppData%\rex on Windows. The Gruvbox colors are in
-- gruvbox-dark-wezterm next to this file: import it once per computer in
-- Rex Settings > Themes > Import Theme (Rex keeps imported themes in its own settings).

local windows = package.config:sub(1, 1) == "\\"
local config_file = windows
  and (os.getenv("APPDATA") .. "\\rex\\init.lua")
  or (os.getenv("HOME") .. "/.config/rex/init.lua")

-- wezterm.lua:124-131: cmd+, (ctrl+, on Windows) opens this config in Zed
rex.action{
  name  = "open_config_in_zed",
  title = "Open Config in Zed",
  run   = function(ctx, args)
    if windows then
      rex.exec{ "zed", config_file }
    else
      rex.exec{ "open", "-a", "Zed", config_file }
    end
  end,
}
rex.bind(windows and "ctrl+," or "cmd+,", "open_config_in_zed")

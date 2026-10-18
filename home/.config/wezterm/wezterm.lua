-- WezTerm config. Saving this file reloads it automatically.
-- All options: https://wezterm.org/config/lua/config/index.html
local wezterm = require("wezterm")
local act = wezterm.action
local config = wezterm.config_builder()

-- Theme ----------------------------------------------------------------------

-- Everforest Dark Hard, copied from Zed's "Everforest Dark Hard (material)"
local bg, bg_dim, bg_tab = "#272e33", "#1e2326", "#2e383c"
local fg, grey, green = "#d3c6aa", "#859289", "#a7c080"

config.colors = {
  background = bg,
  foreground = fg,
  cursor_bg = "#e67e80",
  cursor_fg = bg,
  cursor_border = "#e67e80",
  selection_bg = "#4c3743",
  selection_fg = fg,
  split = "#495156",
  ansi = { bg_dim, "#e67e80", green, "#dbbc7f", "#7fbbb3", "#d699b6", "#83c092", fg },
  brights = { grey, "#e67e80", green, "#dbbc7f", "#7fbbb3", "#d699b6", "#83c092", fg },
  tab_bar = {
    inactive_tab_edge = bg_dim,
    active_tab = { bg_color = bg, fg_color = fg },
    inactive_tab = { bg_color = bg_dim, fg_color = grey },
    inactive_tab_hover = { bg_color = bg_tab, fg_color = fg },
    new_tab = { bg_color = bg_dim, fg_color = grey },
    new_tab_hover = { bg_color = bg_tab, fg_color = fg },
  },
}

-- Font -----------------------------------------------------------------------

config.font = wezterm.font("GeistMono Nerd Font Mono")
config.font_size = 16

-- Window ---------------------------------------------------------------------

config.window_padding = { left = 14, right = 14, top = 12, bottom = 12 }

-- Tabs inside the title bar, like Zed
config.window_decorations = "INTEGRATED_BUTTONS|RESIZE"
config.window_frame = {
  font = wezterm.font("GeistMono Nerd Font Mono", { weight = "Medium" }),
  font_size = 13,
  active_titlebar_bg = bg_dim,
  inactive_titlebar_bg = bg_dim,
}

-- Close tabs and windows without asking, even with something running
config.window_close_confirmation = "NeverPrompt"

-- Input ----------------------------------------------------------------------

config.hide_mouse_cursor_when_typing = true

-- Left Option acts as Alt (for shell shortcuts like Alt+B / Alt+F to jump a
-- word); right Option still types special characters like ç and é
config.send_composed_key_when_left_alt_is_pressed = false
config.send_composed_key_when_right_alt_is_pressed = true

-- Keys -----------------------------------------------------------------------

-- Splits and shortcuts that match the defaults in Ghostty and iTerm
config.keys = {
  { key = "d", mods = "CMD", action = act.SplitHorizontal({ domain = "CurrentPaneDomain" }) },
  { key = "d", mods = "CMD|SHIFT", action = act.SplitVertical({ domain = "CurrentPaneDomain" }) },
  { key = "[", mods = "CMD", action = act.ActivatePaneDirection("Prev") },
  { key = "]", mods = "CMD", action = act.ActivatePaneDirection("Next") },
  { key = "Enter", mods = "CMD|SHIFT", action = act.TogglePaneZoomState },
  { key = "w", mods = "CMD", action = act.CloseCurrentPane({ confirm = false }) },
  { key = "p", mods = "CMD|SHIFT", action = act.ActivateCommandPalette },
  -- Open this config in Zed
  {
    key = ",",
    mods = "CMD",
    action = wezterm.action_callback(function()
      wezterm.background_child_process({ "open", "-a", "Zed", wezterm.config_file })
    end),
  },
}

return config

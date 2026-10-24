-- WezTerm config. Saving this file reloads it automatically.
-- All options: https://wezterm.org/config/lua/config/index.html
local wezterm = require("wezterm")
local act = wezterm.action
local config = wezterm.config_builder()

-- Shared with Windows, where the differences are marked "Windows"
local is_windows = wezterm.target_triple:find("windows") ~= nil

-- Windows: start PowerShell 7 instead of cmd.exe
if is_windows then
	config.default_prog = { "pwsh.exe", "-NoLogo" }
end

-- Theme ----------------------------------------------------------------------

-- Gruvbox Dark, matching Obsidian's "Obsidian gruvbox" theme and Zed's "Gruvbox Dark"
local bg, bg_dim, bg_tab = "#282828", "#1d2021", "#3c3836"
local fg, grey, orange = "#ebdbb2", "#928374", "#d65d0e"

config.colors = {
	background = bg,
	foreground = fg,
	cursor_bg = orange,
	cursor_fg = bg,
	cursor_border = orange,
	-- Obsidian's red text selection
	selection_bg = "#8a2621",
	selection_fg = fg,
	split = "#504945",
	ansi = { bg_dim, "#cc241d", "#98971a", "#d79921", "#458588", "#b16286", "#689d6a", "#a89984" },
	brights = { grey, "#fb4934", "#b8bb26", "#fabd2f", "#83a598", "#d3869b", "#8ec07c", fg },
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

config.font = wezterm.font("DankMono Nerd Font")
-- Windows renders the same point size larger than macOS
config.font_size = is_windows and 12 or 20

-- Window ---------------------------------------------------------------------

config.window_padding = { left = 14, right = 14, top = 12, bottom = 12 }

-- No tab bar; Cmd+E lists the open tabs instead
config.enable_tab_bar = false
config.window_decorations = "TITLE|RESIZE"
config.window_frame = {
	font = wezterm.font("DankMono Nerd Font", { weight = "Medium" }),
	font_size = is_windows and 10 or 18,
	active_titlebar_bg = bg_dim,
	inactive_titlebar_bg = bg_dim,
}

-- Leave the title bar text empty instead of showing the running program
wezterm.on("format-window-title", function()
	return " "
end)

-- Close tabs and windows without asking, even with something running
config.window_close_confirmation = "NeverPrompt"

-- Input ----------------------------------------------------------------------

config.hide_mouse_cursor_when_typing = true

-- Left Option acts as Alt (for shell shortcuts like Alt+B / Alt+F to jump a
-- word); right Option still types special characters like ç and é
config.send_composed_key_when_left_alt_is_pressed = false
config.send_composed_key_when_right_alt_is_pressed = true

-- Keys -----------------------------------------------------------------------

-- Splits and shortcuts that match the defaults in Ghostty and iTerm.
-- Windows: Ctrl+Shift stands in for Cmd, since Windows keeps most Win-key
-- shortcuts for itself, and Ctrl alone belongs to the shell.
local cmd = is_windows and "CTRL|SHIFT" or "CMD"
local cmd_shift = is_windows and "CTRL|SHIFT|ALT" or "CMD|SHIFT"

config.keys = {
	{ key = "d",     mods = cmd,       action = act.SplitHorizontal({ domain = "CurrentPaneDomain" }) },
	{ key = "d",     mods = cmd_shift, action = act.SplitVertical({ domain = "CurrentPaneDomain" }) },
	{ key = "[",     mods = cmd,       action = act.ActivatePaneDirection("Prev") },
	{ key = "]",     mods = cmd,       action = act.ActivatePaneDirection("Next") },
	{ key = "Enter", mods = cmd_shift, action = act.TogglePaneZoomState },
	{ key = "w",     mods = cmd,       action = act.CloseCurrentPane({ confirm = false }) },
	{ key = "p",     mods = cmd_shift, action = act.ActivateCommandPalette },
	{ key = "e",     mods = cmd,       action = act.ShowTabNavigator },
	-- Open this config in Zed
	{
		key = ",",
		mods = cmd,
		action = wezterm.action_callback(function()
			local open = is_windows and { "zed" } or { "open", "-a", "Zed" }
			table.insert(open, wezterm.config_file)
			wezterm.background_child_process(open)
		end),
	},
}

return config

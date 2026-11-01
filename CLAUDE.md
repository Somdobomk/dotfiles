# Instructions for agents working in this repo

This repo is used on a Mac and a Windows PC, each with its own Claude Code agent. The agents pass work to each other through a handoff note in the notes vault, so both computers stay matching.

## Start of every session

1. `git pull --rebase` in this repo and in the vault, which is cloned next to it: `~/GitHub/second-brain` on macOS, `F:\GitHub\second-brain` on Windows.
2. Read the newest handoff note, linked as "Latest" at the top of `projects/dotfiles.md` in the vault.
3. Compare it with this computer: what changed on the other one, and whether it needs applying here (re-linking, reloading, installing a tool, copying a Zen file, and so on).

## Then

- **Nothing applies here:** ignore the note and carry on. Don't mention it.
- **Something applies here:** make the changes, check them, then report what was done and what was checked. Stop there. Don't commit or push; the user decides.
- **Something is unclear or risky** (deleting files, changing system settings, installing apps): ask first.

## When you finish work the other computer needs

Update the handoff note, or add a new dated one and move the "Latest" link. Write what changed, what the other side must do, and what you couldn't test. Don't commit or push it unless the user says to.

## Always

- Commit and push only when the user asks. Pull with rebase before pushing.
- Close Zen and Obsidian before editing their config files; both rewrite them on exit.
- On Windows, rerun `windows\install.ps1` after a pull that moves or adds linked folders.

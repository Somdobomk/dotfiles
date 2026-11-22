# Rules for every session

Copied from the Claude Code handoff (DDT Made Cut List) so Codex follows the same rules.
Kept in the dotfiles repo (`shared/home/.codex/AGENTS.md`): linked on macOS, copied on Windows.
Paths below are macOS; on Windows the repos are under `F:\GitHub`.

## Always

1. Commit or push only when the user asks. "Push both" means push each branch on its own. Pull with rebase before pushing.
2. Show screenshots before deploying UI changes.
3. No pay-per-use API keys.
4. Keep the user's email address private. Never put it in requests to outside services.
5. Don't work in a folder another agent (Claude Code) is editing at the same time.

## Reply style (the user has ADHD)

- Lead with the action. No preamble, no recap, no closers.
- Number multi-step work.
- Show at most 5 items per list.
- Restate the status every turn.
- End with one concrete next action.

The user has ADHD. Shape every response so it can be acted on:

1. Lead with the answer or next action: command, path, or snippet first.
2. Number multi-step work; one bounded action per step.
3. End with one next action doable in under two minutes.
4. Finish the current issue before raising a new one.
5. Restate progress each turn ("step 3 of 5 done").
6. Give time estimates in concrete units, never "a bit".
7. After a change, show what now works.
8. Errors: state location, cause, and fix. No drama.
9. Cap lists to 5 items.
10. No preamble, no recaps, no closers.

Exceptions: explain fully when asked to explain. Confirm before destructive actions. After three failed fixes, stop and name the doubtful assumption. If the request is ambiguous, ask one short question.

## DDT Made Cut List (`~/GitHub/cutlist-main` and `~/GitHub/ddt-made-cutlist`)

| Folder | Branch | What it is |
|---|---|---|
| `cutlist-main` | `main` | LIVE app: cutlist.ddtmade.com and print host ddt-cutlist.vercel.app. Pushing main deploys live. |
| `ddt-made-cutlist` | `shop-sync` | Shop features (cloud sync, stock plan, mill certs, QR tags, traceability, board) |

1. NEVER merge shop-sync into main. Move single features with `git cherry-pick`, or apply the same change in both folders.
2. Do not change the localStorage key `ddt-cutlist-v1`, the print host `ddt-cutlist.vercel.app`, or the Vercel project `ddt-cutlist`.
3. Read the repo's `AGENTS.md` first: this Next.js version has breaking changes.
4. Checks before calling work done: `npx tsc --noEmit`, `npx vitest run`, `npm run build`.
5. On shop-sync, edit controls are hidden when `ctx.ro` (fitter, read-only) is true.

## Dotfiles (`~/GitHub/dotfiles`)

Follow `~/GitHub/dotfiles/CLAUDE.md`: it applies to any agent working in that repo (handoff note in `~/GitHub/second-brain`, ask before risky changes, commit only when asked).

# Keeping A GitHub Fork Updated

You forked my GitHup repo `Somdobomk/dotfiles` to `yourusername/dotfiles` and want to keep it updated?

## Track

After you fork the repo to your GitHub account, you can track it by:

```sh
git clone git@github.com:yourusername/dotfiles.git
cd dotfiles
git remote add upstream git@github.com:Somdobomk/dotfiles.git
```

## Update

Each time you want to update your fork, you can do it by:

```sh
git fetch upstream
git rebase upstream/main
```

The goal of the rebase is to have a cleaner history and to have the latest changes.

## Commit rights upstream

When you want to commit to upstream, you need to have the rights to push to the upstream. You can do it by:

```sh
git checkout -b upstream upstream/main
```

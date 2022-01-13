#!/bin/sh

# if [[ $(git status -s) ]]
# then
#     echo "The working directory is dirty. Please commit any pending changes."
#     exit 1;
# fi
git fetch

echo "Deleting old publication"
rm -rf dist
mkdir dist
git worktree prune
rm -rf .git/worktrees/dist

echo "Checking out dist branch into publish"
git worktree add -B dist new origin/new

echo "Removing existing files"
rm -rf dist/*

echo "Generating dist"
./node_modules/.bin/webpack

echo "Updating dist branch"
cd dist && git add --all && git commit -m "Publishing to dist (publish.sh)" && git push origin dist --force
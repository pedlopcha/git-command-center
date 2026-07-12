/**
 * Git Command Center — content data
 * ----------------------------------
 * This is the single source of truth for every case on the site.
 * To add, remove, or edit a command: edit this file only. Everything
 * else (nav, search, cards) renders itself from what's in here.
 *
 * Shape:
 * {
 *   id, title, description, cases: [
 *     {
 *       number,        // string, matches the reference numbers ("12", "B1")
 *       title,
 *       description,
 *       commands: [ { type: 'shell'|'file', code, filename? } ],
 *       tip,           // optional short string
 *       warning,       // optional { level: 'caution'|'danger', text }
 *       fileExample,   // optional { filename, content } - a labeled file block
 *     }
 *   ]
 * }
 *
 * After editing, run `npm run validate` to check for typos or missing fields.
 */
(function (global) {
  'use strict';

  const gitData = [
    {
      id: 'getting-started',
      title: 'Getting Started & Setup',
      description: `The first commands you run before you can do anything else with a repository.`,
      cases: [
        {
          number: '1',
          title: 'Clone a repository',
          description: `Download a full copy of a remote repository — history included — into a new folder on your machine.`,
          commands: [
            { type: 'shell', code: `git clone <url>` }
          ]
        },
        {
          number: '2',
          title: 'Initialize a new repo',
          description: `Turn a plain folder into a git repository so it can start tracking history.`,
          commands: [
            { type: 'shell', code: `git init` }
          ]
        },
        {
          number: '3',
          title: 'Set your git identity',
          description: `Attach your name and email to every commit you make. Only needs to be done once per machine.`,
          commands: [
            { type: 'shell', code: `git config --global user.name "Your Name"` },
            { type: 'shell', code: `git config --global user.email "you@example.com"` }
          ]
        },
        {
          number: '4',
          title: 'Check repository status',
          description: `See what's changed, what's staged, and what's untracked, right now. The command you'll run more than any other.`,
          commands: [
            { type: 'shell', code: `git status` }
          ]
        }
      ]
    },

    {
      id: 'daily-workflow',
      title: 'Daily Workflow',
      description: `The save-and-share loop you'll repeat all day: change something, review it, commit it, share it.`,
      cases: [
        {
          number: '5',
          title: 'See what changed',
          description: `Review your edits line by line before you stage them.`,
          commands: [
            { type: 'shell', code: `git diff` }
          ],
          tip: `Already staged a file? Use git diff --staged to see what's about to be committed instead.`
        },
        {
          number: '6',
          title: 'Stage changes',
          description: `Mark files to be included in your next commit. Staging is a holding area — a preview of what you're about to save.`,
          commands: [
            { type: 'shell', code: `git add <file>` },
            { type: 'shell', code: `git add .` }
          ]
        },
        {
          number: '7',
          title: 'Commit staged changes',
          description: `Save a labeled snapshot of everything currently staged. Write messages that explain why, not just what.`,
          commands: [
            { type: 'shell', code: `git commit -m "message"` }
          ]
        },
        {
          number: '8',
          title: 'Push commits to remote',
          description: `Upload your local commits so the rest of the team can see them.`,
          commands: [
            { type: 'shell', code: `git push` }
          ],
          tip: `First time pushing a new branch? Use git push -u origin <branch> once — after that, plain git push remembers where to send it.`
        },
        {
          number: '9',
          title: 'Pull the latest changes',
          description: `Download other people's commits and merge them into your current branch in one step.`,
          commands: [
            { type: 'shell', code: `git pull` }
          ]
        },
        {
          number: '10',
          title: 'View commit history',
          description: `See the timeline of past commits, condensed to one line each with the branch structure sketched alongside it.`,
          commands: [
            { type: 'shell', code: `git log --oneline --graph --all` }
          ]
        }
      ]
    },

    {
      id: 'branching',
      title: 'Branching',
      description: `Branches let you work on something new without touching main until it's ready.`,
      cases: [
        {
          number: '11',
          title: 'List branches',
          description: `See every branch that exists in your local repository, with a marker on whichever one you're currently on.`,
          commands: [
            { type: 'shell', code: `git branch` }
          ],
          tip: `Add -a to also see remote-tracking branches you haven't checked out locally.`
        },
        {
          number: '12',
          title: 'Create a new branch',
          description: `Start isolated work on its own line of history, so main stays untouched while you build.`,
          commands: [
            { type: 'shell', code: `git switch -c <name>` },
            { type: 'shell', code: `git checkout -b <name>` }
          ],
          tip: `Both commands do the same thing. git switch is the newer, more focused command; git checkout is the classic all-purpose one you'll still see everywhere.`
        },
        {
          number: '13',
          title: 'Switch branches',
          description: `Move your working directory to a different, already-existing branch.`,
          commands: [
            { type: 'shell', code: `git switch <name>` },
            { type: 'shell', code: `git checkout <name>` }
          ]
        },
        {
          number: '14',
          title: 'Rename the current branch',
          description: `Fix a typo or improve the name of the branch you're currently on.`,
          commands: [
            { type: 'shell', code: `git branch -m <new-name>` }
          ]
        },
        {
          number: '15',
          title: 'Delete a branch',
          description: `Clean up a branch once its work has been merged elsewhere.`,
          commands: [
            { type: 'shell', code: `git branch -d <name>` }
          ],
          tip: `git branch -d refuses to delete a branch with unmerged work. Use -D (capital) to force it if you're sure.`
        }
      ]
    },

    {
      id: 'merging-rebasing',
      title: 'Merging & Rebasing',
      description: `Two different ways to bring one branch's work into another — same goal, different results in your history.`,
      cases: [
        {
          number: '16',
          title: 'Merge a branch',
          description: `Bring another branch's commits into the branch you're currently on, preserving both histories exactly as they happened.`,
          commands: [
            { type: 'shell', code: `git merge <branch>` }
          ]
        },
        {
          number: '17',
          title: 'Resolve a merge conflict',
          description: `When git can't automatically combine two changes to the same lines, it pauses and marks the exact spot in the file for you to decide.`,
          commands: [
            { type: 'shell', code: `git add <file>` },
            { type: 'shell', code: `git commit` }
          ],
          tip: `That's the sequence for a conflict during a merge. Mid-rebase, finish with git rebase --continue instead of git commit.`,
          fileExample: {
            filename: 'example.js — mid-conflict',
            content: `<<<<<<< HEAD\nconst greeting = "Hello there";\n=======\nconst greeting = "Hi!";\n>>>>>>> feature-branch`
          }
        },
        {
          number: '18',
          title: 'Rebase onto another branch',
          description: `Replay your branch's commits on top of another branch instead, producing a straight, linear history with no merge commit.`,
          commands: [
            { type: 'shell', code: `git rebase <branch>` }
          ],
          warning: {
            level: 'caution',
            text: `Rewrites your commits' history. Avoid rebasing a branch that other people have already pulled — revert or merge instead.`
          }
        },
        {
          number: '19',
          title: 'Abort a merge or rebase',
          description: `Back out cleanly if a merge or rebase goes sideways, returning to exactly how things were before you started.`,
          commands: [
            { type: 'shell', code: `git merge --abort` },
            { type: 'shell', code: `git rebase --abort` }
          ]
        }
      ]
    },

    {
      id: 'undoing-mistakes',
      title: 'Undoing Mistakes',
      description: `Everyone undoes something eventually. The right command depends on what you're undoing, and whether it's been shared yet.`,
      cases: [
        {
          number: '20',
          title: 'Discard changes to a file',
          description: `Throw away unstaged edits to a file, reverting it back to its last committed version.`,
          commands: [
            { type: 'shell', code: `git restore <file>` },
            { type: 'shell', code: `git checkout -- <file>` }
          ]
        },
        {
          number: '21',
          title: 'Unstage a file',
          description: `Remove a file from the staging area without touching its actual contents on disk.`,
          commands: [
            { type: 'shell', code: `git restore --staged <file>` },
            { type: 'shell', code: `git reset <file>` }
          ]
        },
        {
          number: '22',
          title: 'Fix your last commit',
          description: `Change the message or add a forgotten file to the commit you just made, instead of creating a new one.`,
          commands: [
            { type: 'shell', code: `git commit --amend` }
          ],
          tip: `Only amend commits you haven't pushed yet. Amending a commit others have already pulled creates conflicting history for them.`
        },
        {
          number: '23',
          title: 'Undo a commit safely',
          description: `Create a brand-new commit that reverses an earlier one, without deleting or rewriting anything. Safe to use on shared history.`,
          commands: [
            { type: 'shell', code: `git revert <commit>` }
          ]
        },
        {
          number: '24',
          title: 'Reset to an earlier commit',
          description: `Rewind your current branch to an earlier point in its history.`,
          commands: [
            { type: 'shell', code: `git reset --hard <commit>` }
          ],
          warning: {
            level: 'danger',
            text: `Permanently discards uncommitted work and every commit after this point. Use --soft or --mixed if you want to keep the changes, and git revert instead if the commit is already shared.`
          }
        }
      ]
    },

    {
      id: 'stashing',
      title: 'Stashing',
      description: `A shelf for unfinished work — set changes aside without committing them, so you can switch tasks and come back later.`,
      cases: [
        {
          number: '25',
          title: 'Shelve changes temporarily',
          description: `Set aside your uncommitted changes and return to a clean working directory, so you can switch tasks without committing half-finished work.`,
          commands: [
            { type: 'shell', code: `git stash` }
          ],
          tip: `Add -u to also stash new, untracked files — by default they're left behind.`
        },
        {
          number: '26',
          title: 'Reapply stashed changes',
          description: `Bring your most recently shelved changes back into the working directory.`,
          commands: [
            { type: 'shell', code: `git stash pop` }
          ],
          tip: `git stash pop removes the stash once it's reapplied. Use git stash apply instead if you want to keep it in the list too.`
        },
        {
          number: '27',
          title: 'List all stashes',
          description: `See everything currently shelved, most recent first.`,
          commands: [
            { type: 'shell', code: `git stash list` }
          ]
        },
        {
          number: '28',
          title: 'Delete a stash',
          description: `Permanently remove a shelved set of changes you no longer need.`,
          commands: [
            { type: 'shell', code: `git stash drop` }
          ],
          tip: `git stash clear removes every stash at once — use it carefully.`
        }
      ]
    },

    {
      id: 'remotes-syncing',
      title: 'Remotes & Syncing',
      description: `Commands for managing where your repository sends and receives work.`,
      cases: [
        {
          number: '29',
          title: 'View configured remotes',
          description: `See which remote repository (or repositories) your local repo is connected to.`,
          commands: [
            { type: 'shell', code: `git remote -v` }
          ]
        },
        {
          number: '30',
          title: 'Add a remote',
          description: `Point a local repository at a remote URL, usually right after git init.`,
          commands: [
            { type: 'shell', code: `git remote add origin <url>` }
          ]
        },
        {
          number: '31',
          title: 'Download without merging',
          description: `Check what's new upstream and download it, without touching your current working files. Review it before deciding to merge.`,
          commands: [
            { type: 'shell', code: `git fetch` }
          ]
        }
      ]
    },

    {
      id: 'history-inspection',
      title: 'History & Inspection',
      description: `Digging into what happened, when, and who's responsible.`,
      cases: [
        {
          number: '32',
          title: 'Show a specific commit',
          description: `See exactly what changed in one commit — the full diff, message, author, and date.`,
          commands: [
            { type: 'shell', code: `git show <commit>` }
          ]
        },
        {
          number: '33',
          title: 'See who last touched a line',
          description: `Trace every line in a file back to the commit and author that last changed it.`,
          commands: [
            { type: 'shell', code: `git blame <file>` }
          ]
        },
        {
          number: '34',
          title: 'Search commit history',
          description: `Find a commit by searching for a keyword in its commit message.`,
          commands: [
            { type: 'shell', code: `git log --grep="keyword"` }
          ],
          tip: `Combine with --author="name" to narrow results down to one person's commits too.`
        }
      ]
    },

    {
      id: 'tags-releases',
      title: 'Tags & Releases',
      description: `Marking specific commits as meaningful points in history — usually releases.`,
      cases: [
        {
          number: '35',
          title: 'Create a tag',
          description: `Mark the current commit as a named, permanent point in history — typically a release version.`,
          commands: [
            { type: 'shell', code: `git tag -a v1.0.0 -m "message"` }
          ]
        },
        {
          number: '36',
          title: 'Push tags to remote',
          description: `Tags don't travel with a normal push — share them with the team explicitly.`,
          commands: [
            { type: 'shell', code: `git push origin --tags` }
          ],
          tip: `To push just one tag instead of all of them, use git push origin <tagname>.`
        },
        {
          number: '37',
          title: 'List tags',
          description: `See every tag that exists in the repository.`,
          commands: [
            { type: 'shell', code: `git tag` }
          ]
        }
      ]
    },

    {
      id: 'repo-clean',
      title: 'Keeping the Repo Clean',
      description: `Controlling exactly what git tracks, so generated files and secrets never end up in history.`,
      cases: [
        {
          number: '38',
          title: 'Ignore files & folders',
          description: `Tell git to stop paying attention to certain files or folders entirely — build output, dependencies, secrets, OS clutter. List one pattern per line in a file named .gitignore at the root of your repo.`,
          commands: [],
          fileExample: {
            filename: '.gitignore',
            content: `# Dependencies\nnode_modules/\n\n# Environment variables\n.env\n.env.local\n\n# Logs\n*.log\nnpm-debug.log*\n\n# OS-generated files\n.DS_Store\nThumbs.db\n\n# Editor / IDE folders\n.vscode/\n.idea/\n\n# Build output\ndist/\nbuild/`
          },
          tip: `.gitignore only stops untracked files from being added. If a file is already tracked, see case 39 to stop tracking it first.`
        },
        {
          number: '39',
          title: 'Stop tracking a file',
          description: `Remove a file from git's tracking without deleting it from your disk — useful when something was added before it was put in .gitignore.`,
          commands: [
            { type: 'shell', code: `git rm --cached <file>` }
          ],
          tip: `Add the file to .gitignore right after, or git will want to track it again next time you run git add.`
        }
      ]
    },

    {
      id: 'bonus',
      title: 'Good to Know',
      description: `Not needed daily, but genuinely useful once you know they exist.`,
      cases: [
        {
          number: 'B1',
          title: 'Cherry-pick a commit',
          description: `Apply one specific commit from another branch onto your current branch, without merging everything else.`,
          commands: [
            { type: 'shell', code: `git cherry-pick <commit>` }
          ]
        },
        {
          number: 'B2',
          title: `Recover "lost" commits`,
          description: `Find commits that seem to have disappeared after a bad reset or a deleted branch. Git rarely deletes anything right away.`,
          commands: [
            { type: 'shell', code: `git reflog` }
          ]
        },
        {
          number: 'B3',
          title: 'Peek at an old commit',
          description: `Temporarily view the entire repository exactly as it looked at an earlier commit.`,
          commands: [
            { type: 'shell', code: `git checkout <commit-hash>` }
          ],
          tip: `This leaves you in a "detached HEAD" state. Run git switch - (or git checkout <branch-name>) to get back to your branch when you're done looking.`
        },
        {
          number: 'B4',
          title: 'Pull requests & merge requests',
          description: `Not a native git command — this is a feature of platforms like GitHub, GitLab, and Bitbucket, built on top of git. It's how most teams review a branch's changes before merging it into main, through the platform's web interface rather than the command line.`,
          commands: []
        }
      ]
    }
  ];

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = gitData;
  } else {
    global.gitData = gitData;
  }
})(typeof window !== 'undefined' ? window : globalThis);

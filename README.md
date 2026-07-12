# Git Command Center

A local, searchable reference for the git commands you actually use — 43 commands
across 11 categories, each with a plain-English explanation, the exact command to
run, and diagrams for the concepts that benefit from one (the working-directory→
staging→local→remote flow, branching, merge vs. rebase, and an undo decision guide).

Pure Node.js + Express, static HTML/CSS/JS, no database, no build step. Built to
run on a Raspberry Pi and be reached from other devices on your home network.

## 1. Install

Copy this whole folder to your Pi, then, inside it:

```bash
npm install
```

This installs one dependency (Express).

## 2. Run

```bash
npm start
```

You'll see:

```
Git Command Center running on port 8080
```

From any phone, laptop, or tablet on the same Wi-Fi/LAN as the Pi, open:

```
http://<your-pi's-static-ip>:8080
```

Since you've given the Pi a static IP, that address never changes — worth
bookmarking once on your devices.

The server listens on **8080** by default, since you mentioned 3000 and 80 are
already taken. To use a different port:

```bash
PORT=8081 npm start
```

## 3. Editing the content

Everything — every case, explanation, command, tip, and warning — lives in one
file: **`public/js/data.js`**. The page, search, and nav all render themselves
from it, so you never need to touch HTML to add or change a command.

Each entry looks like this:

```js
{
  number: '12',
  title: 'Create a new branch',
  description: 'Start isolated work on its own line of history...',
  commands: [
    { type: 'shell', code: 'git switch -c <name>' }
  ],
  tip: 'Optional short callout, shown under the commands.'
}
```

After editing, sanity-check the file:

```bash
npm run validate
```

This catches typos like a missing title or a duplicate case number before you
reload the page.

The five diagrams live directly in `public/index.html` as hand-built SVG — those
aren't data-driven, since there's no clean way to generate a diagram from a data
file. If you want one changed, that's the file to edit.

## 4. Keeping it running permanently (optional)

Right now, the site stops if you close the terminal or reboot the Pi. Once you've
confirmed everything looks right, you can make it start automatically using the
provided systemd service:

```bash
sudo cp deployment/git-reference.service /etc/systemd/system/
sudo nano /etc/systemd/system/git-reference.service   # fix User= and WorkingDirectory=
sudo systemctl daemon-reload
sudo systemctl enable --now git-reference
```

Check it's running with `sudo systemctl status git-reference`, and see logs with
`journalctl -u git-reference -f`. Happy to walk through this live if you'd rather
do it together once the site's live and looking good.

## Project structure

```
git-command-center/
├── server.js                     Express server
├── package.json
├── public/
│   ├── index.html                Page structure + the 5 SVG diagrams
│   ├── css/styles.css
│   ├── js/
│   │   ├── data.js               <- all content lives here
│   │   └── script.js             rendering, search, copy buttons, theme toggle
│   └── fonts/                    self-hosted, so the Pi never needs internet
├── scripts/validate-data.js      run via `npm run validate`
└── deployment/
    └── git-reference.service     optional, for auto-start on boot
```

## Troubleshooting

- **Can't reach it from another device**: confirm both devices are on the same
  network, and that the Pi doesn't have a firewall blocking port 8080 (Raspberry
  Pi OS has none enabled by default).
- **Copy button says "Ctrl+C to copy" instead of copying automatically**: this is
  expected over plain `http://` on a LAN address — browsers only allow automatic
  clipboard access on `https://` or `localhost`. The button still selects the
  text so Ctrl+C works immediately.
- **Port 8080 also taken**: run with `PORT=8081 npm start` (or any free port).

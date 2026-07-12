/**
 * Sanity-checks public/js/data.js after you edit it.
 * Run with: npm run validate
 */
const path = require('path');
const gitData = require(path.join(__dirname, '..', 'public', 'js', 'data.js'));

let errors = 0;
let warnings = 0;
const seenNumbers = new Set();
const seenIds = new Set();

function fail(msg) {
  console.error('ERROR:', msg);
  errors++;
}
function warn(msg) {
  console.warn('WARNING:', msg);
  warnings++;
}

if (!Array.isArray(gitData) || gitData.length === 0) {
  fail('data.js should export a non-empty array of categories.');
} else {
  gitData.forEach((category, ci) => {
    const where = `category[${ci}]`;
    if (!category.id) fail(`${where} is missing an "id"`);
    else if (seenIds.has(category.id)) fail(`${where} has a duplicate id "${category.id}"`);
    else seenIds.add(category.id);

    if (!category.title) fail(`${where} (${category.id || '?'}) is missing a "title"`);
    if (!category.description) warn(`${where} (${category.id || '?'}) has no "description"`);
    if (!Array.isArray(category.cases) || category.cases.length === 0) {
      fail(`${where} (${category.id || '?'}) has no cases`);
      return;
    }

    category.cases.forEach((c, cj) => {
      const label = `case "${c.number || '?'}" in ${category.id || where}[${cj}]`;
      if (!c.number) fail(`${label}: missing "number"`);
      else if (seenNumbers.has(c.number)) fail(`${label}: duplicate case number "${c.number}"`);
      else seenNumbers.add(c.number);

      if (!c.title) fail(`${label}: missing "title"`);
      if (!c.description) fail(`${label}: missing "description"`);

      const hasCommands = Array.isArray(c.commands) && c.commands.length > 0;
      const hasFileExample = !!c.fileExample;
      if (!hasCommands && !hasFileExample) {
        warn(`${label}: has no commands and no fileExample - is that intentional? (ok for info-only cases)`);
      }

      (c.commands || []).forEach((cmd, k) => {
        if (!cmd.code) fail(`${label}: commands[${k}] is missing "code"`);
      });

      if (c.fileExample) {
        if (!c.fileExample.filename) fail(`${label}: fileExample is missing "filename"`);
        if (!c.fileExample.content) fail(`${label}: fileExample is missing "content"`);
      }

      if (c.warning && !['caution', 'danger'].includes(c.warning.level)) {
        fail(`${label}: warning.level must be "caution" or "danger", got "${c.warning.level}"`);
      }
    });
  });
}

console.log('');
console.log(`Checked ${gitData.length} categories, ${seenNumbers.size} cases.`);
if (errors === 0) {
  console.log(`Looks good${warnings ? ` (${warnings} warning${warnings === 1 ? '' : 's'})` : ''}.`);
  process.exit(0);
} else {
  console.log(`${errors} error${errors === 1 ? '' : 's'} found - fix these before deploying.`);
  process.exit(1);
}

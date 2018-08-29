'use strict';

const fs = require('fs');
const path = require('path');
const md = require('spec-md');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const entrypoint = path.resolve(__dirname, '../spec/CarbonDesignSystem.md');
const filename = path.resolve(__dirname, '../public/index.html');
const head = `
<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Serif:400,400i,700" rel="stylesheet">
<style>
body {
  font-family: 'IBM Plex Serif', serif;
}
pre[class*="language-"], .spec-string, code {
  font-family: 'IBM Plex Mono', monospace;
}
</style>
`;

async function build() {
  const html = await md.html(entrypoint, {
    head,
  });

  await writeFile(filename, html);
}

build().catch(error => {
  console.error(error);
});

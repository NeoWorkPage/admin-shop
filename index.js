#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const filePath = process.argv[2];

if (!fs.existsSync(filePath)) {
  console.log('Can\'t read commit message.');
  process.exit(1);
}

const message = fs.readFileSync(filePath, 'utf8');
const russian = /([а-яА-Я]+)/g;
const short = /^([a-zA-Z0-9_-]){0,15}$/g;


if (message.match(russian)) {
  console.log(chalk.red('Don\'t use russian for commit message.'));
  process.exit(3);
} else if (message.match(short)) {
  console.log(chalk.red('Commit message is too short, try to be more descriptive.'));
  process.exit(3);
} else {
  process.exit(0);
}

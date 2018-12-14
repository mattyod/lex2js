# [lex](https://aws.amazon.com/lex/)2js

> Export Amazon Lex bot configurations to code

## Usage

```javascript
const lex2js = require('lex2js');

const params = {
  sourceBotPath: `${__dirname}/myBot.json`,
  distFolderPath: '${__dirname}/src',
  botName: 'myLexBot',
  cleanUpJSONFile: true,
  accounts: {
    qa: '1234567890',
    prod: '0123456789',
  },
};

lex2js.parse(params);
lex2js.pack(params);
```

Converts a JSON Lex file into JS code with imports for intents, slots and slotTypes in their own respective folders.

### Param definitions:

- **sourceBotPath:** path to an exported Lex JSON file.
- **distFolderPath:** destination folder for the output bot, intents, slots and slotTypes.
- **botName:** name of your Lex bot
- **cleanUpJSONFile:** Boolean, default true. Delete the bot JSON file after creating a .zip with it (lex2.js)
- **accounts:** Object. Containing account names and numbers. These will be matched in lambda uri references and replaced with a dynamic reference to `process.argv[2]`. The account names will also be used for output folders when creating .zip files with the `pack` command.

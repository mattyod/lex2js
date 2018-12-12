# [lex](https://aws.amazon.com/lex/)2js

> Export Amazon Lex bot configurations to code

## Usage

```javascript
const lex2js = require('lex2js');

const params = {
  sourceBotPath: `${__dirname}/myBot.json`,
  distFolderPath: '${__dirname}/src',
};

lex2js.parse(params);
```

Converts a JSON Lex file into JS code with imports for intents, slots and slotTypes in their own respective folders.

### Param definitions:

- **sourceBotPath:** path to an exported Lex JSON file.
- **distFolderPath:** destination folder for the output bot, intents, slots and slotTypes.

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

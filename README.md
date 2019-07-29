# CXPS Online Test

Simple Online test for interviews in CustomerXPs


## Building

```bash
docker-compose -f compose.yml build
```

## Deploying

Change the port to be exposed if needed in compose.yml file.

```bash
docker-compose -f compose.yml up -d
```

## Creating new tests
 
 - While creating new tests, name the file of the questions 
   in camel case (eg. `new_eng_test.json`). UI will handle to make it look appropriately.

 - Supported types of questions:
   - `option` (single correct with options) **default**
   - `multi` (multiple correct with options)
   - `code` (big text box to enter code)
   - `text` (big text box to enter content)
 - Making `optionIsCode` as true will display options as code instead of text.
   
 - `image` tag only takes name of the file that exists in ext-images **optional**
 - `code` takes the string that needs to be represented as code block on UI. **optional**
 - `lang` related to the language `code` is written in. Used for highlighting code.
 - `answer` is an integer if type of question is single option answer, 
    array if type is of multiple choice.
 - Note: `answer` needs 0 index based.

## Notes
 - Currently supported languages in code blocks
   - Java
   - Javascript
   - SQL
   - C-like 
 - To add support for more languages in code blocks, 
   update the prism library by downloading it from this
   [link](https://prismjs.com/download.html#themes=prism-tomorrow&languages=clike+javascript+java+sql)
   

## TODO:
 - Add pagination in list submissions page
 - Replace with textarea with CodeMirror for code submission.

Done:
 - Evaluate the answers
 - Create a Page to view evaluation.
 - (not req) Maybe move from checkbox to collection lists .
 - Make options as code.
 - Fix errors related to submission of wrong answers.
 - Sort submissions based on date instead of name
 - Fix the error modal for materialize UI.
 - Sanitize the code submitted by candidate to make sure that XSS is prevented.
 - Store test in local storage until submitted, to prevent test loss.
 

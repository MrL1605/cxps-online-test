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
   - `text` (big text box to enter code or content)
   
 - `image` tag only takes name of the file that exists in ext-images **optional**
 - `code` takes the string that needs to be represented as code block on UI. **optional**
 - `lang` related to the language `code` is written in. Used for highlighting code.

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
 - Make options as code.
 - Evaluate the answers
 - Create a Page to view evaluation.
 - Store test in local storage until submitted, to prevent test loss.
 

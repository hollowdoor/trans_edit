trans-edit
====

View, or edit a file.

Install
---

`npm install trans-edit`

## Example

```javascript
const view = require('trans-edit');

(async function edit(){
    try{
        let viewing = view('afile', {app: 'gedit'})
        const {content, type} = await viewing.read();
        //If the file is image don't log
        if(!/^image/.test(type)){
            console.log('type ', type);
            console.log(content);
        }
    }catch(err){
        console.error(err);
    }
})();
```

### The options

```javascript
//Showing defaults
view('file_name', {
    //Wait for the opening program to close
    wait: true,
    //What app should open the file?
    //If this is null the system default is tried
    app: null,
    //Do, or do not open with the app?
    //If false it just reads the file into the temp directory.
    open: true,
    //Should the temp file name be unique?
    //This will help prevent race conditions.
    uniq: false,
    //Instead of reading a file, or url
    //use this value.
    //This value can be a
    //stream, promise, or primitive value.
    value: null
});
```


## About

### `trans-edit` does these operations:

1. Moves the file to a temp directory
2. Opens a program for viewing the file
3. You can save the file if you are editing
4. `trans-edit` resolves to the edited file when the program closes using `view.read()`, or `view.stream()`.

### view.read(options)

Resolve to the edited file. `view.read()` returns a promise that resolves to an object.

```javascript
const {
    //The string, or binary contents of the file
    content,
    //The pathname of the saved file
    pathname,
    //The mime type of the file
    type
} = viewing.read();
```

`options` are the same as [fs.readFile()](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback).

### view.stream()

Resolve the edited file to a readable stream. `view.stream()` returns a promise that resolves to a stream.

### Use got to post back an edit

If the name of the file looks like a url the file is scraped from the internet before it is opened by `trans-edit`.

```javascript
const view = require('trans-edit');
const got = require('got');
const FormData = require('form-data');

view('https://example.com/an_image.png', {
    //Use gimp to edit the image
    app: 'gimp'
})
.stream()
.then(source=>{
    //gimp is closed
    const form = new FormData();
    //Send the source stream
    form.append('edited_image', source);
    got.post('https://example.com/', {
        body: form
    });
});
```

### Also see

[open-editor](https://github.com/sindresorhus/open-editor) for a similar kind of functionality.

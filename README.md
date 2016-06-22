compile-compass
=========

> Compile-compass is a library that provides binding for Node.js to [LibSass](https://github.com/sass/libsass), the C version of the popular stylesheet preprocessor, Sass via [node-sass](https://github.com/sass/node-sass).
> It allows you to use compass features and compile .scss files to css at incredible speed.


## Install
Install globally
```bash
$ npm install -g compile-compass
```

## Usage
```bash
Usage: compile-compass [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -c, --config [type]  specify the location of the configuration file explicitly
    -w, --watch          compile sass stylesheets to css when they change
```
examples
```bash
$ compile-compass --help
$ compile-compass --version
    
# compile 
$ compile-compass --config path/to/config.json

# watch for changes
$ compile-compass --watch --config path/to/config.json
```

## Config options

### css_dir

### import_paths

### sass_dir

eg
```js
{
  "css_dir": "/path/to/css/dir",
  "import_paths": [
    "/path/to/external/css/imports/dir"
  ],
  "sass_dir": "/path/to/sass/dir"
}
```

## License

(The MIT License)
see [LICENSE](https://github.com/g4code/compile-compass/blob/master/LICENSE.md) file for details...

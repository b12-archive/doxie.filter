[![Coveralls – test coverage
](https://img.shields.io/coveralls/studio-b12/doxie.filter.svg?style=flat-square)
](https://coveralls.io/r/studio-b12/doxie.filter)
 [![Travis – build status
](https://img.shields.io/travis/studio-b12/doxie.filter/master.svg?style=flat-square)
](https://travis-ci.org/studio-b12/doxie.filter)
 [![David – status of dependencies
](https://img.shields.io/david/studio-b12/doxie.filter.svg?style=flat-square)
](https://david-dm.org/studio-b12/doxie.filter)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)
 [![Stability: unstable
](https://img.shields.io/badge/stability-unstable-yellowgreen.svg?style=flat-square)
](https://nodejs.org/api/documentation.html#documentation_stability_index)




doxie.filter
============

A plugin for [*doxie*][].  
**Filter comments through a custom function.**

[*doxie*]:  https://github.com/studio-b12/doxie



<p><a
  title="Graphic by the great Justin Mezzell"
  href="http://justinmezzell.tumblr.com/post/57086283476"
  >
  <br/>
  <br/>
  <br/>
  <br/>
  <img
    alt="lightweight"
    src="Readme/Filter.gif"
    width="400"
    height="300"
  />
  <br/>
  <br/>
  <br/>
  <br/>
</a></p>




Installation
------------

```sh
$ npm install doxie doxie.filter
```




CLI Usage
---------

Pass the option `--filter` to `doxie` to put the plugin in your pipeline. By default it will import the [transform function][] from `$(pwd)/.doxie.filter.js` to pipe data through:

```sh
$ dox | doxie --filter
```

You can also specify a custom file from which the [transform function][] should be imported:

```sh
$ dox | doxie --filter ./build/my-custom-filter.js
```




Programmatic usage
------------------

Pass the [transform function][] directly as a parameter:

```js
const doxie = require('doxie-core');
const filter = require('doxie.filter');
const myDoxData = {/* … */};

doxie([
  filter(({data}) => !data.isPrivate),
])(myDoxData);
```




[transform function]:  #transform-function

<a                                                  id="transform-function"></a>
The transform function
----------------------

*Work in progress…*




License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]: ./License.md
[Studio B12 GmbH]: http://studio-b12.de

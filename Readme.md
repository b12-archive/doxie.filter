[![Coveralls – test coverage
](https://img.shields.io/coveralls/studio-b12/doxie.filter.svg?style=flat-square)
](https://coveralls.io/r/studio-b12/doxie.filter)
 [![Travis – build status
](https://img.shields.io/travis/studio-b12/doxie.filter/master.svg?style=flat-square)
](https://travis-ci.org/studio-b12/doxie.filter)
 [![David – status of dependencies
](https://img.shields.io/david/studio-b12/doxie.filter.svg?style=flat-square)
](https://david-dm.org/studio-b12/doxie.filter)
 [![Stability: unstable
](https://img.shields.io/badge/stability-unstable-yellowgreen.svg?style=flat-square)
](https://nodejs.org/api/documentation.html#documentation_stability_index)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)




<h1                                                                 id="/"><pre>
doxie --filter
</pre></h1>


A plugin for *[doxie][]*.  
**Filter comments through a custom function.**


[doxie]:  http://npm.im/doxie



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




CLI Usage
---------

`doxie --filter` is a plugin for the command-line tool *[doxie][]*. Most plugins are designed for *[dox][]* data. Install all three if you haven’t already:

```sh
$ npm install --global dox doxie doxie.filter
```


Pass the option `--filter` to *doxie* to put the plugin in your pipeline. By default it will import the [filter function][] from `<pwd>/.doxie.filter.js` and pipe your data through it:

```sh
$ dox | doxie --filter
```


You can also specify a custom file to import the [filter function][] from:

```sh
$ dox | doxie --filter ./build/my-custom-filter.js
```


[dox]:              http://npm.im/dox
[filter function]:  #/filter-function




Programmatic usage
------------------

`doxie.filter` can be used directly with *[doxie-core][]* – the backend of *[doxie][]*. Install both if you haven’t already:

```sh
$ npm install doxie-core doxie.filter
```


Pass the [filter function][] directly as a parameter:

```js
const doxie = require('doxie-core');
const filter = require('doxie.filter');
const myDoxData = {/* … */};

doxie([
  filter(({data}) => (!data || !data.isPrivate)),
])(myDoxData);
```


[doxie-core]:  http://npm.im/doxie-core




<a                                                    id="/filter-function"></a>
The filter function
-------------------

Put the file `.doxie.filter.js` in the root directory of your project and export a single function from it. Every documentation chunk will be piped through your filter function. If it returns a truthy value, the chunk will be kept. Otherwise it won’t be passed down the plugin pipeline.

Here’s a drop-in example written in ES5:

```js
// `/.doxie.filter.js`

module.exports = function(chunk) {return (
  // Keep the chunk if it has no associated data (comes from a plugin, not from
  // a comment)
  !chunk.data ||

  // Or if *dox* hasn’t marked it as private.
  !chunk.data.isPrivate
);};
```


<h3                                        id="/filter-function/signature"><pre>
filterFunction({[data], [output]})
  → keep?
</pre></h3>


<h5                                                 id="/filter-function/input">
Input properties:
</h5>

* **`[data]`**
  <sup>{*}</sup>  
  The data associated with a documentation chunk. If the chunk corresponds to a *[dox][]* comment, this will be the output from *[dox][]*.

* **`[output]`**
  <sup>{String}</sup>  
  The rendered text output for a chunk.


<h5                                          id="/filter-function/return-value">
Return value:
</h5>

* **`keep?`**
  <sup>{Boolean}</sup>  
  If falsy, the chunk won’t be passed down the plugin pipeline.




License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]: ./License.md
[Studio B12 GmbH]: http://studio-b12.de

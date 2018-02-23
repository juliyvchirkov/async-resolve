# async js bootstrap template

the bootstrap template to resolve the js app dependencies before its launch
while the app along w/ dependencies are loaded asynchronously

v0.0.14 | 24/02/2018
:---: | :---:
[![github](https://github.com/favicon.ico)](https://github.com/juliyvchirkov/async-js-bootstrap-template/releases/tag/v0.0.14)  | [![npmjs](https://avatars0.githubusercontent.com/u/6078720?s=32&v=4)](https://www.npmjs.com/package/async-js-bootstrap-template)

---

implements the way to solve the niggling trouble of asynchronous loading
in browser when the js app itself can be loaded & launched faster than
the whole bunch of its dependencies

the template has been designed for safe use w/ modern browsers as well as
w/ obsoleted ones (IE9 & above are in, IE8 & below require [the additional polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Polyfill))

## the bootstrap template

```javascript
'use strict'

;(function (context, factory) {
    ;(function bootstrap () {
        return [].every(function (dependency) {
            var proppath = dependency.split('.')
            while (proppath.length) {
                context = context[proppath.shift()]
                if (!/[fo]/.test((typeof context)[0]))
                    return false
            }
            return true
        }) ? factory() : setTimeout(bootstrap, 100)
    })()
})(this, function () {})
```

## the above [commented](async-js-bootstrap-template.js)

```javascript
'use strict'
/**
 * self-invoking fn (IIFE) to cover the whole template
 *
 * @param  {object}    context  the global namespace
 *                              (i.e. self / window)
 * @param  {function}  factory  the app
 */
;(function (context, factory) {
    /**
     * self-invoking fn (IIFE) bootstrap
     *
     * @returns  either itself deferred for 0.1s if
     *           dependencies are not yet resolved
     *           or the launched app otherwise
     */
    ;(function bootstrap () {
        return [
            /**
             * the array w/ the app dependencies
             * to resolve defined as strings
             *
             * the order of dependencies doesn't
             * matter
             *
             * each dependency gotta be defined
             * by its complete namespace relative
             * to the global one
             */
        ].every(function (dependency) {
            var proppath = dependency.split('.')
            while (proppath.length) {
                context = context[proppath.shift()]
                if (!/[fo]/.test((typeof context)[0]))
                    return false
            }
            return true
        }) ? factory() : setTimeout(bootstrap, 100)
    })()
})(this, function () {
    /**
     * the app code goes here
     */
})
```

## usage

the example below resolves 4 dependencies

- [Lodash utility library](https://github.com/lodash/lodash)
- [jQuery library](https://github.com/jquery/jquery)
- [jQuery plugin Lazy](https://github.com/eisbehr-/jquery.lazy)
- [FastClick polyfill](https://github.com/ftlabs/fastclick)

```javascript
'use strict'

;(function (context, factory) {
    ;(function bootstrap () {
        return [
            '_',
            '$',
            '$.fn.lazy',
            'FastClick'
        ].every(function (dependency) {
            var proppath = dependency.split('.')
            while (proppath.length) {
                context = context[proppath.shift()]
                if (!/[fo]/.test((typeof context)[0]))
                    return false
            }
            return true
        }) ? factory() : setTimeout(bootstrap, 100)
    })()
})(this, function () {
    /**
     * the app code goes here
     */
})
```

this example demonstrates the way to pass arguments to the app
(by passing the jQuery instance after it has been resolved)

```javascript
'use strict'

;(function (context, factory) {
    ;(function bootstrap () {
        return ['jQuery'].every(function (dependency) {
            var proppath = dependency.split('.')
            while (proppath.length) {
                context = context[proppath.shift()]
                if (!/[fo]/.test((typeof context)[0]))
                    return false
            }
            return true
        }) ? factory(jQuery) : setTimeout(bootstrap, 100)
    })()
})(this, function ($) {
    $(function () {
        /**
          * the app code goes here
          */
    })
})
```

## bugs

if you've faced some bug, please [create the issue](https://github.com/juliyvchirkov/async-js-bootstrap-template/issues) & thanks for your time & contribution in advance!

**glory to Ukraine!** 🇺🇦

Juliy V. Chirkov,
[twitter.com/juliychirkov](https://twitter.com/juliychirkov)

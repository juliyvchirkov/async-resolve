# Async js bootstrap template

**The bootstrap template to resolve dependencies of an js app before its invocation while that app along w/ dependencies are loaded asynchronously** <a href="https://github.com/juliyvchirkov/async-js-bootstrap-template/releases/tag/v0.0.21"><img src="https://github.com/favicon.ico" width="20" height="20" valign="middle" ></a> <a href="https://www.npmjs.com/package/async-js-bootstrap-template"><img src="https://avatars0.githubusercontent.com/u/6078720?s=20&v=4" width="20" height="20" valign="middle"></a>

This working concept implements the solution to avoid the niggling trouble of asynchronous loading in browser when an app itself are loaded & invoked faster than the whole bunch of its dependencies

The bootstrap is not limited to modern browsers & can be safely utilized w/ legacies (IE9 & above are in, IE8 & below require [additional polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Polyfill))

## The template

```javascript
'use strict'

;(function (global, factory) {
    ;(function bootstrap () {
        return [].every(function (dependency) {
            var context = global
            var proppath = dependency.split('.')
            
            while (proppath.length) {
                context = context[proppath.shift()]
                if (!/[fo]/.test((typeof context)[0])) {
                    return false
                }
            }
            
            return true
        }) ? factory() : setTimeout(bootstrap, 100)
    })()
})(this, function () {})
```

Once more, this time  [w/ comments](async-js-bootstrap-template.js)

```javascript
'use strict'

/**
 * The outer frame of the whole thing
 *
 * @param {object}   global  The global namespace (i.e. “window” / “self”)
 * @param {function} factory An app
 *
 * @returns {void}
 */
;(function (global, factory) {
    /**
     * Resolves dependencies of an app. Invokes that app as soon as 
     * all dependencies are resolved
     *
     * @returns { … } Invoked app if its dependencies are completely
     *                resolved, itself deferred for 0.1s otherwise
     */
    ;(function bootstrap () {
        return [
            /**
             * The array of strings
             *
             * Each string defines a dependency to be resolved
             * (like “_”, “FormValidation.Framework.Bootstrap”,
             * “jQuery.fn.modal” etc)
             *
             * Dependencies gotta be defined by their complete
             * namespace relative to the global one. The order
             * of dependencies within the array doesn't matter
             */
        ].every(function (dependency) {
            var context = global
            var proppath = dependency.split('.')

            while (proppath.length) {
                context = context[proppath.shift()]
                if (!/[fo]/.test((typeof context)[0])) {
                    return false
                }
            }

            return true
        }) ? factory() : setTimeout(bootstrap, 100)
    })()
})(this, function () {
    /**
     * An app code goes here
     */
})

```

## Samples

The sample below resolves 4 dependencies

- [Lodash utility library](https://github.com/lodash/lodash)
- [jQuery library](https://github.com/jquery/jquery)
- [jQuery plugin Lazy](https://github.com/eisbehr-/jquery.lazy)
- [FastClick polyfill](https://github.com/ftlabs/fastclick)

```javascript
'use strict'

;(function (global, factory) {
    ;(function bootstrap () {
        return [
            '_',
            'jQuery',
            'jQuery.fn.lazy',
            'FastClick'
        ].every(function (dependency) {
            var context = global
            var proppath = dependency.split('.')
            
            while (proppath.length) {
                context = context[proppath.shift()]
                if (!/[fo]/.test((typeof context)[0])) {
                    return false
                }
            }
            
            return true
        }) ? factory() : setTimeout(bootstrap, 100)
    })()
})(this, function () {
    /**
     * An app code goes here
     */
})
```

The next sample resolves the dependency & then passes its instance to an app on invocation

```javascript
'use strict'

;(function (global, factory) {
    ;(function bootstrap () {
        return ['jQuery'].every(function (dependency) {
            var context = global
            var proppath = dependency.split('.')
            
            while (proppath.length) {
                context = context[proppath.shift()]
                if (!/[fo]/.test((typeof context)[0])) {
                    return false
                }
            }
            
            return true
        }) ? factory(jQuery) : setTimeout(bootstrap, 100)
    })()
})(this, function ($) {
    $(function () {
        /**
          * An app code goes here
          */
    })
})
```

## Bugs

If you have faced some bug, please [follow this link to create the issue](https://github.com/juliyvchirkov/async-js-bootstrap-template/issues) & thanks for your time & contribution in advance!

**Glory to Ukraine!** 🇺🇦

Juliy V. Chirkov,
[twitter.com/juliychirkov](https://twitter.com/juliychirkov)

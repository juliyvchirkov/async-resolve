'use strict'

/**
 * @provides The bootstrap template to resolve dependencies of an js app
 *           before its invocation while that app along w/ dependencies
 *           are loaded asynchronously
 *
 * @author https://juliyvchirkov.github.io
 * @release https://github.com/juliyvchirkov/async-js-bootstrap-template/releases/tag/v0.0.21
 * @bugs https://github.com/juliyvchirkov/async-js-bootstrap-template/issues
 * @license MIT
 *
 * @see README.md
 */

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

/**
 * @author https://juliyvchirkov.github.io
 * @release https://github.com/juliyvchirkov/async-js-bootstrap-template/releases/tag/v0.0.14
 * @bugs https://github.com/juliyvchirkov/async-js-bootstrap-template/issues
 * @license MIT
 *
 * the bootstrap template to resolve the js app dependencies before its launch
 * while the app along w/ dependencies are loaded asynchronously
 *
 * @see README.md
 */

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

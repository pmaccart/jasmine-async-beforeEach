/**
 * Specialized version of beforeEach() that allows asynchronous loading
 * of modules using require.js
 * Based on the work of Pavan Podilla
 * http://blog.pixelingene.com/2011/12/simple-helper-method-for-async-testing-with-jasmine/
 */
var aBeforeEach = function (modules, fn) {
    beforeEach(function () {
        var imports = [];
        waitsFor(function () {
            var loaded = false;
            require(modules, function() {
                loaded = true;
                imports = arguments;
            });
            return loaded;
        });

        runs(function () {
            fn.apply(undefined, Array.prototype.slice.call(imports, 0));
        });
    });
}
/**
 * Tell ngcc that deep imports to @badisi/auth-js are not a problem
 * @see https://github.com/angular/angular/issues/35615#issuecomment-590558673
 */
module.exports = {
    ignorableDeepImportMatchers: [/@badisi\/auth-js\//]
};

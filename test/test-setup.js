/* globals require, global, document, window, fetch */
const jsdom        = require( 'jsdom' );

global.document    = jsdom.jsdom( '<!doctype html><html><body></body></html>' );
global.window      = document.defaultView;
global.navigator   = {
    userAgent : 'node.js'
};

global.XMLHttpRequest       = function()
{
    this.readyState         = 4;
    this.status             = 200;

    this.onreadystatechenge = () =>
    {};

    this.open               = () =>
    {
        this.onreadystatechange();
    };

    this.send               = () =>
    {};

    this.setRequestHeader   = () =>
    {};

    return this;
};

window.localStorage = {
    getItem     : () =>
    {},
    removeItem  : () =>
    {},
    setItem     : () =>
    {}
};

global.fetch = () =>
{
    return {
        then : cb =>
        {
            cb( {
                status  : fetch.status || 199
            } );


            return {
                then : cb =>
                {
                    return cb();
                },

                catch : cb =>
                {
                    return cb();
                }
            };
        }
    };
};

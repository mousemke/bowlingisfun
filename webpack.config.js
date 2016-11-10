
const path                  = require( 'path' );
const webpack               = require( 'webpack' );
const WebpackShellPlugin    = require( 'webpack-shell-plugin' );

const PROD      = process.env.PRODUCTION || false;

/* istanbul ignore next */
module.exports = {

    resolve : {
        fallback    : path.join(__dirname, 'src')
    },


    entry   : PROD ? {
        index       : './app/main.jsx'
    } : {
        server      : `webpack-dev-server/client?http://localhost:8078`,
        hot         : 'webpack/hot/only-dev-server',
        index       : './app/main.jsx'
    },


    output  : {
        path        : path.join( __dirname, 'dist' ),
        filename    : 'tests.js',
        publicPath  : '/'
    },


    node    : {
        fs          : 'empty',
        console     : false,
        global      : true,
        process     : true,
        Buffer      : false,
        setImmediate: false
    },


    plugins : PROD ? [
        new webpack.optimize.UglifyJsPlugin( {
            minimize    : true,
            compress    : {
                warnings    : false,
                drop_console: true
            }
        } ),
        new webpack.optimize.CommonsChunkPlugin( 'index', `index.js` ),
        new WebpackShellPlugin({
            onBuildEnd: [`sed -i -- 's/index\.js/index.${version}.js/' dist/index.html`]
        })
    ] : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin( 'index', 'index.js' )
    ],


    module  : {
        loaders : [
            {
                test: /\.json$/,
                include: path.join(__dirname),
                loader: 'json',
            },
            {
                test: /\.js|jsx$/,
                loaders: PROD ? ['babel'] : ['react-hot', 'babel'],
                include: path.join( __dirname, 'app' )
            },
            {
                test    : /\.css$/,
                exclude : /node_modules/,
                loader  : 'style!css!'
            }
        ]
    }
};

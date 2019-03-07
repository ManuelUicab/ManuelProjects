module.exports = {
    entry: './client/index.js',
    output:{
        path: __dirname + '/server/public',
        filename: 'bundle.js',

    }, 
    module:{
        rules:[
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};
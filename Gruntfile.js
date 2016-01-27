module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        webpack: {
            build: {
                entry: './src/assets/js/main.jsx',
                output: { 
                    path: './public/js/',
                    filename: 'bundle.js' 
                },
                module: {
                    loaders: [{
                        loader: 'babel-loader',
                        test: /.jsx?$/,
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }]
                 }
            }
        },
        watch: {
            assets: {
                files: ['src/assets/js/**/*.*'],
                tasks: ['webpack']
            }
        }
    });

    grunt.registerTask('default', ['webpack', 'watch']);
}
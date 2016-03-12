/**
 * Created by ttacompu on 10/29/2015.
 */
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: {
            css : {
                dev:{
                    src: "./node_modules/bootstrap/less",
                    target : "./css"
                }
            }
        },

        less: {
            dev:
            {
                files: {
                    "<%= app.css.dev.target %>/bootstrap.css": "<%= app.css.dev.src %>/bootstrap.less"
                }
            },
            options:
            {
                cleancss : true
            }
        },

        watch: {
            dev: {
                options: {
                    livereload: true
                },
                files: ['<%= app.css.dev.target %>/**'],
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: ['.'],
                    keepalive: true,
                    livereload: true
                }
            }
        },

        open: {
            all: {
                path: 'http://localhost:<%= connect.server.options.port%>'
            }
        },
        concurrent: {
            dev: ['connect', 'open', 'watch'],
            options: {
                logConcurrentOutput: true,
                limit: 3
            }
        },
        csslint : {
            src : [ "<%= app.dev %>/dist/css/bootstrap.css"]
        },

        uncss: {
            dist: {
                files: {
                    "<%= app.dev %>/dist/css/bootstrap.css" : ['index.html']
                }
            }
        },
        autoprefixer: {
            single_file: {
                src:  "<%= app.dev %>/dist/css/bootstrap.css",
                dest:  "<%= app.dev %>/dist/css/bootstrap.css"
            }
        }



//Add the Tasks configurations here.
    });
// Define Tasks here
    grunt.registerTask('dev',['concurrent']);
};
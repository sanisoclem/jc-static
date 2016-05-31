"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            files: ['assets/**/*.less', 'assets/**/*.js', 'assets/**/*.html'],
            tasks: ['w']
        },
        bower: {
            install: {
                options: {
                    targetDir: './public/lib',
                    layout: 'byComponent',
                    install: false,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },
        copy: {
            main: {
                files: [{expand: true, src: ['**'],cwd: 'assets/lib/', dest: 'public/lib' }]
            }
        },
        less: {
            production: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions", "ie 9"] }),
                        new (require('less-plugin-clean-css'))({ advanced: true })
                    ],
                },
                files: {
                    "public/css/app.css": "assets/less/app.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
   
    grunt.registerTask("build", ['bower:install','copy','less:production']);
    grunt.registerTask("w", ['less:production']);
    grunt.registerTask("dev",['build','watch']);
};


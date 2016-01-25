/*
 * Copyright (c) 2011 Danish Maritime Authority.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        proj: {
            name: grunt.file.readJSON('package.json').name,
            src: 'app',
            build: 'build',
            livereload: '.tmp/livereload',
            dist: 'dist'
        },
        watch: {
            webapp: {
                files: [ '<%= proj.src %>/{,**/}*.*' ],
                tasks: [ 'copy:all2Livereload' ]
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [ '<%= proj.livereload %>/{,*/}*.html', '<%= proj.livereload %>/css/{,*/}*.css',
                    '<%= proj.livereload %>/js/{,*/}*.js',
                    '<%= proj.livereload %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}' ]
            }
        },

        connect: {
            options: {
                port: 9010,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35739
            },
            livereload: {
                options: {
                    open: true,
                    base: [ '<%= proj.livereload %>' ],
                }
            },
        },

        // Put files not handled in other tasks here
        copy: {
            toBuild: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= proj.src %>',
                        src: ['{,*/}*.html', '{,*/}*.css', 'img/{,*/}*'],
                        dest: '<%= proj.build %>'
                    }
                ]
            },
            toDist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= proj.build %>',
                        src: ['{,*/}*.html', '{,*/}*.css', 'img/{,*/}*'],
                        dest: '<%= proj.dist %>'
                    }
                ]
            },
            all2Livereload: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= proj.src %>',
                        src: '{,**/}*.*',
                        dest: '<%= proj.livereload %>/'
                    }
                ]
            }
        },
        clean: {
            build: '<%= proj.build %>',
            dist: '<%= proj.dist %>/*'
        },
        replace: {
            run: {
                src: ['<%= proj.build %>/*.{html,appcache}'],
                overwrite: true,                 // overwrite matched source files
                replacements: [
                    {
                        from: '/cached/cdn.cloudflare', // string replacement
                        to: '//cdnjs.cloudflare.com/ajax/libs'
                    },
                    {
                        from: 'cached/cdn.cloudflare', // string replacement
                        to: '//cdnjs.cloudflare.com/ajax/libs'
                    },
                    {
                        from: '/cached/cdn.netdna', // string replacement
                        to: '//netdna.bootstrapcdn.com'
                    },
                    {
                        from: 'cached/cdn.netdna', // string replacement
                        to: '//netdna.bootstrapcdn.com'
                    }
                ]
            }
        },
        appcache: {
            options: {
                basePath: 'app'
            },
            usermanual: {
                dest: '<%= proj.dist %>/usermanual.appcache',
                cache: {
                    literals: [//as is in the "CACHE:" section
                        'css/cached/cdn.netdna/font-awesome/4.3.0/fonts/fontawesome-webfont.woff2?v=4.3.0',
                        'docs/index.html',
                        'docs/doc.css'
                    ],
                    patterns: [
                       	'app/cached/**',
                        'app/img/**',
                    ]
                },
                network: "*"
            }
        },
        concurrent: {
            server: [ 'concat:dist' ],
            // test : [ 'coffee', 'copy:styles' ],
            build: [ 'copy:styles2Build', 'copy:html2Build' ]
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-appcache');

    grunt.registerTask('server',
        function (target) {
            if (target === 'dist') {
                return grunt.task.run([ 'build', 'connect:dist:keepalive' ]);
            }

            grunt.task.run([ 'copy:all2Livereload', /* 'autoprefixer', */'configureProxies', 'connect:livereload',
                'watch' ]);
        });

    grunt.registerTask('build', ['clean', 'copy:toBuild', 'appcache:usermanual', 'replace:run', 'copy:toDist']);

    // 'clean:dist',
    // 'useminPrepare',
    // 'concurrent:dist',
    // 'autoprefixer',
    // 'concat',
    // 'copy:dist',
    // 'ngmin',
    // 'cssmin',
    // 'uglify',
    // 'rev',
    // 'usemin'

    // grunt.registerTask('build', [ 'clean:dist', 'useminPrepare',
    // 'concurrent:dist', 'autoprefixer', 'concat',
    // 'copy:dist', 'ngmin', 'cssmin', 'uglify', 'rev', 'usemin' ]);

    grunt.registerTask('default', [ 'build' ]);

};
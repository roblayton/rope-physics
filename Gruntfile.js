module.exports = function(grunt) {
    
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            src: ['<%= pkg.src_dir %>/assets/js/*.js']
        },
        shell: {
            options: {
                stdout: true
            },
            rjs_optimize: {
                command: ['cd src', 'node common/libs/r.js -o build.js'].join('&&')
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            //js: {
                //src: '<%= pkg.src_dir %>/assets/js/*.js',
                //dest: '<%= pkg.build_dir %>/assets/js/concat.js'
            //},
            css: {
                src: '<%= pkg.src_dir %>/assets/css/*.css',
                dest: '<%= pkg.build_dir %>/assets/css/concat.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= pkg.build_dir %>/assets/js/concat.js',
                dest: '<%= pkg.build_dir %>/assets/js/built.min.js'
            }
        },
        copy: {
            build_required: {
                src: '<%= pkg.src_dir %>/common/libs/require.js',
                dest: '<%= pkg.build_dir %>/common/libs/require.js'
            },
            build_assets: {
                expand: true,
                flatten: true,
                src: ['<%= pkg.src_dir %>/assets/img/**'],
                dest: '<%= pkg.build_dir %>/assets/img/',
                filter: 'isFile'
            }
        },
        clean: {
            // If you're minifying concatenated js, clean up after
            clean_concat: {
                src: ['<%= pkg.build_dir %>/assets/js/concat.js']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('build', ['jshint', 'shell', 'concat', 'copy']);
};

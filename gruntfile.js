/**
 * Created by anderson.santos on 05/08/2016.
 */
module.exports = function (grunt) {
    grunt.initConfig({
            options: {
                srcFiles: [
                    "src/NamespaceDeclares.js",
                    "src/RuteZangada.js",
                    "src/WidgetEngine.js"
                ]
            },
            concat: {
                dist: {
                    src: ['<%= options.srcFiles %>'],
                    dest: "dist/RZClientEngine.js"
                }
            },
            uglify: {
                options: {
                    mangle: false
                },
                my_target: {
                    files: {
                        "dist/RZClientEngine.min.js": ['dist/RZClientEngine.js']
                    }
                }
            },
            copy: {
                test: {
                    src: 'dist/RZClientEngine.js',
                    dest: 'test/src/RZClientEngine.js'
                },
                test_template: {
                    options: {
                        processContent: function (content) {
                            return grunt.template.process(content);
                        }
                    },
                    src: 'test/template/SpecRunner.html.ejs',
                    dest: 'test/SpecRunner.html'
                }
            },
            jasmine: {
                src: 'test/src/*.js',
                options: {
                    specs: 'test/spec/*.spec.js',
                    helpers: 'test/specs/helpers/*.js',
                    vendor:['test/lib/*.js']
                }
            }
        }
    );
// Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['concat', 'uglify', 'copy:test', 'copy:test_template']);
};
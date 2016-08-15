/**
 * Created by anderson.santos on 05/08/2016.
 */
module.exports = function (grunt) {
    grunt.initConfig({
            options: {
                srcFiles: [
                    "src/StackPanelPlugin.js"
                ]
            },
            concat: {
                dist: {
                    src: ['<%= options.srcFiles %>'],
                    dest: "dist/StackPanelPlugin.js"
                }
            },
            uglify: {
                options: {
                    mangle: false
                },
                my_target: {
                    files: {
                        "dist/StackPanelPlugin.min.js": ['dist/StackPanelPlugin.js']
                    }
                }
            }
        }
    );
// Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', ['concat', 'uglify']);
};
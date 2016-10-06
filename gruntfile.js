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
            },
            copy:{
                vendor_jquery_sortable:{
                    src: 'bower_components/jquery-sortable/source/js/jquery-sortable-min.js',
                    dest: 'dist/vendor/jquery-sortable/jquery-sortable-min.js'
                }
            }
        }
    );
// Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['concat', 'uglify','copy']);
};
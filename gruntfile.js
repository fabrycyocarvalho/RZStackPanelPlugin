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
            },
            less:{
                dev:{
                    files: {
                        'dist/style/StackPanelPlugin.css': 'src/style/style.less'
                    }
                },
                prod:{
                    options:{
                        compress:true
                    },
                    files: {
                        'dist/style/StackPanelPlugin.min.css': 'src/style/style.less'
                    }
                }
            }
        }
    );
// Plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['concat', 'uglify','copy','less']);
};
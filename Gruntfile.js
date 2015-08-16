module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //lint.js 
    jshint: {
      all: ['public/src/**/*.js'] 
    },
    //concat.js
    concat: {
      build: {
        files: {
          'public/bin/js/app.js': ['public/src/**/*.js']
        }
      }
    },
    //compile.scss  
    sass: {
      build: {
        options: {                      
          style: 'expanded',
          sourcemap: 'none',
          noCache: true
        },
        files: {                        
          'public/bin/css/app.css': 'public/src/assets/css/app.scss'
        }
      }
    },
    //minify.css
    cssmin: {
      build: {
        files: {
          'public/bin/css/app.min.css': 'public/bin/css/app.css'
        }
      }
    }
  });
  //load grunt tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //default tasks to run 
  grunt.registerTask('default', ['jshint', 'concat', 'sass', 'cssmin']);  
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'app/public/css/build.css': 'app/public/css/style.scss'
        }
      }
    },
    reactify: {
      'app/public': 'app/js/*.jsx'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');


  grunt.registerTask('s', ['sass']);
};

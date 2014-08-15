module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint', {
    files: [
      'Gruntfile.js',
      'api/*.js',
      'lib/**/*.js'
    ],
    options: {
      jshintrc: './.jshintrc'
    }
  });

  grunt.loadNpmTasks("grunt-jscs");
  grunt.config('jscs', {
    src: '<%= jshint.files %>',
    options: {
      config: '.jscsrc'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    scripts: {
      files: '<%= jshint.files %>',
      tasks: ['jshint', 'jscs']
    }
  });

  grunt.registerTask('default', ['jshint', 'jscs']);
};

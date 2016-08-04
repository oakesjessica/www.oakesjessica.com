module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //***  WATCH ***//
    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      scripts: {
        files: ['stylesheets/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      jade: {
        files: ['build/**/*.jade'],
        tasks: ['jade']
      }
    },
    //*** JADE ***//
    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: [
          {'index.html': 'build/main.jade'},
          {
            cwd: 'build/partials',
            src: '*.jade',
            dest: 'views',
            expand: true,
            ext: '.html'
          }
        ],
      }
    },
    //***  SASS ***//
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/assets/css/style.min.css': 'stylesheets/style.scss'
        }
      }
    },
    //***  COPY ***//
    copy: {
      main: {
        expand: true,
        cwd: 'node_modules/',
        src: [
          'bootstrap/dist/css/bootstrap.min.js',
          'bootstrap/dist/css/bootstrap.min.css',
          'bootstrap/dist/css/bootstrap.min.css.map',
          'bootstrap/dist/css/bootstrap-theme.min.css',
          'bootstrap/dist/css/bootstrap-theme.min.map'
        ],
        'dest': 'public/vendors/'
      }
    }
  });

  //***  LOAD NPM TASKS ***//
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');

  //***  DEFAULT TASK(S) ***//
  grunt.registerTask('default', ['copy', 'sass', 'watch', 'jade']);
};

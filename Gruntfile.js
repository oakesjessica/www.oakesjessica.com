module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //***  WATCH ***//
    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['copy', 'jade', 'sass']
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
    //*** UGLIFY ***//
    // uglify: {
    //   build: {
    //     src: 'app.js',
    //     dest: 'public/assets/js/client.min.js'
    //   }
    // },
    //*** JADE ***//
    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: [
          //  Have index.html compiled into root folder for Github hosting
          {'index.html': 'build/index.jade'},
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
          'bootstrap/dist/css/bootstrap-theme.min.map',
          'font-awesome/css/font-awesome.min.css',
          'font-awesome/fonts/*'
        ],
        'dest': 'public/vendors/'
      }
    }
  });

  //***  LOAD NPM TASKS ***//
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');

  //***  DEFAULT TASK(S) ***//
  grunt.registerTask('default', ['copy', 'sass', 'jade', 'watch']);
};

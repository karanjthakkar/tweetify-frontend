/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {
  grunt.initConfig({
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'dist/',
        src: ['**/*'],
        dest: 'tmp_dist/'
      }
    },
    aws_s3: {
      options: {
        access: 'public-read',
        gzip: true,
        uploadConcurrency: 5
      },
      production: {
        options: {
          bucket: 'tweetify.io',
          params: {
            ContentEncoding: 'gzip' // applies to all the files!
          }
        },
        files: [
          {expand: true, cwd: 'dist/', src: ['**'], dest: '', params: {CacheControl: '60'}},
          {expand: true, cwd: 'dist/assets/', src:['**'], dest: 'assets/', params: {CacheControl: '2000'}},
          {expand: true, cwd: 'dist/images/', src:['**'], dest: 'images/', params: {CacheControl: '2000'}}
        ]
      }
    },
    exec: {
      ember_build: {
        command: 'ember build'
      },
      ember_build_production: {
        command: 'ember build --environment=production'
      },
      ember_server: {
        command: 'ember server'
      },
      ember_test: {
        command: 'ember test'
      },
      move_assets: {
        command: 'cp -R tmp_dist/ dist/'
      },
      delete_tmp_dist: {
        command: 'rm -fr tmp_dist/'
      }
    }
  });
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('deploy', ['exec:ember_build_production', 'compress', 'exec:move_assets', 'exec:delete_tmp_dist', 'aws_s3:production', 'slack:slack_production']);
};

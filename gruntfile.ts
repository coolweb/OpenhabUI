module.exports = (grunt: IGrunt) => {
  grunt.initConfig({
    files: {
      js: {
        src: ["scripts/app/model/ErrorCodeEnum.js",
          "scripts/app/model/ProgramError.js",
          "scripts/app/data/OpenhabRepository.js",
          "scripts/app/business/DeviceManager.js",
          "scripts/app/directive/BaseDeviceController.js",
          "scripts/app/directive/SwitchDevice/SwitchDeviceDirective.js",
          "scripts/app/directive/SwitchDevice/SwitchDeviceDirectiveController.js",
          "scripts/app/directive/TemperatureDevice/TemperatureDeviceDirective.js",
          "scripts/app/directive/TemperatureDevice/TemperatureDeviceDirectiveController.js",
          "scripts/app/app.js"]
      },
      html: {
        src: ["index.html",
          "scripts/app/views/*.html"]
      },
      bower_components: {
        src: ["bower_components/angular/angular.min.js",
          "bower_components/angular-animate/angular-animate.min.js",
          "bower_components/angular-aria/angular-aria.min.js",
          "bower_components/angular-messages/angular-messages.min.js",
          "bower_components/angular-material/angular-material.min.js",
          "bower_components/angular-material/angular-material.css"]
      },
      css: {
        src: ["style/palette.css"]
      }
    },
    concat: {
      dist: {
        src: ["<%=files.js.src %>"],
        dest: "dist/temp/scripts/app.js"
      }
    },
    uglify: {
      dist: {
        src: "<%=concat.dist.dest %>",
        dest: "dist/scripts/app.min.js"
      }
    },
    copy: {
      dist: {
        src: ["<%=files.html.src %>",
          "<%=files.bower_components.src %>",
          "<%=files.css.src %>"],
        dest: "dist/"
      },
      debug: {
        src: "<%=concat.dist.dest %>",
        dest: "dist/scripts/app.min.js"
      }
    },
    ftpPut: {
      options: {
        host: "192.168.1.6",
        user: "pi",
        password: "raspberry"
      },
      upload: {
        files: {
          "/": {
            src: "dist/scripts/app.min.js",
          }
        }
      }
    },
    "ftp-deploy": {
      build: {
        auth: {
          host: "192.168.1.6",
          port: 21,
          authKey: "raspberry"
        },
        src: "dist/",
        dest: "opt/openhab/webapps/OpenhabUI/",
      }
    },
    clean: {
      temp: ["dist/temp/"],
      build: ["dist/scripts",
        "dist/style",
        "dist/app",
        "dist/*"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-ftp-deploy");

  grunt.registerTask("default", ["concat", "uglify", "copy:dist", "clean:temp"]);
  grunt.registerTask("debug", ["concat", "copy", "clean:temp"]);
  grunt.registerTask("publish", ["concat", "uglify", "copy:dist", "clean:temp", "ftp-deploy"]);
  grunt.registerTask("cleanAll", ["clean:build"]);
};

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
      }
    },
    concat: {
      dist: {
        src: ["<%=files.js.src %>"],
        dest: "dist/scripts/app.js"
      }
    },
    uglify: {
      dist: {
        src: "<%=concat.dist.dest %>",
        dest: "dist/scripts/app.min.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["concat", "uglify"]);
};

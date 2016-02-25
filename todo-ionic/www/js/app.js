// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic', 'ionic-timepicker', 'ngCordova'])
    .controller('MainController', function ($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate, $cordovaLocalNotification, $ionicPlatform, $cordovaCamera) {
  document.addEventListener("deviceready", function () {
/*
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
	  correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });
*/
  }, false);

  $ionicPlatform.ready(function () {
    
    // ========== Scheduling
    
    $scope.scheduleSingleNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        data: {
          customProperty: 'custom value'
        }
      }).then(function (result) {
        // ...
      });
    };
    
    $scope.scheduleMultipleNotifications = function () {
      $cordovaLocalNotification.schedule([
        {
          id: 1,
          title: 'Title 1 here',
          text: 'Text 1 here',
          data: {
            customProperty: 'custom 1 value'
          }
        },
        {
          id: 2,
          title: 'Title 2 here',
          text: 'Text 2 here',
          data: {
            customProperty: 'custom 2 value'
          }
        },
        {
          id: 3,
          title: 'Title 3 here',
          text: 'Text 3 here',
          data: {
            customProperty: 'custom 3 value'
          }
        }
      ]).then(function (result) {
        // ...
      });
    };
    
    $scope.scheduleDelayedNotification = function () {
      var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);
      
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        at: _10SecondsFromNow
      }).then(function (result) {
        // ...
      });
    };
    
    $scope.scheduleEveryMinuteNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        every: 'minute'
      }).then(function (result) {
        // ...
      });
    };
    
    // =========/ Scheduling
    
    // ========== Update
    
    $scope.updateSingleNotification = function () {
      $cordovaLocalNotification.update({
        id: 1,
        title: 'Title - UPDATED',
        text: 'Text - UPDATED'
      }).then(function (result) {
        // ...
      });
    };
    
    $scope.updateMultipleNotifications = function () {
      $cordovaLocalNotification.update([
        {
          id: 1,
          title: 'Title 1 - UPDATED',
          text: 'Text 1 - UPDATED'
        },
        {
          id: 2,
          title: 'Title 2 - UPDATED',
          text: 'Text 2 - UPDATED'
        },
        {
          id: 3,
          title: 'Title 3 - UPDATED',
          text: 'Text 3 - UPDATED'
        }
      ]).then(function (result) {
        // ...
      });
    };
    
    // =========/ Update
    
    // ========== Cancelation
    
    $scope.cancelSingleNotification = function () {
      $cordovaLocalNotification.cancel(1).then(function (result) {
        // ...
      });
    };
    
    $scope.cancelMultipleNotifications = function () {
      $cordovaLocalNotification.cancel([1, 2]).then(function (result) {
        // ...
      });
    };
    
    $scope.cancelAllNotifications = function () {
      $cordovaLocalNotification.cancelAll().then(function (result) {
        // ...
      });
    };
    $scope.scheduleSingleNotification();
  });

        $scope.task = {};
        var createProject = function (projectTitle) {
            var newProject = Projects.newProject(projectTitle);
            $scope.projects.push(newProject);
            Projects.save($scope.projects);
            $scope.selectProject(newProject, $scope.projects.length - 1);
        }

        $scope.projects = Projects.all();

        $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

        $scope.newProject = function () {
            var projectTitle = prompt('Project name');
            if (projectTitle) {
                createProject(projectTitle);
            }
        }

        $scope.selectProject = function (project, index) {
            $scope.activeProject = project;
            Projects.setLastActiveIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
        }

        $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
            $scope.taskModal = modal;
        }, {
                scope: $scope,
                animation: 'slide-in-up'
            });

        $scope.createTask = function (task) {

            if (!$scope.activeProject || !task) {
                return;
            }
            $scope.activeProject.tasks.push({
                title: task.title,
                time: task.time
            });
            $scope.taskModal.hide();
            Projects.save($scope.projects);
            task.title = "";
        }

        $scope.newTask = function () {
            $scope.taskModal.show();
        }

        $scope.closeNewTask = function () {
            $scope.taskModal.hide();
        }

        $scope.toggleProjects = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }
        function timePickerCallback(val) {
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                var selectedTime = new Date(val * 1000);
                $scope.task.time = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes();
                console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
            }
        }
        $scope.timePickerObject = {
            inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
            step: 15,  //Optional
            format: 12,  //Optional
            titleLabel: '12-hour Format',  //Optional
            setLabel: 'Set',  //Optional
            closeLabel: 'Close',  //Optional
            setButtonType: 'button-positive',  //Optional
            closeButtonType: 'button-stable',  //Optional
            callback: function (val) {    //Mandatory
                timePickerCallback(val);
            }
        };
        $timeout(function () {
            if ($scope.projects.length == 0) {
                while (true) {
                    var projectTitle = prompt('Your first project title:');
                    if (projectTitle) {
                        createProject(projectTitle);
                        break;
                    }
                }
            }
        })
    })
    .factory('Projects', function () {
        return {
            all: function () {
                var projectString = window.localStorage['projects'];
                if (projectString) {
                    return angular.fromJson(projectString);
                }
                return [];
            },
            save: function (projects) {
                window.localStorage['projects'] = angular.toJson(projects);
            },
            newProject: function (projectTitle) {
                return {
                    title: projectTitle,
                    tasks: []
                }
            },
            getLastActiveIndex: function () {
                return parseInt(window.localStorage['lastActiveProject']) || 0;
            },
            setLastActiveIndex: function (index) {
                window.localStorage['lastActiveProject'] = index;
            }
        }
    })
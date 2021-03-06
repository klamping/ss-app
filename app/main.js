/* jshint devel:true */
angular.module('ssapp', ['ui.router', 'yaru22.angular-timeago'])
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('feed', {
      url: '/',
      templateUrl: 'partials/feed.html',
      resolve: {
        timeline: ["$http", function ($http) {
          return $http.get('data/timeline.json');
        }]
      },
      controller: ["$scope", "timeline", function ($scope, timeline) {
        $scope.timeline = timeline.data.posts;

        $scope.sharePost = function () {
          $scope.timeline.unshift({
            'author': 'Jessica Tuan',
            'timestamp': Date.now(),
            'avatar': 'images/profile.jpg',
            'body': $scope.post
          });

          $scope.post = '';
        };
      }]
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'partials/settings.html',
      controller: ["$scope", function ($scope) {
        $scope.name = 'Jessica Tuan';
        $scope.email = 'jessica@mail.com';
        $scope.pw = 'hunter2';
        $scope.pwconfirm = 'hunter2';
      }]
    });
}])
.run(["timeAgo", function (timeAgo) {
  // reformat 'ago' strings to match our style
  timeAgo.settings.strings.en_US = {
    prefixAgo: null,
    prefixFromNow: null,
    suffixAgo: null,
    suffixFromNow: null,
    seconds: '%ds',
    minute: '%dm',
    minutes: '%dm',
    hour: '',
    hours: '%dh',
    day: '',
    days: '%dd',
    month: 'about a month',
    months: '%dm',
    year: 'about a year',
    years: '%d years',
    numbers: []
  };
}])
.controller('mainController', ["$scope", function ($scope) {
  $scope.showProfileMenu = false;

  $scope.toggleProfileMenu = function () {
    $scope.showProfileMenu = !$scope.showProfileMenu;
  };

  $scope.showModal = function () {
    $scope.showMsgModal = true;
    document.getElementById('msg-text').focus();
  };
}])
.directive('feed', function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/timeline.html',
    scope: {
      data: '='
    },
    controller: function () {

    }
  };
})
// @see http://stackoverflow.com/a/17364716/150552
.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind('keydown keypress', function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
            scope.$eval(attrs.ngEnter, {'event': event});
        });

        event.preventDefault();
      }
    });
  };
});

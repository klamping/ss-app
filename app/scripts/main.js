/* jshint devel:true */
angular.module('ssapp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('feed', {
      url: '/',
      templateUrl: 'partials/feed.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'partials/settings.html'
    });
})
.controller('mainController', function ($scope) {
  $scope.showProfileMenu = false;

  $scope.toggleProfileMenu = function () {
    $scope.showProfileMenu = !$scope.showProfileMenu;
  };
});

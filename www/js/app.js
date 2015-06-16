angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  if(!ionic.Platform.isIOS())$ionicConfigProvider.scrolling.jsScrolling(false);

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "templates/facts.html",
          controller: 'FactsTabCtrl'
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "templates/facts2.html",
          controller: 'Facts2TabCtrl'
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html",
          controller: 'AboutTabCtrl'
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html",
          controller: 'NavTabCtrl'
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html",
          controller: 'ContactTabCtrl'
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})

.controller('HomeTabCtrl', function($scope, $randomUser) {

  $scope.loadMoreData = function () {
  	$randomUser.get().then(function (data) {
      $scope.feed = $scope.feed.concat(data.slice(0, 10));
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function () {
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $randomUser.get().then(function (data) {
  	$scope.feed = data;
  });

})

.controller('FactsTabCtrl', function($scope, $randomUser, $ionicModal) {
  $randomUser.get().then(function (data) {
  	$scope.feed = data;
  });

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})

.controller('Facts2TabCtrl', function($scope, $randomUser) {
  $randomUser.get().then(function (data) {
  	$scope.feed = data;
  });
})

.controller('AboutTabCtrl', function($scope, $randomUser) {
  $randomUser.get().then(function (data) {
  	$scope.feed = data;
  });
})

.controller('ContactTabCtrl', function($scope, $randomUser) {
  $randomUser.get().then(function (data) {
  	$scope.feed = data;
  });
})

.controller('NavTabCtrl', function($scope, $randomUser) {
  $randomUser.get().then(function (data) {
  	$scope.feed = data;
  });
})


/***
  Get data from randomuser.me and save it on localStorage
  http://randomuser.me/
***/
.service('$randomUser', function ($q, $http) {

	var randomuserMe = angular.fromJson(localStorage.randomuserMe) || {}

  randomuserMe = randomuserMe.results || [];

  return {
    get: function () {

      var deferred = $q.defer();

      if (randomuserMe.length > 0) {
        deferred.resolve(randomuserMe);

        return deferred.promise;
      }

      $http({
        method: 'get',
        url: 'http://api.randomuser.me/?lego&results=40' // 40 is the max
      }).success(function (data) {
        localStorage.randomuserMe = angular.toJson(data);

        deferred.resolve(data.results);
      }).error(function (error) {
        deferred.reject(error);
      });

		 return deferred.promise;
    }
  }
});

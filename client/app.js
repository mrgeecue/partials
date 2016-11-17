var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider){
$routeProvider
    .when('/',{
        templateUrl: 'static/partials/customizeUsers.html'
    })
    .when('/usersList',{
        templateUrl: '/static/partials/usersList.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});

        // 1) CREATE THE FACTORY
app.factory("userFactory", [function(){
    var factory = {};
    var users = [
        {firstName: "Yukihiro", lastName: "Matsumoto", language: "Ruby"},
        {firstName: "Ryan", lastName: "Dahl", language: "Javascript"},
        {firstName: "Brendan", lastName: "Eich", language: "Javascript"}
    ];

    // 2nd) create the user list to pass to the controller
    factory.index = function(callback){
        callback(users);
    }

    factory.create= function(user){
        users.push(user);
        console.log('**************')
    }
    factory.delete= function($index){
        users.splice($index, 1);
    }
    return factory;
}])

    // make sure to inject the userFactory into each controller
app.controller('CustomizeUsersController', ['$scope', 'userFactory', function($scope, userFactory) {
    function setUsers(data){
        $scope.users = data;
        $scope.newUser = {};
    }
    $scope.users = [];
    // when the controller is loaded, fetch the user list
    userFactory.index(setUsers);
    // pass new user info into the factory
    $scope.create = function(){
        userFactory.create($scope.newUser)
        $scope.newUser = {};  //this resets our form
    }
    // delete user info from the factory
    $scope.delete= function($index){
        userFactory.delete($index);
    }
}]);

app.controller('UsersListController', ['$scope', 'userFactory', function($scope, userFactory){
    function setUsers(data){
        $scope.users = data;
    }
    $scope.users = [];
    userFactory.index(setUsers);
}])

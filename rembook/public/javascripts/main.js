var app = angular.module('rembook', []);

app.factory('MainFactory', ['$http', function($http){

    var getUserData = function(id){

        return $http({
            method: 'GET',
            url: '/'+id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
            })
            .success(function(json) {
                return json;
            })
            .error(function(err) {
                return err;
            });


    };

    return{
        getUserData: getUserData
    };


}]);

app.controller('MainController', ['MainFactory', function(MainFactory, $scope){

    var data={};

    $('#submit').click(function(){
        var id = $('#idbox').val();

        MainFactory.getUserData(id).success(function(json){
            console.log('Response from getUserdata', json);


        })
    })
}]);
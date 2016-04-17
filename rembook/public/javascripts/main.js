var app = angular.module('rembook', []);

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };

});


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

app.controller('MainController', ['MainFactory', '$scope', '$location',  function(MainFactory, $scope, $location){

    var vm=this;
    vm.data={};
    vm.dataRecieved=false;
    vm.rollToNameMap={};
    vm.rems=[];

    console.log($location.path());
    console.log($location.search());

    $('#submit').click(function(){
        var id = $('#idbox').val();

        MainFactory.getUserData(id).success(function(json){
            console.log('Response from getUserdata', json);
            vm.data=json;
            vm.dataRecieved=true;

            for(var i=0;i<vm.data.students.length; i++){
                vm.rollToNameMap[vm.data.students[i].student_id] = vm.data.students[i].student_name;
            }

            vm.rems=vm.data.studentComments;
        })
    })
}]);
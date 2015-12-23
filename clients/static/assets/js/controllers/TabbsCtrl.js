app.controller('TabbsChatCtrl', ["$scope", "socket", "tabbsFactory", "$rootScope", function ($scope, socket, tabbsFactory, $rootScope) {


    //destroy listeners
    // $scope.$on('$destroy', function(event){
    //     socket.removeAllListeners();
    // })

    $scope.tabs = [{
        title: '1(510)-557-2282',
        content: '1(510)-557-2282'
    }, {
        title: '1(408)-460-0404',
        content: '1(408)-460-0404',
        disabled: false
    }];

    $scope.selfIdUser = 50223456;
    $scope.otherIdUser = 50223457;
    $scope.setOtherId = function (value) {

        $scope.otherIdUser = value;
    };

    var exampleDate = new Date().setTime(new Date().getTime() - 240000 * 60);

    $scope.chat = [];


    $scope.sendMessage = function () {
        var newMessage = {
            "user": "Peter Clark",
            "avatar": "assets/images/avatar-1.jpg",
            "date": new Date(),
            "content": $scope.chatMessage,
            //swap IDS for testing
            "idOther": $scope.selfIdUser,
            "idUser": $scope.otherIdUser
        };
        $scope.chat.push(newMessage);
        console.log("newmessage", newMessage)
        socket.emit("test_new_client", newMessage)
        $scope.chatMessage = '';

    };



    //Incoming message from /get_message route
    // socket.on("user_to_business", function(data){
    //     console.log("user_to_business", data);

    //     var newMessage = {
    //         "user": "customer",
    //         "avatar": "assets/images/avatar-1.jpg",
    //         "date": new Date(),
    //         "content": data.Body,
    //         "idUser": $scope.selfIdUser,
    //         "idOther": $scope.otherIdUser
    //     };
    //     console.log("user to business:", newMessage);
    //     $scope.chat.push(newMessage);
    //     $scope.chatMessage = '';

    //     socket.emit("client_resonse", "response");
    // });

    // socket.on("user_to_business", function(data){
    //     console.log("user_to_business", data);
    //     console.log("rootscope user", $rootScope.user)
    //     //get stored messages from DB based on incoming user number
    //     tabbsFactory.all_tabb_messages($rootScope.user, function(messages){
    //         console.log(messages);
    //     })
    // });
    console.log("rootscope user", $rootScope.user)
    //get stored messages from DB based on incoming user number
    tabbsFactory.all_tabb_messages($rootScope.user, function(messages){
        console.log(messages);
    })

}]);

app.factory('tabbsFactory', function($http){
    var factory = {};
    factory.all_tabb_messages = function(data, callback){
        console.log(data.number);
        
        $http.post('/business_tabbs', {data: data}).success(function(data){
            console.log("business tabs on success", data);
        })

    }
    return factory;
})

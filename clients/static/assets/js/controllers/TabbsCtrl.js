app.controller('TabbsChatCtrl', ["$scope", "socket", "tabbsFactory", "$rootScope", function ($scope, socket, tabbsFactory, $rootScope) {
    socket.on("testing_connection", function(data){
        console.log("hello");
    })
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
    //selfIdUser == user number
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
        $scope.chat.push($scope.chatMessage);
        console.log("newmessage", $scope.chatMessage)
        $scope.chatMessage = '';

    };
    //get tabbs/messages after any broadcast
    socket.on("user_to_business", function(data){
        console.log("rootscope user", $rootScope.user)
        //get stored messages from DB based on incoming user number
        tabbsFactory.all_tabb_messages($rootScope.user, function(data){
            for(var tab in data){
                for(var message in data[tab].messages){
                     console.log("message", data[tab].messages[message].body);
                // console.log("messages", data.messages[message])
                var incoming = {
                "user": $rootScope.user.number,
                "avatar": "assets/images/avatar-1.jpg",
                "to": data[tab].tabb_business_id,
                "date": exampleDate,
                "content": data[tab].messages[message].body,
                "idUser": 50223456,
                "idOther": 50223457
                }
                $scope.chat.push(incoming);
            }
            $scope.chatMessage = '';
            }
        })
    });



    //get messages when controller loads
    tabbsFactory.all_tabb_messages($rootScope.user, function(data){
        for(var tab in data){
            for(var message in data[tab].messages){
                 // console.log("message", data[tab].messages[message].body);
            var incoming = {
            "user": $rootScope.user.number,
            "avatar": "assets/images/avatar-1.jpg",
            "to": data[tab].tabb_business_id,
            "date": exampleDate,
            "content": data[tab].messages[message].body,
            "idUser": 50223456,
            "idOther": 50223457
            }
            $scope.chat.push(incoming);
        }
        $scope.chatMessage = '';
        }
    })

}]);

app.factory('tabbsFactory', function($http){
    var factory = {};
    factory.all_tabb_messages = function(data, callback){
        console.log("adsfadsf", data);
        $http.get('/business_tabbs/'+data.number).success(function(data){
        console.log("business tabs on success", data);
        callback(data);
        })

    }
    return factory;
})

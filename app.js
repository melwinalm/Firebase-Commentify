app = angular.module('myApp', []);

app.controller('homeController', function($scope){
	
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyD9shk_mffq8RJa1yyFY8GN4lvrQFV2a7U",
		authDomain: "melwinsblog-e3777.firebaseapp.com",
		databaseURL: "https://melwinsblog-e3777.firebaseio.com",
		storageBucket: "melwinsblog-e3777.appspot.com",
		messagingSenderId: "143791991616"
	};
	firebase.initializeApp(config);
	  
	var blogId = "12345";
	
	//  Submit comment
	$scope.SubmitComment = function(){
		//Verify if all the inputs are in correct format
		
		// Submitting the comment
		firebase.database().ref('user-comments/' + blogId).push({
			name: $scope.comment.name,
			email: $scope.comment.email,
			text: $scope.comment.text,
			isdeleted: false,
			isvisible: true,
			date: new Date(),
			replies: []
		});
		
		$scope.GetAllComments();
		

	}
	
	// Reply to a comment
	$scope.ReplyComment = function(key,reply){
		// Verify if all the inputs are in correct format
		
		// Submitting the reply
		let replycontent = {
				name: reply.name,
				email: reply.email,
				text: reply.text,
				isdeleted: false,
				isvisible: true,
				date: new Date()
			};
		
		if ($scope.comments[key].replies == null){
			$scope.comments[key].replies = [replycontent];
		}
		else {
			$scope.comments[key].replies.push(replycontent);
		}
		
		$scope.replyshow = false;
		
		firebase.database().ref('/user-comments/' + blogId).update($scope.comments);
		
		$scope.GetAllComments();
	};
	
	// Update all the comments
	$scope.GetAllComments = function(){
		firebase.database().ref('/user-comments/' + blogId).once('value').then(function(snapshot){
			$scope.comments = snapshot.val();
			
			$scope.$apply();
		})

	};
	
	$scope.GetAllComments();
	
	
	
});



/*
$(document).ready(function(){
	  
	  
	  // Reading all the comments
	  ReadAllComments =function(){
		firebase.database().ref('/user-comments/' + blogId).once('value').then(function(snapshot){
			var comments = snapshot.val();
		
			for (let key in comments){
				$('#comment_list').append('<div>' + comments[key].username + " - " + comments[key].email + " - " + comments[key].comment + '</div>');
				//console.log(key, comments[key]);
			};
			
		})
	  };
	  ReadAllComments();
	  
	  // Submitting the comment
	  document.getElementById('comment_submit').onclick = function(){
		firebase.database().ref('user-comments/' + blogId).push({
			username: document.getElementById('comment_name').value,
			email: document.getElementById('comment_email').value,
			comment: document.getElementById('comment_text').value,
			isdeleted: false,
			isvisible: true,
			date: new Date(),
			parent_id: "none"
		})
	  };
	  
});
*/
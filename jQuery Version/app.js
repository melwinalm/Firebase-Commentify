$(document).ready(function(){
	
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
	
	
	// Update all the comments
	GetAllComments = function(){
		firebase.database().ref('/user-comments/' + blogId).once('value').then(function(snapshot){
			var comments = snapshot.val();
			var count = 0;
			
			let commentshtml = '<div>';
			
			ReplyVisible = function(key){
				let replyname = 'div[name=reply' + key.name + ']';
				$(replyname).toggle();
			}
			
			ReplyInvisible = function(key){
				let replyname = 'div[name=reply' + key.name + ']';
				$(replyname).hide();
			}
			
			SubmitReply = function(key){
				let replyname = $('#replyname' + key.name).val().trim();
				let replyemail = $('#replyemail' + key.name).val().trim();
				let replytext = $('#replytext' + key.name).val().trim();
				
				$('#replyname' + key.name).val('');
				$('#replyemail' + key.name).val('');
				$('#replytext' + key.name).val('');
				
				// Verify if all the inputs are in correct format
				if (replyname == '' || replyname == null){
					replyname = "Anonymous"
				}
				
				if (replytext == '' || replytext == null){
					alert('Comment box seems to be empty');
					return;
				}
				
		
				// Submitting the reply
				let replycontent = {
						name: replyname,
						email: replyemail,
						text: replytext,
						isdeleted: false,
						isvisible: true,
						date: new Date()
					};
				
				if (comments[key.name].replies == null){
					comments[key.name].replies = [replycontent];
				}
				else {
					comments[key.name].replies.push(replycontent);
				}
				
				firebase.database().ref('/user-comments/' + blogId).update(comments);
				
				GetAllComments();

			}
			
			SubmitComment = function(){
				//Verify if all the inputs are in correct format
				let commentname = $('#comment_name').val().trim();
				let commentemail = $('#comment_email').val().trim();
				let commenttext = $('#comment_text').val().trim();
				
				$('#comment_name').val('');
				$('#comment_email').val('');
				$('#comment_text').val('');
				
				if (commentname == '' || commentname == null){
					commentname = "Anonymous"
				}
				
				if (commenttext == '' || commenttext == null){
					alert('Comment box seems to be empty');
					return;
				}
				
				// Submitting the comment
				firebase.database().ref('user-comments/' + blogId).push({
					name: commentname,
					email: commentemail,
					text: commenttext,
					isdeleted: false,
					isvisible: true,
					date: new Date(),
					replies: []
				});
				
				GetAllComments();
				
			}
			
			$.each(comments, function(key,value){
				count++;
				commentshtml += '<h5 class="comment-content"><xmp class="comment-content">' + value.name + '</xmp></h5>'
				commentshtml += '<p class="comment-content"><xmp>' + value.text + '</xmp></p>'
				commentshtml += '<a name=' + key + ' style="cursor:pointer;" class="comment-content" onclick="ReplyVisible(this)" >Reply</a>'
				commentshtml += '<div class="comment-break w-embed"><hr></div>'
				
	
				if (value.replies != null){
					$.each(value.replies, function(key2,value2){
						count++;
						commentshtml += '<div class="comment-content2">';
						commentshtml += '<h5 class="comment-content"><xmp>' + value2.name + '</xmp></h5>';
						commentshtml += '<p class="comment-content"><xmp>' + value2.text + '</xmp></p>';
						commentshtml += '<a name=' + key + ' style="cursor:pointer;" class="comment-content" onclick="ReplyVisible(this)" >Reply</a>'
						commentshtml += '<div class="comment-break w-embed"><hr></div>';
						commentshtml += '</div>'
					});
				}
				
				
				commentshtml += '<div name=reply' + key + ' hidden class="comment-content2">';
				commentshtml += '<div class="comment-reply w-form">';
				commentshtml += '<div class="comment-form w-clearfix">';
				commentshtml += '<div class="w-row">';
				commentshtml += '<div class="w-col w-col-6 form-group">';
				commentshtml += '<label for="commentName">Name</label>';
				commentshtml += '<input id=replyname' + key + ' class="form-control" placeholder="Optional" type="text" />';
				commentshtml += '</div>';
				commentshtml += '<div class="w-col w-col-6 form-group">';
				commentshtml += '<label for="commentEmail">Email Id</label>';
				commentshtml += '<input id="replyemail' + key + '" class="form-control" placeholder="Optional" type="text" />';
				commentshtml += '</div>';
				commentshtml += '</div>';
				commentshtml += '<label for="commentText">File input</label>';
				commentshtml += '<textarea id="replytext' + key + '" class="comment-textarea form-control" placeholder="Your comment" rows="3"></textarea>';
				commentshtml += '<button name="' + key + '" type="button" class="comment-submit btn btn-primary" onclick=SubmitReply(this)>Submit</button>';
				commentshtml += '<button name="' + key + '" type="button" class="comment-submit btn btn-default" onclick="ReplyInvisible(this)">Cancel</button>';
				commentshtml += '<div class="comment-break w-embed"><hr></div>';
				commentshtml += '</div>';
				commentshtml += '</div>';
				commentshtml += '</div>';
				commentshtml += '';
				commentshtml += '';
				commentshtml += '';
				commentshtml += '';
				commentshtml += '';
				
				
				commentshtml += '</div>';

			});
			
			
			
			commentshtml += '</div>';
			
			
			$('#allcomments').html(commentshtml);
			
			if (count == 0){
				$('#commentcount').text('COMMENTS');
			}
			else if (count == 1){
				$('#commentcount').text(count + ' COMMENT');
			}
			else{
				$('#commentcount').text(count + ' COMMENTS');
			}
			
			
		})

	};
	
	GetAllComments();
	
});
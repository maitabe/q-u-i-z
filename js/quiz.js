
//global variables
var quizService,
	score = 0,
	scoreWrong = 0;

// loop to get different answers
function getAnswers() {

	var answers = qs.getCurrentAnswers();
		//answers = qs1.getCurrentAnswers();
	//how to reset the answers

	for (var i = 0; i < answers.length; i++) {
				$('#answers').append('<label><input type="radio" name="answer" data-index= '+i+' value="' + answers[i] + '">' + answers[i] + '</label><br />').fadeIn();
			}
}

// catch the answer selected
function registerAnswers() {

			$('input[type="radio"]').change(function() {

				// get value of selected answer
				var answerSel = $('input:checked').val();

				//get 'data' attribute from selected answer
				var answerIndex = $('input:checked').data('index');

				//convert string to a number
				var correctAnswer =  qs.getCorrectAnswer();
					//correctAnswer =  qs1.getCorrectAnswer();

					//compare selected answer vs correct answer
					if(answerIndex === correctAnswer) {
						score  = score + 1;

					}else {
						scoreWrong = scoreWrong + 1;
					}

					if (qs.isLastQuestion() ) {
						//change text of button to "Total Score"
						 $('#nextQuestion').text("Total Score");
						 $('#nextQuestion').attr('value', 'Total Score' );
						 $('#nextQuestion').css('visibility', 'visible');

					}else {
					//display "next" button to go to the next question
					$('#nextQuestion').css('visibility', 'visible');
					}

			});
}


function resetQuiz() {
	qs.resetGame();
	$('#question, #answers').empty();
	$('#finalSentence').empty();
	// $('#finalSentence').hide();
	$('#question, #answers, #nextQuestion').show();
	$('#nextQuestion').text("Next");
	$('#nextQuestion').attr('value', 'Next' );
	$('#nextQuiz').hide();
}



$(document).ready(function() {
	//init code
	$('#loginScreen').show();

	//login form
	$('.message a').click(function(){
		$('form').animate({height: "toggle", opacity: "toggle"}, "slow");
	});

	var date = new Date();
	var n = date.toDateString();
	var time = date.toLocaleTimeString();

	$('#todayDate').html(n + ' ' + time);

	//login - userService = us
	as = new AuthService();


	//quizService = qs
	qs = new QuizService('http://localhost:3005/db');
	//

	//get questions & answers from the server
	qs.getQuestions(function() {
		// data is ready
		$('#startGame').show();
		$('#nextQuiz').hide();
	});
		//handlers
		//create user button
	$('#newUser').on('click', function() {
		var userSignin = $('#usernameNew').val();
		var passwordSignin = $('#passwordNew').val();
		var emailSignin = $('#emailadressNew').val();
		var userObj = {userObj:userSignin, password:passwordSignin, email:emailSignin };
		// save
		localStorage.setItem("user", JSON.stringify(userObj));
		$('#loginScreen').hide();
		$('#loggedUser').html('Hello ' + userSignin);
	});

 		// login user button
	$('#userLogin').on('click', function() {
		//get user and password values
		var user = $('#userName').val();
		var password = $('#passWord').val();
        //user + password values
		var userExist = as.loginUser(user, password);

		if (userExist) {
			  $('#loginScreen').hide();
			  $('#loggedUser').html('Hello ' + user);
		}else{
			  $('#errorMsgLogin').text('Your credentials are not here, they might have gone to mars');
		}
	});

		//"start" button to initialize the game
		$('#startGame').click(function() {

			//reset game
			resetQuiz();

			//hide start button
			$(this).hide();
			$('#nextQuestion').css('visibility', 'hidden');
			$('#backButton').css('visibility', 'hidden');
			$('#nextQuiz').hide();

			//display first question & answers
			$('#question').html(qs.getCurrentQuestion());

			getAnswers();

			registerAnswers();

		});

		//"next" button - manage the questions dynamically
		$('#nextQuestion').click(function() {

			// $('#nextQuestion').show();

			//get value text of button
			 var totalScore = $(this).prop("value");


			if (totalScore === 'Total Score') {
			 		// print total score

					$('#finalSentence').html('you got '+ score + ' correct answers, out of ' + qs.getTotalQuestions() );
					$('#finalSentence').show();

					//hide q&a + button
					$('#question, #answers, #nextQuestion').hide();

					//show start button
					$('#startGame').text("Play Again!");
					$('#startGame').attr('value', 'playAgain' );
					$('#startGame').show();
					$('#nextQuiz').show();

				}else {
					//dynamic to get the next question

					//hide next button
					$(this).css('visibility', 'hidden');

					//get value of selected answer
					var answerSel = $('input:checked').val();
					$('#question').empty();
					$('#answers').empty();
					$('#errorMsg').hide();

					//grab the last element of array
					if (qs.isLastQuestion()) {
						//change text of button to "Total Score"
						 $('#nextQuestion').text("Total Score");
						 $('#nextQuestion').attr('value', 'Total Score' );
					}else{
						qs.nextQuestion();
						$('#question').html(qs.getCurrentQuestion());

						getAnswers();
						registerAnswers();
					}

					// if (!answerSel) {
					// 	$('#errorMsg').text('You must select one of the answers');
					// }else {}

				}

		});

		$('#nextQuiz').click(function() {

			qs = new QuizService('http://localhost:3006/db');

			qs.getQuestions(function() {

				// data is ready
				resetQuiz();

				//hide start button
				$(this).hide();
				$('#nextQuestion').css('visibility', 'hidden');
				$('#backButton').css('visibility', 'hidden');
				$('#nextQuiz').hide();
				$('#startGame').hide();

				//display first question & answers
				$('#question').html(qs.getCurrentQuestion());

				getAnswers();

				registerAnswers();

			});



		});

});
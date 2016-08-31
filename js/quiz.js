
//global variables
var quizService,
	score = 0,
	scoreWrong = 0;

// loop to get different answers
function getAnswers() {

	var answers = qs.getCurrentAnswers();
	//how to reset the answers

	for (var i = 0; i < answers.length; i++) {
				$('#answers').append('<label><input type="radio" name="answer" data-index= '+i+' value="' + answers[i] + '">' + answers[i] + '</label><br />').fadeIn();
				console.log(i);
				console.log(answers[i]);
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

					//compare selected answer vs correct answer
					if(answerIndex === correctAnswer) {
						console.log('bingo');
						score  = score + 1;

					}else {
						console.log('try again!');

						scoreWrong = scoreWrong + 1;
					}

					if (qs.isLastQuestion()) {
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
	currentQ = 0;
	$('#question, #answers').empty();
	$('#finalSentence').empty();
	// $('#finalSentence').hide();
	$('#question, #answers, #nextQuestion').show();
	$('#nextQuestion').text("Next");
	$('#nextQuestion').attr('value', 'Next' );
}



$(document).ready(function() {
	//init code
	$(window).load(function() {
		$('#loginScreen').show();
	});

	//login form
	$('.message a').click(function(){
		$('form').animate({height: "toggle", opacity: "toggle"}, "slow");
	});

	//quizService = qs
	qs = new QuizService();

	//get questions & answers from the server
	qs.getQuestions(function() {
		// data is ready
		$('#startGame').show();
	});

		//handlers

		//"start" button to initialize the game
		$('#startGame').click(function() {

			//reset game
			resetQuiz();

			//hide start button
			$(this).hide();
			$('#nextQuestion').css('visibility', 'hidden');
			$('#backButton').css('visibility', 'hidden');

			//display first question & answers
			$('#question').html(qs.getCurrentQuestion());

			getAnswers();

			registerAnswers();

		});

		//"next" button - manage the questions dynamically
		$('#nextQuestion').click(function() {

			$('#nextQuestion').show();

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

});
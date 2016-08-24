
//global variables
var quizService,
	currentQ = 0,
	sortQuestObj,
	totalQ,
	question,
	answers,
	score = 0,
	scoreWrong = 0;

// loop to get different answers
function getAnswers() {

	for (var i = 0; i < answers.length; i++) {

				$('#answers').append('<label><input type="radio" name="answer" data-index= '+i+' value="' + answers[i] + '">' + answers[i] + '</label><br />');
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
				var correctAnswer =  parseInt(sortQuestObj[currentQ].correctAnswer);

					//compare selected answer vs correct answer
					if(answerIndex === correctAnswer) {
						console.log('bingo');
						score  = score + 1;

					}else {
						console.log('try again!');

						scoreWrong = scoreWrong + 1;
					}

				//display "next" button to go to the next question
				$('#nextQuestion').css('visibility', 'visible');
				 console.log(score);
				 console.log(scoreWrong);
			});
}


$(document).ready(function() {
	//init code

	//hide next button
	// $('#nextQuestion').css();

	quizService = new QuizService();

	//get questions & answers from the server
	quizService.getQuestions(function() {
		// data is ready
		sortQuestObj = quizService.questions;

		totalQ = sortQuestObj.length;
		question = sortQuestObj[currentQ].question;
		answers = sortQuestObj[currentQ].choices;

	});

		//handlers

		//"start" button to initialize the game
		$('#startGame').click(function() {

			//hide start button
			$(this).hide();

			//display first question & answers
			$('#question').html(question);

			getAnswers();

			registerAnswers();

		});

		//"next" button - manage the questions dynamically
		$('#nextQuestion').click(function() {

			//get value text of bottom
			 var totalScore = $(this).prop("value");


			 	if (totalScore === 'Total Score') {
			 		// print total score
					$('#finalSentence').html('you got '+ score + ' correct answers, out of ' + totalQ );
				}else {
					//dynamic to get the next question

					//hide next button
					$(this).css('visibility', 'hidden');

					//get value of selected answer
					var answerSel = $('input:checked').val();

					//increment the question number
					currentQ = currentQ + 1 ;

					question = sortQuestObj[currentQ].question;
					answers = sortQuestObj[currentQ].choices;
					totalQ = sortQuestObj.length;
					lastQ = sortQuestObj.length - 1;

					//grab the last element of array
					if (currentQ === lastQ) {
						//change text of button to "Total Score"
						 $('#nextQuestion').text("Total Score");
						 $('#nextQuestion').attr('value', 'Total Score' );
						 console.log(score);
						 console.log(scoreWrong);
					}

					$('#answers').empty();
					$('#errorMsg').hide();
					$('#question').html(question);


					// if (!answerSel) {
					// 	$('#errorMsg').text('You must select one of the answers');
					// }else {}

					getAnswers();

					registerAnswers();

				}

		});

});
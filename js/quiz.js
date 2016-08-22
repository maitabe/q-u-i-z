
//global variables
var quizService,
	currentQ = 0,
	sortQuestObj,
	totalQ,
	question,
	answers;


function registerAnswers() {

			$('input[type="radio"]').change(function() {

				//get value of selected answer
				var answerSel = $('input:checked').val();
				//display "next" button to go to the next question
				$('#nextQuestion').css('visibility', 'visible');
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

			for (var i = 0; i < answers.length; i++) {
				$('#answers').append('<label><input type="radio" name="answer" value="' + answers[i] + '">' + answers[i] + '</label><br />');
			}

			registerAnswers();

		});




		//"next" button - manage the questions dynamically
		$('#nextQuestion').click(function() {

			//hide next button
			$(this).css('visibility', 'hidden');

			//get value of selected answer
			var answerSel = $('input:checked').val();
			console.log(answerSel);

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
			}


			if (!answerSel) {
				$('#errorMsg').text('You must select one of the answers');
			}else {
				$('#answers').empty();
				$('#errorMsg').hide();
				$('#question').html(question);
				for (var i = 0; i < answers.length; i++) {
				$('#answers').append('<label><input type="radio" class="radioBtn" name="answer" value="' + answers[i] + '">' + answers[i] + '</label><br />');
				}

				registerAnswers();
			}
		});


});
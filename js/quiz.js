
//global variables
var quizService,
	currentQ = 0,
	sortQuestObj,
	totalQ,
	question,
	answers;


function score() {
 //write something
}

$(document).ready(function() {
	//init code

	//hide next button
	$('#nextQuestion').hide();

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

			//display "next" button to go to the next question
			$('#nextQuestion').show();

		});

		//"next" button - manage the questions dynamically
		$('#nextQuestion').click(function() {

			//get value of selected answer
			var answerSel = $('input:checked').val();
			console.log(answerSel);

			//increment the question number
			currentQ = currentQ + 1 ;

			question = sortQuestObj[currentQ].question;
			answers = sortQuestObj[currentQ].choices;


			if (!answerSel) {
				$('#errorMsg').text('You must select one of the answers');
			}else{
				$('#answers').empty();
				$('#errorMsg').hide();
				$('#question').html(question);
				for (var i = 0; i < answers.length; i++) {
				$('#answers').append('<label><input type="radio" name="answer" value="' + answers[i] + '">' + answers[i] + '</label><br />');
			}

			}
		});


});
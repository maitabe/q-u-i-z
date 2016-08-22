
//global variables
var quizService;


function score() {
 //write something
}

$(document).ready(function() {

	quizService = new QuizService();

	quizService.getQuestions(function() {
		// data is ready
		var sortQuestObj = quizService.questions;
		var currentQ = 0;
			var nextQ = currentQ + 1 ;
			console.log(nextQ);

		//hide next button
		$('#nextQuestion').hide();


		$('#startGame').click(function() {




			//hide start button
			$(this).hide();



			$('#question').html(sortQuestObj[currentQ].question);
			for (var i = 0; i < sortQuestObj[currentQ].choices.length; i++) {
				$('#answers').append('<label><input type="radio" name="answer" value="' + sortQuestObj[currentQ].choices[i] + '">' + sortQuestObj[currentQ].choices[i] + '</label><br />');
			}

			$('#nextQuestion').show();

		});

		$('#nextQuestion').click(function() {

			//get value of selected answer
			var answerSel = $('input:checked').val();
			console.log(answerSel);

			if (!answerSel) {
				$('#errorMsg').text('You must select one of the answers');
			}else{
				$('#answers').empty();
				$('#errorMsg').hide();
				$('#question').html(sortQuestObj[nextQ].question);
				for (var i = 0; i < sortQuestObj[nextQ].choices.length; i++) {
				$('#answers').append('<label><input type="radio" name="answer" value="' + sortQuestObj[nextQ].choices[i] + '">' + sortQuestObj[nextQ].choices[i] + '</label><br />');
			}

			}
		});

	});



});
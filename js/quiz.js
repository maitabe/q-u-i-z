
//global variables
var quizService;


function score() {

}

$(document).ready(function() {

	quizService = new QuizService();

	quizService.getQuestions(function() {
		// data is ready

		//hide next button
		$('#nextQuestion').hide();


		$('#startGame').click(function() {

			//hide start button
			$(this).hide();

			$('#question').append(quizService.questions[0].question);
			for (var i = 0; i < quizService.questions[0].choices.length; i++) {
				$('#answers').append('<label><input type="radio" name="answer" value="' + quizService.questions[0].choices[i] + '">' + quizService.questions[0].choices[i] + '</label><br />');
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

			}
		});

	});



});
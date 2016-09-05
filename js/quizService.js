
function QuizService(url, subject) {
	// data
	this._questions = undefined;

	this._currentQ = 0;
	this._url = url;
	this.subject = subject;


	//methods
	this.getQuestions = function(callback) {
		var that = this;
		$.get(that._url, function(dataServer, status) {
			that._questions = dataServer;
			callback();
		});
	};

	this.getCurrentQuestion = function() {
		return this._questions[this._currentQ].question;
	};

	this.getCurrentAnswers = function() {
		return this._questions[this._currentQ].choices;
	};

	this.nextQuestion = function() {
		this._currentQ++;
	};

	this.getTotalQuestions = function() {
		return this._questions.length;
	};

	this.isLastQuestion = function() {
		return this._currentQ === this._questions.length - 1;
	};

	this.getCorrectAnswer = function(){
		return parseInt(this._questions[this._currentQ].correctAnswer);
	};

	this.resetGame = function() {
	 	this._currentQ = 0;
	};

	this.getTitle = function() {
		return this.subject + ' quiz';
	};

}





function QuizService() {
	// data
	this.questions = undefined;

	//methods
	this.getQuestions = function(callback) {
		var that = this;
		$.get('http://localhost:3005/db', function(dataServer, status) {
			that.questions = dataServer;
			callback();
		});
	};
}




function AuthService(name, email) {

	// this.name = name;
	// this.email = email;
	// this.quizScores = [];
	// this.currentScore = 0;


	// check if user already exist
	this.loginUser = function(user, password) {
		// save
		var existingUser = JSON.parse(localStorage.getItem("user"));
		// checking credentials
		return ( user === existingUser.userObj && password === existingUser.password) ;
	};

}



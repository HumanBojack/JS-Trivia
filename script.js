class Game {
	constructor(){
		this.showMenu();
	}

	async init(number){
		let questions = await this.fetchQuestions(number);
		console.log(questions);
		this.questions = questions.results;
		this.score = 0;
		// this.showMenu();
	}

	async fetchQuestions(number){

		return fetch(`https://opentdb.com/api.php?amount=${number}`)
			.then(data => data.json())
			.catch(error => console.error(error));
		// return fetch(`questions_example.json`)
		// 	.then(data => data.json())
		// 	.catch(error => console.error(error));
	}

	async play(number){
		await this.init(number);
		this.askQuestion(this.questions[0], 1);
	}

	showMenu(){
		let gameCard = document.querySelector(".game-card");
		gameCard.classList.remove("menu", "question-boolean", "question-multiple");
		gameCard.classList.add("menu");
		console.log(this.score);
		gameCard.innerHTML = 
		`<p>How many questions do you want ?</p>
		<select>
			<option>5</option>
			<option>10</option>
			<option>15</option>
			<option>20</option>
		</select>
		<a href="">Play game !</a>`;
		this.toLeft();

		let playBtn = document.getElementsByTagName("a")[0];

		const onPlayBtnClick = (event) => {
			event.preventDefault();
			let selection = document.getElementsByTagName("select")[0];
			this.play(selection.value);
		}

		playBtn.addEventListener("click", onPlayBtnClick);
	}

	askQuestion(question, number) {
		let answers = [...question.incorrect_answers];
		answers.splice(Math.floor((Math.random() * (answers.length + 1))), 0, question.correct_answer);

		if (question.type == "boolean"){
			return this.booleanQuestion(question, number, answers)
		} else {
			return this.multipleQuestion(question, number, answers)
		}
	}

	booleanQuestion(question, number, answers) {
		let gameCard = document.querySelector(".game-card");
		gameCard.classList.remove("menu", "question-boolean", "question-multiple");
		gameCard.classList.add("question-boolean");
		gameCard.innerHTML = 
		`<p class="question-number">Question ${number}</p>
			<p class="question">${question.question}</p>
			<p class="yes answer">${answers[0]}</p>
			<p class="no answer">${answers[1]}</p>`;
		let buttons = gameCard.querySelectorAll(".answer");
		this.toLeft()

		let game = this;

		buttons.forEach(button => {
			button.addEventListener("click", function(event){
				event.preventDefault();
				if (question.correct_answer == this.textContent){
					game.score += 1;
				}

				if (game.questions[number]){
					game.askQuestion(game.questions[number], number + 1);
				} else {
					game.showMenu();
				}
			})
		})
	}


	multipleQuestion(question, number, answers) {
		let gameCard = document.querySelector(".game-card");
		gameCard.classList.remove("menu", "question-boolean", "question-multiple");
		gameCard.classList.add("question-multiple");
		gameCard.innerHTML = 
		`<p class="question-number">Question ${number}</p>
		<p class="question">${question.question}</p>
		<p class="first answer">${answers[0]}</p>
		<p class="second answer">${answers[1]}</p>
		<p class="third answer">${answers[2]}</p>
		<p class="fourth answer">${answers[3]}</p>`;
		let buttons = gameCard.querySelectorAll(".answer");
		this.toLeft()

		let game = this;

		buttons.forEach(button => {
			button.addEventListener("click", function(event){
				event.preventDefault();
				if (question.correct_answer == this.textContent){
					game.score += 1;
				}
				
				if (game.questions[number]){
					game.askQuestion(game.questions[number], number + 1);
				} else {
					game.showMenu();
				}
				
			})
		})
	}

	toLeft(){
		anime({
			targets: '.game-card',
			translateX: [3000,0],
			duration: 200,
			easing: 'spring(1, 80, 50, 0)',
		})
	}
}



// let questions = await fetchQuestions(5);
let game = new Game();
game.showMenu();





// async function prepareGame(rounds){
// 	let questions = await fetchQuestions(rounds);
// 	playGame(questions.results);
// }

// const playGame = (questions) => {
// 	console.log(questions);
// 	// questions.forEach((question, number) => {
// 	// 	askQuestion(question, number);
// 	// })
// 	askQuestion(questions, questions[0], 1)
// }




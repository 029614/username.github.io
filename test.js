//Start Test.
$('#start-quiz').click(function (ev){

  //revealing the question form and hiding the start button.
  $('#quiz-form').toggleClass('hidden');
  $('button').toggleClass('hidden');

  //calling the populate function and seperating array information into categories.
  populateQuiz(questions[0]);
  let question = question1[0];
  let answers = [question1[1], question1[2], question1[3], question1[4], question1[5]];
  let rightAnswer = question1[6];

  //building the scoreboard and review table.
  $('#score').text('Your score: ' + '' + 'correct, 0 incorrect');
  $('#test-review').append('<tr><th>Question Wrong</th><th>Your Answer</th><th>Correct Answer</th></tr>');
});

//These variables keep track of various important pieces information.
let questionNumber = 5;
let questionOn = 1;
let score = 0;
let wrong = 0;
let next = 0;
let questionReview = [];

//Populate html with questions.
function populateQuiz (array){

  //retrieving the next question's information.
  question = array[0];
  answers = [array[1], array[2], array[3], array[4], array[5]];
  rightAnswer = array[6];
  let choiceNumber = 1;

  //assigning the question to html
  $('#question').text(question);

  //assigning the first answer and adding the 'checked attr'.
  $('#question-wrapper').append('<label class="choices">' + answers[0] + '<input id="' + choiceNumber + '" class="choices-input" name="choice" type="radio" checked></input></label>');
  choiceNumber++

  //assigning the rest of the answers.
  for (let i = 1; i < answers.length; i++){
    $('#question-wrapper').append('<label class="choices">' + answers[i] + '<input id="' + choiceNumber + '" class="choices-input" name="choice" type="radio"></input></label>');
    choiceNumber++
  };

  //Updating visual question index.
  $('#progress').text('Question ' + questionOn + ' of ' + questionNumber);
  questionOn++;
  next++;
};

//Submit answer and check correctness.
$('#submit-answer').click(function (ev){
  $("#display-correctness").toggleClass('hidden');
  $('main').toggleClass('hidden');
  $('#continue-quiz').toggleClass('hidden');
  $('#submit-answer').toggleClass('hidden');

  //If true, adding 1 to the correct counter, highlighting the table row green for the review, and generating the you are right message.
  let selectedInput = $('input[type=radio]:checked').parent().text();
  if (selectedInput.toString() === rightAnswer.toString()){
    score++;
    $('#test-review').append("<tr class='green'><td>" + question + "</td><td>" + selectedInput.toString() + "</td><td>" + rightAnswer.toString() + "</td></tr>");
    $("#display-correctness").append('<legend id="right-wrong">Correct! The answer WAS ' + rightAnswer.toString() + '!</legend>');
  } else {

    //If false, adding 1 to the incorrect counter, highlighting the table row red for the review, and generating the you are wrong message.
    wrong++;
    $('#test-review').append("<tr class='red'><td>" + question + "</td><td>" + selectedInput.toString() + "</td><td>" + rightAnswer.toString() + "</td></tr>");
    $("#display-correctness").append('<legend id="right-wrong">Wrong! You chose ' + selectedInput.toString() + '! The correct answer was ' + rightAnswer.toString() + '!</legend>');
  };
});

//functionality for the continue button. Revealing the quiz form and hiding the correctness message.
$('#continue-quiz').click(function (ev){
  $("#right-wrong").remove();
  $("#display-correctness").toggleClass('hidden');
  $('main').toggleClass('hidden');
  $('#continue-quiz').toggleClass('hidden');
  $('#submit-answer').toggleClass('hidden');

  //updating scoreboard and resetting the question form.
  $('#score').text('Your score: ' + score + ' correct, ' + wrong + ' incorrect');
  $('#question-wrapper').empty();

  //checking to see if the test has ended.
  if (next < 5){
    populateQuiz(questions[next]);
  } else {
    endTest();
  };
});

//Display quiz end.
function endTest (){

  //generating a final score and displaying the review page.
  $('#final-score').text('Your final score is: ' + score + ' correct, and ' + wrong + ' incorrect!');
  $('#quiz-form').toggleClass('hidden');
  $('#test-end').toggleClass('hidden');
};

//Restart quiz.
$('#restart-quiz').click(function (ev){

  //resetting base variables and preparing to rerun the 'start-quiz' event.
  $('button').toggleClass('hidden');
  $('#test-end').toggleClass('hidden');
  questionOn = 1;
  score = 0;
  wrong = 0;
  next = 0;
  $('#test-review').empty();
  $('#progress').text('Question ' + questionOn + ' of ' + questionNumber);
});

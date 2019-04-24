//Start Test.
$('#start-quiz').click(function (ev){
  $('#quiz-form').toggleClass('hidden');
  $('button').toggleClass('hidden');
  populateQuiz(questions[0]);
  let question = question1[0];
  let answers = [question1[1], question1[2], question1[3], question1[4], question1[5]];
  let rightAnswer = question1[6];
  $('#score').text('Your score: 0 correct, 0 incorrect');
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
  question = array[0];
  answers = [array[1], array[2], array[3], array[4], array[5]];
  rightAnswer = array[6];
  let choiceNumber = 1;
  $('#question').text(question);
  for (let i = 0; i < answers.length; i++){
    $('#question-wrapper').append('<label class="choices">' + answers[i] + '<input id="' + choiceNumber + '" class="choices-input" name="choice" type="radio"></input></label>');
    choiceNumber++
  };
  $('#progress').text('Question ' + questionOn + ' of ' + questionNumber);
  questionOn++;
  next++;
};

//Submit answer and check correctness.
$('#submit-answer').click(function (ev){
  let selectedInput = $('input[type=radio]:checked').parent().text();
  if (selectedInput.toString() === rightAnswer.toString()){
    score++;
    $('#test-review').append("<tr class='green'><td>" + question + "</td><td>" + selectedInput.toString() + "</td><td>" + rightAnswer.toString() + "</td></tr>");
  } else {
    wrong++;
    $('#test-review').append("<tr class='red'><td>" + question + "</td><td>" + selectedInput.toString() + "</td><td>" + rightAnswer.toString() + "</td></tr>");
  };
  $('#score').text('Your score: ' + score + ' correct, ' + wrong + ' incorrect');
  $('#question-wrapper').empty();
  if (next < 5){
    populateQuiz(questions[next]);
  } else {
    endTest();
  };
});

//Display quiz end.
function endTest (){
  $('#final-score').text('Your final score is: ' + score + ' correct, and ' + wrong + ' incorrect!');
  $('#quiz-form').toggleClass('hidden');
  $('#test-end').toggleClass('hidden');
};

//Restart quiz.
$('#restart-quiz').click(function (ev){
  $('button').toggleClass('hidden');
  $('#test-end').toggleClass('hidden');
  questionOn = 1;
  score = 0;
  wrong = 0;
  next = 0;
  $('#test-review').empty();
  $('#progress').text('Question ' + questionOn + ' of ' + questionNumber);
});

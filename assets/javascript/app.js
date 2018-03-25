var correctCount = 0;
var wrongCount = 0;
var unansweredCount = 0;
var currentQuestionIndex = 0;

var x;

var data = [
    {
        question: "Why was TRON disqualified from receiving an Academy Award nomination for special effects?",
        answers:[
            "The producer was involved in a money laundering scandal.",
            "The Academy felt at the time that using computers was cheating.",
            "The film was released a few days too late to qualify.",
            "It didn't gross enough at the box office."
        ],
        correctAnswer: 1
    },
    {
        question: "Why did many Disney animators refuse to work on the film?",
        answers:[
            "They wanted to work on projects for the soon to be launched Disney Channel.",
            "The Animator's Guild was planning a strike.",
            "They hated working with actors.",
            "They feared that computers would one day put them out of business."
        ],
        correctAnswer: 3
    },
    {
        question: "Flynn's game program is named CLU, which is an acronym for?",
        answers:[
            "Crispy Lightly-breaded Unicorns",
            "Computed Life-like Uni-code",
            "Codified Likeness Utility",
            "Computer Life Unity"
        ],
        correctAnswer: 2
    }
];



// HTML template using strings
function getTemplate(item) {
    return '<div class="row">' +
                '<div class="col-xs-12">' +
                    '<div class="question">'+ item.question +'</div>'+
                '</div>'+
            '</div>'+

            '<div class="row">'+
                '<div class="col-xs-12 text-center">'+
                    '<div class="answers">'+
                        
                        '<ol>'+
                            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[0] + '</button>' + '</li>'+
                            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[1] + '</button>' + '</li>'+
                            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[2] + '</button>' + '</li>'+
                            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[3] + '</button>' + '</li>'+
                        '</ol>'+

                    '</div>'+
                '</div>'+
            '</div>';
}

function next() {
    currentQuestionIndex++;
    if(currentQuestionIndex < data.length) {
        $("#gameScreen").html(getTemplate(data[currentQuestionIndex]));
        registerClick();
    }
    else {
        clearInterval(x);
        $("#gameScreen").hide()
        $(".game-over").show()
        $('#clock').hide()
        $("#score").html("Answered Correctly: " + correctCount + " &nbsp; &nbsp; Answered Wrong: " + wrongCount + " &nbsp; &nbsp; Unanswered: " + unansweredCount);
    };
}

function registerClick(){
    $(document).one("click",".answers li", function() {
        clearInterval(x);
        var index = $(this).index();
        var correctAnswerIndex = data[currentQuestionIndex].correctAnswer;
        if(index === correctAnswerIndex){
            correctCount++;
            showMessage("Correct!");
        }
        else{
            wrongCount++;
            showMessage("Wrong! The correct answer is " + data[currentQuestionIndex].answers[correctAnswerIndex]);
        }
    });
}

function play() {
    $("#gameScreen").html(getTemplate(data[0]));
    registerClick();
    $(".game-over, #gameScreen").hide()
    $("#start-btn").click(function() {
        $("#gameScreen").show()
        $(this).hide()
        timer();
    });

    $("#play-again-btn").click(function() {
        window.location.reload();
    });
 
}

function timer() {
    var seconds = 15;
    $("#clock").html((seconds < 10 ? ":0" : ":") + seconds)
    seconds--
    x = setInterval(function() {
        if(seconds > -1){
            $("#clock").html((seconds < 10 ? ":0" : ":") + seconds)
            seconds--
        }

        else{
            showMessage("You took too long... Next question.");
            unansweredCount++;
        }
    }, 1000);
}

function showMessage(message) {
    clearInterval(x);
    $("#clock").text(message);
    var y = setTimeout(function() {
        timer();
        next();  
    }, 4000);
}

$(document).ready(function() {
    play();
});


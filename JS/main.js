const start_btn = document.querySelector(".start_btn button")
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_Line");

const option_list = document.querySelector(".option_list");

start_btn.onclick = ()=> {
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = ()=> {
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = ()=> {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestion(0);
    quecounter(1);
    startTimer(15);
    startTimerLine(time);
}

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let widthValue = 0;

const next_btn = quiz_box.querySelector(".next_btn")

next_btn.onclick = ()=> {
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestion(que_count);
        quecounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
    }else{
        console.log("Question Completed!")
    }
}

//getting questions and answers from array
function showQuestion(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span> '+ questions[index].numb + ". " + questions[index].question +' </span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +' <span</span></div>' + '<div class="option">'+ questions[index].options[1] +'<span</span></div>' + '<div class="option">'+ questions[index].options[2] +'<span</span></div>' + '<div class="option">'+ questions[index].options[3] +'<span</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionselected(this)")
    }
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

function optionselected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if(userAns == correctAns){
        answer.classList.add("correct");
        console.log("Answer is correct!");
        answer.insertAdjacentHTML('beforeend'.tickIcon);
    }else{
        answer.classList.add("inCorrect");
        console.log("Answer is wrong!");
        answer.insertAdjacentHTML('beforeend'.crossIcon);

        for (let i = 0; i < alloptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].setAttribute("beforeend",tickIcon);
            }
        }
    }
    
    for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled");
        
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time +'px';
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}



function quecounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
let totalQuescountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
bottom_ques_counter.innerHTML = totalQuescountTag;
}
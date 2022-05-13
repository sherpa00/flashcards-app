function eventlistener() {
    const addBtn = document.querySelector(".add_question");
    const closeBtn = document.querySelector(".fa-window-close");
    const question_area = document.querySelector(".question_cont");
    const feedback = document.querySelector(".warning");
    const answer_form = document.querySelector(".answer");
    const question_form = document.querySelector(".question");
    const saveBtn = document.querySelector(".save");
    const questionList = document.querySelector(".cards_cont");
    var id = 0;

    //create a instance of UI
    const ui = new UI();

    //show question area or close it
    addBtn.addEventListener("click",() => {
        ui.showQuestion(question_area);
    });

    closeBtn.addEventListener("click",() => {
        ui.closeQuestion(question_area);
    });

    saveBtn.addEventListener("click",() => {
        const answer_val = answer_form.value;
        const question_val = question_form.value;
        
        if (answer_val == "" || question_val == "") {
            feedback.style.display = "block";

            setTimeout(() => {
                feedback.style.display = "none";
            },3000);
        } else {
            // add question to card deck;
            // create an instance of Question;
            const question = new Question(id,question_val,answer_val);
            id += 1;
            ui.addQuestion(questionList,question);
            ui.clearFields(answer_form,question_form);
        }
    });   

    setInterval(() => {
        for (let i of questionList.children) {
            i.children[4].addEventListener("click",(event) => {
                let del = event.target;
                questionList.removeChild(del.parentElement);
            })
        }
    },2000);

    setInterval(() => {
        for (let i of questionList.children) {
            i.children[3].addEventListener("click",(event) => {
                let edit = event.target;
                let val = i.children[0].innerHTML;
                question_form.value = val;
                answer_form.value = "";
                questionList.removeChild(edit.parentElement);
            })
        }
    },2000);

    setInterval(() => {
        for (let i of questionList.children) {
            i.children[1].addEventListener("click",() => {
                i.children[2].classList.toggle("show");
            })
        }
    },2000)
}

function UI() {
    UI.prototype.showQuestion = function(ele) {
        ele.style.display = "block";
    }

    UI.prototype.closeQuestion = function(ele) {
        ele.style.display = "none";
    }

    UI.prototype.addQuestion = function(element,question) {
        let parent = document.createElement("div");
        parent.classList.add("card");
        parent.innerHTML = `
            <h3 class="question_ori">${question.title}</h3>
            <a class="show_hide" href="#okay">show/hide answer</a>
            <p class="answer_ori">${question.answer}</p>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        element.appendChild(parent);
    }

    UI.prototype.clearFields = function(answer,question) {
        answer.value = "";
        question.value = "";
    };

    UI.prototype.showHideAns = function(answer) {
        answer.toggleClass("show");
    }
}

function Question(id,title,answer) {
    this.id = id;
    this.title = title;
    this.answer = answer;
}

document.addEventListener("DOMContentLoaded",() => {
    eventlistener();
})



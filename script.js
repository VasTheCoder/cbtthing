const testDetails = {
    subjects: ["Mathematics", "Physics", "Chemistry"],
    sections: [],
    time: 0,
};

const typesOfSections = [
    "MCQ",
    "SCQ",
    "Numerical",
    "Matrix Match (5x5)",
    "Match the following (ABCD)",
];
let url = null;

/**
 * For develotper
 */
//url = "archiveofourown.gay";
//url = "C:\\vasu\\scripts\\cbtthing\\sample.pdf";
//testDetails.time = 1;
//document.getElementById("presetSelect").value = "JEE ADV (Paper 1)";
//presetChanged("JEE ADV (Paper 1)");
//startTest();

/* ********************* PRE TEST SETUP ********************** */
document.getElementById("presetSelect").addEventListener("change", function () {
    presetChanged(this.value);
    displayPresetDetails();
    document.getElementById("SubjectList").style.display = "block";
    document.getElementById("SectionList").style.display = "block";
    document.getElementById("subjectForm").style.display = "block";
    document.getElementById("sectionForm").style.display = "block";
    document.getElementById("fileForm").style.display = "block";
    console.log("changed");
});

document.getElementById("sectionForm").addEventListener("click", (e) => {
    e.preventDefault();
    addEmptySection();
});

document.getElementById("addSubjectBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const subjectInput = document.getElementById("subjectNameInput");
    const subjectName = subjectInput.value.trim();
    if (subjectName) {
        testDetails.subjects.push(subjectName);
        displayPresetDetails();
        subjectInput.value = "";
    }
});

document.getElementById("timeInput").addEventListener("change", (e) => {
    testDetails.time = parseInt(e.target.value);
});

document.getElementById("fileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) {
        // TODO: show some error message to the user
        console.log("No file selected");
        return;
    }
    url = URL.createObjectURL(file);
});

function addEmptySection() {
    testDetails.sections.push({ type: "MCQ", count: 0 });
    displayPresetDetails();
}

function presetChanged(value) {
    if (value === "JEE MAINS (20 SCQ, 5 Numerical)") {
        testDetails.subjects = ["Mathematics", "Physics", "Chemistry"];
        testDetails.sections = [
            { type: "SCQ", count: 20 },
            { type: "Numerical", count: 5 },
        ];
        testDetails.time = 180;
    } else if (value === "JEE MAINS (20 SCQ, 10 Numerical)") {
        testDetails.subjects = ["Mathematics", "Physics", "Chemistry"];
        testDetails.sections = [
            { type: "SCQ", count: 20 },
            { type: "Numerical", count: 10 },
        ];
        testDetails.time = 180;
    } else if (value === "JEE ADV (Paper 1)") {
        testDetails.subjects = ["Mathematics", "Physics", "Chemistry"];
        testDetails.sections = [
            { type: "SCQ", count: 4 },
            { type: "MCQ", count: 3 },
            { type: "Numerical", count: 6 },
            { type: "Match the following (ABCD)", count: 3 },
        ];
        testDetails.time = 180;
    } else if (value === "JEE ADV (Paper 2)") {
        testDetails.subjects = ["Mathematics", "Physics", "Chemistry"];
        testDetails.sections = [
            { type: "SCQ", count: 4 },
            { type: "MCQ", count: 4 },
            { type: "Numerical", count: 8 },
        ];
        testDetails.time = 180;
    } else if (value === "Custom") {
        testDetails.subjects = [];
        testDetails.sections = [];
        testDetails.time = 0;
    } else {
        document.getElementById("SubjectList").style.display = "none";
        document.getElementById("SectionList").style.display = "none";
        document.getElementById("subjectForm").style.display = "none";
        document.getElementById("fileForm").style.display = "none";
        document.getElementById("sectionForm").style.display = "none";

        testDetails.subjects = [];
        testDetails.sections = [];
        testDetails.time = 0;
    }
}

function displayPresetDetails() {
    // adding the subject list
    const subjectlist = document.getElementById("SubjectList");
    subjectlist.innerHTML = "";
    const ul = document.createElement("ul");
    ul.className = "list-group";
    subjectlist.appendChild(ul);
    testDetails.subjects.forEach((subject) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = subject;
        ul.appendChild(li);
    });

    // adding the section details
    const sectionDetails = document.getElementById("SectionList");
    sectionDetails.innerHTML = "";
    const table = document.createElement("table");
    table.className = "table table-hover";
    sectionDetails.appendChild(table);
    const thead = document.createElement("thead");
    thead.innerHTML = `
    <tr>
    <th>Section Type</th>
    <th>Number of Questions</th>
    </tr>
    `;
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let i = 0;
    testDetails.sections.forEach((section) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const select = document.createElement("select");
        select.className = "form-control";
        select.id = "sectionSelect" + i;
        i += 1;
        // Section Type part of it
        typesOfSections.forEach((type) => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            if (type === section.type) {
                option.selected = true;
            }
            select.appendChild(option);
        });
        td1.appendChild(select);

        // no of questions part of it
        const td2 = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.className = "form-control";
        input.value = section.count;
        td2.appendChild(input);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);

        select.addEventListener("change", (e) => {
            section.type = e.target.value;
        });

        input.addEventListener("change", (e) => {
            section.count = parseInt(e.target.value);
        });
    });
}
/* ********************* END OF PRE TEST SETUP ********************** */

/* ********************* TEST INTERFACE ********************** */
let tempfile = null;
document.getElementById("fileInputInline").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) {
    }
    tempfile = URL.createObjectURL(file);
});

document.getElementById("loadNewFile").addEventListener("click", (e) => {
    if (tempfile === null) {
        x = document.getElementById("fileLinkInputInline").value;
        if (x === "") {
            alert("Please select a test file to proceed.");
            return;
        }
        tempfile = x;
    }
    const questionPaper = document.getElementById("questionPaper");
    questionPaper.src = tempfile;
});

document.getElementById("startTestBtn").addEventListener("click", (e) => {
    e.preventDefault();
    startTest();
});

function startTest() {
    if (url === null || url === undefined) {
        x = document.getElementById("fileLinkInput").value;
        if (x === "") {
            alert("Please select a test file to proceed.");
            return;
        }
        url = x;
    }
    if (document.getElementById("presetSelect").value === "(Nothing Selected)") {
        alert("Please select a preset to proceed.");
        return;
    } else if (testDetails.subjects.length === 0) {
        alert("Please add at least one subject to proceed.");
        return;
    } else if (testDetails.sections.length === 0) {
        alert("Please add at least one section to proceed.");
        return;
    } else if (testDetails.time <= 0) {
        alert("Time of the test should be greater than 0.");
        return;
    }
    document.getElementById("preTestSetup").style.display = "none";
    questionPaper = document.getElementById("questionPaper");
    document.getElementById("testInterface").style.display = "block";
    questionPaper.src = url;
    const timer = document.getElementById("timerDisplay");
    createQuestionPallette();

    startTimer(testDetails.time * 60, timer);

}

document.getElementById("saveAndNext").addEventListener("click", (e) => {
    saveAndNext();
});

document.getElementById("saveAndMarkForReview").addEventListener("click", (e) => {
    saveAndMarkForReview();
});

document.getElementById("clearResponse").addEventListener("click", (e) => {
    clearResponse();
});

document.getElementById("markForReviewAndNext").addEventListener("click", (e) => {
    markForReviewAndNext();
});

document.getElementById("submitTest").addEventListener("click", (e) => {
    if (confirm("Are you sure you want to submit the test? Once submitted, you won't be able to make any changes.")) {
        submitTest();
    }
});

function next() {
    if (currentQuestion < questionsList[currentSubject].length - 1) {
        currentQuestion += 1;
    } else if (currentSubject < testDetails.subjects.length - 1) {
        currentSubject += 1;
        currentQuestion = 0;
    } else {
        currentSubject = 0;
        currentQuestion = 0;
    }
}

function saveAndNext() {
    const currentQ = questionsList[currentSubject][currentQuestion];
    currentQ.markedForReview = false;
    if (!currentQ.selectedAnswer) {
        currentQ.object.className = "btn btn-danger";
    } else {
        currentQ.object.className = "btn btn-success";
    }
    next();
    updateQuestionDisplay();
}

function saveAndMarkForReview() {
    const currentQ = questionsList[currentSubject][currentQuestion];
    if (!currentQ.selectedAnswer) {
        markForReviewAndNext();
        return;
    }
    currentQ.markedForReview = true;
    currentQ.object.className = "btn btn-review btn-answered";
    next();
    updateQuestionDisplay();
}

function clearResponse() {
    const currentQ = questionsList[currentSubject][currentQuestion];
    currentQ.selectedAnswer = null;
    if (currentQ.markedForReview) {
        currentQ.object.className = "btn btn-review";
    } else {
        currentQ.object.className = "btn btn-danger";
    }
    updateQuestionDisplay();
}

function markForReviewAndNext() {
    const currentQ = questionsList[currentSubject][currentQuestion];
    currentQ.markedForReview = true;
    if (questionsList[currentSubject][currentQuestion].selectedAnswer) {
        currentQ.object.className = "btn btn-review btn-answered";
    } else {
        currentQ.object.className = "btn btn-review";
    }
    next();
    updateQuestionDisplay();
}

function startTimer(duration, display) {
    var timer = duration;
    setInterval(function () {
        display.textContent =
            "Time Remaining: " + parseInt(timer / 60) + ":" + parseInt(timer % 60);

        if (--timer < 0) {
            timer = 0;
            alert("Time's up! The test will now be submitted.");
            submitTest();
            return;
        }
    }, 1000);
}


let currentSubject = 0;
let currentQuestion = 0;
const questionsList = []
function createQuestionPallette() {
    const nav = document.getElementById("subjectNav");
    const ul = document.createElement("ul");
    ul.className = "nav nav-tabs";
    testDetails.subjects.forEach((subject, i) => {
        const li = document.createElement("li");
        li.innerHTML = `<a data-toggle="tab" style="cursor:pointer" id="${subject}Nav">${subject}</a>`;
        if (i === currentSubject) {
            li.className = "active";
        }
        ul.appendChild(li);
    });
    nav.appendChild(ul);
    // loop through the subjects and add event listeners to the nav buttons
    testDetails.subjects.forEach((subject, i) => {
        document.getElementById(`${subject}Nav`).addEventListener("click", () => {
            if (questionsList[currentSubject][currentQuestion].selectedAnswer) {
                if (questionsList[currentSubject][currentQuestion].markedForReview) {
                    questionsList[currentSubject][currentQuestion].object.className = "btn btn-review btn-answered";
                } else {
                    questionsList[currentSubject][currentQuestion].object.className = "btn btn-success";
                }
            }
            currentSubject = i;
            currentQuestion = 0;
            updateQuestionDisplay();
        });
    });

    const questionNumbers = document.getElementById("questionNumbers");
    testDetails.subjects.forEach((subject, i) => {
        questionsList.push([]);
        const subjectDiv = document.createElement("div");
        subjectDiv.id = subject;
        questionNumbers.appendChild(subjectDiv);
        if (i === currentSubject) {
            subjectDiv.style.display = "block";
        } else {
            subjectDiv.style.display = "none";
        }

        testDetails.sections.forEach((section, j) => {
            const sectionDiv = document.createElement("div");
            sectionDiv.id = `${subject}${j}`;
            subjectDiv.appendChild(sectionDiv);
            const h4 = document.createElement("h4");
            h4.textContent = `Section ${j + 1} (${section.type})`;
            sectionDiv.appendChild(h4);
            for (let k = 0; k < section.count; k++) {
                const questionBtn = document.createElement("button");
                questionBtn.className = "btn btn-default";
                questionBtn.textContent = `${subject[0]}Q${k + 1}`;
                sectionDiv.appendChild(questionBtn);
                questionsList[i].push({ "object": questionBtn, "selectedAnswer": null, "markedForReview": false });
            }
        });

        for (let j = 0; j < questionsList[i].length; j++) {
            questionsList[i][j].object.addEventListener("click", () => {
                if (questionsList[currentSubject][currentQuestion].selectedAnswer) {
                    if (questionsList[currentSubject][currentQuestion].markedForReview) {
                        questionsList[currentSubject][currentQuestion].object.className = "btn btn-review btn-answered";
                    } else {
                        questionsList[currentSubject][currentQuestion].object.className = "btn btn-success";
                    }
                }
                currentQuestion = j;
                //console.log(currentQuestion);
                updateQuestionDisplay();
            });
        }
    });
}

function updateQuestionDisplay() {
    if (questionsList[currentSubject][currentQuestion].object.className === "btn btn-default") {
        questionsList[currentSubject][currentQuestion].object.className = "btn btn-danger";
    }
    testDetails.subjects.forEach((subject, i) => {
        const subjectDiv = document.getElementById(subject);
        if (i === currentSubject) {
            subjectDiv.style.display = "block";
        } else {
            subjectDiv.style.display = "none";
        }
    });

    // find the index of the current section using the current question number
    let sectionIndex = 0;
    let cumulativeCount = 0;
    for (let i = 0; i < testDetails.sections.length; i++) {
        if (currentQuestion < cumulativeCount + testDetails.sections[i].count) {
            sectionIndex = i;
            break;
        }
        cumulativeCount += testDetails.sections[i].count;
    }
    updateAnsweringBox(sectionIndex);
}

function updateAnsweringBox(sectionIndex) {
    const answeringBox = document.getElementById("answerinput");
    answeringBox.innerHTML = "";
    const sectionType = testDetails.sections[sectionIndex].type;

    const h4 = document.createElement("h4");
    h4.textContent = `Enter correct ans for S${sectionIndex + 1} Q${currentQuestion + 1}`;
    answeringBox.appendChild(h4);
    if (sectionType === "MCQ" || sectionType === "SCQ" || sectionType === "Match the following (ABCD)") {
        const form = document.createElement("form");
        form.id = `F${currentSubject}${currentQuestion}`;
        let options = "ABCD";
        for (let i = 0; i < 4; i++) {
            const div = document.createElement("div");
            const input = document.createElement("input");
            input.type = sectionType === "MCQ" ? "checkbox" : "radio";
            input.name = "option";
            input.value = options[i];
            const label = document.createElement("label");
            if (sectionType === "Match the following (ABCD)" || sectionType === "SCQ") {
                if (options[i] === questionsList[currentSubject][currentQuestion].selectedAnswer) {
                    input.checked = true;
                }
            } else {
                if (questionsList[currentSubject][currentQuestion].selectedAnswer && questionsList[currentSubject][currentQuestion].selectedAnswer.includes(options[i])) {
                    input.checked = true;
                }
            }
            label.textContent = options[i];
            // make the label for the input
            label.prepend(input);
            div.appendChild(input);
            div.appendChild(label);
            form.appendChild(div);

            input.addEventListener("change", (e) => {
                if (sectionType === "MCQ") {
                    const selectedOptions = [];
                    const checkboxes = document.querySelectorAll(`input[name="option"]:checked`);
                    checkboxes.forEach(cb => {
                        selectedOptions.push(cb.value);
                    });
                    questionsList[currentSubject][currentQuestion].selectedAnswer = selectedOptions;
                } else {
                    questionsList[currentSubject][currentQuestion].selectedAnswer = e.target.value;
                }
                //console.log(questionsList[currentSubject][currentQuestion].selectedAnswer);
            });
        }
        answeringBox.appendChild(form);

    } else if (sectionType === "Numerical") {
        const input = document.createElement("input");
        input.type = "number";
        input.className = "form-control";
        input.value = questionsList[currentSubject][currentQuestion].selectedAnswer || "";
        input.addEventListener("change", (e) => {
            questionsList[currentSubject][currentQuestion].selectedAnswer = e.target.value;
        }
        );
        answeringBox.appendChild(input);

    } else if (sectionType === "Matrix Match (5x5)") {
        // TO BE IMPLEMENTED
    }
}

function submitTest() {
    document.getElementById("responseButtons").style.display = "none";
    document.getElementById("timerDisplay").style.display = "none";
    const answeringBox = document.getElementById("answerinput");
    answeringBox.innerHTML = "";
    createResultTable();
}
/*

<h4>Section one</h4>
<table class="table table-condensed">
    <thead>
    <tr>
        <th>Qn no</th>
        <th>Your answer</th>
        <th>Correct answer</th>
        <th>Marks Awarded</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>1</td>
        <td>A</td>
        <td>A</td>
        <td><input type="number" value="4" min="0" max="4" /></td>
    </tr>
    <tr>
        <td>2</td>
        <td>B</td>
        <td>C</td>
        <td><input type="number" value="0" min="0" max="4" /></td>
    </tr>
    <h4>Section two</h4>
    <tr>
        <td>21</td>
        <td>2</td>
        <td>2</td>
        <td><input type="number" value="4" min="0" max="4" /></td>
    </tr>
    </tbody>
</table>

*/
function createResultTable() {
    const answeringBox = document.getElementById("answerinput");

    // 
    for (let i = 0; i < testDetails.subjects.length; i++) {
        insertSubjectDetails(i, answeringBox);
        let questionNumber = 1;
        testDetails.sections.forEach((section, j) => {
            const sectionHeader = document.createElement("h4");
            sectionHeader.textContent = `Section ${j + 1}`;
            if (section.type === "MCQ") {
                sectionHeader.innerHTML += "<br />Ctrl/Cmd + Click on laptop";
            }
            answeringBox.appendChild(sectionHeader);
            const table = document.createElement("table");
            table.className = "table table-condensed";
            if (i === 0 && j === 0) {
                const thead = document.createElement("thead");
                thead.innerHTML = `
                <tr>
                    <th>Qn no</th>
                    <th>Your answer</th>
                    <th>Correct answer</th>
                    <th>Marks Awarded</th>
                </tr>
                `;
                table.appendChild(thead);
            }
            const tbody = document.createElement("tbody");
            table.appendChild(tbody);
            for (let k = 0; k < section.count; k++) {
                questionNumber = addRowToResultTable(questionNumber, i, section, tbody);
            }

            answeringBox.appendChild(table);
            const p = document.createElement("p");
            p.id = `totalMarks${i}${j}`;
            p.textContent = "Total marks for this section: ";
            answeringBox.appendChild(p);
        });
    }
    for (let i = 0; i < testDetails.subjects.length; i++) {
        const subjectTotalMarks = document.createElement("p");
        subjectTotalMarks.id = `subjectTotalMarks${i}`;
        subjectTotalMarks.textContent = `${testDetails.subjects[i]}: `;
        answeringBox.appendChild(subjectTotalMarks);
    }
    const totalMarksElement = document.createElement("h3");
    totalMarksElement.id = "totalMarks";
    totalMarksElement.textContent = "Total marks: ";
    answeringBox.appendChild(totalMarksElement);

    for (let i = 0; i < testDetails.subjects.length; i++) {
        let questionNumber = 0;
        testDetails.sections.forEach((section) => {
            for (let k = 0; k < section.count; k++) {
                questionNumber = addEventListenersToAnswerAndMarks(i, questionNumber, section);
            }
        });
    }
}

function addEventListenersToAnswerAndMarks(i, questionNumber, section) {
    console.log(questionNumber);
    const index = questionNumber;
    const correctAnswerElement = document.getElementById(`correctAnswer${i}${questionNumber}`);
    const marksElement = document.getElementById(`marks${i}${questionNumber}`);
    correctAnswerElement.addEventListener("change", () => {
        console.log(questionsList[i][questionNumber]);
        console.log(questionsList[i]);
        console.log(questionNumber);
        console.log(index);
        const userAnswer = questionsList[i][index].selectedAnswer;
        const correctAnswer = correctAnswerElement.multiple ? Array.from(correctAnswerElement.selectedOptions).map(option => option.value) : correctAnswerElement.value;
        evaluateAnswer(userAnswer, correctAnswer, section.type, marksElement);
    });
    marksElement.addEventListener("change", () => {
        if (marksElement.value < 0) {
            marksElement.style.backgroundColor = "red";
        } else if (marksElement.value > 0) {
            marksElement.style.backgroundColor = "green";
        } else {
            marksElement.style.backgroundColor = "";
        }
        console.log(
            marksElement.value
        );
        updateMarksElements();
    });
    questionNumber++;
    return questionNumber;
}

function addRowToResultTable(questionNumber, i, section, tbody) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.textContent = questionNumber;
    const td2 = document.createElement("td");
    td2.textContent = questionsList[i][questionNumber - 1].selectedAnswer || "-";
    const td3 = document.createElement("td");
    // if its an SCQ or Match the following, the input has to be a dropdown with options A, B, C, D
    if (section.type === "SCQ" || section.type === "Match the following (ABCD)") {
        const select = document.createElement("select");
        //select.className = "form-control";
        select.id = `correctAnswer${i}${questionNumber - 1}`;
        //const nothing_option = document.createElement("option");
        //nothing_option.value = "";
        //nothing_option.textContent = "None";
        //select.appendChild(nothing_option);
        const options = ["", "A", "B", "C", "D"];
        options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        td3.appendChild(select);
    } else if (section.type === "Numerical") {
        const input1 = document.createElement("input");
        input1.type = "number";
        input1.style.maxWidth = "50px";
        input1.style.overflowX = "scroll";
        input1.id = `correctAnswer${i}${questionNumber - 1}`;
        td3.appendChild(input1);
    } else if (section.type === "MCQ") {
        // let it be a dropdown that lets you select multiple things, you can use bootstrap selectpicker for that
        const select = document.createElement("select");
        select.multiple = true;
        select.id = `correctAnswer${i}${questionNumber - 1}`;
        const options = ["A", "B", "C", "D"];
        options.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
        td3.appendChild(select);
    }
    const td4 = document.createElement("td");
    td4.innerHTML = `<input id = "marks${i}${questionNumber - 1}" type="number" min="-10" max="10" value="0" />`;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
    questionNumber++;
    return questionNumber;
}

function insertSubjectDetails(i, answeringBox) {
    const subject = testDetails.subjects[i];
    const subjectHeader = document.createElement("h4");
    subjectHeader.textContent = subject;
    answeringBox.appendChild(subjectHeader);
}

function evaluateAnswer(userAnswer, correctAnswer, sectionType, marksElement) {
    // evaluates the marks for the answer and changes the marks input field's value and colour
    if (sectionType === "SCQ" || sectionType === "Match the following (ABCD)" || sectionType === "Numerical") {
        if (userAnswer === correctAnswer) {
            const preset = document.getElementById("presetSelect").value;
            if (preset === "JEE Adv (Paper 1)" || preset === "JEE Adv (Paper 2)") {
                marksElement.value = 3;
            } else {
                marksElement.value = 4;
            }
            marksElement.style.backgroundColor = "green";
        } else if (!userAnswer) {
            marksElement.value = 0;
        } else {
            marksElement.value = -1;
            marksElement.style.backgroundColor = "red";
        }
    } else if (sectionType === "MCQ") {
        console.log("USER ANSWER");
        console.log(userAnswer);
        console.log("CORRECT ANSWER");
        console.log(correctAnswer);
        if (!userAnswer || userAnswer.length === 0) {
            marksElement.value = 0;
            return;
        }
        let done = false;
        userAnswer.forEach((option) => {
            if (!correctAnswer.includes(option)) {
                marksElement.value = -2;
                marksElement.style.backgroundColor = "red";
                done = true;
            }
        });
        if (done) {
            return;
        }
        if (userAnswer.length === correctAnswer.length) {
            marksElement.value = 4;
            marksElement.style.backgroundColor = "green";
        } else {
            console.log(userAnswer.length);
            marksElement.value = userAnswer.length;
            marksElement.style.backgroundColor = "lightgreen";
        }
    }
    updateMarksElements();
}

function updateMarksElements() {
    let totalMarks = 0;
    for (let i = 0; i < testDetails.subjects.length; i++) {
        let subjectTotal = 0;
        let questionNumber = 0;
        for (let j = 0; j < testDetails.sections.length; j++) {
            let sectionTotal = 0;
            for (let k = 0; k < testDetails.sections[j].count; k++) {
                const marksElement = document.getElementById(`marks${i}${questionNumber}`);
                sectionTotal += parseInt(marksElement.value) || 0;
                totalMarks += parseInt(marksElement.value) || 0;
                questionNumber++;
            }
            const sectionTotalMarksElement = document.getElementById(`totalMarks${i}${j}`);
            sectionTotalMarksElement.textContent = `Total marks for this section: ${sectionTotal}`;
            subjectTotal += sectionTotal;
        }
        const subjectTotalMarksElement = document.getElementById(`subjectTotalMarks${i}`);
        subjectTotalMarksElement.textContent = `${testDetails.subjects[i]}: ${subjectTotal}`;
    }
    const totalMarksElement = document.getElementById("totalMarks");
    totalMarksElement.textContent = `Total marks: ${totalMarks}`;
}
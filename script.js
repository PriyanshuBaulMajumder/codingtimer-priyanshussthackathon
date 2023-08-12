/*DOM gets the orders by there id as selected in html*/
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const studyTimeInput = document.getElementById('studyTimeInput');
const breakTimeInput = document.getElementById('breakTimeInput');
const loopSelect = document.getElementById('loopSelect');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


/*initializing the variables*/
let timerInterval;
let totalLoops;
let currentLoop = 0;

/* a arrow function that starts with 'click' start button taking all in integers and then does the check if its integer and assign them to work */
startButton.addEventListener('click', () => {
    const studyTime = parseInt(studyTimeInput.value);
    const breakTime = parseInt(breakTimeInput.value);
    totalLoops = parseInt(loopSelect.value);

    if (!isNaN(studyTime) && !isNaN(breakTime) && !isNaN(totalLoops)) {
        studyTimeInput.disabled = true;
        breakTimeInput.disabled = true;
        loopSelect.disabled = true;
        startTimerLoop(studyTime * 60, breakTime * 60);
    }
});


/*reset button to reset all */
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    resetControls();
});

/*checks if loop is low and also either its on the break or study time using odd even principle
if its below it resets or it increases a loop */ 
function startTimerLoop(studyDuration, breakDuration) {
    if (currentLoop < totalLoops) {
        const nextDuration = currentLoop % 2 === 0 ? studyDuration : breakDuration;
        startTimer(nextDuration, () => {
            currentLoop++;
            startTimerLoop(studyDuration, breakDuration);
        });
    } else {
        resetControls();
        
    }
}


/*checks the time */
function startTimer(duration, callback) {
    let seconds = duration;

    clearInterval(timerInterval); // Clear any previous intervals

    timerInterval = setInterval(() => {
        const minutesDisplay = Math.floor(seconds / 60);
        const secondsDisplay = seconds % 60;

        document.getElementById('minutes').textContent = minutesDisplay < 10 ? '0' + minutesDisplay : minutesDisplay;
        document.getElementById('seconds').textContent = secondsDisplay < 10 ? '0' + secondsDisplay : secondsDisplay;

        seconds--;

        if (seconds < 0) {
            clearInterval(timerInterval);
            callback();
        }
    }, 1000);/*its shows that it runs every 1000 ms or 1 second */
}

//function to disable them(represented by false) and print accordingly
function resetControls() {
    studyTimeInput.disabled = false;
    breakTimeInput.disabled = false;
    loopSelect.disabled = false;
    currentLoop = 0;
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
}

//function to add tasks
function addTask() {
    const taskText = taskInput.value.trim();//trim any whitespaces
    if (taskText !== '') {//check wether its empty or not
        const taskItem = document.createElement('li');//create a list
        taskItem.textContent = taskText;//storing in a variable
        taskList.appendChild(taskItem);//appending the function
        taskInput.value = '';// it clears the value being a empty string
    }
}

//to delete task
function deleteTask(event) {
    const taskItem = event.target;//this points the event that have been recently targetted in this case li
    taskItem.style.textDecoration = 'line-through';//style 

    setTimeout(() => {
        taskList.removeChild(taskItem);
    }, 1000); // Remove after 1 second
}
// to work accoridnt to the input 
document.getElementById('addTaskButton').addEventListener('click', addTask);
taskList.addEventListener('click', deleteTask);

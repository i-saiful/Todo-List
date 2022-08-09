// Define UI Element
const form = document.getElementById('form')
const newTask = document.getElementById('new-task')
const filter = document.getElementById('task-filter')
const taskLists= document.getElementById('tasks-list')
const clearTask = document.getElementById('clear-task')

// event Listener
form.addEventListener('submit', addTask);
taskLists.addEventListener('click', removeTask);
clearTask.addEventListener('click', displayTaskClear);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', render)


// Define variavle 
let tasks = []

// render tasks list
function render() {
    if(localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    let items = ''
    tasks.forEach(item => {
        items += `<li>${item} <a href="#">X</a></li>`
    })
    taskLists.innerHTML = items
}

// add task
function addTask(e) {
    e.preventDefault()
    if(newTask.value) {
        tasks.push(newTask.value)
        newTask.value = ''
        storeTaskInLocalStorage()
        render()
    } else {
        confirm('Add new Task')
    }
}

// remove task
function removeTask(e) {
    if(e.target.hasAttribute('href')) {
        if(confirm('Are you sure delete this item')) {
            let item = e.target.parentElement.textContent.replace(' X', '')
            let index = tasks.indexOf(item)
            tasks.splice(index, 1)
            storeTaskInLocalStorage()
            render()
        }
    }
}

// clear display task
function displayTaskClear() {
    tasks = []
    localStorage.clear()
    render()
}

// filter task 
function filterTask(e) {
    let search = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(item => {
        let text = item.firstChild.textContent
        if(text.toLowerCase().indexOf(search) !== -1) {
            item.style.display = 'block'
        } else {
            item.style.display = 'none'
        }
        // console.log(text);
    })
}

function storeTaskInLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
var push = document.getElementById("push-task");
push.onclick = function() {
  var taskName = document.getElementById("new-task");
  if (taskName.value != "") {
    var task = document.createElement("li");
    task.textContent = taskName.value;
    var list = document.getElementById("task-container");
    list.appendChild(task);
  }
}

var pop = document.getElementById("pop-task");
pop.onclick = function() {
  var taskContainer = document.getElementById("task-container");
  if (taskContainer.hasChildNodes()) {
    taskContainer.removeChild(taskContainer.childNodes[0]);
  }
}

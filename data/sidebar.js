// Push task into the container
$("#push-task").click(function(){
  var taskName = $("#new-task");

  if (taskName.val() != "") {
    $("#task-container").append( "<li>" + taskName.val() + "</li>");
    $("#new-task").val("");
  }
});

// Submit task when pressed enter.
$("#new-task").keyup(function(event) {
  if (event.keyCode == 13) {
    $("#push-task").click();
  }
});

// Task pop
$("#pop-task").click(function(){
  var fRadio = $("#fifo-radio");
  var lRadio = $("#lifo-radio");
  // FIFO pop
  if (fRadio.is(":checked")) {
    if ($("#task-container").children().length > 0) {
      $("#task-container").children()[0].remove();
    }
  }
  // LIFO pop
  else if (lRadio.is(":checked")) {
    if ($("#task-container").children().length > 0) {
      var container = $("#task-container");
      var length = container.children().length;
      container.children()[length-1].remove();
    }
  }
});

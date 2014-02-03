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
    console.log("FIFO length: " + $("#task-container").children().length);
    if ($("#task-container").children().length > 0) {
      console.log("fifo pop");
      $("#task-container").children()[0].remove();
    }
  }
  // LIFO pop
  else if (lRadio.is(":checked")) {
    console.log("LIFO length: " + $("#task-container").children().length);
    if ($("#task-container").children().length > 0) {
      console.log("lifo pop");
      var container = $("#task-container");
      var length = container.children().length;
      container.children()[length-1].remove();
    }
  }
});

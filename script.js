
// function that makes your selected type of trash appear below the input
function onInput() {
  // select the text input
  var val = document.getElementById("trashytrash").value;
  // select all the items on the datalist
  var opts = document.getElementById("trash").childNodes;
  // constantly compare content of input to every item on datalist
  for (var i = 0; i < opts.length; i++) {
    if (opts[i].value === val) {
      // select destination spot
      var destination = document.getElementById("results-here");
      // clear any previous content in destination spot
      while (destination.firstChild) {
        destination.removeChild(destination.firstChild);
      }
      // insert newly selected type of trash into results window
      var content = document.createTextNode(opts[i].value);
      destination.appendChild(content);
      break;
    }
  }
}

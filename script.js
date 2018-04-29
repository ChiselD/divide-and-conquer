
//////// OBJECT TO TRACK CURRENT TRASH ////////

// // set up blank object to be continuously updated // TEMPORARY
// var currentTrash = {
//   "name": "",
//   "category": "",
//   "current": "",
//   "notes": ""
// };


//////// FUNCTIONS FOR DISPLAYING TRASH ////////

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
      // // update 'current trash' object // TEMPORARY
      // currentTrash.name = // TEMPORARY
      break;
    }
  }
}

// function that loads trash options into datalist from JSON
function getJSON() {
  // get the datalist and input elements
  var dataList = document.getElementById("trash");
  var input = document.getElementById("trashytrash")
  // load JSON file and populate options
  // step 1: create a new XMLHttpRequest
  var request = new XMLHttpRequest();
  // step 2: handle state changes for the request
  request.onreadystatechange = function(response) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        // parse the JSON
        var jsonOptions = JSON.parse(request.responseText);
        console.log(jsonOptions);
        // loop over the JSON array
        jsonOptions.trash.forEach(function(item) {
          // create a new <option> element
          var option = document.createElement('option');
          // set the value using the item in the JSON array
          option.value = item.name;
          // add the <option> element to the <datalist>
          dataList.appendChild(option);
        });

        // update the placeholder text
        input.placeholder = "placeholder text goes here";
      } else {
        // an error occurred! :(
        input.placeholder = "Couldn't load datalist options :(";
      }
    }
  };

  // update the placeholder text
  input.placeholder = "Loading options...";

  // set up and make the request
  request.open('GET', 'trash-list.json', true);
  request.send();
}

getJSON();

//////// FUNCTIONS FOR CHANGING COLOR ////////

// // function that changes background color of results window // TEMPORARY
// function changeColor() {
//   var element = document.getElementById("results-here");
//   element.classList.add("yellow");
// }

function onInput() {
  var val = document.getElementById("trashytrash").value;
  var opts = document.getElementById("trash").childNodes;
  for (var i = 0; i < opts.length; i++) {
    if (opts[i].value === val) {
      // DO SOMETHING
      alert(opts[i].value);
      break;
    }
  }
}

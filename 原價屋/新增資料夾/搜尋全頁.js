// function removeItemOnce(arr, value) {
//   var index = arr.indexOf(value);
//   if (index > -1) {
//     arr.splice(index, 1);
//   }
//   return arr;
// }

function removeAt(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

var _filter = () => {
  var searchInput = document.querySelector('#searchInput');
  var cards = document.querySelectorAll('.main span');
  var filteredCards = [];
  console.log(searchInput.value);

  for (var card of cards) {
    card.style.display = 'none';
  }

  // ----------------- Search By Keywords
  if (searchInput.value == undefined && searchInput.value.trim() == '') {
    if (cards) {
      for (var card of cards) {
        // card.style.display = '';
        filteredCards.push(card);
      }
    }
  } else {
    var keys = searchInput.value.split(' ');
    for (var key of keys) {
      key = key.toLowerCase();
    }
    
    if (cards) {
      for (var card of cards) {
        var found = false;
        var content = card.innerHTML.toLowerCase();
        for (var key of keys) {
          if (content.includes(key)) {
            found = true;
            break;
          }
        }
        // card.style.display = found ? '' : 'none';
        if (found) {
          filteredCards.push(card);
        } 
      }
    }
  }

  // ----------------- Search By Price
  var p1 = parseInt(document.querySelector('#price1Input').value);
  var p2 = parseInt(document.querySelector('#price2Input').value);

  if (isNaN(p1)) { p1 = null; }
  if (isNaN(p2)) { p2 = null; }

  for (var i = 0; i < filteredCards.length; i++) {
    var card = filteredCards[i];
    var test = card.innerHTML.match(/含稅價：NT[\d]+　◆/);
    // console.log(test);
    if (!test || test == null || test.length == 0) {
      continue;
    }
    var price = parseInt(test[0].substring("含稅價：NT".length));
    var match = true;
    // console.log(test, price);

    if (!isNaN(price) && (p1 != null || p2 != null)) {
      if (p1 != null && p1 > price) {
        match = false;
      }
      if (match && p2 != null && p2 < price) {
        match = false;
      }
    } else {
      console.log(`parse wrong: ${test}`);
    }

    if (!match) {
      removeAt(filteredCards, i);
    } else {
      // console.log(`${p1} < ${price} < ${p2}`);
    }
  }

  // ----------------- Result
  for (var card of filteredCards) {
    card.style.display = '';
  }
}

var init = () => {
  var body = document.querySelector('body');
  body.innerHTML = `<div>
     關鍵字 <input id="searchInput" type="text" /><br/>
     價錢 <input id="price1Input" type="number" /> - <input id="price2Input" type="number" />
  </div>` + body.innerHTML;

  var searchInput = document.querySelector('#searchInput');
  searchInput.addEventListener('change', () => {
    _filter();
  });

  var price1Input = document.querySelector('#price1Input');
  price1Input.addEventListener('change', () => {
    _filter();
  });

  var price2Input = document.querySelector('#price2Input');
  price2Input.addEventListener('change', () => {
    _filter();
  });
} 

init();
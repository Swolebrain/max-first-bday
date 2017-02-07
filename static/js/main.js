var btn = document.getElementById('rsvp-now');
var modal = document.getElementById('modal');
var spidey = document.querySelectorAll('.spidey')[0];
var web = document.querySelectorAll('.web')[0];
var form = document.getElementById('form');
btn.addEventListener('click', function(e){
  modal.style.display = 'flex';
  spidey.classList.add('spidey-animate');

  setTimeout(function(){
    web.classList.add('growth-animation');
  },1700);
  setTimeout(function(){
    form.classList.add('growth-animation');
  },2000);
});

/*
  #####FORM#############################
*/
var nameField = document.getElementById('name');
var numAdults = document.getElementById('numAdults');
var numChildren = document.getElementById('numChildren');

var declineBtn = document.getElementById('decline-btn');
declineBtn.onclick = declineHandler;
function declineHandler(e){
  if (!nameField.value || nameField.value.length < 3){
    alert("Please tell us who you are!");
    return;
  }
  declineBtn.onclick = null;
  //send request to decline
  sendRequest('/rsvp', 'POST', {name: nameField.value, attending: false }, function(res){
    if (res.status != 200){
      alert("Whoops, there was a problem! Please refresh the page and try again");
      return;
    }
    displayFeedback("We'll miss you!");
  });
}

var rsvpBtn = document.getElementById('rsvp-btn');
rsvpBtn.onclick = rsvpHandler;
function rsvpHandler(e){
  if (!nameField.value || nameField.value.length < 3){
    alert("Please tell us who you are!");
    return;
  }
  if ( Number(numAdults.value) + Number(numChildren.value) == 0 ){
    alert("Please tell us how many guests!");
    return;
  }
  rsvpBtn.onclick = null;
  //send request to accept
  sendRequest('/rsvp', 'POST', {
    name: nameField.value,
    numChildren: Number(numChildren.value),
    numAdults: Number(numAdults.value),
    attending: true
  }, function(res){
    if (res.status != 200){
      alert("Whoops, there was a problem! Please refresh the page and try again");
      return;
    }
    displayFeedback("Thanks! We'll have fun!");
  });
}

var viewGuestsBtn = document.getElementById('view-guests-btn');
viewGuestsBtn.onclick = viewGuestsHandler;
function viewGuestsHandler(e){
  sendRequest('/guests', 'GET', null, function(res){
    var totalChildren = 0;
    var totalAdults = 0;
    var appendStr = '';
    res.forEach(function(guest){
      if (!guest.attending) return;
      if (!guest.numAdults) guest.numAdults = 0;
      if (!guest.numChildren) guest.numChildren = 0;
      totalChildren += guest.numChildren;
      totalAdults += guest.numAdults;
      appendStr += `
        <h3 class='guest-name'>${guest.name}</h3>
        <h4 class="subtext">${guest.numAdults} adults, ${guest.numChildren} children</h4>
      `
    });
    appendStr = `<h3>${totalChildren} children and ${totalAdults} adults attending</h3>` + appendStr;
    form.innerHTML = appendStr;
  });
}


function sendRequest(url, method, data, cb){
  var http = new XMLHttpRequest();
  http.onload = function(){
    console.log("Server response:");
    console.log(this.response);
    if (this.status === 200)
      return cb(JSON.parse(this.response));
    return cb(this.responseText);
  }
  http.open(method, url, true);
  if (method.toLowerCase() == 'post'){
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(data));
    return;
  }
  http.send();

}

var feedback = document.getElementById('feedback');
function displayFeedback(msg){
  feedback.innerHTML = msg;
  feedback.style.opacity = 1;

  // setTimeout(function(){
  //   feedback.style.opacity = 0;
  // }, 1250);
}

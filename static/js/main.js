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
var name = document.getElementById('name');
var numAdults = document.getElementById('numAdults');
var numChildren = document.getElementById('numChildren');

var declineBtn = document.getElementById('decline-btn');
declineBtn.onclick = declineHandler;
function declineHandler(e){
  if (name.value.length < 3){
    alert("Please tell us who you are!");
    return;
  }
  declineBtn.onclick = null;
  //send request to decline
}

var rsvpBtn = document.getElementById('rsvp-btn');
rsvpBtn.onclick = rsvpHandler;
function rsvpHandler(e){
  if (name.value.length < 3){
    alert("Please tell us who you are!");
    return;
  }
  if ( Number(numAdults.value) + Number(numChildren.value) == 0 ){
    alert("Please tell us how many guests!");
    return;
  }
  rsvpBtn.onclick = null;
  //send request to accept
}

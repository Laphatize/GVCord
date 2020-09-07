var guilds;
var guildid= ""
function select(id) {
    document.getElementById("guilds").style.display = "none";
    document.getElementById("new").style.display = "block";
    guildid = id;
}


function done() {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
 
      }
  };
  xhttp.open("GET", `https://gvcord.pranavramesh.dev/api/setchannel?g=${guildid}&c=${document.getElementById('c').value}`, true);
  xhttp.send();


  document.getElementById("new").style.display = "none";
  document.getElementById("done").style.display = "block";

  var duration = 15 * 1000;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

var interval = setInterval(function() {
  var timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  var particleCount = 50 * (timeLeft / duration);
  // since particles fall down, start a bit higher than random
  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
}, 250);
}


function getGuilds() {
    fetch('https://discordapp.com/api/users/@me/guilds', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      }).then(function (response) {
        return response.json();
      }).then(function(data) {
     
        var ownerg = 0;
        data.forEach(element => {
            if (element.owner == true) {
                console.log(element);
                ownerg++;
                var h = document.getElementById("heady");
h.insertAdjacentHTML("afterend", ` <div class="card" style="width:90%;"><div class="card-body"><div style="margin-bottom:0;"><span style="font-size:1.5rem;">${element.name}</span> <button class="btn btn-outline-dark" style="float:right;margin-bottom:0;" onclick="select('${element.id}')">Select</button></div></div></div> <br>`);
            }
        });


        var rows = Math.floor(ownerg/2);
        console.log(rows);

    
      }
     );
}






if (localStorage.getItem("token")) {
    fetch('https://discordapp.com/api/users/@me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
      }).then(function (response) {
        return response.json();
      }).then(function(data) {
         if (!data.id) {
             return;
         } else {
             console.log(data)
             document.getElementById("login").style.display = "none";
             document.getElementById("guilds").style.display = "block";

             getGuilds();
         }
      }
     );
}







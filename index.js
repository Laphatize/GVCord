const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const { response } = require('express');
var db= require("quick.db");
const { request } = require('http');
var app = express();
const fetch = require("node-fetch");

app.set('view engine', 'ejs');  
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/setup', function (req, res) {
  res.sendFile(__dirname + '/views/setup.html')
})
app.get('/setup/callback', function (req, res) {
  
  res.sendFile(__dirname + '/views/callback.html')
})


app.get('/setup/failure', function (req, res) {
  
  res.sendFile(__dirname + '/views/failure.html')
})


app.get('/api/fetchToken', function (req, res) {
  if (!req.query.code) return res.send("error");
  var accessCode = req.query.code;

  const data = {
    client_id: '751225929426272276',
    client_secret: 'yPCmNtLArT34YjGlDYGewW-E-9KrpKcR',
    grant_type: 'authorization_code',
    redirect_uri: 'https://gvcord.pranavramesh.dev/setup/callback',
    code: accessCode,
    scope: 'identify guilds email',
  };
  
  fetch('https://discordapp.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(data => data.json())
    .then(data => res.send(data));

})




app.get('/api/setchannel', function (req, res) {
  db.set(req.query.g + "_channel", req.query.c);
  client.guilds.cache.get(req.query.g).channels.cache.find(channel => channel.name === db.get(req.query.g + "_channel")).send({ "embed": {
    "title": "You need to verify to talk on this server.",
    "color": 5572102,
    "description": "If you just joined the server, you will have recieved a link for me. Click that link to finish the verification process.\n\nIf were already in the server and did not recieve a verification message - please run `!link`."
  }
})

if (!client.guilds.cache.get(g).roles.cache.find(role => role.name === "GV")) {
  client.guilds.cache.get(req.query.g).roles.create({
    data: {
        name: 'GV',
        color: 'WHITE',
    },
    reason: 'Verified GV student',
})
.then()
.catch(console.error);
}


return res.send("done")
})


app.get('/validate', function (req, res) {
    var u = req.query.userid;
    var email  = req.query.email;
    var g = req.query.g

  
    
if (!client.guilds.cache.get(g).channels.cache.find(channel => channel.name === 'new-members')) {
    client.guilds.cache.get(g).channels.create('new-members', { type: 'text', reason: 'LOGS SHOW HERE' });
} 
    client.guilds.cache.get(g).channels.cache.find(channel => channel.name === 'new-members').send(new Discord.MessageEmbed()

    .setTitle( "Hello " + req.query.name + "!")
    .setThumbnail(req.query.pfp)
    .setDescription("Email: " + req.query.email))

    
    var role = client.guilds.cache.get(g).roles.cache.find(role => role.name === "GV");
        client.guilds.cache.get(g).members.fetch(u).then((member) => {
    
            member.roles.add(role)
            member.send("Welcome " + email)
        
          });
    res.send("okay")
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Invite me to your server! gvcord.pranavramesh.dev');

});

client.on('message', msg => {

  
  if (msg.content === '!ping') {
    msg.reply(`${client.ws.ping}ms`);
  }

  if (msg.content.startsWith('!eval')) {
    if (msg.author.id == '668993543527858196') {
eval(msg.content.slice(6))
    }
  }
  if (msg.content === '!link') {


    if (db.get(msg.guild.id + "_channel")) {
    client.emit('guildMemberAdd', msg.member);
    msg.react('✅')
    msg.reply({ "embed": {
      "color": 5572102,
      "description": ":inbox_tray: I sent you a DM containing the verification link."
    }
  })
  } else {
  msg.reply({ "embed": {
    "color": 5572102,
    "description": "The server owner still needs to setup GVCord. They can do that by going to this link: https://gvcord.pranavramesh.dev/setup"
  }});
}
  }



});

client.on('guildMemberAdd', async member => {
if (db.get(member.guild.id + "_channel")) {
var link =  "https://gvcord.pranavramesh.dev/?uid=" + member.id + "&gid=" + member.guild.id;

  member.send({ "embed": {
    "color": 5572102,
        "description": "Verification Link: " + link + "\n\n**Note:** Please login with your `@garnetvalley.org` email address.\nThis is to ensure that you are a current GV student. No data is stored\nand nothing is being sent to GV.\n\n© Pranav R"
      }
    })
  }
  })


client.login('');



var server = app.listen(84, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("deployed")
})

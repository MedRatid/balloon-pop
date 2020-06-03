let balloonelement = document.getElementById("balloon");
let clickcountelement = document.getElementById("clickcount");
let popcountelement = document.getElementById("popcount");
let clockelement = document.getElementById("countdown");
let highscoreelement = document.getElementById("highpop");
let currentplayername = document.getElementById("name");
let gameelement = document.getElementById("game");
let playerelement = document.getElementById("player");
let currentplayerelement = document.getElementById("currentplayer");
let gameplayerelement = document.getElementById("gameplayer");
let ongoinggameelement = document.getElementById("ongoinggame");
let scoreboardelement = document.getElementById("scoreboard");
let playerselement = document.getElementById("players");

let clickcount =0;
let height = 120;
let width = 100;
let ratioh = 20;
let ratiow = 15;
let maxsize = 240;
let score = 0;
let duration = 10000;
let clockid = 0;
let timeremaining = 0;
let currentplayer;
let players = [];
let ballcolor = ["red", "purple", "deeppink", "blue", "green", "brown", "darkorange", "turquoise"];
let colorindex = 0;
let audio = new Audio('medias/pop.mp3');

if (window.localStorage.hasOwnProperty("players")){
    players = JSON.parse(window.localStorage.getItem("players"));
}

function start() {
    ongoinggameelement.classList.remove("hidden");
    gameplayerelement.classList.add("hidden");
    scoreboardelement.classList.add("hidden");
    resetgame();
    startclock();
    setTimeout(stop, duration);
}

function inflate() {
    height += ratioh;
    width += ratiow;
    clickcount++;
    if (height >= maxsize)
    {
        width = 100;
        height = 120;
        score++;
        balloonelement.className = "";
        colorindex = Math.floor(Math.random() * 100) % ballcolor.length;
        balloonelement.style="background-color:"+ballcolor[colorindex]+";";
        audio.play();
    }
    display();
}

function startclock() {
    timeremaining = duration;
    showclock();
    clockid = setInterval(showclock,1000);
}

function stopclock(){
    clearInterval(clockid);
}

function showclock(){
    clockelement.innerText = (timeremaining/1000).toString();
    timeremaining -= 1000;
}

function stop(){
    if (score > currentplayer.highscore){
        currentplayer.highscore = score;
        window.localStorage.setItem("players",JSON.stringify(players));
        highscoreelement.innerText = currentplayer.highscore.toString();
        window.alert("Congratulations! You got a new Highscore");
        viewscores();
    }
    stopclock();
    ongoinggameelement.classList.add("hidden");
    gameplayerelement.classList.remove("hidden");
    scoreboardelement.classList.remove("hidden");
}

function resetgame(){
    clickcount =0;
    height = 120;
    width = 100;
    score = 0;
    display();
}

function display(){
    popcountelement.innerText = score.toString();
    clickcountelement.innerText = clickcount.toString();
    balloonelement.style.height = height + "px";
    balloonelement.style.width = width + "px";
}

function setplayer(event){
    event.preventDefault();
    let form = event.target;
    let playername = form.playername.value.toUpperCase();
    currentplayer = players.find(player => player.name == playername);
    if(!currentplayer){
        currentplayer = {name: playername, highscore: 0};
        players.push(currentplayer);
        window.localStorage.setItem("players",JSON.stringify(players));
    }
    form.reset();
    gameelement.classList.remove("hidden");
    playerelement.classList.add("hidden");
    currentplayerelement.innerText = currentplayer.name;
    highscoreelement.innerText = currentplayer.highscore.toString();
    viewscores();
}

function changeplayer(){
    playerelement.classList.remove("hidden");
    gameelement.classList.add("hidden");
}

function viewscores(){
    let template = "";
    players.sort((a, b) => b.highscore - a.highscore);
    players.forEach(player => {
        template += `
        <div class="flex space-between">
            <span><i class="fa fa-user"></i> ${player.name}</span>
            <span>Score: ${player.highscore}</span>
        </div>
        `
    });
    playerselement.innerHTML = template;
}
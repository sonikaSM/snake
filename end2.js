

const canvas5=document.getElementById('canvas5');
const ctx5=canvas5.getContext('2d');
class Button{

    constructor(text,x,y,textX,textY) {

        this.x=x;
        this.y=y;
        this.yText=textY;
        this.xText=textX;

        this.text=text;
        this.width=ctx5.measureText(this.text).width+10;
        this.height=23;

        this.color='#A9A9A9';
        this.clicked=false;
        this.clickable=true;
    }

    draw(color){
        this.color=color;

        ctx5.fillStyle=this.color;
        ctx5.fillRect(this.x,this.y,this.width,this.height);

        ctx5.strokeStyle='#667';
        ctx5.strokeRect(this.x,this.y,this.width,this.height);

        ctx5.fillStyle='white';

        ctx5.fillText(this.text,this.xText,this.yText, this.width, this.height);

    }

    update(color){
        this.color=color;
        ctx5.fillStyle=this.color;

    }
    update(text){
        this.text=text;
    }
    toCLick(){
        if(this.clicked===false) this.clicked=true
        else this.clicked=false
    }
    toInform(){
        console.log("Clicked :" +this.clicked)
    }



}
ctx5.font="25px Calibre "
ctx5.fillStyle="white"
ctx5.color="white"

ctx5.textBaseline='middle'
ctx5.textAlign='center'

let txt="The end"

ctx5.fillText(txt,canvas5.offsetWidth/2,canvas5.offsetHeight/8)
ctx5.beginPath()
ctx5.ellipse(canvas5.offsetWidth/2,canvas5.offsetHeight/8,60,20,0,0,2*Math.PI)
ctx5.stroke()

class player{
    name="Player"
    score=0
    x=canvas5.offsetWidth/2
    y=canvas5.offsetHeight/3+95

    constructor(name,score) {
        this.name=name;

        if(score==null){
            this.score=5
        }else{
            this.score=score;
        }


    }
    showscore(x,y){
        ctx5.fillText(this.name+':'+this.score,x,y)
    }
}

let sc1=sessionStorage.getItem("score1_sc")
let sc2=sessionStorage.getItem("score2_sc")
let txtS;
txtS=sc1.toString()
console.log(txtS)
let player1=new player("Player 1",txtS);

txtS=sc2.toString()
console.log(txtS)
let player2=new player("Player 2",txtS);


function iswinner(){
    if(player1.score>player2.score) return player1.name
    else if(player2.score>player1.score)return player2.name
    else return "Draw!"
}

let winner=iswinner();

txt="The winner is : "+ winner.toString()
ctx5.fillText(txt,canvas5.offsetWidth/2,canvas5.offsetHeight/4)

let best=localStorage.getItem("best_sc")
console.log(best)
if(best==null){
    best=0
}

txt="The best score is : "+ best.toString()
ctx5.fillText(txt,canvas5.offsetWidth/2,canvas5.offsetHeight/4+34)

txt="The statistics : "
ctx5.fillText(txt,canvas5.offsetWidth/2,canvas5.offsetHeight/3+35)

player1.showscore(canvas5.offsetWidth/2,canvas5.offsetHeight/3+65)
player2.showscore(canvas5.offsetWidth/2,canvas5.offsetHeight/3+95)

ctx5.font="20px Calibre "
txt="exit"

const exit=new Button(txt,canvas5.offsetWidth-50,5,canvas5.offsetWidth-29,17)
ctx5.fillStyle="transparent"
exit.draw()


function isInsideButton(pos,button){
    return (pos.x > button.x && pos.x < (button.x+button.width)) &&( pos.y < (button.y+button.height) && pos.y > button.y)
}



function getmousePos(event) {
    const rect = canvas5.getBoundingClientRect();
    return{
        x:(event.clientX-rect.left)/(rect.right-rect.left)*canvas5.width,
        y:(event.clientY-rect.top)/(rect.bottom-rect.top)*canvas5.height
    }
}
addEventListener('click',function(event){
    const MousePos = getmousePos(event);
    if(isInsideButton(MousePos,b)){

        console.log("Loading new window")
        const myWindow = window.open("2game.html", "_self")

    }
    else if(isInsideButton(MousePos,exit)){
        console.log("Loading new window")
        const myWindow = window.open("starter.html", "_self")
    }

})

let text='New game';
const b =new Button(text,canvas5.offsetWidth/2-46,2*canvas5.offsetHeight/3-10,canvas5.offsetWidth/2,2*canvas5.offsetHeight/3);
b.draw('black');

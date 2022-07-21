const canvas4=document.getElementById('canvas4');
const ctx4=canvas4.getContext('2d');


class Button{

    constructor(text,x,y,textX,textY) {

        this.x=x;
        this.y=y;
        this.yText=textY;
        this.xText=textX;

        this.text=text;
        this.width=ctx4.measureText(this.text).width+10;
        this.height=23;

        this.color='#A9A9A9';
        this.clicked=false;
        this.clickable=true;
    }

    draw(color){
        this.color=color;

        ctx4.fillStyle=this.color;
        ctx4.fillRect(this.x,this.y,this.width,this.height);

        ctx4.strokeStyle='#667';
        ctx4.strokeRect(this.x,this.y,this.width,this.height);

        ctx4.fillStyle='white';

        ctx4.fillText(this.text,this.xText,this.yText, this.width, this.height);

    }

    update(color){
        this.color=color;
        ctx4.fillStyle=this.color;

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
class Menu{
    constructor() {
        this.position={
            x:0,
            y:0
        }

        this.width=canvas4.offsetWidth
        this.height=canvas4.offsetHeight/12
        this.color="gray"
        //this.text='Snake'

    }
    show(){
        ctx4.fillStyle=this.color;
        ctx4.fillRect(this.position.x,this.position.y,this.width,this.height);

        ctx4.strokeStyle='#667';
        ctx4.strokeRect(this.position.x,this.position.y,this.width,this.height);

    }


}
window.addEventListener('resize', function(){
    canvas4.height=window.innerHeight;
    canvas4.width=window.innerWidth;
    ctx4.fillStyle='white';
    ctx4.fillRect(0,0,window.innerWidth,15)


})

//one player

let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];

// True if changing direction
let changing_direction = false;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;
let score1=0;


//second player
let snake2 = [  {x: 200, y: 350},  {x: 190, y: 350},  {x: 180, y: 350},  {x: 170, y: 350},  {x: 160, y: 350},];

// True if changing direction
let changing_direction2 = false;
// Horizontal velocity
let dx2 = 10;
// Vertical velocity
let dy2 = 0;
let score2=0;


let xFood,yFood;
//let score=0;
let best=localStorage.getItem("best_sc");
const menu=new Menu()
menu.show()
ctx4.font="20px Calibre "
ctx4.fillStyle="white"
ctx4.color="white"
const text='x'
const b =new Button(text,canvas4.offsetWidth-57,7,canvas4.offsetWidth-52,23)


main();

create_food();

function main(){

    if (hit())  {
        sessionStorage.setItem("score1_sc", score1);
        sessionStorage.setItem("score2_sc", score2);
        sessionStorage.setItem("best_sc",best);

        openEnd();

        score1=0;
        score2=0;

    }

    changing_direction=false;

    addEventListener('click',function(event){
        const MousePos = getmousePos(event);
        if(isInsideButton(MousePos,b)){
            console.log("Loading new window")
            openEnd()
        }

    })

    setTimeout(function onTick(){
        clear_board();

        menu.show()
        b.draw('black');

        drawFood();
        moveSnake();
        //moveSnake2();
        if(score1==null){
            score1=0
        }
        if(score2==null){
            score2=0
        }
        showscore(score1.toString(),score2.toString());
        showbest(best);
        showSnake();
        showSnake2();


        main();
    },100)


}

function openEnd(){
    const myWindow=window.open("end2.html","_self")
}

function isInsideButton(pos,button){
    return (pos.x > button.x && pos.x < (button.x+button.width)) &&( pos.y < (button.y+button.height) && pos.y > button.y)
}

function getmousePos(event) {
    const rect = canvas4.getBoundingClientRect();
    return{
        x:(event.clientX-rect.left)/(rect.right-rect.left)*canvas4.width,
        y:(event.clientY-rect.top)/(rect.bottom-rect.top)*canvas4.height
    }
}

function showPartSn(snakePart){
    ctx4.fillStyle='yellow'
    ctx4.strokestyle='gold'
    ctx4.fillRect(snakePart.x,snakePart.y,10,10)
    ctx4.strokeRect(snakePart.x,snakePart.y,10,10)
}

function showSnake(){
    snake.forEach(showPartSn);
}

function createXYfood(min,max){
    return Math.round((Math.random()*(max-min)+min)/10)*10
}

function showSnake2(){
    snake2.forEach(showPartSn);
}

function create_food()
{
    xFood = createXYfood(0, canvas4.width - 10);
    yFood = createXYfood(menu.height, canvas4.height - 10 );

    //console.log("Has_eaten!!")
    //drawFood();
    /*
        snake.forEach(function has_snake_eaten_food(part) {
            if (part.x == xFood && part.y == yFood) {
                create_food();
                console.log("Has_eaten!!")
            };
        });

     */

}
function drawFood(){
    ctx4.fillStyle='black'
    ctx4.strokeStyle='darkgreen'
    ctx4.fillRect(xFood,yFood,10,10)
    ctx4.strokeRect(xFood,yFood,10,10)
}
function showscore(txt2,txt22){
    ctx4.fillStyle='white';
    ctx4.fillText("Score 1: ",canvas4.offsetWidth-178,20)

    ctx4.fillText(txt2,canvas4.offsetWidth-108,20,canvas4.offsetWidth-145,23, ctx4.measureText(txt2), 20);

    ctx4.fillStyle='white';
    ctx4.fillText("Score 2: ",canvas4.offsetWidth-278,20)

    ctx4.fillText(txt22,canvas4.offsetWidth-210,20,canvas4.offsetWidth-255,23, ctx4.measureText(txt22), 20);

}
function showbest(txt4){
    ctx4.fillStyle='white';
    ctx4.fillText("Best : ",canvas4.offsetWidth-378,20)

    ctx4.fillText(txt4,canvas4.offsetWidth-328,20,canvas4.offsetWidth-328,23, ctx4.measureText(txt4), 20);
}

function moveSnake(){
    const head={
        x:snake[0].x+dx,
        y:snake[0].y+dy
    };

    snake.unshift(head);

    if(snake[0].x===xFood &&snake[0].y===yFood){
        create_food();
        score1++;
        (isBest(score1));


    }else{
        snake.pop();
    }
}

function moveSnake2(){
    const head={
        x:snake2[0].x+dx2,
        y:snake2[0].y+dy2
    };

    snake2.unshift(head);

    if(snake2[0].x===xFood &&snake2[0].y===yFood){
        create_food();
        score2++;
        (isBest(score2));


    }else{
        snake2.pop();
    }
}

function clear_board() {
    //  Select the colour to fill the drawing
    ctx4.fillStyle ='darkseagreen'
    //  Select the colour for the border of the canvas
    ctx4.strokestyle = 'white';
    ctx4.borderStyle='thin'
    // Draw a "filled" rectangle to cover the entire canvas
    ctx4.fillRect(0, 0, canvas4.width, canvas4.height);
    // Draw a "border" around the entire canvas
    ctx4.strokeRect(0, 0, canvas4.width, canvas4.height);
}

function turn(event){
    if (changing_direction) return;
    changing_direction = true;

    const keyPressed = event.keyCode;


    if (keyPressed === 37 )
    {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === 38 )
    {
        dx = 0;
        dy = -10;
    }

    if ((keyPressed === 39 ))
    {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === 40 )
    {
        dx = 0;
        dy = 10;
    }


    if ( (keyPressed===65 ))
    {
        dx2 = -10;
        dy2 = 0;
    }

    if ((keyPressed===87 ))
    {
        dx2 = 0;
        dy2 = -10;
    }

    if ( (keyPressed===68))
    {
        dx2 = 10;
        dy2 = 0;
    }

    if ( (keyPressed===83 ))
    {
        dx2 = 0;
        dy2 = 10;
    }

}
function isBest(scr){
    if(best!=null){
        if(scr>best) localStorage.setItem("best_sc", scr);return true;
    }
    else{
        localStorage.setItem("best_sc", scr);return true;
    }
}
addEventListener("keydown",turn);

function hit(){
    for (let i = 4; i < snake.length; i++)
    {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true
    }
    for (let i = 4; i < snake2.length; i++)
    {
        if (snake2[i].x === snake2[0].x && snake2[i].y === snake2[0].y)
            return true
    }
    if(snake[0]==snake2[0])return true;
    const hitLeftWall = snake[0].x < 0 ||snake2 [0].x < 0;
    const hitRightWall = snake[0].x > canvas4.width - 10||snake2[0].x > canvas4.width - 10;
    const hitToptWall = snake[0].y < menu.height||snake2[0].y < menu.height;
    const hitBottomWall = snake[0].y > canvas4.height - 10||snake[0].y > canvas4.height - 10;

    return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}
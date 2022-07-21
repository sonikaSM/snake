const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
class Button{

    constructor(text,x,y,textX,textY) {

        this.x=x;
        this.y=y;
        this.yText=textY;
        this.xText=textX;

        this.text=text;
        this.width=ctx.measureText(this.text).width+10;
        this.height=23;

        this.color='#A9A9A9';
        this.clicked=false;
        this.clickable=true;
    }

    draw(color){
        this.color=color;

        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);

        ctx.strokeStyle='#667';
        ctx.strokeRect(this.x,this.y,this.width,this.height);

        ctx.fillStyle='white';

        ctx.fillText(this.text,this.xText,this.yText, this.width, this.height);

    }

    update(color){
        this.color=color;
        ctx.fillStyle=this.color;

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
function setText(color,text,x,y){
    ctx.textAlign='center';
    ctx.fillStyle=color;
    ctx.font='20px Times New Romans '

    let textWid =ctx.measureText(text)
    ctx.fillText(text,x,y, textWid, 20);
}
class Menu{
    constructor() {
        this.position={
            x:0,
            y:0
        }

        this.width=canvas.offsetWidth
        this.height=canvas.offsetHeight/12
        this.color="gray"
        //this.text='Snake'

    }
    show(){
        ctx.fillStyle=this.color;
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);

        ctx.strokeStyle='#667';
        ctx.strokeRect(this.position.x,this.position.y,this.width,this.height);

    }


}
window.addEventListener('resize', function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    ctx.fillStyle='white';
    ctx.fillRect(0,0,window.innerWidth,15)


})
let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];

// True if changing direction
let changing_direction = false;
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;

let xFood,yFood;

let score=0;
let best=localStorage.getItem("best_scr");;


const menu=new Menu()
menu.show()
ctx.font="20px Calibre "
ctx.fillStyle="white"
ctx.color="white"

const text='x'
const b =new Button(text,canvas.offsetWidth-57,7,canvas.offsetWidth-52,23)

//const b2=new Button(" Score ",canvas.offsetWidth-138,7,canvas.offsetWidth-195,23)

function isBest(scr){
    if(best!=null){
        if(scr>best) localStorage.setItem("best_scr", score);return true;
    }
    else{
        localStorage.setItem("best_scr", score);return true;
    }
}

main();
create_food();

function main(){

    if (hit())  {
        sessionStorage.setItem("score_sc", score);
        sessionStorage.setItem("best_scr",best.toString());

        openEnd();
        score=0;

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
        showscore(score.toString());
        showbest(best.toString());
        showSnake();
        main();
    },100)


}



/*class Snake {
    constructor() {
        this.position={
            x:5,
            y:70
        }
        this.velocity={
            x:0,
            y:0
        }
        //this.radius=5;
        this.width=10
        this.height=10



    }
    draw(){
        ctx.fillStyle='blue'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
    }
    update(){

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        //if(this.position.y+this.height+this.velocity.y>canvas.height) this.velocity=0;
        this.draw()

    }
    getPosition(){
        return{
            x: this.position.x,
            y: this.position.y

        }
    }
}


function check(){


    console.log("(xy)=")
    //console.log(snake.getPosition().x, snake.getPosition().y)
    console.log("window.innerWidth="+window.innerWidth)
    console.log("window.innerHeight="+window.innerHeight)

    console.log("ctx.height= "+ ctx.height)
    console.log("ctx.height= "+ canvas.height)

    console.log("menu.position.y="+menu.position.y)

    console.log("hit? - "+hit(snake))
    console.log("ob.getPosition().x<=window.innerWidth"+snake.getPosition().x<=window.innerWidth)
    console.log("ob.getPosition().x>=0"+snake.getPosition().x>=0)
    console.log("ob.getPosition().y<=window.innerHeight"+snake.getPosition().y<=window.innerHeight)
    console.log("ob.getPosition().y<=menu.position.y"+snake.getPosition().y>=menu.position.y)

}

const snake=new Snake()
function hit(ob){
    return((ob.getPosition().x>=canvas.width||ob.getPosition().x<=0||ob.getPosition().y>=canvas.height||ob.getPosition().y<=menu.height))
}addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            //console.log('left')
            snake.velocity.x=0;
            break
        case 83:
            //console.log('down')
            snake.velocity.y=0;
            break
        case 68:
            //console.log('right')
            snake.velocity.x=0;
            break
        case 87:
            //console.log('up')
            snake.velocity.y=0;
            break

        case 37:
            //console.log('left')
            snake.velocity.x=0;
            break

        case 40:
            //console.log('down')
            snake.velocity.y=0;
            break
        case 39:
            //console.log('right')
            snake.velocity.x=0;
            break
        case 38:
            //console.log('up')
            snake.velocity.y=0;
            break

    }
})

addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            //console.log('left')
            snake.velocity.x=-vel_value;
            if(hit(snake)) openEnd()
            break
        case 83:
            //console.log('down')
            snake.velocity.y=vel_value;
            if(hit(snake)) openEnd()
            check()
            break
        case 68:
            //console.log('right')
            snake.velocity.x=vel_value;
            if(hit(snake)) openEnd()
            break
        case 87:
            //console.log('up')
            snake.velocity.y=-vel_value;
            if(hit(snake)) openEnd()
            break


        case 37:
            //console.log('left')
            snake.velocity.x=-vel_value;
            if(hit(snake)) openEnd()
            break
        case 40:
            //console.log('down')
            snake.velocity.y=vel_value;
            if(hit(snake)) openEnd()
            check()
            break
        case 39:
            //console.log('right')
            snake.velocity.x=vel_value;
            if(hit(snake)) openEnd()
            break
        case 38:
            // console.log('up')
            snake.velocity.y=-vel_value;
            if(hit(snake)) openEnd()
            break

    }
})
//snake.update()
*/
function openEnd(){
    const myWindow=window.open("end.html","_self")
}
//const vel_value=2.5

function isInsideButton(pos,button){
    /*
    console.log("pos.x´= "+ pos.x)
    console.log("pos.y="+ pos.y)

    console.log("button.x= "+button.x+"button.y="+button.y)

    console.log("pos.x > button.x-"+(pos.x > button.x))
    console.log("pos.x < (button.x+button.width)-"+(pos.x < (button.x+button.width)))
    console.log("( pos.y < (button.y+button.height)-"+( pos.y < (button.y+button.height)))
    console.log("pos.y > button.y-"+(pos.y > button.y))
    */
    return (pos.x > button.x && pos.x < (button.x+button.width)) &&( pos.y < (button.y+button.height) && pos.y > button.y)
}

function getmousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return{
        x:(event.clientX-rect.left)/(rect.right-rect.left)*canvas.width,
        y:(event.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height
    }
}

function showPartSn(snakePart){
    ctx.fillStyle='yellow'
    ctx.strokestyle='gold'
    ctx.fillRect(snakePart.x,snakePart.y,10,10)
    ctx.strokeRect(snakePart.x,snakePart.y,10,10)
}

function showSnake(){
    snake.forEach(showPartSn);
}

function createXYfood(min,max){
    return Math.round((Math.random()*(max-min)+min)/10)*10
}

function create_food()
{
   xFood = createXYfood(0, canvas.width - 10);
   yFood = createXYfood(menu.height, canvas.height - 10);

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
    ctx.fillStyle='black'
    ctx.strokeStyle='darkgreen'
    ctx.fillRect(xFood,yFood,10,10)
    ctx.strokeRect(xFood,yFood,10,10)
}
function showscore(txt2){
    ctx.fillStyle='white';
    ctx.fillText("Score : ",canvas.offsetWidth-198,20)

    ctx.fillText(txt2,canvas.offsetWidth-138,20,canvas.offsetWidth-195,23, ctx.measureText(txt2), 20);
}
function showbest(txt4){
    ctx.fillStyle='white';
    ctx.fillText("Best : ",canvas.offsetWidth-288,20)

    ctx.fillText(txt4,canvas.offsetWidth-238,20,canvas.offsetWidth-248,23, ctx.measureText(txt4), 20);
}

function moveSnake(){
    const head={
        x:snake[0].x+dx,
        y:snake[0].y+dy
    };

    snake.unshift(head);

    if(snake[0].x===xFood &&snake[0].y===yFood){
        create_food();
        score++;
        if(isBest(score)){
           // showbest(best)
        }


    }else{
        snake.pop();
    }
}

function clear_board() {
    //  Select the colour to fill the drawing
    ctx.fillStyle ='darkseagreen'
    //  Select the colour for the border of the canvas
    ctx.strokestyle = 'white';
    ctx.borderStyle='thin'
    // Draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw a "border" around the entire canvas
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function turn(event){
    if (changing_direction) return;
    changing_direction = true;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === 37 || (keyPressed===65 ))
    {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === 38 || (keyPressed===87 ))
    {
        dx = 0;
        dy = -10;
    }

    if ((keyPressed === 39 )|| (keyPressed===68))
    {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === 40 || (keyPressed===83 ))
    {
        dx = 0;
        dy = 10;
    }


}

addEventListener("keydown",turn);

function hit(){
    for (let i = 4; i < snake.length; i++)
    {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 10;
    const hitToptWall = snake[0].y < menu.height;
    const hitBottomWall = snake[0].y > canvas.height - 10;

    return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}
















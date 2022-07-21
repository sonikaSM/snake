window.addEventListener('load',()=>{
    const canvas2=document.getElementById('canvas2');
    const ctx2=canvas2.getContext('2d');

    ctx2.font="25px Calibre "
    ctx2.fillStyle="white"
    ctx2.color="white"

    ctx2.textBaseline='middle'
    ctx2.textAlign='center'

    let txt="The end"

    ctx2.fillText(txt,canvas2.offsetWidth/2,canvas2.offsetHeight/8)
    ctx2.beginPath()
    ctx2.ellipse(canvas2.offsetWidth/2,canvas2.offsetHeight/8,60,20,0,0,2*Math.PI)
    ctx2.stroke()

    ctx2.font="20px Times New Romans "
    //txt="Score"
    //ctx2.fillText(txt,canvas2.offsetWidth/3-25,canvas2.offsetHeight/3)


    //ctx2.fillText("Best",2*(canvas2.offsetWidth)/3+10,canvas2.offsetHeight/3)


    class Button{

        constructor(text,x,y,textX,textY) {

            this.x=x;
            this.y=y;
            this.yText=textY;
            this.xText=textX;

            this.text=text;
            this.width=ctx2.measureText(this.text).width+15;
            this.height=23;

            this.color='#A9A9A9';
            this.clicked=false;
            this.clickable=true;
        }

        draw(color){
            this.color=color;

            ctx2.fillStyle=this.color;
            ctx2.fillRect(this.x-37,this.y-11,this.width,this.height);

            ctx2.strokeStyle='#667';
            ctx2.strokeRect(this.x-36,this.y-10,this.width,this.height);

            //ctx2.textAlign='center';
            //ctx2.textBaseline='middle';
            ctx2.fillStyle='white';

            ctx2.fillText(text,this.xText,this.yText, this.width, this.height);

        }

        update(color){
            this.color=color;
            ctx2.fillStyle=this.color;

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

    let text='New game';
    const b =new Button(text,canvas2.offsetWidth/2-15,2*canvas2.offsetHeight/3-10,canvas2.offsetWidth/2,2*canvas2.offsetHeight/3-10);
    b.draw('black');

    text='Score :';
    const lb =new Button(text,canvas2.offsetWidth/3,canvas2.offsetHeight/4-2,canvas2.offsetWidth/3-7,canvas2.offsetHeight/4);
    lb.draw('transparent');

    text='Best :';
    const lb2 =new Button(text,2*(canvas2.offsetWidth)/3+10,canvas2.offsetHeight/4-2,2*(canvas2.offsetWidth)/3,canvas2.offsetHeight/4);
    lb2.draw('transparent');

    function isInsideButton(pos,button){

        return (pos.x > button.x && pos.x < (button.x+button.width)) &&( pos.y < (button.y+button.height) && pos.y > button.y)
    }



    function getmousePos(event) {
        const rect = canvas2.getBoundingClientRect();
        return{
            x:(event.clientX-rect.left)/(rect.right-rect.left)*canvas2.width,
            y:(event.clientY-rect.top)/(rect.bottom-rect.top)*canvas2.height
        }
    }
    addEventListener('click',function(event){
        const MousePos = getmousePos(event);
        if(isInsideButton(MousePos,b)){

                console.log("Loading new window")
                const myWindow = window.open("game.html", "_self")

        }
        else if(isInsideButton(MousePos,exit)){
            console.log("Loading new window")
            const myWindow = window.open("starter.html", "_self")
        }

    })

    let score=sessionStorage.getItem("score_sc");
    text=score.toString()

    ctx2.font="20px Calibre "
    ctx2.fillStyle="transparent"
    ctx2.color="white"

    console.log(score)

    const button3=new Button(text,canvas2.offsetWidth/3+5,canvas2.offsetHeight/4+35,canvas2.offsetWidth/3-20,canvas2.offsetHeight/4+37)
    button3.draw()

    let best=sessionStorage.getItem("best_scr");
    text=best.toString()

    let button4=new Button(text,2*(canvas2.offsetWidth)/3+15,canvas2.offsetHeight/4+35,2*(canvas2.offsetWidth)/3-10,canvas2.offsetHeight/4+37)
    ctx2.fillStyle="transparent"
    button4.draw()

    console.log(best)

    text="exit"

    const exit=new Button(text,canvas2.offsetWidth-20,10,canvas2.offsetWidth-33,12)
    ctx2.fillStyle="transparent"
    exit.draw()



})
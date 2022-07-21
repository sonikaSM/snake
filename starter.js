
window.addEventListener('load',()=>{

    const canvas1=document.getElementById('canvas0');
    const ctx1=canvas1.getContext('2d');

    let ind;

    ctx1.fillStyle="white"
    ctx1.font="25px Calibre "
    ctx1.textBaseline='middle'
    ctx1.textAlign='center'

    ctx1.fillText("Welcome in Snake",canvas1.offsetWidth/2,30)

    ctx1.font="15px Times New Romans "

    ctx1.fillText("Choose and start the game",canvas1.offsetWidth/2,70)


    class Button{

        constructor(text,x,y,textX,textY) {

            this.x=x;
            this.y=y;
            this.yText=textY;
            this.xText=textX;

            this.text=text;
            this.width=ctx1.measureText(this.text).width+15;
            this.height=23;

            this.color='#A9A9A9';
            this.clicked=false;
            this.clickable=true;
        }

        draw(color){
            this.color=color;

            ctx1.fillStyle=this.color;
            ctx1.fillRect(this.x,this.y,this.width,this.height);

            ctx1.strokeStyle='#667';
            ctx1.strokeRect(this.x,this.y,this.width,this.height);

            //ctx2.textAlign='center';
            //ctx2.textBaseline='middle';
            ctx1.fillStyle='white';

            ctx1.fillText(text,this.xText,this.yText, this.width, this.height);

        }

        update(color){
            this.color=color;
            ctx1.fillStyle=this.color;

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

        let text='1 player';

        const bt=new Button(text,canvas1.offsetWidth/3-35,canvas1.offsetHeight/4+15,canvas1.offsetWidth/3-2,canvas1.offsetHeight/4+27)
        bt.draw("transparent")

        text='2 players';

        const bt2=new Button(text,2*canvas1.offsetWidth/3-35,canvas1.offsetHeight/4+15,2*canvas1.offsetWidth/3,canvas1.offsetHeight/4+27)
        bt2.draw("transparent")

        ctx1.fillStyle='black';
        text='START';

        const bt_start=new Button(text,canvas1.offsetWidth/2-37,canvas1.offsetHeight/2-11,canvas1.offsetWidth/2-6 ,canvas1.offsetHeight/2)
        bt_start.draw()

        bt_start.clickable=false;


   function isInsideButton(pos,button){
        return (pos.x > button.x && pos.x < (button.x+button.width)) &&( pos.y < (button.y+button.height) && pos.y > button.y)
    }


    function getmousePos(event) {
        const rect = canvas1.getBoundingClientRect();
        return{
            x:(event.clientX-rect.left)/(rect.right-rect.left)*canvas1.width,
            y:(event.clientY-rect.top)/(rect.bottom-rect.top)*canvas1.height
        }

    }



    function checker(x,y){
        //console.log(x,y)
        //bt.getCoordinates()
        //console.log(bt.x,bt.y)
        //console.log(bt.width)
        //console.log(bt.x, bt.x+bt.width)
        //console.log(bt.height)
        //console.log(bt.y,bt.y+bt.height)
        console.log(getmousePos(event).x)
        console.log(getmousePos(event).y)

        console.log(isInsideButton(getmousePos(event),bt))
    }




/*
    canvas1.addEventListener('mouseenter',function(evt){
            const MousePos = getmousePos(evt);
            if(isInsideButton(MousePos,bt)){
                bt.color="#696969"
            }else if(isInsideButton(MousePos,bt2)){
                bt2.color="#696969"
            }else{
                console.log("Error3")
                console.log(MousePos)
                console.log(isInsideButton(MousePos,bt))
            }
    });

    canvas1.addEventListener('mouseleave',function(evt){
            const MousePos = getmousePos(evt);
            if(isInsideButton(MousePos,bt)){
                if(!bt.clicked) bt.color="#A9A9A9"
            }else if(isInsideButton(MousePos,bt2)){
                if(!bt2.clicked) bt2.color="#A9A9A9"
            }else{
                console.log("Error2")
            }
    });

*/

    canvas1.addEventListener('click',function(evt){
        const MousePos = getmousePos(evt);

        //console.log(getmousePos(evt).x)
        //console.log(getmousePos(evt).y)

        ctx1.font="8px Times New Romans "
        ctx1.fillStyle="black"


        if(isInsideButton(MousePos,bt)){
            ctx1.font="16px Times New Romans "
            text="1 player"
            bt.text=text;
            bt.draw("black")
            bt.toCLick();
            bt_start.clickable=true;
            ind=1;
            sessionStorage.setItem("ind","1")
            if(bt2.clicked) {
                bt2.clicked=false;
                text="2 players"
                bt2.text=text;
                bt2.draw("transparent")
            }
            //bt.update("#A9A9A9")
            /*if(text.visibility=false){
                text.visibility=true;

                text2.visibility=false;
            }*/



        }else if(isInsideButton(MousePos,bt2)){
            ctx1.font="16px Times New Romans "
            text="2 players"
            bt2.text=text;
            bt2.draw("black")
            bt2.toCLick();
            bt_start.clickable=true;
            ind=2;
            sessionStorage.setItem("ind","2")
            if(bt.clicked) {
                bt.clicked=false;
                text="1 player"
                bt.text=text;
                bt.draw("transparent")
            }
            /*if(text2.visibility=false){
                text2.visibility=true;
                ctx1.fillText(text2,bt_start.x+10,bt_start.y-bt_start.height-10)
                text1.visibility=false;
            }*/
            //bt2.color="#A9A9A9"
        }else if(isInsideButton(MousePos,bt_start)){

            if(bt.clicked||bt2.clicked) {
                ctx1.font="16px Times New Romans "
                text="START"
                bt.text=text;
                bt_start.draw("#A9A9A9")
                if(ind==1){
                    console.log("Loading new window")
                    const myWindow=window.open("game.html","_self")
                }else{
                    console.log("Loading new window")
                    const myWindow=window.open("2game.html","_self")
                }


            }
        }else{
            console.log("Error")
        }
    });





})


/*
ctx1.font='10px Arial';
const textWidth=ctx1.measureText(text).width;

ctx1.fillStyle='gray';
ctx1.fillRect(30,60,textWidth+4,10);

ctx1.strokeStyle='#666';
ctx1.strokeRect(30,60,textWidth+4,10);

ctx1.textAlign='center';
ctx1.fillStyle='white';
ctx1.fillText(text,48,68, textWidth, 10)
*/
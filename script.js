const boxes=document.querySelectorAll(".box");
const gameinfo=document.querySelector(".game-info");
const newgamebtn=document.querySelector(".btn");

//initial var
let currentplayer;
let gamegrid;

const winningposition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create to start a game
function initGame(){
    currentplayer="X";
    gamegrid=["","","","","","","","",""];
    newgamebtn.classList.remove("active");
    gameinfo.innerText=`Current Player - ${currentplayer}`;
    
    //ui empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents="all";
    });
    removecolor();
   
}


function removecolor(){
boxes.forEach((box,index)=>{
    box.classList.remove("win")
    console.log(index);
});
}

initGame();





function swapturn(){
    if(currentplayer=="X"){
        currentplayer="0";
    }else{
        currentplayer="X";
    }
    // uiupdata
    gameinfo.innerText=`Current Player - ${currentplayer}`;
}
function checkgameover(){

let ans="";
winningposition.forEach((position)=>{
    if((gamegrid[position[0]]!==""|| gamegrid[position[1]]!==""||gamegrid[position[2]!==""])
    &&(gamegrid[position[0]]===gamegrid[position[1]]&&gamegrid[position[1]]===gamegrid[position[2]])){
        if(gamegrid[position[0]]==="X"){
            ans="X";
        }else{
            ans="0";
        }
        // disable pinenter event 
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })



        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");

        boxes[position[2]].classList.add("win");

       
    }
});
//mean we got winner
if(ans!=""){
gameinfo.innerText=`Winner Player -${ans}`;
newgamebtn.classList.add("active");
return ;
  } 
//   lets check tie
let fillcount=0;
gamegrid.forEach((box)=>{
    if(box!==""){
        fillcount++;
    }
});
if(fillcount===9){
    gameinfo.innerText=`Game tied !`;
    newgamebtn.classList.add("active"); 

}
}

function handleclick(index){
    if(gamegrid[index]===""){
        boxes[index].innerHTML=currentplayer;
        gamegrid[index]=currentplayer;
        boxes[index].style.pointerEvent="none";
        swapturn();
        //chek koi jeeta toh nhi
        console.log("clicked "+index)
        checkgameover();
    }
    
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
});

newgamebtn.addEventListener("click",initGame);

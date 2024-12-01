let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let winner_found=false;
let turn0 = true; //player x , player 0 

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

var count=0;
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(box.innerText==""){
            count++;
        }
        if(turn0){
            box.innerText="0";
            turn0=false;
        }
        else{
            box.innerText="X";
            turn0=true;
        }
        console.log(count);
        
        box.disabled=true;
        checkWinner();   
        checkdraw();   
    });
});
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const checkdraw = () => {
    if(count==9 &&  !winner_found){

        msg.innerText=`Game draw`;
        msgContainer.classList.remove("hide"); 
        disableBoxes();
    }

}

const showWinner = (winner) => {
    msg.innerText=`Congratulations Player ${winner} wins`;
    msgContainer.classList.remove("hide"); 
    disableBoxes();
};


const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val===pos2val && pos2val===pos3val){
                winner_found=true;
                showWinner(pos1val);
                
            }
                
        }
    }
}

const resetGame = () => {
    turn0=true;
    winner_found=false;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
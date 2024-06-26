"use strict";
import { pushToStack, undo, redo } from "./stack.js";
import {
  addEventListener,
  addEventListenerToButton,
} from "./addEventListener.js";

let oldSelectedDiv = null;

addEventListener();
addEventListenerToButton();

export function divClick(id) {
  console.log("id==", id);
  let newSelectedDiv = document.querySelector(`#item${id}`);
  newSelectedDiv.style.border = "2px solid red";

  if (oldSelectedDiv) {
    console.log("oid==", oldSelectedDiv.id);
  }

  if (oldSelectedDiv != null) {
    if (oldSelectedDiv.id == newSelectedDiv.id) {
      //checks if user slect same newSelectedDiv
      // it should be unselected so marked oldSelectedDiv as null
      newSelectedDiv.style.border = null;
      oldSelectedDiv = null;

      return;
    }

    console.log("inside if");

    let prev_div = document.querySelector(`#${oldSelectedDiv.id}`);
    prev_div.style.border = null;
    let oldSelectedDivArg = oldSelectedDiv;
    oldSelectedDiv = newSelectedDiv;

    let validMove = checkValidMove(oldSelectedDivArg, newSelectedDiv);
    // prev_div.innerHTML = ''
    console.log("valid move==", validMove);

    if (validMove) {
      performMovement(oldSelectedDivArg, newSelectedDiv);
    }
  } else {
    console.log("inside else");

    console.log(newSelectedDiv.style.class);

    oldSelectedDiv = newSelectedDiv;
  }
}

function unselectDiv(selectedDiv) {
  selectedDiv.style.border = null;
  oldSelectedDiv = null;
}

function checkNewSelectedDivLastRow(selectedDiv,removedChild){
  const selectedDivId = selectedDiv.id[4]
  console.log("check last row newSelctedDivId====",selectedDiv.id)
  if(selectedDivId == 7 || selectedDivId == 0){
    console.log("inside if of checkNewSelDiv")
    console.log("slecteddiv firstChild",selectedDiv.firstElementChild)
    selectedDiv.firstElementChild.classList.add('king')
  }


}



function performMovement(oldSelectedDiv, newSelectedDiv) {
  console.log("====perfom movement called===");
  const firstChild = oldSelectedDiv.firstElementChild;
  const removedChild = oldSelectedDiv.removeChild(firstChild);
  console.log("removed child==", removedChild);
  newSelectedDiv.appendChild(removedChild);

  checkNewSelectedDivLastRow(newSelectedDiv,removedChild)


  unselectDiv(newSelectedDiv);

  const currentState = document.querySelector("#board").innerHTML;
  console.log(typeof currentState);
  //push current state to stack
  pushToStack(currentState);
}

function determineDarkOrWhite(selectedDiv) {
  //takes div as input extracts its child and determine if it white or dark

  console.log("selected div child==", selectedDiv.id);
  let color;
  const parentElement = document.querySelector(`#${selectedDiv.id}`);

  const firstChild = parentElement.firstElementChild;
  const classElement = firstChild.classList;
  for (var i = 0; i < selectedDiv.classList.length; i++) {
    if (classElement[i] == "dark-carrom") {
      color = "dark";
      //first condition satisfied
      break;
    }
    if (classElement[i] == "white-carrom") {
      color = "white";
      //first condition satisfied
      break;
    }
  }
  return color;
}

function checkValidMove(oldSelectedDiv, newSelectedDiv) {
  console.log("oldSelectedDiv==", oldSelectedDiv);

  if (newSelectedDiv.childElementCount > 0) {
    return false;
  }
  if (oldSelectedDiv.childElementCount > 0) {
    let color = determineDarkOrWhite(oldSelectedDiv);

    if (color == "white") {
      return checkValidMoveForWhite(oldSelectedDiv, newSelectedDiv);
    } else {
      return checkValidMoveForDark(oldSelectedDiv, newSelectedDiv);
    }
  }

  return false
}

function isDiagonalMove(start, end) {
  /* Checks if row movement is diagonal*/

  let isDiagonalMove = false;
  // Extract row and column from start position
  const startRow = parseInt(start[4]);
  const startCol = parseInt(start[5]);

  // Extract row and column from end position
  const endRow = parseInt(end[4]);
  const endCol = parseInt(end[5]);

  // Check if the move is diagonal
  isDiagonalMove = Math.abs(startRow - endRow) === Math.abs(startCol - endCol);
  console.log("isDiagonalMove==", isDiagonalMove);
  return isDiagonalMove;
}

function checkItemInBtwnDarkMovement(oldSelectedDiv, newSelectedDiv) {
  if (+newSelectedDiv[5] < +oldSelectedDiv[5]) {
    console.log("left movement");
    let newElementId =
      `${+oldSelectedDiv[4] + 1}` + `${+oldSelectedDiv[5] - 1}`;
    console.log("===new-ele-id====", newElementId);
    return newElementId;
  } else {
    console.log("right movement ");
    let newElementId =
      `${+oldSelectedDiv[4] + 1}` + `${+oldSelectedDiv[5] + 1}`;
    console.log("===new-ele-id====", newElementId);
    return newElementId;
  }
}

function checkItemInBtwnWhiteMovement(oldSelectedDiv, newSelectedDiv) {
  if (+newSelectedDiv[5] < +oldSelectedDiv[5]) {
    console.log("left movement");
    let newElementId =
      `${+oldSelectedDiv[4] - 1}` + `${+oldSelectedDiv[5] - 1}`;
    console.log("===new-ele-id====", newElementId);
    return newElementId;
  } else {
    console.log("right movement ");
    let newElementId =
      `${+oldSelectedDiv[4] - 1}` + `${+oldSelectedDiv[5] + 1}`;
    console.log("===new-ele-id====", newElementId);
    return newElementId;
  }
}


function determinIfKing(divId){
  
  /*console.log("oldSelectedDiv==",newSelectedDiv.classList.includes('dark'))
 
    check if movement is in dark position*/
  const newSelectedDiv = document.querySelector(`#${divId}`).firstElementChild
  let isKing = false

  const classElement = newSelectedDiv.classList;
  /*console.log("oldSelectedDiv==",newSelectedDiv.classList.includes('dark'))
 
    check if movement is in dark position*/
  
  for (var i = 0; i < newSelectedDiv.classList.length; i++) {
    if (classElement[i] == "king") {
      isKing = true;
      //first condition satisfied
      break;
    }
  }

  
  console.log("before returnng,is King===",isKing)
  return isKing
}

function checkItemInBtwnDarkMovementForKing(oldSelectedDiv, newSelectedDiv){


let canDeleteItem = true

const startRowOldDiv = +oldSelectedDiv[4]
const startColOldDIv = +oldSelectedDiv[5]
const endRownNewDiv = +newSelectedDiv[4]
const endColNewDiv = +newSelectedDiv[5]



const selectedChildren = []

if(startRowOldDiv > endRownNewDiv){
  console.log("inside if=====%%%%")
  let i;
  let j;
  if(startColOldDIv<endColNewDiv){
    //right movement
    i = startRowOldDiv  - 1
    j = startColOldDIv + 1
  }else{
    
    //left movement
    i = startRowOldDiv  - 1
    j = startColOldDIv - 1
    
  }
  
  //increase count
  while(i != endRownNewDiv){

    //check remaining for if only dark element is present
    console.log("i===",i)
    console.log("j===",j)
    const element = document.querySelector(`#item${i}${j}`)
    selectedChildren.push(element)
    if(startColOldDIv<endColNewDiv){
      //right movement
      i--
      j++
    }else{
      
      //left movement
      i--
      j--
      
    }
  }
  return selectedChildren


}else{
  console.log("inside else=== of idffaf")
  console.log("inside if=====%%%%")
  let i;
  let j;
  if(startColOldDIv>endColNewDiv){
    //left movement
    i = startRowOldDiv  + 1
    j = startColOldDIv - 1
  }else{
    
    //right movement
    i = startRowOldDiv  + 1
    j = startColOldDIv + 1
    
  }
  
  //increase count
  while(i != endRownNewDiv){

    //check remaining for if only dark element is present
    console.log("i===",i)
    console.log("j===",j)
    const element = document.querySelector(`#item${i}${j}`)
    selectedChildren.push(element)
    if(startColOldDIv>endColNewDiv){
      //left movement
      i++
      j--
    }else{
      
      //right movement
      i++
      j++
      
    }
  }
  return selectedChildren
}


}

function childrenInBetweenForKingMovement(){
  //retrives children in between old selected div and new selected div so that we can remove children


}


function isValidIndexMoveForDark(oldSelectedDiv, newSelectedDiv) {
  /* 
    
    */
  console.log("nsd", parseInt(newSelectedDiv[4]));
  console.log("osd", parseInt(oldSelectedDiv[4]));

  if(determinIfKing(oldSelectedDiv)){

    /*
    
      what this function actually does is at first if deremine carrom is king
      if it is check item present in between jump
      if all items are white remove items and perform movement
    */



    let isValidMove = true
    let darkItemPresent = false;
    console.log("its king===true")
    let returnedList = checkItemInBtwnDarkMovementForKing(oldSelectedDiv,newSelectedDiv)
    console.log("items between kings movement=====",returnedList)

    returnedList = returnedList.filter((item)=> item.childElementCount > 0)

    if(returnedList.length > 0){
      for(let i=0;i<returnedList.length;i++){
        let color = determineDarkOrWhite(returnedList[i])
        if(color == "dark"){
          isValidMove = false
          
        }
      }
    }

    if(isValidMove){
      for(let i=0;i<returnedList.length;i++){
        console.log('=====returned list element=====',returnedList[i].id)
        document.querySelector(`#${returnedList[i].id}`).innerHTML = ``
        
        
        
      }
    }


    return isValidMove
  }

  if (parseInt(newSelectedDiv[4]) == parseInt(oldSelectedDiv[4]) + 1) {
    //checks if movement is only one step
    return true;
  }
  if (parseInt(newSelectedDiv[4]) == parseInt(oldSelectedDiv[4]) + 2) {
    /*
        
        check if movement is two step
        if its two stem we have to determine if child of middle element is present
        if child is present and if it is darm then movement is invalid
        else valid movement
        
        
        */

    let elementId = checkItemInBtwnDarkMovement(oldSelectedDiv, newSelectedDiv);
    let domElement = document.querySelector(`#item${elementId}`);
    if (domElement.childElementCount > 0) {
      let childColor = determineDarkOrWhite(domElement);

      if (childColor == "white") {
        console.log("childcolor==", childColor);
        // document.querySelector('#dark-carrom-content').innerHTML += `
        // <div class="col">
        //     <div class="white-carrom"></div>
        // </div>
        // `
        domElement.innerHTML = ``;
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  return false;
}

function isValidIndexMoveForWhite(oldSelectedDiv, newSelectedDiv) {
  console.log("nsd", parseInt(newSelectedDiv[4]));
  console.log("osd", parseInt(oldSelectedDiv[4]));

  if(determinIfKing(oldSelectedDiv)){

    /*
    
      what this function actually does is at first if deremine carrom is king
      if it is check item present in between jump
      if all items are white remove items and perform movement
    */



    let isValidMove = true
    let whiteItemPresent = false;
    
    console.log("its king===true")
    let returnedList = checkItemInBtwnDarkMovementForKing(oldSelectedDiv,newSelectedDiv)
    console.log("items between kings movement=====",returnedList)
    returnedList = returnedList.filter((item)=> item.childElementCount > 0)

    if(returnedList.length > 0){
      for(let i=0;i<returnedList.length;i++){
        let color = determineDarkOrWhite(returnedList[i])
        if(color == "white"){
          isValidMove = false
          
        }
      }
    }

    if(isValidMove){
      for(let i=0;i<returnedList.length;i++){
        console.log('=====returned list element=====',returnedList[i].id)
        document.querySelector(`#${returnedList[i].id}`).innerHTML = ``
        
        
        
      }
    }


    return isValidMove 
  }

  if (parseInt(newSelectedDiv[4]) + 1 == parseInt(oldSelectedDiv[4])) {
    return true;
  }
  if (parseInt(newSelectedDiv[4]) + 2 == parseInt(oldSelectedDiv[4])) {
    /*
         
         check if movement is two step
         if its two stem we have to determine if child of middle element is present
         if child is present and if it is darm then movement is invalid
         else valid movement
         
         
         */

    let elementId = checkItemInBtwnWhiteMovement(
      oldSelectedDiv,
      newSelectedDiv
    );
    let domElement = document.querySelector(`#item${elementId}`);
    if (domElement.childElementCount > 0) {
      let childColor = determineDarkOrWhite(domElement);

      if (childColor == "dark") {
        console.log("childcolor==", childColor);
        // document.querySelector('#white-carrom-content').innerHTML += `
        // <div class="col">
        //     <div class="dark-carrom"></div>
        // </div>
        // `
        domElement.innerHTML = ``;
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  return false;
}

function checkValidMoveForWhite(oldSelectedDiv, newSelectedDiv) {
  console.log("white clicked");
  let isValidMove = false;
  //condition 1
  //check if user select empty div and again selects empty div. Its invalid move
  console.log("has child node", oldSelectedDiv.hasChildNodes());
  // return isValidMove

  const classElement = newSelectedDiv.classList;
  /*console.log("oldSelectedDiv==",newSelectedDiv.classList.includes('dark'))
 
    check if movement is in dark position*/
  let isDark = false;
  for (var i = 0; i < newSelectedDiv.classList.length; i++) {
    if (classElement[i] == "dark") {
      isDark = true;
      //first condition satisfied
      break;
    }
  }
  console.log(parseInt(newSelectedDiv.id.split("")[4]));
  console.log(parseInt(oldSelectedDiv.id.split("")[4]));

  //check if user move is beyond current move means user is moving backward
  if (
    isDark &&
    isDiagonalMove(oldSelectedDiv.id, newSelectedDiv.id) &&
    isValidIndexMoveForWhite(oldSelectedDiv.id, newSelectedDiv.id)
    // (parseInt(newSelectedDiv.id.split('')[4]) < parseInt(oldSelectedDiv.id.split('')[4]))
  ) {
    isValidMove = true;
  }

  return isValidMove;
}

function checkValidMoveForDark(oldSelectedDiv, newSelectedDiv) {
  let isValidMove = false;
  //condition 1
  //check if user select empty div and again selects empty div. Its invalid move
  console.log("has child node", oldSelectedDiv.hasChildNodes());
  // return isValidMove

  const classElement = newSelectedDiv.classList;
  /*console.log("oldSelectedDiv==",newSelectedDiv.classList.includes('dark'))
 
    check if movement is in dark position*/
  let isDark = false;
  for (var i = 0; i < newSelectedDiv.classList.length; i++) {
    if (classElement[i] == "dark") {
      isDark = true;
      //first condition satisfied
      break;
    }
  }
  console.log(parseInt(newSelectedDiv.id.split("")[4]));
  console.log(parseInt(oldSelectedDiv.id.split("")[4]));

  //check if user move is beyond current move means user is moving backward
  if (
    isDark &&
    isDiagonalMove(oldSelectedDiv.id, newSelectedDiv.id) &&
    isValidIndexMoveForDark(oldSelectedDiv.id, newSelectedDiv.id)
    // parseInt(newSelectedDiv.id.split('')[4]) > parseInt(oldSelectedDiv.id.split('')[4])
  ) {
    isValidMove = true;
  }

  return isValidMove;
}

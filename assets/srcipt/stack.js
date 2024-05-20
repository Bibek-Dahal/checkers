//handles undo and redo

let stack = [];
let currentStackIndex = -1; //detremines where is redo and undo state instead of popping

export function pushToStack(data) {
  stack.push(data);
 
  currentStackIndex++;
  console.log("curetnStackIndex==", currentStackIndex);
  console.log("stack==", stack.length);
}

function popStack() {
  console.log("popstack called", currentStackIndex);

  //check if stack is empty
  if (currentStackIndex === -1) {
    return null;
  }

  
    console.log("current stack index==", currentStackIndex);
    console.log("stack length===", stack.length);

    const lastElement = stack[currentStackIndex];

    currentStackIndex--;

    return lastElement;
  

}

export function undo() {
  let topValue = popStack();
  // console.log("top value==",topValue)
  if (topValue) {
    return topValue;
  }
  return null;
}

export function redo() {
  if (currentStackIndex === stack.length - 1) {
    return null;
  }
  currentStackIndex += 1;
  return stack[currentStackIndex];
}

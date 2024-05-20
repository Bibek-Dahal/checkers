import { divClick } from "./index.js";
import { saveState, restoreState, clearState } from "./state.js";
import { undo, redo } from "./stack.js";

export function addEventListener() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let element = document.querySelector(`#item${i}${j}`);
      element.addEventListener("click", function () {
        divClick(`${i}${j}`);
      });
    }
  }
}

export function addEventListenerToButton() {
  document.querySelector("#save-state").addEventListener("click", function () {
    console.log("save called");
    saveState();
  });

  document
    .querySelector("#restore-state")
    .addEventListener("click", function () {
      console.log("restore called");
      restoreState();
    });

  document.querySelector("#clear-state").addEventListener("click", function () {
    console.log("clear called");
    clearState();
  });

  document.querySelector("#undo").addEventListener("click", function () {
    console.log("undo called");
    const result = undo();

    if (result) {
      console.log("inside if of result if", typeof result);
      const element = document.querySelector("#board")
      console.log("result===",result)
      element.innerHTML = result;
      addEventListener()
    }
  });

  document.querySelector("#redo").addEventListener("click", function () {
    console.log("redo called");
    let result = redo();
    if (result) {
      console.log("inside if of result if", typeof result);
      const element = document.querySelector("#board")
    //   console.log("result===",result)
      element.innerHTML = result;
      // addEventListener()
    }
  });
}

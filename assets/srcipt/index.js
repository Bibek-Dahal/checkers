root = document.querySelector('#root')
let oldSelectedDiv = null

// for(let i=0;i<8;i++){
    
//         newElement = document.createElement('div')
//         className = (i+1)%2==0?'even':'odd'
//         newElement.innerHTML = 
//         `even
//         <div class="row">
        
//             <div class="col   ${className}">
//                 <p>1</p>
//             </div>
//             <div class="col  bg-info">
//                 <p>2</p>
//             </div>
//             <div class="col  bg-info">
//                 <p>3</p>
//             </div>
//             <div class="col  bg-info">
//                 <p>4</p>
//             </div>
//             <div class="col  bg-info">
//                 <p>5</p>
//             </div>
//             <div class="col  bg-info">
//                 <p>6</p>
//             </div>
//             <div class="col  bg-info">
//                 <p>7</p>
//             </div>
//             <div class="col  bg-info">
//                 <p>8</p>
//             </div>
//         </div>
        
        
//         `
//     root.appendChild(newElement)
    
// }

function divClick(id){




    console.log("id==",id)
    newSelectedDiv = document.querySelector(`#item${id}`)
    newSelectedDiv.style.border = '2px solid red'

    if(oldSelectedDiv){
        console.log("oid==",oldSelectedDiv.id)
    }
    
    if(oldSelectedDiv != null){

        if(oldSelectedDiv.id == newSelectedDiv.id){

            //checks if user slect same newSelectedDiv
            // it should be unselected so marked oldSelectedDiv as null
            newSelectedDiv.style.border = null
            oldSelectedDiv = null

            return
        }

        console.log("inside if")
        
        let prev_div = document.querySelector(`#${oldSelectedDiv.id}`)
        prev_div.style.border=null
        let oldSelectedDivArg = oldSelectedDiv
        oldSelectedDiv = newSelectedDiv
        
        // prev_div.innerHTML = ''

        checkValidMove(oldSelectedDivArg,newSelectedDiv)


    }else{
        console.log('inside else')
        
        console.log(newSelectedDiv.style.class)
        
        oldSelectedDiv = newSelectedDiv
    }

    
    
    
}

function checkValidMove(oldSelectedDiv,newSelectedDiv){
    
        console.log("move element called")
        let isValidMove = false
        const classElement = newSelectedDiv.classList
        // console.log("oldSelectedDiv==",newSelectedDiv.classList.includes('dark'))
        let isDark = false
        for (var i = 0; i < newSelectedDiv.classList.length; i++) {
            if (classElement[i] == 'dark'){
                isDark = true
                //first condition satisfied
                break
            }
        }
        console.log(parseInt(newSelectedDiv.id.split('')[4]))
        console.log(parseInt(oldSelectedDiv.id.split('')[4]))
        if(isDark && (parseInt(newSelectedDiv.id.split('')[4]) > parseInt(oldSelectedDiv.id.split('')[4]))){
            isValidMove = true
        }
        console.log("valid move==",isValidMove)
        return isValidMove
    
}
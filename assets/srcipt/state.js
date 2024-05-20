export function saveState() {
    let state = document.querySelector('body').innerHTML
    console.log("child nodes==", typeof state)
    localStorage.setItem('state', state)
}

export function restoreState() {

    let state = localStorage.getItem('state')
    if (state) {
        console.log("state", state)
        document.querySelector('body').innerHTML = state
    } else {
        console.log("no data exists")
    }

}

export function clearState() {
    localStorage.clear()
}





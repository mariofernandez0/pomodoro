import './style.css'

let timer = document.getElementById("time")
let starter = document.getElementById("start-stop")
let focusButton = document.getElementById("focusButton")
let shortBreakButoon = document.getElementById("shortBreakButton")
let longBreakButton = document.getElementById("longBreakButton")
let settingsButton = document.getElementById("settingsIcon")
let settingsMenu = document.getElementById("settingsMenu")
let closeSettings = document.getElementById("scape")
let numberOfPomodoros = document.getElementById("numberOfPomodoros")
let alarm = document.getElementById("alarm")
let next = document.getElementById("next")


let settings = {focus:25, shortBreak:5, longBreak:15, longBreakInterval:4, autoStart:false}
let counter = 1
let currentState = "focus"

const time = [settings.focus,0]
let id
let active = false



function addZero(a) {
  if (a < 10) {
    return "0" + a
  }
  else return a
}

function reset(){
  actualizeTime(time[0],time[1])
  try {clearInterval(id)}
  catch{}
  starter.value = "Start"
  active = false
  next.style.visibility = "hidden"
  next.style.transitionDuration = "0.5s"
  next.style.opacity = "0"
}

function actualizeTime(minutes, seconds){
  timer.innerHTML = addZero(minutes) + ":" + addZero(seconds)
}

function changeButton(runnig){
  if (runnig === true){
    starter.value = "Stop"

  }
  else{
    starter.value = "Resume"
  }
}

function startTimer(){
  if (starter.value === "Start"){

      next.style.visibility = "visible"
      next.style.transitionDuration = "1s"
      next.style.opacity = "1"

      id = setInterval(()=>{
      if (time[0] === 0 && time[1] === 0){
        alarm.play()

        if(currentState === "focus" && (counter  % settings.longBreakInterval) != 0){
          time[0] = settings.shortBreak
          currentState = "shortBreak"
        }

        else if(currentState === "shortBreak" || currentState === "longBreak"){
          time[0] = settings.focus
          currentState = "focus"
          counter += 1
          numberOfPomodoros.innerHTML = "#" + counter + " Pomodoros"
        }

        else {
          time[0] = settings.longBreak
          currentState = "longBreak"
        }

        if(settings.autoStart === false) reset()

      }

      else if (time[1] === 0){
        time[0] -= 1
        time[1] = 59
      }
      else time[1] -= 1
      actualizeTime(time[0],time[1])
    },1000)
  }

  else if (starter.value === "Stop") {
    clearInterval(id)
  }

  else if (starter.value === "Resume"){
    id = setInterval(()=>{
      if (time[0] === 0 && time[1] === 0){

      }
      else if (time[1] === 0){
        time[0] -= 1
        time[1] = 59
      }
      else time[1] -= 1
      actualizeTime(time[0],time[1])
    },1000)
  }

}

actualizeTime(time[0], time[1])
starter.addEventListener("click", () => {
  active = !active
  startTimer()
  changeButton(active)
})

focusButton.addEventListener("click", () => {
  time[0] = settings.focus
  time[1] = 0
  currentState = "focus"
  reset()
})

shortBreakButoon.addEventListener("click", () => {
  time[0] = settings.shortBreak
  time[1] = 0
  currentState = "shortBreak"
  reset()
})

longBreakButton.addEventListener("click", () => {
  time[0] = settings.longBreak
  time[1] = 0
  currentState = "longBreak"
  reset()
})

settingsButton.addEventListener("click", () => settingsMenu.showModal() )

closeSettings.addEventListener("click", () => {
    settingsMenu.close()
    settings.focus = parseInt(document.getElementById("focusInput").value)
    settings.shortBreak = parseInt(document.getElementById("shortBreakInput").value)
    settings.longBreak = parseInt(document.getElementById("longBreakInput").value)
    settings.longBreakInterval = parseInt(document.getElementById("longBreakIntervalInput").value)
    settings.autoStart = document.getElementById("autoStart").checked

    if (starter.value === "Start"){
      time[0] = settings[currentState]
      time[1] = 0
      actualizeTime(time[0], time[1])
    }
  })

next.addEventListener("click", () => {
  time[0] = 0
  time[1] = 0
})

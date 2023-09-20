import {
  Observable,
  Subject,
  Subscription,
  fromEvent,
  interval,
  map,
  scan,
  startWith,
  switchMap,
  takeUntil,
} from "rxjs";
import { apiUrl } from "./Constants";
// Create an array to track the steps
let stepStates = new Array(16).fill(false);

// Create an array to track the kick steps
const stepKickStates = new Array(16).fill(false);
// Create an array to track the closedhat steps
const stepClosedHatStates = new Array(16).fill(false);
// Create an array to track the openhat1 steps
const stepOpenHat1States = new Array(16).fill(false);
// Create an array to track the openhat2 steps
const stepOpenHat2States = new Array(16).fill(false);
// Create an array to track the rimshot steps
const stepRimshotStates = new Array(16).fill(false);
// Create an array to track the snare1 steps
const stepSnare1States = new Array(16).fill(false);
// Create an array to track the snare2 steps
const stepSnare2States = new Array(16).fill(false);
// Create an array to track the clap steps
const stepClapStates = new Array(16).fill(false);
// Create an array to track the lowtom steps
const stepLowTomStates = new Array(16).fill(false);
// Create an array to track the midtom steps
const stepMidTomStates = new Array(16).fill(false);
// Create an array to track the hitom steps
const stepHiTomStates = new Array(16).fill(false);
// Create an array to track the cowbell steps
const stepCowbellStates = new Array(16).fill(false);

// Create a subject to emit click events
const stepClickSubject = new Subject<number>();

//Create div for buttons
const btns = document.createElement("div");
btns.classList.add("btns");

// Create Start button
const startButton = document.createElement("button");
startButton.classList.add("start-btn");
startButton.innerHTML = "Start";

// Create Stop button
const stopButton = document.createElement("button");
stopButton.classList.add("stop-btn");
stopButton.innerHTML = "Stop";

// Create select
const selectBox = document.createElement("select");
selectBox.classList.add("select-box");
// Add an event listener to the select element
selectBox.addEventListener("change", function () {
  const selectedNumber = parseInt(selectBox.value);
  drawSequencer(selectedNumber);
  console.log(`You selected the number: ${selectedNumber}`);
});
btns.appendChild(selectBox);
// Create observables for button clicks
const startClick$ = fromEvent(startButton, "click");
const stopClick$ = fromEvent(stopButton, "click");

export function drawPlayPauseButtons() {
  document.querySelector(".main").appendChild(btns);
  btns.appendChild(startButton);
  btns.appendChild(stopButton);
}

// Create an interval observable
const interval$ = interval(100);

// Create an observable to start and stop the interval
const intervalControl$ = startClick$.pipe(
  switchMap(() =>
    interval$.pipe(
      startWith(-1),
      scan((acc) => (acc + 1) % 16, -1),
      takeUntil(stopClick$)
    )
  )
);
// Create an array to store the audio elements for each sound
const audioElements: { name: string; id: number; audio: HTMLAudioElement }[] =
  [];

// Create a function to play a sound by ID
function playSoundById(id: number) {
  const audio = audioElements.find((element) => element.id === id)?.audio;
  console.log(audioElements.find((element) => element.id === id)?.name);

  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play();
  }
}
// Subscribe to the intervalControl$ observable and update the output
intervalControl$.subscribe(
  (value) => {
    console.log(`Interval value: ${value}`);
    // if (stepStates[value]) playSoundById(idSelect);
    if (stepKickStates[value]) playSoundById(9);
    if (stepClosedHatStates[value]) playSoundById(10);
    if (stepOpenHat1States[value]) playSoundById(11);
    if (stepOpenHat2States[value]) playSoundById(12);
    if (stepRimshotStates[value]) playSoundById(5);
    if (stepSnare1States[value]) playSoundById(6);
    if (stepSnare2States[value]) playSoundById(7);
    if (stepClapStates[value]) playSoundById(8);
    if (stepLowTomStates[value]) playSoundById(1);
    if (stepMidTomStates[value]) playSoundById(2);
    if (stepHiTomStates[value]) playSoundById(3);
    if (stepCowbellStates[value]) playSoundById(4);
    // console.log(stepStates);
  }
  // ,
  // null,
  // () => {
  //   console.log("Interval stopped.");
  // }
);

// Define a function to create an audio element for each sound
function createAudioElement(soundPath: string): HTMLAudioElement {
  const audio = new Audio(soundPath);
  audio.preload = "auto";
  return audio;
}

// Fetch data from JSON Server API
// const apiUrl = "http://localhost:3000/sounds";
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // Populate the audioElements array with audio elements
    audioElements.push(
      ...data.map((sound: any) => ({
        name: sound.name,
        id: sound.id,
        audio: createAudioElement(`/assets/sounds/${sound.soundPath}`),
      }))
    );
    if (selectBox.options.length == 0) {
      audioElements.forEach((element) => {
        let opt = document.createElement("option");
        opt.value = element.id.toString();
        opt.innerHTML = element.name;
        selectBox.appendChild(opt);
        console.log(opt);
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching data from the server:", error);
  });

export function drawSequencer(idSelect: number) {
  //Init stepStates
  if (idSelect == 9) stepStates = stepKickStates;
  if (idSelect == 10) stepStates = stepClosedHatStates;
  if (idSelect == 11) stepStates = stepOpenHat1States;
  if (idSelect == 12) stepStates = stepOpenHat2States;
  if (idSelect == 5) stepStates = stepRimshotStates;
  if (idSelect == 6) stepStates = stepSnare1States;
  if (idSelect == 7) stepStates = stepSnare2States;
  if (idSelect == 8) stepStates = stepClapStates;
  if (idSelect == 1) stepStates = stepLowTomStates;
  if (idSelect == 2) stepStates = stepMidTomStates;
  if (idSelect == 3) stepStates = stepHiTomStates;
  if (idSelect == 4) stepStates = stepCowbellStates;
  console.log(stepStates, idSelect);

  // // Create an interval observable
  // const interval$ = interval(100);

  // // Create an observable to start and stop the interval
  // const intervalControl$ = startClick$.pipe(
  //   switchMap(() =>
  //     interval$.pipe(
  //       startWith(-1),
  //       scan((acc) => (acc + 1) % 16, -1),
  //       takeUntil(stopClick$)
  //     )
  //   )
  // );

  // // Subscribe to the intervalControl$ observable and update the output
  // intervalControl$.subscribe(
  //   (value) => {
  //     console.log(`Interval value: ${value}`);
  //     // if (stepStates[value]) playSoundById(idSelect);
  //     if (stepKickStates[value]) playSoundById(9);
  //     if (stepClosedHatStates[value]) playSoundById(10);
  //     if (stepOpenHat1States[value]) playSoundById(11);
  //     if (stepOpenHat2States[value]) playSoundById(12);
  //     if (stepRimshotStates[value]) playSoundById(5);
  //     if (stepSnare1States[value]) playSoundById(6);
  //     if (stepSnare2States[value]) playSoundById(7);
  //     if (stepClapStates[value]) playSoundById(8);
  //     if (stepLowTomStates[value]) playSoundById(1);
  //     if (stepMidTomStates[value]) playSoundById(2);
  //     if (stepHiTomStates[value]) playSoundById(3);
  //     if (stepCowbellStates[value]) playSoundById(4);
  //     // console.log(stepStates);
  //   }
  //   // ,
  //   // null,
  //   // () => {
  //   //   console.log("Interval stopped.");
  //   // }
  // );

  // // Fetch data from JSON Server API
  // const apiUrl = "http://localhost:3000/sounds";
  // fetch(apiUrl)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // Populate the audioElements array with audio elements
  //     audioElements.push(
  //       ...data.map((sound: any) => ({
  //         name: sound.name,
  //         id: sound.id,
  //         audio: createAudioElement(`/assets/sounds/${sound.soundPath}`),
  //       }))
  //     );
  //     if (selectBox.options.length == 0) {
  //       audioElements.forEach((element) => {
  //         let opt = document.createElement("option");
  //         opt.value = element.id.toString();
  //         opt.innerHTML = element.name;
  //         selectBox.appendChild(opt);
  //         console.log(opt);
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching data from the server:", error);
  //   });
  console.log(audioElements);
  if (document.querySelector(".seq-container"))
    document.querySelector(".seq-container").remove();
  drawSteps();
}

export function drawSteps() {
  // Create a 1x16 grid of drum pads
  let seqContainer = document.createElement("div");
  seqContainer.classList.add("seq-container");
  document.querySelector(".main").appendChild(seqContainer);
  // Create the sequencer steps
  for (let i = 0; i < 16; i++) {
    const pad = document.createElement("div");
    pad.classList.add("seq-pad");

    const step = document.createElement("div");
    step.classList.add("step");
    step.classList.add("step-" + (i + 1).toString());
    if (i >= 0 && i < 4) step.classList.add("first");
    if (i >= 4 && i < 8) step.classList.add("second");
    if (i >= 8 && i < 12) step.classList.add("third");
    if (i >= 12 && i < 16) step.classList.add("fourth");
    step.textContent = "-";
    if (stepStates[i]) step.classList.add("step-selected");
    pad.appendChild(step);

    const num = document.createElement("div");
    num.textContent = (i + 1).toString();
    pad.appendChild(num);

    seqContainer.appendChild(pad);
    // Add click event to the step
    pad.addEventListener("click", () => {
      stepStates[i] = !stepStates[i];
      if (stepStates[i])
        document
          .querySelector(".step-" + (i + 1).toString())
          .classList.add("step-selected");
      else
        document
          .querySelector(".step-" + (i + 1).toString())
          .classList.remove("step-selected");
      stepClickSubject.next(i);
    });
  }
}

// Create an observable to listen for step click events
export const stepClickObservable = stepClickSubject.asObservable();

stepClickObservable.subscribe((clickedStep) => {
  console.log(`Step ${clickedStep + 1} was clicked.`);
  console.log(stepStates);
});

import {
  Observable,
  Subject,
  fromEvent,
  interval,
  map,
  scan,
  startWith,
  switchMap,
  takeUntil,
} from "rxjs";

// Create an array to track the steps
const stepStates = new Array(16).fill(false);

// Create a subject to emit click events
const stepClickSubject = new Subject<number>();

export function drawSequencer() {
  // Create Start button
  const startButton = document.createElement("button");
  startButton.classList.add("start-btn");
  startButton.innerHTML = "Start";
  document.querySelector(".main").appendChild(startButton);

  // Create Stop button
  const stopButton = document.createElement("button");
  stopButton.classList.add("stop-btn");
  stopButton.innerHTML = "Stop";
  document.querySelector(".main").appendChild(stopButton);

  // Create observables for button clicks
  const startClick$ = fromEvent(startButton, "click");
  const stopClick$ = fromEvent(stopButton, "click");

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

  // Subscribe to the intervalControl$ observable and update the output
  intervalControl$.subscribe(
    (value) => {
      console.log(`Interval value: ${value}`);
      if (stepStates[value]) playSoundById(6);
    },
    null,
    () => {
      console.log("Interval stopped.");
    }
  );

  // Define a function to create an audio element for each sound
  function createAudioElement(soundPath: string): HTMLAudioElement {
    const audio = new Audio(soundPath);
    audio.preload = "auto";
    return audio;
  }
  // Create a 1x16 grid of drum pads
  const seqContainer = document.createElement("div");
  seqContainer.classList.add("seq-container");
  document.querySelector(".main").appendChild(seqContainer);

  // Create an array to store the audio elements for each sound
  const audioElements: { id: number; audio: HTMLAudioElement }[] = [];

  // Create a function to play a sound by ID
  function playSoundById(id: number) {
    const audio = audioElements.find((element) => element.id === id)?.audio;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  // Fetch data from JSON Server API
  const apiUrl = "http://localhost:3000/sounds";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Populate the audioElements array with audio elements
      audioElements.push(
        ...data.map((sound: any) => ({
          id: sound.id,
          audio: createAudioElement(`/assets/sounds/${sound.soundPath}`), // Update the URL
        }))
      );
    })
    .catch((error) => {
      console.error("Error fetching data from the server:", error);
    });
  console.log(audioElements);

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

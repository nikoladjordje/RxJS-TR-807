import { filter, forkJoin, from, fromEvent, map, mergeMap } from "rxjs";

export function drawMPC() {
  // Define a function to create an audio element for each sound
  function createAudioElement(soundPath: string): HTMLAudioElement {
    const audio = new Audio(soundPath);
    audio.preload = "auto";
    return audio;
  }

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

  // Create a 4x3 grid of drum pads
  const mpcContainer = document.createElement("div");
  mpcContainer.classList.add("mpc-container");
  document.body.appendChild(mpcContainer);

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

      // Add drum pads to the grid
      for (const sound of data) {
        const pad = document.createElement("div");
        pad.classList.add("drum-pad");
        pad.textContent = sound.name;
        pad.addEventListener("click", () => playSoundById(sound.id));
        mpcContainer.appendChild(pad);
      }
    })
    .catch((error) => {
      console.error("Error fetching data from the server:", error);
    });
  console.log(audioElements);

  // Create an observable for the "Q" key press
  const qKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "Q"), // Filter for the "Q" key
    map(() => 9) // Map it to the ID of the "Kick" sound
  );

  // Subscribe to the "Q" key press observable and play the "Kick" sound
  qKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });

  // Create an observable for the "W" key press
  const wKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "W"),
    map(() => 10)
  );

  wKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });

  // Create an observable for the "E" key press
  const eKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "E"),
    map(() => 11)
  );

  eKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });

  // Create an observable for the "R" key press
  const rKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "R"),
    map(() => 12)
  );

  rKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });
  // Create an observable for the "A" key press
  const aKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "A"),
    map(() => 5)
  );

  aKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });

  // Create an observable for the "S" key press
  const sKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "S"),
    map(() => 6)
  );

  sKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });
  // Create an observable for the "D" key press
  const dKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "D"),
    map(() => 7)
  );

  dKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });

  // Create an observable for the "f" key press
  const fKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "F"),
    map(() => 8)
  );

  fKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });
  // Create an observable for the "Z" key press
  const zKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "Z"),
    map(() => 1)
  );

  zKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });

  // Create an observable for the "X" key press
  const xKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "X"),
    map(() => 2)
  );

  xKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });
  // Create an observable for the "C" key press
  const cKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "C"),
    map(() => 3)
  );

  cKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });
  // Create an observable for the "V" key press
  const vKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "V"),
    map(() => 4)
  );

  vKeyPressObservable.subscribe((soundId) => {
    playSoundById(soundId);
  });
}

// const drumPadLabels = [
//   "Kick",
//   "Closedhat",
//   "Openhat1",
//   "Openhat2",
//   "Rimshot",
//   "Snare1",
//   "Snare2",
//   "Clap",
//   "LowTom",
//   "MidTom",
//   "HiTom",
//   "Cowbell",
// ];

// function createDrumPad(label: string): HTMLDivElement {
//   const pad = document.createElement("div");
//   pad.classList.add("drum-pad");
//   pad.textContent = label;
//   pad.addEventListener("click", () => playSound(label));
//   return pad;
// }

// export function drawMPC() {
//   const mpcContainer = document.querySelector(".MPC");
//   if (mpcContainer) {
//     drumPadLabels.forEach((label) => {
//       const pad = createDrumPad(label);
//       mpcContainer.appendChild(pad);
//     });
//   }
// }

// const zKey$ = fromEvent(document, "keydown").pipe(
//   filter((event: KeyboardEvent) => event.key === "z"),
//   map(() => kickSound)
// );

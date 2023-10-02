import {
  EMPTY,
  filter,
  forkJoin,
  from,
  fromEvent,
  map,
  merge,
  mergeMap,
  of,
} from "rxjs";
import { apiUrl } from "./Constants";

export function drawMPC() {
  // Define a function to create an audio element for each sound
  function createAudioElement(soundPath: string): HTMLAudioElement {
    const audio = new Audio(soundPath);
    audio.preload = "auto";
    return audio;
  }

  // Create an array to store the audio elements for each sound
  const audioElements: { name: string; id: number; audio: HTMLAudioElement }[] =
    [];

  // Create a function to play a sound by ID
  function playSoundById(id: number) {
    const audio = audioElements.find((element) => element.id === id)?.audio;
    console.log(audioElements.find((element) => element.id === id)?.name);

    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  // Create a 4x3 grid of drum pads
  const mpcContainer = document.createElement("div");
  mpcContainer.classList.add("mpc-container");
  document.querySelector(".main").appendChild(mpcContainer);

  // Fetch data from JSON Server API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Populate the audioElements array with audio elements
      audioElements.push(
        ...data.map((sound: any) => ({
          name: sound.name,
          id: sound.id,
          audio: createAudioElement(`/assets/sounds/${sound.soundPath}`), // Update the URL
        }))
      );

      // Add drum pads to the grid
      for (const sound of data) {
        const pad = document.createElement("div");
        pad.classList.add("drum-pad");
        pad.classList.add("drum-pad-" + sound.id);
        pad.textContent = sound.name;
        pad.addEventListener("click", () => playSoundById(sound.id));
        mpcContainer.appendChild(pad);
      }
    })
    .catch((error) => {
      console.error("Error fetching data from the server:", error);
    });
  console.log(audioElements);

  // const keyPressObservable = fromEvent<KeyboardEvent>(document, "keydown").pipe(
  //   map((event) => event.key.toUpperCase()),
  //   mergeMap((key) => {
  //     switch (key) {
  //       case "Q":
  //         return of(9);
  //       case "W":
  //         return of(10);
  //       case "E":
  //         return of(11);
  //       case "R":
  //         return of(12);
  //       case "A":
  //         return of(5);
  //       case "S":
  //         return of(6);
  //       case "D":
  //         return of(7);
  //       case "F":
  //         return of(8);
  //       case "Z":
  //         return of(1);
  //       case "X":
  //         return of(2);
  //       case "C":
  //         return of(3);
  //       case "V":
  //         return of(4);
  //       default:
  //         return EMPTY;
  //     }
  //   }),
  //   filter((soundId) => soundId !== null)
  // );

  // keyPressObservable.subscribe((soundId) => {
  //   playSoundById(soundId);
  // });

  // Create observables for the key presses and map them to sound IDs
  const qKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "Q"),
    map(() => 9)
  );

  const wKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "W"),
    map(() => 10)
  );

  const eKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "E"),
    map(() => 11)
  );

  const rKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "R"),
    map(() => 12)
  );

  const aKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "A"),
    map(() => 5)
  );

  const sKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "S"),
    map(() => 6)
  );

  const dKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "D"),
    map(() => 7)
  );

  const fKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "F"),
    map(() => 8)
  );

  const zKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "Z"),
    map(() => 1)
  );

  const xKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "X"),
    map(() => 2)
  );

  const cKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "C"),
    map(() => 3)
  );

  const vKeyPressObservable = fromEvent<KeyboardEvent>(
    document,
    "keydown"
  ).pipe(
    filter((event) => event.key.toUpperCase() === "V"),
    map(() => 4)
  );

  // Merge all of these observables into one
  const mergedObservable = merge(
    qKeyPressObservable,
    wKeyPressObservable,
    eKeyPressObservable,
    rKeyPressObservable,
    aKeyPressObservable,
    sKeyPressObservable,
    dKeyPressObservable,
    fKeyPressObservable,
    zKeyPressObservable,
    xKeyPressObservable,
    cKeyPressObservable,
    vKeyPressObservable
  );

  // Subscribe to the merged observable and play the sound
  mergedObservable.subscribe((soundId) => {
    playSoundById(soundId);
    document.querySelector(".drum-pad-" + soundId).classList.add("clicked");

    // Remove the clicked class after a short delay (e.g., 200 milliseconds)
    setTimeout(() => {
      document
        .querySelector(".drum-pad-" + soundId)
        .classList.remove("clicked");
    }, 200);
  });
}

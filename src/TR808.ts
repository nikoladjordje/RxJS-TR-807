import { Observable } from "rxjs";

export function drawSequencer() {
  // Create a 1x16 grid of drum pads
  const seqContainer = document.createElement("div");
  seqContainer.classList.add("seq-container");
  document.querySelector(".main").appendChild(seqContainer);

  // Create the sequencer steps
  for (let i = 0; i < 16; i++) {
    const pad = document.createElement("div");
    pad.classList.add("seq-pad");

    const step = document.createElement("div");
    step.classList.add("step");
    step.classList.add((i + 1).toString());
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
  }
}

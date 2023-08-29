"use client";
import React from "react";
import { MdPlayCircle, MdSkipNext, MdSkipPrevious, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { PiRepeat, PiShuffleLight } from "react-icons/pi";

function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="text-color-text-secondary hover:text-color-text-primary active:text-color-active-primary">
      {children}
    </button>
  );
}
function Player() {
  // aria-label, data-testid aria-expanded
  return (
    <footer className="flex w-screen gap-x-2 p-1 fixed bottom-0">
      <div className="basis-[30%] min-w-[180px] ">now playing</div>
      <div className="basis-[40%] max-w-[722px] ">
        <div className="flex justify-center gap-4 mb-2">
          <div className="flex justify-end gap-2 ml-auto">
            <Button>
              <PiShuffleLight size={"1rem"} />
            </Button>
            <Button>
              <MdSkipPrevious size={"1.5rem"} />
            </Button>
          </div>
          <Button>
            <MdPlayCircle size={"2rem"} className={"text-color-text-primary hover:scale-105 active:scale-100"} />
          </Button>
          <div className="flex justify-start gap-2 mr-auto">
            <Button>
              <MdSkipNext size={"1.5rem"} />
            </Button>
            <Button>
              <PiRepeat size={"1rem"} />
            </Button>
          </div>
        </div>
      </div>
      <div className="basis-[30%] min-w-[180px]  flex justify-end">
        <div className="flex items-center">
          <Button>
            <MdVolumeUp size={"1rem"} />
          </Button>
          <Button>
            <MdVolumeOff size={"1rem"} />
          </Button>
          <input type="range" min={0} max={1} step={0.1} className="h-1 ml-2" />
        </div>
      </div>
    </footer>
  );
}

export default Player;

import React, { useEffect, useState } from "react";
import {
  DEFAULT_SALUATION,
  GOOD_EVENING_SALUATION,
  GOOD_MORNING_SALUATION,
} from "../../constants";

export const useGreeting = () => {
  const [greeting, setGreeting] = useState<string>("");
  useEffect(() => {
    const currentTime = new Date().getHours();

    let newGreeting = "";

    if (currentTime >= 5 && currentTime < 12) {
      newGreeting = GOOD_MORNING_SALUATION;
    } else if (currentTime >= 12 && currentTime < 18) {
      newGreeting = DEFAULT_SALUATION;
    } else {
      newGreeting = GOOD_EVENING_SALUATION;
    }
    setGreeting(newGreeting);
  }, []);
  return {
    greeting: greeting,
  };
};

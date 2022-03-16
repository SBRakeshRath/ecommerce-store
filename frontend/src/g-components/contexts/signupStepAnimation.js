import { createContext, useState } from "react";

export const SignUpStepAnimation = createContext();
export default function SignupStepAnimationProvider({ children }) {
  const [animation, setAnimation] = useState(true);

  return (
    <SignUpStepAnimation.Provider
      value={{ animation: animation, setAnimation: setAnimation }}
    >
      {children}
    </SignUpStepAnimation.Provider>
  );
}

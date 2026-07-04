import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBXhfw9RS0OEKIUA5wSCxDLHKZ1fuEzK3c",
  authDomain: "institute-fc13c.firebaseapp.com",
  projectId: "institute-fc13c",
  storageBucket: "institute-fc13c.firebasestorage.app",
  messagingSenderId: "973987795063",
  appId: "1:973987795063:web:c477dd61e4433a1d337672",
  measurementId: "G-RJ35RJ0BDY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// SEND OTP
export const sendOTP = async (phone) => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha",
    { size: "invisible" },
    auth
  );

  const confirmation = await signInWithPhoneNumber(
    auth,
    phone,
    window.recaptchaVerifier
  );

  window.confirmationResult = confirmation;
};

// VERIFY OTP
export const verifyOTP = async (otp) => {
  const result = await window.confirmationResult.confirm(otp);
  return result.user;
};
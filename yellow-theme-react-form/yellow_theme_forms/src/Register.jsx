import { useState, useEffect } from "react";
import rightTopTriangle from "../public/right_top_triangle.png";
import rightBottomTriangle from "../public/right_bottom_triangle.png";
import leftTopTriangle from "../public/left_top_triangle.png";
import headerTextElement from '../public/header_text_element.png'
import Input from './Input';
import { dummyUser } from './data';
import { motion, AnimatePresence, delay } from 'framer-motion';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Remove formLoaded state
  // const [formLoaded, setFormLoaded] = useState(false);

  // Prevent scroll during initial animation (use a fixed timeout for scroll lock)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timeout = setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 900); // match total delay of rightBottomTriangle + first form element
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timeout);
    };
  }, []);


  const spring = {
    type: "spring",
    stiffness: 100,
    damping: 18,
  };

  const formStartDelay = 0.5; // e.g. 0.8
  // Button: domino, top-left
  const buttonVariant = (delay) => ({
    hidden: { opacity: 0, x: -40, y: -30 },
    visible: { opacity: 1, x: 0, y: 0, transition: { ...spring, delay } },
  });
  // Text left
  const textLeftVariant = (delay) => ({
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { ...spring, delay } },
  });
  // Text right
  const textRightVariant = (delay) => ({
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { ...spring, delay } },
  });
  // Divider left line
  const dividerLeftVariant = (delay) => ({
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { ...spring, delay } },
  });
  // Divider right line
  const dividerRightVariant = (delay) => ({
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { ...spring, delay } },
  });
  // Divider 'or' text
  const dividerOrVariant = (delay) => ({
    hidden: { opacity: 0, y: 30, scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { ...spring, delay } },
  });

  // Animation delays (top to bottom, all start after triangle anim)
  const delays = {
    loginForm: formStartDelay + 0.0,
    headerImg: formStartDelay + 0.5,
    email: formStartDelay + 0.1,
    password: formStartDelay + 0.2,
    signIn: formStartDelay + 0.3,
    registerNow: formStartDelay + 0.4,
    registerBtn: formStartDelay + 0.4, // same as registerNow so they finish together
    dividerLeft: formStartDelay + 0.5,
    dividerOr: formStartDelay + 0.45,
    dividerRight: formStartDelay + 0.5,
    google: formStartDelay + 0.4,
    facebook: formStartDelay + 0.5,
  };

  const whileTap = { scale: 0.95, transition: { duration: 0.15 } };
  const whileHover = { scale: 1.02, transition: { duration: 0.18 } };

  function handleSubmit(e) {
    e.preventDefault();
    setError("")
    setTimeout(() => {
      if (
        emailOrPhone === dummyUser.emailOrPhone &&
        password === dummyUser.password
      ) {
        setError("");
        alert('Logged in (dummy)');
      } else if (!emailOrPhone || !password) {
        setError("please fill the fields!")
      } else {
        setError("Email/Phone or password is incorrect.");
      }
    }, 30);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#FFEDDA]">
      {/* Wrapper */}
      <section className="relative flex">
        {/* form */}
        <div
          className="relative flex bg-no-repeat z-20 bg-[url('/form_wrapper.png')] bg-cover w-[855px] h-[512px] p-[25px_45px]
            max-lg:bg-white max-lg:shadow-[4px_8px_13px_rgba(0,0,0,0.25)] max-lg:bg-none max-lg:w-[27.5rem]"
        >
          {/* Left side (Form) */}
          <div className="flex-1 max-lg:flex max-lg:flex-col max-lg:items-center">
            {/* Header */}
            <motion.div
              className="relative"
            >
              {/* 1. LOGIN FORM text (no change) */}
              <motion.h1
                className="text-[22px] font-bold w-fit mb-[35px] z-[20] pl-[6px] relative"
                variants={textLeftVariant(delays.loginForm)}
                initial="hidden"
                animate="visible"
              >
                LOGIN FORM
              </motion.h1>
              {/* 2. headerTextElement image (no change) */}
              <motion.img
                src={headerTextElement}
                alt=""
                className="absolute top-[22px] w-[155px]"
                variants={textRightVariant(delays.headerImg)}
                initial="hidden"
                animate="visible"
              />
            </motion.div>

            {/* Inputs and form content */}
            <motion.form
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-3">
                {/* 3. Email or Phone input (button style) */}
                <motion.div variants={buttonVariant(delays.email)} initial="hidden" animate="visible">
                  <Input
                    type="text"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                    placeholder="Email or Phone"
                  />
                </motion.div>
                {/* 4. Password input (button style) */}
                <motion.div variants={buttonVariant(delays.password)} initial="hidden" animate="visible">
                  <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    showToggleEye={true}
                    showPassword={showPassword}
                    onToggleShowPassword={() => setShowPassword(!showPassword)}
                  />
                </motion.div>
                {/* Error message (general, below both fields) */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      key={error}
                      initial={{ x: 3, y: 70, scale: 0, opacity: 0 }}
                      animate={{ x: 3, y: 97, scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#e53935] font-semibold text-[12px] flex justify-center items-center mt-1 min-h-[18px] self-start absolute w-[250px]"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 5. SIGN IN button (button style) */}
              <motion.button
                type="submit"
                whileTap={whileTap}
                whileHover={whileHover}
                variants={buttonVariant(delays.signIn)}
                initial="hidden"
                animate="visible"
                className="w-[257px] h-[40px] text-[14px] font-bold text-black bg-gradient-to-r from-gradient-1-from to-gradient-1-to bg-[length:200%_200%] ease-in-out cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] mt-[35px]  "
              >
                SIGN IN
              </motion.button>
            </motion.form>

            {/* 6. Register now text (split left/right) */}
            <motion.div
              className="mt-4 text-center w-[257px] flex justify-center items-center gap-1"
            >
              <motion.span className="text-[14px] font-normal" variants={textLeftVariant(delays.registerNow)} initial="hidden" animate="visible">
                you haven’t account?
              </motion.span>
              <motion.button
                whileTap={whileTap}
                className="text-[15px] font-semibold cursor-pointer underline underline-offset-2 hover:text-gray-500 "
                variants={textRightVariant(delays.registerBtn)}
                initial="hidden"
                animate="visible"
              >
                register now
              </motion.button>
            </motion.div>

            {/* 7. Divider with OR (lines 177–186) */}
            <motion.div
              className="w-[257px] flex items-center justify-center gap-1 mt-4"
            >
              <motion.div className="flex-1 h-[1.6px] bg-black rounded-full" variants={dividerLeftVariant(delays.dividerLeft)} initial="hidden" animate="visible" />
              <motion.div className="text-[14px] relative top-[-2px]" variants={dividerOrVariant(delays.dividerOr)} initial="hidden" animate="visible">
                or
              </motion.div>
              <motion.div className="flex-1 h-[1.6px] bg-black rounded-full" variants={dividerRightVariant(delays.dividerRight)} initial="hidden" animate="visible" />
            </motion.div>

            {/* 8. Social login buttons (button style, domino) */}
            <div className="mt-5 flex flex-col gap-2.5 w-[257px]">
              <motion.button
                type="button"
                whileTap={whileTap}
                whileHover={whileHover}
                variants={buttonVariant(delays.google)}
                initial="hidden"
                animate="visible"
                className="w-full h-[40px] text-[16px] font-normal bg-secondary cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] flex items-center gap-[8px] pl-[17.5%] hover:scale-[1.02]"
              >
                <img src="/google_logo.png" alt="google" className="w-[21px] h-[21px] " />
                <span className="">login with Google</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={whileTap}
                whileHover={whileHover}
                variants={buttonVariant(delays.facebook)}
                initial="hidden"
                animate="visible"
                className="w-full h-[40px] text-[16px] font-normal bg-secondary cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] flex items-center gap-[8px] pl-[17.5%] hover:scale-[1.02]"
              >
                <img src="/facebook_logo.png" alt="facebook" className="w-[21px] h-[21px] " />
                <span className="">login with Facebook</span>
              </motion.button>
            </div>
          </div>

          {/* Right side (Image / Illustration) */}
          <div className="flex-1 flex items-center justify-center max-lg:hidden">
            <motion.img
              src="/human.png"
              alt="human"
              className="mr-[-2.875rem] mt-0 pointer-events-auto"
              initial={{ opacity: 0, marginRight: '-18.875rem' }}
              animate={{ opacity: 1, marginRight: '-2.875rem' }}
              whileTap={whileTap}
              whileHover={whileHover}
              transition={{ ...spring, delay: 0.1 }}
            />
          </div>
        </div>
        {/* Triangle under form */}
        <motion.img
          src={rightTopTriangle}
          alt="triangle"
          className="absolute pointer-events-auto"
          initial={{ opacity: 0, top: '-21.3rem', right: '-21.6rem' }}
          animate={{ opacity: 1, top: '-3.3rem', right: '-2.6rem' }}
          whileTap={whileTap}
          whileHover={whileHover}
          transition={{ ...spring, delay: 0.1 }}
        />
        <motion.img
          src={leftTopTriangle}
          alt="triangle"
          className="absolute pointer-events-auto"
          initial={{ opacity: 0, top: '-23rem', left: '-23rem' }}
          animate={{ opacity: 1, top: '-7rem', left: '-7rem' }}
          whileTap={whileTap}
          whileHover={whileHover}
          transition={{ ...spring, delay: 0.1 }}
        />
        <motion.img
          src={rightBottomTriangle}
          alt="triangle"
          className="absolute z-[25] pointer-events-auto"
          initial={{ opacity: 0, top: '40.25rem', right: '13rem' }}
          animate={{ opacity: 1, top: '27.25rem', right: '13rem' }}
          whileTap={whileTap}
          whileHover={whileHover}
          transition={{ ...spring, delay: 0.1 }}
        />
      </section>
    </div>
  );
}

import { useState, useEffect } from "react";
import rightTopTriangle from "../public/right_top_triangle.png";
import rightBottomTriangle from "../public/right_bottom_triangle.png";
import leftTopTriangle from "../public/left_top_triangle.png";
import headerTextElement from '../public/header_text_element.png'
import headerTextElementTablet from '../public/header_text_element_tablet.png'
import FormAnimate from './FormAnimate';
import { dummyUser } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreakpoint } from "./useBreakPoint";
import leftBottomTriangle from "../public/left_bottom_triangle.png";


export default function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(()=>{
    return JSON.parse(localStorage.getItem("formState"))
  });
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: ""
  });
  const [error, setError] = useState("");
  const breakPoint = useBreakpoint();

  // Prevent scroll during initial animation (use a fixed timeout for scroll lock)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
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
      if (isLogin) {
        // Login form validation
        if (
          formData.emailOrPhone === dummyUser.emailOrPhone &&
          formData.password === dummyUser.password
        ) {
          setError("");
          alert('Logged in (dummy)');
        } else if (!formData.emailOrPhone || !formData.password) {
          setError("please fill the fields!")
        } else {
          setError("Email/Phone or password is incorrect.");
        }
      } else {
        // Register form validation
        if (!formData.email || !formData.password || !formData.repeatPassword || !formData.firstName || !formData.lastName) {
          setError("please fill all fields!")
        } else if (formData.password !== formData.repeatPassword) {
          setError("Passwords don't match!")
        } else {
          setError("");
          alert('Registered successfully (dummy)');
        }
      }
    }, 30);
  }

  const toggleForm = () => {
    
    setIsLogin(()=>{
      let formState = !isLogin
      localStorage.setItem('formState', JSON.stringify(formState))
      return formState
    });
    setError("");
    setFormData({
      emailOrPhone: "",
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: ""
    });
  };

  console.log(breakPoint);
  

  return (
    <div className="h-screen flex items-center justify-center bg-[#FFEDDA]">
      {/* Wrapper */}
      <section className="relative flex h-[512px] w-[855px] max-lg:w-[27.5rem] max-ssm:w-[90%]  max-sm:w-[22.5rem] max-sm:top-[-2rem]">
        {/* form */}
        <div
          className="relative flex bg-no-repeat z-20 bg-[url('/form_wrapper.png')] bg-cover p-[25px_45px]
            max-lg:bg-white max-lg:shadow-[4px_8px_13px_rgba(0,0,0,0.25)] max-lg:bg-none w-full h-full max-ssm:pl-0 max-ssm:pr-0"
        >
          {/* Left side (Form) */}
          <div className="flex-1 max-lg:flex max-lg:flex-col max-lg:items-center">
            <FormAnimate
              isLogin={isLogin}
              formData={formData}
              setFormData={setFormData}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={error}
              handleSubmit={handleSubmit}
              spring={spring}
              delays={delays}
              buttonVariant={buttonVariant}
              textLeftVariant={textLeftVariant}
              textRightVariant={textRightVariant}
              dividerLeftVariant={dividerLeftVariant}
              dividerRightVariant={dividerRightVariant}
              dividerOrVariant={dividerOrVariant}
              whileTap={whileTap}
              whileHover={whileHover}
              breakPoint={breakPoint}
              headerTextElement={headerTextElement}
              headerTextElementTablet={headerTextElementTablet}
            />
            
            {/* Form toggle button */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login-toggle" : "register-toggle"}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-center w-[257px] flex justify-center items-center gap-1"
              >
                <motion.span 
                  className="text-[14px] font-normal" 
                  variants={textLeftVariant(delays.registerNow)} 
                  initial="hidden" 
                  animate="visible" 
                  exit="hidden"
                >
                  {isLogin ? "you haven't account?" : "already have an account?"}
                </motion.span>
                <motion.button
                  onClick={toggleForm}
                  whileTap={whileTap}
                  className="text-[15px] font-semibold cursor-pointer underline underline-offset-2 hover:text-gray-500 "
                  variants={textRightVariant(delays.registerBtn)}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {isLogin ? "register now" : "SIGN IN"}
                </motion.button>
              </motion.div>
            </AnimatePresence>
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
          className="absolute pointer-events-auto max-sm:hidden"
          initial={{ opacity: 0, top: '-21.3rem', right: '-21.6rem' }}
          animate={{ opacity: 1, 
            top: breakPoint != "desktop" ? '-5rem' : '-3.3rem',
            right: breakPoint != "desktop" ? '-5.8rem' : '-2.6rem' }}
          whileTap={whileTap}
          whileHover={whileHover}
          transition={{ ...spring, delay: 0.1 }}
        />
        <motion.img
          src={leftTopTriangle}
          alt="triangle"
          className="absolute pointer-events-auto max-sm:hidden"
          initial={{ opacity: 0, top: '-23rem', left: '-23rem' }}
          animate={{ opacity: 1, top: '-7rem', left: '-7rem' }}
          whileTap={whileTap}
          whileHover={whileHover}
          transition={{ ...spring, delay: 0.1 }}
        />
        <motion.img
          src={rightBottomTriangle}
          alt="triangle"
          className={`absolute pointer-events-auto max-lg:z-10 z-20 `}
          initial={
            breakPoint === "mobile" || breakPoint === "smallMobile"
            ? { opacity: 0, top: '40.25rem', right: '20%' } :
            breakPoint === "tablet" 
              ? { opacity: 0, top: '40.25rem', right: '-21rem' } :
              { opacity: 0, top: '40.25rem', right: '13rem' }
          }
          animate={
            breakPoint === "mobile" || breakPoint === "smallMobile"
            ? { opacity: 1, top: '27.25rem', right: '20%' } :
            breakPoint === "tablet" 
              ? { opacity: 1, top: '27.25rem', right: '-8rem', rotate: '-51deg' } :
              { opacity: 1, top: '27.25rem', right: '13rem' }
          }
          whileTap={whileTap}
          whileHover={whileHover}
          transition={{ ...spring, delay: 0.1 }}
        />
        <motion.img
          src={leftBottomTriangle}
          alt="triangle"
          className="absolute pointer-events-auto max-lg:sm:block hidden"
          initial={{ opacity: 0, bottom: '-23rem', left: '-23rem' }}
          animate={{ opacity: 1, bottom: '-3rem', left: '-3rem' }}
          whileTap={whileTap}
          whileHover={whileHover}
          transition={{ ...spring, delay: 0.1 }}
        />
      </section>
    </div>
  );
}

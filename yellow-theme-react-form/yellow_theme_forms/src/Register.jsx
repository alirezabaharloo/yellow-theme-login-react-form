import { useState, useEffect } from "react";
import rightTopTriangle from "../public/right_top_triangle.png";
import rightBottomTriangle from "../public/right_bottom_triangle.png";
import leftTopTriangle from "../public/left_top_triangle.png";
import headerTextElement from '../public/header_text_element.png'
import Input from './Input';
import { dummyUser } from './data';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Prevent scroll during initial animation
  useEffect(() => {
    if (!imagesLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [imagesLoaded]);

  // Animation variants
  const spring = {
    type: "spring",
    stiffness: 60,
    damping: 14,
  };

  // Zig-zag animation variants
  const variantA = {
    hidden: { opacity: 0, x: -40, y: -20 },
    visible: { opacity: 1, x: 0, y: 0, transition: spring },
  };
  const variantB = {
    hidden: { opacity: 0, x: 40, y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: spring },
  };
  // Remove stagger for simultaneous animation

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
          className="relative flex bg-no-repeat bg-contain z-20"
          style={{
            backgroundImage: "url('/form_wrapper.png')",
            width: "855px",
            height: "512px",
            padding: "25px 45px",
          }}
        >
          {/* Left side (Form) */}
          <div className="flex-1">
            {/* Header */}
            <motion.div
              className="relative"
              initial="hidden"
              animate={imagesLoaded ? "visible" : "hidden"}
            >
              {/* 1. LOGIN FORM text (A) */}
              <motion.h1
                className="text-[22px] font-bold w-fit mb-[35px] z-[20] pl-[6px] relative"
                variants={variantA}
              >
                LOGIN FORM
              </motion.h1>
              {/* 2. headerTextElement image (B) */}
              <motion.img
                src={headerTextElement}
                alt=""
                className="absolute top-[22px] w-[155px]"
                variants={variantB}
              />
            </motion.div>

            {/* Inputs and form content */}
            <motion.form
              onSubmit={handleSubmit}
              initial="hidden"
              animate={imagesLoaded ? "visible" : "hidden"}
            >
              <div className="flex flex-col gap-3">
                {/* 3. Email or Phone input (A) */}
                <motion.div variants={variantA}>
                  <Input
                    type="text"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                    placeholder="Email or Phone"
                  />
                </motion.div>
                {/* 4. Password input (B) */}
                <motion.div variants={variantB}>
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

              {/* 5. SIGN IN button (A) */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                variants={variantA}
                className="w-[257px] h-[40px] text-[14px] font-bold text-black bg-gradient-to-r from-gradient-1-from to-gradient-1-to bg-[length:200%_200%] ease-in-out cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] mt-[35px]  "
              >
                SIGN IN
              </motion.button>
            </motion.form>

            {/* 6. Register now text (B) */}
            <motion.div
              variants={variantB}
              initial="hidden"
              animate={imagesLoaded ? "visible" : "hidden"}
              className="mt-4 text-center w-[257px]"
            >
              <span className="text-[14px] font-normal">you haven’t account? </span>
              <motion.button
                whileTap={{ scale: 0.92 }}
                className="text-[15px] font-semibold cursor-pointer underline underline-offset-2 hover:text-gray-500 "
              >
                register now
              </motion.button>
            </motion.div>

            {/* 7. Divider with OR (A) */}
            <motion.div
              variants={variantA}
              initial="hidden"
              animate={imagesLoaded ? "visible" : "hidden"}
              className="w-[257px] flex items-center justify-center gap-1 mt-4"
            >
              <div className="flex-1 h-[1.6px] bg-black rounded-full" />
              <div className="text-[14px] relative top-[-2px]">or</div>
              <div className="flex-1 h-[1.6px] bg-black rounded-full" />
            </motion.div>

            {/* 8. Social login buttons (zig-zag: Google=B, Facebook=A) */}
            <div className="mt-5 flex flex-col gap-2.5 w-[257px]">
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                variants={variantB}
                initial="hidden"
                animate={imagesLoaded ? "visible" : "hidden"}
                className="w-full h-[40px] text-[16px] font-normal bg-secondary cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] flex items-center gap-[8px] pl-[17.5%] hover:scale-[1.02]"
              >
                <img src="/google_logo.png" alt="google" className="w-[21px] h-[21px] " />
                <span className="">login with Google</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                variants={variantA}
                initial="hidden"
                animate={imagesLoaded ? "visible" : "hidden"}
                className="w-full h-[40px] text-[16px] font-normal bg-secondary cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] flex items-center gap-[8px] pl-[17.5%] hover:scale-[1.02]"
              >
                <img src="/facebook_logo.png" alt="facebook" className="w-[21px] h-[21px] " />
                <span className="">login with Facebook</span>
              </motion.button>
            </div>
          </div>

          {/* Right side (Image / Illustration) */}
          <div className="flex-1 flex items-center justify-center ">
            <motion.img
              src="/human.png"
              alt="human"
              className="mr-[-2.875rem] mt-0"
              initial={{ opacity: 0, marginRight: '-18.875rem' }}
              animate={{ opacity: 1, marginRight: '-2.875rem' }}
              transition={{ ...spring, delay: 0.1 }}
            />
          </div>
        </div>
        {/* Triangle under form */}
        <motion.img
          src={rightTopTriangle}
          alt="triangle"
          className="absolute"
          initial={{ opacity: 0, top: '-21.3rem', right: '-21.6rem' }}
          animate={{ opacity: 1, top: '-3.3rem', right: '-2.6rem' }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ ...spring, delay: 0.1 }}
        />
        <motion.img
          src={leftTopTriangle}
          alt="triangle"
          className="absolute"
          initial={{ opacity: 0, top: '-23rem', left: '-23rem' }}
          animate={{ opacity: 1, top: '-7rem', left: '-7rem' }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ ...spring, delay: 0.1 }}
        />
        <motion.img
          src={rightBottomTriangle}
          alt="triangle"
          className="absolute z-[25]"
          initial={{ opacity: 0, top: '40.25rem', right: '13rem' }}
          animate={{ opacity: 1, top: '27.25rem', right: '13rem' }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          transition={{ ...spring, delay: 0.1, onComplete: () => setImagesLoaded(true) }}
        />
      </section>
    </div>
  );
}

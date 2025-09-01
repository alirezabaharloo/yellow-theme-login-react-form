import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from './Input';

export default function FormAnimate({ 
  isLogin, 
  formData, 
  setFormData, 
  showPassword, 
  setShowPassword, 
  error, 
  handleSubmit, 
  spring, 
  delays, 
  buttonVariant, 
  textLeftVariant, 
  textRightVariant, 
  dividerLeftVariant, 
  dividerRightVariant, 
  dividerOrVariant,
  whileTap,
  whileHover,
  breakPoint,
  headerTextElement,
  headerTextElementTablet
}) {
  const loginForm = (
    <AnimatePresence mode="wait">
      <motion.div
        key="login"
        initial="visible"
        exit="hidden"
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <motion.div className="relative max-lg:flex max-lg:justify-center">
          <motion.h1
            className="text-[22px] font-bold w-fit mb-[35px] z-[20] pl-[6px] relative max-lg:right-[0.1rem]"
            variants={textLeftVariant(delays.loginForm)}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            LOGIN FORM
          </motion.h1>
          <motion.img
            src={breakPoint !== "desktop" ? headerTextElementTablet : headerTextElement}
            alt=""
            className="absolute top-[22px] w-[155px] max-lg:scale-[1.2]"
            variants={textRightVariant(delays.headerImg)}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        </motion.div>

        {/* Inputs and form content */}
        <motion.form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <motion.div variants={buttonVariant(delays.email)} initial="hidden" animate="visible" exit="hidden">
              <Input
                type="text"
                value={formData.emailOrPhone}
                onChange={e => setFormData({...formData, emailOrPhone: e.target.value})}
                placeholder="Email or Phone"
              />
            </motion.div>
            <motion.div variants={buttonVariant(delays.password)} initial="hidden" animate="visible" exit="hidden">
              <Input
                type="password"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="Password"
                showToggleEye={true}
                showPassword={showPassword}
                onToggleShowPassword={() => setShowPassword(!showPassword)}
              />
            </motion.div>
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

          <motion.button
            type="submit"
            whileTap={whileTap}
            whileHover={whileHover}
            variants={buttonVariant(delays.signIn)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-[257px] h-[40px] text-[14px] font-bold text-black bg-gradient-to-r from-gradient-1-from to-gradient-1-to bg-[length:200%_200%] ease-in-out cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] mt-[35px]"
          >
            SIGN IN
          </motion.button>
        </motion.form>

        {isLogin && (
          <>
            {/* Divider with OR */}
            <motion.div className="w-[257px] flex items-center justify-center gap-1 mt-4">
              <motion.div 
                className="flex-1 h-[1.6px] bg-black rounded-full" 
                variants={dividerLeftVariant(delays.dividerLeft)} 
                initial="hidden" 
                animate="visible" 
                exit="hidden"
              />
              <motion.div 
                className="text-[14px] relative top-[-2px]" 
                variants={dividerOrVariant(delays.dividerOr)} 
                initial="hidden" 
                animate="visible" 
                exit="hidden"
              >
                or
              </motion.div>
              <motion.div 
                className="flex-1 h-[1.6px] bg-black rounded-full" 
                variants={dividerRightVariant(delays.dividerRight)} 
                initial="hidden" 
                animate="visible" 
                exit="hidden"
              />
            </motion.div>

            {/* Social login buttons */}
            <div className="mt-5 flex flex-col gap-2.5 w-[257px]">
              <motion.button
                type="button"
                whileTap={whileTap}
                whileHover={whileHover}
                variants={buttonVariant(delays.google)}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full h-[40px] text-[16px] font-normal bg-secondary cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] flex items-center gap-[8px] pl-[17.5%] hover:scale-[1.02]"
              >
                <img src="/google_logo.png" alt="google" className="w-[21px] h-[21px]" />
                <span>login with Google</span>
              </motion.button>
              <motion.button
                type="button"
                whileTap={whileTap}
                whileHover={whileHover}
                variants={buttonVariant(delays.facebook)}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full h-[40px] text-[16px] font-normal bg-secondary cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] flex items-center gap-[8px] pl-[17.5%] hover:scale-[1.02]"
              >
                <img src="/facebook_logo.png" alt="facebook" className="w-[21px] h-[21px]" />
                <span>login with Facebook</span>
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const registerForm = (
    <AnimatePresence mode="wait">
      <motion.div
        key="register"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <motion.div className="relative max-lg:flex max-lg:justify-center">
          <motion.h1
            className="text-[22px] font-bold w-fit mb-[35px] z-[20] pl-[6px] relative max-lg:right-[0.1rem]"
            variants={textLeftVariant(delays.loginForm)}
            initial="hidden"
            animate="visible"
          >
            REGISTER FORM
          </motion.h1>
          <motion.img
            src={breakPoint !== "desktop" ? headerTextElementTablet : headerTextElement}
            alt=""
            className="absolute top-[22px] w-[155px] max-lg:scale-[1.2] lg:w-[12rem]"
            variants={textRightVariant(delays.headerImg)}
            initial="hidden"
            animate="visible"
          />
        </motion.div>

        {/* Inputs and form content */}
        <motion.form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <motion.div variants={buttonVariant(delays.email)} initial="hidden" animate="visible">
              <Input
                type="text"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="Email Address"
              />
            </motion.div>
            <motion.div variants={buttonVariant(delays.password)} initial="hidden" animate="visible">
              <Input
                type="password"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="Password"
                showToggleEye={true}
                showPassword={showPassword}
                onToggleShowPassword={() => setShowPassword(!showPassword)}
              />
            </motion.div>
            <motion.div variants={buttonVariant(delays.password)} initial="hidden" animate="visible">
              <Input
                type="password"
                value={formData.repeatPassword}
                onChange={e => setFormData({...formData, repeatPassword: e.target.value})}
                placeholder="Repeat password"
                showToggleEye={true}
                showPassword={showPassword}
                onToggleShowPassword={() => setShowPassword(!showPassword)}
              />
            </motion.div>
            <div className="flex gap-[10px]">
              <motion.div variants={buttonVariant(delays.email)} initial="hidden" animate="visible">
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                  placeholder="First Name"
                  smalInput={true}
                />
              </motion.div>
              <motion.div variants={buttonVariant(delays.email)} initial="hidden" animate="visible">
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Last Name"
                  smalInput={true}
                />
              </motion.div>
            </div>
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

          <motion.button
            type="submit"
            whileTap={whileTap}
            whileHover={whileHover}
            variants={buttonVariant(delays.signIn)}
            initial="hidden"
            animate="visible"
            className="w-[257px] h-[40px] text-[14px] font-bold text-black bg-gradient-to-r from-gradient-1-from to-gradient-1-to bg-[length:200%_200%] ease-in-out cursor-pointer shadow-[2px_4px_0px_rgba(0,0,0,0.25)] mt-[35px]"
          >
            SIGN UP
          </motion.button>
        </motion.form>

      </motion.div>
    </AnimatePresence>
  );

  return (
    <AnimatePresence mode="wait">
      {isLogin ? loginForm : registerForm}
    </AnimatePresence>
  );
}

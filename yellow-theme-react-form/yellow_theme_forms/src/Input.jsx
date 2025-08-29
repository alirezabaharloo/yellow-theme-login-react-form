import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import eyeOn from '../public/eye_on.png';
import eyeOff from '../public/eye_off.png';

export default function Input({ value, onChange, type = 'text', placeholder = '', smalInput, showToggleEye = false, showPassword = false, onToggleShowPassword, error }) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const inputType = showToggleEye ? (showPassword ? 'text' : 'password') : type;

  const scaleStyle = {
    transform: isFocused ? 'scale(1.03)' : 'scale(1)',
    transition: 'all 300ms',
  };

  const borderStyle = error
    ? { border: '2px solid #e53935' } // red
    : { border: '1px solid var(--primary-3, #ccc)' };

  const inputElement = (
    <div className={`relative flex flex-col items-start w-fit ${error ? 'mb-1' : ''}`}>
      {
        showToggleEye ? (
          <div className='relative'>
            <input
              ref={inputRef}
              type={inputType}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`bg-primary-2 pr-[35px] h-[40px] px-2 text-[14px] font-normal placeholder:text-black/50 focus:outline-none`}
              style={{
                width: smalInput ? '125px' : '260px',
                boxShadow: '2px 4px 0px rgba(0, 0, 0, 0.25)',
                ...scaleStyle,
                ...borderStyle,
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <img
              src={showPassword ? eyeOff : eyeOn}
              alt="toggle eye"
              className={`cursor-pointer absolute top-[35%] right-[3%] transition-all duration-300 ${isFocused ? 'scale-[1.03] right-[2%]' : 'scale-100'}`}
              onMouseDown={e => {
                e.preventDefault();
                if (inputRef.current) inputRef.current.focus();
              }}
              onClick={onToggleShowPassword}
            />
          </div> ) : 
          (
            <input
            ref={inputRef}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`bg-primary-2 h-[40px] px-2 text-[14px] font-normal placeholder:text-black/50 focus:outline-none`}
            style={{
              width: smalInput ? '125px' : '260px',
              boxShadow: '2px 4px 0px rgba(0, 0, 0, 0.25)',
              ...scaleStyle,
              ...borderStyle,
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          )
      }

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ x:3 ,y: -10,  opacity: 0 }}
            animate={{ x:3 ,y: 0,  opacity: 1 }} 
            exit={{ x:3 ,y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              color: '#e53935',
              fontSize: '12px',
              marginTop: '2px',
              minHeight: '18px',
              alignSelf: 'flex-start',
              position: 'relative',
              left: 0,
              width: '250px'
            }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return inputElement;
}

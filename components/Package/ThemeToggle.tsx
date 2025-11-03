import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sun, Moon } from 'phosphor-react';
import { useDesignSystem } from '../../App';
import StateLayer from '../Core/StateLayer';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme, tokens, themeTokens } = useDesignSystem();
    const isDark = theme === 'dark';
    const ref = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
    const rotateX = useSpring(useTransform(y, [-28, 28], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(x, [-28, 28], [-10, 10]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const baseStyle: React.CSSProperties = {
        position: 'relative',
        width: '3.5rem',
        height: '3.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: tokens.radius.l,
        transition: `all ${tokens.motion.duration[300]} ${tokens.motion.ease.inOut}`,
        border: `1px solid ${themeTokens.Color.Base.Border[2]}`,
        backgroundColor: themeTokens.Color.Base.Surface[3],
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        overflow: 'hidden',
        userSelect: 'none',
    };
    
    const focusStyle: React.CSSProperties = {
        boxShadow: `0 0 0 2px ${themeTokens.Color.Base.Surface[1]}, 0 0 0 4px ${themeTokens.Color.Base.Content[3]}`,
    };

    return (
        <motion.button
            ref={ref}
            onClick={toggleTheme}
            style={{ ...baseStyle, ...(isFocused && focusStyle), rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Toggle theme"
        >
            <StateLayer 
                isHovered={isHovered}
                isFocused={isFocused}
                isClicked={isClicked}
                color={themeTokens.Color.Base.Content[1]}
                opacityRange={{ hover: 0.08, focus: 0.1, click: 0.12 }}
                borderRadius={tokens.radius.l}
            />
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute', transform: "translateZ(20px)", display: 'flex' }}
                >
                    {isDark ? (
                        <Sun size={26} weight="bold" color={themeTokens.Color.Base.Content[3]} />
                    ) : (
                        <Moon size={26} weight="bold" color={themeTokens.Color.Base.Content[2]} />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

export default ThemeToggle;
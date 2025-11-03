import React from 'react';
import { motion } from 'framer-motion';
import { useDesignSystem } from '../../App';

interface StateLayerProps {
    isHovered: boolean;
    isFocused: boolean;
    isClicked: boolean;
    color: string;
    opacityRange: {
        hover: number;
        focus: number;
        click: number;
    };
    borderRadius?: string;
}

const StateLayer: React.FC<StateLayerProps> = ({ isHovered, isFocused, isClicked, color, opacityRange, borderRadius }) => {
    const { tokens } = useDesignSystem();
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const opacity = isClicked ? opacityRange.click : isFocused ? opacityRange.focus : isHovered ? opacityRange.hover : 0;

    const style: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: borderRadius || tokens.radius.l,
        overflow: 'hidden',
        pointerEvents: 'none',
    };
    
    const layerStyle: React.CSSProperties = {
        position: 'absolute',
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(-50%, -50%)',
        backgroundColor: color,
        borderRadius: '50%',
    };

    return (
        <div style={style} onMouseMove={handleMouseMove}>
            <motion.div
                style={layerStyle}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{
                    width: isHovered || isFocused || isClicked ? '250%' : 0,
                    height: isHovered || isFocused || isClicked ? '250%' : 0,
                    opacity,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 40,
                    mass: 1,
                }}
            />
        </div>
    );
};

export default StateLayer;

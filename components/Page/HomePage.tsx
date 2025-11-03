import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Briefcase, Wrench, Crown } from 'phosphor-react';
import { useDesignSystem } from '../../App';
import useMediaQuery from '../../hooks/useMediaQuery';
import ThemeToggle from '../Package/ThemeToggle';
import StateLayer from '../Core/StateLayer';

const SECTIONS = [
    { icon: Briefcase, type: 'Primary' as const, title: "Active Income", subtitle: "Worker", description: "Your journey starts here. You trade your finite time and skills directly for money.", examples: "Freelancing, salaried jobs, client projects." },
    { icon: Wrench, type: 'Secondary' as const, title: "Hybrid Income", subtitle: "Builder", description: "The transition phase. You leverage previous work into assets that begin to earn for you.", examples: "Design templates, web apps, info products." },
    { icon: Crown, type: 'Tertiary' as const, title: "Passive Income", subtitle: "Director", description: "The destination. You create and oversee systems that generate income while you rest.", examples: "Creative studios, software royalties, automated businesses." }
];

const SectionCard: React.FC<typeof SECTIONS[0]> = ({ icon: Icon, type, title, subtitle, description, examples }) => {
    const { themeTokens, tokens } = useDesignSystem();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
    const rotateX = useSpring(useTransform(y, [-150, 150], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(x, [-150, 150], [-15, 15]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isMobile) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        if (isMobile) return;
        x.set(0);
        y.set(0);
    };
    
    const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'start 0.75'] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
    const animatedY = useTransform(scrollYProgress, [0, 1], [50, 0]);

    const cardStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '32rem',
        padding: isMobile ? tokens.space.m : tokens.space.l,
        borderRadius: tokens.radius.l,
        border: `1px solid ${themeTokens.Color.Base.Border[1]}`,
        backgroundColor: themeTokens.Color.Base.Surface[3],
        backdropFilter: 'blur(16px)',
        position: 'relative',
        boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`,
        transition: `border-color ${tokens.motion.duration[300]}`,
    };

    const glowColor = themeTokens.Color[type].Glow;
    const iconColor = themeTokens.Color[type].Icon;

    return (
        <motion.div
            ref={cardRef}
            style={{ y: animatedY, opacity, scale, rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY, transformStyle: "preserve-3d", ...cardStyle }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ borderColor: themeTokens.Color.Base.Border[2] }}
        >
            <div style={{ transform: "translateZ(50px)", display: 'flex', alignItems: 'center', marginBottom: tokens.space.s }}>
                <motion.div style={{ padding: tokens.space.xs, borderRadius: tokens.radius.m, marginRight: tokens.space.s, display: 'flex' }}
                    animate={{ filter: [`drop-shadow(0 0 8px rgba(${glowColor}, 0.5))`, `drop-shadow(0 0 16px rgba(${glowColor}, 0.7))`, `drop-shadow(0 0 8px rgba(${glowColor}, 0.5))`] }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                >
                    <Icon size={28} weight="duotone" color={iconColor} />
                </motion.div>
                <div>
                    <h2 style={{ ...tokens.typography.headingM, color: themeTokens.Color.Base.Content[1], margin: 0 }}>{title}</h2>
                    <p style={{ ...tokens.typography.labelM, color: themeTokens.Color.Base.Content[2], margin: 0 }}>{subtitle}</p>
                </div>
            </div>
            <p style={{ transform: "translateZ(40px)", ...tokens.typography.bodyS, marginBottom: tokens.space.s, color: themeTokens.Color.Base.Content[2] }}>
                {description}
            </p>
            <div style={{ transform: "translateZ(30px)", padding: tokens.space.s, borderRadius: tokens.radius.m, ...tokens.typography.labelS, backgroundColor: themeTokens.theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)', color: themeTokens.Color.Base.Content[3] }}>
                <strong style={{color: themeTokens.Color.Base.Content[2]}}>E.g.,</strong> {examples}
            </div>
        </motion.div>
    );
};

const HomePage: React.FC = () => {
    const { themeTokens, tokens } = useDesignSystem();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const contentRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: contentRef, offset: ['start start', 'end end'] });
    const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const [isButtonHovered, setIsButtonHovered] = React.useState(false);
    const [isButtonClicked, setIsButtonClicked] = React.useState(false);

    const scrollToContent = () => {
        document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
    };

    const heroContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
    const heroChildVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } } };
    
    const quote = `"Don't just work for money, make money work for you."`;
    const characters = Array.from(quote);
    const quoteContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.025,
                delayChildren: 0.3,
            },
        },
    };
    const charVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: 'spring', stiffness: 100, damping: 12 }
        },
    };
    const authorVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                delay: characters.length * 0.025 + 0.5,
            },
        },
    };


    const buttonStyle: React.CSSProperties = {
        ...tokens.typography.bodyM,
        fontWeight: 700,
        padding: `${tokens.space.xs} ${tokens.space.l}`,
        borderRadius: tokens.radius.full,
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: themeTokens.Color.Base.Content[1],
        color: themeTokens.Color.Base.Surface[1],
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
        overflow: 'hidden',
        userSelect: 'none',
    };
    
    return (
        <div style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: tokens.space.s, display: 'flex', justifyContent: 'flex-end', zIndex: 50 }}>
                <ThemeToggle />
            </header>
            
            <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: isMobile ? tokens.space.l : `0 ${tokens.space.xl}` }}>
                <motion.div 
                    variants={heroContainerVariants} 
                    initial="hidden" 
                    animate="visible" 
                    style={{ 
                        maxWidth: '48rem', 
                        paddingLeft: isMobile ? 0 : '10%', 
                        margin: isMobile ? '0 auto' : '0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'center' : 'flex-start',
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    <motion.h1 variants={heroChildVariants} style={{...(isMobile ? tokens.typography.displayM : tokens.typography.displayL), color: themeTokens.Color.Base.Content[1], margin: 0 }}>
                        The Path <br /> to Freedom
                    </motion.h1>
                    <motion.p variants={heroChildVariants} style={{ ...(isMobile ? tokens.typography.bodyM : tokens.typography.bodyL), maxWidth: '36rem', color: themeTokens.Color.Base.Content[2], margin: 0, marginTop: tokens.space.xs }}>
                        Transition through stages to reclaim your time and build lasting value.
                    </motion.p>
                    <motion.div variants={heroChildVariants} style={{ marginTop: tokens.space.xl }}>
                        <motion.button 
                            onClick={scrollToContent} 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            style={buttonStyle}
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                            onMouseDown={() => setIsButtonClicked(true)}
                            onMouseUp={() => setIsButtonClicked(false)}
                        >
                            Explore the Path
                             <StateLayer 
                                isHovered={isButtonHovered}
                                isFocused={false}
                                isClicked={isButtonClicked}
                                color={themeTokens.Color.Base.Surface[1]}
                                opacityRange={{ hover: 0.1, focus: 0, click: 0.15 }}
                                borderRadius={tokens.radius.full}
                            />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </section>
            
            <main id="main-content" ref={contentRef} style={{ padding: `${tokens.space['3xl']} ${tokens.space.s}`, position: 'relative' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '80rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '2px', height: '100%', background: `linear-gradient(to bottom, transparent, ${themeTokens.Color.Base.Border[2]}, transparent)` }}>
                        <motion.div style={{ height: timelineHeight, width: '100%', backgroundColor: themeTokens.Color.Base.Content[1], boxShadow: themeTokens.theme === 'dark' ? `0 0 8px ${themeTokens.Color.Base.Content[1]}, 0 0 12px ${themeTokens.Color.Base.Content[1]}` : 'none' }} />
                    </div>

                    {SECTIONS.map((section, index) => (
                        <div key={index} style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: isMobile ? `${tokens.space.xl} 0` : `${tokens.space['2xl']} 0`, zIndex: 10, position: 'relative', perspective: "1000px" }}>
                             <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 'all' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1.5rem', height: '1.5rem', borderRadius: tokens.radius.full, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${themeTokens.Color.Base.Border[2]}`, backgroundColor: themeTokens.Color.Base.Surface[2] }}>
                                <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: tokens.radius.full, backgroundColor: themeTokens.Color.Base.Content[3] }} />
                            </motion.div>
                            <SectionCard {...section} />
                        </div>
                    ))}
                </div>
            </main>
            
            <footer style={{ minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: isMobile ? tokens.space.m : tokens.space.l, boxSizing: 'border-box' }}>
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.8 }} 
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.space.l }}
                >
                    <motion.p
                        variants={quoteContainerVariants}
                        style={{ 
                            textAlign: 'center', 
                            maxWidth: '64rem', 
                            ...(isMobile ? tokens.typography.handwritingM : tokens.typography.handwritingL), 
                            color: themeTokens.Color.Base.Content[2],
                            margin: 0,
                        }}
                    >
                        {characters.map((char, index) => (
                            <motion.span key={index} variants={charVariants}>
                                {char}
                            </motion.span>
                        ))}
                    </motion.p>
                    <motion.p 
                        variants={authorVariants} 
                        style={{...tokens.typography.bodyM, color: themeTokens.Color.Base.Content[3], margin: 0}}
                    >
                        — Shifat Masud
                    </motion.p>
                </motion.div>
            </footer>
        </div>
    );
};

export default HomePage;
import React from 'react';
import { usePost } from '../../context/PostContext';
import ModernMinimal from './ModernMinimal';
import BoldContrast from './BoldContrast';
import SoftGradient from './SoftGradient';
import TechNeon from './TechNeon';
import Editorial from './Editorial';
import LuxeGold from './LuxeGold';
import NoirElegant from './NoirElegant';
import PastelDream from './PastelDream';
import CyberGlitch from './CyberGlitch';
import VintagePaper from './VintagePaper';
import GlassmorphismPro from './GlassmorphismPro';
import SwissGrid from './SwissGrid';
import NatureOrganic from './NatureOrganic';
import NeonNight from './NeonNight';
import MagazineCover from './MagazineCover';

const ThemeRenderer = ({ overrideData = null, overrideConfig = null, overrideTheme = null }) => {
    const { theme, activePage, config } = usePost();

    // Use overrides if provided, otherwise context
    const currentTheme = overrideTheme || theme;
    const currentData = overrideData || activePage;
    const currentConfig = overrideConfig || config;

    const props = {
        data: currentData,
        config: currentConfig
    };

    // Switch on currentTheme instead of context theme
    switch (currentTheme) {
        case 'modern-minimal':
            return <ModernMinimal {...props} />;
        case 'bold-contrast':
            return <BoldContrast {...props} />;
        case 'soft-gradient':
            return <SoftGradient {...props} />;
        case 'tech-neon':
            return <TechNeon {...props} />;
        case 'editorial':
            return <Editorial {...props} />;
        case 'luxe-gold':
            return <LuxeGold {...props} />;
        case 'noir-elegant':
            return <NoirElegant {...props} />;
        case 'pastel-dream':
            return <PastelDream {...props} />;
        case 'cyber-glitch':
            return <CyberGlitch {...props} />;
        case 'vintage-paper':
            return <VintagePaper {...props} />;
        case 'glassmorphism-pro':
            return <GlassmorphismPro {...props} />;
        case 'swiss-grid':
            return <SwissGrid {...props} />;
        case 'nature-organic':
            return <NatureOrganic {...props} />;
        case 'neon-night':
            return <NeonNight {...props} />;
        case 'magazine-cover':
            return <MagazineCover {...props} />;
        default:
            return <ModernMinimal {...props} />;
    }
};

export default ThemeRenderer;

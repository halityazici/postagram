import React from 'react';
import './TechNeon.css';

const TechNeon = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: data.fontConfig.title.lineHeight,
        color: '#fff',
        textShadow: '0 0 5px #00f3ff, 0 0 10px #00f3ff',
        textTransform: 'uppercase',
        letterSpacing: '2px',
    };

    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#e2e8f0',
    };

    return (
        <div className="theme-tech-neon">
            <div className="tn-overlay"></div>
            <div className="tn-frame">
                <div className="tn-top-bar">
                    <span className="tn-status">SYSTEM_READY</span>
                    {config.showLogo && config.logo && (
                        <img src={config.logo} alt="Logo" className="tn-logo-img" />
                    )}
                </div>

                <div className="tn-content">
                    <h1 style={titleStyle}>{data.title}</h1>

                    {data.image && (
                        <div className="tn-cyber-image">
                            <img src={data.image} alt="Post" />
                            <div className="tn-scanline"></div>
                        </div>
                    )}

                    <p style={bodyStyle}>{`>> ${data.content}`}</p>
                </div>

                <div className="tn-footer">
                    <div className="tn-bar"></div>
                </div>
            </div>
        </div>
    );
};

export default TechNeon;

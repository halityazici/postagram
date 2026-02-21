import React from 'react';
import './GlassmorphismPro.css';

const GlassmorphismPro = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: data.fontConfig.title.lineHeight,
        color: '#fff',
        fontWeight: 600,
        textShadow: '0 2px 10px rgba(0,0,0,0.1)',
    };
    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: 'rgba(255,255,255,0.9)',
    };

    return (
        <div className="theme-glass-pro">
            <div className="gp-circle c1"></div>
            <div className="gp-circle c2"></div>
            <div className="gp-circle c3"></div>

            <div className="gp-card">
                <div className="gp-top">
                    {config.showLogo && config.logo && (
                        <img src={config.logo} alt="logo" className="gp-logo" />
                    )}
                    <div className="gp-dot"></div>
                </div>

                <div className="gp-content">
                    <h1 style={titleStyle}>{data.title}</h1>
                    {data.image && (
                        <div className="gp-image-box">
                            <img src={data.image} alt="content" />
                        </div>
                    )}
                    <p style={bodyStyle}>{data.content}</p>
                </div>
            </div>
        </div>
    );
};
export default GlassmorphismPro;

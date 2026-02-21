import React from 'react';
import './CyberGlitch.css';

const CyberGlitch = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: 1,
        color: '#0f0',
        textShadow: '2px 0 #f0f, -2px 0 #0ff',
        textTransform: 'uppercase',
        letterSpacing: '2px',
    };
    const bodyStyle = {
        fontFamily: 'monospace',
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#ccc',
        borderLeft: '2px solid #0f0',
        paddingLeft: '15px',
    };

    return (
        <div className="theme-cyber-glitch">
            <div className="cg-bg"></div>
            <div className="cg-content-box">
                {config.showLogo && config.logo && (
                    <div className="cg-logo-wrap"><img src={config.logo} alt="logo" className="cg-logo" /></div>
                )}
                <h1 className="glitch" data-text={data.title} style={titleStyle}>{data.title}</h1>

                {data.image && (
                    <div className="cg-image-container">
                        <img src={data.image} alt="cyber" />
                        <div className="cg-scanlines"></div>
                    </div>
                )}

                <div className="cg-text-body">
                    <p style={bodyStyle}>{data.content}</p>
                </div>
            </div>
        </div>
    );
};
export default CyberGlitch;

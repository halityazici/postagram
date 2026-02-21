import React from 'react';
import './NeonNight.css';

const NeonNight = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: 1.1,
        color: '#fff',
        textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff',
        textTransform: 'uppercase',
        fontStyle: 'italic',
    };
    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#e0e0ff',
        textShadow: '0 0 5px #00ffff',
    };

    return (
        <div className="theme-neon-night">
            <div className="nn-grid-floor"></div>
            <div className="nn-sun"></div>

            <div className="nn-content">
                <div className="nn-top-bar">
                    {config.showLogo && config.logo && <img src={config.logo} alt="logo" className="nn-logo" />}
                    <div className="nn-record-dot">REC</div>
                </div>

                <div className="nn-main">
                    <h1 style={titleStyle}>{data.title}</h1>
                    {data.image && (
                        <div className="nn-tv-frame">
                            <img src={data.image} alt="retro" />
                            <div className="nn-scanline"></div>
                        </div>
                    )}
                    <p style={bodyStyle}>{data.content}</p>
                </div>
            </div>
        </div>
    );
};
export default NeonNight;

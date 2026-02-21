import React from 'react';
import './VintagePaper.css';

const VintagePaper = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: data.fontConfig.title.lineHeight,
        color: '#3e3e3e',
        textAlign: 'center',
        marginBottom: '20px',
    };
    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: 1.6,
        color: '#555',
        textAlign: 'justify',
    };

    return (
        <div className="theme-vintage-paper">
            <div className="vp-texture"></div>
            <div className="vp-paper">
                {config.showLogo && config.logo && (
                    <div className="vp-stamp"><img src={config.logo} alt="logo" /></div>
                )}

                <div className="vp-date">NO. 001 — {new Date().getFullYear()}</div>

                <div className="vp-content">
                    <h1 style={titleStyle}>{data.title}</h1>

                    {data.image && (
                        <div className="vp-polaroid">
                            <img src={data.image} alt="memories" />
                        </div>
                    )}

                    <p style={bodyStyle}>{data.content}</p>
                </div>
            </div>
        </div>
    );
};
export default VintagePaper;

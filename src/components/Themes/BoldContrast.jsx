import React from 'react';
import './BoldContrast.css';

const BoldContrast = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: 0.9,
        color: '#000',
        textTransform: 'uppercase',
        fontWeight: 800,
        letterSpacing: '-0.04em',
    };

    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#000',
        fontWeight: 500,
    };

    return (
        <div className="theme-bold-contrast">
            <div className="bc-grid">
                <div className="bc-header">
                    {config.showLogo && config.logo && (
                        <img src={config.logo} alt="Logo" className="bc-logo-img" />
                    )}
                    <div className="bc-date">2026</div>
                </div>

                <div className="bc-title-area">
                    <h1 style={titleStyle}>{data.title}</h1>
                </div>

                <div className="bc-content-area">
                    <div className="bc-separator"></div>
                    <p style={bodyStyle}>{data.content}</p>
                </div>

                <div className="bc-image-area">
                    {data.image && <img src={data.image} alt="Post" />}
                </div>
            </div>
        </div>
    );
};

export default BoldContrast;

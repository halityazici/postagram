import React from 'react';
import './MagazineCover.css';

const MagazineCover = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `clamp(40px, ${data.fontConfig.title.size}px, 120px)`, // Clamp size
        lineHeight: 0.85,
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 900,
        letterSpacing: '-2px',
    };
    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#fff',
        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
    };

    return (
        <div className="theme-magazine-cover">
            {data.image && (
                <div className="mc-image-bg">
                    <img src={data.image} alt="cover" />
                    <div className="mc-gradient-overlay"></div>
                </div>
            )}

            <div className="mc-layout">
                <div className="mc-masthead">
                    {config.showLogo && config.logo ? (
                        <img src={config.logo} alt="logo" className="mc-logo" />
                    ) : (
                        <span className="mc-brand">POSTAGRAM</span>
                    )}
                    <div className="mc-issue-date">ISSUE 05 • {new Date().getFullYear()}</div>
                </div>

                <div className="mc-main-story">
                    <h1 style={titleStyle}>{data.title}</h1>
                    <div className="mc-divider"></div>
                    <p style={bodyStyle}>{data.content}</p>
                </div>
            </div>
        </div>
    );
};
export default MagazineCover;

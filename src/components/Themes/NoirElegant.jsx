import React from 'react';
import './NoirElegant.css';

const NoirElegant = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: 1.2,
        letterSpacing: '0.05em',
        color: '#fff',
        textTransform: 'uppercase',
    };
    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#ddd',
    };

    return (
        <div className="theme-noir-elegant">
            <div className="ne-container">
                {config.showLogo && config.logo && (
                    <div className="ne-logo-wrap"><img src={config.logo} className="ne-logo" alt="logo" /></div>
                )}
                <div className="ne-grid">
                    <div className="ne-text">
                        <h1 style={titleStyle}>{data.title}</h1>
                        <p style={bodyStyle}>{data.content}</p>
                    </div>
                    {data.image && (
                        <div className="ne-image">
                            <img src={data.image} alt="post" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default NoirElegant;

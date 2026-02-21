import React from 'react';
import './LuxeGold.css';

const LuxeGold = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: data.fontConfig.title.lineHeight,
        color: '#d4af37', // Gold
    };

    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#f8f8f8',
    };

    return (
        <div className="theme-luxe-gold">
            <div className="lg-border">
                <div className="lg-header">
                    {config.showLogo && config.logo && <img src={config.logo} alt="Logo" className="lg-logo" />}
                </div>
                <div className="lg-content">
                    <h1 style={titleStyle}>{data.title}</h1>
                    <div className="lg-line"></div>
                    {data.image && <div className="lg-image"><img src={data.image} alt="" /></div>}
                    <p style={bodyStyle}>{data.content}</p>
                </div>
            </div>
        </div>
    );
};
export default LuxeGold;

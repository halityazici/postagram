import React from 'react';
import './PastelDream.css';

const PastelDream = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: data.fontConfig.title.lineHeight,
        color: '#333',
        fontWeight: 700,
        textShadow: '2px 2px 0px #fff',
    };
    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#555',
    };

    return (
        <div className="theme-pastel-dream">
            <div className="pd-card">
                <div className="pd-header">
                    {config.showLogo && config.logo && <img src={config.logo} alt="logo" className="pd-logo" />}
                </div>
                {data.image && (
                    <div className="pd-image-wrap">
                        <img src={data.image} alt="content" />
                    </div>
                )}
                <div className="pd-content">
                    <h1 style={titleStyle}>{data.title}</h1>
                    <p style={bodyStyle}>{data.content}</p>
                </div>
                <div className="pd-deco-circle"></div>
            </div>
        </div>
    );
};
export default PastelDream;

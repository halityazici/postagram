import React from 'react';
import './NatureOrganic.css';

const NatureOrganic = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: data.fontConfig.title.lineHeight,
        color: '#2d3e2d',
        fontStyle: 'italic',
    };
    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#4a5d4a',
    };

    return (
        <div className="theme-nature-organic">
            <div className="no-leaf-bg"></div>
            <div className="no-frame">
                <div className="no-header">
                    {config.showLogo && config.logo && (
                        <img src={config.logo} alt="logo" className="no-logo" />
                    )}
                </div>

                <div className="no-image-mask">
                    {data.image && <img src={data.image} alt="nature" />}
                </div>

                <div className="no-text-content">
                    <h1 style={titleStyle}>{data.title}</h1>
                    <div className="no-divider"></div>
                    <p style={bodyStyle}>{data.content}</p>
                </div>
            </div>
        </div>
    );
};
export default NatureOrganic;

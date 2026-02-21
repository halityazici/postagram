import React from 'react';
import './Editorial.css';

const Editorial = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: 1.1,
        color: '#1a1a1a',
        fontStyle: 'normal',
        fontWeight: 400,
    };

    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#333',
        textAlign: 'left',
    };

    return (
        <div className="theme-editorial">
            <div className="ed-layout">
                <div className="ed-header-row">
                    <div className="ed-meta">
                        <span>VOL. 01</span>
                        <span>•</span>
                        <span>{new Date().getFullYear()}</span>
                    </div>
                    {config.showLogo && config.logo && (
                        <img src={config.logo} alt="Logo" className="ed-logo-img" />
                    )}
                </div>

                <div className="ed-hero">
                    {data.image && (
                        <div className="ed-image-wrap">
                            <img src={data.image} alt="Post" />
                        </div>
                    )}
                    <div className="ed-title-overlay">
                        <h1 style={titleStyle}>{data.title}</h1>
                    </div>
                </div>

                <div className="ed-body-col">
                    <div className="ed-cap-line"></div>
                    <p style={bodyStyle}>
                        {data.content && data.content.length > 0 && (
                            <span className="ed-drop-cap">{data.content.charAt(0)}</span>
                        )}
                        {data.content ? data.content.slice(1) : ''}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Editorial;

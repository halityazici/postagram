import React from 'react';
import './ModernMinimal.css';

const ModernMinimal = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: data.fontConfig.title.lineHeight,
        color: '#111',
        letterSpacing: '-0.02em',
    };

    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#444',
        fontWeight: 300,
    };

    return (
        <div className="theme-modern-minimal">
            <div className="mm-border-frame">
                <div className="mm-content-wrapper">
                    <div className="mm-header">
                        {config.showLogo && config.logo && (
                            <div className="mm-logo">
                                <img src={config.logo} alt="Logo" />
                            </div>
                        )}
                        <div className="mm-dots">•••</div>
                    </div>

                    {data.image && (
                        <div className="mm-image-container">
                            <img src={data.image} alt="Post" />
                        </div>
                    )}

                    <div className="mm-text-content">
                        <h1 style={titleStyle}>{data.title}</h1>
                        <div className="mm-divider"></div>
                        <p style={bodyStyle}>{data.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernMinimal;

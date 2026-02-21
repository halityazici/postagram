import React from 'react';
import './SoftGradient.css';

const SoftGradient = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: data.fontConfig.title.lineHeight,
        color: '#333',
        fontWeight: 700,
        background: 'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#555',
    };

    return (
        <div className="theme-soft-gradient">
            <div className="sg-blob sg-blob-1"></div>
            <div className="sg-blob sg-blob-2"></div>

            <div className="sg-card">
                {data.image && (
                    <div className="sg-image-wrapper">
                        <img src={data.image} alt="Post" />
                    </div>
                )}

                <div className="sg-content">
                    <div className="sg-header">
                        {config.showLogo && config.logo && (
                            <img src={config.logo} alt="Logo" className="sg-logo-img" />
                        )}
                    </div>

                    <h1 style={titleStyle}>{data.title}</h1>
                    <p style={bodyStyle}>{data.content}</p>
                </div>
            </div>
        </div>
    );
};

export default SoftGradient;

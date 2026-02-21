import React from 'react';
import './SwissGrid.css';

const SwissGrid = ({ data, config }) => {
    const titleStyle = {
        fontFamily: data.fontConfig.title.family,
        fontSize: `${data.fontConfig.title.size}px`,
        lineHeight: 0.9,
        fontWeight: 900,
        textTransform: 'uppercase',
        color: '#000',
    };
    const bodyStyle = {
        fontFamily: data.fontConfig.body.family,
        fontSize: `${data.fontConfig.body.size}px`,
        lineHeight: data.fontConfig.body.lineHeight,
        color: '#000',
        fontWeight: 500,
    };

    return (
        <div className="theme-swiss-grid">
            <div className="sg-wrapper">
                <div className="sg-header-grid">
                    <div className="sg-cell sg-logo-cell">
                        {config.showLogo && config.logo && <img src={config.logo} alt="logo" />}
                    </div>
                    <div className="sg-cell sg-date-cell">
                        <span>DESIGN 2026</span>
                    </div>
                </div>

                <div className="sg-main-grid">
                    <div className="sg-cell sg-title-cell">
                        <h1 style={titleStyle}>{data.title}</h1>
                    </div>
                    <div className="sg-cell sg-image-cell">
                        {data.image && <img src={data.image} alt="visual" />}
                    </div>
                    <div className="sg-cell sg-body-cell">
                        <div className="sg-icon">+</div>
                        <p style={bodyStyle}>{data.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SwissGrid;

import React from 'react';
import { usePost } from '../../context/PostContext';
import { PLATFORMS, THEMES } from '../../constants';
import './Toolbar.css';

const Toolbar = () => {
    const { platform, format, setFormat, theme, setTheme } = usePost();

    return (
        <div className="toolbar">
            <div className="toolbar-group">
                <span className="label">Format:</span>
                <select
                    value={format.id}
                    onChange={(e) => setFormat(platform.formats.find(f => f.id === e.target.value))}
                    className="toolbar-select"
                >
                    {platform.formats.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                </select>
            </div>

            <div className="toolbar-divider"></div>

            <div className="toolbar-group">
                <span className="label">Theme:</span>
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="toolbar-select"
                >
                    {THEMES.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Toolbar;

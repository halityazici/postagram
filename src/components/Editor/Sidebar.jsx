import React, { useRef, useState } from 'react';
import { usePost } from '../../context/PostContext';
import { PLATFORMS, FONTS } from '../../constants';
import { Type, Image as ImageIcon, Layout } from 'lucide-react';
import ImageCropper from './ImageCropper';
import './Sidebar.css';

const Sidebar = () => {
    const {
        activePage,
        updateActivePage,
        config,
        setConfig,
        platform,
        setPlatform,
        pages,
        addPage,
        removePage,
        activePageId,
        setActivePageId
    } = usePost();

    const fileInputRef = useRef(null);
    const pageImageInputRef = useRef(null);

    // Cropping State
    const [croppingImage, setCroppingImage] = useState(null); // { src, type: 'page' | 'logo' }

    const handleFileSelect = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCroppingImage({ src: reader.result, type });
            };
            reader.readAsDataURL(file);
        }
        // Reset input so same file can be selected again
        e.target.value = '';
    };

    const onCropComplete = (croppedImage) => {
        if (croppingImage.type === 'page') {
            updateActivePage({ image: croppedImage });
        } else if (croppingImage.type === 'logo') {
            setConfig({ ...config, logo: croppedImage });
        }
        setCroppingImage(null);
    };

    const updateFontConfig = (type, key, value) => {
        updateActivePage({
            fontConfig: {
                ...activePage.fontConfig,
                [type]: {
                    ...activePage.fontConfig[type],
                    [key]: value
                }
            }
        });
    };

    if (!activePage) return <div className="sidebar">Loading...</div>;

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <img src="/logo.png" alt="Postagram Logo" className="sidebar-logo-img" />
            </div>
            {croppingImage && (
                <ImageCropper
                    imageSrc={croppingImage.src}
                    onCropComplete={onCropComplete}
                    onCancel={() => setCroppingImage(null)}
                    // Use 1:1 aspect for logo usually, but maybe free form? Let's default to free (undefined) or 1?
                    // User asked for "nice cropping for logo", usually square or circular (but usually square output)
                    // For page image, it depends on the design. Let's allow free aspect for flexibility.
                    aspect={undefined}
                />
            )}

            <div className="sidebar-section">
                <h3><Layout size={18} /> Platform</h3>
                <select
                    value={platform.id}
                    onChange={(e) => setPlatform(Object.values(PLATFORMS).find(p => p.id === e.target.value))}
                    className="sidebar-select"
                >
                    {Object.values(PLATFORMS).map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </div>

            <div className="sidebar-section">
                <h3><Type size={18} /> Content</h3>
                <div className="input-group">
                    <label>Headline</label>
                    <input
                        type="text"
                        value={activePage.title}
                        onChange={(e) => updateActivePage({ title: e.target.value })}
                        className="sidebar-input"
                    />
                </div>
                <div className="input-group">
                    <label>Body Text</label>
                    <textarea
                        value={activePage.content}
                        onChange={(e) => updateActivePage({ content: e.target.value })}
                        className="sidebar-textarea"
                        rows={4}
                    />
                </div>
            </div>

            <div className="sidebar-section">
                <h3><Type size={18} /> Typography (Headline)</h3>
                <div className="row">
                    <select
                        value={activePage.fontConfig.title.family}
                        onChange={(e) => updateFontConfig('title', 'family', e.target.value)}
                        className="sidebar-select"
                    >
                        {FONTS.map(font => (
                            <option key={font.id} value={font.family}>{font.name}</option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Size</label>
                        <input
                            type="number"
                            value={activePage.fontConfig.title.size}
                            onChange={(e) => updateFontConfig('title', 'size', parseInt(e.target.value))}
                            className="sidebar-number"
                        />
                    </div>
                    <div className="col">
                        <label>Line Height</label>
                        <input
                            type="number"
                            step="0.1"
                            value={activePage.fontConfig.title.lineHeight}
                            onChange={(e) => updateFontConfig('title', 'lineHeight', parseFloat(e.target.value))}
                            className="sidebar-number"
                        />
                    </div>
                </div>
            </div>

            <div className="sidebar-section">
                <h3><Type size={18} /> Typography (Body)</h3>
                <div className="row">
                    <select
                        value={activePage.fontConfig.body.family}
                        onChange={(e) => updateFontConfig('body', 'family', e.target.value)}
                        className="sidebar-select"
                    >
                        {FONTS.map(font => (
                            <option key={font.id} value={font.family}>{font.name}</option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Size</label>
                        <input
                            type="number"
                            value={activePage.fontConfig.body.size}
                            onChange={(e) => updateFontConfig('body', 'size', parseInt(e.target.value))}
                            className="sidebar-number"
                        />
                    </div>
                    <div className="col">
                        <label>Line Height</label>
                        <input
                            type="number"
                            step="0.1"
                            value={activePage.fontConfig.body.lineHeight}
                            onChange={(e) => updateFontConfig('body', 'lineHeight', parseFloat(e.target.value))}
                            className="sidebar-number"
                        />
                    </div>
                </div>
            </div>

            <div className="sidebar-section">
                <h3><ImageIcon size={18} /> Images</h3>
                <div className="input-group">
                    <label>Page Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={pageImageInputRef}
                        onChange={(e) => handleFileSelect(e, 'page')}
                    />
                    {activePage.image && (
                        <button className="text-btn" onClick={() => setCroppingImage({ src: activePage.image, type: 'page' })}>
                            Edit / Convert
                        </button>
                    )}
                </div>
                <div className="input-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={config.showLogo}
                            onChange={(e) => setConfig({ ...config, showLogo: e.target.checked })}
                        />
                        <span>Show Logo</span>
                    </label>
                    {config.showLogo && (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => handleFileSelect(e, 'logo')}
                            />
                            {config.logo && (
                                <button className="text-btn" onClick={() => setCroppingImage({ src: config.logo, type: 'logo' })}>
                                    Edit / Convert
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div className="sidebar-section">
                <h3>Pages ({pages.length})</h3>
                <div className="pages-list">
                    {pages.map((p, idx) => (
                        <div
                            key={p.id}
                            className={`page-item ${activePageId === p.id ? 'active' : ''}`}
                            onClick={() => setActivePageId(p.id)}
                        >
                            Page {idx + 1}
                            {pages.length > 1 && (
                                <button
                                    className="delete-page-btn"
                                    onClick={(e) => { e.stopPropagation(); removePage(p.id); }}
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                    <button onClick={addPage} className="add-page-btn">+ Add Page</button>
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;

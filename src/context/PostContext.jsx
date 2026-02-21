import React, { createContext, useContext, useState, useEffect } from 'react';
import { PLATFORMS, THEMES, FONTS } from '../constants';

const PostContext = createContext();

export const usePost = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    const [platform, setPlatform] = useState(PLATFORMS.INSTAGRAM);
    // Default to the first format of the selected platform
    const [format, setFormat] = useState(PLATFORMS.INSTAGRAM.formats[0]);

    const [theme, setTheme] = useState(THEMES[0].id);

    // Pages for carousel/multi-page posts
    const [pages, setPages] = useState([
        {
            id: 1,
            title: 'Your Headline Here',
            content: 'Click to edit this body text. Customize it with different fonts and sizes.',
            image: null, // User uploaded image
            backgroundColor: '#ffffff',
            fontConfig: {
                title: {
                    family: FONTS[0].family,
                    size: 48,
                    lineHeight: 1.2,
                    spacing: 0,
                    color: '#000000',
                    bold: true,
                },
                body: {
                    family: FONTS[0].family,
                    size: 24,
                    lineHeight: 1.5,
                    spacing: 0,
                    color: '#333333',
                }
            }
        }
    ]);

    const [activePageId, setActivePageId] = useState(1);

    const [config, setConfig] = useState({
        logo: null, // URL or base64
        showLogo: true,
        logoSize: 100,
    });

    // Update format when platform changes
    useEffect(() => {
        setFormat(platform.formats[0]);
    }, [platform]);

    const updatePage = (id, updates) => {
        setPages(prev => prev.map(page =>
            page.id === id ? { ...page, ...updates } : page
        ));
    };

    const updateActivePage = (updates) => {
        updatePage(activePageId, updates);
    };

    const addPage = () => {
        const newId = Math.max(...pages.map(p => p.id)) + 1;
        // Clone the style of the last page for consistency
        const lastPage = pages[pages.length - 1];
        setPages([...pages, {
            ...lastPage,
            id: newId,
            title: 'New Page',
            content: 'Add content here'
        }]);
        setActivePageId(newId);
    };

    const removePage = (id) => {
        if (pages.length <= 1) return;
        const newPages = pages.filter(p => p.id !== id);
        setPages(newPages);
        if (activePageId === id) {
            setActivePageId(newPages[newPages.length - 1].id);
        }
    };

    return (
        <PostContext.Provider value={{
            platform, setPlatform,
            format, setFormat,
            theme, setTheme,
            pages, setPages,
            activePageId, setActivePageId,
            activePage: pages.find(p => p.id === activePageId),
            updatePage,
            updateActivePage,
            addPage,
            removePage,
            config, setConfig
        }}>
            {children}
        </PostContext.Provider>
    );
};

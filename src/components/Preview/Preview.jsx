import React, { useRef } from 'react';
import { usePost } from '../../context/PostContext';
import ThemeRenderer from '../Themes/ThemeRenderer';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import './Preview.css';

const Preview = () => {
    const { activePage, format, config, activePageId, pages } = usePost();
    const previewRef = useRef(null);

    /* Download Format State */
    const [downloadFormat, setDownloadFormat] = React.useState('png'); // 'png' or 'jpeg'

    /* Batch Download Logic */
    const exportContainerRef = useRef(null);
    const [isExporting, setIsExporting] = React.useState(false);

    const handleDownload = async (mode = 'single') => {
        // mode: 'single' (active page), 'all' (all pages)

        // If single page and valid ref, normal flow
        if (mode === 'single' && previewRef.current) {
            try {
                await downloadSinglePage(previewRef.current, activePage.id, activePage.backgroundColor);
            } catch (err) {
                console.error('Failed to download image', err);
            }
            return;
        }

        // If 'all', we iterate over pages from context
        if (mode === 'all' && pages) {
            setIsExporting(true);
            // Wait for render of export container
            setTimeout(async () => {
                try {
                    const JSZip = (await import('jszip')).default;
                    const zip = new JSZip();

                    // Process sequentially to avoid browser hanging/memory issues
                    for (let i = 0; i < pages.length; i++) {
                        const page = pages[i];
                        const pageNode = document.getElementById(`export-page-${page.id}`);

                        if (pageNode) {
                            try {
                                const dataUrl = await capturePageDataUrl(pageNode, page.backgroundColor);
                                if (dataUrl) {
                                    const extension = downloadFormat === 'jpeg' ? 'jpg' : 'png';
                                    // Strip the 'data:image/png;base64,' prefix for JSZip
                                    const base64Data = dataUrl.split(',')[1];
                                    zip.file(`postagram-${i + 1}.${extension}`, base64Data, { base64: true });
                                }
                            } catch (err) {
                                console.error(`Failed to capture page ${page.id}`, err);
                            }
                        } else {
                            console.warn(`Node for page ${page.id} not found`);
                        }
                    }

                    // Generate base64 string instead of blob to avoid browser revocation race conditions
                    const base64 = await zip.generateAsync({ type: 'base64' });
                    const dataUrl = 'data:application/zip;base64,' + base64;

                    // Native robust download method for ZIP
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = dataUrl;
                    a.download = 'postagram-design-set.zip';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                } catch (e) {
                    console.error("Batch download failed", e);
                    alert("Batch download failed. Please try again.");
                } finally {
                    setIsExporting(false);
                }
            }, 500); // Increased delay to ensure DOM paint
        }
    };

    const capturePageDataUrl = async (node, bgColor) => {
        const options = {
            useCors: true,
            pixelRatio: 2,
            width: format.width,
            height: format.height,
            style: {
                transform: 'none',
                transformOrigin: 'top left',
                width: `${format.width}px`,
                height: `${format.height}px`,
                top: 0,
                left: 0,
                margin: 0,
                backgroundColor: bgColor,
            }
        };

        if (downloadFormat === 'jpeg') {
            const { toJpeg } = await import('html-to-image');
            return await toJpeg(node, { ...options, quality: 0.95, backgroundColor: '#fff' });
        } else {
            const { toPng } = await import('html-to-image');
            return await toPng(node, options);
        }
    };

    const downloadSinglePage = async (node, id, bgColor) => {
        const dataUrl = await capturePageDataUrl(node, bgColor);
        if (dataUrl) {
            // Find actual index of the page for naming (1-based)
            const actualIndex = pages.findIndex(p => p.id === id) + 1;
            const extension = downloadFormat === 'jpeg' ? 'jpg' : 'png';
            const filename = `postagram-${actualIndex}.${extension}`;

            // Native robust download method using Data URLs guarantees no "Failed - Network error"
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = dataUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    /* Improved Pan and Zoom Logic */
    const [transform, setTransform] = React.useState({ x: 0, y: 0, scale: 1 });
    const [isDragging, setIsDragging] = React.useState(false);
    const [lastMousePosition, setLastMousePosition] = React.useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Initial Fit Logic
    const fitToScreen = React.useCallback(() => {
        if (containerRef.current && format) {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const padding = 80;

            const availableWidth = Math.max(containerWidth - padding, 100);
            const availableHeight = Math.max(containerHeight - padding, 100);

            const scaleX = availableWidth / format.width;
            const scaleY = availableHeight / format.height;
            const newScale = Math.min(scaleX, scaleY, 1);

            // Center content
            const x = (containerWidth - format.width * newScale) / 2;
            const y = (containerHeight - format.height * newScale) / 2;

            setTransform({ x, y, scale: newScale });
        }
    }, [format]);

    React.useLayoutEffect(() => {
        fitToScreen();
        window.addEventListener('resize', fitToScreen);
        return () => window.removeEventListener('resize', fitToScreen);
    }, [fitToScreen]);

    // Zoom Controls
    const handleZoomIn = () => {
        setTransform(prev => {
            const newScale = Math.min(prev.scale * 1.2, 5);
            // Zoom towards center
            if (!containerRef.current) return { ...prev, scale: newScale };

            const rect = containerRef.current.getBoundingClientRect();
            // Simplify center zoom logic for buttons
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            // newX = currentMouseX - (currentMouseX - oldX) * (newScale / oldScale)
            // But for center zoom: we want center point consistent
            const x = cx - (cx - prev.x) * (newScale / prev.scale);
            const y = cy - (cy - prev.y) * (newScale / prev.scale);

            return { x, y, scale: newScale };
        });
    };

    const handleZoomOut = () => {
        setTransform(prev => {
            const newScale = Math.max(prev.scale / 1.2, 0.1);
            if (!containerRef.current) return { ...prev, scale: newScale };
            const rect = containerRef.current.getBoundingClientRect();
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const x = cx - (cx - prev.x) * (newScale / prev.scale);
            const y = cy - (cy - prev.y) * (newScale / prev.scale);
            return { x, y, scale: newScale };
        });
    };

    // Wheel Zoom
    const handleWheel = (e) => {
        // Prevent default only if needed, react synthetic event doesn't support passive: false easily here
        // Usually good to stop propagation if nested
        // e.preventDefault(); // React synthetic event cannot preventDefault on passive listeners easily.

        if (e.ctrlKey || e.metaKey || true) { // Always allow wheel zoom for now or check modifier
            const scaleFactor = 0.1;
            const delta = -e.deltaY * 0.001; // normalize
            // or simpler:
            const zoomSensitivity = 0.001;
            const newScaleRaw = transform.scale * (1 - e.deltaY * zoomSensitivity * 2);
            // Clamp
            const newScale = Math.min(Math.max(newScaleRaw, 0.1), 10);

            const rect = containerRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate new position to keep mouse point fixed
            // mouseX_in_content = (mouseX - oldX) / oldScale
            // newX = mouseX - mouseX_in_content * newScale
            // newX = mouseX - ((mouseX - oldX) / oldScale) * newScale

            const newX = mouseX - ((mouseX - transform.x) / transform.scale) * newScale;
            const newY = mouseY - ((mouseY - transform.y) / transform.scale) * newScale;

            setTransform({ x: newX, y: newY, scale: newScale });
        }
    };

    // Panning Functionality
    const handleMouseDown = (e) => {
        if (e.button === 0) { // Left click
            setIsDragging(true);
            setLastMousePosition({ x: e.clientX, y: e.clientY });
            e.preventDefault(); // Prevent text selection
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const deltaX = e.clientX - lastMousePosition.x;
            const deltaY = e.clientY - lastMousePosition.y;

            setTransform(prev => ({
                ...prev,
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));

            setLastMousePosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    if (!activePage) return null;

    // Inline styles for the preview container based on format dimensions
    const containerStyle = {
        width: `${format.width}px`,
        height: `${format.height}px`,
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        transformOrigin: '0 0',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: activePage.backgroundColor,
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        // No transition for transform during drag for performance, maybe add conditional class?
        // Using direct style update via React state is fine for low frequency, but for 60fps might be laggy.
        // For now, let's keep it simple. If layout thrashing occurs we can optimize.
        willChange: 'transform',
    };

    // Font styles
    const titleStyle = {
        fontFamily: activePage.fontConfig.title.family,
        fontSize: `${activePage.fontConfig.title.size}px`,
        lineHeight: activePage.fontConfig.title.lineHeight,
        marginBottom: '1rem',
    };

    const bodyStyle = {
        fontFamily: activePage.fontConfig.body.family,
        fontSize: `${activePage.fontConfig.body.size}px`,
        lineHeight: activePage.fontConfig.body.lineHeight,
    };

    return (
        <div className="preview-wrapper">
            <div className="preview-toolbar">
                <span className="format-badge">{format.name} ({format.width}x{format.height})</span>
                <div className="zoom-controls">
                    <button className="icon-btn" onClick={handleZoomOut} title="Zoom Out">-</button>
                    <span className="zoom-label">{Math.round(transform.scale * 100)}%</span>
                    <button className="icon-btn" onClick={handleZoomIn} title="Zoom In">+</button>
                    <button className="text-btn" onClick={fitToScreen}>Fit</button>
                </div>
                <div className="download-group">
                    <select
                        value={downloadFormat}
                        onChange={(e) => setDownloadFormat(e.target.value)}
                        className="format-select"
                        title="Select Download Format"
                    >
                        <option value="png">PNG (High Quality)</option>
                        <option value="jpeg">JPG (Small Size)</option>
                    </select>
                    <div className="download-actions">
                        <button className="download-btn" onClick={() => handleDownload('single')}>
                            <Download size={16} /> Current
                        </button>
                        {pages.length > 1 && (
                            <button className="download-btn alt" onClick={() => handleDownload('all')} disabled={isExporting}>
                                {isExporting ? 'Zipping...' : 'All'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div
                className="canvas-container"
                ref={containerRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div ref={previewRef} style={containerStyle} className="post-canvas-wrapper">
                    <ThemeRenderer />
                </div>
            </div>

            {/* Hidden Export Container - Must be visible to DOM for html-to-image to work */}
            {isExporting && (
                <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: 'none' }}>
                    {pages.map(page => (
                        <div
                            key={page.id}
                            id={`export-page-${page.id}`}
                            style={{
                                width: `${format.width}px`,
                                height: `${format.height}px`,
                                backgroundColor: page.backgroundColor,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <ThemeRenderer overrideData={page} overrideConfig={config} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Preview;

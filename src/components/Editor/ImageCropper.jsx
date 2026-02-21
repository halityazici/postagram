import React, { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../utils/cropUtils'
import './ImageCropper.css'

const ImageCropper = ({ imageSrc, onCropComplete, onCancel, aspect = 1 }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropChange = (crop) => {
        setCrop(crop)
    }

    const onRotationChange = (rotation) => {
        setRotation(rotation)
    }

    const onZoomChange = (zoom) => {
        setZoom(zoom)
    }

    const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            onCropComplete(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation, onCropComplete])

    return createPortal(
        <div className="crop-modal-overlay">
            <div className="crop-modal-content">
                <div className="crop-container">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={onCropChange}
                        onRotationChange={onRotationChange}
                        onCropComplete={onCropCompleteCallback}
                        onZoomChange={onZoomChange}
                    />
                </div>
                <div className="crop-controls">
                    <div className="control-group">
                        <label>Zoom</label>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(e.target.value)}
                            className="slider"
                        />
                    </div>
                    <div className="control-group">
                        <label>Rotation</label>
                        <input
                            type="range"
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="Rotation"
                            onChange={(e) => setRotation(e.target.value)}
                            className="slider"
                        />
                    </div>
                    <div className="button-row">
                        <button onClick={onCancel} className="cancel-btn">Cancel</button>
                        <button onClick={showCroppedImage} className="confirm-btn">Crop & Apply square</button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default ImageCropper

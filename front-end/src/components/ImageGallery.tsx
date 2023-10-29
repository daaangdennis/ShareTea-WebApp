import React from 'react'
import { useRecoilState } from 'recoil'
import { activeImageState } from "../atoms/activeImageState"
import { ImageGalleryProps } from "../types/types"
const ImageGallery: React.FC<ImageGalleryProps> = ({images}) => {
    const [index, setIndex] = useRecoilState(activeImageState);

    const prevImage = () => {
        setIndex((currIndex) =>
            currIndex === 0 ? images.length - 1 : currIndex - 1
        );
    };

    const nextImage = () => {
        setIndex((currIndex) =>
            (currIndex + 1) % images.length
        );
    };


    return (
        <>
            <button onClick={prevImage}>&larr; Previous</button>
            <img src={images[index]} alt={`Image ${index + 1}`}/>
            <button onClick={nextImage}>Next &rarr;</button>
        </>
    );
};
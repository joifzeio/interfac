import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    alt,
    fallbackSrc = "https://placehold.co/600x800/111/444?text=No+Image",
    ...props
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(fallbackSrc);
        }
    };

    // Reset state if src changes
    React.useEffect(() => {
        setImgSrc(src);
        setHasError(false);
    }, [src]);

    return (
        <img
            src={imgSrc || fallbackSrc}
            alt={alt}
            onError={handleError}
            {...props}
        />
    );
};

export default ImageWithFallback;

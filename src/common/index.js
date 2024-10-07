import { defaultURLImage, mediaURL } from "../constants/api";

export const getImageUrl = (url) => {
    if (!url) return defaultURLImage;
    if (url?.startsWith("http")) return url;
    return `${mediaURL}${url}`;
}
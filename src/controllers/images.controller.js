const catchAsync = require('../utils/catchAsync');
const fetch = require('node-fetch');

const RESOLUTION_STR = '600/';

const getImages = catchAsync(async (req, res) => {
    let dataId = 1;
    const photosResponse = await fetch('https://my-json-server.typicode.com/coing-dev/photo-api/photos');
    let photosData = await photosResponse.json();
    photosData = await createPhotosArray(photosData, dataId);
    const imagesResponse = await fetch('https://my-json-server.typicode.com/coing-dev/photo-api/images');
    let imagesData = await imagesResponse.json();
    imagesData = await createImagesArray(imagesData, dataId);


    const response = photosData.concat(imagesData);

    return res.send(response);
});

const createPhotosArray = (photosData, dataId) => {
    let res = photosData[0].map(photo => ({
        id: dataId++,
        path: fixPath(photo.url),
        title: photo.title
    }))
    return res;
}

const createImagesArray = (imagesData, dataId) => {
    let res = imagesData[0].map(image => ({
        id: dataId++,
        path: fixPath(image.path),
        title: image.title
    }))
    return res;
}

const fixPath = (path) => {
    if (path.indexOf(RESOLUTION_STR) == -1) {
        const writePos = path.indexOf("com/") + 4;
        path = [path.slice(0, writePos), RESOLUTION_STR, path.slice(writePos)].join("");
    }
    return path;
}

module.exports = {
    getImages
};
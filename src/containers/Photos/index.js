import React, { useState, useEffect, useCallback, useRef } from 'react';

import apiConfig from '../../api.config';
import PhotoView from '../../components/Photos';
import { debounce } from '../../common/utilities';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [photoClickData, setpPhotoClickData] = useState([]);

  const resultsRef = useRef(null);

  useEffect(() => {
    resultsRef.current.addEventListener('scroll', () => {
      if (
        resultsRef.current &&
        window.pageYOffset + window.innerHeight > resultsRef.current.clientHeight - window.outerHeight * 0.3
      ) {
        setPage(page => page + 1);
      }
    });
  }, []);

  useEffect(() => {
    const {
      getPhotos: { url: getPhotosURL }
    } = apiConfig;
    fetch(`${getPhotosURL}&per_page=10&page=${page}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(photoList => setPhotos(photoList))
      .catch(error => console.log(error));
  }, [page]);

  const searchPhotos = () => {
    const {
      searchPhotos: { url: searchPhotosURL }
    } = apiConfig;
    fetch(`${searchPhotosURL}&per_page=10&text=${searchTerm}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(photoList => setPhotos(photoList))
      .catch(error => console.log(error));
  };

  const debouncedSearch = useCallback(() => {
    return debounce(searchPhotos, 2000);
  });

  const handleSearch = event => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value.length >= 3) {
      debouncedSearch();
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const photoClickHandler = (event, data) => {
    setIsOpen(isOpen => !isOpen);
    setpPhotoClickData(data);
  };

  return (
    <div>
      <div className="photo-list">
        {
          <PhotoView
            ref={resultsRef}
            photoList={photos}
            isOpen={isOpen}
            handleSearch={handleSearch}
            onPhotoClick={photoClickHandler}
            onModalClose={handleModalClose}
            photoClickData={photoClickData}
          />
        }
      </div>
    </div>
  );
};

export default Photos;

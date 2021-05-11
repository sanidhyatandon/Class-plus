import React, { useState, useEffect } from 'react';

import apiConfig from '../../api.config';
import PhotoView from '../../components/Photo';

const Photo = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [photoClickData, setpPhotoClickData] = useState([]);

  const [campaignsLoading, setCampaignsLoading] = useState(true);

  const scheduleCampaign = (id, value) => {
    let targetCampaignIndex = campaigns.findIndex(campaign => campaign.campaignId === id);
    campaigns[targetCampaignIndex].createdOn = value;
    const requestPayload = [...campaigns];

    setCampaigns(requestPayload);
  };

  useEffect(() => {
    const {
      getPhotos: { url: getPhotosURL }
    } = apiConfig;
    fetch(`${getPhotosURL}&per_page=10&page=${page}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(photoList => setPhotos(photoList))
      .catch(error => console.log(error));
  }, [page]);

  return (
    <div>
      {campaignsLoading && <Loader />}
      <div className="campaign-list">
        {!!campaigns && !!campaigns.length && <PhotoView campaigns={campaigns} scheduleCampaign={scheduleCampaign} />}
      </div>
    </div>
  );
};

export default Photo;

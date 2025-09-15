import { useState, useEffect } from 'react';
import { getAllBannerSettings } from '../services/bannerService';
import { getApiUrl } from '../config/apiConfig';

/**
 * Custom hook to get banner settings with fallback to default images
 */
export const useBannerSettings = () => {
  const [bannerSettings, setBannerSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBannerSettings = async () => {
      try {
        setLoading(true);
        const data = await getAllBannerSettings();
        setBannerSettings(data);
        console.log('🎨 Banner settings loaded for components:', Object.keys(data));
      } catch (err) {
        console.error('❌ Failed to load banner settings:', err);
        setError(err);
        // Use empty object so components fall back to default images
        setBannerSettings({});
      } finally {
        setLoading(false);
      }
    };

    fetchBannerSettings();
  }, []);

  /**
   * Get banner URL with fallback to default image
   * @param {string} key - Banner key (carousel_1, feature_cns, etc.)
   * @param {string} defaultImage - Default image path to use as fallback
   * @returns {string} - Image URL
   */
  const getBannerUrl = (key, defaultImage) => {
    console.log('🖼️ getBannerUrl called:', { key, defaultImage });
    console.log('🖼️ Current bannerSettings:', bannerSettings);
    
    // Try different key formats (carousel_1, Carousel_1, etc.)
    const possibleKeys = [
      key,
      key.charAt(0).toUpperCase() + key.slice(1),
      key.toLowerCase()
    ];

    for (const possibleKey of possibleKeys) {
      if (bannerSettings[possibleKey]?.url) {
        const rawUrl = bannerSettings[possibleKey].url;
        
        // Xử lý URL giống admin - dùng getApiUrl cho relative paths
        let fullUrl = rawUrl;
        if (rawUrl && !rawUrl.startsWith('http') && !rawUrl.startsWith('data:')) {
          fullUrl = getApiUrl(rawUrl);
        }
        
        console.log('✅ Found banner URL:', possibleKey, rawUrl, '→', fullUrl);
        return fullUrl;
      }
    }

    console.log('⚠️ No banner found, using fallback:', defaultImage);
    // Fallback to default image
    return defaultImage;
  };

  /**
   * Get carousel images with fallbacks (sử dụng banner1,2,3)
   */
  const getCarouselImages = () => {
    return [
      {
        img: getBannerUrl('Banner1', '/assets/images/banner/banner_attech_1.webp'),
        className: 'carousel-img-1',
      },
      {
        img: getBannerUrl('Banner2', '/assets/images/banner/banner_attech_2.jpg'),
        className: 'carousel-img-2',
      },
      {
        img: getBannerUrl('Banner3', '/assets/images/banner/banner_attech_3.jpg'),
        className: 'carousel-img-3',
      },
    ];
  };

  /**
   * Get feature background images
   */
  const getFeatureBackgrounds = () => {
    return {
      cns: getBannerUrl('HomeFeatCns', '/assets/images/cns_atm/anh-dai-dien-cns.jpg'),
      bhc: getBannerUrl('HomeFeatBhc', '/assets/images/bhc/bhc_2.webp'),
      cnhk: getBannerUrl('HomeFeatCnhk', '/assets/images/cnhk/cnhk_6.webp'),
    };
  };

  /**
   * Get fact event image
   */
  const getFactImage = () => {
    return getBannerUrl('HomeFactEvent', '/assets/images/event/thong_tin_1.webp');
  };

  /**
   * Get About gallery images
   */
  const getAboutGalleries = () => {
    return {
      cnsAtmImages: [
        getBannerUrl('AboutCns1', '/assets/images/cns_atm/cns_atm_1.webp'),
        getBannerUrl('AboutCns2', '/assets/images/cns_atm/cns_atm_2.webp'),
        getBannerUrl('AboutCns3', '/assets/images/cns_atm/cns_atm_3.webp'),
        getBannerUrl('AboutCns4', '/assets/images/cns_atm/dvor_dme_da_nang.webp'),
        getBannerUrl('AboutCns5', '/assets/images/cns_atm/dvor_dme_dien_bien.webp'),
        getBannerUrl('AboutCns6', '/assets/images/cns_atm/dvor_dme_van_don.webp'),
      ],
      bhcImages: [
        getBannerUrl('AboutBhc1', '/assets/images/bhc/bkthc_1.jpg'),
        getBannerUrl('AboutBhc2', '/assets/images/bhc/bkthc_2.jpg'),
        getBannerUrl('AboutBhc3', '/assets/images/bhc/bkthc_3.jpg'),
        getBannerUrl('AboutBhc4', '/assets/images/bhc/bkthc_4.jpg'),
        getBannerUrl('AboutBhc5', '/assets/images/bhc/bkthc_5.jpg'),
      ],
      cnhkImages: [
        getBannerUrl('AboutCnhk1', '/assets/images/cnhk/cnhk_1.webp'),
        getBannerUrl('AboutCnhk2', '/assets/images/cnhk/cnhk_2.webp'),
        getBannerUrl('AboutCnhk3', '/assets/images/cnhk/cnhk_3.webp'),
        getBannerUrl('AboutCnhk4', '/assets/images/cnhk/cnhk_4.webp'),
        getBannerUrl('AboutCnhk5', '/assets/images/cnhk/cnhk_5.webp'),
        getBannerUrl('AboutCnhk6', '/assets/images/cnhk/cnhk_6.webp'),
        getBannerUrl('AboutCnhk7', '/assets/images/cnhk/cnhk_7.webp'),
        getBannerUrl('AboutCnhk8', '/assets/images/cnhk/cnhk_8.webp'),
      ],
    };
  };

  return {
    bannerSettings,
    loading,
    error,
    getBannerUrl,
    getCarouselImages,
    getFeatureBackgrounds,
    getFactImage,
    getAboutGalleries,
  };
};

export default useBannerSettings;
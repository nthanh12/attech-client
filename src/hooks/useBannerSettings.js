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
      } catch (err) {
        setError(err);
        setBannerSettings({});
      } finally {
        setLoading(false);
      }
    };

    fetchBannerSettings();
  }, []);

  /**
   * Get banner URL from API only (no fallback)
   * @param {string} key - Banner key (carousel_1, feature_cns, etc.)
   * @returns {string|null} - Image URL from API or null
   */
  const getBannerUrl = (key) => {
    // Direct key lookup first
    if (bannerSettings[key]?.url) {
      const rawUrl = bannerSettings[key].url;

      // Xử lý URL giống admin - dùng getApiUrl cho relative paths
      let fullUrl = rawUrl;
      if (rawUrl && !rawUrl.startsWith('http') && !rawUrl.startsWith('data:')) {
        fullUrl = getApiUrl(rawUrl);
      }

      return fullUrl;
    }

    // Try different key formats as fallback
    const possibleKeys = [
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

        return fullUrl;
      }
    }

    // No fallback - return null if not found in API
    return null;
  };

  /**
   * Get carousel images from API only
   */
  const getCarouselImages = () => {
    return [
      {
        img: getBannerUrl('Banner1'),
        className: 'carousel-img-1',
      },
      {
        img: getBannerUrl('Banner2'),
        className: 'carousel-img-2',
      },
      {
        img: getBannerUrl('Banner3'),
        className: 'carousel-img-3',
      },
    ].filter(item => item.img); // Remove null images
  };

  /**
   * Get feature background images from API only
   */
  const getFeatureBackgrounds = () => {
    return {
      cns: getBannerUrl('HomeFeatCns'),
      bhc: getBannerUrl('HomeFeatBhc'),
      cnhk: getBannerUrl('HomeFeatCnhk'),
    };
  };

  /**
   * Get fact event image from API only
   */
  const getFactImage = () => {
    return getBannerUrl('HomeFactEvent');
  };

  /**
   * Get About gallery images from API only
   */
  const getAboutGalleries = () => {
    const cnsAtmImages = [
      getBannerUrl('AboutCns1'),
      getBannerUrl('AboutCns2'),
      getBannerUrl('AboutCns3'),
      getBannerUrl('AboutCns4'),
      getBannerUrl('AboutCns5'),
      getBannerUrl('AboutCns6'),
    ].filter(Boolean);

    const bhcImages = [
      getBannerUrl('AboutBhc1'),
      getBannerUrl('AboutBhc2'),
      getBannerUrl('AboutBhc3'),
      getBannerUrl('AboutBhc4'),
      getBannerUrl('AboutBhc5'),
    ].filter(Boolean);

    const cnhkImages = [
      getBannerUrl('AboutCnhk1'),
      getBannerUrl('AboutCnhk2'),
      getBannerUrl('AboutCnhk3'),
      getBannerUrl('AboutCnhk4'),
      getBannerUrl('AboutCnhk5'),
      getBannerUrl('AboutCnhk6'),
      getBannerUrl('AboutCnhk7'),
      getBannerUrl('AboutCnhk8'),
    ].filter(Boolean);

    return {
      cnsAtmImages,
      bhcImages,
      cnhkImages,
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
import React, { useState, useEffect } from 'react';
import { 
  getAllBannerSettings, 
  uploadBannerSetting, 
  deleteBannerSetting, 
  getBannerKeys 
} from '../../services/bannerService';
import BannerUploadItem from './BannerUploadItem';
import ToastMessage from './ToastMessage';
import LoadingSpinner from './LoadingSpinner';
import './BannerManager.css';

const BannerManager = () => {
  const [banners, setBanners] = useState({});
  const [uploading, setUploading] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const bannerKeys = getBannerKeys();

  // Fetch all banner settings on component mount
  const fetchAllBanners = async () => {
    try {
      setLoading(true);
      const data = await getAllBannerSettings();
      setBanners(data);
      console.log('🎌 Banners loaded:', data);
    } catch (error) {
      console.error('❌ Failed to fetch banners:', error);
      setToast({
        show: true,
        message: 'Không thể tải danh sách banner!',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBanners();
  }, []);

  // Upload banner for specific key
  const handleUploadBanner = async (bannerKey, file) => {
    setUploading(prev => ({ ...prev, [bannerKey]: true }));

    try {
      console.log(`🎌 Uploading ${bannerKey}:`, file);
      
      // Validate file
      if (!file) {
        throw new Error('Vui lòng chọn file để upload');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('Chỉ chấp nhận file hình ảnh');
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Kích thước file không được vượt quá 5MB');
      }

      const result = await uploadBannerSetting(bannerKey, file);
      
      // Update banners state with new data
      setBanners(prev => ({
        ...prev,
        [bannerKey.charAt(0).toUpperCase() + bannerKey.slice(1)]: {
          url: result.url,
          uploadDate: result.uploadDate,
          fileName: result.fileName,
          fileSize: result.fileSize,
          id: result.id
        }
      }));

      setToast({
        show: true,
        message: `Upload ${bannerKey} thành công!`,
        type: 'success'
      });

      // Refresh all banners to ensure consistency
      await fetchAllBanners();
      
    } catch (error) {
      console.error(`❌ Upload ${bannerKey} failed:`, error);
      setToast({
        show: true,
        message: error.message || `Upload ${bannerKey} thất bại!`,
        type: 'error'
      });
    } finally {
      setUploading(prev => ({ ...prev, [bannerKey]: false }));
    }
  };

  // Delete banner
  const handleDeleteBanner = async (bannerKey) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa ${bannerKey}?`)) {
      return;
    }

    try {
      await deleteBannerSetting(bannerKey);
      
      // Update banners state
      setBanners(prev => ({
        ...prev,
        [bannerKey.charAt(0).toUpperCase() + bannerKey.slice(1)]: { url: null, uploadedAt: null }
      }));

      setToast({
        show: true,
        message: `Xóa ${bannerKey} thành công!`,
        type: 'success'
      });

      // Refresh all banners
      await fetchAllBanners();
      
    } catch (error) {
      console.error(`❌ Delete ${bannerKey} failed:`, error);
      setToast({
        show: true,
        message: error.message || `Xóa ${bannerKey} thất bại!`,
        type: 'error'
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="banner-manager">
      <div className="banner-manager-header">
        <h2>Quản lý Banner & Logo</h2>
        <p className="banner-manager-description">
          Quản lý các banner và logo hiển thị trên website. 
          Chỉ chấp nhận file hình ảnh (JPG, PNG, GIF) với kích thước tối đa 5MB.
        </p>
      </div>

      <div className="banner-grid">
        {bannerKeys.map((bannerConfig) => {
          const bannerKey = bannerConfig.key;
          const displayKey = bannerKey.charAt(0).toUpperCase() + bannerKey.slice(1);
          const currentBanner = banners[displayKey] || banners[bannerKey];
          
          return (
            <BannerUploadItem
              key={bannerKey}
              title={bannerConfig.label}
              description={bannerConfig.description}
              bannerKey={bannerKey}
              currentUrl={currentBanner?.url}
              uploadedAt={currentBanner?.uploadDate || currentBanner?.uploadedAt}
              onUpload={handleUploadBanner}
              onDelete={handleDeleteBanner}
              uploading={uploading[bannerKey] || false}
            />
          );
        })}
      </div>

      {/* Toast Message */}
      {toast.show && (
        <ToastMessage
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default BannerManager;
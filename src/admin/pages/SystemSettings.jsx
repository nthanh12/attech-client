import React, { useState, useEffect, useCallback } from 'react';
import PageWrapper from '../components/PageWrapper';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  fetchSystemSettings,
  updateSystemSettings,
  resetSettingsToDefault,
  exportSettings,
  importSettings,
  testEmailConfiguration,
  clearSystemCache,
  getTimezones,
  getLanguages,
  getCurrencies
} from '../../services/systemSettingsService';
import './SystemSettings.css';
import "../styles/adminButtons.css";

const SystemSettings = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [settings, setSettings] = useState({
    general: {},
    seo: {},
    email: {},
    social: {},
    maintenance: {},
    security: {},
    backup: {}
  });
  const [tempSettings, setTempSettings] = useState({});
  const [testingEmail, setTestingEmail] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);

  const timezones = getTimezones();
  const languages = getLanguages();
  const currencies = getCurrencies();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const settingsData = await fetchSystemSettings();
        setSettings(settingsData);
        setTempSettings(settingsData);
        console.log('✅ System settings loaded successfully');
      } catch (error) {
        console.error('Failed to fetch system settings:', error);
        setToast({ show: true, message: 'Không thể tải cài đặt hệ thống!', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleInputChange = (category, field, value) => {
    setTempSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = async (category) => {
    if (!tempSettings[category]) return;

    setSaving(true);
    try {
      await updateSystemSettings(category, tempSettings[category]);
      setSettings(prev => ({
        ...prev,
        [category]: tempSettings[category]
      }));
      setToast({ show: true, message: 'Cập nhật cài đặt thành công!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.message || 'Lỗi khi cập nhật cài đặt!', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async (category) => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục cài đặt về mặc định?')) {
      setSaving(true);
      try {
        const defaultSettings = await resetSettingsToDefault(category);
        setSettings(prev => ({
          ...prev,
          [category]: defaultSettings
        }));
        setTempSettings(prev => ({
          ...prev,
          [category]: defaultSettings
        }));
        setToast({ show: true, message: 'Khôi phục cài đặt thành công!', type: 'success' });
      } catch (error) {
        setToast({ show: true, message: error.message || 'Lỗi khi khôi phục cài đặt!', type: 'error' });
      } finally {
        setSaving(false);
      }
    }
  };

  const handleExport = async () => {
    try {
      await exportSettings();
      setToast({ show: true, message: 'Xuất cài đặt thành công!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.message || 'Lỗi khi xuất cài đặt!', type: 'error' });
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const importedSettings = await importSettings(file);
      setSettings(importedSettings);
      setTempSettings(importedSettings);
      setToast({ show: true, message: 'Nhập cài đặt thành công!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.message || 'Lỗi khi nhập cài đặt!', type: 'error' });
    }
    
    // Reset file input
    event.target.value = '';
  };

  const handleTestEmail = async () => {
    if (!tempSettings.email) return;

    setTestingEmail(true);
    try {
      await testEmailConfiguration(tempSettings.email);
      setToast({ show: true, message: 'Test email thành công!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: error.message || 'Test email thất bại!', type: 'error' });
    } finally {
      setTestingEmail(false);
    }
  };

  const handleClearCache = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa cache hệ thống?')) {
      setClearingCache(true);
      try {
        await clearSystemCache();
        setToast({ show: true, message: 'Xóa cache thành công!', type: 'success' });
      } catch (error) {
        setToast({ show: true, message: error.message || 'Lỗi khi xóa cache!', type: 'error' });
      } finally {
        setClearingCache(false);
      }
    }
  };

  const renderTabButtons = () => (
    <div className="tab-buttons">
      <button 
        className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
        onClick={() => setActiveTab('general')}
      >
        <i className="bi bi-gear"></i>
        Cài đặt chung
      </button>
      <button 
        className={`tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
        onClick={() => setActiveTab('seo')}
      >
        <i className="bi bi-search"></i>
        SEO
      </button>
      <button 
        className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
        onClick={() => setActiveTab('email')}
      >
        <i className="bi bi-envelope"></i>
        Email
      </button>
      <button 
        className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
        onClick={() => setActiveTab('social')}
      >
        <i className="bi bi-share"></i>
        Mạng xã hội
      </button>
      <button 
        className={`tab-btn ${activeTab === 'maintenance' ? 'active' : ''}`}
        onClick={() => setActiveTab('maintenance')}
      >
        <i className="bi bi-tools"></i>
        Bảo trì
      </button>
      <button 
        className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
        onClick={() => setActiveTab('security')}
      >
        <i className="bi bi-shield"></i>
        Bảo mật
      </button>
      <button 
        className={`tab-btn ${activeTab === 'backup' ? 'active' : ''}`}
        onClick={() => setActiveTab('backup')}
      >
        <i className="bi bi-cloud-arrow-up"></i>
        Sao lưu
      </button>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <h3>Cài đặt chung</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Tên website</label>
          <input
            type="text"
            value={tempSettings.general?.siteName || ''}
            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
            className="form-control"
            placeholder="Tên website"
          />
        </div>
        <div className="form-group">
          <label>Email liên hệ</label>
          <input
            type="email"
            value={tempSettings.general?.contactEmail || ''}
            onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
            className="form-control"
            placeholder="contact@example.com"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="tel"
            value={tempSettings.general?.contactPhone || ''}
            onChange={(e) => handleInputChange('general', 'contactPhone', e.target.value)}
            className="form-control"
            placeholder="+84 xxx xxx xxx"
          />
        </div>
        <div className="form-group">
          <label>Múi giờ</label>
          <select
            value={tempSettings.general?.timezone || 'Asia/Ho_Chi_Minh'}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            className="form-control"
          >
            {timezones.map(tz => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Ngôn ngữ</label>
          <select
            value={tempSettings.general?.language || 'vi'}
            onChange={(e) => handleInputChange('general', 'language', e.target.value)}
            className="form-control"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tiền tệ</label>
          <select
            value={tempSettings.general?.currency || 'VND'}
            onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
            className="form-control"
          >
            {currencies.map(curr => (
              <option key={curr.value} value={curr.value}>{curr.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Mô tả website</label>
        <textarea
          value={tempSettings.general?.siteDescription || ''}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
          className="form-control"
          placeholder="Mô tả ngắn về website"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Địa chỉ</label>
        <textarea
          value={tempSettings.general?.address || ''}
          onChange={(e) => handleInputChange('general', 'address', e.target.value)}
          className="form-control"
          placeholder="Địa chỉ công ty"
          rows={2}
        />
      </div>
    </div>
  );

  const renderSeoSettings = () => (
    <div className="settings-section">
      <h3>Cài đặt SEO</h3>
      
      <div className="form-group">
        <label>Meta Title</label>
        <input
          type="text"
          value={tempSettings.seo?.metaTitle || ''}
          onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
          className="form-control"
          placeholder="Tiêu đề meta cho SEO"
        />
      </div>

      <div className="form-group">
        <label>Meta Description</label>
        <textarea
          value={tempSettings.seo?.metaDescription || ''}
          onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
          className="form-control"
          placeholder="Mô tả meta cho SEO"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Meta Keywords</label>
        <input
          type="text"
          value={tempSettings.seo?.metaKeywords || ''}
          onChange={(e) => handleInputChange('seo', 'metaKeywords', e.target.value)}
          className="form-control"
          placeholder="từ khóa, seo, website"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Google Analytics ID</label>
          <input
            type="text"
            value={tempSettings.seo?.googleAnalytics || ''}
            onChange={(e) => handleInputChange('seo', 'googleAnalytics', e.target.value)}
            className="form-control"
            placeholder="G-XXXXXXXXXX"
          />
        </div>
        <div className="form-group">
          <label>Facebook Pixel ID</label>
          <input
            type="text"
            value={tempSettings.seo?.facebookPixel || ''}
            onChange={(e) => handleInputChange('seo', 'facebookPixel', e.target.value)}
            className="form-control"
            placeholder="123456789"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Google Tag Manager ID</label>
        <input
          type="text"
          value={tempSettings.seo?.googleTagManager || ''}
          onChange={(e) => handleInputChange('seo', 'googleTagManager', e.target.value)}
          className="form-control"
          placeholder="GTM-XXXXXXX"
        />
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="settings-section">
      <h3>Cài đặt Email</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>SMTP Host</label>
          <input
            type="text"
            value={tempSettings.email?.smtpHost || ''}
            onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)}
            className="form-control"
            placeholder="smtp.gmail.com"
          />
        </div>
        <div className="form-group">
          <label>SMTP Port</label>
          <input
            type="number"
            value={tempSettings.email?.smtpPort || 587}
            onChange={(e) => handleInputChange('email', 'smtpPort', parseInt(e.target.value))}
            className="form-control"
            placeholder="587"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>SMTP Username</label>
          <input
            type="text"
            value={tempSettings.email?.smtpUsername || ''}
            onChange={(e) => handleInputChange('email', 'smtpUsername', e.target.value)}
            className="form-control"
            placeholder="username@gmail.com"
          />
        </div>
        <div className="form-group">
          <label>SMTP Password</label>
          <input
            type="password"
            value={tempSettings.email?.smtpPassword || ''}
            onChange={(e) => handleInputChange('email', 'smtpPassword', e.target.value)}
            className="form-control"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>From Email</label>
          <input
            type="email"
            value={tempSettings.email?.fromEmail || ''}
            onChange={(e) => handleInputChange('email', 'fromEmail', e.target.value)}
            className="form-control"
            placeholder="noreply@example.com"
          />
        </div>
        <div className="form-group">
          <label>From Name</label>
          <input
            type="text"
            value={tempSettings.email?.fromName || ''}
            onChange={(e) => handleInputChange('email', 'fromName', e.target.value)}
            className="form-control"
            placeholder="Your Company"
          />
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input
            type="checkbox"
            id="smtpSecure"
            checked={tempSettings.email?.smtpSecure || false}
            onChange={(e) => handleInputChange('email', 'smtpSecure', e.target.checked)}
            className="form-check-input"
          />
          <label htmlFor="smtpSecure" className="form-check-label">
            Sử dụng SSL/TLS
          </label>
        </div>
      </div>

      <div className="form-group">
        <button 
          className="admin-btn admin-btn-secondary"
          onClick={handleTestEmail}
          disabled={testingEmail}
        >
          {testingEmail ? 'Đang test...' : 'Test Email'}
        </button>
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="settings-section">
      <h3>Mạng xã hội</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Facebook</label>
          <input
            type="url"
            value={tempSettings.social?.facebook || ''}
            onChange={(e) => handleInputChange('social', 'facebook', e.target.value)}
            className="form-control"
            placeholder="https://facebook.com/yourpage"
          />
        </div>
        <div className="form-group">
          <label>Twitter</label>
          <input
            type="url"
            value={tempSettings.social?.twitter || ''}
            onChange={(e) => handleInputChange('social', 'twitter', e.target.value)}
            className="form-control"
            placeholder="https://twitter.com/yourhandle"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            value={tempSettings.social?.linkedin || ''}
            onChange={(e) => handleInputChange('social', 'linkedin', e.target.value)}
            className="form-control"
            placeholder="https://linkedin.com/company/yourcompany"
          />
        </div>
        <div className="form-group">
          <label>YouTube</label>
          <input
            type="url"
            value={tempSettings.social?.youtube || ''}
            onChange={(e) => handleInputChange('social', 'youtube', e.target.value)}
            className="form-control"
            placeholder="https://youtube.com/c/yourchannel"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Instagram</label>
          <input
            type="url"
            value={tempSettings.social?.instagram || ''}
            onChange={(e) => handleInputChange('social', 'instagram', e.target.value)}
            className="form-control"
            placeholder="https://instagram.com/yourhandle"
          />
        </div>
        <div className="form-group">
          <label>Zalo</label>
          <input
            type="url"
            value={tempSettings.social?.zalo || ''}
            onChange={(e) => handleInputChange('social', 'zalo', e.target.value)}
            className="form-control"
            placeholder="https://zalo.me/yourpage"
          />
        </div>
      </div>
    </div>
  );

  const renderMaintenanceSettings = () => (
    <div className="settings-section">
      <h3>Chế độ bảo trì</h3>
      
      <div className="form-group">
        <div className="form-check">
          <input
            type="checkbox"
            id="maintenanceEnabled"
            checked={tempSettings.maintenance?.enabled || false}
            onChange={(e) => handleInputChange('maintenance', 'enabled', e.target.checked)}
            className="form-check-input"
          />
          <label htmlFor="maintenanceEnabled" className="form-check-label">
            Bật chế độ bảo trì
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Thông báo bảo trì</label>
        <textarea
          value={tempSettings.maintenance?.message || ''}
          onChange={(e) => handleInputChange('maintenance', 'message', e.target.value)}
          className="form-control"
          placeholder="Website đang được bảo trì. Vui lòng quay lại sau."
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Thời gian bắt đầu</label>
          <input
            type="datetime-local"
            value={tempSettings.maintenance?.startTime || ''}
            onChange={(e) => handleInputChange('maintenance', 'startTime', e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Thời gian kết thúc</label>
          <input
            type="datetime-local"
            value={tempSettings.maintenance?.endTime || ''}
            onChange={(e) => handleInputChange('maintenance', 'endTime', e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <div className="form-group">
        <label>IP được phép truy cập (mỗi IP một dòng)</label>
        <textarea
          value={tempSettings.maintenance?.allowedIps?.join('\n') || ''}
          onChange={(e) => handleInputChange('maintenance', 'allowedIps', e.target.value.split('\n').filter(ip => ip.trim()))}
          className="form-control"
          placeholder="127.0.0.1&#10;::1"
          rows={3}
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <h3>Cài đặt bảo mật</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Số lần đăng nhập sai tối đa</label>
          <input
            type="number"
            value={tempSettings.security?.maxLoginAttempts || 5}
            onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="form-control"
            min="1"
            max="10"
          />
        </div>
        <div className="form-group">
          <label>Thời gian khóa tài khoản (phút)</label>
          <input
            type="number"
            value={tempSettings.security?.lockoutDuration || 30}
            onChange={(e) => handleInputChange('security', 'lockoutDuration', parseInt(e.target.value))}
            className="form-control"
            min="5"
            max="1440"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Thời gian session (phút)</label>
          <input
            type="number"
            value={tempSettings.security?.sessionTimeout || 1440}
            onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="form-control"
            min="60"
            max="10080"
          />
        </div>
        <div className="form-group">
          <div className="form-check" style={{ marginTop: '32px' }}>
            <input
              type="checkbox"
              id="forceHttps"
              checked={tempSettings.security?.forceHttps || false}
              onChange={(e) => handleInputChange('security', 'forceHttps', e.target.checked)}
              className="form-check-input"
            />
            <label htmlFor="forceHttps" className="form-check-label">
              Bắt buộc HTTPS
            </label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input
            type="checkbox"
            id="enableCaptcha"
            checked={tempSettings.security?.enableCaptcha || false}
            onChange={(e) => handleInputChange('security', 'enableCaptcha', e.target.checked)}
            className="form-check-input"
          />
          <label htmlFor="enableCaptcha" className="form-check-label">
            Bật Captcha
          </label>
        </div>
      </div>

      {tempSettings.security?.enableCaptcha && (
        <div className="form-row">
          <div className="form-group">
            <label>reCAPTCHA Site Key</label>
            <input
              type="text"
              value={tempSettings.security?.recaptchaSiteKey || ''}
              onChange={(e) => handleInputChange('security', 'recaptchaSiteKey', e.target.value)}
              className="form-control"
              placeholder="6Lc..."
            />
          </div>
          <div className="form-group">
            <label>reCAPTCHA Secret Key</label>
            <input
              type="password"
              value={tempSettings.security?.recaptchaSecretKey || ''}
              onChange={(e) => handleInputChange('security', 'recaptchaSecretKey', e.target.value)}
              className="form-control"
              placeholder="6Lc..."
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderBackupSettings = () => (
    <div className="settings-section">
      <h3>Cài đặt sao lưu</h3>
      
      <div className="form-group">
        <div className="form-check">
          <input
            type="checkbox"
            id="backupEnabled"
            checked={tempSettings.backup?.enabled || false}
            onChange={(e) => handleInputChange('backup', 'enabled', e.target.checked)}
            className="form-check-input"
          />
          <label htmlFor="backupEnabled" className="form-check-label">
            Bật sao lưu tự động
          </label>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Tần suất sao lưu</label>
          <select
            value={tempSettings.backup?.frequency || 'daily'}
            onChange={(e) => handleInputChange('backup', 'frequency', e.target.value)}
            className="form-control"
          >
            <option value="hourly">Hàng giờ</option>
            <option value="daily">Hàng ngày</option>
            <option value="weekly">Hàng tuần</option>
            <option value="monthly">Hàng tháng</option>
          </select>
        </div>
        <div className="form-group">
          <label>Thời gian lưu trữ (ngày)</label>
          <input
            type="number"
            value={tempSettings.backup?.retention || 30}
            onChange={(e) => handleInputChange('backup', 'retention', parseInt(e.target.value))}
            className="form-control"
            min="1"
            max="365"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Vị trí lưu trữ</label>
        <select
          value={tempSettings.backup?.location || 'local'}
          onChange={(e) => handleInputChange('backup', 'location', e.target.value)}
          className="form-control"
        >
          <option value="local">Local Server</option>
          <option value="s3">Amazon S3</option>
          <option value="ftp">FTP Server</option>
        </select>
      </div>

      {tempSettings.backup?.location === 's3' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>S3 Bucket</label>
              <input
                type="text"
                value={tempSettings.backup?.s3Bucket || ''}
                onChange={(e) => handleInputChange('backup', 's3Bucket', e.target.value)}
                className="form-control"
                placeholder="your-bucket-name"
              />
            </div>
            <div className="form-group">
              <label>S3 Region</label>
              <input
                type="text"
                value={tempSettings.backup?.s3Region || ''}
                onChange={(e) => handleInputChange('backup', 's3Region', e.target.value)}
                className="form-control"
                placeholder="us-east-1"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>S3 Access Key</label>
              <input
                type="text"
                value={tempSettings.backup?.s3AccessKey || ''}
                onChange={(e) => handleInputChange('backup', 's3AccessKey', e.target.value)}
                className="form-control"
                placeholder="AKIAIOSFODNN7EXAMPLE"
              />
            </div>
            <div className="form-group">
              <label>S3 Secret Key</label>
              <input
                type="password"
                value={tempSettings.backup?.s3SecretKey || ''}
                onChange={(e) => handleInputChange('backup', 's3SecretKey', e.target.value)}
                className="form-control"
                placeholder="••••••••"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'seo':
        return renderSeoSettings();
      case 'email':
        return renderEmailSettings();
      case 'social':
        return renderSocialSettings();
      case 'maintenance':
        return renderMaintenanceSettings();
      case 'security':
        return renderSecuritySettings();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const pageActions = (
    <div className="page-actions">
      <button 
        className="admin-btn admin-btn-secondary"
        onClick={handleClearCache}
        disabled={clearingCache}
        style={{ marginRight: '8px' }}
      >
        {clearingCache ? 'Đang xóa...' : 'Xóa Cache'}
      </button>
      <button 
        className="admin-btn admin-btn-secondary"
        onClick={handleExport}
        style={{ marginRight: '8px' }}
      >
        Xuất cài đặt
      </button>
      <label className="btn btn-secondary" style={{ marginRight: '8px', cursor: 'pointer' }}>
        Nhập cài đặt
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </label>
      <button 
        className="admin-btn admin-btn-warning"
        onClick={() => handleReset(activeTab)}
        disabled={saving}
        style={{ marginRight: '8px' }}
      >
        Khôi phục
      </button>
      <button 
        className="admin-btn admin-btn-primary"
        onClick={() => handleSave(activeTab)}
        disabled={saving}
      >
        {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
      </button>
    </div>
  );

  return (
    <PageWrapper actions={pageActions}>
      <div className="admin-system-settings">
        {renderTabButtons()}
        
        <div className="tab-content">
          {renderTabContent()}
        </div>

        {toast.show && (
          <ToastMessage 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast({ ...toast, show: false })} 
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default SystemSettings;
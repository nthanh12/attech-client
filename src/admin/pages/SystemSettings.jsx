import React, { useState, useEffect, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockSystemSettings } from '../../utils/mockData.js';
import './SystemSettings.css';

const SystemSettings = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Định nghĩa các object empty cho từng phần settings
  const emptyGeneralSettings = {
    siteNameVi: '',
    siteNameEn: '',
    siteDescriptionVi: '',
    siteDescriptionEn: '',
    siteKeywordsVi: '',
    siteKeywordsEn: '',
    siteLogo: '',
    siteFavicon: '',
    maintenanceMode: false,
    maintenanceMessageVi: '',
    maintenanceMessageEn: ''
  };
  const emptyCompanyInfo = {
    companyNameVi: '',
    companyNameEn: '',
    companyAddressVi: '',
    companyAddressEn: '',
    companyPhone: '',
    companyEmail: '',
    companyWebsite: '',
    companyTaxCode: '',
    companyLicense: '',
    companyDescriptionVi: '',
    companyDescriptionEn: ''
  };
  const emptyContactSettings = {
    contactEmail: '',
    supportEmail: '',
    salesEmail: '',
    contactPhone: '',
    contactAddressVi: '',
    contactAddressEn: '',
    workingHoursVi: '',
    workingHoursEn: '',
    mapEmbed: ''
  };
  const emptySeoSettings = {
    googleAnalytics: '',
    googleTagManager: '',
    facebookPixel: '',
    metaTitleVi: '',
    metaTitleEn: '',
    metaDescriptionVi: '',
    metaDescriptionEn: '',
    ogImage: '',
    twitterCard: '',
    robotsTxt: '',
    sitemapUrl: ''
  };
  const emptyEmailSettings = {
    smtpHost: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: '',
    fromName: '',
    fromEmail: '',
    replyToEmail: ''
  };
  const emptySocialSettings = {
    facebookUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    instagramUrl: ''
  };

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({ ...emptyGeneralSettings });

  // Company Information
  const [companyInfo, setCompanyInfo] = useState({ ...emptyCompanyInfo });

  // Contact Settings
  const [contactSettings, setContactSettings] = useState({ ...emptyContactSettings });

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState({ ...emptySeoSettings });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({ ...emptyEmailSettings });

  // Social Media
  const [socialSettings, setSocialSettings] = useState({ ...emptySocialSettings });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // Sử dụng mock data thay vì API call
      const settings = mockSystemSettings;
      
      // Load settings từ mock data
      if (settings.general) {
        setGeneralSettings(prev => ({ ...prev, ...settings.general }));
      }
      if (settings.company) {
        setCompanyInfo(prev => ({ ...prev, ...settings.company }));
      }
      if (settings.contact) {
        setContactSettings(prev => ({ ...prev, ...settings.contact }));
      }
      if (settings.seo) {
        setSeoSettings(prev => ({ ...prev, ...settings.seo }));
      }
      if (settings.email) {
        setEmailSettings(prev => ({ ...prev, ...settings.email }));
      }
      if (settings.social) {
        setSocialSettings(prev => ({ ...prev, ...settings.social }));
      }
      
      setToast({ show: true, message: 'Tải cấu hình thành công!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi tải cấu hình!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (settingsType) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setToast({ show: true, message: 'Lưu cấu hình thành công!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu cấu hình!', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (settings, setSettings, field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneralChange = (field, value) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <h3>Cấu hình chung</h3>
      <div className="form-group">
        <label>Tên website (Tiếng Việt)</label>
        <input
          type="text"
          value={generalSettings.siteNameVi}
          onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'siteNameVi', e.target.value)}
          placeholder="Nhập tên website"
        />
      </div>
      <div className="form-group">
        <label>Website Name (English)</label>
        <input
          type="text"
          value={generalSettings.siteNameEn}
          onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'siteNameEn', e.target.value)}
          placeholder="Enter website name"
        />
      </div>
      <div className="form-group">
        <label>Mô tả website (Tiếng Việt)</label>
        <Editor
          tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
          licenseKey="gpl"
          value={generalSettings.siteDescriptionVi}
          onEditorChange={c => handleGeneralChange('siteDescriptionVi', c)}
          init={{
            base_url: '/tinymce',
            suffix: '.min',
            appendTo: 'body',
            skin: 'oxide',
            content_css: 'default',
            menubar: true,
            plugins: [
              'advlist','autolink','lists','link','image','charmap','preview',
              'anchor','searchreplace','visualblocks','code','fullscreen',
              'insertdatetime','media','table','help','wordcount',
              'emoticons','codesample'
            ],
            toolbar:
              'undo redo | blocks | bold italic underline strikethrough forecolor backcolor | ' +
              'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
              'link image media table codesample charmap emoticons | removeformat | help',
            height: 200,
            branding: false,
            promotion: false
          }}
        />
      </div>
      <div className="form-group">
        <label>Website Description (English)</label>
        <textarea
          value={generalSettings.siteDescriptionEn}
          onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'siteDescriptionEn', e.target.value)}
          placeholder="Enter website description"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Từ khóa SEO (Tiếng Việt)</label>
        <input
          type="text"
          value={generalSettings.siteKeywordsVi}
          onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'siteKeywordsVi', e.target.value)}
          placeholder="Nhập từ khóa SEO, phân cách bằng dấu phẩy"
        />
      </div>
      <div className="form-group">
        <label>SEO Keywords (English)</label>
        <input
          type="text"
          value={generalSettings.siteKeywordsEn}
          onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'siteKeywordsEn', e.target.value)}
          placeholder="Enter SEO keywords, separated by commas"
        />
      </div>
      <div className="form-group">
        <label>Logo website</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'siteLogo', e.target.files[0])}
        />
      </div>
      <div className="form-group">
        <label>Favicon</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'siteFavicon', e.target.files[0])}
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={generalSettings.maintenanceMode}
            onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'maintenanceMode', e.target.checked)}
          />
          Chế độ bảo trì
        </label>
      </div>
      {generalSettings.maintenanceMode && (
        <>
          <div className="form-group">
            <label>Thông báo bảo trì (Tiếng Việt)</label>
            <textarea
              value={generalSettings.maintenanceMessageVi}
              onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'maintenanceMessageVi', e.target.value)}
              placeholder="Nhập thông báo bảo trì"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Maintenance Message (English)</label>
            <textarea
              value={generalSettings.maintenanceMessageEn}
              onChange={(e) => handleInputChange(generalSettings, setGeneralSettings, 'maintenanceMessageEn', e.target.value)}
              placeholder="Enter maintenance message"
              rows="3"
            />
          </div>
        </>
      )}
      <button 
        className="btn btn-primary" 
        onClick={() => handleSave('general')}
        disabled={saving}
      >
        {saving ? 'Đang lưu...' : 'Lưu cấu hình chung'}
      </button>
    </div>
  );

  const renderCompanyInfo = () => (
    <div className="settings-section">
      <h3>Thông tin công ty</h3>
      <div className="form-group">
        <label>Tên công ty (Tiếng Việt)</label>
        <input
          type="text"
          value={companyInfo.companyNameVi}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyNameVi', e.target.value)}
          placeholder="Nhập tên công ty"
        />
      </div>
      <div className="form-group">
        <label>Company Name (English)</label>
        <input
          type="text"
          value={companyInfo.companyNameEn}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyNameEn', e.target.value)}
          placeholder="Enter company name"
        />
      </div>
      <div className="form-group">
        <label>Địa chỉ (Tiếng Việt)</label>
        <textarea
          value={companyInfo.companyAddressVi}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyAddressVi', e.target.value)}
          placeholder="Nhập địa chỉ công ty"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Address (English)</label>
        <textarea
          value={companyInfo.companyAddressEn}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyAddressEn', e.target.value)}
          placeholder="Enter company address"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Số điện thoại</label>
        <input
          type="text"
          value={companyInfo.companyPhone}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyPhone', e.target.value)}
          placeholder="Nhập số điện thoại"
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={companyInfo.companyEmail}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyEmail', e.target.value)}
          placeholder="Nhập email công ty"
        />
      </div>
      <div className="form-group">
        <label>Website</label>
        <input
          type="url"
          value={companyInfo.companyWebsite}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyWebsite', e.target.value)}
          placeholder="Nhập URL website"
        />
      </div>
      <div className="form-group">
        <label>Mã số thuế</label>
        <input
          type="text"
          value={companyInfo.companyTaxCode}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyTaxCode', e.target.value)}
          placeholder="Nhập mã số thuế"
        />
      </div>
      <div className="form-group">
        <label>Giấy phép kinh doanh</label>
        <input
          type="text"
          value={companyInfo.companyLicense}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyLicense', e.target.value)}
          placeholder="Nhập số giấy phép"
        />
      </div>
      <div className="form-group">
        <label>Mô tả công ty (Tiếng Việt)</label>
        <textarea
          value={companyInfo.companyDescriptionVi}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyDescriptionVi', e.target.value)}
          placeholder="Nhập mô tả công ty"
          rows="4"
        />
      </div>
      <div className="form-group">
        <label>Company Description (English)</label>
        <textarea
          value={companyInfo.companyDescriptionEn}
          onChange={(e) => handleInputChange(companyInfo, setCompanyInfo, 'companyDescriptionEn', e.target.value)}
          placeholder="Enter company description"
          rows="4"
        />
      </div>
      <button 
        className="btn btn-primary" 
        onClick={() => handleSave('company')}
        disabled={saving}
      >
        {saving ? 'Đang lưu...' : 'Lưu thông tin công ty'}
      </button>
    </div>
  );

  const renderContactSettings = () => (
    <div className="settings-section">
      <h3>Cấu hình liên hệ</h3>
      <div className="form-group">
        <label>Email liên hệ</label>
        <input
          type="email"
          value={contactSettings.contactEmail}
          onChange={(e) => handleInputChange(contactSettings, setContactSettings, 'contactEmail', e.target.value)}
          placeholder="Nhập email liên hệ"
        />
      </div>
      <div className="form-group">
        <label>Email hỗ trợ</label>
        <input
          type="email"
          value={contactSettings.supportEmail}
          onChange={(e) => handleInputChange(contactSettings, setContactSettings, 'supportEmail', e.target.value)}
          placeholder="Nhập email hỗ trợ"
        />
      </div>
      <div className="form-group">
        <label>Email kinh doanh</label>
        <input
          type="email"
          value={contactSettings.salesEmail}
          onChange={(e) => handleInputChange(contactSettings, setContactSettings, 'salesEmail', e.target.value)}
          placeholder="Nhập email kinh doanh"
        />
      </div>
      <div className="form-group">
        <label>Số điện thoại liên hệ</label>
        <input
          type="text"
          value={contactSettings.contactPhone}
          onChange={(e) => handleInputChange(contactSettings, setContactSettings, 'contactPhone', e.target.value)}
          placeholder="Nhập số điện thoại"
        />
      </div>
      <div className="form-group">
        <label>Địa chỉ liên hệ (Tiếng Việt)</label>
        <textarea
          value={contactSettings.contactAddressVi}
          onChange={(e) => handleInputChange(contactSettings, setContactSettings, 'contactAddressVi', e.target.value)}
          placeholder="Nhập địa chỉ liên hệ"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Contact Address (English)</label>
        <textarea
          value={contactSettings.contactAddressEn}
          onChange={(e) => handleInputChange(contactSettings, setContactSettings, 'contactAddressEn', e.target.value)}
          placeholder="Enter contact address"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Giờ làm việc (Tiếng Việt)</label>
        <input
          type="text"
          value={contactSettings.workingHoursVi}
          onChange={(e) => handleInputChange(contactSettings, setContactSettings, 'workingHoursVi', e.target.value)}
          placeholder="Nhập giờ làm việc"
        />
      </div>
      <div className="form-group">
        <label>Working Hours (English)</label>
        <input
          type="text"
          value={contactSettings.workingHoursEn}
          onChange={(e) => handleInputChange(contactSettings, setContactSettings, 'workingHoursEn', e.target.value)}
          placeholder="Enter working hours"
        />
      </div>
      <div className="form-group">
        <label>Embed Google Maps</label>
        <textarea
          value={contactSettings.mapEmbed}
          onChange={(e) => handleInputChange(contactSettings, setContactSettings, 'mapEmbed', e.target.value)}
          placeholder="Nhập mã embed Google Maps"
          rows="4"
        />
      </div>
      <button 
        className="btn btn-primary" 
        onClick={() => handleSave('contact')}
        disabled={saving}
      >
        {saving ? 'Đang lưu...' : 'Lưu cấu hình liên hệ'}
      </button>
    </div>
  );

  const renderSeoSettings = () => (
    <div className="settings-section">
      <h3>Cấu hình SEO</h3>
      <div className="form-group">
        <label>Google Analytics ID</label>
        <input
          type="text"
          value={seoSettings.googleAnalytics}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'googleAnalytics', e.target.value)}
          placeholder="Nhập Google Analytics ID"
        />
      </div>
      <div className="form-group">
        <label>Google Tag Manager ID</label>
        <input
          type="text"
          value={seoSettings.googleTagManager}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'googleTagManager', e.target.value)}
          placeholder="Nhập Google Tag Manager ID"
        />
      </div>
      <div className="form-group">
        <label>Facebook Pixel ID</label>
        <input
          type="text"
          value={seoSettings.facebookPixel}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'facebookPixel', e.target.value)}
          placeholder="Nhập Facebook Pixel ID"
        />
      </div>
      <div className="form-group">
        <label>Meta Title (Tiếng Việt)</label>
        <input
          type="text"
          value={seoSettings.metaTitleVi}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'metaTitleVi', e.target.value)}
          placeholder="Nhập meta title"
        />
      </div>
      <div className="form-group">
        <label>Meta Title (English)</label>
        <input
          type="text"
          value={seoSettings.metaTitleEn}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'metaTitleEn', e.target.value)}
          placeholder="Enter meta title"
        />
      </div>
      <div className="form-group">
        <label>Meta Description (Tiếng Việt)</label>
        <textarea
          value={seoSettings.metaDescriptionVi}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'metaDescriptionVi', e.target.value)}
          placeholder="Nhập meta description"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Meta Description (English)</label>
        <textarea
          value={seoSettings.metaDescriptionEn}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'metaDescriptionEn', e.target.value)}
          placeholder="Enter meta description"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Open Graph Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'ogImage', e.target.files[0])}
        />
      </div>
      <div className="form-group">
        <label>Twitter Card Type</label>
        <select
          value={seoSettings.twitterCard}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'twitterCard', e.target.value)}
        >
          <option value="summary">Summary</option>
          <option value="summary_large_image">Summary Large Image</option>
          <option value="app">App</option>
          <option value="player">Player</option>
        </select>
      </div>
      <div className="form-group">
        <label>Robots.txt</label>
        <textarea
          value={seoSettings.robotsTxt}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'robotsTxt', e.target.value)}
          placeholder="Nhập nội dung robots.txt"
          rows="6"
        />
      </div>
      <div className="form-group">
        <label>Sitemap URL</label>
        <input
          type="url"
          value={seoSettings.sitemapUrl}
          onChange={(e) => handleInputChange(seoSettings, setSeoSettings, 'sitemapUrl', e.target.value)}
          placeholder="Nhập URL sitemap"
        />
      </div>
      <button 
        className="btn btn-primary" 
        onClick={() => handleSave('seo')}
        disabled={saving}
      >
        {saving ? 'Đang lưu...' : 'Lưu cấu hình SEO'}
      </button>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="settings-section">
      <h3>Cấu hình Email</h3>
      <div className="form-group">
        <label>SMTP Host</label>
        <input
          type="text"
          value={emailSettings.smtpHost}
          onChange={(e) => handleInputChange(emailSettings, setEmailSettings, 'smtpHost', e.target.value)}
          placeholder="Nhập SMTP host"
        />
      </div>
      <div className="form-group">
        <label>SMTP Port</label>
        <input
          type="number"
          value={emailSettings.smtpPort}
          onChange={(e) => handleInputChange(emailSettings, setEmailSettings, 'smtpPort', e.target.value)}
          placeholder="Nhập SMTP port"
        />
      </div>
      <div className="form-group">
        <label>SMTP Username</label>
        <input
          type="text"
          value={emailSettings.smtpUsername}
          onChange={(e) => handleInputChange(emailSettings, setEmailSettings, 'smtpUsername', e.target.value)}
          placeholder="Nhập SMTP username"
        />
      </div>
      <div className="form-group">
        <label>SMTP Password</label>
        <input
          type="password"
          value={emailSettings.smtpPassword}
          onChange={(e) => handleInputChange(emailSettings, setEmailSettings, 'smtpPassword', e.target.value)}
          placeholder="Nhập SMTP password"
        />
      </div>
      <div className="form-group">
        <label>SMTP Encryption</label>
        <select
          value={emailSettings.smtpEncryption}
          onChange={(e) => handleInputChange(emailSettings, setEmailSettings, 'smtpEncryption', e.target.value)}
        >
          <option value="tls">TLS</option>
          <option value="ssl">SSL</option>
          <option value="none">None</option>
        </select>
      </div>
      <div className="form-group">
        <label>From Name</label>
        <input
          type="text"
          value={emailSettings.fromName}
          onChange={(e) => handleInputChange(emailSettings, setEmailSettings, 'fromName', e.target.value)}
          placeholder="Nhập tên người gửi"
        />
      </div>
      <div className="form-group">
        <label>From Email</label>
        <input
          type="email"
          value={emailSettings.fromEmail}
          onChange={(e) => handleInputChange(emailSettings, setEmailSettings, 'fromEmail', e.target.value)}
          placeholder="Nhập email người gửi"
        />
      </div>
      <div className="form-group">
        <label>Reply To Email</label>
        <input
          type="email"
          value={emailSettings.replyToEmail}
          onChange={(e) => handleInputChange(emailSettings, setEmailSettings, 'replyToEmail', e.target.value)}
          placeholder="Nhập email reply to"
        />
      </div>
      <button 
        className="btn btn-primary" 
        onClick={() => handleSave('email')}
        disabled={saving}
      >
        {saving ? 'Đang lưu...' : 'Lưu cấu hình Email'}
      </button>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="settings-section">
      <h3>Mạng xã hội</h3>
      <div className="form-group">
        <label>Facebook URL</label>
        <input
          type="url"
          value={socialSettings.facebookUrl}
          onChange={(e) => handleInputChange(socialSettings, setSocialSettings, 'facebookUrl', e.target.value)}
          placeholder="Nhập URL Facebook"
        />
      </div>
      <div className="form-group">
        <label>Twitter URL</label>
        <input
          type="url"
          value={socialSettings.twitterUrl}
          onChange={(e) => handleInputChange(socialSettings, setSocialSettings, 'twitterUrl', e.target.value)}
          placeholder="Nhập URL Twitter"
        />
      </div>
      <div className="form-group">
        <label>LinkedIn URL</label>
        <input
          type="url"
          value={socialSettings.linkedinUrl}
          onChange={(e) => handleInputChange(socialSettings, setSocialSettings, 'linkedinUrl', e.target.value)}
          placeholder="Nhập URL LinkedIn"
        />
      </div>
      <div className="form-group">
        <label>YouTube URL</label>
        <input
          type="url"
          value={socialSettings.youtubeUrl}
          onChange={(e) => handleInputChange(socialSettings, setSocialSettings, 'youtubeUrl', e.target.value)}
          placeholder="Nhập URL YouTube"
        />
      </div>
      <div className="form-group">
        <label>Instagram URL</label>
        <input
          type="url"
          value={socialSettings.instagramUrl}
          onChange={(e) => handleInputChange(socialSettings, setSocialSettings, 'instagramUrl', e.target.value)}
          placeholder="Nhập URL Instagram"
        />
      </div>
      <button 
        className="btn btn-primary" 
        onClick={() => handleSave('social')}
        disabled={saving}
      >
        {saving ? 'Đang lưu...' : 'Lưu cấu hình mạng xã hội'}
      </button>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="system-settings">
      <div className="page-header">
        <h1>Cài đặt hệ thống</h1>
      </div>

      <div className="settings-container">
        <div className="settings-tabs">
          <button
            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <i className="bi bi-gear"></i>
            Cấu hình chung
          </button>
          <button
            className={`tab-button ${activeTab === 'company' ? 'active' : ''}`}
            onClick={() => setActiveTab('company')}
          >
            <i className="bi bi-building"></i>
            Thông tin công ty
          </button>
          <button
            className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <i className="bi bi-telephone"></i>
            Liên hệ
          </button>
          <button
            className={`tab-button ${activeTab === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            <i className="bi bi-search"></i>
            SEO
          </button>
          <button
            className={`tab-button ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            <i className="bi bi-envelope"></i>
            Email
          </button>
          <button
            className={`tab-button ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <i className="bi bi-share"></i>
            Mạng xã hội
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'company' && renderCompanyInfo()}
          {activeTab === 'contact' && renderContactSettings()}
          {activeTab === 'seo' && renderSeoSettings()}
          {activeTab === 'email' && renderEmailSettings()}
          {activeTab === 'social' && renderSocialSettings()}
        </div>
      </div>

      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default SystemSettings; 
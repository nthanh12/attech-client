import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import clientDocumentService from '../../../../services/clientDocumentService';
import { getApiUrl } from '../../../../config/apiConfig';
import "./Financial.css";

const FinancialReportRow = ({ item, t, onViewDocument }) => {
  const handleViewClick = async () => {
    await onViewDocument(item.slug);
  };

  return (
    <tr>
      <td>
        <div className="report-title">{item.title}</div>
        <div className="report-desc">{item.description}</div>
      </td>
      <td>
        <span className="report-date">{item.date}</span>
      </td>
      <td>
        <button 
          onClick={handleViewClick}
          style={{
            padding: '6px 16px', 
            border: 'none', 
            background: '#1976d2', 
            color: '#fff', 
            borderRadius: 4, 
            cursor: 'pointer', 
            fontSize: 14,
            marginRight: 8
          }}
        >
          <i className="fa fa-eye" style={{marginRight: 6}}></i>
          Xem
        </button>
        <button 
          onClick={handleViewClick}
          style={{
            padding: '6px 16px', 
            border: '1px solid #1976d2', 
            background: '#fff', 
            color: '#1976d2', 
            borderRadius: 4, 
            cursor: 'pointer', 
            fontSize: 14
          }}
        >
          <i className="fa fa-download" style={{marginRight: 6}}></i>
          Tải xuống
        </button>
      </td>
    </tr>
  );
};

const Financial = () => {
  const { t } = useTranslation();
  const [financialReports, setFinancialReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleViewDocument = async (slug) => {
    try {
      console.log('📄 Fetching document details for slug:', slug);
      const response = await clientDocumentService.getDocumentBySlug(slug);
      
      if (response.success && response.data) {
        console.log('📄 Document details:', response.data);
        
        // Handle multiple files
        if (response.data.documents && response.data.documents.length > 0) {
          if (response.data.documents.length === 1) {
            // Chỉ 1 file → mở luôn
            const file = response.data.documents[0];
            const fullUrl = getApiUrl(file.url);
            window.open(fullUrl, '_blank');
          } else {
            // Nhiều files → show modal cho user chọn
            setSelectedFiles(response.data.documents);
            setShowFileModal(true);
          }
        } else {
          alert('Tài liệu này chưa có file đính kèm');
        }
      } else {
        alert('Không thể tải tài liệu');
      }
    } catch (error) {
      console.error('Error viewing document:', error);
      alert('Có lỗi xảy ra khi tải tài liệu');
    }
  };

  useEffect(() => {
    const fetchFinancialReports = async () => {
      try {
        setLoading(true);
        const response = await clientDocumentService.getDocuments({
          pageSize: 50,
          sortBy: 'timePosted',
          sortDirection: 'desc'
        });
        
        console.log('📋 API Response:', response);
        
        if (response.success && response.data && response.data.items) {
          const transformedReports = response.data.items.map(item => ({
            id: item.id,
            title: item.titleVi || item.titleEn || item.title,
            description: item.descriptionVi || item.descriptionEn || item.description,
            date: item.timePosted ? new Date(item.timePosted).toLocaleDateString('vi-VN') : '',
            slug: item.slugVi || item.slugEn,
            file: null // Will be loaded when user clicks view/download
          }));
          
          console.log('📊 Transformed reports:', transformedReports);
          setFinancialReports(transformedReports);
        } else {
          console.error('❌ API response error:', response);
          setError(response.message || 'Không thể tải dữ liệu báo cáo tài chính');
        }
      } catch (err) {
        console.error('Error fetching financial reports:', err);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFinancialReports();
  }, []);

  if (loading) {
    return (
      <div className="financial-page">
        <div className="financial-header">
          <i className="fa fa-bar-chart" style={{fontSize: 32, color: '#1976d2', marginRight: 18}} />
          <div>
            <h1>{t('frontend.companyInfo.financial.title')}</h1>
            <p className="financial-desc">
              {t('frontend.companyInfo.financial.description')}
            </p>
          </div>
        </div>
        <div className="financial-info" style={{textAlign: 'center', padding: 32}}>
          <i className="fa fa-spinner fa-spin" style={{fontSize: 24, color: '#1976d2'}}></i>
          <p style={{marginTop: 16, color: '#666'}}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="financial-page">
        <div className="financial-header">
          <i className="fa fa-bar-chart" style={{fontSize: 32, color: '#1976d2', marginRight: 18}} />
          <div>
            <h1>{t('frontend.companyInfo.financial.title')}</h1>
            <p className="financial-desc">
              {t('frontend.companyInfo.financial.description')}
            </p>
          </div>
        </div>
        <div className="financial-info" style={{textAlign: 'center', padding: 32}}>
          <i className="fa fa-exclamation-triangle" style={{fontSize: 24, color: '#d32f2f'}}></i>
          <p style={{marginTop: 16, color: '#d32f2f'}}>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
  <div className="financial-page">
    <div className="financial-header">
      <i className="fa fa-bar-chart" style={{fontSize: 32, color: '#1976d2', marginRight: 18}} />
      <div>
        <h1>{t('frontend.companyInfo.financial.title')}</h1>
        <p className="financial-desc">
          {t('frontend.companyInfo.financial.description')}
        </p>
      </div>
    </div>
    <div className="financial-info">
      <table className="financial-table">
        <thead>
          <tr>
            <th>{t('frontend.companyInfo.financial.tableHeaders.title')}</th>
            <th>{t('frontend.companyInfo.financial.tableHeaders.date')}</th>
            <th>{t('frontend.companyInfo.financial.tableHeaders.document')}</th>
          </tr>
        </thead>
        <tbody>
          {financialReports.length === 0 ? (
            <tr>
              <td colSpan={3} style={{textAlign: 'center', color: '#888', padding: 32}}>
                {t('frontend.companyInfo.financial.noReports')}
              </td>
            </tr>
          ) : (
            financialReports.map((item, idx) => (
              <FinancialReportRow item={item} key={idx} t={t} onViewDocument={handleViewDocument} />
            ))
          )}
        </tbody>
      </table>
    </div>
    
    {/* File Selection Modal */}
    {showFileModal && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: '#fff',
          padding: '24px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '70%',
          overflow: 'auto'
        }}>
          <h3 style={{marginTop: 0, marginBottom: 16}}>Chọn tài liệu để xem</h3>
          <div>
            {selectedFiles.map((file, idx) => (
              <div key={idx} style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onClick={() => {
                const fullUrl = getApiUrl(file.url);
                window.open(fullUrl, '_blank');
                setShowFileModal(false);
              }}>
                <div>
                  <div style={{fontWeight: 'bold', marginBottom: 4}}>
                    {file.originalFileName}
                  </div>
                  <div style={{fontSize: 12, color: '#666'}}>
                    {file.contentType} • {(file.fileSize / 1024).toFixed(0)} KB
                  </div>
                </div>
                <i className="fa fa-external-link" style={{color: '#1976d2'}}></i>
              </div>
            ))}
          </div>
          <div style={{textAlign: 'center', marginTop: 16}}>
            <button 
              onClick={() => setShowFileModal(false)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                background: '#fff',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Financial;

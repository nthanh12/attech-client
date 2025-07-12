import React, { useState, useEffect } from 'react';
import { getNews, createNews, updateNews, deleteNews, getNewsCategories } from '../../../api';
import { generateSlug, validateSlug } from '../../../utils/slugGenerator';
import DataTable from '../../components/DataTable/DataTable';
import FormModal from '../../components/FormModal/FormModal';
import ToastMessage from '../../components/ToastMessage/ToastMessage';
import './NewsManagement.css';

const NewsManagement = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNews, setCurrentNews] = useState({
    title: '',
    slug: '',
    category: '',
    content: '',
    summary: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [newsResponse, categoriesResponse] = await Promise.all([
        getNews(),
        getNewsCategories()
      ]);
      
      if (newsResponse.success) {
        setNews(newsResponse.data);
      }
      
      if (categoriesResponse.success) {
        setCategories(categoriesResponse.data);
      }
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi tải dữ liệu', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentNews({
      title: '',
      slug: '',
      category: '',
      content: '',
      summary: '',
      image: '',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
    setShowModal(true);
  };

  const handleEdit = (newsItem) => {
    setEditMode(true);
    setCurrentNews(newsItem);
    setErrors({});
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
      try {
        const response = await deleteNews(id);
        if (response.success) {
          setToast({ show: true, message: 'Xóa tin tức thành công', type: 'success' });
          fetchData();
        } else {
          setToast({ show: true, message: 'Lỗi khi xóa tin tức', type: 'error' });
        }
      } catch (error) {
        setToast({ show: true, message: 'Lỗi khi xóa tin tức', type: 'error' });
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentNews({
      title: '',
      slug: '',
      category: '',
      content: '',
      summary: '',
      image: '',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!currentNews.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    }
    
    if (!currentNews.slug.trim()) {
      newErrors.slug = 'Slug là bắt buộc';
    } else if (!validateSlug(currentNews.slug)) {
      newErrors.slug = 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang';
    }

    if (!currentNews.category) {
      newErrors.category = 'Danh mục là bắt buộc';
    }

    if (!currentNews.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    }

    if (!currentNews.summary.trim()) {
      newErrors.summary = 'Tóm tắt là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      let response;
      if (editMode) {
        response = await updateNews(currentNews);
      } else {
        response = await createNews(currentNews);
      }

      if (response.success) {
        setToast({ 
          show: true, 
          message: editMode ? 'Cập nhật tin tức thành công' : 'Thêm tin tức thành công', 
          type: 'success' 
        });
        handleCloseModal();
        fetchData();
      } else {
        setToast({ show: true, message: 'Lỗi khi lưu tin tức', type: 'error' });
      }
    } catch (error) {
      setToast({ show: true, message: 'Lỗi khi lưu tin tức', type: 'error' });
    }
  };

  const handleInputChange = (field, value) => {
    setCurrentNews(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTitleChange = (value) => {
    handleInputChange('title', value);
    // Tự động tạo slug từ tiêu đề
    if (!editMode || !currentNews.slug) {
      handleInputChange('slug', generateSlug(value));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getCategoryName = (categorySlug) => {
    const category = categories.find(cat => cat.slug === categorySlug);
    return category ? category.name : categorySlug;
  };

  const columns = [
    { key: 'id', label: 'ID', width: '80px' },
    { 
      key: 'title', 
      label: 'Tiêu đề', 
      width: '300px',
      render: (item) => (
        <div className="news-title">
          <div className="title-text">{item.title}</div>
          <div className="slug-text">/{item.slug}</div>
        </div>
      )
    },
    { 
      key: 'category', 
      label: 'Danh mục', 
      width: '150px',
      render: (item) => getCategoryName(item.category)
    },
    { 
      key: 'date', 
      label: 'Ngày đăng', 
      width: '120px',
      render: (item) => formatDate(item.date)
    },
    {
      key: 'actions',
      label: 'Thao tác',
      width: '150px',
      render: (item) => (
        <div className="action-buttons">
          <button
            className="btn-edit"
            onClick={() => handleEdit(item)}
            title="Sửa"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn-delete"
            onClick={() => handleDelete(item.id)}
            title="Xóa"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="news-management">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-management">
      <div className="page-header">
        <h1>Quản lý tin tức</h1>
        <button className="btn-add" onClick={handleAddNew}>
          <i className="bi bi-plus"></i>
          Thêm tin tức mới
        </button>
      </div>

      <div className="content">
        <DataTable
          data={news}
          columns={columns}
          loading={loading}
          emptyMessage="Chưa có tin tức nào"
        />
      </div>

      <FormModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editMode ? 'Sửa tin tức' : 'Thêm tin tức mới'}
        onSubmit={handleSubmit}
        fields={[
          {
            name: "title",
            label: "Tiêu đề *",
            type: "text",
            required: true,
            value: currentNews.title,
            onChange: (value) => handleTitleChange(value),
            error: errors.title,
          },
          {
            name: "slug",
            label: "Slug *",
            type: "text",
            required: true,
            value: currentNews.slug,
            onChange: (value) => handleInputChange('slug', value),
            error: errors.slug,
            helpText: "URL-friendly version của tiêu đề"
          },
          {
            name: "category",
            label: "Danh mục *",
            type: "select",
            required: true,
            value: currentNews.category,
            onChange: (value) => handleInputChange('category', value),
            error: errors.category,
            options: categories.map(cat => ({ value: cat.slug, label: cat.name }))
          },
          {
            name: "date",
            label: "Ngày đăng *",
            type: "date",
            required: true,
            value: currentNews.date,
            onChange: (value) => handleInputChange('date', value),
            error: errors.date,
          },
          {
            name: "image",
            label: "URL hình ảnh",
            type: "text",
            value: currentNews.image,
            onChange: (value) => handleInputChange('image', value),
            error: errors.image,
          },
          {
            name: "summary",
            label: "Tóm tắt *",
            type: "textarea",
            required: true,
            value: currentNews.summary,
            onChange: (value) => handleInputChange('summary', value),
            error: errors.summary,
            rows: 3
          },
          {
            name: "content",
            label: "Nội dung *",
            type: "textarea",
            required: true,
            value: currentNews.content,
            onChange: (value) => handleInputChange('content', value),
            error: errors.content,
            rows: 8
          }
        ]}
      />

      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default NewsManagement; 
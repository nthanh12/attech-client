// Mock data cho media management
export const mockMedia = [
  {
    id: 1,
    name: 'company-logo.png',
    type: 'image',
    size: 245760,
    url: 'https://picsum.photos/300/200?random=1',
    thumbnail: 'https://picsum.photos/150/100?random=1',
    uploadedAt: '2024-01-15T10:30:00Z',
    uploadedBy: 'admin',
    description: 'Logo công ty chính thức',
    tags: ['logo', 'branding', 'company']
  },
  {
    id: 2,
    name: 'product-catalog.pdf',
    type: 'document',
    size: 1048576,
    url: '/files/product-catalog.pdf',
    thumbnail: '/icons/pdf-icon.png',
    uploadedAt: '2024-01-14T15:20:00Z',
    uploadedBy: 'editor1',
    description: 'Catalog sản phẩm 2024',
    tags: ['catalog', 'products', '2024']
  },
  {
    id: 3,
    name: 'office-building.jpg',
    type: 'image',
    size: 512000,
    url: 'https://picsum.photos/300/200?random=2',
    thumbnail: 'https://picsum.photos/150/100?random=2',
    uploadedAt: '2024-01-13T09:15:00Z',
    uploadedBy: 'author1',
    description: 'Hình ảnh tòa nhà văn phòng',
    tags: ['office', 'building', 'company']
  },
  {
    id: 4,
    name: 'presentation.pptx',
    type: 'document',
    size: 2097152,
    url: '/files/presentation.pptx',
    thumbnail: '/icons/ppt-icon.png',
    uploadedAt: '2024-01-12T14:45:00Z',
    uploadedBy: 'admin',
    description: 'Thuyết trình dự án CNS/ATM',
    tags: ['presentation', 'project', 'CNS']
  },
  {
    id: 5,
    name: 'team-photo.jpg',
    type: 'image',
    size: 768000,
    url: 'https://picsum.photos/300/200?random=3',
    thumbnail: 'https://picsum.photos/150/100?random=3',
    uploadedAt: '2024-01-11T11:30:00Z',
    uploadedBy: 'editor1',
    description: 'Ảnh tập thể nhân viên',
    tags: ['team', 'staff', 'company']
  },
  {
    id: 6,
    name: 'technical-specs.docx',
    type: 'document',
    size: 1536000,
    url: '/files/technical-specs.docx',
    thumbnail: '/icons/doc-icon.png',
    uploadedAt: '2024-01-10T16:20:00Z',
    uploadedBy: 'author1',
    description: 'Thông số kỹ thuật thiết bị',
    tags: ['technical', 'specs', 'equipment']
  },
  {
    id: 7,
    name: 'company-video.mp4',
    type: 'video',
    size: 52428800,
    url: '/files/company-video.mp4',
    thumbnail: '/icons/video-icon.png',
    uploadedAt: '2024-01-09T13:10:00Z',
    uploadedBy: 'admin',
    description: 'Video giới thiệu công ty',
    tags: ['video', 'company', 'introduction']
  },
  {
    id: 8,
    name: 'product-manual.pdf',
    type: 'document',
    size: 3145728,
    url: '/files/product-manual.pdf',
    thumbnail: '/icons/pdf-icon.png',
    uploadedAt: '2024-01-08T10:45:00Z',
    uploadedBy: 'editor1',
    description: 'Hướng dẫn sử dụng sản phẩm',
    tags: ['manual', 'product', 'guide']
  },
  {
    id: 9,
    name: 'banner-homepage.jpg',
    type: 'image',
    size: 1024000,
    url: 'https://picsum.photos/300/200?random=4',
    thumbnail: 'https://picsum.photos/150/100?random=4',
    uploadedAt: '2024-01-07T16:30:00Z',
    uploadedBy: 'author1',
    description: 'Banner trang chủ website',
    tags: ['banner', 'homepage', 'website']
  },
  {
    id: 10,
    name: 'financial-report.xlsx',
    type: 'document',
    size: 2048576,
    url: '/files/financial-report.xlsx',
    thumbnail: '/icons/excel-icon.png',
    uploadedAt: '2024-01-06T14:20:00Z',
    uploadedBy: 'admin',
    description: 'Báo cáo tài chính quý IV',
    tags: ['financial', 'report', 'quarterly']
  },
  {
    id: 11,
    name: 'company-audio.mp3',
    type: 'audio',
    size: 8192000,
    url: '/files/company-audio.mp3',
    thumbnail: '/icons/audio-icon.png',
    uploadedAt: '2024-01-05T11:15:00Z',
    uploadedBy: 'editor1',
    description: 'Audio giới thiệu công ty',
    tags: ['audio', 'company', 'introduction']
  },
  {
    id: 12,
    name: 'product-gallery.jpg',
    type: 'image',
    size: 1536000,
    url: 'https://picsum.photos/300/200?random=5',
    thumbnail: 'https://picsum.photos/150/100?random=5',
    uploadedAt: '2024-01-04T09:45:00Z',
    uploadedBy: 'author1',
    description: 'Thư viện hình ảnh sản phẩm',
    tags: ['gallery', 'products', 'images']
  }
];

// Utility functions for media management
export const getMediaByType = (type) => {
  return mockMedia.filter(item => item.type === type);
};

export const getMediaByUploader = (uploader) => {
  return mockMedia.filter(item => item.uploadedBy === uploader);
};

export const getMediaByTag = (tag) => {
  return mockMedia.filter(item => item.tags.includes(tag));
};

export const getMediaStats = () => {
  const totalFiles = mockMedia.length;
  const totalSize = mockMedia.reduce((sum, item) => sum + item.size, 0);
  const typeStats = mockMedia.reduce((stats, item) => {
    stats[item.type] = (stats[item.type] || 0) + 1;
    return stats;
  }, {});
  const uploaderStats = mockMedia.reduce((stats, item) => {
    stats[item.uploadedBy] = (stats[item.uploadedBy] || 0) + 1;
    return stats;
  }, {});

  return {
    totalFiles,
    totalSize,
    typeStats,
    uploaderStats
  };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (type) => {
  switch (type) {
    case 'image':
      return 'bi bi-image';
    case 'document':
      return 'bi bi-file-text';
    case 'video':
      return 'bi bi-camera-video';
    case 'audio':
      return 'bi bi-music-note';
    default:
      return 'bi bi-file';
  }
}; 
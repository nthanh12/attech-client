import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import "./ContactDirectory.css";

const ContactDirectory = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Mock data - sau này sẽ thay bằng API call
  const mockContacts = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      position: "Giám đốc",
      department: "Ban Giám đốc",
      phone: "0123456789",
      email: "nguyenvana@attech.vn",
      extension: "101",
    },
    {
      id: 2,
      name: "Trần Thị B",
      position: "Phó Giám đốc",
      department: "Ban Giám đốc",
      phone: "0123456788",
      email: "tranthib@attech.vn",
      extension: "102",
    },
    {
      id: 3,
      name: "Lê Văn C",
      position: "Trưởng phòng",
      department: "Phòng Nhân sự",
      phone: "0123456787",
      email: "levanc@attech.vn",
      extension: "201",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      position: "Chuyên viên",
      department: "Phòng Nhân sự",
      phone: "0123456786",
      email: "phamthid@attech.vn",
      extension: "202",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      position: "Trưởng phòng",
      department: "Phòng Kỹ thuật",
      phone: "0123456785",
      email: "hoangvane@attech.vn",
      extension: "301",
    },
    {
      id: 6,
      name: "Võ Thị F",
      position: "Kỹ sư",
      department: "Phòng Kỹ thuật",
      phone: "0123456784",
      email: "vothif@attech.vn",
      extension: "302",
    },
  ];

  const departments = [
    "Ban Giám đốc",
    "Phòng Nhân sự",
    "Phòng Kỹ thuật",
    "Phòng Tài chính",
    "Phòng Marketing",
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setContacts(mockContacts);
      setFilteredContacts(mockContacts);
      setLoading(false);
    }, 500);

    document.title = "Danh bạ điện thoại";
  }, []);

  useEffect(() => {
    let filtered = contacts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone.includes(searchTerm) ||
          contact.extension.includes(searchTerm)
      );
    }

    // Filter by department
    if (selectedDepartment) {
      filtered = filtered.filter(
        (contact) => contact.department === selectedDepartment
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, selectedDepartment]);

  const handleCall = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`);
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-layout">
        <div className="dashboard-main">
          <header className="user-dashboard-header">
            <div className="user-header-content">
              <div className="user-header-left">
                <div className="breadcrumb-nav">
                  <button
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => navigate("/trang-noi-bo")}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Dashboard
                  </button>
                  <span className="mx-2 text-muted">/</span>
                  <span className="text-primary">Danh bạ điện thoại</span>
                </div>
                <h1 className="mt-2">Danh bạ điện thoại</h1>
                <p>Thông tin liên hệ nội bộ công ty</p>
              </div>
            </div>
          </header>

          <main className="dashboard-content">
            <div className="contact-directory">
              {/* Search and Filter */}
              <div className="directory-controls">
                <div className="row g-3">
                  <div className="col-md-8">
                    <div className="search-box">
                      <i className="bi bi-search"></i>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo tên, chức vụ, số điện thoại..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="">Tất cả phòng ban</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Directory Content */}
              {loading ? (
                <div className="loading-spinner text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                  </div>
                  <p className="mt-3 text-muted">Đang tải danh bạ...</p>
                </div>
              ) : filteredContacts.length > 0 ? (
                <div className="contacts-grid">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="contact-card">
                      <div className="contact-avatar">
                        <i className="bi bi-person-circle"></i>
                      </div>
                      <div className="contact-info">
                        <h5 className="contact-name">{contact.name}</h5>
                        <p className="contact-position">{contact.position}</p>
                        <p className="contact-department">
                          <i className="bi bi-building me-1"></i>
                          {contact.department}
                        </p>

                        <div className="contact-details">
                          <div className="contact-item">
                            <i className="bi bi-telephone me-2"></i>
                            <span>{contact.phone}</span>
                            <button
                              className="btn btn-sm btn-outline-success ms-2"
                              onClick={() => handleCall(contact.phone)}
                              title="Gọi điện"
                            >
                              <i className="bi bi-telephone"></i>
                            </button>
                          </div>

                          <div className="contact-item">
                            <i className="bi bi-telephone-inbound me-2"></i>
                            <span>Ext: {contact.extension}</span>
                          </div>

                          <div className="contact-item">
                            <i className="bi bi-envelope me-2"></i>
                            <span className="contact-email">
                              {contact.email}
                            </span>
                            <button
                              className="btn btn-sm btn-outline-primary ms-2"
                              onClick={() => handleEmail(contact.email)}
                              title="Gửi email"
                            >
                              <i className="bi bi-envelope"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state text-center py-5">
                  <i className="bi bi-person-x text-muted fs-1"></i>
                  <h4 className="mt-3 text-muted">Không tìm thấy</h4>
                  <p className="text-muted">
                    Không có liên hệ nào phù hợp với tìm kiếm
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ContactDirectory;

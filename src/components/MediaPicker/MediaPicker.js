import React, { useState, useEffect } from "react";
import Modal from "../Shared/UI/Modal";
import { mockMedia } from "../../utils/mockMedia";
import "./MediaPicker.css";

const MediaPicker = ({ show, onClose, onSelect }) => {
  const [media, setMedia] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMedia(mockMedia);
  }, []);

  const filtered = media.filter(item =>
    item.type === "image" && item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal show={show} onClose={onClose} title="Chọn ảnh từ Media" width={800}>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm tên ảnh..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="media-picker-grid">
        {filtered.length === 0 && <div style={{ color: '#888', padding: 24 }}>Không có ảnh phù hợp</div>}
        {filtered.map(item => (
          <img
            key={item.id}
            src={item.thumbnail || item.url}
            alt={item.name}
            className="media-picker-thumb"
            title={item.name}
            onClick={() => { onSelect(item.url); onClose(); }}
          />
        ))}
      </div>
    </Modal>
  );
};

export default MediaPicker; 
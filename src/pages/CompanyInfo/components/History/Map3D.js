import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Map3D = ({ stations = [], selectedStation = null }) => {
  const mountRef = useRef(null);
  const labelGroupRef = useRef(null);
  const markersRef = useRef(new Map()); // Store references to markers
  const [error, setError] = useState(null);
  const [hoveredStation, setHoveredStation] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState(false);

  // Điều chỉnh các giá trị zoom
  const MIN_ZOOM = 500; // Tăng giá trị min zoom
  const MAX_ZOOM = 2500; // Giảm giá trị max zoom
  const INITIAL_ZOOM = 800; // Giá trị zoom mặc định khi mở

  const [zoomLevel, setZoomLevel] = useState(INITIAL_ZOOM);
  const targetZoomRef = useRef(INITIAL_ZOOM);
  const currentZoomRef = useRef(INITIAL_ZOOM);
  const isAnimatingRef = useRef(false);

  // Thêm biến để lưu center offset
  let mapCenter = new THREE.Vector3();

  const stationCoordinates = {
    "Đài DVOR/DME/ADS-B Điện Biên": [21.397, 103.008],
    "Đài DVOR/DME/ADS-B Cát Bi": [20.819, 106.725],
    "Đài DVOR/DME Đầu Tây Nội Bài": [21.221, 105.807],
    "Đài DVOR/DME/ADS-B Nội Bài": [21.221, 105.807],
    "Đài DVOR/DME và NDB Nam Hà": [20.5, 105.9],
    "Đài DVOR/DME/ADS-B Thọ Xuân": [19.901, 105.467],
    "Đài DVOR/DME/ADS-B Vinh": [18.737, 105.671],
    "Đài DVOR/DME Pleiku": [13.974, 108.0],
    "Đài DVOR/DME/ADS-B Đồng Hới": [17.515, 106.591],
    "Đài DVOR/DME Phú Bài": [16.401, 107.703],
    "Đài DVOR/DME/ADS-B Đà Nẵng": [16.043, 108.199],
    "Đài DVOR/DME Chu Lai": [15.403, 108.706],
    "Đài DVOR/DME/ADS-B Cam Ranh": [11.998, 109.219],
    "Đài DVOR/DME Tuy Hòa": [13.049, 109.339],
    "Đài DVOR/DME Phù Cát": [13.955, 109.042],
    "Đài DVOR/DME Buôn Ma Thuột": [12.668, 108.12],
    "Đài DVOR/DME Liên Khương": [11.75, 108.367],
    "Đài CVOR/DME Phan Thiết": [10.933, 108.102],
    "Đài NDB Long Khánh": [10.933, 107.25],
    "Trạm ADS-B Mộc Châu": [20.833, 104.617],
    "Đài DVOR/DME Cần Thơ": [10.085, 105.711],
    "Đài DVOR/DME Phú Quốc": [10.227, 103.967],
    "Đài DVOR/DME Vân Đồn": [21.118, 107.42],
    "Trạm CNS Trường Sa": [8.644, 111.92],
    "Trạm CNS Côn Sơn": [8.678, 106.611],
    "Trạm CNS Cà Mau": [9.176, 105.152],
    "Đài DVOR/DME Tân Sơn Nhất": [10.819, 106.652],
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Clear previous content
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Lấy kích thước container thực tế
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a192f);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.set(0, 0, INITIAL_ZOOM);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Cải thiện hệ thống ánh sáng
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(100, 100, 100);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x7ec5eb, 0.7);
    fillLight.position.set(-100, 50, -100);
    scene.add(fillLight);

    const group = new THREE.Group();
    const markerGroup = new THREE.Group();
    scene.add(group);
    scene.add(markerGroup);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoveredMarker = null;
    let currentMousePosition = { x: 0, y: 0 };
    let previousMousePosition = { x: 0, y: 0 };
    let rotationX = 0;
    let rotationY = 0;
    let isDragging = false;

    const convertCoordinates = (lat, lon) => {
      const scale = 30;
      const x = (lon - 105.5) * scale;
      const y = (lat - 16) * scale;
      return { x, y };
    };

    const createPolygonMesh = (coordinates, group) => {
      const shape = new THREE.Shape();
      coordinates.forEach(([lon, lat], index) => {
        const { x, y } = convertCoordinates(lat, lon);
        if (index === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      });

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 5,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelSegments: 3,
      });

      const material = new THREE.MeshPhongMaterial({
        color: 0x64ffda,
        shininess: 80,
        specular: 0x004d40,
        emissive: 0x1a2f2f,
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    };

    fetch("/vietnam.geojson")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        return res.json();
      })
      .then((geojson) => {
        if (!geojson.features?.length)
          throw new Error("GeoJSON không có dữ liệu");

        geojson.features.forEach((feature) => {
          const { type, coordinates } = feature.geometry;
          if (type === "Polygon") {
            createPolygonMesh(coordinates[0], group);
          } else if (type === "MultiPolygon") {
            coordinates.forEach((polygon) =>
              createPolygonMesh(polygon[0], group)
            );
          }
        });

        const allStations =
          stations.length > 0 ? stations : Object.keys(stationCoordinates);

        // Tạo group riêng cho labels
        labelGroupRef.current = new THREE.Group();
        scene.add(labelGroupRef.current);

        const createTextLabel = (text, position) => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          // Tăng kích thước canvas để text rõ hơn
          canvas.width = 600;
          canvas.height = 160;

          // Vẽ background với gradient và viền
          const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, "rgba(10, 25, 47, 0.95)");
          gradient.addColorStop(1, "rgba(17, 34, 64, 0.95)");
          context.fillStyle = gradient;

          // Vẽ background với góc bo tròn
          const radius = 10;
          context.beginPath();
          context.moveTo(radius, 0);
          context.lineTo(canvas.width - radius, 0);
          context.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
          context.lineTo(canvas.width, canvas.height - radius);
          context.quadraticCurveTo(
            canvas.width,
            canvas.height,
            canvas.width - radius,
            canvas.height
          );
          context.lineTo(radius, canvas.height);
          context.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
          context.lineTo(0, radius);
          context.quadraticCurveTo(0, 0, radius, 0);
          context.closePath();
          context.fill();

          // Thêm viền phát sáng
          context.strokeStyle = "rgba(100, 255, 218, 0.5)";
          context.lineWidth = 2;
          context.stroke();

          // Vẽ text với đổ bóng
          context.font = "bold 52px Arial";
          context.textAlign = "center";
          context.textBaseline = "middle";

          // Thêm đổ bóng cho text
          context.shadowColor = "rgba(0, 0, 0, 0.5)";
          context.shadowBlur = 5;
          context.shadowOffsetX = 2;
          context.shadowOffsetY = 2;

          // Tối ưu tên đài để hiển thị
          const displayText = text.replace("Đài ", "").replace("/ADS-B", "");

          // Vẽ outline cho text
          context.strokeStyle = "rgba(0, 0, 0, 0.8)";
          context.lineWidth = 4;
          context.strokeText(displayText, canvas.width / 2, canvas.height / 2);

          // Vẽ text chính với màu gradient
          const textGradient = context.createLinearGradient(
            0,
            canvas.height / 2 - 20,
            0,
            canvas.height / 2 + 20
          );
          textGradient.addColorStop(0, "#64ffda");
          textGradient.addColorStop(1, "#ffffff");
          context.fillStyle = textGradient;
          context.fillText(displayText, canvas.width / 2, canvas.height / 2);

          const texture = new THREE.CanvasTexture(canvas);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;

          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide,
            depthWrite: false,
          });

          // Tăng kích thước plane và điều chỉnh tỷ lệ
          const aspectRatio = canvas.width / canvas.height;
          const geometry = new THREE.PlaneGeometry(
            50 * aspectRatio,
            50 / aspectRatio
          );
          const label = new THREE.Mesh(geometry, material);
          label.position.set(position.x, position.y + 20, position.z); // Đặt cao hơn một chút
          label.userData = { isLabel: true };

          label.visible = showLabels;
          labelGroupRef.current.add(label);
          return label;
        };

        allStations.forEach((station) => {
          const coords = stationCoordinates[station];
          if (!coords) return;

          const [lat, lon] = coords;
          const { x, y } = convertCoordinates(lat, lon);
          const z = 5;

          // Cải thiện material cho markers
          const markerMaterial = new THREE.MeshPhongMaterial({
            color: 0xff5252,
            shininess: 100,
            specular: 0xff5722,
            emissive: 0xff1744,
            emissiveIntensity: 0.3,
          });

          const marker = new THREE.Mesh(
            new THREE.SphereGeometry(2, 32, 32),
            markerMaterial
          );
          marker.position.set(x, y + 5, z);
          marker.name = station;
          marker.userData = { isMarker: true, originalColor: 0xff5252 };
          markersRef.current.set(station, marker);
          markerGroup.add(marker);

          // Cải thiện material cho poles
          const poleMaterial = new THREE.MeshPhongMaterial({
            color: 0x90caf9,
            shininess: 70,
            specular: 0x64b5f6,
            emissive: 0x1976d2,
            emissiveIntensity: 0.2,
          });

          const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.5, 5, 12),
            poleMaterial
          );
          pole.position.set(x, y + 2.5, z);
          markerGroup.add(pole);

          // Tạo label cho station
          createTextLabel(station, { x, y, z });
        });

        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        group.position.sub(center);
        markerGroup.position.sub(center);
        mapCenter.copy(center); // Lưu lại offset của center

        camera.lookAt(0, 0, 0);
      })
      .catch((err) => {
        console.error("Lỗi khi tải GeoJSON:", err);
        setError(err);
      });

    const animateZoom = () => {
      if (!isAnimatingRef.current) return;

      const diff = targetZoomRef.current - currentZoomRef.current;
      if (Math.abs(diff) < 0.1) {
        currentZoomRef.current = targetZoomRef.current;
        isAnimatingRef.current = false;
      } else {
        currentZoomRef.current += diff * 0.1;
      }

      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.normalize();
      direction.multiplyScalar(-currentZoomRef.current);
      camera.position.copy(direction);

      if (isAnimatingRef.current) {
        requestAnimationFrame(animateZoom);
      }
    };

    const handleWheel = (event) => {
      event.preventDefault();

      const zoomSpeed = 0.05;
      const delta = event.deltaY * zoomSpeed;

      let newZoom;
      if (delta > 0) {
        newZoom = Math.min(
          targetZoomRef.current + Math.abs(delta) * 20,
          MAX_ZOOM
        );
      } else {
        newZoom = Math.max(
          targetZoomRef.current - Math.abs(delta) * 20,
          MIN_ZOOM
        );
      }

      targetZoomRef.current = newZoom;
      setZoomLevel(newZoom);

      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animateZoom();
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (isDragging) {
        const deltaMove = {
          x: currentMousePosition.x - previousMousePosition.x,
          y: currentMousePosition.y - previousMousePosition.y,
        };

        const rotationSpeed = 0.003;
        rotationY -= deltaMove.x * rotationSpeed;
        rotationX -= deltaMove.y * rotationSpeed;
        rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX));

        const radius = currentZoomRef.current;
        camera.position.x = radius * Math.sin(rotationY) * Math.cos(rotationX);
        camera.position.y = radius * Math.sin(rotationX);
        camera.position.z = radius * Math.cos(rotationY) * Math.cos(rotationX);
        camera.lookAt(0, 0, 0);

        previousMousePosition = { ...currentMousePosition };
      }

      // Update labels to face camera and scale based on distance
      if (labelGroupRef.current) {
        labelGroupRef.current.children.forEach((label) => {
          if (label.userData.isLabel) {
            // Luôn quay về phía camera
            label.lookAt(camera.position);

            // Tính toán khoảng cách từ camera đến label
            const distance = camera.position.distanceTo(label.position);

            // Scale label dựa trên khoảng cách
            const baseScale = 1;
            const scaleMultiplier = Math.max(distance / 500, 0.5); // Điều chỉnh scale theo khoảng cách
            label.scale.set(
              baseScale * scaleMultiplier,
              baseScale * scaleMultiplier,
              1
            );
          }
        });
      }

      renderer.render(scene, camera);
    };

    const handleMouseMove = (event) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      setTooltipPosition({ x: event.clientX, y: event.clientY });
      currentMousePosition = { x: event.clientX, y: event.clientY };

      if (isDragging) return;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markerGroup.children);
      const markerIntersect = intersects.find(
        (intersect) => intersect.object.userData.isMarker
      );

      if (
        currentHoveredMarker &&
        currentHoveredMarker !== markerIntersect?.object
      ) {
        currentHoveredMarker.material.color.setHex(
          currentHoveredMarker.userData.originalColor
        );
        currentHoveredMarker.scale.set(1, 1, 1);
        renderer.domElement.style.cursor = isDragging ? "grabbing" : "default";
      }

      if (markerIntersect && !isDragging) {
        const marker = markerIntersect.object;
        if (currentHoveredMarker !== marker) {
          marker.material.color.setHex(0x00ff7f);
          marker.scale.set(1.2, 1.2, 1.2);
          renderer.domElement.style.cursor = "pointer";
          setHoveredStation(marker.name);
        }
        currentHoveredMarker = marker;
      } else {
        if (currentHoveredMarker && !isDragging) {
          renderer.domElement.style.cursor = "default";
          setHoveredStation(null);
          currentHoveredMarker = null;
        }
      }
    };

    const handleMouseDown = (event) => {
      if (event.button === 0) {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
        currentMousePosition = { ...previousMousePosition };
        renderer.domElement.style.cursor = "grabbing";
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = "default";
    };

    animate();

    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("wheel", handleWheel);
    renderer.domElement.addEventListener("contextmenu", (e) =>
      e.preventDefault()
    );

    // Thêm function để toggle labels
    const updateLabelsVisibility = () => {
      if (labelGroupRef.current) {
        labelGroupRef.current.children.forEach((label) => {
          if (label.userData.isLabel) {
            label.visible = showLabels;
          }
        });
      }
    };

    // Watch for showLabels changes
    updateLabelsVisibility();

    // Highlight selected station if exists
    if (selectedStation && markersRef.current.has(selectedStation)) {
      const marker = markersRef.current.get(selectedStation);

      // Dim other markers more significantly
      markersRef.current.forEach((m) => {
        if (m !== marker) {
          m.material.opacity = 0.2;
          m.material.transparent = true;
          m.material.color.setHex(0x666666);
          m.scale.set(0.5, 0.5, 0.5);
          m.material.emissiveIntensity = 0.1;
        }
      });

      // Make selected marker more prominent
      marker.material.opacity = 1;
      marker.material.color.setHex(0xff3333);
      marker.scale.set(2.5, 2.5, 2.5);
      marker.material.emissiveIntensity = 1;

      // Add pulsing effect to selected marker
      const pulseStartTime = Date.now();
      function animateMarkerPulse() {
        const now = Date.now();
        const progress = ((now - pulseStartTime) % 1500) / 1500;
        const scale = 2.5 + Math.sin(progress * Math.PI * 2) * 0.3;

        if (marker.parent) {
          marker.scale.set(scale, scale, scale);
          requestAnimationFrame(animateMarkerPulse);
        }
      }
      animateMarkerPulse();

      // Get actual world position of the marker
      const markerWorldPos = new THREE.Vector3();
      marker.getWorldPosition(markerWorldPos);

      // Calculate camera position
      const coords = stationCoordinates[selectedStation];
      if (coords) {
        // Set up camera animation
        const startPosition = camera.position.clone();
        const targetPosition = markerWorldPos.clone();

        // Position camera above the marker
        const endPosition = markerWorldPos.clone();
        endPosition.z = 200; // Fixed height for consistent zoom level

        const duration = 1000;
        const startTime = Date.now();

        function animateCamera() {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);

          // Simple easing
          const easeProgress = 1 - Math.pow(1 - progress, 3);

          // Update camera position
          camera.position.lerpVectors(startPosition, endPosition, easeProgress);
          camera.lookAt(targetPosition);
          camera.up.set(0, 1, 0);

          if (progress < 1) {
            requestAnimationFrame(animateCamera);
          }
        }

        animateCamera();
      }
    }

    return () => {
      isAnimatingRef.current = false;
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("wheel", handleWheel);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (labelGroupRef.current) {
        labelGroupRef.current.clear();
        labelGroupRef.current = null;
      }
    };
  }, [stations, showLabels, selectedStation]);

  // Update zoom percentage calculation
  const calculateZoomPercentage = (zoom) => {
    return Math.round(((MAX_ZOOM - zoom) / (MAX_ZOOM - MIN_ZOOM)) * 100);
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Toggle Labels Button */}
      <button
        onClick={() => setShowLabels(!showLabels)}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          padding: "8px 16px",
          background: showLabels
            ? "rgba(42, 157, 143, 0.9)"
            : "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "14px",
          zIndex: 2,
          transition: "background-color 0.3s",
        }}
      >
        {showLabels ? "Ẩn tên" : "Hiện tên"}
      </button>

      {error && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "red",
            background: "rgba(0,0,0,0.8)",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 2,
          }}
        >
          Lỗi: {error.message}
        </div>
      )}

      {/* Tooltip */}
      {hoveredStation && (
        <div
          style={{
            position: "fixed",
            left: tooltipPosition.x + 15,
            top: tooltipPosition.y - 10,
            color: "white",
            background: "rgba(0,0,0,0.8)",
            padding: "8px 12px",
            borderRadius: "5px",
            fontSize: "14px",
            pointerEvents: "none",
            zIndex: 2,
            maxWidth: "300px",
            whiteSpace: "nowrap",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
            border: "1px solid #333",
          }}
        >
          <strong>{hoveredStation}</strong>
        </div>
      )}

      {/* Instructions */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "white",
          background: "rgba(10, 25, 47, 0.85)",
          padding: "12px",
          borderRadius: "8px",
          fontSize: "13px",
          zIndex: 2,
          lineHeight: "1.5",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(100, 255, 218, 0.3)",
        }}
      >
        <div>
          <strong>Hướng dẫn:</strong>
        </div>
        <div>• Cuộn chuột: Thu phóng</div>
        <div>• Kéo thả: Xoay bản đồ</div>
        <div>• Hover marker: Xem tên trạm</div>
        <div style={{ marginTop: "8px", fontSize: "11px", opacity: 0.8 }}>
          Zoom: {calculateZoomPercentage(zoomLevel)}%
        </div>
      </div>
    </div>
  );
};

export default Map3D;

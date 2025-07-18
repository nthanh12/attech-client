export const mockProducts = [
  {
    id: 1,
    nameVi: "Hệ thống ADS-B",
    slugVi: "he-thong-ads-b",
    nameEn: "ADS-B System",
    slugEn: "ads-b-system",
    descriptionVi:
      "ADS-B (Automatic Dependent Surveillance - Broadcast) là một giải pháp chi phí thấp thay thế công nghệ radar thông thường, cho phép phi công và kiểm soát viên không lưu “nhìn thấy” và “kiểm soát” hoạt động bay với độ chính xác cao hơn, ADS-B tăng cường khả năng giám sát cao hơn và xa hơn góp phần làm cho việc giám sát hoạt động bay an toàn hơn và sử dụng không phận hiệu quả hơn.",
    descriptionEn:
      "Automatic Dependent Surveillance-Broadcast system with high accuracy...",
    contentVi: `<p><strong>Hệ thống t&iacute;ch hợp dữ liệu c&oacute; chức năng:</strong></p>
<ul>
<li>Hợp nhất c&aacute;c dữ liệu chuẩn ASTERIX CAT 21 từ hệ thống m&aacute;y thu th&agrave;nh một luồng thống nhất.</li>
<li>Chuyển đổi dữ liệu ASTERIX CAT 21 sang dạng y&ecirc;u cầu.</li>
<li>Lọc dữ liệu ASTERIX theo SIC/SAC, Độ cao, V&ugrave;ng địa l&yacute;, Chất lượng bản tin.</li>
<li>Theo d&otilde;i v&agrave; ghi nhật k&yacute; c&aacute;c trạm mặt đất về t&igrave;nh trạng hoạt động của từng trạm.</li>
<li>Li&ecirc;n kết chia sẻ số liệu với c&aacute;c trung t&acirc;m xử l&yacute; kh&aacute;c khi đặt nhiều trung t&acirc;m tại c&aacute;c miền kh&aacute;c nhau.</li>
<li>Bộ hiển thị dữ liệu gi&aacute;m s&aacute;t c&oacute; chức năng:</li>
<li>Nhận, giải m&atilde; th&ocirc;ng tin ADS-B ASTERIX CAT 21 v&agrave; hiển thị dữ liệu gi&aacute;m s&aacute;t v&agrave; chức năng b&aacute;m mục ti&ecirc;u (Tracker and Surveillance Data Display) tr&ecirc;n nền kh&ocirc;ng lưu lựa chọn thời gian thực.</li>
<li>Cảnh b&aacute;o va chạm, bay v&agrave;o khu vực cấm. C&aacute;c th&ocirc;ng b&aacute;o c&oacute; thể bằng &acirc;m thanh, k&yacute; hiệu tr&ecirc;n m&agrave;n h&igrave;nh.</li>
<li>Ấn định m&agrave;u sắc m&aacute;y bay khi bay v&agrave;o v&ugrave;ng FIR thuộc tr&aacute;ch nhiệm xử l&yacute;.</li>
<li>Bộ hiển thị dữ liệu gi&aacute;m s&aacute;t c&oacute; chức năng:</li>
<li>Hợp nhất c&aacute;c dữ liệu chuẩn ASTERIX CAT 21 từ hệ thống m&aacute;y thu th&agrave;nh một luồng thống nhất.</li>
<li>Chuyển đổi dữ liệu ASTERIX CAT 21 sang dạng y&ecirc;u cầu.</li>
<li>Lọc dữ liệu ASTERIX theo SIC/SAC, Độ cao, V&ugrave;ng địa l&yacute;, Chất lượng bản tin.</li>
<li>Theo d&otilde;i v&agrave; ghi nhật k&yacute; của c&aacute;c trạm mặt đất về t&igrave;nh trạng hoạt động của từng trạm.</li>
<li>Li&ecirc;n kết chia sẻ số liệu với c&aacute;c trung t&acirc;m xử l&yacute; kh&aacute;c khi đặt nhiều trung t&acirc;m tại c&aacute;c miền kh&aacute;c nhau.</li>
</ul>
<p><strong>Bộ hiển thị dữ liệu gi&aacute;m s&aacute;t c&oacute; chức năng:</strong></p>
<ul>
<li>Nhận, giải m&atilde; th&ocirc;ng tin ADS-B ASTERIX CAT 21 v&agrave; hiển thị dữ liệu gi&aacute;m s&aacute;t v&agrave; chức năng b&aacute;m mục ti&ecirc;u (Tracker and Surveillance Data Display) tr&ecirc;n nền kh&ocirc;ng lưu lựa chọn thời gian thực.</li>
<li>Cảnh b&aacute;o va chạm, bay v&agrave;o khu vực cấm. C&aacute;c th&ocirc;ng b&aacute;o c&oacute; thể bằng &acirc;m thanh, k&yacute; hiệu tr&ecirc;n m&agrave;n h&igrave;nh.</li>
<li>Ấn định m&agrave;u sắc m&aacute;y bay khi bay v&agrave;o v&ugrave;ng FIR thuộc tr&aacute;ch nhiệm xử l&yacute;</li>
<li>Lưu dấu vết m&aacute;y bay.</li>
<li>Ghi lịch tr&igrave;nh hoạt động của c&aacute;c chuyến bay v&agrave;o cơ sở dữ liệu</li>
<li>Ph&oacute;ng to, thu nhỏ tỷ lệ bản đồ.</li>
<li>Thực hiện c&aacute;c ph&eacute;p đo đạc: Giữa m&aacute;y bay/m&aacute;y bay, m&aacute;y bay/điểm cố định, điểm cố định/điểm cố định.</li>
<li>Hiển thị vector vận tốc theo thời gian.</li>
<li>Sử dụng hệ thống bản đồ đồ họa c&aacute;c điểm mốc, vị tr&iacute; m&aacute;y bay theo hệ tọa độ WGS-84.</li>
<li>Khả năng trao đổi th&ocirc;ng tin đơn giản với c&aacute;c đầu cuối kh&aacute;c trong mạng.</li>
<li>Điều chỉnh c&aacute;c tham số khai th&aacute;c.</li>
<li>Cho ph&eacute;p chỉ hiện c&aacute;c th&ocirc;ng tin cần quan t&acirc;m.</li>
<li>Đồng bộ thời gian với m&aacute;y chủ.</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 1,
    productCategoryNameVi: "CNS/ATM",
    productCategoryNameEn: "CNS/ATM",
    productCategorySlugVi: "cns-atm",
    productCategorySlugEn: "cns-atm",
    image: "https://attech.com.vn/wp-content/uploads/2015/06/ADS-B1.jpg",
  },
  {
    id: 2,
    nameVi: "Hệ thống luân chuyển điện văn không lưu AMHS",
    slugVi: "he-thong-amhs",
    nameEn: "AMHS - Aeronautical Message Handling System",
    slugEn: "amhs-system",
    descriptionVi:
      "Hệ thống AMHS của ATTECH tương thích hoàn toàn với các đặc tả kỹ thuật hệ thống AMHS (ICAO doc 9880-AN/466, Part II, 1st Edition 2010), Cấp chứng chỉ bởi công ty AC-B GmbH, Cộng hòa liên bang Đức (Notified Body acc. EC Regulation 552/2004 for AMHS conformance test service).",
    descriptionEn:
      "ATTECH AMHS system is fully compliant with AMHS Technical Specification (ICAO Doc 9880-AN/466, Part II, 1st Edition 2010) – Certified by AC-B GmbH, Germany (Notified Body according to EC Regulation 552/2004 for AMHS conformance test service).",
    contentVi: `<ul>
<li>Hệ thống AMHS được ph&aacute;t triển dựa tr&ecirc;n c&aacute;c bộ ti&ecirc;u chuẩn X.400, X.500 của ITU v&agrave; tương th&iacute;ch ho&agrave;n to&agrave;n với ICAO AMHS SARPs, Eurocontrol Community Specifications and regional standards: ICAO Doc 9880, ICAO Annex 10 Vol II, EUR AMHS Manual ASIA/PAC Technial Specification of the Air Traffic Services Message Handling System (AMHS) ... Hệ thống l&agrave; một giải ph&aacute;p truyền điện văn to&agrave;n diện tr&ecirc;n nền hạ tầng mạng viễn thống h&agrave;ng kh&ocirc;ng ATN với khả năng tạo, thu, ph&aacute;t c&aacute;c điện văn AFTN cũng như c&aacute;c điện văn ATS (C&aacute;c điện văn dựa tr&ecirc;n c&aacute;c định dạng sẵn được quy định trong c&aacute;c t&agrave;i liệu của ICAO: ICAO Annex 3, ICAO Doc 444, ICAO Doc 8126, ICAO Doc 9377, ICAO Annex 15 and WMO formats).</li>
<li>&nbsp;Hệ thống AMHS của ATTECH l&agrave; Trang thiết bị h&agrave;ng kh&ocirc;ng đầy đủ điều kiện kỹ thuật đưa v&agrave;o khai th&aacute;c &ndash; Cấp chứng chỉ bởi Cục H&agrave;ng kh&ocirc;ng Việt Nam.</li>
</ul>
<p><strong>T&iacute;nh năng chủ chốt</strong></p>
<ul>
<li>Tạo ra m&ocirc;i trường chuyển tiếp tới ATN cho c&aacute;c hệ thống ho&agrave;n to&agrave;n tự động với thế hệ chuyển điện văn ATS/AIS mới.</li>
<li>Cung cấp dịch vụ AMHS cơ bản theo c&aacute;c ti&ecirc;u chuẩn của ICAO, c&oacute; thể mở rộng th&agrave;nh dịch vụ AMHS mở rộng.</li>
<li>Hỗ trợ cả 2 cơ chế địa chỉ ICAO XF v&agrave; CAAS.</li>
<li>Định tuyến c&oacute; hỗ trợ thư mục (c&oacute; thể mở rộng cho việc sử dụng danh s&aacute;ch ph&acirc;n phối).</li>
<li>Quản l&yacute; h&agrave;ng chờ v&agrave; qu&aacute; tr&igrave;nh xử l&yacute; điện văn.</li>
<li>Tự động giải trợ hoặc định tuyến lại.</li>
<li>Lưu trữ (điện văn, nhật k&yacute; hoạt động, thống k&ecirc; v&agrave; c&aacute;nh b&aacute;o)</li>
<li>Truy vết, t&igrave;m kiếm v&agrave; truy xuất điện văn theo c&aacute;c tham số</li>
<li>Thống k&ecirc; theo c&aacute;c tham số</li>
<li>Truyền tin với người sử dụng trong hệ thống theo c&aacute;c giao thức (over ITU-T X400, P7 or P3 protocol)</li>
<li>Hỗ trợ mở rộng của danh s&aacute;ch ph&acirc;n phối</li>
<li>Kết nối với c&aacute;c hệ thống AMHS kh&aacute;c theo giao thức (over ITU-T X400, P1 protocol)</li>
<li>Chuyển đổi định dạng v&agrave; địa chỉ (AFTN tới/từ AMHS)</li>
<li>Cấu h&igrave;nh linh hoạt cho người sử dụng (MTA, routes AMHS/AFTN, address mapping, etc)</li>
<li>Gi&aacute;m s&aacute;t v&agrave; điều khiển hoạt động của hệ thống</li>
<li>Sử dụng giao thức quản l&yacute; SNMP</li>
<li>Triển khai tại một điểm hay nhiều điểm, cấu h&igrave;nh sao lưu v&agrave; phục hồi thảm họa.</li>
<li>C&ocirc;ng cụ ph&acirc;n t&iacute;ch hiệu quả cho việc x&aacute;c định v&agrave; khắc phục lỗi.</li>
<li>Hỗ trợ gi&aacute;m s&aacute;t v&agrave; điều khiển từ xa.</li>
<li>C&oacute; thể cập nhật th&ocirc;ng tin AMHS từ AMC (ATS Management Centre).</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 1,
    productCategoryNameVi: "CNS/ATM",
    productCategoryNameEn: "CNS/ATM",
    productCategorySlugVi: "cns-atm",
    productCategorySlugEn: "cns-atm",
    image: "https://attech.com.vn/wp-content/uploads/2015/06/AMHS.jpg",
  },
  {
    id: 3,
    nameVi: "Hệ thống chuyển tiếp điện văn tự động AMSS",
    slugVi: "he-thong-amss",
    nameEn: "AMSS System",
    slugEn: "amss-system",
    descriptionVi:
      "Hệ thống AMSS được lắp đặt tại các Trung tâm truyền tin AFTN dùng để chuyển tiếp và phân phối điện văn phục vụ cho việc trao đổi thông tin điều hành hoạt động hàng không trong nước và Quốc tế giữa Cục Hàng không, các hãng hàng không và các Trung tâm kiểm soát điều hành bay",
    descriptionEn:
      "AMSS is installed at AFTN centers to send and distribute messages for exchanging aeronautical information among Civil Aviation Authority of Vietnam, airlines companies, air traffic management service, meteorological service, aeronautical information service providers and Air Traffic Control Centers…",
    contentVi: `<ul>
<li style="padding-left: 30px;">Hệ thống hoạt động ổn định, ch&iacute;nh x&aacute;c v&agrave; thuận tiện cho khai th&aacute;c v&agrave; bảo tr&igrave; hệ thống.</li>
<li style="padding-left: 30px;">Hệ thống gồm 2 Server chuy&ecirc;n dụng v&agrave; c&aacute;c vị tr&iacute; ngoại vi (PCs) hoạt động tr&ecirc;n nền mạng LAN theo cơ chế Hot Stand-by.</li>
<li style="padding-left: 30px;">Hệ thống l&agrave; một hệ thống mở. Kiến tr&uacute;c hệ thống được modul h&oacute;a với cơ chế dự ph&ograve;ng n&oacute;ng n&ecirc;n c&oacute; độ tin cậy cao, dễ d&agrave;ng cho việc bảo tr&igrave; cũng như mở rộng hệ thống.</li>
<li style="padding-left: 30px;">Giao diện c&aacute;c ứng dụng được thiết kế đơn giản, trực quan, nhất qu&aacute;n trong to&agrave;n hệ thống</li>
<li style="padding-left: 30px;">Y&ecirc;u cầu điều kiện lắp đặt như sau:</li>
<li style="padding-left: 30px;">Điện nguồn 220V &plusmn; 10%; 50 Hz c&oacute; qua UPS.</li>
<li style="padding-left: 30px;">Nhiệt độ trong ph&ograve;ng l&agrave;m việc 22 &plusmn; 2 độ C, độ ẩm dưới 65%.</li>
</ul>`,
    contentEn:
      "Detailed content for air traffic surveillance device in English...",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 1,
    productCategoryNameVi: "CNS/ATM",
    productCategoryNameEn: "CNS/ATM",
    productCategorySlugVi: "cns-atm",
    productCategorySlugEn: "cns-atm",
    image: "https://attech.com.vn/wp-content/uploads/2015/06/AMSS.jpg",
  },
  {
    id: 4,
    nameVi: "Đèn chỉ thị góc tiếp cận chính xác - PAPI",
    slugVi: "den-papi",
    nameEn: "Precise Approach Angle Indicator - PAPI",
    slugEn: "papi-light",
    descriptionVi: "",
    descriptionEn:
      "Precision Approach Angle Indicator - PAPI is a precision approach angle indicator system - PAPI consists of 4 PAPI lights that help pilots visually approach at a standard landing angle and are usually installed on the left side of the runway in the direction of landing.",
    contentVi:
      "Đèn chỉ thị góc tiếp cận chính xác - PAPI là hệ thống đèn chỉ thị góc tiếp cận chính xác - PAPI gồm tổ hợp của 4 bộ đèn PAPI có chức năng trợ giúp phi công tiếp cận bằng mắt theo góc hạ cánh tiêu chuẩn và thường được lắp đặt ở bên trái đường CHC theo hướng hạ cánh.",
    contentEn: "Detailed content for aviation information system in English...",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 2,
    productCategoryNameVi: "Hệ thống đèn hiệu",
    productCategoryNameEn: "Lighting System",
    productCategorySlugVi: "he-thong-den-hieu",
    productCategorySlugEn: "lighting-system",
    image: "https://attech.com.vn/wp-content/uploads/2022/09/den-Papi.jpg",
  },
  {
    id: 5,
    nameVi: "Đèn lề đường CHC hai hướng lắp nổi",
    slugVi: "den-chc-hai-huong",
    nameEn: "CHC two-way surface mounted curb light",
    slugEn: "two-way-chc-light",
    descriptionVi:
      "Đèn lề đường CHC hai hướng lắp nổi được lắp đặt hai bên lề đường CHC với chiều rộng đường băng lên tới 60m nhằm trợ giúp dẫn đường cho phi công và các phương tiện hoạt động trên sân bay trong điều kiện tầm nhìn kém",
    descriptionEn:
      "The surface mounted two-way runway edge lights are installed on both sides of the runway with a runway width of up to 60m to assist pilots and vehicles operating on the airport in poor visibility conditions",
    contentVi: `<ul>
<li style="padding-left: 30px;">
<p><strong>Đặc t&iacute;nh:</strong></p>
<ul>
<li>Đ&egrave;n c&oacute; h&igrave;nh dạng, k&iacute;ch thước nhỏ gọn để chống được luồng thổi từ động cơ của m&aacute;y bay phản lực v&agrave; g&atilde;y trong trường hợp c&oacute; va chạm.</li>
<li>Hệ thống quang học ch&iacute;nh x&aacute;c v&agrave; ổn định, đặc t&iacute;nh chiếu s&aacute;ng đ&aacute;p ứng y&ecirc;u cầu của ICAO.</li>
<li>Sử dụng b&oacute;ng đ&egrave;n halogen tuổi thọ cao 150W &ndash; Pk30d&nbsp;1000h@6.6A, ti&ecirc;u điểm b&oacute;ng ch&iacute;nh x&aacute;c, b&oacute;ng được g&aacute; lắp ch&iacute;nh x&aacute;c tr&ecirc;n th&acirc;n dưới.</li>
<li>Chống được sự ăn m&ograve;n: Th&acirc;n đ&egrave;n, th&acirc;n dưới v&agrave; th&acirc;n tr&ecirc;n được chế tạo bằng hợp kim nh&ocirc;m chống được rỉ s&eacute;t v&agrave; ăn m&ograve;n.</li>
<li>K&iacute;nh chụp ngo&agrave;i m&agrave;u Clear với bề mặt ngo&agrave;i nhẵn kh&ocirc;ng b&aacute;m bụi v&agrave; tự l&agrave;m sạch khi trời mưa.</li>
<li>K&iacute;nh lọc m&agrave;u được lắp gh&eacute;p bởi 2 nửa 180<sup>0&nbsp;</sup>với c&aacute;c m&agrave;u kh&aacute;c nhau t&ugrave;y thuộc v&agrave;o vị tr&iacute; lắp đặt.</li>
<li>Bảo dưỡng, thay b&oacute;ng đ&egrave;n thuận tiện: Th&aacute;o cụm quang học v&agrave; th&acirc;n tr&ecirc;n ra v&agrave; thay b&oacute;ng trong 10 gi&acirc;y, kh&ocirc;ng cần dụng cụ, kh&ocirc;ng cần gioăng v&agrave; đai kẹp.</li>
<li>Lắp đặt dễ d&agrave;ng: đ&egrave;n được thiết kế chống xoắn d&acirc;y khi lắp đặt, đ&egrave;n c&oacute; khớp cầu dễ d&agrave;ng cho điều chỉnh g&oacute;c t&agrave; v&agrave; g&oacute;c hướng của đ&egrave;n khi lắp đặt, khi lắp đặt kh&ocirc;ng cần dụng cụ đặc biệt.</li>
<li>Tr&ecirc;n th&acirc;n c&oacute; lỗ tho&aacute;t nước, đ&egrave;n lắp đặt trực tiếp với lỗ ren ti&ecirc;u chuẩn 2&rdquo; GAS 11 TPI.</li>
<li>Chiều cao lắp đặt kh&ocirc;ng vượt qu&aacute; 300mm (H&igrave;nh 2).</li>
</ul>
<p><strong>Kết cấu:</strong></p>
<ul>
<li>Gồm 17 chi tiết (xem trong catalog).</li>
</ul>
<p><strong>Vật liệu v&agrave; ho&agrave;n thiện</strong></p>
<ul>
<li>K&iacute;nh chụp ngo&agrave;i, k&iacute;nh lọc m&agrave;u l&agrave;m bằng thủy tinh chịu nhiệt.</li>
<li>Th&acirc;n đ&egrave;n, th&acirc;n tr&ecirc;n, th&acirc;n dưới đ&uacute;c &aacute;p lực bằng nh&ocirc;m hợp kim.</li>
<li>Quả cầu nối l&agrave;m bằng nhựa chịu mưa, nắng.</li>
<li>Tấm h&atilde;m dưới, bu l&ocirc;ng, đai ốc l&agrave; vật liệu th&eacute;p kh&ocirc;ng rỉ.</li>
<li>D&acirc;y nối 2 cực, gioăng đệm chịu nhiệt.</li>
<li>Th&acirc;n đ&egrave;n, th&acirc;n tr&ecirc;n, th&acirc;n dưới sơn tĩnh điện, loại sơn chịu mưa nắng ngo&agrave;i trời, m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
</ul>
<p><strong>Nguồn điện:</strong></p>
<ul>
<li>B&oacute;ng đ&egrave;n Halogen 150W/6.6A, Tuổi thọ&nbsp;1000h@6.6A</li>
<li>Sử dụng nguồn 6.6A v&agrave; một biến d&ograve;ng c&aacute;ch ly 150W hoặc 200W</li>
</ul>
</li>
</ul>`,
    contentEn: "Detailed content for network security solution in English...",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 2,
    productCategoryNameVi: "Hệ thống đèn hiệu",
    productCategoryNameEn: "Lighting System",
    productCategorySlugVi: "he-thong-den-hieu",
    productCategorySlugEn: "lighting-system",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/05/Den_le_CHC_2_huong.jpg",
  },
  {
    id: 6,
    nameVi: "Đèn lề đường lăn lắp nổi LED",
    slugVi: "den-le-duong-noi-led",
    nameEn: "Led Road Edge Light",
    slugEn: "led-road-edge-light",
    descriptionVi:
      "Đèn lề đường lăn được lắp đặt 2 bên lề đường lăn và lề sân đỗ nhằm trợ giúp dẫn đường cho các phương tiện hoạt động trên sân bay trong điều kiện tầm nhìn kém",
    descriptionEn:
      "Taxiway edge lights are installed at two sides of taxiway and apron to navigate vehicles at night and or in bad visible conditions",
    contentVi: `<p style="display: inline !important;"><strong>Đặc t&iacute;nh;</strong></p>
<ul>
<li>M&agrave;u sắc &aacute;nh s&aacute;ng ph&ugrave; hợp với ti&ecirc;u chuẩn ICAO</li>
<li>Chống được sự ăn m&ograve;n: Th&acirc;n đ&egrave;n, th&acirc;n dưới v&agrave; th&acirc;n tr&ecirc;n được chế tạo bằng hợp kim nh&ocirc;m chống được rỉ s&eacute;t v&agrave; ăn m&ograve;n</li>
<li>Chụp k&iacute;nh lọc s&aacute;ng m&agrave;u Clear hoặc Blue với bề mặt ngo&agrave;i nhẵn v&agrave; tự l&agrave;m sạch khi trời mưa.</li>
<li>Bảo dưỡng, thay b&oacute;ng đ&egrave;n thuận tiện: Th&aacute;o cụm&nbsp; th&acirc;n tr&ecirc;n v&agrave; chụp k&iacute;nh lọc s&aacute;ng ra v&agrave; thay cụm b&oacute;ng LED trong 10 gi&acirc;y, kh&ocirc;ng cần dụng cụ, kh&ocirc;ng cần gioăng v&agrave; đai kẹp.</li>
<li>B&oacute;ng đ&egrave;n LED tuổi thọ cao</li>
<li>Quả cầu nối dễ d&agrave;ng cho điều chỉnh lắp đặt</li>
<li>Tr&ecirc;n th&acirc;n đ&egrave;n c&oacute; lỗ tho&aacute;t nước</li>
<li>Chiều cao lắp đặt ph&ugrave; hợp với ti&ecirc;u chuẩn ICAO</li>
</ul>
<p><strong>Vật liệu v&agrave; ho&agrave;n thiện</strong></p>
<ul>
<li>Th&acirc;n đ&egrave;n, th&acirc;n tr&ecirc;n, th&acirc;n dưới đ&uacute;c &aacute;p lực bằng nh&ocirc;m hợp kim</li>
<li>Quả cầu nối l&agrave;m bằng nhựa chịu mưa, nắng</li>
<li>Tấm h&atilde;m dưới, bu l&ocirc;ng, đai ốc l&agrave; vật liệu th&eacute;p kh&ocirc;ng rỉ</li>
<li>D&acirc;y nối 2 sợi chịu nhiệt</li>
<li>Lớp đổ c&aacute;ch điện cho khối nguồn bằng keo 2 th&agrave;nh phần chịu nhiệt</li>
<li>Th&acirc;n đ&egrave;n, th&acirc;n tr&ecirc;n, th&acirc;n dưới sơn tĩnh điện, loại sơn chịu mưa nắng ngo&agrave;i trời, m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
</ul>
<p><strong>Nguồn điện</strong></p>
<ul>
<li>B&oacute;ng đ&egrave;n LED 8W/1.1A, Tuổi thọ 10000h</li>
<li>Sử dụng nguồn 6.6A v&agrave; một biến d&ograve;ng c&aacute;ch ly 25W/1.1A</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 2,
    productCategoryNameVi: "Hệ thống đèn hiệu",
    productCategoryNameEn: "Lighting System",
    productCategorySlugVi: "he-thong-den-hieu",
    productCategorySlugEn: "lighting-system",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/05/Den_le_duong_lan_LED_-_halogen.jpg",
  },
  {
    id: 7,
    nameVi: "Đèn lề đường lăn lắp nổi",
    slugVi: "den-le-duong-noi",
    nameEn: "Road Edge Light",
    slugEn: "road-edge-light",
    descriptionVi:
      "Đèn lề đường lăn được lắp đặt hai bên lề đường lăn và lề sân đỗ nhằm trợ giúp dẫn đường cho các phương tiện hoạt động trên sân bay trong điều kiện tầm nhìn kém",
    descriptionEn:
      "Taxiway edge lights are installed at two sides of taxiway and apron to navigate vehicles at night or in bad visible conditions",
    contentVi: `<p><strong>Đặc t&iacute;nh</strong></p>
<ul>
<li>M&agrave;u sắc &aacute;nh s&aacute;ng ph&ugrave; hợp với ti&ecirc;u chuẩn ICAO</li>
<li>Chống được sự ăn m&ograve;n: Th&acirc;n đ&egrave;n, th&acirc;n dưới v&agrave; th&acirc;n tr&ecirc;n được chế tạo bằng hợp kim nh&ocirc;m chống được gỉ s&eacute;t v&agrave; ăn m&ograve;n.</li>
<li>Chụp k&iacute;nh lọc s&aacute;ng m&agrave;u Blue với bề mặt ngo&agrave;i nhẵn kh&ocirc;ng b&aacute;m bụi v&agrave; tự l&agrave;m sạch khi trời mưa.</li>
<li>Bảo dưỡng, thay b&oacute;ng đ&egrave;n thuận tiện: Th&aacute;o cụm th&acirc;n tr&ecirc;n v&agrave; chụp k&iacute;nh lọc s&aacute;ng m&agrave;u Blue ra v&agrave; thay b&oacute;ng trong 10 gi&acirc;y, kh&ocirc;ng cần dụng cụ, kh&ocirc;ng cần gioăng v&agrave; đai kẹp.</li>
<li>B&oacute;ng đ&egrave;n halogen tuổi thọ cao.</li>
<li>Quả cầu nối dễ d&agrave;ng cho điều chỉnh lắp đặt.</li>
<li>Tr&ecirc;n th&acirc;n đ&egrave;n c&oacute; lỗ tho&aacute;t nước.</li>
<li>Chiều cao lắp đặt ph&ugrave; hợp với ti&ecirc;u chuẩn ICAO</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 2,
    productCategoryNameVi: "Hệ thống đèn hiệu",
    productCategoryNameEn: "Lighting System",
    productCategorySlugVi: "he-thong-den-hieu",
    productCategorySlugEn: "lighting-system",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/05/Den_le_duong_lan.jpg",
  },
  {
    id: 8,
    nameVi: "Đèn chớp lắp nổi",
    slugVi: "den-chop-lap-noi",
    nameEn: "Unidirectional Elevated Flashing Light",
    slugEn: "flashing-light",
    descriptionVi:
      "Đèn chớp 1 hướng lắp nổi được sử dụng lắp đặt cho đèn chớp nhận dạng thềm đường CHC (RTIL)..",
    descriptionEn:
      "Used for: - Runway Threshold Identification Light (RTIL) - Sequential Flash Light System (SFL)",
    contentVi: `<p><strong>Đặc t&iacute;nh:</strong></p>
<ul>
<li>B&oacute;ng đ&egrave;n chớp Xenon PAR 56, tuổi thọ tr&ecirc;n 4 triệu lần chớp.</li>
<li>Tần số chớp 2 lần/gi&acirc;y.</li>
<li>K&iacute;nh lọc với bề mặt ngo&agrave;i nhẵn kh&ocirc;ng b&aacute;m bụi v&agrave; tự l&agrave;m sạch khi trời mưa.</li>
<li>Đ&egrave;n lắp đặt tr&ecirc;n cọc v&agrave; tr&ecirc;n cột đ&egrave;n an to&agrave;n, lắp đặt với ống ti&ecirc;u chuẩn đường k&iacute;nh ngo&agrave;i D 60mm.</li>
<li>Điều chỉnh đ&egrave;n theo g&oacute;c tầm v&agrave; g&oacute;c hướng dẽ d&agrave;ng bằng c&aacute;c bulong v&agrave; được kh&oacute;a chặt bằng đai ốc.</li>
<li>Tủ điều khiển c&oacute; thể kết nối với hệ thống điều khiển xa để điều khiển v&agrave; gi&aacute;m s&aacute;t lỗi khi b&oacute;ng đ&egrave;n kh&ocirc;ng s&aacute;ng.</li>
<li>Tủ điều khiển d&ugrave;ng phương ph&aacute;p ph&oacute;ng nạp tụ để cung cấp 03 mức s&aacute;ng tới b&oacute;ng đ&egrave;n chớp.</li>
<li>Tủ điều khiển c&oacute; hệ thống bảo vệ v&agrave; chống s&eacute;t.</li>
</ul>
<p><strong>Vật liệu v&agrave; ho&agrave;n thiện:</strong></p>
<ul>
<li>Th&acirc;n đ&egrave;n, cổ đ&egrave;n đ&uacute;c &aacute;p lực bằng nh&ocirc;m hợp kim.</li>
<li>Nắp sau, v&ograve;ng h&atilde;m trước l&agrave;m bằng nh&ocirc;m hợp kim.</li>
<li>Bulong, đai ốc, v&iacute;t&hellip;l&agrave; vật liệu th&eacute;p kh&ocirc;ng rỉ.</li>
<li>C&aacute;p điện chịu điện &aacute;p cao.</li>
<li>Th&acirc;n đ&egrave;n, cổ đ&egrave;n, nắp sau sơn tĩnh điện, loại sơn chịu mưa nắng ngo&agrave;i trời, m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
<li>Vỏ tủ điều khiển được chế tạo bằng th&eacute;p CT3 được sơn loại sơn ngo&agrave;i trời.</li>
<li>Cửa của c&aacute;c tủ điều khiển c&oacute; do&atilde;ng đệm chống nước.</li>
<li>D&acirc;y dẫn v&agrave; c&aacute;p điện sử dụng trong bộ điều khiển đ&egrave;n chớp đạt mức c&aacute;ch điện v&agrave; dẫn điện tốt</li>
</ul>
<p><strong>M&ocirc;i trường lắp đặt:</strong></p>
<ul>
<li>Nhiệt độ l&agrave;m việc: 0&nbsp; &cedil; 55<sup>0</sup>C</li>
<li>Độ ẩm: 100%</li>
<li>Gi&oacute;: 278 km/h</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 2,
    productCategoryNameVi: "Hệ thống đèn hiệu",
    productCategoryNameEn: "Lighting System",
    productCategorySlugVi: "he-thong-den-hieu",
    productCategorySlugEn: "lighting-system",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/04/Den-chop-lap-noi.jpg",
  },
  {
    id: 9,
    nameVi: "Đèn pha 1 hướng lắp nổi",
    slugVi: "den-1-pha-lap-noi",
    nameEn: "Unidirectional Light",
    slugEn: "unidirectional-light",
    descriptionVi:
      "Đèn pha 1 hướng được sử dụng lắp đặt cho đèn tiếp cận CAT I, II và III với ánh sáng trắng (Clear) và ánh sáng đỏ (Red)..",
    descriptionEn:
      "Elevated Unidirectional  light is used as:\n\n- Approach light (Clear and Red) in CAT I, II, III\n\n- Threshold light (Green) in CAT I, II, III\n\n- Runway end light (Red)",
    contentVi: `<p><strong>Đặc t&iacute;nh:</strong></p>
<ul>
<li>Sử dụng b&oacute;ng đ&egrave;n halogen kh&ocirc;ng qu&aacute; 200W &ndash; Pk30d tuổi thọ&nbsp;1000h@6.6A, ti&ecirc;u điểm b&oacute;ng ch&iacute;nh x&aacute;c, b&oacute;ng được g&aacute; lắp ch&iacute;nh x&aacute;c tr&ecirc;n th&acirc;n đ&egrave;n.</li>
<li>Bảo dưỡng, thay b&oacute;ng đ&egrave;n thuận tiện: Mở nắp sau kh&ocirc;ng cần th&aacute;o cụm quang học ph&iacute;a trước, kh&ocirc;ng cần dụng cụ, kh&ocirc;ng cần gioăng v&agrave; đai kẹp.</li>
<li>K&iacute;nh lọc m&agrave;u (Clear, Red, Green) với bề mặt ngo&agrave;i nhẵn kh&ocirc;ng b&aacute;m bụi v&agrave; tự l&agrave;m sạch khi trời mưa.</li>
<li>D&acirc;y thứ cấp nằm b&ecirc;n trong đ&egrave;n được bảo vệ khỏi &aacute;nh nắng mặt trời.</li>
<li>Đ&egrave;n lắp đặt tr&ecirc;n mặt đất, cọc v&agrave; tr&ecirc;n cột đ&egrave;n an to&agrave;n, lắp đặt với ống ti&ecirc;u chuẩn đường k&iacute;nh ngo&agrave;i D 60mm.</li>
<li>Điều chỉnh đ&egrave;n theo g&oacute;c tầm v&agrave; g&oacute;c hướng dễ d&agrave;ng bằng c&aacute;c bu l&ocirc;ng v&agrave; được kh&oacute;a chặt bằng đai ốc.</li>
</ul>
<p><strong>Kết cấu:</strong></p>
<ul>
<li>Gồm 20 chi tiết(xem catalog)</li>
</ul>
<p><strong>Vật liệu v&agrave; ho&agrave;n thiện:</strong></p>
<ul>
<li>K&iacute;nh lọc m&agrave;u l&agrave;m bằng thủy tinh chịu nhiệt.</li>
<li>Th&acirc;n đ&egrave;n, cổ đ&egrave;n đ&uacute;c &aacute;p lực bằng nh&ocirc;m hợp kim.</li>
<li>Nắp sau l&agrave;m bằng nhựa chịu nắng mưa, chịu nhiệt.</li>
<li>Bu l&ocirc;ng, đai ốc, v&iacute;t&hellip; l&agrave; vật liệu th&eacute;p kh&ocirc;ng rỉ.</li>
<li>D&acirc;y nối 2 cực, v&ograve;ng đệm chịu nhiệt.</li>
<li>Th&acirc;n đ&egrave;n, cổ đ&egrave;n sơn tĩnh điện, loại sơn chịu mưa nắng ngo&agrave;i trời, m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
</ul>
<p><strong>Nguồn điện:</strong></p>
<ul>
<li>B&oacute;ng đ&egrave;n Halogen 100/150/200W/6.6A, Tuổi thọ&nbsp;1000h@6.6A</li>
<li>Sử dụng d&acirc;y 2 cực 2,5mm<sup>2</sup>&nbsp;(hoặc AWG 12) giữa biến d&ograve;ng c&aacute;ch ly v&agrave; đ&egrave;n, nguồn 6.6A v&agrave; một biến d&ograve;ng c&aacute;ch ly 100W, 150W hoặc 200W.</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 2,
    productCategoryNameVi: "Hệ thống đèn hiệu",
    productCategoryNameEn: "Lighting System",
    productCategorySlugVi: "he-thong-den-hieu",
    productCategorySlugEn: "lighting-system",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/05/Den_pha_1_huong.jpg",
  },
  {
    id: 10,
    nameVi: "Đèn pha xoay",
    slugVi: "den-pha-xoay",
    nameEn: "Rotating Light",
    slugEn: "rotating-light",
    descriptionVi:
      "Đèn pha xoay được sử dụng để trợ giúp phi công xác định được vị trí của sân bay trong điều kiện tầm nhìn kém hoặc ban đêm",
    descriptionEn:
      "Rotating searchlights are used to assist pilots in locating airports in poor visibility or at night",
    contentVi: `<p><strong>Đặc t&iacute;nh:</strong></p>
<ul>
<li>Hệ thống chuyển động hộp số v&agrave; b&aacute;nh răng kh&ocirc;ng cần sự b&ocirc;i trơn.</li>
<li>Cơ cấu truyền điện được ứng dụng kiểu chổi than v&agrave; đĩa tiếp điện để cung cấp nguồn điện ổn định.</li>
<li>Sử dụng 2 b&oacute;ng PAR56 500W với cường độ s&aacute;ng 88000 lumen, tuổi thọ 4000 giờ.</li>
<li>Nguồn s&aacute;ng trắng trực tiếp bởi đ&egrave;n, nguồn s&aacute;ng xanh th&ocirc;ng qua một k&iacute;nh lọc mầu green.</li>
<li>G&oacute;c ngẩng của đ&egrave;n c&oacute; thể điều chỉnh trong khoảng -10<sup>0</sup>&nbsp;đến 10<sup>0.</sup></li>
<li>Tốc độ quay của trục ch&iacute;nh l&agrave; 12.5 v&ograve;ng/ph&uacute;t, tương đương với 25 chớp/ph&uacute;t xen kẽ &aacute;nh s&aacute;ng xanh v&agrave; trắng.</li>
<li>Tủ động cơ chống nước, sơn m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
<li>Chịu nhiệt độ từ 0<sup>0</sup>C đến 55<sup>0</sup>C</li>
<li>Chịu được sức gi&oacute; 161 km/giờ</li>
<li>C&ocirc;ng suất của đ&egrave;n 1100W</li>
</ul>
<p><strong>Kết cấu:</strong></p>
<ul>
<li>Gồm 9 chi tiết(xem catalog)</li>
</ul>
<p><strong>Vật liệu v&agrave; ho&agrave;n thiện:</strong></p>
<ul>
<li>Th&acirc;n đ&egrave;n pha: Nh&ocirc;m đ&uacute;c sơn tĩnh điện, loại sơn chịu mưa nắng ngo&agrave;i trời, m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
<li>Vỏ tủ: Th&eacute;p CT3 sơn tĩnh điện, loại sơn chịu mưa nắng ngo&agrave;i trời, m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
<li>Gi&aacute; đỡ đ&egrave;n: Th&eacute;p kh&ocirc;ng rỉ sơn tĩnh điện, loại sơn chịu mưa nắng ngo&agrave;i trời, m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
</ul>
<p><strong>Cấp nguồn:</strong></p>
<ul>
<li>Nguồn điện 1 pha 220 VAC 50Hz</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 2,
    productCategoryNameVi: "Hệ thống đèn hiệu",
    productCategoryNameEn: "Lighting System",
    productCategorySlugVi: "he-thong-den-hieu",
    productCategorySlugEn: "lighting-system",
    image: "https://attech.com.vn/wp-content/uploads/2015/05/Den_pha_xoay.jpg",
  },
  {
    id: 11,
    nameVi: "Đèn cao không LED cấu trúc kép",
    slugVi: "den-cao-khong-led-cau-truc-kep",
    nameEn: "Double Obstruction Light",
    slugEn: "double-obstruction-light",
    descriptionVi:
      "Đèn cao không công nghệ LED cấu trúc kép loại A và loại B được sử dụng để cảnh báo các chướng ngại vật cố định tại sân bay hoặc công trình có khả năng gây ảnh hưởng đến hoạt động của tàu bay như các tòa nhà, ống khói, cột ăng-ten để nâng cao tính năng an toàn khi sử dụng. ",
    descriptionEn:
      "Dual-structure LED high-beam lights of type A and type B are used to warn of fixed obstacles at airports or structures that may affect aircraft operations such as buildings, chimneys, and antenna masts to enhance safety during use.",
    contentVi: `<p>Đ&egrave;n cao kh&ocirc;ng cấu tr&uacute;c k&eacute;p c&oacute; gi&aacute;m s&aacute;t, điều khiển l&agrave; sản phẩm c&oacute; cấu tr&uacute;c k&eacute;p c&aacute;c cụm đ&egrave;n LED v&agrave; nguồn cung cấp, đồng thời c&oacute; t&iacute;nh năng điều khiển gi&aacute;m s&aacute;t từ xa.</p>
<p><strong>Ti&ecirc;u chuẩn đ&aacute;p ứng:</strong></p>
<ul>
<li>Ti&ecirc;u chuẩn ICAO Annex 4 Volume I-Chương 6.3 Loại A v&agrave; Loại B</li>
<li>Ti&ecirc;u chuẩn FAAAC 150/5345-43G Đ&egrave;n loại L810</li>
<li>Ti&ecirc;u chuẩn TCVN 7699-2-30:2007</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 2,
    productCategoryNameVi: "Hệ thống đèn hiệu",
    productCategoryNameEn: "Lighting System",
    productCategorySlugVi: "he-thong-den-hieu",
    productCategorySlugEn: "lighting-system",
    image:
      "https://attech.com.vn/wp-content/uploads/2016/08/den-cao-khong-kep.jpg",
  },
  {
    id: 12,
    nameVi: "Shelter Thép",
    slugVi: "shelter-thep",
    nameEn: "Steel Shelter",
    slugEn: "steel-shelter",
    descriptionVi:
      "Được sử dụng để lắp đặt tại các đài/trạm như: DVOR/DME, ADS-B, Localizer (LLZ), Glide Path, ILS, trạm viễn thông BTS,...",
    descriptionEn:
      "Shelter is installed at stations such as DVOR/DME systems, ADS-B, Localizer (LLZ), Glide Path, ILS, BTS, … Shelter must be able to ensure safety for the interior installed equipment in all climate conditions and ensure the continuous communication at the stations.",
    contentVi: `<p>Vật liệu v&agrave; ho&agrave;n thiện:</p>
<ul>
<li>Khung th&eacute;p mạ kẽm</li>
<li>Lớp c&aacute;ch nhiệt của tường, trần, s&agrave;n sử dụng vật liệu xốp c&aacute;ch nhiệt</li>
<li>Mặt trong tường, trần sử dụng vật liệu chịu nước compact HPL d&agrave;y 12mm, bề mặt phủ melamine chống ch&aacute;y</li>
<li>Mặt s&agrave;n sử dụng gỗ c&ocirc;ng nghiệp d&agrave;y 12mm chịu nước.</li>
<li>Bề mặt ngo&agrave;i kể cả m&aacute;i của shelter sơn m&agrave;u trắng/đỏ xen kẽ theo khuyến c&aacute;o của ICAO, sử dụng loại sơn chịu mưa nắng ngo&agrave;i trời</li>
<li>M&aacute;i shelter được chế tạo bằng vật liệu Composite, m&aacute;i dốc tho&aacute;t nước tốt, giảm khả năng đ&oacute;ng tuyết tr&ecirc;n m&aacute;i v&agrave; bền vững, chống thấm nước trong mọi điều kiện thời tiết khắc nghiệt.</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 3,
    productCategoryNameVi: "Shelter",
    productCategoryNameEn: "Shelter",
    productCategorySlugVi: "shelter",
    productCategorySlugEn: "shelter",
    image: "https://attech.com.vn/wp-content/uploads/2015/05/Shelter.jpg",
  },
  {
    id: 13,
    nameVi: "Shelter Composite",
    slugVi: "shelter-composite",
    nameEn: "Composite Shelter",
    slugEn: "composite-shelter",
    descriptionVi: "",
    descriptionEn:
      "The equipment room (Shelter) is used for installation at stations/stations such as: DVOR/DME, ADS-B, Localizer (LLZ), Glide Path, ILS, BTS telecommunication station,... The equipment room must ensure that the equipment inside operates safely in all weather conditions, ensuring continuous information at the stations.",
    contentVi: `Phòng đặt thiết bị (Shelter) được sử dụng để lắp đặt tại các đài/trạm như: DVOR/DME, ADS-B, Localizer (LLZ), Glide Path, ILS, trạm viễn thông BTS,...Phòng đặt thiết bị phải đảm bảo cho các thiết bị bên trong hoạt động an toàn trong mọi điều kiện thời tiết, đảm bảo thông tin tại các trạm được liên tục.`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 3,
    productCategoryNameVi: "Shelter",
    productCategoryNameEn: "Shelter",
    productCategorySlugVi: "shelter",
    productCategorySlugEn: "shelter",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/06/shelter-composite.jpg",
  },
  {
    id: 14,
    nameVi: "Technical console",
    slugVi: "technical-console",
    nameEn: "Technical console",
    slugEn: "technical-console",
    descriptionVi:
      "Bàn console được thiết kế riêng biệt để lắp đặt các thiết bị kỹ thuật như đồng hồ GPS, màn hình giám sát, màn hình hiển thị thông tin, hệ thống điều khiển thoại VCCS, E Strip... hỗ trợ kiểm soát viên không lưu điều hành hoạt động bay tại Đài kiểm soát không lưu (TWR), Trung tâm điều hành bay kiếm soát tiếp cận (APP) và Trung tâm phối hợp điều hành bay đường dài (ACC) ",
    descriptionEn:
      "Console Desk is designed dedicatedly for the installing technical equipment such as GPS Clocks, monitoring display, VCCS, E-Strip...to support air traffic controllers to co-ordinate air traffic at ATC Towers, APP and ACC.",
    contentVi: `<p><strong>Ti&ecirc;u chuẩn đ&aacute;p ứng:</strong></p>
<p>- Ti&ecirc;u chuẩn TCVN 8753:2011 S&acirc;n bay d&acirc;n dụng - Y&ecirc;u cầu chung về thiết kế v&agrave; khai th&aacute;c.</p>
<p>- C&aacute;c ti&ecirc;u chuẩn Quốc tế v&agrave; Việt Nam li&ecirc;n quan</p>
<p><strong>M&ocirc; tả sản phẩm:</strong></p>
<p>B&agrave;n Console được thiết kế, lắp đặt ph&ugrave; hợp với kh&ocirc;ng gian của đ&agrave;i kiểm so&aacute;t kh&ocirc;ng lưu để người kiểm so&aacute;t vi&ecirc;n c&oacute; thể dễ d&agrave;ng truy cập sử dụng c&aacute;c thiết bị v&agrave; đảm bảo c&oacute; g&oacute;c nh&igrave;n, tầm nh&igrave;n tối ưu trong to&agrave;n bộ qu&aacute; tr&igrave;nh điều h&agrave;nh hoạt động bay.</p>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 4,
    productCategoryNameVi: "Bàn console",
    productCategoryNameEn: "Console Desk",
    productCategorySlugVi: "ban-console",
    productCategorySlugEn: "console-desk",
    image:
      "https://attech.com.vn/wp-content/uploads/2016/08/ban-console-2016.jpg",
  },
  {
    id: 15,
    nameVi: "Giàn phản xạ thép",
    slugVi: "gian-phan-xa-thep",
    nameEn: "Steel Counterpoise",
    slugEn: "steel-counterpoise",
    descriptionVi:
      "Giàn phản xạ VOR phản xạ các sóng điện từ phát ra từ các anten của thiết bị CVOR và DVOR. Tùy thuộc vào mục địch sử dụng đài cho khu vực tiếp cận hay đường dài và điều kiện địa hình nơi lắp đặt đài sử dụng giàn có đường kính như sau: 30 feet (9m), 60 feet (18m) hoặc 100 feet (30.5m).",
    descriptionEn:
      "VOR counterpoise reflects electromagnetic waves transmitted from antennas of CVOR and DVOR. Depending on the purpose of utilizing the station for approach or long route and terrain conditions of the station site, the following types of counterpoises will be used: 30-feet (9m) diameter, 60-feet (18m) diameter or 100-feet (30,5m) diameter.",
    contentVi: `<p><strong>K&iacute;ch thước</strong></p>
<ul>
<li>Đường k&iacute;nh: 9m, 18m v&agrave; 30,5m.</li>
<li>Độ cao mặt s&agrave;n so với m&oacute;ng cột: 3300 &plusmn; 50mm</li>
</ul>
<p><strong>T&iacute;nh năng kỹ thuật</strong></p>
<ul>
<li>Tần số l&agrave;m việc: Trong dải tần số 108 &ndash; 118 MHz.</li>
<li>Vị tr&iacute; lắp đặt anten Carrier: T&acirc;m gi&agrave;n phản xạ.</li>
<li>Vị tr&iacute; lắp đặt anten DME (nếu c&oacute;): T&acirc;m gi&aacute;n phản xạ ph&iacute;a tr&ecirc;n anten Carrier của DVOR.</li>
<li>Số lượng vị tr&iacute; anten Sideband: 48 cột.</li>
<li>Khoảng c&aacute;ch từ t&acirc;m gi&agrave;n phản xạ (vị tr&iacute; anten Carrier) đến c&aacute;c anten sideband xấp xỉ: 6700mm.</li>
<li>Khung cột được thiết kế với kết cấu đa gi&aacute;c đảm bảo chống xoắn.</li>
<li>Phần cột v&agrave; khung dầm được chế tạo bằng c&aacute;c thanh th&eacute;p h&igrave;nh chịu lực với vật liệu l&agrave; th&eacute;p CT38 giới hạn chảy 24 kg/mm2. Li&ecirc;n kết khung, cột bằng c&aacute;c bul&ocirc;ng cấp độ bền 8.8.</li>
<li>Mặt s&agrave;n phản xạ được chế tạo bằng th&eacute;p SWRM12 (JIS G3505), giới hạn chảy 42,5 kg/mm2 được h&agrave;n &ocirc; lưới 50x50&plusmn;15% mm. Ri&ecirc;ng phần đường đi tr&ecirc;n s&agrave;n được chế tạo bằng c&aacute;c tấm lưới dập XG19 (JIS G3351) trọng lượng nhẹ, cứng v&agrave; chịu lực tốt.</li>
<li>Độ cao mặt s&agrave;n so với mặt m&oacute;ng cột: 3300&plusmn;50 mm.</li>
<li>Tất cả c&aacute;c chi tiết bằng th&eacute;p được mạ kẽm nh&uacute;ng n&oacute;ng.</li>
<li>Kết cấu gi&agrave;n phản xạ đảm bảo độ vững chắc, dễ th&aacute;o lắp.</li>
<li>Sức chịu tải tại đường đi tr&ecirc;n mặt s&agrave;n: &le;200kg.</li>
<li>Độ phẳng mặt s&agrave;n &plusmn; 50mm.</li>
<li>C&aacute;c chi tiết mối đất chống s&eacute;t bằng đồng.</li>
<li>Điện trở tiếp đất của gi&agrave;n: &lt;5 Ohms.</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 5,
    productCategoryNameVi: "Giàn phản xạ",
    productCategoryNameEn: "Counterpoise",
    productCategorySlugVi: "gian-phan-xa",
    productCategorySlugEn: "counterpoise",
    image: "https://attech.com.vn/wp-content/uploads/2015/05/Dan_phan_xa.jpg",
  },
  {
    id: 16,
    nameVi: "Thiết bị ghi âm chuyên dụng",
    slugVi: "ghi-am-chuyen-dung",
    nameEn: "Specialized Audio Recorder",
    slugEn: "voice-recorder",
    descriptionVi:
      "Ghi âm các cuộc gọi trên đường thoại analog, các tín hiệu thoại thu phát của các thiết bị HF, VHF",
    descriptionEn:
      "Recorder calls on the analog phone, the voice signal transceiver device of the HF, VHF",
    contentVi: `<ul>
<li>C&ocirc;ng nghệ kỹ thuật số</li>
<li>Ghi &acirc;m c&aacute;c cuộc gọi tr&ecirc;n đường thoại analog, c&aacute;c t&iacute;n hiệu thoại thu ph&aacute;t của c&aacute;c thiết bị HF, VHF</li>
<li>Dung lượng lưu trữ tr&ecirc;n 20.000 giờ</li>
<li>Tự động backup dữ liệu tr&ecirc;n đĩa DVD-RW/ DVD-RAM</li>
<li>T&igrave;m kiếm v&agrave; nghe lại c&aacute;c bản ghi theo thời gian, theo k&ecirc;nh</li>
<li>Gi&aacute;m s&aacute;t trực tiếp (live-monitor) t&iacute;n hiệu thoại tr&ecirc;n c&aacute;c k&ecirc;nh</li>
<li>Hỗ trợ nhiều chuẩn n&eacute;n t&iacute;n hiệu kh&aacute;c nhau</li>
<li>Quản l&yacute; người d&ugrave;ng theo t&agrave;i khoản</li>
<li>Sử dụng m&aacute;y t&iacute;nh c&ocirc;ng nghiệp c&oacute; độ ổn định cao,hoạt động li&ecirc;n tục 24/24h, c&ocirc;ng nghệ RAID cho ph&eacute;p 02 ổ cứng hoạt động song song v&agrave; backup cho nhau</li>
<li>Dễ d&agrave;ng mở rộng dung lượng k&ecirc;nh ghi &acirc;m bằng c&aacute;ch cắm th&ecirc;m card</li>
<li>Đồng bộ thời gian theo chuẩn IRIG-B/ RS-232</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 6,
    productCategoryNameVi: "Thiết bị ghi âm/ ghi hình",
    productCategoryNameEn: "Recording/video equipment",
    productCategorySlugVi: "ghi-am-ghi-hinh",
    productCategorySlugEn: "audio-video-recording",
    image: "https://attech.com.vn/wp-content/uploads/2015/12/ghiam2015.jpg",
  },
  {
    id: 17,
    nameVi: "Thiết bị ghi thoại dữ liệu",
    slugVi: "ghi-thoai-du-lieu",
    nameEn: "Data voice recorder",
    slugEn: "data-voice-recorder",
    descriptionVi:
      "Thiết bị ghi thoại dữ liệu là một trong những thiết bị quan trọng được sử dụng trong ngành hàng không để ghi lại dữ liệu hình ảnh và tín hiệu liên lạc thoại trong quá trình thông tin, liên lạc hiệp đồng điều hành bay nhằm mục đích đảm bảo an toàn hoạt động hàng không dân dụng cũng như cung cấp bằng chứng cho công tác điều tra khi có xảy ra sự cố.",
    descriptionEn:
      "Voice data recorder is one of the important devices used in the aviation industry to record image data and voice communication signals during information and flight control communication to ensure the safety of civil aviation operations as well as provide evidence for investigation when an incident occurs.",
    contentVi: `<ul>
<li>
<p><strong>T&Iacute;NH NĂNG CHUNG</strong></p>
<ul>
<li>Lưu trữ trực tiếp tại ổ cứng, dung lượng lưu trữ đ&aacute;p ứng quy định tối thiểu 30 ng&agrave;y (t&ugrave;y biến theo y&ecirc;u cầu khai th&aacute;c</li>
<li>Nghe v&agrave; xem lại tại chỗ hoặc từ xa theo từng k&ecirc;nh hoặc đồng thời nhiều k&ecirc;nh</li>
<li>Ph&aacute;t lại đồng bộ dữ liệu thoại v&agrave; h&igrave;nh ảnh</li>
<li>T&igrave;m kiếm dữ liệu theo t&ecirc;n k&ecirc;nh, thiết bị lưu trữ, thời gian bắt đầu, thời gian kết th&uacute;c</li>
<li>Hỗ trợ điều khiển v&agrave; gi&aacute;m s&aacute;t thiết bị ghi thoại v&agrave; dữ liệu qua mạng LAN</li>
<li>Lưu trữ v&agrave; xuất nhật k&yacute; hoạt động bao gồm c&aacute;c sự kiện xảy ra tr&ecirc;n hệ thống, thao t&aacute;c của người vận h&agrave;nh v&agrave; được xuất ra c&aacute;c tệp tin nhật k&yacute; (Log File) theo từng ng&agrave;y</li>
<li>Ph&acirc;n quyền truy cập theo nhiều mức. C&aacute;c t&agrave;i khoản người d&ugrave;ng c&oacute; thiết lập mật khẩu bảo vệ</li>
<li>Bảo vệ bản ghi</li>
<li>Hỗ trợ đồng bộ thời gian từ c&aacute;c nguồn thời gian chuẩn qua c&aacute;c giao tiếp IRIG-B hoặc NTP</li>
<li>Gi&aacute;m s&aacute;t trực tiếp: Hỗ trợ ghi v&agrave; ph&aacute;t lại trực tiếp dữ liệu thoại v&agrave; h&igrave;nh đồng thời th&ocirc;ng qua m&agrave;n h&igrave;nh phụ</li>
<li>Hỗ trợ lưu trữ dữ liệu h&igrave;nh ảnh v&agrave; dữ liệu thoại ra c&aacute;c thiết bị lưu trữ ngo&agrave;i: USB, ổ cứng gắn ngo&agrave;i.</li>
</ul>
<p><strong>TI&Ecirc;U CHUẨN &Aacute;P DỤNG</strong></p>
<ul>
<li>ICAO Annex 10, volume II, chương 3, mục 3.4 v&agrave; 3.5.</li>
<li>ICAO Annex 13, về &ldquo;Tai nạn v&agrave; điều tra tai nạn n&oacute;i chung&rdquo;.</li>
<li>EUROCAE ED-111 về &ldquo;C&aacute;c đặc t&iacute;nh chức năng cho ghi &acirc;m mặt đất CNS/ATM&rdquo;.</li>
</ul>
</li>
</ul>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 6,
    productCategoryNameVi: "Thiết bị ghi âm/ ghi hình",
    productCategoryNameEn: "Recording/video equipment",
    productCategorySlugVi: "ghi-am-ghi-hinh",
    productCategorySlugEn: "audio-video-recording",
    image:
      "https://attech.com.vn/wp-content/uploads/2020/10/Thiet-bi-ghi-thoai-dl.jpg",
  },
  {
    id: 18,
    nameVi: "Đồng hồ thời gian chuẩn GPS",
    slugVi: "dong-ho-thoi-gian-chuan-gps",
    nameEn: "GPS Clock",
    slugEn: "standard-gps-timepiece",
    descriptionVi:
      "Hệ thống đồng hồ thời gian chuẩn GPS là hệ thống thiết bị cung cấp thông tin thời gian chuẩn thu từ GPS với độ chính xác đến nano giây.",
    descriptionEn:
      "GPS Clock system is an equipment system providing real-time information received from GPS receiver with high precise up to nanoseconds.",
    contentVi: `<p>Thời gian c&oacute; thể được hiển thị tr&ecirc;n c&aacute;c thiết bị đồng hồ Slave phục vụ hoạt động tại c&aacute;c cảng h&agrave;ng kh&ocirc;ng, trung t&acirc;m điều h&agrave;nh quản l&yacute; hoạt động bay v&agrave; một số đơn vị kh&aacute;c. Ngo&agrave;i ra, hệ thống đồng hồ thời gian chuẩn GPS cung cấp t&iacute;n hiệu đồng bộ thời gian chuẩn cho c&aacute;c hệ thống thiết bị kh&aacute;c phục vụ hoạt động tại c&aacute;c cảng h&agrave;ng kh&ocirc;ng hoặc hoạt động điều h&agrave;nh bay như hệ thống ghi thoại v&agrave; ghi dữ liệu, hệ thống AMHS, hệ thống gi&aacute;m s&aacute;t h&agrave;ng kh&ocirc;ng v&agrave; c&aacute;c hệ thống thiết bị kh&aacute;c như hệ thống an ninh h&agrave;ng kh&ocirc;ng, mạng m&aacute;y t&iacute;nh v&agrave; truyền th&ocirc;ng, hệ thống c&ocirc;ng nghiệp.</p>`,
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 1,
    productCategoryNameVi: "CNS/ATM",
    productCategoryNameEn: "CNS/ATM",
    productCategorySlugVi: "cns-atm",
    productCategorySlugEn: "cns-atm",
    image:
      "https://attech.com.vn/wp-content/uploads/2016/08/dong-ho-master.jpg",
  },
  {
    id: 19,
    nameVi: "Máy cắt vấu",
    slugVi: "may-cat-vau",
    nameEn: "Lug Cutter",
    slugEn: "lug-cutter",
    descriptionVi: "",
    descriptionEn:
      "Jaw cutting machine designed, manufactured and installed by Attech according to the order of Sakura company - Japan",
    contentVi:
      "Máy cắt Vấu do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura - Nhật Bản",
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 7,
    productCategoryNameVi: "Thiết bị dân dụng khác",
    productCategoryNameEn: "Other Equipment",
    productCategorySlugVi: "thiet-bi-dan-dung",
    productCategorySlugEn: "other-equipment",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/07/11-May-cat-Vau-1.jpg",
  },
  {
    id: 20,
    nameVi: "Máy là",
    slugVi: "may-la",
    nameEn: "Ironing machine",
    slugEn: "ironing-machine",
    descriptionVi: "",
    descriptionEn: "",
    contentVi:
      "Máy là do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura - Nhật Bản",
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 7,
    productCategoryNameVi: "Thiết bị dân dụng khác",
    productCategoryNameEn: "Other Equipment",
    productCategorySlugVi: "thiet-bi-dan-dung",
    productCategorySlugEn: "other-equipment",
    image: "https://attech.com.vn/wp-content/uploads/2015/07/10-May-la-1.jpg",
  },
  {
    id: 21,
    nameVi: "Máy hàn TIG",
    slugVi: "may-han-tig",
    nameEn: "TIG welding machine",
    slugEn: "tig-welding-machine",
    descriptionVi: "",
    descriptionEn:
      "Voice data recorder is one of the important devices used in the aviation industry to record image data and voice communication signals during information and flight control communication to ensure the safety of civil aviation operations as well as provide evidence for investigation when an incident occurs.",
    contentVi:
      "Máy hàn TIG do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura - Nhật Bản",
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 7,
    productCategoryNameVi: "Thiết bị dân dụng khác",
    productCategoryNameEn: "Other Equipment",
    productCategorySlugVi: "thiet-bi-dan-dung",
    productCategorySlugEn: "other-equipment",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/07/08-May-han-TIG-1.jpg",
  },
  {
    id: 22,
    nameVi: "Máy lốc",
    slugVi: "may-loc",
    nameEn: "Rolling Machine",
    slugEn: "rolling-machine",
    descriptionVi: "",
    descriptionEn: "",
    contentVi:
      "Máy lốc do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura Nhật Bản",
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 7,
    productCategoryNameVi: "Thiết bị dân dụng khác",
    productCategoryNameEn: "Other Equipment",
    productCategorySlugVi: "thiet-bi-dan-dung",
    productCategorySlugEn: "other-equipment",
    image: "https://attech.com.vn/wp-content/uploads/2015/07/07-May-loc-1.jpg",
  },
  {
    id: 23,
    nameVi: "Máy hàn quay",
    slugVi: "may-han-quay",
    nameEn: "Rotary welding machine",
    slugEn: "rotary-welding-machine",
    descriptionVi: "",
    descriptionEn:
      "Voice data recorder is one of the important devices used in the aviation industry to record image data and voice communication signals during information and flight control communication to ensure the safety of civil aviation operations as well as provide evidence for investigation when an incident occurs.",
    contentVi:
      "Máy hàn quay do Attech thiết kế chế tạo và lắp đặt theo đơn đặt hàng của công ty Sakura - Nhật Bản",
    contentEn: "",
    timePosted: "2025-07-15T00:00:00Z",
    status: 1,
    productCategoryId: 7,
    productCategoryNameVi: "Thiết bị dân dụng khác",
    productCategoryNameEn: "Other Equipment",
    productCategorySlugVi: "thiet-bi-dan-dung",
    productCategorySlugEn: "other-equipment",
    image:
      "https://attech.com.vn/wp-content/uploads/2015/07/05-May-han-quay-1.jpg",
  },
];

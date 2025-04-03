import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../ProductDetail/ProductDetail.css";

const ProductDetail = () => {
  const { productId, slug } = useParams();
  const [product, setproduct] = useState(null);

  const products = [
    // Giả lập dữ liệu sản phẩm
    {
      id: 1,
      title: "Hệ thống xử lý dữ liệu ADS-B",
      fullTitle: "Hệ Thống Xử Lý Dữ Liệu ADS-B",
      description:
        "Giải pháp thay thế radar thông thường, tăng cường khả năng giám sát hoạt động bay an toàn hơn và hiệu quả hơn.",
      image: "https://attech.com.vn/wp-content/uploads/2015/06/ADS-B1.jpg",
      content: `
      <div class="dnconten">
<p style="text-align: justify;">ADS-B (Automatic Dependent Surveillance - Broadcast) l&agrave; một giải ph&aacute;p chi ph&iacute; thấp thay thế c&ocirc;ng nghệ radar th&ocirc;ng thường, cho ph&eacute;p phi c&ocirc;ng v&agrave; kiểm so&aacute;t vi&ecirc;n kh&ocirc;ng lưu &ldquo;nh&igrave;n thấy&rdquo; v&agrave; &ldquo;kiểm so&aacute;t&rdquo; hoạt động bay với độ ch&iacute;nh x&aacute;c cao hơn, ADS-B tăng cường khả năng gi&aacute;m s&aacute;t cao hơn v&agrave; xa hơn g&oacute;p phần l&agrave;m cho việc gi&aacute;m s&aacute;t hoạt động bay an to&agrave;n hơn v&agrave; sử dụng kh&ocirc;ng phận hiệu quả hơn.</p>
<div class="more">
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: justify;"><strong>Hệ thống t&iacute;ch hợp dữ liệu c&oacute; chức năng:</strong></p>
<ul style="text-align: justify;">
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
<p style="text-align: justify;"><strong>Bộ hiển thị dữ liệu gi&aacute;m s&aacute;t c&oacute; chức năng:</strong></p>
<ul>
<li style="text-align: justify;">Nhận, giải m&atilde; th&ocirc;ng tin ADS-B ASTERIX CAT 21 v&agrave; hiển thị dữ liệu gi&aacute;m s&aacute;t v&agrave; chức năng b&aacute;m mục ti&ecirc;u (Tracker and Surveillance Data Display) tr&ecirc;n nền kh&ocirc;ng lưu lựa chọn thời gian thực.</li>
<li style="text-align: justify;">Cảnh b&aacute;o va chạm, bay v&agrave;o khu vực cấm. C&aacute;c th&ocirc;ng b&aacute;o c&oacute; thể bằng &acirc;m thanh, k&yacute; hiệu tr&ecirc;n m&agrave;n h&igrave;nh.</li>
<li style="text-align: justify;">Ấn định m&agrave;u sắc m&aacute;y bay khi bay v&agrave;o v&ugrave;ng FIR thuộc tr&aacute;ch nhiệm xử l&yacute;</li>
<li style="text-align: justify;">Lưu dấu vết m&aacute;y bay.</li>
<li style="text-align: justify;">Ghi lịch tr&igrave;nh hoạt động của c&aacute;c chuyến bay v&agrave;o cơ sở dữ liệu</li>
<li style="text-align: justify;">Ph&oacute;ng to, thu nhỏ tỷ lệ bản đồ.</li>
<li style="text-align: justify;">Thực hiện c&aacute;c ph&eacute;p đo đạc: Giữa m&aacute;y bay/m&aacute;y bay, m&aacute;y bay/điểm cố định, điểm cố định/điểm cố định.</li>
<li style="text-align: justify;">Hiển thị vector vận tốc theo thời gian.</li>
<li style="text-align: justify;">Sử dụng hệ thống bản đồ đồ họa c&aacute;c điểm mốc, vị tr&iacute; m&aacute;y bay theo hệ tọa độ WGS-84.</li>
<li style="text-align: justify;">Khả năng trao đổi th&ocirc;ng tin đơn giản với c&aacute;c đầu cuối kh&aacute;c trong mạng.</li>
<li style="text-align: justify;">Điều chỉnh c&aacute;c tham số khai th&aacute;c.</li>
<li style="text-align: justify;">Cho ph&eacute;p chỉ hiện c&aacute;c th&ocirc;ng tin cần quan t&acirc;m.</li>
<li style="text-align: justify;">Đồng bộ thời gian với m&aacute;y chủ.</li>
</ul>
</div>
</div>
      `,
    },
    {
      id: 2,
      title: "Hệ thống luân chuyển điện văn không lưu AMHS",
      fullTitle: "Hệ Thống Luân Chuyển Điện Văn Không Lưu AMHS",
      description:
        "Hệ thống AMHS tương thích tiêu chuẩn ICAO, ITU với giải pháp truyền điện văn toàn diện trên nền mạng ATN.",
      image: "https://attech.com.vn/wp-content/uploads/2015/06/AMHS.jpg",
      content: `
      <div class="dnconten">
<p style="text-align: justify;">Hệ thống AMHS của ATTECH tương th&iacute;ch ho&agrave;n to&agrave;n với c&aacute;c đặc tả kỹ thuật hệ thống AMHS (ICAO doc 9880-AN/466, Part II, 1<sup>st</sup>&nbsp;Edition 2010), Cấp chứng chỉ bởi c&ocirc;ng ty AC-B GmbH, Cộng h&ograve;a li&ecirc;n bang Đức (Notified Body acc. EC Regulation 552/2004 for AMHS conformance test service)</p>
<div class="more">
<p style="text-align: justify;">&nbsp;</p>
<ul style="text-align: justify;">
<li>Hệ thống AMHS được ph&aacute;t triển dựa tr&ecirc;n c&aacute;c bộ ti&ecirc;u chuẩn X.400, X.500 của ITU v&agrave; tương th&iacute;ch ho&agrave;n to&agrave;n với ICAO AMHS SARPs, Eurocontrol Community Specifications and regional standards: ICAO Doc 9880, ICAO Annex 10 Vol II, EUR AMHS Manual ASIA/PAC Technial Specification of the Air Traffic Services Message Handling System (AMHS) ... Hệ thống l&agrave; một giải ph&aacute;p truyền điện văn to&agrave;n diện tr&ecirc;n nền hạ tầng mạng viễn thống h&agrave;ng kh&ocirc;ng ATN với khả năng tạo, thu, ph&aacute;t c&aacute;c điện văn AFTN cũng như c&aacute;c điện văn ATS (C&aacute;c điện văn dựa tr&ecirc;n c&aacute;c định dạng sẵn được quy định trong c&aacute;c t&agrave;i liệu của ICAO: ICAO Annex 3, ICAO Doc 444, ICAO Doc 8126, ICAO Doc 9377, ICAO Annex 15 and WMO formats).</li>
<li>&nbsp;Hệ thống AMHS của ATTECH l&agrave; Trang thiết bị h&agrave;ng kh&ocirc;ng đầy đủ điều kiện kỹ thuật đưa v&agrave;o khai th&aacute;c &ndash; Cấp chứng chỉ bởi Cục H&agrave;ng kh&ocirc;ng Việt Nam.</li>
</ul>
<strong>T&iacute;nh năng chủ chốt</strong>
<ul>
<li style="text-align: justify;">Tạo ra m&ocirc;i trường chuyển tiếp tới ATN cho c&aacute;c hệ thống ho&agrave;n to&agrave;n tự động với thế hệ chuyển điện văn ATS/AIS mới.</li>
<li style="text-align: justify;">Cung cấp dịch vụ AMHS cơ bản theo c&aacute;c ti&ecirc;u chuẩn của ICAO, c&oacute; thể mở rộng th&agrave;nh dịch vụ AMHS mở rộng.</li>
<li style="text-align: justify;">Hỗ trợ cả 2 cơ chế địa chỉ ICAO XF v&agrave; CAAS.</li>
<li style="text-align: justify;">Định tuyến c&oacute; hỗ trợ thư mục (c&oacute; thể mở rộng cho việc sử dụng danh s&aacute;ch ph&acirc;n phối).</li>
<li style="text-align: justify;">Quản l&yacute; h&agrave;ng chờ v&agrave; qu&aacute; tr&igrave;nh xử l&yacute; điện văn.</li>
<li style="text-align: justify;">Tự động giải trợ hoặc định tuyến lại.</li>
<li style="text-align: justify;">Lưu trữ (điện văn, nhật k&yacute; hoạt động, thống k&ecirc; v&agrave; c&aacute;nh b&aacute;o)</li>
<li style="text-align: justify;">Truy vết, t&igrave;m kiếm v&agrave; truy xuất điện văn theo c&aacute;c tham số</li>
<li style="text-align: justify;">Thống k&ecirc; theo c&aacute;c tham số</li>
<li style="text-align: justify;">Truyền tin với người sử dụng trong hệ thống theo c&aacute;c giao thức (over ITU-T X400, P7 or P3 protocol)</li>
<li style="text-align: justify;">Hỗ trợ mở rộng của danh s&aacute;ch ph&acirc;n phối</li>
<li style="text-align: justify;">Kết nối với c&aacute;c hệ thống AMHS kh&aacute;c theo giao thức (over ITU-T X400, P1 protocol)</li>
<li style="text-align: justify;">Chuyển đổi định dạng v&agrave; địa chỉ (AFTN tới/từ AMHS)</li>
<li style="text-align: justify;">Cấu h&igrave;nh linh hoạt cho người sử dụng (MTA, routes AMHS/AFTN, address mapping, etc)</li>
<li style="text-align: justify;">Gi&aacute;m s&aacute;t v&agrave; điều khiển hoạt động của hệ thống</li>
<li style="text-align: justify;">Sử dụng giao thức quản l&yacute; SNMP</li>
<li style="text-align: justify;">Triển khai tại một điểm hay nhiều điểm, cấu h&igrave;nh sao lưu v&agrave; phục hồi thảm họa.</li>
<li style="text-align: justify;">C&ocirc;ng cụ ph&acirc;n t&iacute;ch hiệu quả cho việc x&aacute;c định v&agrave; khắc phục lỗi.</li>
<li style="text-align: justify;">Hỗ trợ gi&aacute;m s&aacute;t v&agrave; điều khiển từ xa.</li>
<li style="text-align: justify;">C&oacute; thể cập nhật th&ocirc;ng tin AMHS từ AMC (ATS Management Centre).</li>
</ul>
</div>
</div>
      `,
    },
    {
      id: 3,
      title: "Hệ thống luân chuyển điện văn tự động AMSS",
      fullTitle: "Hệ thống luân chuyển điện văn tự động AMSS",
      description:
        "Chuyển tiếp và phân phối điện văn phục vụ cho việc trao đổi thông tin điều hành hoạt động hàng không trong nước và Quốc tế giữa Cục Hàng không, các hãng hàng không và các Trung tâm kiểm soát điều hành bay",
      image: "https://attech.com.vn/wp-content/uploads/2015/06/AMSS.jpg",
      content: `
<div class="dnconten">
<p style="text-align: justify;">Hệ thống AMSS được lắp đặt tại c&aacute;c Trung t&acirc;m truyền tin AFTN d&ugrave;ng để chuyển tiếp v&agrave; ph&acirc;n phối điện văn phục vụ cho việc trao đổi th&ocirc;ng tin điều h&agrave;nh hoạt động h&agrave;ng kh&ocirc;ng trong nước v&agrave; Quốc tế giữa Cục H&agrave;ng kh&ocirc;ng, c&aacute;c h&atilde;ng h&agrave;ng kh&ocirc;ng v&agrave; c&aacute;c Trung t&acirc;m kiểm s&oacute;at điều h&agrave;nh bay</p>
<div class="more">
<p style="text-align: justify;">&nbsp;</p>
<ul>
<li style="text-align: justify;">Hệ thống hoạt động ổn định, ch&iacute;nh x&aacute;c v&agrave; thuận tiện cho khai th&aacute;c v&agrave; bảo tr&igrave; hệ thống.</li>
<li style="text-align: justify;">Hệ thống gồm 2 Server chuy&ecirc;n dụng v&agrave; c&aacute;c vị tr&iacute; ngoại vi (PCs) hoạt động tr&ecirc;n nền mạng LAN theo cơ chế Hot Stand-by.</li>
<li style="text-align: justify;">Hệ thống l&agrave; một hệ thống mở. Kiến tr&uacute;c hệ thống được modul h&oacute;a với cơ chế dự ph&ograve;ng n&oacute;ng n&ecirc;n c&oacute; độ tin cậy cao, dễ d&agrave;ng cho việc bảo tr&igrave; cũng như mở rộng hệ thống.</li>
<li style="text-align: justify;">Giao diện c&aacute;c ứng dụng được thiết kế đơn giản, trực quan, nhất qu&aacute;n trong to&agrave;n hệ thống</li>
<li style="text-align: justify;">Y&ecirc;u cầu điều kiện lắp đặt như sau:</li>
<li style="text-align: justify;">Điện nguồn 220V &plusmn; 10%; 50 Hz c&oacute; qua UPS.</li>
<li style="text-align: justify;">Nhiệt độ trong ph&ograve;ng l&agrave;m việc 22 &plusmn; 2 độ C, độ ẩm dưới 65%.</li>
</ul>
</div>
</div>
      `,
    },
    {
      id: 4,
      title: "Đèn chỉ thị góc tiếp cận chính xác - PAPI",
      fullTitle: "Đèn chỉ thị góc tiếp cận chính xác - PAPI",
      description:
        "Chuyển tiếp và phân phối điện văn phục vụ cho việc trao đổi thông tin điều hành hoạt động hàng không trong nước và Quốc tế giữa Cục Hàng không, các hãng hàng không và các Trung tâm kiểm soát điều hành bay",
      image: "https://attech.com.vn/wp-content/uploads/2022/09/den-Papi.jpg",
      content: `
<p style="text-align: justify;">Đ&egrave;n chỉ thị g&oacute;c tiếp cận ch&iacute;nh x&aacute;c - PAPI l&agrave; hệ thống đ&egrave;n chỉ thị g&oacute;c tiếp cận ch&iacute;nh x&aacute;c - PAPI gồm tổ hợp của 4 bộ đ&egrave;n PAPI c&oacute; chức năng trợ gi&uacute;p phi c&ocirc;ng tiếp cận bằng mắt theo g&oacute;c hạ c&aacute;nh ti&ecirc;u chuẩn v&agrave; thường được lắp đặt ở b&ecirc;n tr&aacute;i đường CHC theo hướng hạ c&aacute;nh.</p>
      `,
    },
    {
      id: 5,
      title: "Đèn lề đường CHC hai hướng lắp nổi",
      fullTitle: "Đèn lề đường CHC hai hướng lắp nổi",
      description:
        "Trợ giúp dẫn đường cho phi công và các phương tiện hoạt động trên sân bay trong điều kiện tầm nhìn kém.",
      image:
        "https://attech.com.vn/wp-content/uploads/2015/05/Den_le_CHC_2_huong.jpg",
      content: `
<p><span class="StoreProductSummary">Đ&egrave;n lề đường CHC hai hướng lắp nổi được lắp đặt hai b&ecirc;n lề đường CHC với chiều rộng đường băng l&ecirc;n tới 60m nhằm trợ gi&uacute;p dẫn đường cho phi c&ocirc;ng v&agrave; c&aacute;c phương tiện hoạt động tr&ecirc;n s&acirc;n bay trong điều kiện tầm nh&igrave;n k&eacute;m</span></p>
<div class="more">
<p>&nbsp;</p>
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
<li>B&oacute;ng đ&egrave;n Halogen 150W/6.6A, Tuổi thọ 1000h@6.6A</li>
<li>Sử dụng nguồn 6.6A v&agrave; một biến d&ograve;ng c&aacute;ch ly 150W hoặc 200W</li>
</ul>
</div>
      `,
    },
    {
      id: 6,
      title: "Đèn lề đường lăn lắp nổi LED",
      fullTitle: "Đèn lề đường lăn lắp nổi LED",
      category: "Hệ thống đèn hiệu",
      description:
        "Đèn lề đường lăn được lắp đặt 2 bên lề đường lăn và lề sân đỗ nhằm trợ giúp dẫn đường cho các phương tiện hoạt động trên sân bay trong điều kiện tầm nhìn kém",
      image:
        "https://attech.com.vn/wp-content/uploads/2015/05/Den_le_duong_lan_LED_-_halogen.jpg",
      content: `
<p>Đ&egrave;n lề đường lăn được lắp đặt 2 b&ecirc;n lề đường lăn v&agrave; lề s&acirc;n đỗ nhằm trợ gi&uacute;p dẫn đường cho c&aacute;c phương tiện hoạt động tr&ecirc;n s&acirc;n bay trong điều kiện tầm nh&igrave;n k&eacute;m</p>
<div class="more">
<p><strong>Đặc t&iacute;nh;</strong></p>
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
<strong>Vật liệu v&agrave; ho&agrave;n thiện</strong>
<ul>
<li>Th&acirc;n đ&egrave;n, th&acirc;n tr&ecirc;n, th&acirc;n dưới đ&uacute;c &aacute;p lực bằng nh&ocirc;m hợp kim</li>
<li>Quả cầu nối l&agrave;m bằng nhựa chịu mưa, nắng</li>
<li>Tấm h&atilde;m dưới, bu l&ocirc;ng, đai ốc l&agrave; vật liệu th&eacute;p kh&ocirc;ng rỉ</li>
<li>D&acirc;y nối 2 sợi chịu nhiệt</li>
<li>Lớp đổ c&aacute;ch điện cho khối nguồn bằng keo 2 th&agrave;nh phần chịu nhiệt</li>
<li>Th&acirc;n đ&egrave;n, th&acirc;n tr&ecirc;n, th&acirc;n dưới sơn tĩnh điện, loại sơn chịu mưa nắng ngo&agrave;i trời, m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
</ul>
<strong>Nguồn điện</strong>
<ul>
<li>B&oacute;ng đ&egrave;n LED 8W/1.1A, Tuổi thọ 10000h</li>
<li>Sử dụng nguồn 6.6A v&agrave; một biến d&ograve;ng c&aacute;ch ly 25W/1.1A</li>
</ul>
</div>
      `,
    },
    {
      id: 7,
      title: "Đèn chớp lắp nổi",
      fullTitle: "Đèn chớp lắp nổi",
      category: "Hệ thống đèn hiệu",
      description:
        "Đèn chớp 1 hướng lắp nổi được sử dụng lắp đặt cho đèn chớp nhận dạng thềm đường CHC (RTIL).",
      image:
        "https://attech.com.vn/wp-content/uploads/2015/04/Den-chop-lap-noi.jpg",

      content: `
<div class="Normal"><span class="StoreProductSummary">Đ&egrave;n chớp 1 hướng lắp nổi được sử dụng lắp đặt cho đ&egrave;n chớp nhận dạng thềm đường CHC (RTIL)..</span></div>
<p>&nbsp;</p>
<div class="more">
<p><strong>Đặc t&iacute;nh:</strong></p>
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
<strong>Vật liệu v&agrave; ho&agrave;n thiện:</strong>
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
<strong>M&ocirc;i trường lắp đặt:</strong>
<ul>
<li>Nhiệt độ l&agrave;m việc: 0-55<sup>0</sup>C</li>
<li>Độ ẩm: 100%</li>
<li>Gi&oacute;: 278 km/h</li>
</ul>
</div>
      `,
    },
    {
      id: 8,
      title: "Đèn pha 1 hướng lắp nổi",
      fullTitle: "Đèn pha 1 hướng lắp nổi",
      category: "Hệ thống đèn hiệu",
      description:
        "Đèn pha 1 hướng được sử dụng lắp đặt cho đèn tiếp cận CAT I, II và III với ánh sáng trắng (Clear) và ánh sáng đỏ (Red)..",
      image:
        "https://attech.com.vn/wp-content/uploads/2015/05/Den_pha_1_huong.jpg",
      content: `
<div class="Normal">
<p>Đ&egrave;n pha 1 hướng được sử dụng lắp đặt cho đ&egrave;n tiếp cận CAT I, II v&agrave; III với &aacute;nh s&aacute;ng trắng (Clear) v&agrave; &aacute;nh s&aacute;ng đỏ (Red)..</p>
<div class="more">
<p><strong>Đặc t&iacute;nh:</strong></p>
<ul>
<li>Sử dụng b&oacute;ng đ&egrave;n halogen kh&ocirc;ng qu&aacute; 200W &ndash; Pk30d tuổi thọ&nbsp;<a href="mailto:1000h@6.6A">1000h@6.6A</a>, ti&ecirc;u điểm b&oacute;ng ch&iacute;nh x&aacute;c, b&oacute;ng được g&aacute; lắp ch&iacute;nh x&aacute;c tr&ecirc;n th&acirc;n đ&egrave;n.</li>
<li>Bảo dưỡng, thay b&oacute;ng đ&egrave;n thuận tiện: Mở nắp sau kh&ocirc;ng cần th&aacute;o cụm quang học ph&iacute;a trước, kh&ocirc;ng cần dụng cụ, kh&ocirc;ng cần gioăng v&agrave; đai kẹp.</li>
<li>K&iacute;nh lọc m&agrave;u (Clear, Red, Green) với bề mặt ngo&agrave;i nhẵn kh&ocirc;ng b&aacute;m bụi v&agrave; tự l&agrave;m sạch khi trời mưa.</li>
<li>D&acirc;y thứ cấp nằm b&ecirc;n trong đ&egrave;n được bảo vệ khỏi &aacute;nh nắng mặt trời.</li>
<li>Đ&egrave;n lắp đặt tr&ecirc;n mặt đất, cọc v&agrave; tr&ecirc;n cột đ&egrave;n an to&agrave;n, lắp đặt với ống ti&ecirc;u chuẩn đường k&iacute;nh ngo&agrave;i D 60mm.</li>
<li>Điều chỉnh đ&egrave;n theo g&oacute;c tầm v&agrave; g&oacute;c hướng dễ d&agrave;ng bằng c&aacute;c bu l&ocirc;ng v&agrave; được kh&oacute;a chặt bằng đai ốc.</li>
</ul>
<strong>Kết cấu:</strong>
<ul>
<li>Gồm 20 chi tiết(xem catalog)</li>
</ul>
<strong>Vật liệu v&agrave; ho&agrave;n thiện:</strong>
<ul>
<li>K&iacute;nh lọc m&agrave;u l&agrave;m bằng thủy tinh chịu nhiệt.</li>
<li>Th&acirc;n đ&egrave;n, cổ đ&egrave;n đ&uacute;c &aacute;p lực bằng nh&ocirc;m hợp kim.</li>
<li>Nắp sau l&agrave;m bằng nhựa chịu nắng mưa, chịu nhiệt.</li>
<li>Bu l&ocirc;ng, đai ốc, v&iacute;t&hellip; l&agrave; vật liệu th&eacute;p kh&ocirc;ng rỉ.</li>
<li>D&acirc;y nối 2 cực, v&ograve;ng đệm chịu nhiệt.</li>
<li>Th&acirc;n đ&egrave;n, cổ đ&egrave;n sơn tĩnh điện, loại sơn chịu mưa nắng ngo&agrave;i trời, m&agrave;u v&agrave;ng h&agrave;ng kh&ocirc;ng.</li>
</ul>
<strong>Nguồn điện:</strong>
<ul>
<li>B&oacute;ng đ&egrave;n Halogen 100/150/200W/6.6A, Tuổi thọ&nbsp;<a href="mailto:1000h@6.6A">1000h@6.6A</a></li>
<li>Sử dụng d&acirc;y 2 cực 2,5mm<sup>2</sup>&nbsp;(hoặc AWG 12) giữa biến d&ograve;ng c&aacute;ch ly v&agrave; đ&egrave;n, nguồn 6.6A v&agrave; một biến d&ograve;ng c&aacute;ch ly 100W, 150W hoặc 200W.</li>
</ul>
</div>
</div>
      `,
    },
    {
      id: 9,
      title: "Đèn pha xoay",
      fullTitle: "Đèn chớp lắp nổi",
      category: "Hệ thống đèn hiệu",
      description:
        "Đèn pha xoay được sử dụng để trợ giúp phi công xác định được vị trí của sân bay trong điều kiện tầm nhìn kém hoặc ban đêm",
      image:
        "https://attech.com.vn/wp-content/uploads/2015/05/Den_pha_xoay.jpg",

      content: `
<div class="dnconten">
<p style="text-align: justify;">Hệ thống AMSS được lắp đặt tại c&aacute;c Trung t&acirc;m truyền tin AFTN d&ugrave;ng để chuyển tiếp v&agrave; ph&acirc;n phối điện văn phục vụ cho việc trao đổi th&ocirc;ng tin điều h&agrave;nh hoạt động h&agrave;ng kh&ocirc;ng trong nước v&agrave; Quốc tế giữa Cục H&agrave;ng kh&ocirc;ng, c&aacute;c h&atilde;ng h&agrave;ng kh&ocirc;ng v&agrave; c&aacute;c Trung t&acirc;m kiểm s&oacute;at điều h&agrave;nh bay</p>
<div class="more">
<p style="text-align: justify;">&nbsp;</p>
<ul>
<li style="text-align: justify;">Hệ thống hoạt động ổn định, ch&iacute;nh x&aacute;c v&agrave; thuận tiện cho khai th&aacute;c v&agrave; bảo tr&igrave; hệ thống.</li>
<li style="text-align: justify;">Hệ thống gồm 2 Server chuy&ecirc;n dụng v&agrave; c&aacute;c vị tr&iacute; ngoại vi (PCs) hoạt động tr&ecirc;n nền mạng LAN theo cơ chế Hot Stand-by.</li>
<li style="text-align: justify;">Hệ thống l&agrave; một hệ thống mở. Kiến tr&uacute;c hệ thống được modul h&oacute;a với cơ chế dự ph&ograve;ng n&oacute;ng n&ecirc;n c&oacute; độ tin cậy cao, dễ d&agrave;ng cho việc bảo tr&igrave; cũng như mở rộng hệ thống.</li>
<li style="text-align: justify;">Giao diện c&aacute;c ứng dụng được thiết kế đơn giản, trực quan, nhất qu&aacute;n trong to&agrave;n hệ thống</li>
<li style="text-align: justify;">Y&ecirc;u cầu điều kiện lắp đặt như sau:</li>
<li style="text-align: justify;">Điện nguồn 220V &plusmn; 10%; 50 Hz c&oacute; qua UPS.</li>
<li style="text-align: justify;">Nhiệt độ trong ph&ograve;ng l&agrave;m việc 22 &plusmn; 2 độ C, độ ẩm dưới 65%.</li>
</ul>
</div>
</div>
      `,
    },
    {
      id: 10,
      title: "Shelter Composite",
      fullTitle: "Shelter Composite",
      category: "Shelter",
      description:
        "Phòng đặt thiết bị (Shelter) được sử dụng để lắp đặt tại các đài/trạm như: DVOR/DME, ADS-B, Localizer (LLZ), Glide Path, ILS, trạm viễn thông BTS,...Phòng đặt thiết bị phải đảm bảo cho các thiết bị bên trong hoạt động an toàn trong mọi điều kiện thời tiết, đảm bảo thông tin tại các trạm được liên tục.",
      image:
        "https://attech.com.vn/wp-content/uploads/2015/06/shelter-composite.jpg",
      content: `
<div class="dnconten">
<p style="text-align: justify;">Hệ thống AMSS được lắp đặt tại c&aacute;c Trung t&acirc;m truyền tin AFTN d&ugrave;ng để chuyển tiếp v&agrave; ph&acirc;n phối điện văn phục vụ cho việc trao đổi th&ocirc;ng tin điều h&agrave;nh hoạt động h&agrave;ng kh&ocirc;ng trong nước v&agrave; Quốc tế giữa Cục H&agrave;ng kh&ocirc;ng, c&aacute;c h&atilde;ng h&agrave;ng kh&ocirc;ng v&agrave; c&aacute;c Trung t&acirc;m kiểm s&oacute;at điều h&agrave;nh bay</p>
<div class="more">
<p style="text-align: justify;">&nbsp;</p>
<ul>
<li style="text-align: justify;">Hệ thống hoạt động ổn định, ch&iacute;nh x&aacute;c v&agrave; thuận tiện cho khai th&aacute;c v&agrave; bảo tr&igrave; hệ thống.</li>
<li style="text-align: justify;">Hệ thống gồm 2 Server chuy&ecirc;n dụng v&agrave; c&aacute;c vị tr&iacute; ngoại vi (PCs) hoạt động tr&ecirc;n nền mạng LAN theo cơ chế Hot Stand-by.</li>
<li style="text-align: justify;">Hệ thống l&agrave; một hệ thống mở. Kiến tr&uacute;c hệ thống được modul h&oacute;a với cơ chế dự ph&ograve;ng n&oacute;ng n&ecirc;n c&oacute; độ tin cậy cao, dễ d&agrave;ng cho việc bảo tr&igrave; cũng như mở rộng hệ thống.</li>
<li style="text-align: justify;">Giao diện c&aacute;c ứng dụng được thiết kế đơn giản, trực quan, nhất qu&aacute;n trong to&agrave;n hệ thống</li>
<li style="text-align: justify;">Y&ecirc;u cầu điều kiện lắp đặt như sau:</li>
<li style="text-align: justify;">Điện nguồn 220V &plusmn; 10%; 50 Hz c&oacute; qua UPS.</li>
<li style="text-align: justify;">Nhiệt độ trong ph&ograve;ng l&agrave;m việc 22 &plusmn; 2 độ C, độ ẩm dưới 65%.</li>
</ul>
</div>
</div>
      `,
    },
    {
      id: 11,
      title: "Shelter Thép",
      fullTitle: "Shelter Thép",
      category: "Shelter",
      description:
        "Được sử dụng để lắp đặt tại các đài/trạm như: DVOR/DME, ADS-B, Localizer (LLZ), Glide Path, ILS, trạm viễn thông BTS,...",
      image: "https://attech.com.vn/wp-content/uploads/2015/05/Shelter.jpg",
      content: `
<div class="dnconten">
<p style="text-align: justify;">Hệ thống AMSS được lắp đặt tại c&aacute;c Trung t&acirc;m truyền tin AFTN d&ugrave;ng để chuyển tiếp v&agrave; ph&acirc;n phối điện văn phục vụ cho việc trao đổi th&ocirc;ng tin điều h&agrave;nh hoạt động h&agrave;ng kh&ocirc;ng trong nước v&agrave; Quốc tế giữa Cục H&agrave;ng kh&ocirc;ng, c&aacute;c h&atilde;ng h&agrave;ng kh&ocirc;ng v&agrave; c&aacute;c Trung t&acirc;m kiểm s&oacute;at điều h&agrave;nh bay</p>
<div class="more">
<p style="text-align: justify;">&nbsp;</p>
<ul>
<li style="text-align: justify;">Hệ thống hoạt động ổn định, ch&iacute;nh x&aacute;c v&agrave; thuận tiện cho khai th&aacute;c v&agrave; bảo tr&igrave; hệ thống.</li>
<li style="text-align: justify;">Hệ thống gồm 2 Server chuy&ecirc;n dụng v&agrave; c&aacute;c vị tr&iacute; ngoại vi (PCs) hoạt động tr&ecirc;n nền mạng LAN theo cơ chế Hot Stand-by.</li>
<li style="text-align: justify;">Hệ thống l&agrave; một hệ thống mở. Kiến tr&uacute;c hệ thống được modul h&oacute;a với cơ chế dự ph&ograve;ng n&oacute;ng n&ecirc;n c&oacute; độ tin cậy cao, dễ d&agrave;ng cho việc bảo tr&igrave; cũng như mở rộng hệ thống.</li>
<li style="text-align: justify;">Giao diện c&aacute;c ứng dụng được thiết kế đơn giản, trực quan, nhất qu&aacute;n trong to&agrave;n hệ thống</li>
<li style="text-align: justify;">Y&ecirc;u cầu điều kiện lắp đặt như sau:</li>
<li style="text-align: justify;">Điện nguồn 220V &plusmn; 10%; 50 Hz c&oacute; qua UPS.</li>
<li style="text-align: justify;">Nhiệt độ trong ph&ograve;ng l&agrave;m việc 22 &plusmn; 2 độ C, độ ẩm dưới 65%.</li>
</ul>
</div>
</div>
      `,
    },
  ];

  useEffect(() => {
    const foundproduct = products.find((s) => s.id === parseInt(productId));
    setproduct(foundproduct);
  }, [productId]);

  if (!product) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-title">
          <h1>{product.fullTitle}</h1>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="product-detail-body">
        <div
          className="product-detail-content"
          dangerouslySetInnerHTML={{ __html: product.content }}
        />
      </div>
    </div>
  );
};

export default ProductDetail;

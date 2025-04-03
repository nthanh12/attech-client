import React from "react";
import { useParams } from "react-router-dom";

const contentData = {
  cns: `
  <p><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://attech.com.vn/wp-content/uploads/2015/02/DV-ky-thuat-CNS-s.jpg" alt="DV-ky-thuat-CNS-s" /></strong></p>
<p style="text-align: center;"><strong>C&Ocirc;NG TY TNHH KỸ THUẬT QUẢN L&Yacute; BAY (ATTECH) L&Agrave; NH&Agrave; CUNG CẤP DỊCH VỤ TH&Ocirc;NG TIN, DẪN ĐƯỜNG, GI&Aacute;M S&Aacute;T (CNS) CHO NG&Agrave;NH H&Agrave;NG KH&Ocirc;NG VIỆT NAM</strong></p>
<p style="text-align: left;">C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay (ATTECH) tự h&agrave;o l&agrave; nh&agrave; cung cấp dịch vụ chuy&ecirc;n ng&agrave;nh Th&ocirc;ng tin (Communication &ndash; C), dẫn đường (Navigation &ndash; N), Gi&aacute;m s&aacute;t (Surveilance- S) h&agrave;ng kh&ocirc;ng h&agrave;ng đầu tại Việt Nam.</p>
<p style="text-align: left;"><strong>I. C&Aacute;C DỊCH VỤ DO C&Ocirc;NG TY CUNG CẤP:</strong></p>
<p style="text-align: left;">Với đội ngũ nh&acirc;n vi&ecirc;n tinh nhuệ, chuy&ecirc;n nghiệp gồm h&agrave;ng chục kỹ sư d&agrave;y dạn kinh nghiệm, được đ&agrave;o tạo b&agrave;i bản trong v&agrave; ngo&agrave;i nước, cộng với đội ngũ b&aacute;n h&agrave;ng chuy&ecirc;n nghiệp, C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay hiện l&agrave; đối t&aacute;c tin cậy cung cấp dịch vụ CNS&nbsp;cho Tổng c&ocirc;ng ty Quản l&yacute; bay Việt Nam, Cục h&agrave;ng kh&ocirc;ng Singapore v&agrave; l&agrave; đối t&aacute;c cung cấp dịch vụ kỹ thuật cho thiết bị dẫn đường VOR, ILS, DME của h&atilde;ng SELEX- Hoa Kỳ tại Việt Nam v&agrave; nhiều nước tr&ecirc;n thế giới. C&aacute;c dịch vụ do C&ocirc;ng ty cung cấp trong lĩnh vực CNS gồm:</p>
<p style="text-align: left;"><strong>1. Dịch vụ CNS&nbsp;phục vụ điều h&agrave;nh bay:</strong></p>
<ul style="text-align: left;">
<li>Dịch vụ th&ocirc;ng tin dẫn đường DVOR/DME &amp; NDB</li>
<li>Dịch vụ th&ocirc;ng tin VHF/VSAT&nbsp;</li>
<li>Dịch vụ gi&aacute;m s&aacute;t ADS-B</li>
<li>Dịch vụ AMHS</li>
</ul>
<p style="text-align: left;"><strong>2. Dịch vụ kỹ thuật chuy&ecirc;n ng&agrave;nh CNS:</strong></p>
<ul style="text-align: left;">
<li>Khảo s&aacute;t vị tr&iacute; lắp đặt</li>
<li>Lắp đặt, th&ocirc;ng điện, hiệu chỉnh</li>
<li>Hỗ trợ bay hiệu chuẩn</li>
<li>Sửa chữa cấu kiện</li>
<li>Bảo h&agrave;nh ủy quyền</li>
<li>Bảo dưỡng định kỳ</li>
</ul>
<p style="text-align: left;"><strong>3. Dịch vụ huấn luyện chuy&ecirc;n ng&agrave;nh CNS:</strong></p>
<p style="text-align: left;">Trung t&acirc;m huấn luyện CNS của ATTECH l&agrave; đơn vị duy nhất tại Việt nam đủ ti&ecirc;u chuẩn được Cục h&agrave;ng kh&ocirc;ng Việt Nam cấp ph&eacute;p huấn luyện dịch vụ chuy&ecirc;n ngh&agrave;nh CNS.</p>
<ul style="text-align: left;">
<li>Huấn luyện, đ&agrave;o tạo tại hiện trường</li>
<li>Huấn luyện đ&agrave;o tạo tại trung t&acirc;m CNS</li>
</ul>
<p style="text-align: left;"><strong>II. NĂNG LỰC KINH NGHIỆM</strong>:</p>
<p style="text-align: left;"><strong>1. Năng lực kinh nghiệm trong lĩnh vực cung cấp dịch vụ CNS phục vụ điều h&agrave;nh bay:&nbsp;</strong>(minh họa bằng h&igrave;nh A.1-1 đến A.1-4)</p>
<ul style="text-align: left;">
<li>ATTECH hiện đang quản l&yacute;, khai th&aacute;c v&agrave; cung cấp dịch vụ CNS cho Tổng c&ocirc;ng ty Quản l&yacute; bay Việt Nam gồm: 25 đ&agrave;i DVOR/DME v&agrave; NDB, 12 trạm ADS-B, 02 trạm VHF/VSAT ngo&agrave;i Biển Đ&ocirc;ng.</li>
<li>ATTECH hiện đang quản l&yacute;, khai th&aacute;c 02 trạm ADS-B/VHF/VSAT C&ocirc;n Sơn v&agrave; C&agrave; Mau cung cấp dịch vụ ADS-B v&agrave; VHF cho Cục h&agrave;ng kh&ocirc;ng Singapore.</li>
<li>Lắp đặt v&agrave; cung cấp dịch vụ AMHS cho Tổng c&ocirc;ng ty Quản l&yacute; bay Việt Nam.</li>
</ul>
<p style="text-align: left;"><strong>2. Năng lực kinh nghiệm trong lĩnh vực cung cấp dịch vụ kỹ thuật chuy&ecirc;n ngh&agrave;nh CNS:&nbsp;</strong>(minh họa bằng h&igrave;nh A.2-1 đến A.2-2)</p>
<ul style="text-align: left;">
<li>Thi c&ocirc;ng lắp đặt hệ thống th&ocirc;ng tin vệ tinh DOMSAT, VSAT</li>
<li>Chuyển đổi hệ thống th&ocirc;ng tinh vệ tinh VSAT quản l&yacute; bay từ sử dụng vệ tinh Thaicom 1A sang vệ tinh Thaicom5</li>
<li>Thi c&ocirc;ng lắp đặt c&aacute;c trạm th&ocirc;ng tin VHF/HF</li>
<li>Thi c&ocirc;ng lắp đặt hệ thống chuyển mạch thoại VCCS, hệ thống đồng hồ thời gian chuẩn&hellip;</li>
<li>Khảo s&aacute;t vị tr&iacute; (Site survey), lắp đặt, th&ocirc;ng điện hiệu chỉnh,hỗ trợ bay hiệu chuẩn c&aacute;c hệ thống NDB, DVOR/DME, ILS/DME tại Việt Nam, L&agrave;o, Campuchia, Malaysia, Indonesia, Trung Quốc, Philippines, Ấn Độ, Bangladesh, Kenya, Đ&agrave;i Loan&hellip;</li>
<li>Thi c&ocirc;ng lắp đặt, hiệu chỉnh mặt đất khi bay hiệu chuẩn c&aacute;c hệ thống đ&egrave;n hiệu s&acirc;n bay tại Việt Nam, L&agrave;o&hellip;</li>
<li>Khảo s&aacute;t vị tr&iacute;, thi c&ocirc;ng lắp đặt hệ thống gi&aacute;m phụ thuộc tự động quảng b&aacute; ( ADS-B) tại Việt Nam</li>
<li>Bảo dưỡng, sửa chữa phần cơ kh&iacute; cho c&aacute;c hệ thống radar Vinh, Nội B&agrave;i.</li>
<li>Bảo dưỡng, sửa chữa hệ thống anten ph&aacute;t DGPS cho Cục Bản Đồ.</li>
<li>Sửa chữa v&agrave; thay mới radome cho c&aacute;c hệ thống radar Sơn Tr&agrave; v&agrave; một số trạm radar qu&acirc;n sự.</li>
<li>Sửa chữa c&aacute;c khối card, cấu kiện thiết bị CNS cho kh&aacute;ch h&agrave;ng trong v&agrave; ngo&agrave;i nước.</li>
</ul>
<p style="text-align: left;"><strong>3. Năng lực kinh nghiệm trong lĩnh vực cung cấp dịch vụ huấn luyện:</strong></p>
<ul style="text-align: left;">
<li>Huấn luyện hiện trường cho h&atilde;ng Selex cấp chứng chỉ tại Kenya, Philippin, Bangladesh, Việt Nam.</li>
<li>Từ năm 2009 đến nay đ&atilde; tổ chức được 240 lớp huấn luyến, cấp chứng chỉ huấn luyện CNS cho 3960 lượt người cho Tổng c&ocirc;ng ty Quản l&yacute; bay Việt Nam v&agrave; c&aacute;c đơn vị b&ecirc;n ngo&agrave;i.</li>
</ul>
<p style="text-align: left;">&nbsp;<strong>III. TI&Ecirc;U CHUẨN Đ&Aacute;P ỨNG</strong>:</p>
<p style="text-align: left;">&ndash; C&aacute;c dịch vụ CNS được cung cấp với ti&ecirc;u chuẩn quốc tế, được quản l&yacute; chất lượng theo ti&ecirc;u chuẩn ISO 9001:2015.</p>
<p style="text-align: left;">&nbsp;&ndash; C&aacute;c hệ thống thiết bị CNS đ&aacute;p ứng ti&ecirc;u chuẩn kỹ thuật của tổ chức h&agrave;ng kh&ocirc;ng d&acirc;n dụng quốc tế ICAO</p>
<p style="text-align: center;"><a href="https://attech.com.vn/wp-content/uploads/2015/02/CNS.jpg"><img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS.jpg" alt="CNS" width="535" height="789" /></a></p>
<p style="text-align: center;"><em>A.1-1</em></p>
<p style="text-align: center;"><em>Tầm phủ c&aacute;c đ&agrave;i dẫn đường thuộc ATTECH</em></p>
<p style="text-align: center;"><a href="https://attech.com.vn/wp-content/uploads/2015/02/CNS1.jpg"><img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS1.jpg" alt="CNS1" width="537" height="556" /></a></p>
<p style="text-align: center;"><em>A.1-2</em></p>
<p style="text-align: center;"><em>Hệ thống 12 trạm ADS-B ATTECH đang quản l&yacute; v&agrave; khai th&aacute;c tr&ecirc;n to&agrave;n quốc</em></p>
<p style="text-align: center;"><a href="https://attech.com.vn/wp-content/uploads/2015/02/CNS2.png.jpg"><img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS2.png.jpg" alt="CNS2.png" width="536" height="402" /></a></p>
<p style="text-align: center;"><em>A.1-3</em></p>
<p style="text-align: center;"><em>02 Trạm VHF/VSAT ATTECH quản l&yacute; v&agrave; khai th&aacute;c tại Đảo Trường Sa Lớn v&agrave; Song Tử T&acirc;y</em></p>
<p style="text-align: center;"><a href="https://attech.com.vn/wp-content/uploads/2015/02/CNS3.jpg"><img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS3.jpg" alt="CNS3" width="545" height="323" /></a></p>
<p style="text-align: center;"><em>A.1-4</em></p>
<p style="text-align: center;"><em>Hệ thống đ&agrave;i VOR/DME ATTECH đang quản l&yacute; v&agrave; khai th&aacute;c tr&ecirc;n to&agrave;n quốc</em></p>
<p style="text-align: center;"><a href="https://attech.com.vn/wp-content/uploads/2015/02/CNS4.jpg"><img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS4.jpg" alt="CNS4" width="543" height="389" /></a></p>
<p style="text-align: center;"><a href="https://attech.com.vn/wp-content/uploads/2015/02/CNS5.jpg"><img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS5.jpg" alt="CNS5" width="543" height="382" /></a></p>
<p style="text-align: center;"><em>A.2-1</em></p>
<p style="text-align: center;"><em>Thi c&ocirc;ng, lắp đặt hệ thống DVOR/DME</em></p>
<p style="text-align: center;"><a href="https://attech.com.vn/wp-content/uploads/2015/02/CNS6.jpg"><img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS6.jpg" alt="CNS6" width="548" height="642" /></a></p>
<p style="text-align: center;"><a href="https://attech.com.vn/wp-content/uploads/2015/02/CNS7.jpg"><img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS7.jpg" alt="CNS7" width="548" height="408" /></a></p>
<p style="text-align: center;"><em>A.2-2</em></p>
<p style="text-align: center;"><em>Thi c&ocirc;ng lắp đặt hệ thống thiết bị ILS/DME</em></p>
  `,
  flightcheck: `
  <hr /><p style="text-align: center;"><br /><a href="https://attech.com.vn/wp-content/uploads/2015/02/DV-BHC1.jpg"><img class="alignleft  wp-image-2301" src="https://attech.com.vn/wp-content/uploads/2015/02/DV-BHC1.jpg" alt="DV-BHC" width="659" height="215" /></a><span id="more-337"></span></p>
<p style="text-align: left;"><strong>GIỚI THIỆU:</strong></p>
<p style="text-align: left;">Đội Bay kiểm tra hiệu chuẩn được th&agrave;nh lập theo Quyết định số 115/QĐ-KTQLB ng&agrave;y 19 th&aacute;ng 08 năm 2010 với nhiệm vụ Tổ chức cung cấp dịch vụ bay kiểm tra hiệu chuẩn c&aacute;c thiết bị dẫn đường gi&aacute;m s&aacute;t h&agrave;ng kh&ocirc;ng v&agrave; bay đ&aacute;nh gi&aacute; phương thức bay.</p>
<p style="text-align: left;">Năm 2010 Cục H&agrave;ng kh&ocirc;ng Việt Nam đ&atilde; cấp giấy ph&eacute;p c&ocirc;ng nhận ATTECH l&agrave; nh&agrave; cung cấp dịch vụ bay kiểm tra hiệu chuẩn v&agrave; bay đ&aacute;nh gi&aacute; phương thức bay duy nhất tại Việt Nam tu&acirc;n thủ v&agrave; đ&aacute;p ứng đầy đủ c&aacute;c ti&ecirc;u chuẩn khuyến c&aacute;o của tổ chức h&agrave;ng kh&ocirc;ng d&acirc;n dụng quốc tế ICAO, quy định ph&aacute;p luật hiện h&agrave;nh của Nh&agrave; nước.</p>
<p style="text-align: left;"><strong>HỆ THỐNG THIẾT BỊ</strong></p>
<p style="text-align: left;">Dịch vụ bay kiểm tra hiệu chuẩn, bay đ&aacute;nh gi&aacute; phương thức bay của ATTECH sử dụng t&agrave;u bay hai động cơ cỡ nhỏ đ&atilde; được cải tiến, lắp đặt anten v&agrave; thiết bị bay hiệu chuẩn c&ocirc;ng nghệ ti&ecirc;n tiến tr&ecirc;n thế giới.</p>
<p style="text-align: left;">Hệ thống thiết bị bay hiệu chuẩn, bay đ&aacute;nh gi&aacute; phương thức bay lắp tr&ecirc;n m&aacute;y bay l&agrave; hệ thống thiết bị bay hiệu chuẩn ho&agrave;n to&agrave;n tự động sử dụng c&ocirc;ng nghệ ti&ecirc;n tiến nhất tr&ecirc;n thế giới hiện nay. Hệ thống tham chiếu vị tr&iacute; DGPS dưới mặt đất c&oacute; độ ch&iacute;nh x&aacute;c cao (sai số dưới 10cm) cho ph&eacute;p thực hiện bay hiệu chuẩn c&aacute;c thiết bị y&ecirc;u cầu độ ch&iacute;nh x&aacute;c cao như ILS/DME, PAPI&hellip;</p>
<p style="text-align: left;">Bằng việc sử dụng c&ocirc;ng nghệ bay hiệu chuẩn ho&agrave;n to&agrave;n tự động mới, thiết bị bay hiệu chuẩn c&oacute; khả năng:</p>
<p style="text-align: left;">&ndash;&nbsp; Bay hiệu chuẩn hệ thống ILS đến Cat III</p>
<p style="text-align: left;">&ndash; Thu thập v&agrave; xử l&yacute; dữ liệu trong thời gian thực, lưu trữ dữ liệu bay hiệu chuẩn li&ecirc;n tục trong qu&aacute; tr&igrave;nh thực hiện nhiệm vụ.</p>
<p style="text-align: left;">&ndash; Thu thập v&agrave; xử l&yacute; dữ liệu song song đồng thời khi thực hiện bay hiệu chuẩn thiết bị VOR v&agrave; ILS.</p>
<p style="text-align: left;">&ndash; C&aacute;c th&ocirc;ng số kết quả đo v&agrave; đồ thị được hiển thị trong thời gian thực.</p>
<p style="text-align: left;">&ndash; In kết quả ngay lập tức trong qu&aacute; tr&igrave;nh bay hiệu chuẩn.</p>
<p style="text-align: left;"><strong>ĐỘI BAY</strong></p>
<p style="text-align: left;">Phi c&ocirc;ng bay hiệu chuẩn (inspector pilot) v&agrave; thanh tra bay hiệu chuẩn (flight inspector) của ATTECH l&agrave; những người c&oacute; hơn 10 năm kinh nghiệm, am hiểu s&acirc;u về thiết bị dẫn đường, phương thức bay, được đ&agrave;o tạo b&agrave;i bản tại c&aacute;c trung t&acirc;m huấn luyện h&agrave;ng đầu Ch&acirc;u &Acirc;u trong lĩnh vực bay kiểm tra hiệu chuẩn, bay đ&aacute;nh gi&aacute; phương thức bay v&agrave; được Cục H&agrave;ng kh&ocirc;ng Việt Nam c&ocirc;ng nhận năng lực v&agrave; cấp giấy ph&eacute;p.</p>
<p style="text-align: left;"><strong>DỊCH VỤ CUNG CẤP</strong></p>
<p style="text-align: left;">Với hệ thống thiết bị v&agrave; nguồn lực đội bay hiện c&oacute;, ATTECH c&oacute; khả năng thực hiện bay kiểm tra, hiệu chuẩn c&aacute;c hệ thống dẫn đường gi&aacute;m s&aacute;t:</p>
<p style="text-align: left;">&ndash; ILS/DME Cat I, II, III</p>
<p style="text-align: left;">&ndash; VOR/DME</p>
<p style="text-align: left;">&ndash; NDB</p>
<p style="text-align: left;">&ndash; RADAR (PSR, SSR)</p>
<p style="text-align: left;">&ndash; MARKER Beacon</p>
<p style="text-align: left;">&ndash; PAPI</p>
<p style="text-align: left;">&ndash; Hệ thống đ&egrave;n hiệu s&acirc;n bay</p>
<p style="text-align: left;">Bay kiểm tra hiệu chuẩn, đ&aacute;nh gi&aacute; phương thức dẫn đường theo t&iacute;nh năng PBN:</p>
<p style="text-align: left;">&ndash; RNAV/RNP:</p>
<p style="text-align: left;">+ RNAV/RNP SID, RNAV/RNP STAR, RNP APCH (LNAV), RNP APCH (LNAV/VNAV)&nbsp;</p>
<p style="text-align: left;">C&aacute;c h&igrave;nh thức bay hiệu chuẩn:</p>
<p style="text-align: left;">&ndash; Bay hiệu chuẩn cơ bản (Commissionning)</p>
<p style="text-align: left;">&ndash; Bay hiệu chuẩn định kỳ (Routine)</p>
<p style="text-align: left;">&ndash; Bay hiệu chuẩn đặc biệt (Special)</p>
<p style="text-align: left;"><strong>TI&Ecirc;U CHUẨN Đ&Aacute;P ỨNG/ T&Agrave;I LIỆU &Aacute;P DỤNG</strong></p>
<p style="text-align: left;">&ndash; Luật H&agrave;ng kh&ocirc;ng d&acirc;n dụng Việt Nam.</p>
<p style="text-align: left;">&ndash; Th&ocirc;ng tư&nbsp;19/2017/TT-BGTVT quy định về quản l&yacute; v&agrave; bảo đảm hoạt động bay.</p>
<p style="text-align: left;">&ndash; T&agrave;i liệu hướng dẫn cung cấp dịch vụ bay kiểm tra hiệu chuẩn.</p>
<p style="text-align: left;">&ndash; T&agrave;i liệu ICAO: Annex 10, Doc 8071, Doc 9906 &hellip;</p>
<p style="text-align: center;"><strong>&nbsp;</strong></p>
`,
  testing: `
  <p><a href="https://attech.com.vn/wp-content/uploads/2015/02/anh-thu-nghiem-hieu-chuan-2019.jpg"><img class="aligncenter size-full wp-image-6891" style="display: block; margin-left: auto; margin-right: auto;" src="https://attech.com.vn/wp-content/uploads/2015/02/anh-thu-nghiem-hieu-chuan-2019.jpg" alt="anh thu nghiem hieu chuan 2019" /></a></p>
<p style="text-align: left;"><strong>GIỚI THIỆU</strong></p>
<p style="text-align: left;">Với mục ti&ecirc;u cung cấp c&aacute;c sản phẩm, dịch vụ c&oacute; chất lượng cao nhất, đ&aacute;p ứng c&aacute;c ti&ecirc;u chuẩn quốc gia v&agrave; quốc tế, ATTECH x&aacute;c định phải kh&ocirc;ng ngừng n&acirc;ng cao năng lực hiệu chuẩn, thử nghiệm của m&igrave;nh. V&igrave; vậy, ATTECH đ&atilde; tập trung đầu tư về cơ sở vật chất v&agrave; con người cho hệ thống ph&ograve;ng th&iacute; nghiệm, &aacute;p dụng hệ thống quản l&yacute; chất lượng ISO/IEC 17025:2017. Đến nay, ph&ograve;ng th&iacute; nghiệm của ATTECH đ&atilde; được Văn ph&ograve;ng c&ocirc;ng nhận chất lượng thuộc Bộ Khoa học c&ocirc;ng nghệ Việt Nam cấp chứng chỉ VILAS. Với hệ thống ph&ograve;ng th&iacute; nghiệm đạt ti&ecirc;u chuẩn c&ugrave;ng với đội ngũ kỹ sư c&oacute; chuy&ecirc;n m&ocirc;n cao, gi&agrave;u kinh nghiệm, ATTECH cam kết cung cấp đến Qu&yacute; kh&aacute;ch h&agrave;ng c&aacute;c dịch vụ hiệu chuẩn, thử nghiệm tốt nhất v&agrave; tin cậy nhất.</p>
<p style="text-align: left;"><strong>NĂNG LỰC KINH NGHIỆM</strong></p>
<p style="text-align: left;">Với gần 30 năm kinh nghiệm cung cấp dịch vụ, c&ugrave;ng với việc nhanh ch&oacute;ng &aacute;p dụng c&aacute;c hệ thống quản l&yacute; chất lượng ti&ecirc;n tiến như ISO 9001:2015, ISO/IEC 17025:2017, ATTECH đảm bảo đủ năng lực cung cấp dịch vụ thử nghiệm hiệu chuẩn, đ&aacute;p ứng ti&ecirc;u chuẩn của quốc gia v&agrave; quốc tế cho tất cả c&aacute;c kh&aacute;ch h&agrave;ng.</p>
<p style="text-align: left;"><strong>DỊCH VỤ CUNG CẤP</strong></p>
<p style="text-align: left;">&ndash; Dịch vụ hiệu chuẩn c&aacute;c thiết bị đo lường</p>
<p style="text-align: left;">&ndash; Dịch vụ đo lường, thử nghiệm quang học</p>
<p style="text-align: left;">&ndash; Dịch vụ thử nghiệm m&ocirc;i trường</p>
<p style="text-align: left;"><strong>CƠ SỞ VẬT CHẤT</strong></p>
<p style="text-align: left;">Ph&ograve;ng thử nghiệm, hiệu chuẩn của ATTECH c&oacute; cơ sở hạ tầng hiện đại v&agrave; đồng bộ, ph&ugrave; hợp với y&ecirc;u cầu của hệ thống chất lượng ISO/IEC 17025:2017, đảm bảo cung cấp c&aacute;c dịch vụ tốt nhất cho kh&aacute;ch h&agrave;ng.</p>
<p style="text-align: left;">Đối với dịch vụ hiệu chuẩn thiết bị, ph&ograve;ng th&iacute; nghiệm được trang bị đầy đủ c&aacute;c thiết bị đo mẫu hiện đại với độ ch&iacute;nh x&aacute;c cao, dải đo rộng của c&aacute;c h&atilde;ng thiết bị đo h&agrave;ng đầu thế giới như Fluke, Agilent, Rohde&amp;Schwarz&hellip; C&aacute;c thiết bị n&agrave;y thường xuy&ecirc;n được hiệu chuẩn tại Viện đo lường Việt Nam để đảm bảo cung cấp c&aacute;c kết quả hiệu chuẩn ch&iacute;nh x&aacute;c, tin cậy nhất.</p>
<p style="text-align: left;">Đối với dịch vụ đo lường, thử nghiệm quang học, ph&ograve;ng thử nghiệm được trang bị hệ thống đo quang học hiện đại, điều khiển bằng phần mềm với c&aacute;c phương ph&aacute;p đo được lập tr&igrave;nh sẵn bảo đảm cung cấp c&aacute;c kết quả đo nhanh ch&oacute;ng, ch&iacute;nh x&aacute;c v&agrave; tin cậy nhất.</p>
<p style="text-align: left;">Đối với dịch vụ thử nghiệm m&ocirc;i trường, buồng thử nghiệm c&oacute; k&iacute;ch thước lớn 5x3x2(m), được trang bị c&aacute;c thiết bị đo v&agrave; điều khiển hiện đại đảm bảo cung cấp c&aacute;c dịch vụ thử nghiệm cho nhiều loại sản phẩm với c&aacute;c k&iacute;ch thước kh&aacute;c nhau.</p>
<p style="text-align: left;"><strong>TI&Ecirc;U CHUẨN Đ&Aacute;P ỨNG</strong></p>
<p style="text-align: left;">Hệ thống ph&ograve;ng th&iacute; nghiệm của ATTECH đ&aacute;p ứng ti&ecirc;u chuẩn của quốc gia v&agrave; quốc tế như:</p>
<p style="text-align: left;">&ndash; Ti&ecirc;u chuẩn ISO 9001:2015</p>
<p style="text-align: left;">&ndash; Ti&ecirc;u chuẩn ISO/IEC 17025:2017</p>
<p style="text-align: left;">&ndash; Ti&ecirc;u chuẩn ICAO của Hiệp hội H&agrave;ng kh&ocirc;ng d&acirc;n dụng Quốc tế: ICAO Annex 14</p>
<p style="text-align: left;">&ndash; Ti&ecirc;u chuẩn Việt Nam: TCVN 5176:1990.</p>
`,
  training: `
<div class="dnconten"><a href="https://attech.com.vn/wp-content/uploads/2015/02/DV-HLDT-small.jpg"><img class="alignnone size-full wp-image-2237" style="display: block; margin-left: auto; margin-right: auto;" src="https://attech.com.vn/wp-content/uploads/2015/02/DV-HLDT-small.jpg" alt="DV-HLDT-small" /></a></div>
<p style="text-align: center;">&nbsp;</p>
<div class="dnconten">
<p style="text-align: left;"><strong>GIỚI THIỆU</strong></p>
<p style="text-align: left;">Với bề dầy hơn 30 năm kinh nghiệm trong lĩnh vực cung cấp c&aacute;c sản phẩm&nbsp;v&agrave; dịch vụ trong ng&agrave;nh H&agrave;ng kh&ocirc;ng, C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay tự h&agrave;o l&agrave; nh&agrave; cung cấp dịch vụ kỹ thuật ng&agrave;nh Th&ocirc;ng tin (Communication &ndash; C), Dẫn đường (Navigation &ndash; N), Gi&aacute;m s&aacute;t (Surveillance &ndash; S) h&agrave;ng đầu Việt Nam.</p>
<p style="text-align: left;">Để đ&aacute;p ứng nhu cầu n&acirc;ng cao chất lượng nguồn nh&acirc;n lực v&agrave; với chiến lược ph&aacute;t triển ATTECH th&agrave;nh một thương hiệu mạnh trong lĩnh vực kỹ thuật h&agrave;ng kh&ocirc;ng tại thị trường Việt Nam v&agrave; từng bước vươn ra thị trường khu vực v&agrave; thế giới, ng&agrave;y 27/11/2008 Trung t&acirc;m Huấn luyện CNS được th&agrave;nh lập theo QĐ số 2436/QĐ-QLB. Ng&agrave;y 26/05/2020, Cục H&agrave;ng kh&ocirc;ng Việt Nam đ&atilde; ban h&agrave;nh Giấy chứng nhận số 2073/GCN-CHK v&agrave; Quyết định số 805/QĐ-CHK chứng nhận C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay l&agrave; cơ sở đủ điều kiện huấn luyện nghiệp vụ nh&acirc;n vi&ecirc;n h&agrave;ng kh&ocirc;ng chuy&ecirc;n ng&agrave;nh th&ocirc;ng tin, dẫn đường, gi&aacute;m s&aacute;t.</p>
<p style="text-align: left;"><strong>NĂNG LỰC KINH NGHIỆM</strong></p>
<p style="text-align: left;">Với chất lượng giảng dạy cao, kh&oacute;a học được thiết kế ưu việt, cơ sở vật chất thiết bị giảng dạy hiện đại v&agrave; chứng chỉ c&oacute; gi&aacute; trị, Trung t&acirc;m Huấn luyện CNS hiện l&agrave; cơ sở huấn luyện duy nhất trong ng&agrave;nh H&agrave;ng kh&ocirc;ng đủ điều kiện đ&aacute;p ứng nhu cầu huấn luyện nh&acirc;n vi&ecirc;n h&agrave;ng kh&ocirc;ng chuy&ecirc;n ng&agrave;nh th&ocirc;ng tin, dẫn đường, gi&aacute;m s&aacute;t h&agrave;ng kh&ocirc;ng theo Nghị định số 92/2016/NĐ-CP của Ch&iacute;nh phủ v&agrave; Th&ocirc;ng tư số 10/2018/TT-BGTVT của Bộ GTVT.</p>
<p style="text-align: left;">Trung t&acirc;m huấn luyện CNS đ&atilde; thực hiện được nhiều kh&oacute;a huấn luyện trong v&agrave; ngo&agrave;i C&ocirc;ng ty với h&agrave;ng trăm lượt học vi&ecirc;n. Sau mỗi kh&oacute;a huấn luyện, c&aacute;c học vi&ecirc;n sẽ nắm được những kiến thức cơ bản, những kỹ năng thực tế về khai th&aacute;c, bảo dưỡng thiết bị v&agrave; được cấp Chứng chỉ chuy&ecirc;n m&ocirc;n theo ti&ecirc;u chuẩn của Cục H&agrave;ng kh&ocirc;ng Việt Nam.</p>
<p style="text-align: left;"><strong>DỊCH VỤ CUNG CẤP</strong></p>
<p style="text-align: left;">Trung t&acirc;m Huấn luyện CNS hiện đang triển khai c&aacute;c h&igrave;nh thức huấn luyện gồm: Huấn luyện năng định, định kỳ, phục hồi, chuyển loại chuy&ecirc;n ng&agrave;nh th&ocirc;ng tin, dẫn đường, gi&aacute;m s&aacute;t h&agrave;ng kh&ocirc;ng. B&ecirc;n cạnh đ&oacute;, Trung t&acirc;m c&ograve;n c&oacute; c&aacute;c kh&oacute;a huấn luyện cơ bản v&agrave; n&acirc;ng cao được thiết kế ph&ugrave; hợp với y&ecirc;u cầu kh&aacute;ch h&agrave;ng.</p>
<p style="text-align: left;">Dịch vụ huấn luyện đ&atilde; được &aacute;p dụng hệ thống QLCL ISO 9001:2015 đảm bảo cho kh&aacute;ch h&agrave;ng nhận được dịch vụ một c&aacute;ch ổn định v&agrave; tốt nhất.</p>
<p style="text-align: left;"><strong>CƠ SỞ VẬT CHẤT</strong></p>
<p style="text-align: left;">Trung t&acirc;m huấn luyện c&oacute; hệ thống ph&ograve;ng học, ph&ograve;ng thực h&agrave;nh, ph&ograve;ng thiết bị v&agrave; thư viện đ&aacute;p ứng ti&ecirc;u chuẩn của Bộ GTVT về nh&acirc;n vi&ecirc;n h&agrave;ng kh&ocirc;ng v&agrave; cơ sở đ&agrave;o tạo nh&acirc;n vi&ecirc;n h&agrave;ng kh&ocirc;ng tại Th&ocirc;ng tư số 10/2018/TT-BGTVT&nbsp; của Bộ GTVT.</p>
<p style="text-align: left;"><strong>ĐỘI NGŨ GI&Aacute;O VI&Ecirc;N</strong></p>
<p style="text-align: left;">Đội ngũ huấn luyện vi&ecirc;n của C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay đ&atilde; được Cục trưởng Cục H&agrave;ng kh&ocirc;ng ph&ecirc; duyệt tại Quyết định số 802/QĐ-CHK ng&agrave;y 25/05/2020 đủ ti&ecirc;u chuẩn tham gia giảng dạy nghiệp vụ nh&acirc;n vi&ecirc;n h&agrave;ng kh&ocirc;ng chuy&ecirc;n ng&agrave;nh th&ocirc;ng tin, dẫn đường, gi&aacute;m s&aacute;t.</p>
</div>
`,
  consulting: `
<div class="dnconten">
<p><a href="https://attech.com.vn/wp-content/uploads/2015/02/TVTK-anhs.jpg"><img class="aligncenter size-full wp-image-5506" style="display: block; margin-left: auto; margin-right: auto;" src="https://attech.com.vn/wp-content/uploads/2015/02/TVTK-anhs.jpg" alt="TVTK anhs" /></a><br /><span id="more-356"></span></p>
<p style="text-align: left;"><strong>GIỚI THIỆU</strong></p>
<p style="text-align: left;">Dịch vụ Tư vấn đầu tư x&acirc;y dựng v&agrave; QLDA l&agrave; một trong c&aacute;c dịch vụ của c&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay do Ban Quản l&yacute; dự &aacute;n Đầu tư v&agrave; X&acirc;y dựng chuy&ecirc;n ng&agrave;nh &ndash; Chi nh&aacute;nh của c&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay thực hiện, cung cấp. Với tr&ecirc;n 10 năm kinh nghiệm v&agrave; đội ngũ kỹ sư, kiến tr&uacute;c sư v&agrave; c&aacute;n bộ chuy&ecirc;n m&ocirc;n c&oacute; tr&igrave;nh độ, Ban Quản l&yacute; dự &aacute;n Đầu tư v&agrave; X&acirc;y dựng chuy&ecirc;n ng&agrave;nh đ&atilde; tổ chức v&agrave; thực hiện c&aacute;c dịch vụ tư vấn đầu tư x&acirc;y dựng v&agrave; quản l&yacute; dự &aacute;n bao gồm: Khảo s&aacute;t, lập dự &aacute;n đầu tư x&acirc;y dựng, thiết kế x&acirc;y dựng, tổ chức lựa chọn nh&agrave; thầu, gi&aacute;m s&aacute;t thi c&ocirc;ng x&acirc;y dựng v&agrave; lắp đặt thiết bị, quản l&yacute; chi ph&iacute; đầu tư x&acirc;y dựng v&agrave; quản l&yacute; dự &aacute;n theo nhiệm vụ sản xuất kinh doanh của C&ocirc;ng ty.</p>
<p style="text-align: left;"><strong>NĂNG LỰC KINH NGHIỆM</strong></p>
<p style="text-align: left;">&ndash; Tư vấn đầu tư x&acirc;y dựng bao gồm:</p>
<p style="text-align: left;">+ Khảo s&aacute;t; lập dự &aacute;n đầu tư x&acirc;y dựng v&agrave; lập hồ sơ thiết kế x&acirc;y dựng</p>
<p style="text-align: left;">+ Tổ chức lựa chọn nh&agrave; thầu</p>
<p style="text-align: left;">+ Gi&aacute;m s&aacute;t thi c&ocirc;ng x&acirc;y dựng v&agrave; lắp đặt thiết bị</p>
<p style="text-align: left;">+ Tư vấn quản l&yacute; chi ph&iacute; đầu tư x&acirc;y dựng gồm lập Tổng mức đầu tư, dự to&aacute;n x&acirc;y dựng, gi&aacute; g&oacute;i thầu, gi&aacute; hợp đồng x&acirc;y dựng, định mức x&acirc;y dựng v&agrave; gi&aacute; x&acirc;y dựng, thanh to&aacute;n v&agrave; quyết to&aacute;n hợp đồng x&acirc;y dựng, thanh to&aacute;n v&agrave; quyết to&aacute;n vốn đầu tư x&acirc;y dựng c&ocirc;ng tr&igrave;nh. X&acirc;y dựng định mức, đơn gi&aacute; c&aacute;c sản phẩm, dịch vụ do C&ocirc;ng ty cung cấp tr&ecirc;n cơ sở định mức kinh tế-kỹ thuật, ph&aacute;p quy của Nh&agrave; nước.</p>
<p style="text-align: left;">&ndash; Tư vấn quản l&yacute; dự &aacute;n đầu tư x&acirc;y dựng bao gồm: Quản l&yacute; về phạm vi, kế hoạch c&ocirc;ng việc; khối lượng c&ocirc;ng việc; chất lượng x&acirc;y dựng; tiến độ thực hiện; chi ph&iacute; đầu tư x&acirc;y dựng; an to&agrave;n trong thi c&ocirc;ng x&acirc;y dựng; bảo vệ m&ocirc;i trường trong x&acirc;y dựng; lựa chọn nh&agrave; thầu v&agrave; hợp đồng x&acirc;y dựng; quản l&yacute; rủi ro v&agrave; c&aacute;c nội dung cần thiết kh&aacute;c được thực hiện theo quy định của Luật x&acirc;y dựng v&agrave; quy định kh&aacute;c của ph&aacute;p luật c&oacute; li&ecirc;n quan.</p>
<p style="text-align: left;"><strong>DỊCH VỤ CUNG CẤP</strong></p>
<p style="text-align: left;">Dịch vụ khảo s&aacute;t, tư vấn lập dự &aacute;n đầu tư, lập hồ sơ thiết kế v&agrave; dự to&aacute;n c&aacute;c c&ocirc;ng tr&igrave;nh, tổ chức lựa chọn nh&agrave; thầu v&agrave; x&acirc;y dựng c&aacute;c định mức kinh tế kỹ thuật cho c&aacute;c sản phẩm, dịch vụ chuy&ecirc;n ng&agrave;nh h&agrave;ng kh&ocirc;ng:</p>
<p style="text-align: left;">&ndash; Hệ thống thiết bị hạ c&aacute;nh ILS/DME ti&ecirc;u chuẩn CAT I v&agrave; CAT II.</p>
<p style="text-align: left;">&ndash; Hệ thống đ&agrave;i dẫn đường, c&aacute;c trạm th&ocirc;ng tin NDB, DVOR/DME.</p>
<p style="text-align: left;">&ndash; Hệ thống điện nguồn, biển b&aacute;o, đ&egrave;n phụ trợ dẫn đường s&acirc;n bay đ&aacute;p ứng ti&ecirc;u chuẩn CAT I, II, III.</p>
<p style="text-align: left;">&ndash; C&aacute;c trạm th&ocirc;ng tin vệ tinh VSAT, DOMSAT&hellip;</p>
<p style="text-align: left;">&ndash; C&aacute;c trạm Rađa gi&aacute;m s&aacute;t H&agrave;ng kh&ocirc;ng, ADS-B&hellip;</p>
<p style="text-align: left;">&ndash; T&iacute;ch hợp hệ thống, triển khai c&aacute;c phần mềm ứng dụng, đảm bảo kỹ thuật cho c&aacute;c mạng c&ocirc;ng nghệ th&ocirc;ng tin, dẫn đường, gi&aacute;m s&aacute;t H&agrave;ng kh&ocirc;ng.</p>
<p style="text-align: left;">&ndash; Hệ thống trang thiết bị phục vụ điều h&agrave;nh hoạt động bay tại Đ&agrave;i kiểm so&aacute;t kh&ocirc;ng lưu (TWR), tại Trung t&acirc;m điều</p>
<p style="text-align: left;">h&agrave;nh bay kiểm so&aacute;t tiếp cận (APP) v&agrave; Trung t&acirc;m phối hợp điều h&agrave;nh bay đường d&agrave;i (ACC).</p>
<p style="text-align: left;">&ndash; Hệ thống chống s&eacute;t to&agrave;n diện cho c&aacute;c hạng mục c&ocirc;ng tr&igrave;nh (chống s&eacute;t đ&aacute;nh thẳng, lan truyền, cảm ứng), tiếp đất cho c&aacute;c c&ocirc;ng tr&igrave;nh kỹ thuật, c&aacute;c hệ thống trang thiết bị kỹ thuật.</p>
<p style="text-align: left;"><strong>TI&Ecirc;U CHUẨN Đ&Aacute;P ỨNG</strong></p>
<p style="text-align: left;">&ndash; Kh&aacute;ch h&agrave;ng sẽ nhận được sản phẩm tư vấn theo đ&uacute;ng quy định ph&aacute;p l&yacute; hiện h&agrave;nh của Nh&agrave; nước, c&aacute;c quy định khuyến c&aacute;o của Tổ chức H&agrave;ng kh&ocirc;ng d&acirc;n dụng Quốc tế (ICAO).</p>
<p style="text-align: left;">&ndash; Sản phẩm tư vấn của ATTECH đ&aacute;p ứng c&aacute;c ti&ecirc;u chuẩn của Hệ thống quản l&yacute; chất lượng ISO 9001:2015 v&agrave; thỏa m&atilde;n y&ecirc;u cầu mong muốn c&aacute;c kh&aacute;ch h&agrave;ng.</p>
</div>
`,
};
const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const content =
    contentData[serviceSlug] ||
    "<h2>Không thể hiển thị do nội dung không tồn tại hoặc đã bị xóa!</h2>";
  console.log(content);

  return (
    <div className="service-content-wrap">
      <div className="cns-container">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="sidebar-"></div>
    </div>
  );
};

export default ServiceDetail;

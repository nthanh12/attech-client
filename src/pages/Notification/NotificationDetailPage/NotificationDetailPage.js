import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import sanitizeHtml from "sanitize-html";
import "./NotificationDetailPage.css";

const NotificationDetailPage = () => {
  const { slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  // Dữ liệu giả lập (NotificationData)
  const notificationData = [
    {
      id: 1,
      slug: "danh-sach-nhan-su-trung-tuyen-dot-3-nam-2024",
      title: "Danh sách nhân sự trúng tuyển đợt 3 năm 2024",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
      date: "31/03/2025",
      content: `
<div class="tintucconten-featured-text"><a title="Danh s&aacute;ch nh&acirc;n sự tr&uacute;ng tuyển đợt 3 năm 2024" href="https://attech.com.vn/tintucdanh-sach-nhan-su-trung-tuyen-dot-3-nam-2024-2/?ref=tuyen-dung">Danh s&aacute;ch nh&acirc;n sự tr&uacute;ng tuyển đợt 3 năm 2024</a></div>
<p>Danh s&aacute;ch nh&acirc;n sự tr&uacute;ng tuyển đợt 3&nbsp;năm 2024&nbsp;vị tr&iacute; Nh&acirc;n vi&ecirc;n Bay hiệu chuẩn&nbsp;của C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay.</p>
<div>
<h3>T&agrave;i liệu đ&iacute;nh k&egrave;m</h3>
<ul class="post-attachments">
<li class="post-attachment mime-applicationpdf"><a href="https://attech.com.vn/wp-content/uploads/2024/12/DS-NS-trung-tuyen-Dot-3-vi-tri-NV-BHC.pdf">DS NS trung tuyen Dot 3 vi tri NV BHC</a>&nbsp;(20.61 KB)</li>
</ul>
</div>
      `,
    },
    {
      id: 2,
      slug: "thong-tin-tuyen-dung-dot-3-nam-2024",
      title: "Thông tin tuyển dụng đợt 3 năm 2024",
      image: "https://jobsgo.vn/blog/wp-content/uploads/2021/05/mau-1.jpg",
      date: "30/04/2024",
      content: `
      <p style="text-align: justify;"><strong>C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay (t&ecirc;n gọi tắt l&agrave; ATTECH) l&agrave; một trong những đơn vị kỹ thuật h&agrave;ng đầu của ng&agrave;nh h&agrave;ng kh&ocirc;ng Việt Nam với 3 lĩnh vực kinh doanh cốt l&otilde;i l&agrave; cung cấp dịch vụ Th&ocirc;ng tin &ndash; Dẫn đường &ndash; Gi&aacute;m s&aacute;t h&agrave;ng kh&ocirc;ng, dịch vụ&nbsp;<a title="Bay kiểm tra hiệu chuẩn" href="https://attech.com.vn/dich-vu-bay-kiem-tra-hieu-chuan/">Bay kiểm tra hiệu chuẩn</a>&nbsp;v&agrave; Sản xuất c&ocirc;ng nghiệp h&agrave;ng kh&ocirc;ng.</strong></p>
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: justify;">Ch&uacute;ng t&ocirc;i cần đội ngũ nh&acirc;n vi&ecirc;n tinh th&ocirc;ng, chuy&ecirc;n nghiệp, tận t&acirc;m v&agrave; s&aacute;ng tạo để vận h&agrave;nh khai th&aacute;c c&aacute;c hệ thống thiết bị hiện đại tại c&aacute;c đ&agrave;i/trạm th&ocirc;ng tin, dẫn đường, gi&aacute;m s&aacute;t h&agrave;ng kh&ocirc;ng cũng như tổ chức c&aacute;c hoạt động sản xuất kinh doanh đặc th&ugrave;. Đến với ch&uacute;ng t&ocirc;i, c&aacute;c bạn sẽ được l&agrave;m việc trong m&ocirc;i trường chuy&ecirc;n nghiệp, c&ocirc;ng bằng với mức thu nhập xứng đ&aacute;ng; được ghi nhận, tr&acirc;n trọng sự cống hiến; được tạo cơ hội thăng tiến nghề nghiệp.</p>
<p style="text-align: justify;">Sau khi tr&uacute;ng tuyển, c&aacute;c bạn sẽ được C&ocirc;ng ty k&yacute; Hợp đồng lao động x&aacute;c định thời hạn, thời gian thử việc tối đa 60 ng&agrave;y v&agrave; được hưởng chế độ đ&atilde;i ngộ tương ứng với năng lực của c&aacute; nh&acirc;n<em>.&nbsp;</em>Ri&ecirc;ng đối với nh&acirc;n vi&ecirc;n bảo đảm hoạt động bay&nbsp;<em>(nh&acirc;n vi&ecirc;n bay hiệu chuẩn, nh&acirc;n vi&ecirc;n kỹ thuật/khai th&aacute;c thiết bị th&ocirc;ng tin dẫn đường gi&aacute;m s&aacute;t)</em>, thời hạn hợp đồng kh&ocirc;ng qu&aacute; 12 th&aacute;ng v&agrave; sẽ được C&ocirc;ng ty đ&agrave;o tạo, huấn luyện kiến thức chuy&ecirc;n m&ocirc;n về th&ocirc;ng tin, dẫn đường, gi&aacute;m s&aacute;t h&agrave;ng kh&ocirc;ng<em>.</em></p>
<p style="text-align: justify;">Sau khi hết hạn Hợp đồng lao động đầu ti&ecirc;n, t&ugrave;y thuộc v&agrave;o năng lực v&agrave; kết quả thực hiện c&ocirc;ng việc của c&aacute; nh&acirc;n, C&ocirc;ng ty sẽ k&yacute; kết Hợp đồng lao động kh&ocirc;ng x&aacute;c định thời hạn hoặc Hợp đồng lao động x&aacute;c định thời hạn từ 12 th&aacute;ng đến 36 th&aacute;ng.</p>
<h2 style="text-align: justify;"><strong>I. TH&Ocirc;NG TIN CHUNG</strong></h2>
<p style="text-align: justify;">Đợt 3 năm 2024 ch&uacute;ng t&ocirc;i tiếp tục tuyển dụng 11 nh&acirc;n sự cho c&aacute;c vị tr&iacute; sau:1. THỜI GIAN NHẬN HỒ SƠ V&Agrave; TỔ CHỨC THI TUYỂN</p>
<p style="text-align: justify;">&ndash; Thời gian nhận hồ sơ từ ng&agrave;y 17/10/2024 đến hết ng&agrave;y 31/10/2024. Thời gian tổ chức thi tuyển dự kiến từ ng&agrave;y 07/11/2024.</p>
<p style="text-align: justify;">&ndash; Ứng vi&ecirc;n c&oacute; thể đăng k&yacute; dự tuyển ở nhiều vị tr&iacute; chức danh nếu thỏa m&atilde;n y&ecirc;u cầu tuyển dụng.</p>
<h3 style="text-align: justify;">2. NƠI NHẬN HỒ SƠ</h3>
<p style="text-align: justify;">&ndash; Hồ sơ bản giấy: Bộ phận Văn thư c&ocirc;ng ty &ndash; C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay: Ph&ograve;ng 324 tầng 3, T&ograve;a nh&agrave; B, Số 5/200 Nguyễn Sơn, phường Bồ Đề, quận Long Bi&ecirc;n, th&agrave;nh phố H&agrave; Nội (<em>căn cứ dấu gửi đi của Bưu điện tr&ecirc;n b&igrave; thư để x&aacute;c định ng&agrave;y nộp hồ sơ của ứng vi&ecirc;n).</em></p>
<p style="text-align: justify;">&ndash; Hồ sơ bản PDF: gửi đến địa chỉ email&nbsp;<a href="mailto:tuyendung@attech.com.vn" target="_blank">tuyendung@attech.com.vn</a></p>
<h3 style="text-align: justify;">3. ĐỊA ĐIỂM L&Agrave;M VIỆC</h3>
<p style="text-align: justify;">&ndash; Đối với c&aacute;c vị tr&iacute; chức danh của Văn ph&ograve;ng C&ocirc;ng ty, Ph&ograve;ng Nghi&ecirc;n cứu &ndash; ph&aacute;t triển, Đội bay kiểm tra hiệu chuẩn: l&agrave;m việc tại Trụ sở ch&iacute;nh C&ocirc;ng ty (Số 5/200 đường Nguyễn Sơn, phường Bồ Đề, quận Long Bi&ecirc;n, th&agrave;nh phố H&agrave; Nội).</p>
<p style="text-align: justify;">&ndash; Đối với vị tr&iacute; chức danh Nh&acirc;n vi&ecirc;n l&aacute;i xe: l&agrave;m việc tại Chi nh&aacute;nh của C&ocirc;ng ty tại Th&agrave;nh phố Hồ Ch&iacute; Minh (Số 58 Trường Sơn, Phường 2, Quận T&acirc;n B&igrave;nh, th&agrave;nh phố Hồ Ch&iacute; Minh).</p>
<p style="text-align: justify;">&ndash; Đối với c&aacute;c vị tr&iacute; chức danh Nh&acirc;n vi&ecirc;n kỹ thuật th&ocirc;ng tin, dẫn đường, gi&aacute;m s&aacute;t:</p>
<p style="text-align: justify;">+ Đ&agrave;i Phan Thiết &ndash; 240/10 Trần Qu&yacute; C&aacute;p, TP. Phan Thiết, B&igrave;nh Thuận;</p>
<p style="text-align: justify;">+ Trạm CNS Trường Sa 50% l&agrave;m việc tại đảo Trường Sa Lớn v&agrave; Song Tử T&acirc;y; 50% thời gian c&ograve;n lại l&agrave;m việc tại H&agrave; Nội.</p>
<h3 style="text-align: justify;">4. THỜI GIỜ L&Agrave;M VIỆC</h3>
<p style="text-align: justify;">&ndash; Đối với c&aacute;c vị tr&iacute; l&agrave;m việc theo giờ h&agrave;nh ch&iacute;nh: kh&ocirc;ng qu&aacute; 8 giờ/ng&agrave;y v&agrave; kh&ocirc;ng qu&aacute; 48 giờ/tuần (từ thứ 2 đến hết chiều thứ 7 h&agrave;ng tuần).</p>
<p style="text-align: justify;">&ndash; Đối với vị tr&iacute; Nh&acirc;n vi&ecirc;n l&aacute;i xe: kh&ocirc;ng qu&aacute; 10 giờ/ng&agrave;y, 48 giờ/tuần, được bố tr&iacute; nghỉ trọn vẹn 24 giờ/1 tuần. Nếu l&agrave;m việc v&agrave;o c&aacute;c ng&agrave;y lễ, tết được hưởng c&aacute;c chế độ theo quy định của ph&aacute;p luật.</p>
<p style="text-align: justify;">&ndash; Đối với c&aacute;c vị tr&iacute; l&agrave;m việc theo ca (3ca/ng&agrave;y): kh&ocirc;ng qu&aacute; 10 giờ/ng&agrave;y, 48 giờ/tuần; được bố tr&iacute; nghỉ trọn vẹn 24 giờ/1 tuần. Nếu ca l&agrave;m việc được rơi v&agrave;o c&aacute;c ng&agrave;y lễ, tết được hưởng c&aacute;c chế độ theo quy định của ph&aacute;p luật.</p>
<h3 style="text-align: justify;">5. CHẾ ĐỘ Đ&Atilde;I NGỘ</h3>
<p style="text-align: justify;">Thu nhập của Người lao động khi l&agrave;m việc tại C&ocirc;ng ty bao gồm Tiền lương chức danh&nbsp;<em>(t&ugrave;y thuộc v&agrave;o năng lực từng c&aacute; nh&acirc;n)</em>; c&aacute;c khoản phụ cấp lương (phụ cấp khu vực, thu h&uacute;t, lưu động, th&acirc;m ni&ecirc;n, biển đảo, l&agrave;m việc tr&ecirc;n kh&ocirc;ng, tr&aacute;ch nhiệm,&nbsp;<em>c&aacute;c khoản phụ cấp n&agrave;y phụ thuộc v&agrave;o vị tr&iacute; chức danh, địa điểm l&agrave;m việc/c&ocirc;ng t&aacute;c NLĐ đảm nhận</em>); c&aacute;c khoản bổ sung (tiền lương chuy&ecirc;n cần, hiệu quả (th&aacute;ng, năm), l&agrave;m việc v&agrave;o ban đ&ecirc;m, th&ecirc;m giờ, ki&ecirc;m nhiệm); tiền thưởng (lễ, tết, ng&agrave;y kỷ niệm, thưởng qu&yacute;).</p>
<h4 style="text-align: justify;">5.1Thu nhập của Người lao động</h4>
<p>&nbsp;</p>
<p style="text-align: justify;"><strong><u>Ghi ch&uacute;</u></strong>:</p>
<p style="text-align: justify;">&ndash; Trong thời gian thử việc&nbsp;<em>(tối đa 60 ng&agrave;y)</em>, nh&acirc;n sự được hưởng Tiền lương chức danh, tiền lương chuy&ecirc;n cần, tiền ăn ca, phụ cấp (nếu c&oacute;), tiền thưởng trong c&aacute;c dịp Lễ, tết theo quyết định cụ thể tại C&ocirc;ng ty. Sau thời gian thử việc, nh&acirc;n sự trở th&agrave;nh nh&acirc;n vi&ecirc;n ch&iacute;nh thức tại C&ocirc;ng ty, được hưởng th&ecirc;m tiền lương hiệu quả th&aacute;ng.</p>
<p style="text-align: justify;">&ndash; Mức thu nhập tr&ecirc;n l&agrave; của bậc lương thấp nhất (bậc 1) trong hệ thống bảng lương của C&ocirc;ng ty đối với nh&acirc;n vi&ecirc;n ch&iacute;nh thức. Bậc lương cao nhất trong bảng lương của C&ocirc;ng ty l&agrave; bậc 8. Tiền lương chức danh tối thiểu tại bậc 8 gấp 2,19 lần tiền lương chức danh bậc 1.</p>
<p style="text-align: justify;">&ndash; Nh&acirc;n sự được hưởng đầy đủ mức thu nhập b&igrave;nh qu&acirc;n một th&aacute;ng như tr&ecirc;n khi l&agrave;m việc tại C&ocirc;ng ty từ &iacute;t nhất 12 th&aacute;ng trở l&ecirc;n&nbsp;<em>(kh&ocirc;ng t&iacute;nh thời gian thử việc)</em>. Ri&ecirc;ng đối với vị tr&iacute; Nh&acirc;n vi&ecirc;n kỹ thuật/khai th&aacute;c thiết bị th&ocirc;ng tin, dẫn đường, gi&aacute;m s&aacute;t H&agrave;ng kh&ocirc;ng tại Đ&agrave;i/Trạm bắt đầu được hưởng khi nh&acirc;n sự thực hiện huấn luyện tại vị tr&iacute; l&agrave;m việc&nbsp;<em>(trong thời gian nh&acirc;n sự được huấn luyện l&yacute; thuyết v&agrave; thực h&agrave;nh tại C&ocirc;ng ty sẽ kh&ocirc;ng được hưởng phụ cấp biển đảo, khu vực (nếu c&oacute;))</em>.</p>
<p style="text-align: justify;">Ngo&agrave;i ra người lao động c&ograve;n được hưởng c&aacute;c chế độ kh&aacute;c (theo mục 5.2 &ndash; Chế độ đ&atilde;i ngộ kh&aacute;c)</p>
<h4 style="text-align: justify;">5.2 Chế độ đ&atilde;i ngộ kh&aacute;c</h4>
<p style="text-align: justify;">&ndash; Được đ&oacute;ng BHXH, BHYT, BHTN theo quy định.</p>
<p style="text-align: justify;">&ndash; Được kh&aacute;m sức khỏe định kỳ, mua bảo hi&ecirc;̉m tai nạn con người</p>
<p style="text-align: justify;">&ndash; Được cấp trang phục ng&agrave;nh, BHLĐ theo quy định.</p>
<p style="text-align: justify;">&ndash; Được hưởng chế độ nghỉ m&aacute;t theo quy định.</p>
<p style="text-align: justify;">&ndash; Được trang bị phương tiện l&agrave;m việc theo y&ecirc;u cầu của vị tr&iacute; c&ocirc;ng t&aacute;c</p>
<h4 style="text-align: justify;">5.3 C&aacute;c chế độ trong thời gian l&agrave;m việc tại Quần đảo Trường Sa</h4>
<p style="text-align: justify;">&ndash; Thời gian l&agrave;m việc tại Quần đảo Trường Sa: mỗi đợt l&agrave;m việc tại quần đảo Trường Sa th&ocirc;ng thường k&eacute;o d&agrave;i từ 3 đến 4 th&aacute;ng</p>
<p style="text-align: justify;">&ndash; Trong thời gian 24 th&aacute;ng, NLĐ được bố tr&iacute; trực tại quần đảo Trường Sa từ 3-4 đợt. Sau khi kết th&uacute;c đợt trực, được hưởng chế độ nghỉ ưu ti&ecirc;n.</p>
<p style="text-align: justify;">&ndash; Chế độ nghỉ ưu ti&ecirc;n: Mỗi th&aacute;ng l&agrave;m việc/đi c&ocirc;ng t&aacute;c tại c&aacute;c đảo thuộc Quần đảo Trường Sa, người lao động được nghỉ ưu ti&ecirc;n 07 ng&agrave;y. Trong thời gian nghỉ, NLĐ được hưởng to&agrave;n bộ c&aacute;c chế độ lương, thưởng như trong thời gian l&agrave;m việc tại Long Bi&ecirc;n.</p>
<p style="text-align: justify;">&ndash; Phụ cấp biển đảo l&agrave; 155% lương chức danh</p>
<p style="text-align: justify;"><strong>-</strong>&nbsp;Chế độ bảo hiểm sức khỏe v&agrave; bảo hiểm tai nạn con người trong thời gian l&agrave;m việc tại Quần đảo Trường Sa: Được C&ocirc;ng ty mua mức ph&iacute; đặc biệt (sử dụng phương tiện chuy&ecirc;n chở bằng trực thăng trong trường hợp đột xuất&hellip;).</p>
<h3 style="text-align: justify;">6. HỒ SƠ ĐĂNG K&Yacute; DỰ TUYỂN</h3>
<p style="text-align: justify;">Nhằm tu&acirc;n thủ quy định về Bảo vệ dữ liệu c&aacute; nh&acirc;n theo NĐ số 13/2023/NĐ-CP ng&agrave;y 17/04/2023 của Ch&iacute;nh phủ, C&ocirc;ng ty TNHH Kỹ thuật Quản l&yacute; bay (&ldquo;C&ocirc;ng ty&rdquo;) th&ocirc;ng b&aacute;o:</p>
<p style="text-align: justify;">&ndash; Bằng việc nộp hồ sơ để ứng tuyển cho C&ocirc;ng ty th&ocirc;ng qua bất kỳ h&igrave;nh thức v&agrave; phương tiện n&agrave;o đồng nghĩa với việc ứng vi&ecirc;n x&aacute;c nhận đồng &yacute; để C&ocirc;ng ty v&agrave; c&aacute;c b&ecirc;n c&oacute; li&ecirc;n quan kh&aacute;c xử l&yacute; c&aacute;c Dữ liệu c&aacute; nh&acirc;n cho mục đ&iacute;ch tuyển dụng của C&ocirc;ng ty (đ&aacute;nh gi&aacute;, phỏng vấn, li&ecirc;n hệ, th&ocirc;ng b&aacute;o, &hellip;).</p>
<p style="text-align: justify;">&nbsp; &ndash; Khi ứng vi&ecirc;n cung cấp Dữ liệu c&aacute; nh&acirc;n của bất kỳ b&ecirc;n thứ ba n&agrave;o cho C&ocirc;ng ty (th&agrave;nh vi&ecirc;n gia đ&igrave;nh, người tham khảo/ quản l&yacute; trước của ứng vi&ecirc;n), ứng vi&ecirc;n đảm bảo đ&atilde; c&oacute; được sự đồng &yacute; hoặc sự cho ph&eacute;p cần thiết từ b&ecirc;n thứ ba đ&oacute; để chia sẻ v&agrave; chuyển dữ liệu c&aacute; nh&acirc;n của họ cho C&ocirc;ng ty xử l&yacute; dữ liệu theo Th&ocirc;ng tin tuyển dụng n&agrave;y.</p>
<h4 style="text-align: justify;"><strong>a.&nbsp;Hồ sơ ứng tuyển ban đầu&nbsp;</strong><em>(bản photo hoặc bản sao chứng thực qua bộ phận văn thư C&ocirc;ng ty hoặc bản pdf qua h&ograve;m thư điện tử tuyendung@attech.com.vn)</em></h4>
<ol style="text-align: justify;">
<li>Phiếu đăng k&yacute; dự tuyển (theo mẫu_&nbsp;<a href="https://attech.com.vn/wp-content/uploads/2024/05/Phieu-DKDT.docx">Phieu DKDT</a>)</li>
<li>Bản tự giới thiệu năng lực c&aacute; nh&acirc;n bằng tiếng việt (CV)</li>
<li>Sơ yếu l&yacute; lịch tự thuật do c&aacute; nh&acirc;n tự khai (theo mẫu_&nbsp;<a href="https://attech.com.vn/wp-content/uploads/2024/05/SYLL-tu-thuat-2024.docx">SYLL tu thuat 2024</a>)</li>
<li>Văn bằng&nbsp;<em>(hoặc giấy chứng nhận tốt nghiệp trong trường hợp ứng vi&ecirc;n mới tốt nghiệp chưa được cấp bằng)</em>, bảng điểm, chứng chỉ tiếng anh (nếu c&oacute;)</li>
<li>Chứng minh nh&acirc;n d&acirc;n/Căn cước c&ocirc;ng d&acirc;n</li>
<li>Hồ sơ x&eacute;t ưu ti&ecirc;n (nếu c&oacute;)</li>
</ol>
<p style="text-align: justify;">Điểm cộng ưu ti&ecirc;n chỉ được x&eacute;t khi ứng vi&ecirc;n nộp&nbsp;<strong><em>bản sao chứng thực/bản sao cấp từ sổ gốc</em></strong>&nbsp;hồ sơ chứng minh thuộc c&aacute;c trường hợp ưu ti&ecirc;n sau:</p>
<p style="text-align: justify;">&ndash; Anh h&ugrave;ng lao động/ Anh h&ugrave;ng lực lượng vũ trang.</p>
<p style="text-align: justify;">&ndash; Con đẻ/con nu&ocirc;i hợp ph&aacute;p của thương binh, liệt sỹ, Anh h&ugrave;ng lao động, Anh h&ugrave;ng lực lượng vũ trang.</p>
<p style="text-align: justify;">&ndash; Thương binh.</p>
<p style="text-align: justify;">&ndash; Qu&acirc;n nh&acirc;n xuất ngũ.</p>
<p style="text-align: justify;">&ndash; Người c&oacute; Nơi thường tr&uacute; tại c&ugrave;ng quận/huyện/thị x&atilde; với đ&agrave;i, trạm CNS c&oacute; chỉ ti&ecirc;u tuyển dụng v&agrave; được C&ocirc;ng an địa phương x&aacute;c nhận th&ocirc;ng tin về cư tr&uacute;.</p>
<h4 style="text-align: justify;"><strong>b. Ho&agrave;n thiện Hồ sơ ứng tuyển</strong></h4>
<p style="text-align: justify;" align="left"><em>C&aacute;c ứng vi&ecirc;n ho&agrave;n thiện đầy đủ hồ sơ sau khi c&oacute; th&ocirc;ng b&aacute;o tr&uacute;ng tuyển của C&ocirc;ng ty (hồ sơ phải đảm bảo t&iacute;nh ph&aacute;p l&yacute; v&agrave; đ&uacute;ng quy định của C&ocirc;ng ty để thực hiện c&aacute;c thủ tục k&yacute; kết Hợp đồng lao động).&nbsp;</em><em>Hồ sơ bao gồm:</em></p>
<p style="text-align: justify;">1. Phiếu đăng k&yacute; dự tuyển (theo mẫu của C&ocirc;ng ty);</p>
<p style="text-align: justify;">2. Bản tự giới thiệu năng lực c&aacute; nh&acirc;n bằng tiếng Việt (CV);</p>
<p style="text-align: justify;">3. Sơ yếu l&yacute; lịch tự thuật do c&aacute; nh&acirc;n tự khai (theo mẫu của C&ocirc;ng ty);</p>
<p style="text-align: justify;">4. Bản sao chứng thực văn bằng, bảng điểm, chứng chỉ tiếng Anh theo y&ecirc;u cầu của vị tr&iacute; dự tuyển (đối với văn bằng chứng chỉ do cơ sở gi&aacute;o dục nước ngo&agrave;i cấp th&igrave; phải thực hiện c&ocirc;ng nhận văn bằng theo quy định của Bộ Gi&aacute;o dục đ&agrave;o tạo, trừ c&aacute;c trường hợp được miễn thực hiện thủ tục c&ocirc;ng nhận văn bằng theo quy định ph&aacute;p luật);</p>
<p style="text-align: justify;">5. Giấy kh&aacute;m sức khỏe do cơ quan y tế c&oacute; thẩm quyền theo quy định của Bộ Y tế cấp (trong thời hạn 06 th&aacute;ng t&iacute;nh đến ng&agrave;y nộp hồ sơ);</p>
<p style="text-align: justify;">6. 02 ảnh m&agrave;u 4&times;6;</p>
<p style="text-align: justify;">7. Bản sao chứng thực c&aacute;c văn bằng chứng chỉ kh&aacute;c c&oacute; li&ecirc;n quan;</p>
<p style="text-align: justify;">8. Bản sao chứng thực/bản sao cấp từ sổ gốc: chứng minh thư nh&acirc;n d&acirc;n/căn cước c&ocirc;ng d&acirc;n;</p>
<p style="text-align: justify;">9. Hồ sơ chứng minh để C&ocirc;ng ty x&eacute;t ưu ti&ecirc;n (nếu c&oacute;):</p>
<p style="text-align: justify;">Bản sao chứng thực/bản sao cấp từ sổ gốc hồ sơ chứng minh c&aacute;c trường hợp thuộc c&aacute;c đối tượng ưu ti&ecirc;n sau:</p>
<p style="text-align: justify;">&ndash; Anh h&ugrave;ng lao động/ Anh h&ugrave;ng lực lượng vũ trang.</p>
<p style="text-align: justify;">&ndash; Con đẻ/con nu&ocirc;i hợp ph&aacute;p của thương binh, liệt sỹ, Anh h&ugrave;ng lao động, Anh h&ugrave;ng lực lượng vũ trang.</p>
<p style="text-align: justify;">&ndash; Thương binh.</p>
<p style="text-align: justify;">&ndash; Qu&acirc;n nh&acirc;n xuất ngũ.</p>
<p style="text-align: justify;">&ndash; Người c&oacute; Nơi thường tr&uacute; tại c&ugrave;ng quận/huyện/thị x&atilde; với đ&agrave;i, trạm CNS c&oacute; chỉ ti&ecirc;u tuyển dụng v&agrave; được C&ocirc;ng an địa phương x&aacute;c nhận th&ocirc;ng tin về cư tr&uacute;.</p>
<h2 style="text-align: justify;"><strong>7. LƯU &Yacute;</strong></h2>
<p style="text-align: justify;">1. C&aacute;ch thức li&ecirc;n hệ: qua địa chỉ email&nbsp;<a href="mailto:tuyendung@attech.com.vn">tuyendung@attech.com.vn</a></p>
<p style="text-align: justify;">2. Trong thời gian 30 ng&agrave;y kể từ ng&agrave;y c&oacute; th&ocirc;ng b&aacute;o kết quả đ&aacute;nh gi&aacute; hồ sơ/kết quả tuyển dụng, ứng vi&ecirc;n c&oacute; hồ sơ kh&ocirc;ng đạt y&ecirc;u cầu/kh&ocirc;ng tr&uacute;ng tuyển muốn nhận lại hồ sơ vui l&ograve;ng li&ecirc;n hệ tới ph&ograve;ng TCCB-LĐ.</p>
<p style="text-align: justify;">3. Thi v&ograve;ng 1 v&agrave; v&ograve;ng 2</p>
<p style="text-align: justify;">&ndash; V&ograve;ng 1</p>
<p style="text-align: justify;">+ Thi chuy&ecirc;n m&ocirc;n:</p>
<p style="text-align: justify;">&middot; C&aacute;ch thức thi: thi viết/tr&ecirc;n m&aacute;y t&iacute;nh, gồm 02 phần thi trắc nghiệm v&agrave; tự luận.</p>
<p style="text-align: justify;">&middot; Nội dung thi: theo kiến thức chuy&ecirc;n ng&agrave;nh được đ&agrave;o tạo v&agrave; ph&ugrave; hợp với y&ecirc;u cầu tuyển dụng của C&ocirc;ng ty.</p>
<p style="text-align: justify;">&middot; Thời gian l&agrave;m b&agrave;i: 90 ph&uacute;t</p>
<p style="text-align: justify;">+ Thi tiếng Anh đối với ứng vi&ecirc;n chưa c&oacute; chứng chỉ tiếng Anh ph&ugrave; hợp với y&ecirc;u cầu tuyển dụng</p>
<p style="text-align: justify;">&middot; C&aacute;ch thức thi: tr&ecirc;n m&aacute;y t&iacute;nh</p>
<p style="text-align: justify;">&middot; Nội dung thi: theo cấu tr&uacute;c đề thi Toeic</p>
<p style="text-align: justify;"><em>Chứng chỉ tiếng Anh theo khung năng lực ngoại ngữ 6 bậc d&ugrave;ng cho Việt Nam phải được cấp bởi một trong số c&aacute;c trường trong danh s&aacute;ch ở Mục II Th&ocirc;ng b&aacute;o số 1098/TB-QLCL ng&agrave;y 07/07/2023 của Cục Quản l&yacute; chất lượng, Bộ Gi&aacute;o dục v&agrave; đ&agrave;o tạo.</em></p>
<p style="text-align: justify;"><em>Chứng chỉ tiếng Anh quốc tế: Ielts do Hội đồng Anh hoặc IDP cấp, Toeic do IIG Việt Nam cấp, Toefl PBT/ITP/CBT/IBT do ETS cấp.</em></p>
<p style="text-align: justify;">&ndash; V&ograve;ng 2: phỏng vấn</p>
<p style="text-align: justify;">4. Địa điểm thi:</p>
<p style="text-align: justify;">Tại H&agrave; Nội/Th&agrave;nh phố Hồ Ch&iacute; Minh hoặc trực tuyến</p>
<h2 style="text-align: justify;"><strong>II. TH&Ocirc;NG TIN TUYỂN DỤNG CỤ THỂ</strong></h2>
<h3 style="text-align: justify;"><strong>2.1 TI&Ecirc;U CHUẨN CHUNG</strong></h3>
<p style="text-align: justify;">&ndash; C&oacute; phẩm chất ch&iacute;nh trị, đạo đức tốt; L&yacute; lịch bản th&acirc;n v&agrave; gia đ&igrave;nh r&otilde; r&agrave;ng;</p>
<p style="text-align: justify;">&ndash; Kh&ocirc;ng bị mất năng lực h&agrave;nh vi d&acirc;n sự hoặc bị hạn chế năng lực h&agrave;nh vi d&acirc;n sự;</p>
<p style="text-align: justify;">&ndash; Kh&ocirc;ng trong thời gian bị truy cứu tr&aacute;ch nhiệm h&igrave;nh sự v&agrave; thi h&agrave;nh &aacute;n; kh&ocirc;ng tiền &aacute;n, tiền sự; kh&ocirc;ng nghiện ma t&uacute;y</p>
      `,
    },
    {
      id: 3,
      slug: "thong-tin-tuyen-dung-dot-3-nam-2024",
      title: "Thông tin tuyển dụng đợt 3 năm 2024",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/02/nesic-nghiem-thu-18-02-2.jpg",
      date: "20/03/2025",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 4,
      slug: "gap-mat-nhan-vien-moi-2024",
      title: "Buổi gặp mặt nhân viên mới trúng tuyển năm 2024",
      image:
        "https://attech.com.vn/wp-content/uploads/2024/12/g%E1%BA%B7p-m%E1%BA%B7t-nvm-20-12-4.png.jpg",
      date: "18/12/2024",
      content: `
        <p style="text-align: left;"><strong>Năm 2024, Công ty TNHH Kỹ thuật Quản lý bay đã tổ chức 03 đợt tuyển dụng...</strong></p>
        <p style="text-align: left;">Chiều ngày 18/12/2024 tại trụ sở chính...</p>
        <p style="text-align: center;"><img class="aligncenter size-full wp-image-11185" src="https://attech.com.vn/wp-content/uploads/2024/12/g%E1%BA%B7p-m%E1%BA%B7t-nvm-20-12-1.jpg" alt="gặp mặt nvm 20-12 1" /></p>
        <p style="text-align: center;" align="center"><em>Toàn cảnh buổi gặp mặt</em></p>
        <!-- Thêm toàn bộ nội dung HTML còn lại từ bài viết của bạn -->
        <p style="text-align: right;"><em><strong>Bài và ảnh: Nguyễn Lê Thảo Linh – P.TCCB-LĐ</strong></em></p>
      `,
    },
    {
      id: 5,
      slug: "hoi-nghi-nguoi-lao-dong-2025",
      title:
        "Ban Quản lý dự án Đầu tư và xây dựng chuyên ngành tổ chức Hội nghị người lao động năm 2025",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/hnnld-ban-22-1-2.jpg",
      date: "26/03/2025",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 6,
      slug: "hoi-nghi-tong-ket-2024-va-ke-hoach-2025",
      title:
        "Công ty TNHH Kỹ thuật Quản lý bay tổ chức Hội nghị tổng kết công tác năm 2024 và triển khai kế hoạch năm 2025",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/hntk-nam-2024-21-1-1.jpg",
      date: "22/03/2025",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 7,
      slug: "giai-pickleball-xuong-dvkt-lan-1",
      title: "Giải Pickleball Xưởng DVKT mở rộng lần 1",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/pickleball-l1-21-1-1.jpg",
      date: "21/03/2025",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 8,
      slug: "dien-tap-ung-pho-tan-cong-gia-mao",
      title:
        "Diễn tập ứng phó tấn công giả mạo trên hệ thống thư điện tử tên miền @attech.com.vn của Công ty",
      image:
        "https://attech.com.vn/wp-content/uploads/2025/01/dien-tap-attt-28-12-1.jpg",
      date: "16/12/2024",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 9,
      slug: "he-thong-amhs-mo-rong-hoan-thanh-conformance-test",
      title:
        "Hệ thống AMHS mở rộng (AMHS Extended) do ATTECH nghiên cứu, phát triển hoàn thành giai đoạn Conformance Test",
      image: "https://attech.com.vn/wp-content/uploads/2025/01/amhs-6-1-2.jpg",
      date: "16/12/2024",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
    {
      id: 10,
      slug: "nhan-giay-khen-cuc-thue-ha-noi-2023",
      title:
        "Công ty TNHH Kỹ thuật Quản lý bay nhận giấy khen của Cục thuế Hà Nội tuyên dương người nộp thuế tiêu biểu thủ đô năm 2023",
      image: "https://attech.com.vn/wp-content/uploads/2024/12/NTT-19-12-2.jpg",
      date: "16/12/2024",
      content: `<p>Ngày 30/04/2024...</p>`,
    },
  ];

  // Tìm bài viết theo slug
  const notificationItem = notificationData.find((item) => item.slug === slug);

  // Lọc bài viết cho sidebar theo tìm kiếm
  const filteredNotification = useMemo(
    () =>
      notificationData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, notificationData]
  );

  // Lọc bài viết liên quan
  const relatedArticles = useMemo(
    () =>
      notificationData
        .filter((item) => item.slug !== slug && item.date.includes("2024"))
        .slice(0, 3),
    [slug, notificationData]
  );

  // Sanitize HTML
  const sanitizedContent = useMemo(
    () =>
      notificationItem
        ? sanitizeHtml(notificationItem.content, {
            allowedTags: [
              "p",
              "img",
              "strong",
              "em",
              "div",
              "ul",
              "li",
              "a",
              "h1",
              "h2",
              "h3",
              "h4",
              "table",
              "thead",
              "tbody",
              "tr",
              "th",
              "td",
            ],
            allowedAttributes: {
              img: ["src", "alt", "class"],
              p: ["style", "align", "class"],
              div: ["style", "class"],
              a: ["href", "title", "target"],
              table: ["border", "width", "cellspacing", "cellpadding"],
              th: ["align"],
              td: ["align", "colspan", "rowspan"],
            },
            allowedStyles: {
              "*": {
                "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
                "margin-left": [/^\d+px$/],
                "margin-right": [/^\d+px$/],
              },
            },
          })
        : "",
    [notificationItem]
  );

  // Nếu không tìm thấy bài viết, trả về giao diện lỗi
  if (!notificationItem) {
    return <div className="not-found">Bài viết không tồn tại!</div>;
  }

  return (
    <div className="notification-detail-page">
      <Helmet>
        <title>{notificationItem.title} | Tin tức</title>
        <meta
          name="description"
          content={sanitizedContent.replace(/<[^>]+>/g, "").slice(0, 160)}
        />
      </Helmet>
      <div className="notification-sidebar">
        <h3>Danh mục thông báo</h3>
        <input
          type="text"
          placeholder="Tìm kiếm thông báo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="notification-sidebar-search"
          aria-label="Tìm kiếm bài viết"
        />
        <ul>
          {filteredNotification.length > 0 ? (
            filteredNotification.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/notification/${item.id}/${item.slug}`}
                  aria-label={`Xem bài viết ${item.title}`}
                  className={item.slug === slug ? "active" : ""}
                >
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <li>
              Không tìm thấy bài viết phù hợp.{" "}
              <span>
                Đang xem:{" "}
                <Link
                  to={`/notification/${notificationItem.id}/${notificationItem.slug}`}
                >
                  {notificationItem.title}
                </Link>
              </span>
            </li>
          )}
        </ul>
      </div>
      <div className="notification-detail-container">
        <div className="notification-breadcrumb">
          <Link to="/">Trang chủ</Link> &gt;{" "}
          <Link to="/notification">Tin tức</Link> &gt;{notificationItem.title}
        </div>
        <div className="notification-detail-top">
          <div className="notification-detail-image">
            <img
              src={notificationItem.image}
              alt={notificationItem.title}
              loading="lazy"
            />
          </div>
          <div className="notification-detail-header">
            <h1 className="notification-detail-title">
              {notificationItem.title}
            </h1>
            <span className="notification-detail-date">
              Ngày đăng: {notificationItem.date}
            </span>
          </div>
        </div>
        <div
          className="notification-detail-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <div className="notification-share">
          <h4>Chia sẻ bài viết:</h4>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chia sẻ lên Facebook"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )}&text=${encodeURIComponent(notificationItem.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chia sẻ lên Twitter"
          >
            Twitter
          </a>
        </div>
        <div className="related-articles">
          <h2>Bài viết liên quan</h2>
          <div className="related-articles-list">
            {relatedArticles.map((item) => (
              <div key={item.id} className="related-article-item">
                <Link
                  to={`/notification/${item.id}/${item.slug}`}
                  aria-label={`Xem bài viết ${item.title}`}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <h4>{item.title}</h4>
                  <span>{item.date}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotificationDetailPage);

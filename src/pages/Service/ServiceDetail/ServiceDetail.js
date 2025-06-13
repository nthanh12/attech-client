import React from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetail.css";

const contentData = {
  cns: `
  <div class="service-header">
    <img src="https://attech.com.vn/wp-content/uploads/2015/02/DV-ky-thuat-CNS-s.jpg" alt="DV-ky-thuat-CNS-s" />
    <h1>CÔNG TY TNHH KỸ THUẬT QUẢN LÝ BAY (ATTECH) LÀ NHÀ CUNG CẤP DỊCH VỤ THÔNG TIN, DẪN ĐƯỜNG, GIÁM SÁT (CNS) CHO NGÀNH HÀNG KHÔNG VIỆT NAM</h1>
  </div>

  <div class="service-content">
    <p>Công ty TNHH Kỹ thuật Quản lý bay (ATTECH) tự hào là nhà cung cấp dịch vụ chuyên ngành Thông tin (Communication – C), dẫn đường (Navigation – N), Giám sát (Surveilance- S) hàng không hàng đầu tại Việt Nam.</p>

    <section class="service-section">
      <h2>I. CÁC DỊCH VỤ DO CÔNG TY CUNG CẤP:</h2>
      <p>Với đội ngũ nhân viên tinh nhuệ, chuyên nghiệp gồm hàng chục kỹ sư dày dạn kinh nghiệm, được đào tạo bài bản trong và ngoài nước, cộng với đội ngũ bán hàng chuyên nghiệp, Công ty TNHH Kỹ thuật Quản lý bay hiện là đối tác tin cậy cung cấp dịch vụ CNS cho Tổng công ty Quản lý bay Việt Nam, Cục hàng không Singapore và là đối tác cung cấp dịch vụ kỹ thuật cho thiết bị dẫn đường VOR, ILS, DME của hãng SELEX- Hoa Kỳ tại Việt Nam và nhiều nước trên thế giới. Các dịch vụ do Công ty cung cấp trong lĩnh vực CNS gồm:</p>

      <div class="service-subsection">
        <h3>1. Dịch vụ CNS phục vụ điều hành bay:</h3>
        <ul>
          <li>Dịch vụ thông tin dẫn đường DVOR/DME & NDB</li>
          <li>Dịch vụ thông tin VHF/VSAT</li>
          <li>Dịch vụ giám sát ADS-B</li>
          <li>Dịch vụ AMHS</li>
        </ul>
      </div>

      <div class="service-subsection">
        <h3>2. Dịch vụ kỹ thuật chuyên ngành CNS:</h3>
        <ul>
          <li>Khảo sát vị trí lắp đặt</li>
          <li>Lắp đặt, thông điện, hiệu chỉnh</li>
          <li>Hỗ trợ bay hiệu chuẩn</li>
          <li>Sửa chữa cấu kiện</li>
          <li>Bảo hành ủy quyền</li>
          <li>Bảo dưỡng định kỳ</li>
        </ul>
      </div>

      <div class="service-subsection">
        <h3>3. Dịch vụ huấn luyện chuyên ngành CNS:</h3>
        <p>Trung tâm huấn luyện CNS của ATTECH là đơn vị duy nhất tại Việt nam đủ tiêu chuẩn được Cục hàng không Việt Nam cấp phép huấn luyện dịch vụ chuyên nghành CNS.</p>
        <ul>
          <li>Huấn luyện, đào tạo tại hiện trường</li>
          <li>Huấn luyện đào tạo tại trung tâm CNS</li>
        </ul>
      </div>
    </section>

    <section class="service-section">
      <h2>II. NĂNG LỰC KINH NGHIỆM:</h2>
      
      <div class="service-subsection">
        <h3>1. Năng lực kinh nghiệm trong lĩnh vực cung cấp dịch vụ CNS phục vụ điều hành bay:</h3>
        <ul>
          <li>ATTECH hiện đang quản lý, khai thác và cung cấp dịch vụ CNS cho Tổng công ty Quản lý bay Việt Nam gồm: 25 đài DVOR/DME và NDB, 12 trạm ADS-B, 02 trạm VHF/VSAT ngoài Biển Đông.</li>
          <li>ATTECH hiện đang quản lý, khai thác 02 trạm ADS-B/VHF/VSAT Côn Sơn và Cà Mau cung cấp dịch vụ ADS-B và VHF cho Cục hàng không Singapore.</li>
          <li>Lắp đặt và cung cấp dịch vụ AMHS cho Tổng công ty Quản lý bay Việt Nam.</li>
        </ul>
      </div>

      <div class="service-subsection">
        <h3>2. Năng lực kinh nghiệm trong lĩnh vực cung cấp dịch vụ kỹ thuật chuyên nghành CNS:</h3>
        <ul>
          <li>Thi công lắp đặt hệ thống thông tin vệ tinh DOMSAT, VSAT</li>
          <li>Chuyển đổi hệ thống thông tinh vệ tinh VSAT quản lý bay từ sử dụng vệ tinh Thaicom 1A sang vệ tinh Thaicom5</li>
          <li>Thi công lắp đặt các trạm thông tin VHF/HF</li>
          <li>Thi công lắp đặt hệ thống chuyển mạch thoại VCCS, hệ thống đồng hồ thời gian chuẩn...</li>
          <li>Khảo sát vị trí (Site survey), lắp đặt, thông điện hiệu chỉnh, hỗ trợ bay hiệu chuẩn các hệ thống NDB, DVOR/DME, ILS/DME tại Việt Nam, Lào, Campuchia, Malaysia, Indonesia, Trung Quốc, Philippines, Ấn Độ, Bangladesh, Kenya, Đài Loan...</li>
        </ul>
      </div>

      <div class="service-subsection">
        <h3>3. Năng lực kinh nghiệm trong lĩnh vực cung cấp dịch vụ huấn luyện:</h3>
        <ul>
          <li>Huấn luyện hiện trường cho hãng Selex cấp chứng chỉ tại Kenya, Philippin, Bangladesh, Việt Nam.</li>
          <li>Từ năm 2009 đến nay đã tổ chức được 240 lớp huấn luyến, cấp chứng chỉ huấn luyện CNS cho 3960 lượt người cho Tổng công ty Quản lý bay Việt Nam và các đơn vị bên ngoài.</li>
        </ul>
      </div>
    </section>

    <section class="service-section">
      <h2>III. TIÊU CHUẨN ĐÁP ỨNG:</h2>
      <ul>
        <li>Các dịch vụ CNS được cung cấp với tiêu chuẩn quốc tế, được quản lý chất lượng theo tiêu chuẩn ISO 9001:2015.</li>
        <li>Các hệ thống thiết bị CNS đáp ứng tiêu chuẩn kỹ thuật của tổ chức hàng không dân dụng quốc tế ICAO</li>
      </ul>
    </section>

    <div class="service-gallery">
      <figure>
        <img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS.jpg" alt="Tầm phủ các đài dẫn đường thuộc ATTECH" />
        <figcaption>A.1-1: Tầm phủ các đài dẫn đường thuộc ATTECH</figcaption>
      </figure>

      <figure>
        <img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS1.jpg" alt="Hệ thống 12 trạm ADS-B ATTECH" />
        <figcaption>A.1-2: Hệ thống 12 trạm ADS-B ATTECH đang quản lý và khai thác trên toàn quốc</figcaption>
      </figure>

      <figure>
        <img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS2.png.jpg" alt="02 Trạm VHF/VSAT ATTECH" />
        <figcaption>A.1-3: 02 Trạm VHF/VSAT ATTECH quản lý và khai thác tại Đảo Trường Sa Lớn và Song Tử Tây</figcaption>
      </figure>

      <figure>
        <img src="https://attech.com.vn/wp-content/uploads/2015/02/CNS3.jpg" alt="Hệ thống đài VOR/DME ATTECH" />
        <figcaption>A.1-4: Hệ thống đài VOR/DME ATTECH đang quản lý và khai thác trên toàn quốc</figcaption>
      </figure>
    </div>
  </div>
  `,
  flightcheck: `
  <hr /><p style="text-align: center;"><br /><a href="https://attech.com.vn/wp-content/uploads/2015/02/DV-BHC1.jpg"><img class="alignleft  wp-image-2301" src="https://attech.com.vn/wp-content/uploads/2015/02/DV-BHC1.jpg" alt="DV-BHC" width="659" height="215" /></a><span id="more-337"></span></p>
<p style="text-align: left;"><strong>GIỚI THIỆU:</strong></p>
<p style="text-align: left;">Đội Bay kiểm tra hiệu chuẩn được thành lập theo Quyết định số 115/QĐ-KTQLB ngày 19 tháng 08 năm 2010 với nhiệm vụ Tổ chức cung cấp dịch vụ bay kiểm tra hiệu chuẩn các thiết bị dẫn đường giám sát hàng không và bay đánh giá phương thức bay.</p>
<p style="text-align: left;">Năm 2010 Cục Hàng không Việt Nam đã cấp giấy phép công nhận ATTECH là nhà cung cấp dịch vụ bay kiểm tra hiệu chuẩn và bay đánh giá phương thức bay duy nhất tại Việt Nam tuân thủ và đáp ứng đầy đủ các tiêu chuẩn khuyến cáo của tổ chức hàng không dân dụng quốc tế ICAO, quy định pháp luật hiện hành của Nhà nước.</p>
<p style="text-align: left;"><strong>HỆ THỐNG THIẾT BỊ</strong></p>
<p style="text-align: left;">Dịch vụ bay kiểm tra hiệu chuẩn, bay đánh giá phương thức bay của ATTECH sử dụng tàu bay hai động cơ cỡ nhỏ đã được cải tiến, lắp đặt anten và thiết bị bay hiệu chuẩn công nghệ tiên tiến trên thế giới.</p>
<p style="text-align: left;">Hệ thống thiết bị bay hiệu chuẩn, bay đánh giá phương thức bay lắp trên máy bay là hệ thống thiết bị bay hiệu chuẩn hoàn toàn tự động sử dụng công nghệ tiên tiến nhất trên thế giới hiện nay. Hệ thống tham chiếu vị trí DGPS dưới mặt đất có độ chính xác cao (sai số dưới 10cm) cho phép thực hiện bay hiệu chuẩn các thiết bị yêu cầu độ chính xác cao như ILS/DME, PAPI...</p>
<p style="text-align: left;">Bằng việc sử dụng công nghệ bay hiệu chuẩn hoàn toàn tự động mới, thiết bị bay hiệu chuẩn có khả năng:</p>
<p style="text-align: left;">&ndash; Bay hiệu chuẩn hệ thống ILS đến Cat III</p>
<p style="text-align: left;">&ndash; Thu thập và xử lý dữ liệu trong thời gian thực, lưu trữ dữ liệu bay hiệu chuẩn liên tục trong quá trình thực hiện nhiệm vụ.</p>
<p style="text-align: left;">&ndash; Thu thập và xử lý dữ liệu song song đồng thời khi thực hiện bay hiệu chuẩn thiết bị VOR và ILS.</p>
<p style="text-align: left;">&ndash; Các thông số kết quả đo và đồ thị được hiển thị trong thời gian thực.</p>
<p style="text-align: left;">&ndash; In kết quả ngay lập tức trong quá trình bay hiệu chuẩn.</p>
<p style="text-align: left;"><strong>ĐỘI BAY</strong></p>
<p style="text-align: left;">Phi công bay hiệu chuẩn (inspector pilot) và thanh tra bay hiệu chuẩn (flight inspector) của ATTECH là những người có hơn 10 năm kinh nghiệm, am hiểu sâu về thiết bị dẫn đường, phương thức bay, được đào tạo bài bản tại các trung tâm huấn luyện hàng đầu Châu Âu trong lĩnh vực bay kiểm tra hiệu chuẩn, bay đánh giá phương thức bay và được Cục Hàng không Việt Nam công nhận năng lực và cấp giấy phép.</p>
<p style="text-align: left;"><strong>DỊCH VỤ CUNG CẤP</strong></p>
<p style="text-align: left;">Với hệ thống thiết bị và nguồn lực đội bay hiện có, ATTECH có khả năng thực hiện bay kiểm tra, hiệu chuẩn các hệ thống dẫn đường giám sát:</p>
<p style="text-align: left;">&ndash; ILS/DME Cat I, II, III</p>
<p style="text-align: left;">&ndash; VOR/DME</p>
<p style="text-align: left;">&ndash; NDB</p>
<p style="text-align: left;">&ndash; RADAR (PSR, SSR)</p>
<p style="text-align: left;">&ndash; MARKER Beacon</p>
<p style="text-align: left;">&ndash; PAPI</p>
<p style="text-align: left;">&ndash; Hệ thống đèn hiệu sân bay</p>
<p style="text-align: left;">Bay kiểm tra hiệu chuẩn, đánh giá phương thức dẫn đường theo tính năng PBN:</p>
<p style="text-align: left;">&ndash; RNAV/RNP:</p>
<p style="text-align: left;">+ RNAV/RNP SID, RNAV/RNP STAR, RNP APCH (LNAV), RNP APCH (LNAV/VNAV)</p>
<p style="text-align: left;">Các hình thức bay hiệu chuẩn:</p>
<p style="text-align: left;">&ndash; Bay hiệu chuẩn cơ bản (Commissionning)</p>
<p style="text-align: left;">&ndash; Bay hiệu chuẩn định kỳ (Routine)</p>
<p style="text-align: left;">&ndash; Bay hiệu chuẩn đặc biệt (Special)</p>
<p style="text-align: left;"><strong>TIÊU CHUẨN ĐÁP ỨNG/ TÀI LIỆU ÁP DỤNG</strong></p>
<p style="text-align: left;">&ndash; Luật Hàng không dân dụng Việt Nam.</p>
<p style="text-align: left;">&ndash; Thông tư 19/2017/TT-BGTVT quy định về quản lý và bảo đảm hoạt động bay.</p>
<p style="text-align: left;">&ndash; Tài liệu hướng dẫn cung cấp dịch vụ bay kiểm tra hiệu chuẩn.</p>
<p style="text-align: left;">&ndash; Tài liệu ICAO: Annex 10, Doc 8071, Doc 9906 &hellip;</p>
<p style="text-align: center;"><strong>&nbsp;</strong></p>
`,
  testing: `
  <p><a href="https://attech.com.vn/wp-content/uploads/2015/02/anh-thu-nghiem-hieu-chuan-2019.jpg"><img class="aligncenter size-full wp-image-6891" style="display: block; margin-left: auto; margin-right: auto;" src="https://attech.com.vn/wp-content/uploads/2015/02/anh-thu-nghiem-hieu-chuan-2019.jpg" alt="anh thu nghiem hieu chuan 2019" /></a></p>
<p style="text-align: left;"><strong>GIỚI THIỆU</strong></p>
<p style="text-align: left;">Với mục tiêu cung cấp các sản phẩm, dịch vụ có chất lượng cao nhất, đáp ứng các tiêu chuẩn quốc gia và quốc tế, ATTECH xác định phải không ngừng nâng cao năng lực hiệu chuẩn, thử nghiệm của mình. Vì vậy, ATTECH đã tập trung đầu tư về cơ sở vật chất và con người cho hệ thống phòng thí nghiệm, áp dụng hệ thống quản lý chất lượng ISO/IEC 17025:2017. Đến nay, phòng thí nghiệm của ATTECH đã được Văn phòng công nhận chất lượng thuộc Bộ Khoa học công nghệ Việt Nam cấp chứng chỉ VILAS. Với hệ thống phòng thí nghiệm đạt tiêu chuẩn cùng với đội ngũ kỹ sư có chuyên môn cao, giàu kinh nghiệm, ATTECH cam kết cung cấp đến Quý khách hàng các dịch vụ hiệu chuẩn, thử nghiệm tốt nhất và tin cậy nhất.</p>
<p style="text-align: left;"><strong>NĂNG LỰC KINH NGHIỆM</strong></p>
<p style="text-align: left;">Với gần 30 năm kinh nghiệm cung cấp dịch vụ, cùng với việc nhanh chóng áp dụng các hệ thống quản lý chất lượng tiên tiến như ISO 9001:2015, ISO/IEC 17025:2017, ATTECH đảm bảo đủ năng lực cung cấp dịch vụ thử nghiệm hiệu chuẩn, đáp ứng tiêu chuẩn của quốc gia và quốc tế cho tất cả các khách hàng.</p>
<p style="text-align: left;"><strong>DỊCH VỤ CUNG CẤP</strong></p>
<p style="text-align: left;">&ndash; Dịch vụ hiệu chuẩn các thiết bị đo lường</p>
<p style="text-align: left;">&ndash; Dịch vụ đo lường, thử nghiệm quang học</p>
<p style="text-align: left;">&ndash; Dịch vụ thử nghiệm môi trường</p>
<p style="text-align: left;"><strong>CƠ SỞ VẬT CHẤT</strong></p>
<p style="text-align: left;">Phòng thử nghiệm, hiệu chuẩn của ATTECH có cơ sở hạ tầng hiện đại và đồng bộ, phù hợp với yêu cầu của hệ thống chất lượng ISO/IEC 17025:2017, đảm bảo cung cấp các dịch vụ tốt nhất cho khách hàng.</p>
<p style="text-align: left;">Đối với dịch vụ hiệu chuẩn thiết bị, phòng thí nghiệm được trang bị đầy đủ các thiết bị đo mẫu hiện đại với độ chính xác cao, dải đo rộng của các hãng thiết bị đo hàng đầu thế giới như Fluke, Agilent, Rohde&amp;Schwarz&hellip; Các thiết bị này thường xuyên được hiệu chuẩn tại Viện đo lường Việt Nam để đảm bảo cung cấp các kết quả hiệu chuẩn chính xác, tin cậy nhất.</p>
<p style="text-align: left;">Đối với dịch vụ đo lường, thử nghiệm quang học, phòng thử nghiệm được trang bị hệ thống đo quang học hiện đại, điều khiển bằng phần mềm với các phương pháp đo được lập trình sẵn bảo đảm cung cấp các kết quả đo nhanh chóng, chính xác và tin cậy nhất.</p>
<p style="text-align: left;">Đối với dịch vụ thử nghiệm môi trường, buồng thử nghiệm có kích thước lớn 5x3x2(m), được trang bị các thiết bị đo và điều khiển hiện đại đảm bảo cung cấp các dịch vụ thử nghiệm cho nhiều loại sản phẩm với các kích thước khác nhau.</p>
<p style="text-align: left;"><strong>TIÊU CHUẨN ĐÁP ỨNG</strong></p>
<p style="text-align: left;">Hệ thống phòng thí nghiệm của ATTECH đáp ứng tiêu chuẩn của quốc gia và quốc tế như:</p>
<p style="text-align: left;">&ndash; Tiêu chuẩn ISO 9001:2015</p>
<p style="text-align: left;">&ndash; Tiêu chuẩn ISO/IEC 17025:2017</p>
<p style="text-align: left;">&ndash; Tiêu chuẩn ICAO của Hiệp hội Hàng không dân dụng Quốc tế: ICAO Annex 14</p>
<p style="text-align: left;">&ndash; Tiêu chuẩn Việt Nam: TCVN 5176:1990.</p>
`,
  training: `
<div class="dnconten"><a href="https://attech.com.vn/wp-content/uploads/2015/02/DV-HLDT-small.jpg"><img class="alignnone size-full wp-image-2237" style="display: block; margin-left: auto; margin-right: auto;" src="https://attech.com.vn/wp-content/uploads/2015/02/DV-HLDT-small.jpg" alt="DV-HLDT-small" /></a></div>
<p style="text-align: center;">&nbsp;</p>
<div class="dnconten">
<p style="text-align: left;"><strong>GIỚI THIỆU</strong></p>
<p style="text-align: left;">Với bề dầy hơn 30 năm kinh nghiệm trong lĩnh vực cung cấp các sản phẩm và dịch vụ trong ngành Hàng không, Công ty TNHH Kỹ thuật Quản lý bay tự hào là nhà cung cấp dịch vụ kỹ thuật ngành Thông tin (Communication &ndash; C), Dẫn đường (Navigation &ndash; N), Giám sát (Surveillance &ndash; S) hàng đầu Việt Nam.</p>
<p style="text-align: left;">Để đáp ứng nhu cầu nâng cao chất lượng nguồn nhân lực và với chiến lược phát triển ATTECH thành một thương hiệu mạnh trong lĩnh vực kỹ thuật hàng không tại thị trường Việt Nam và từng bước vươn ra thị trường khu vực và thế giới, ngày 27/11/2008 Trung tâm Huấn luyện CNS được thành lập theo QĐ số 2436/QĐ-QLB. Ngày 26/05/2020, Cục Hàng không Việt Nam đã ban hành Giấy chứng nhận số 2073/GCN-CHK và Quyết định số 805/QĐ-CHK chứng nhận Công ty TNHH Kỹ thuật Quản lý bay là cơ sở đủ điều kiện huấn luyện nghiệp vụ nhân viên hàng không chuyên ngành thông tin, dẫn đường, giám sát.</p>
<p style="text-align: left;"><strong>NĂNG LỰC KINH NGHIỆM</strong></p>
<p style="text-align: left;">Với chất lượng giảng dạy cao, khóa học được thiết kế ưu việt, cơ sở vật chất thiết bị giảng dạy hiện đại và chứng chỉ có giá trị, Trung tâm Huấn luyện CNS hiện là cơ sở huấn luyện duy nhất trong ngành Hàng không đủ điều kiện đáp ứng nhu cầu huấn luyện nhân viên hàng không chuyên ngành thông tin, dẫn đường, giám sát hàng không theo Nghị định số 92/2016/NĐ-CP của Chính phủ và Thông tư số 10/2018/TT-BGTVT của Bộ GTVT.</p>
<p style="text-align: left;">Trung tâm huấn luyện CNS đã thực hiện được nhiều khóa huấn luyện trong và ngoài Công ty với hàng trăm lượt học viên. Sau mỗi khóa huấn luyện, các học viên sẽ nắm được những kiến thức cơ bản, những kỹ năng thực tế về khai thác, bảo dưỡng thiết bị và được cấp Chứng chỉ chuyên môn theo tiêu chuẩn của Cục Hàng không Việt Nam.</p>
<p style="text-align: left;"><strong>DỊCH VỤ CUNG CẤP</strong></p>
<p style="text-align: left;">Trung tâm Huấn luyện CNS hiện đang triển khai các hình thức huấn luyện gồm: Huấn luyện năng định, định kỳ, phục hồi, chuyển loại chuyên ngành thông tin, dẫn đường, giám sát hàng không. Bên cạnh đó, Trung tâm còn có các khóa huấn luyện cơ bản và nâng cao được thiết kế phù hợp với yêu cầu khách hàng.</p>
<p style="text-align: left;">Dịch vụ huấn luyện đã được áp dụng hệ thống QLCL ISO 9001:2015 đảm bảo cho khách hàng nhận được dịch vụ một cách ổn định và tốt nhất.</p>
<p style="text-align: left;"><strong>CƠ SỞ VẬT CHẤT</strong></p>
<p style="text-align: left;">Trung tâm huấn luyện có hệ thống phòng học, phòng thực hành, phòng thiết bị và thư viện đáp ứng tiêu chuẩn của Bộ GTVT về nhân viên hàng không và cơ sở đào tạo nhân viên hàng không tại Thông tư số 10/2018/TT-BGTVT của Bộ GTVT.</p>
<p style="text-align: left;"><strong>ĐỘI NGŨ GIÁO VIÊN</strong></p>
<p style="text-align: left;">Đội ngũ huấn luyện viên của Công ty TNHH Kỹ thuật Quản lý bay đã được Cục trưởng Cục Hàng không phê duyệt tại Quyết định số 802/QĐ-CHK ngày 25/05/2020 đủ tiêu chuẩn tham gia giảng dạy nghiệp vụ nhân viên hàng không chuyên ngành thông tin, dẫn đường, giám sát.</p>
</div>
`,
  consulting: `
<div class="dnconten">
<p><a href="https://attech.com.vn/wp-content/uploads/2015/02/TVTK-anhs.jpg"><img class="aligncenter size-full wp-image-5506" style="display: block; margin-left: auto; margin-right: auto;" src="https://attech.com.vn/wp-content/uploads/2015/02/TVTK-anhs.jpg" alt="TVTK anhs" /></a><br /><span id="more-356"></span></p>
<p style="text-align: left;"><strong>GIỚI THIỆU</strong></p>
<p style="text-align: left;">Dịch vụ Tư vấn đầu tư xây dựng và QLDA là một trong các dịch vụ của công ty TNHH Kỹ thuật Quản lý bay do Ban Quản lý dự án Đầu tư và Xây dựng chuyên ngành &ndash; Chi nhánh của công ty TNHH Kỹ thuật Quản lý bay thực hiện, cung cấp. Với trên 10 năm kinh nghiệm và đội ngũ kỹ sư, kiến trúc sư và cán bộ chuyên môn có trình độ, Ban Quản lý dự án Đầu tư và Xây dựng chuyên ngành đã tổ chức và thực hiện các dịch vụ tư vấn đầu tư xây dựng và quản lý dự án bao gồm: Khảo sát, lập dự án đầu tư xây dựng, thiết kế xây dựng, tổ chức lựa chọn nhà thầu, giám sát thi công xây dựng và lắp đặt thiết bị, quản lý chi phí đầu tư xây dựng và quản lý dự án theo nhiệm vụ sản xuất kinh doanh của Công ty.</p>
<p style="text-align: left;"><strong>NĂNG LỰC KINH NGHIỆM</strong></p>
<p style="text-align: left;">&ndash; Tư vấn đầu tư xây dựng bao gồm:</p>
<p style="text-align: left;">+ Khảo sát; lập dự án đầu tư xây dựng và lập hồ sơ thiết kế xây dựng</p>
<p style="text-align: left;">+ Tổ chức lựa chọn nhà thầu</p>
<p style="text-align: left;">+ Giám sát thi công xây dựng và lắp đặt thiết bị</p>
<p style="text-align: left;">+ Tư vấn quản lý chi phí đầu tư xây dựng gồm lập Tổng mức đầu tư, dự toán xây dựng, giá gói thầu, giá hợp đồng xây dựng, định mức xây dựng và giá xây dựng, thanh toán và quyết toán hợp đồng xây dựng, thanh toán và quyết toán vốn đầu tư xây dựng công trình. Xây dựng định mức, đơn giá các sản phẩm, dịch vụ do Công ty cung cấp trên cơ sở định mức kinh tế-kỹ thuật, pháp quy của Nhà nước.</p>
<p style="text-align: left;">&ndash; Tư vấn quản lý dự án đầu tư xây dựng bao gồm: Quản lý về phạm vi, kế hoạch công việc; khối lượng công việc; chất lượng xây dựng; tiến độ thực hiện; chi phí đầu tư xây dựng; an toàn trong thi công xây dựng; bảo vệ môi trường trong xây dựng; lựa chọn nhà thầu và hợp đồng xây dựng; quản lý rủi ro và các nội dung cần thiết khác được thực hiện theo quy định của Luật xây dựng và quy định khác của pháp luật có liên quan.</p>
<p style="text-align: left;"><strong>DỊCH VỤ CUNG CẤP</strong></p>
<p style="text-align: left;">Dịch vụ khảo sát, tư vấn lập dự án đầu tư, lập hồ sơ thiết kế và dự toán các công trình, tổ chức lựa chọn nhà thầu và xây dựng các định mức kinh tế kỹ thuật cho các sản phẩm, dịch vụ chuyên ngành hàng không:</p>
<p style="text-align: left;">&ndash; Hệ thống thiết bị hạ cánh ILS/DME tiêu chuẩn CAT I và CAT II.</p>
<p style="text-align: left;">&ndash; Hệ thống đài dẫn đường, các trạm thông tin NDB, DVOR/DME.</p>
<p style="text-align: left;">&ndash; Hệ thống điện nguồn, biển báo, đèn phụ trợ dẫn đường sân bay đáp ứng tiêu chuẩn CAT I, II, III.</p>
<p style="text-align: left;">&ndash; Các trạm thông tin vệ tinh VSAT, DOMSAT&hellip;</p>
<p style="text-align: left;">&ndash; Các trạm Rađa giám sát Hàng không, ADS-B&hellip;</p>
<p style="text-align: left;">&ndash; Tích hợp hệ thống, triển khai các phần mềm ứng dụng, đảm bảo kỹ thuật cho các mạng công nghệ thông tin, dẫn đường, giám sát Hàng không.</p>
<p style="text-align: left;">&ndash; Hệ thống trang thiết bị phục vụ điều hành hoạt động bay tại Đài kiểm soát không lưu (TWR), tại Trung tâm điều hành bay kiểm soát tiếp cận (APP) và Trung tâm phối hợp điều hành bay đường dài (ACC).</p>
<p style="text-align: left;">&ndash; Hệ thống chống sét toàn diện cho các hạng mục công trình (chống sét đánh thẳng, lan truyền, cảm ứng), tiếp đất cho các công trình kỹ thuật, các hệ thống trang thiết bị kỹ thuật.</p>
<p style="text-align: left;"><strong>TIÊU CHUẨN ĐÁP ỨNG</strong></p>
<p style="text-align: left;">&ndash; Khách hàng sẽ nhận được sản phẩm tư vấn theo đúng quy định pháp lý hiện hành của Nhà nước, các quy định khuyến cáo của Tổ chức Hàng không dân dụng Quốc tế (ICAO).</p>
<p style="text-align: left;">&ndash; Sản phẩm tư vấn của ATTECH đáp ứng các tiêu chuẩn của Hệ thống quản lý chất lượng ISO 9001:2015 và thỏa mãn yêu cầu mong muốn các khách hàng.</p>
</div>
`,
};

const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const content =
    contentData[serviceSlug] ||
    "<h2>Không thể hiển thị do nội dung không tồn tại hoặc đã bị xóa!</h2>";

  return (
    <div className="service-content-wrap">
      <div className="cns-container" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ServiceDetail;

import "../../assets/css/Fact.css";
const Fact = () => {
  return (
    <>
      <div class="fact">
        <div class="container-fluid">
          <div class="row counters">
            <div class="col-md-6 fact-left wow slideInLeft">
              <div class="row">
                <div class="col-6">
                  <div class="fact-icon">
                    <i class="flaticon-worker"></i>
                  </div>
                  <div class="fact-text">
                    <h2 data-toggle="counter-up">&gt; 30</h2>
                    <p>Năm hoạt động</p>
                  </div>
                </div>
                <div class="col-6">
                  <div class="fact-icon">
                    <i class="flaticon-building"></i>
                  </div>
                  <div class="fact-text">
                    <h2 data-toggle="counter-up">25</h2>
                    <p>Đài dẫn đường DVOR/DME và NDB</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 fact-right wow slideInRight">
              <div class="row">
                <div class="col-6">
                  <div class="fact-icon">
                    <i class="flaticon-address"></i>
                  </div>
                  <div class="fact-text">
                    <h2 data-toggle="counter-up">13</h2>
                    <p>trạm giám sát tự động</p>
                  </div>
                </div>
                <div class="col-6">
                  <div class="fact-icon">
                    <i class="flaticon-crane"></i>
                  </div>
                  <div class="fact-text">
                    <h2 data-toggle="counter-up">04</h2>
                    <p>trạm giám sát VHF tầm xa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fact;

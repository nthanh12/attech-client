import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../Fact/Fact.css";

const Fact = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once
    onChange: (inView) => {
      if (inView) {
        setStartAnimation(true);
      }
    },
  });

  return (
    <>
      <div className="fact" ref={ref}>
        <div className="p-0">
          <div className="row counters m-0">
            <h2>Niềm tự hào của ATTECH</h2>
            <div className="col-12 col-sm-3 fact-left wow slideInLeft">
              <div className="col-12 col-sm-12">
                <div className="fact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="fact-text">
                  <h2>
                    {startAnimation && <CountUp end={20} duration={2} />}+
                  </h2>
                  <p>Năm hoạt động</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-3 fact-left wow slideInLeft">
              <div className="col-12 col-sm-12">
                <div className="fact-icon">
                  <i class="fa fa-solid fa-building"></i>{" "}
                </div>
                <div className="fact-text">
                  <h2>
                    {startAnimation && <CountUp end={100} duration={2} />}+
                  </h2>
                  <p>Công trình</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-3 fact-right wow slideInRight">
              <div className="col-12 col-sm-12">
                <div className="fact-icon">
                  <i class="fa fa-solid fa-earth-asia"></i>{" "}
                </div>
                <div className="fact-text">
                  <h2>
                    {startAnimation && <CountUp end={13} duration={2} />}+
                  </h2>
                  <p>Quốc gia</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-3 fact-right wow slideInRight">
              <div className="col-12 col-sm-12">
                <div className="fact-icon">
                  <i class="fa fa-solid fa-certificate"></i>{" "}
                </div>
                <div className="fact-text">
                  <h2>{startAnimation && <CountUp end={4} duration={2} />}+</h2>
                  <p>Bằng khen</p>
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

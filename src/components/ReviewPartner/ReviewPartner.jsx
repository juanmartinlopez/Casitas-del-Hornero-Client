import React from "react";
import Row from "react-bootstrap/Row";
import styleLight from "./ReviewPartner.module.css"
import styleDark from"./ReviewPartnerDark.module.css"
import { useSelector } from "react-redux";



const ReviewPartner = ({ hotels }) => {
  const theme = useSelector((state) => state.theme);
  const style = theme === "light"?styleLight:styleDark;

  return (
    <div className={style.contenedor}>
      <section>
        <Row xs={1} sm={2} lg={3} className="g-2">
          {hotels?.map((unHotel) => (
            <div key={unHotel.name}>
              {unHotel.Reviews.length ? (
                <div className={style.hotel}>
                  <h2>{unHotel.name}</h2>
                  {unHotel.Reviews?.map((rev) => (
                    <div key={rev.username} className={style.review}>
                      <h3>{rev.username}</h3>
                      <p>{rev.review}, review: {rev.punctuation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default ReviewPartner;
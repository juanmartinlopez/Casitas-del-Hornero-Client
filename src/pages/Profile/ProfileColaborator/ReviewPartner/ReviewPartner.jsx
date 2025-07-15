import Row from "react-bootstrap/Row";

const ReviewPartner = ({ hotels }) => {
  return (
    <div>
      <section>
        <Row xs={1} sm={2} lg={3}>
          {hotels?.map((unHotel) => (
            <div key={unHotel.name}>
              {unHotel.Reviews.length ? (
                <div>
                  <h2>{unHotel.name}</h2>
                  {unHotel.Reviews?.map((rev) => (
                    <div key={rev.username}>
                      <h3>{rev.username}</h3>
                      <p>
                        {rev.review}, review: {rev.punctuation}
                      </p>
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

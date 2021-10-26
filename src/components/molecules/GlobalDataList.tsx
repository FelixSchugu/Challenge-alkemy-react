import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";

type GlobalDataListTypes = {
  maxStat?: { name: string; value: number };
  globalStats?: { name: string; value: string }[];
};

const GlobalDataList: React.FC<GlobalDataListTypes> = (props) => {
  return (
    <div className="h-100 p-2 bg-white d-flex flex-column align-items-start justify-content-start">
      <h5 className="border-bottom">Estadísticas del equipo</h5>

      <h4 style={{ fontSize: "20px" }}>
        Tipo de equipo: {props.maxStat?.name} ({props.maxStat?.value})
      </h4>
      <ListGroup>
        <Row>
          {props.globalStats?.map((elem, index) => (
            <Col
              lg={12}
              xs={12}
              sm={4}
              md={12}
              style={{ margin: 0 }}
              key={`${index}${elem.name}${elem.value}/isACol`}
            >
              <ListGroup.Item
                key={`${index}${elem.name}${elem.value}`}
                style={{ fontSize: "13px" }}
                active={elem.name === props.maxStat?.name}
              >
                {elem?.name}: {elem?.value}
              </ListGroup.Item>
            </Col>
          ))}
        </Row>
      </ListGroup>
    </div>
  );
};

export default GlobalDataList;

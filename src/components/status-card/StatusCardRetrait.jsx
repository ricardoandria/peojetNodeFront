import React, { useState, useEffect } from "react";

import "./statuscard.css";
//import '../../assets/boxicons-2.0.7'

const StatusCardRetrait = (props) => {
  const [client, fetchClient] = useState([]);

  const getData = () => {
    fetch("http://localhost:7072/API/Banking/statut/retrait")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchClient(res.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="status-card">
      <div className="status-card__icon">
        <i class="bx bxs-dollar-circle"></i>
      </div>

      {client.map((item, i) => {
        return (
          <div className="status-card__info">
            <h4>{item.sum}Ar</h4>
            <span>Total retrait</span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusCardRetrait;

import React, { useState, useEffect } from "react";

import "./statuscard.css";
//import '../../assets/boxicons-2.0.7'

const StatusCardVersement = (props) => {
  const [client, fetchClient] = useState([]);

  const getData = () => {
    fetch("http://localhost:7072/API/Banking/statut/versement")
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
        <i class="bx bx-dollar"></i>
      </div>

      {client.map((item, i) => {
        return (
          <div className="status-card__info">
            <h4>{item.sum}Ar</h4>
            <span>Total versement</span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusCardVersement;

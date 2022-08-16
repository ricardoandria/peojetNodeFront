import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useQuery } from "react-query";
import { useAddVersement, useCreateVersement } from "../hooks/useAddVersement";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Versement = () => {
  const [client, fetchClient] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutate } = useAddVersement();
  const [filteredData, setFilteredData] = useState([]);

  const [num_compte, setNumCompte] = useState("");
  const [id_client, setIdClient] = useState("");
  const [montant_versement, setMontantVersement] = useState("");
  const [date_versement, setDateVersement] = useState("");

  const [clientUpdate, setClientUpdate] = useState();

  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleCloseUpd = () => setOpenUpdate(false);

  const [clientData, setClientData] = useState({
    num_compte,
    id_client,
    montant_versement,
    date_versement,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClientData({ ...clientData, [name]: value });
  };

  const { loading, data, refetch } = useCreateVersement();

  const addNewVersement = async (e) => {
    e.preventDefault();
    const versement = {
      num_compte,
      id_client,
      montant_versement,
      date_versement,
      id_versement: 0,
    };

    mutate(versement);
    handleClose();
    refetch();
  };

  const deleteClient = async (id) => {
    await axios.delete(`http://localhost:7072/API/Banking/versement/${id}`);
    refetch();
  };

  const handlefilter = (event) => {
    const searchUser = event.target.value;
    const newfilter = data.data.data.filter((value) => {
      return value.num_compte.toLowerCase().includes(searchUser.toLowerCase());
    });

    if (searchUser === "") {
      setFilteredData(data.data.data);
    } else setFilteredData(newfilter);
  };

  const handleOpenUpd = async (client) => {
    setOpenUpdate(true);

    setClientData(client);
  };

  const updateVersement = async (event) => {
    event.preventDefault();
    const id = clientData.id_versement;
    delete clientData.id_versement;
    await axios
      .put(`http://localhost:7072/API/Banking/versement/${id}`, clientData)
      .then((resp) => console.log(resp.data));
    handleCloseUpd();
    refetch();
  };

  return (
    <div>
      <div
        className="top"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 className="page-header">Versement</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <button
            style={{
              padding: "15px 20px",
              background: "rgb(37, 150, 190)",
              color: "white",
              fontWeight: "600",
              marginBottom: "30px",
              borderRadius: "15px",
            }}
            onClick={handleOpen}
          >
            Verser
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
              sx={style}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-textarea"
                label="Numero Compte"
                placeholder="Numero Compte"
                name="num_compte"
                multiline
                style={{ width: "50%" }}
                onChange={(e) => setNumCompte(e.target.value)}
                value={num_compte}
              />
              <TextField
                id="outlined-textarea"
                label="Numero Client"
                placeholder="Numero Client"
                name="id_client"
                multiline
                style={{ width: "50%" }}
                onChange={(e) => setIdClient(e.target.value)}
                value={id_client}
              />
              <TextField
                id="outlined-textarea"
                label="Montant"
                placeholder="Montant"
                name="montant_versement"
                multiline
                style={{ width: "50%" }}
                onChange={(e) => setMontantVersement(e.target.value)}
                value={montant_versement}
              />
              <TextField
                id="outlined-textarea"
                label="date"
                placeholder="date"
                name="date_versement"
                multiline
                style={{ width: "50%" }}
                onChange={(e) => setDateVersement(e.target.value)}
                value={date_versement}
              />

              <button
                style={{
                  width: " 50%",
                  marginLeft: "50%",
                  padding: "10px 20px",
                  background: "rgb(37, 150, 190)",
                  color: "white",
                  fontWeight: "600",
                }}
                onClick={addNewVersement}
              >
                Ajouter
              </button>
            </Box>
          </Modal>
          <div className="topnav__search">
            <input
              type="text"
              placeholder="Recherche..."
              onChange={handlefilter}
            />
            <i className="bx bx-search"></i>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Numero versement</th>
                    <th>Numero client</th>
                    <th>Numero de compte</th>
                    <th>Montant</th>
                    <th>Date </th>
                    <th>Action</th>
                  </tr>
                </thead>
                {Object.keys(clientData ?? {}).length && (
                  <Modal
                    open={openUpdate}
                    onClose={handleCloseUpd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                      sx={style}
                      component="form"
                      noValidate
                      autoComplete="off"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "5px",
                        }}
                      >
                        <TextField
                          id="outlined-textarea"
                          label="Numero Compte"
                          placeholder="Numero Compte"
                          name="num_compte"
                          multiline
                          style={{ width: "50%" }}
                          onChange={handleChange}
                          value={clientData.num_compte}
                        />
                        <TextField
                          id="outlined-textarea"
                          label="Montant versement"
                          placeholder="Montant Versement"
                          name="montant_versement"
                          multiline
                          style={{ width: "50%" }}
                          onChange={handleChange}
                          value={clientData.montant_versement}
                        />
                      </div>

                      <TextField
                        id="outlined-textarea"
                        label="Numero client"
                        placeholder="Numero Client"
                        name="id_client"
                        multiline
                        onChange={handleChange}
                        value={clientData.id_client}
                      />

                      <TextField
                        id="outlined-textarea"
                        label="Date de versement"
                        placeholder="date de versement"
                        name="date_versement"
                        onChange={handleChange}
                        multiline
                        value={clientData.date_versement}
                      />
                      <button
                        style={{
                          width: " 50%",
                          marginLeft: "50%",
                          padding: "10px 20px",
                          background: "rgb(37, 150, 190)",
                          color: "white",
                          fontWeight: "600",
                        }}
                        onClick={updateVersement}
                      >
                        Modifier
                      </button>
                    </Box>
                  </Modal>
                )}
                <tbody>
                  {filteredData.length == 0
                    ? data?.data.data.map((item, i) => {
                        return (
                          <tr>
                            <th style={{ textAlign: "center" }} key={i}>
                              {item.id_versement}
                            </th>
                            <td style={{ textAlign: "center" }}>
                              {item.id_client}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.num_compte}
                            </td>
                            <td>{item.montant_versement} Ar</td>
                            <td>{item.date_versement}</td>
                            <td
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <button
                                onClick={() => deleteClient(item.id_versement)}
                                style={{
                                  padding: "5px 10px",
                                  background: "red",
                                  color: "white",
                                  fontWeight: "600",
                                }}
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleOpenUpd(item)}
                                style={{
                                  padding: "5px 10px",
                                  background: "rgb(37, 150, 190)",
                                  color: "white",
                                  fontWeight: "600",
                                }}
                              >
                                Modifier
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : filteredData.map((item, i) => {
                        return (
                          <tr>
                            <th style={{ textAlign: "center" }} key={i}>
                              {item.id_versement}
                            </th>
                            <td style={{ textAlign: "center" }}>
                              {item.id_client}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.num_compte}
                            </td>
                            <td>{item.montant_versement} Ar</td>
                            <td>{item.date_versement}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Versement;

/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "axios";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useAddClient, useCreateClient } from "../hooks/useAddClient";

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

export default function Customers() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleCloseUpd = () => setOpenUpdate(false);

  const [clientData, setClientData] = useState({
    nom: "",
    prenom: "",
    adress: "",
    numero_phone: "",
    num_compte: "",
    solde: "",
    id_client: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClientData({ ...clientData, [name]: value });
  };

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adress, setAdress] = useState("");
  const [numero_phone, setNumPhone] = useState();
  const [num_compte, setNumCompte] = useState("");
  const [solde, setSolde] = useState("");

  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { mutate } = useAddClient();

  const { loading, data, refetch } = useCreateClient();

  const [clientUpdate, setClientUpdate] = useState();

  const deleteClient = async (id) => {
    await axios.delete(`http://localhost:7072/API/Banking/client/${id}`);
    refetch();
  };

  const addNewClient = async (e) => {
    e.preventDefault();
    const client = {
      nom,
      prenom,
      adress,
      num_compte,
      numero_phone,
      solde,
    };

    mutate(client);
    handleClose();
    refetch();
  };

  const handlefilter = (event) => {
    const searchUser = event.target.value;
    const newfilter = data.data.data.filter((value) => {
      return value.num_compte.toLowerCase().includes(searchUser.toLowerCase());
    });

    if (searchUser == "") {
      setFilteredData(data.data.data);
    } else setFilteredData(newfilter);
  };

  const handleOpenUpd = async (client) => {
    setOpenUpdate(true);
    setClientData(client);
  };

  const updateClient = async (event) => {
    event.preventDefault();
    const id = clientData.id_client;
    // remove the id_client from the client data
    delete clientData.id_client;
    await axios
      .put(`http://localhost:7072/API/Banking/client/${id}`, clientData)
      .then((resp) => console.log(resp.data));
  };

  return (
    <>
      <div>
        <div
          className="top"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 className="page-header">Client</h2>
          <div className="topnav__search">
            <input
              type="text"
              placeholder="Recherche..."
              onChange={handlefilter}
            />
            <i className="bx bx-search"></i>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <Button
                  onClick={handleOpen}
                  variant="outlined"
                  href="#outlined-buttons"
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <AddCircleOutlineIcon /> Link
                </Button>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "5px",
                      }}
                    >
                      <TextField
                        id="outlined-textarea"
                        label="Nom"
                        placeholder="Nom"
                        name="nom"
                        multiline
                        style={{ width: "50%" }}
                        onChange={(e) => setNom(e.target.value)}
                        value={nom}
                      />
                      <TextField
                        id="outlined-textarea"
                        label="Prenoms"
                        placeholder="Prenom"
                        name="prenom"
                        multiline
                        style={{ width: "50%" }}
                        onChange={(e) => setPrenom(e.target.value)}
                        value={prenom}
                      />
                    </div>

                    <TextField
                      id="outlined-textarea"
                      label="Address"
                      placeholder="Address"
                      name="adress"
                      multiline
                      onChange={(e) => setAdress(e.target.value)}
                      value={adress}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "5px",
                      }}
                      className="numPhone_Compte"
                    >
                      <TextField
                        id="outlined-textarea"
                        label="Numero Telephone"
                        placeholder="Numero Telephone"
                        name="numero_phone"
                        multiline
                        style={{ width: "50%" }}
                        onChange={(e) => setNumPhone(e.target.value)}
                        value={numero_phone}
                      />
                      <TextField
                        id="outlined-textarea"
                        label="Numero Compte"
                        placeholder="Numero Compte"
                        multiline
                        name="num_compte"
                        style={{ width: "50%" }}
                        onChange={(e) => setNumCompte(e.target.value)}
                        value={num_compte}
                      />
                    </div>
                    <TextField
                      id="outlined-textarea"
                      label="Debut de Solde"
                      placeholder="Debut de solde"
                      name="solde"
                      onChange={(e) => setSolde(e.target.value)}
                      multiline
                      value={solde}
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
                      onClick={addNewClient}
                    >
                      Ajouter
                    </button>
                  </Box>
                </Modal>
                <table>
                  <thead>
                    <tr>
                      <th>Numero Client</th>
                      <th>Nom</th>
                      <th>Prenom</th>
                      <th>Adress</th>
                      <th>Numero phone</th>
                      <th>Numero de compte</th>
                      <th>Debut Solde</th>
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
                            label="Nom"
                            placeholder="Nom"
                            name="nom"
                            multiline
                            style={{ width: "50%" }}
                            onChange={handleChange}
                            value={clientData.nom}
                          />
                          <TextField
                            id="outlined-textarea"
                            label="Prenoms"
                            placeholder="Prenom"
                            name="prenom"
                            multiline
                            style={{ width: "50%" }}
                            onChange={handleChange}
                            value={clientData.prenom}
                          />
                        </div>

                        <TextField
                          id="outlined-textarea"
                          label="Address"
                          placeholder="Address"
                          name="adress"
                          multiline
                          onChange={handleChange}
                          value={clientData.adress}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "5px",
                          }}
                          className="numPhone_Compte"
                        >
                          <TextField
                            id="outlined-textarea"
                            label="Numero Telephone"
                            placeholder="Numero Telephone"
                            name="numero_phone"
                            multiline
                            style={{ width: "50%" }}
                            onChange={handleChange}
                            value={clientData.numero_phone}
                          />
                          <TextField
                            id="outlined-textarea"
                            label="Numero Compte"
                            placeholder="Numero Compte"
                            multiline
                            name="num_compte"
                            style={{ width: "50%" }}
                            onChange={handleChange}
                            value={clientData.num_compte}
                          />
                        </div>
                        <TextField
                          id="outlined-textarea"
                          label="Debut de Solde"
                          placeholder="Debut de solde"
                          name="solde"
                          onChange={handleChange}
                          multiline
                          value={clientData.solde}
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
                          onClick={updateClient}
                        >
                          Modifier
                        </button>
                      </Box>
                    </Modal>
                  )}

                  <tbody>
                    {filteredData.length == 0
                      ? data.data.data.map((item, i) => {
                          return (
                            <>
                              <tr>
                                <th style={{ textAlign: "center" }} key={i}>
                                  {item.id_client}
                                </th>
                                <td>{item.nom}</td>
                                <td>{item.prenom}</td>
                                <td>{item.adress}</td>
                                <td>{item.numero_phone}</td>
                                <td style={{ textAlign: "center" }}>
                                  {item.num_compte}
                                </td>
                                <td>{item.solde} Ar</td>
                                <td
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <button
                                    onClick={() => deleteClient(item.id_client)}
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
                            </>
                          );
                        })
                      : filteredData.map((item, i) => {
                          return (
                            <>
                              <tr>
                                <th style={{ textAlign: "center" }} key={i}>
                                  {item.id_client}
                                </th>
                                <td>{item.nom}</td>
                                <td>{item.prenom}</td>
                                <td>{item.adress}</td>
                                <td>{item.numero_phone}</td>
                                <td style={{ textAlign: "center" }}>
                                  {item.num_compte}
                                </td>
                                <td>{item.solde} Ar</td>
                                <td>
                                  <button
                                    onClick={deleteClient(item.id_client)}
                                    style={{
                                      padding: "5px 10px",
                                      background: "red",
                                      color: "white",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

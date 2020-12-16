import React, { useState, useEffect } from "react";
import axios from "axios";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { ModalTitle } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

function Pagination() {
  const [players, setPlayers] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getPlayerData = async () => {
    try {
      const data = await axios.get(
        "https://nba-players.herokuapp.com/players-stats"
      );
      setPlayers(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPlayerData();
  }, []);

  const columns = [
    { dataField: "name", text: "Player NAme" },
    { dataField: "points_per_game", text: "Points per" },
    { dataField: "team_name", text: "Player Team" },
  ];

  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      setModalInfo(row);
      toggleTrueFalse();
    },
  };

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  function ModalContent() {
    return (
      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>ble</ModalTitle>
        </ModalHeader>
        <ModalBody>Woohoo, you're reading this text in a modal!</ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <div className="pagination">
      <BootStrapTable
        keyField="name"
        data={players}
        hover
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
      />

      {show ? <ModalContent /> : null}
    </div>
  );
}

export default Pagination;

import React, { useMemo, useState } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { products } from "./data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  Button as BootstrapButton,
  Form,
  Button,
} from "react-bootstrap";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(BootstrapButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalStyle = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "80%",
  width: "80%", // Ajusta el ancho del modal según tus necesidades
};

/* eslint-disable react/prop-types */

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="buscar"
      type="text"
      placeholder="Filtro por nombre"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

export const Products = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bulkUpdatePercentage, setBulkUpdatePercentage] = useState(0);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
  const [showBulkUpdateConfirmModal, setShowBulkUpdateConfirmModal] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const filteredItems = products.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    price: 0,
    code: "",
    category: "",
    // ... otros campos según tu estructura de datos
  });

  const handleDelete = (productId) => {
    if (productId) {
      if (selectedRows.length > 1) {
        setShowConfirmDeleteModal(true);
      } else {
        // Configura el producto seleccionado antes de abrir el modal
        setSelectedProductId(productId);
        setShowDeleteModal(true);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setShowConfirmDeleteModal(false); // También cerramos el modal de eliminación masiva si está abierto
    setSelectedProductId(null); // Restablece el ID del producto seleccionado
  };

  const handleBulkUpdate = () => {
    setShowBulkUpdateModal(true);
  };

  const handleBulkUpdateConfirm = () => {
    // Lógica para la actualización masiva de precios
    console.log(
      `Actualizar precios masivamente en un ${bulkUpdatePercentage}%: ${selectedRows.length} productos`
    );
    setShowBulkUpdateConfirmModal(false);
    setShowBulkUpdateModal(false);
  };

  const handleRowSelected = (state) => {
    // Actualizar la lista de filas seleccionadas
    setSelectedRows(state.selectedRows);
  };

  const handleEdit = (productId) => {
    // Obtener los detalles del producto seleccionado
    const product = products.find((item) => item.id === productId);
    setSelectedProduct(product);

    // Cargar datos del producto en el estado del formulario
    setUpdateFormData({
      name: product.name || "",
      price: product.price || 0,
      code: product.code || "",
      category: product.category || "",
      // ... otros campos según tu estructura de datos
    });

    setShowUpdateModal(true);
  };

  const handleUpdate = () => {
    // Verificar si selectedProduct es nulo antes de intentar acceder a selectedProduct.id
    if (selectedProduct) {
      console.log(`Actualizar producto: ${selectedProduct.id}`);
      console.log("Nuevos datos:", updateFormData);
      setShowUpdateModal(false);
    }
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Código",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Button
            className="btn btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faTrashAlt} />
          </Button>
          <Button
            className="btn btn-warning"
            onClick={() => handleEdit(row.id)} // Llamar handleEdit con el ID del producto
          >
            <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} />
          </Button>
        </>
      ),
    },
  ];

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <DataTable
        title="Productos"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
          selectAllRowsItem: true,
          selectAllRowsItemText: "Todos",
        }}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        persistTableHead
        onSelectedRowsChange={handleRowSelected}
        contextActions={[
          <BootstrapButton
            key="delete"
            variant="danger"
            onClick={() => handleDelete(selectedRows[0]?.id)}
            disabled={selectedRows.length < 1}
          >
            Eliminar
          </BootstrapButton>,
          <BootstrapButton
            key="bulkUpdate"
            variant="warning"
            onClick={() => handleBulkUpdate()}
            disabled={selectedRows.length === 0}
          >
            Actualizar
          </BootstrapButton>,
        ]}
        contextMessage={{
          singular: "fila seleccionada",
          plural: "filas seleccionadas",
        }}
      />

      {/* Modal para confirmación de eliminación */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        style={modalStyle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </BootstrapButton>
          <BootstrapButton
            variant="danger"
            onClick={() => handleDelete(selectedProductId)}
          >
            Eliminar
          </BootstrapButton>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmación de eliminación masiva */}
      <Modal
        show={showConfirmDeleteModal}
        onHide={() => setShowConfirmDeleteModal(false)}
        style={modalStyle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación masiva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar estos productos?
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton
            variant="secondary"
            onClick={() => setShowConfirmDeleteModal(false)}
          >
            Cancelar
          </BootstrapButton>
          <BootstrapButton variant="danger" onClick={handleDelete}>
            Eliminar
          </BootstrapButton>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        style={modalStyle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Actualizar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="updateFormName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del producto"
                value={updateFormData.name}
                onChange={(e) =>
                  setUpdateFormData({ ...updateFormData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="updateFormPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio del producto"
                value={updateFormData.price}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="updateFormCode">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código del producto"
                value={updateFormData.code}
                onChange={(e) =>
                  setUpdateFormData({ ...updateFormData, code: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="updateFormCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Categoría del producto"
                value={updateFormData.category}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    category: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* ... otros campos según tu estructura de datos */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton
            variant="secondary"
            onClick={() => setShowUpdateModal(false)}
          >
            Cancelar
          </BootstrapButton>
          <BootstrapButton variant="primary" onClick={handleUpdate}>
            Actualizar
          </BootstrapButton>
        </Modal.Footer>
      </Modal>

      {/* Modal para actualización masiva de precios */}
      <Modal
        show={showBulkUpdateModal}
        onHide={() => setShowBulkUpdateModal(false)}
        style={modalStyle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Actualizar precios masivamente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="bulkUpdateForm">
            <Form.Label>Porcentaje de actualización:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el porcentaje"
              value={bulkUpdatePercentage}
              onChange={(e) => setBulkUpdatePercentage(e.target.value)}
            />
          </Form.Group>
          <p>{`¿Estás seguro de actualizar ${selectedRows.length} productos en un ${bulkUpdatePercentage}%?`}</p>
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton
            variant="secondary"
            onClick={() => setShowBulkUpdateModal(false)}
          >
            Cancelar
          </BootstrapButton>
          <BootstrapButton
            variant="primary"
            onClick={() => setShowBulkUpdateConfirmModal(true)}
          >
            Actualizar
          </BootstrapButton>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmación de actualización masiva */}
      <Modal
        show={showBulkUpdateConfirmModal}
        onHide={() => setShowBulkUpdateConfirmModal(false)}
        style={modalStyle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar actualización masiva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas realizar esta actualización masiva?
        </Modal.Body>
        <Modal.Footer>
          <BootstrapButton
            variant="secondary"
            onClick={() => setShowBulkUpdateConfirmModal(false)}
          >
            Cancelar
          </BootstrapButton>
          <BootstrapButton variant="primary" onClick={handleBulkUpdateConfirm}>
            Actualizar
          </BootstrapButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Products;

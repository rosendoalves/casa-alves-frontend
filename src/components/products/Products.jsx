import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  Button as BootstrapButton,
  Form,
  Button,
} from "react-bootstrap";
import useItemApi from "../../api/itemApi";
import Swal from "sweetalert2";
import { formatDateShow, formatNumberWithCommas } from "../../utils/format";

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
  width: "80%",
  overflow: "hidden",
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
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [bulkUpdatePercentage, setBulkUpdatePercentage] = useState(0);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [showBulkUpdateConfirmModal, setShowBulkUpdateConfirmModal] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const filteredItems = products?.filter((item) => {
    const lowerCaseFilter = filterText.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseFilter) ||
      item.internalcode.toLowerCase().includes(lowerCaseFilter) ||
      item.updatedByDisplayValue.toLowerCase().includes(lowerCaseFilter) ||
      item.barcode.toLowerCase().includes(lowerCaseFilter) ||
      (typeof item.price === 'number' && item.price.toString().includes(filterText))
    );
  });
  
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    price: 0,
    internalcode: "",
    barcode: "",
  });

  const { getItems, updateItems } = useItemApi();

  const handleDelete = (productId) => {
    if (productId) {
      if (selectedRows.length > 1) {
        setShowConfirmDeleteModal(true);
      } else {
        setSelectedProductId(productId);
        setShowDeleteModal(true);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setShowConfirmDeleteModal(false);
    setSelectedProductId(null);
  };

  const handleBulkUpdate = () => {
    setShowBulkUpdateModal(true);
  };

  const handleBulkUpdateConfirm = () => {
    const parsedPercentage = parseFloat(bulkUpdatePercentage);

    if (
      isNaN(parsedPercentage) ||
      parsedPercentage < 0 ||
      parsedPercentage > 500 ||
      /\W/.test(bulkUpdatePercentage)
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Porcentaje inválido",
        text: "El porcentaje debe estar en el rango [0, 500] y no debe contener caracteres especiales.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const newPrice = 1 + bulkUpdatePercentage / 100;

    const updatedProducts = selectedRows.map((row) => ({
      ...row,
      price: Math.round((row.price * newPrice) / 10) * 10,
    }));

    const formData = {
      items: updatedProducts,
    };

    updateItems(formData)
      .then(() => {
        setShowBulkUpdateModal(false);
        setShowBulkUpdateConfirmModal(false);
        setBulkUpdatePercentage(0);
        setToggleCleared(!toggleCleared);
        setLoading(true);
      })
      .catch((err) => {
        console.error("Error en la actualización masiva:", err);
      })
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleEdit = (productId) => {
    const product = products.find((item) => item.id === productId);
    setSelectedProduct(product);

    setUpdateFormData({
      name: product.name || "",
      price: product.price || 0,
      internalcode: product.internalcode || "",
      barcode: product.barcode || "",
    });

    setShowUpdateModal(true);
  };

  const handleUpdate = () => {
    if (selectedProduct) {
      const formData = {
        items: [updateFormData],
      };
      setLoading(true);
      updateItems(formData)
        .then(() => {
          setShowUpdateModal(false);
          setShowBulkUpdateConfirmModal(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      wrap: true
    },
    {
      name: "Precio",
      selector: (row) => formatNumberWithCommas(row.price),
      sortable: true,
      center: true,
    },
    {
      name: "Cód. Barra",
      selector: (row) => row.barcode,
      sortable: true,
    },
    {
      name: "Cód. Interno",
      selector: (row) => row.internalcode,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => `${formatDateShow(row.createdAt)}`,
      sortable: true,
      wrap: true
    },
    {
      name: "Creador",
      selector: (row) =>`${row.updatedByDisplayValue}`,
      sortable: true,
      wrap: true
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <Button
            className="btn btn-danger"
            onClick={() => handleDelete(row.id)}
            disabled={true}
          >
            <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faTrashAlt} />
          </Button>
          <Button
            className="btn btn-warning"
            onClick={() => handleEdit(row.id)}
          >
            <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getItems()
      .then((res) => {
        res.payload.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        setProducts(res.payload);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [loading]);

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
        clearSelectedRows={toggleCleared}
        persistTableHead
        onSelectedRowsChange={handleRowSelected}
        contextActions={[
          <BootstrapButton
            key="delete"
            variant="danger"
            onClick={() => handleDelete(selectedRows[0]?.id)}
            // disabled={selectedRows.length < 1}
            disabled={true}
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
                    price: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="updateFormCode">
              <Form.Label>Cód. Interno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código interno del producto"
                value={updateFormData.internalcode}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    internalcode: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="updateFormCategory">
              <Form.Label>Cód. Barra</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código de barra del producto"
                value={updateFormData.barcode}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    barcode: e.target.value,
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
              required
              type="number"
              placeholder="Ingrese el porcentaje"
              pattern="^[1-9]\d{0,2}$|1000"
              title="El precio debe ser un número mayor que 0, no puede contener caracteres especiales y no debe superar los 1000."
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

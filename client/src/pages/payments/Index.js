import React, { useState, useEffect } from 'react';
import Table from '../../components/table/Table';
import CommonModal from "../../components/modal/CommonModal";
import AdminNav from "../../components/nav/AdminNav";
import {
  listPayment,
  createPayment,
  updatePayment,
  deletePayment
} from "../../utils/ApiRoute";

const Index = () => {
  const [payments, setPayments] = useState([]);
  const [currentItem, setCurrentItem] = useState({ id: null, amount: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPayments = async (pageNumber = 1) => {
    try {
      const res = await listPayment(pageNumber);
      const data_res = res.data.data
      setPayments(data_res?.payments || []);
      setPage(data_res?.currentPage || 1);
      setTotalPages(data_res?.totalPages || 1);
    } catch (error) {
      console.error("Error loading payments:", error);
      alert("Failed to load payments");
    }
  };

  useEffect(() => {
    loadPayments(page);
  }, [page]);

  const columns = [
    { key: 'id', header: '#' },
    { key: 'amount', header: 'Amount' },
    { key: 'description', header: 'Description' },
  ];

  const handleEdit = (row) => {
    setIsEditing(true);
    setCurrentItem(row);
    document.getElementById('openModalButton').click();
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentItem({ id: null, amount: '', description: '' });
    document.getElementById('openModalButton').click();
  };

  const handleDelete = async (row) => {
    const confirmed = window.confirm(`Delete payment with ID ${row.id}?`);
    if (confirmed) {
      try {
        await deletePayment(row.id);
        loadPayments(page);
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete payment");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updatePayment(currentItem.id, currentItem);
      } else {
        await createPayment(currentItem);
      }
      loadPayments(page);
      document.querySelector('.btn-close').click();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save payment");
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && page > 1) {
      setPage(page - 1);
    }
    if (direction === 'next' && page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 container mt-4">
          <h3>Payment Table</h3>
          <button className="btn btn-success mb-3" onClick={handleAdd}>
            Add Payment
          </button>

          <Table
            columns={columns}
            data={payments}
            pageSize={10}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-outline-primary"
              disabled={page === 1}
              onClick={() => handlePageChange('prev')}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              className="btn btn-outline-primary"
              disabled={page === totalPages}
              onClick={() => handlePageChange('next')}
            >
              Next
            </button>
          </div>

          {/* Hidden Button to Trigger Modal */}
          <button
            id="openModalButton"
            data-bs-toggle="modal"
            data-bs-target="#paymentModal"
            style={{ display: 'none' }}
          >
            Open Modal
          </button>

          {/* Modal */}
          <CommonModal
            id="paymentModal"
            title={isEditing ? 'Edit Payment' : 'Add Payment'}
            onSubmit={handleSave}
            submitText={isEditing ? 'Update' : 'Save'}
          >
            <input
              type="number"
              className="form-control mb-2"
              value={currentItem.amount}
              onChange={(e) => setCurrentItem({ ...currentItem, amount: e.target.value })}
              autoFocus
              placeholder='Enter Amount'
              required
            />
            <input
              type="text"
              className="form-control mb-2"
              value={currentItem.description}
              onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
              placeholder='Enter Description'
              required
            />
          </CommonModal>
        </div>
      </div>
    </div>
  );
};

export default Index;

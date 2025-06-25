import React, { useState, useEffect } from 'react';
import Table from '../../components/table/Table';
import CommonModal from "../../components/modal/CommonModal";
import AdminNav from "../../components/nav/AdminNav";
import {
 listAccounts,
createAccounts,
updateAccounts,
deleteAccounts
} from "../../utils/ApiRoute";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentItem, setCurrentItem] = useState({ id: null, name: '', balance: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadAccounts = async (pageNumber = 1) => {
    try {
      const res = await listAccounts(pageNumber);
      const data_res = res.data.data
      setAccounts(data_res?.accounts || []);
      setPage(data_res?.currentPage || 1);
      setTotalPages(data_res?.totalPages || 1);
    } catch (error) {
      console.error("Error loading accounts:", error);
      alert("Failed to load accounts");
    }
  };

  useEffect(() => {
    loadAccounts(page);
  }, [page]);

  const columns = [
    { key: 'id', header: '#' },
    { key: 'name', header: 'Name' },
    { key: 'balance', header: 'Balance' },
  ];

  const handleEdit = (row) => {
    setIsEditing(true);
    setCurrentItem(row);
    document.getElementById('openModalButton').click();
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentItem({ id: null, name: '', balance: '' });
    document.getElementById('openModalButton').click();
  };

  const handleDelete = async (row) => {
    const confirmed = window.confirm(`Delete payment with ID ${row.id}?`);
    if (confirmed) {
      try {
        await deleteAccounts(row.id);
        loadAccounts(page);
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete payment");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateAccounts(currentItem.id, currentItem);
      } else {
        await createAccounts(currentItem);
      }
      loadAccounts(page);
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
          <h3>Accounts Table</h3>
          <button className="btn btn-success mb-3" onClick={handleAdd}>
            Add Accounts
          </button>

          <Table
            columns={columns}
            data={accounts}
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
            title={isEditing ? 'Edit Accounts' : 'Add Accounts'}
            onSubmit={handleSave}
            submitText={isEditing ? 'Update' : 'Save'}
          >
            <input
              type="text"
              className="form-control mb-2"
              value={currentItem.name}
              onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
              autoFocus
              placeholder='Enter Name'
              required
            />
            <input
              type="number"
              className="form-control mb-2"
              value={currentItem.balance}
              onChange={(e) => setCurrentItem({ ...currentItem, balance: e.target.value })}
              placeholder='Enter Balance'
              required
            />
          </CommonModal>
        </div>
      </div>
    </div>
  );
};

export default Accounts;

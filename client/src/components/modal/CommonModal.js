// components/CommonModal.js
import React from 'react';

const CommonModal = ({
  id = 'commonModal',
  title = 'Modal Title',
  children,
  onSubmit,
  submitText = 'Save',
}) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${id}Label`}>
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body">{children}</div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onSubmit}>
              {submitText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;

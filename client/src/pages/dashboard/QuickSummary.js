import React from 'react';

const QuickSummary = ({ totalAccounts, recentPayments }) => {
  return (
    <div className="container my-4">
      <h4 className="mb-4">Quick Summary</h4>

      <div className="row g-4">

        {/* Total Accounts Card */}
        <div className="col-md-4">
          <div className="card text-white bg-primary h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="card-title">Total Accounts</h5>
              <h2>{totalAccounts}</h2>
            </div>
          </div>
        </div>

        {/* Recent Payments Card */}
        <div className="col-md-8">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Recent Payments</h5>
              {recentPayments.length === 0 ? (
                <p>No recent payments found.</p>
              ) : (
                <ul className="list-group">
                  {recentPayments.map((payment, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {payment.name}
                      <span className="badge bg-success rounded-pill">
                        ₹ {payment.balance}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuickSummary;

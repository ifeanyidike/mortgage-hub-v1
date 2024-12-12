"use client";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Popconfirm } from "antd";

const DeleteAccount = observer(() => {
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoadingDeactivate, setConfirmLoadingDeactivate] =
    useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);

  const handleDeleteOk = () => {
    setConfirmLoadingDelete(true);

    setTimeout(() => {
      setOpenDelete(false);
      setConfirmLoadingDelete(false);
    }, 2000);
  };

  const handleDeactivateOk = () => {
    setConfirmLoadingDeactivate(true);

    setTimeout(() => {
      setOpenDeactivate(false);
      setConfirmLoadingDeactivate(false);
    }, 2000);
  };

  return (
    <div className="card">
      <div className="card-header" id="delete_account">
        <h3 className="card-title">Delete Account</h3>
      </div>
      <div className="card-body lg:py-7.5 lg:gap-7.5 gap-5">
        <div className="flex flex-col gap-5">
          <div className="text-2sm text-gray-800">
            We regret to see you leave. Confirm account deletion below. Your
            data will be permanently removed. Thank you for being part of our
            community. Please check our
            <a href="#" className="link">
              &nbsp;Setup Guidelines&nbsp;
            </a>
            if you still wish continue.
          </div>

          <label className="checkbox-group">
            <input
              className="checkbox checkbox-sm"
              name="delete"
              type="checkbox"
              value="1"
              readOnly
            />
            <span className="checkbox-label">Confirm deleting account</span>
          </label>
        </div>

        <div className="flex justify-end gap-2.5">
          <Popconfirm
            okText="Yes"
            title="Deactivate Account"
            description="Are you sure you want to deactivate this account?"
            open={openDeactivate}
            onConfirm={handleDeactivateOk}
            okButtonProps={{ loading: confirmLoadingDeactivate }}
            onCancel={() => setOpenDeactivate(false)}
          >
            <button
              onClick={() => setOpenDeactivate(true)}
              className="btn btn-light"
            >
              Deactivate Instead
            </button>
          </Popconfirm>

          <Popconfirm
            okText="Yes"
            title="Delete Account"
            description={
              <div className="max-w-80">
                Are you sure you want to delete this account? Your account and
                all related information will be removed. This action cannot be
                undone.
              </div>
            }
            open={openDelete}
            onConfirm={handleDeleteOk}
            okButtonProps={{ loading: confirmLoadingDelete }}
            onCancel={() => setOpenDelete(false)}
          >
            <button
              onClick={() => setOpenDelete(true)}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
});

export { DeleteAccount };

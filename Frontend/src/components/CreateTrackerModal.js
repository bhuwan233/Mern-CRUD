import React, { Children } from "react";
import "../css/CreateTrackerModal.css";

const CreateTrackerModal = ({ closeMethod, createTracker, children, labelMsg }) => {

  return (
    <div id="myModal" className="modal-frame">
        <div className="modal-content scale-up-center">
            <div className="modal-header">
                <h2>{labelMsg}</h2>
                <span className="close" onClick={() => {closeMethod()}} >
                    &times;
                </span>
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer"><button onClick={() => {createTracker()}} > Save </button> <button onClick={() => {closeMethod()}}> Cancel </button></div>
        </div>
    </div>
  );
};

export default CreateTrackerModal;

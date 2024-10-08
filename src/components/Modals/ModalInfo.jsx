import React from 'react';
import { Drawer } from "antd";

const ModalInfo = ({ openModal, setOpenModal, selectedRow, title }) => {
    return (
        <Drawer
            title={title}
            open={openModal}
            onClose={() => setOpenModal(false)}
            width={400}
        >
            <div style={{ flexDirection: 'column', alignItems: 'left' }} className="flex">
                {selectedRow && Object.keys(selectedRow).map((key, index) => {
                    return (
                        <div key={index} className="flex my-2">
                            <p><b>{key}</b>: {selectedRow[key]}</p>
                        </div>
                    );
                })}
            </div>
        </Drawer>
    );
}

export default ModalInfo;
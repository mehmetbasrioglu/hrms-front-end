import React from "react";

function InformationBox({children,company}) {
  return (
    <div>
      <div className="miniBox d-flex flex-column">
        <span style={{ marginBottom: 20 }}>
          <strong>{company} Hakkında</strong>
        </span>
        {children}
      </div>
    </div>
  );
}

export default InformationBox;

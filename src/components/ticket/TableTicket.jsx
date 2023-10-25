import React, { useEffect, useState } from "react";
import Loading from "../spinner/Loading";

const TableTicket = () => {
  const [loading, setLoading] = useState(true);
  console.log("🚀 ~ file: TableTicket.jsx:6 ~ TableTicket ~ loading:", loading)

  useEffect(() => {
    setLoading(false);
  }, []);

  !loading ?
  <Loading/>
  : (<div className="mt-3">TableTicket</div>);
};

export default TableTicket;

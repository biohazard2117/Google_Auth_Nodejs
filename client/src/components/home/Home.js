import React, { useState, useEffect } from "react";
import Table from "./Table";

export default function Home() {
  const [page, setpage] = useState("Dashboard");
  const [user, setuser] = useState("");

  function handleLogOut() {
    document.cookie = "USER=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = "/";
  }

  useEffect(() => {
    const userData = decodeURIComponent(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("USER"))
        ?.split("=")[1]
    );
    console.log(userData);
    if (userData) {
      const data1 = userData.split(":")[3];
      const data2 = data1.split('"')[1];
      console.log(data2);
      setuser(data2);
    } else {
      window.location = "/";
    }
    // console.log(userData.j)
  }, []);

  return (
    <div>
      <div className="navbar">
        <div onClick={() => setpage("Dashboard")}>Dashboard</div>
        &nbsp;
        <div onClick={() => setpage("Table")} style={{ margin: "0px 50px" }}>
          Data
        </div>
        <div onClick={() => handleLogOut()}>Logout</div>
      </div>
      {page === "Dashboard" && <div className="home">Welocome : {user} </div>}
      {page === "Table" && (
        <div className="home">
          <Table />
        </div>
      )}
    </div>
  );
}

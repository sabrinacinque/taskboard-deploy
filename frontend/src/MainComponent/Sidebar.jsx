import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  FiHome,
  FiFolder,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiUser,
  FiSmile,
  FiStar,
} from "react-icons/fi";
import "./Sidebar.css";

const AVATAR_MAP = {
  user:  FiUser,
  users: FiUsers,
  smile: FiSmile,
  star:  FiStar,
};

export default function Sidebar({ onLinkClick }) {
  const isLoggedIn = !!localStorage.getItem("token");
  const username   = localStorage.getItem("username");
  const avatarKey  = localStorage.getItem("avatar");
  const AvatarIcon = AVATAR_MAP[avatarKey] || FiUser;
  const navigate   = useNavigate();
  const BASE_URL = `${import.meta.env.VITE_API_URL}/api/v1/sessions/logout`;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("avatar");

      await Swal.fire({
        title: "Logout successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      Swal.fire("Errore", "Impossible to logout.", "error");
    }
  };

  return (
    <aside className="sidebar vh-100 d-flex flex-column py-5">
      <nav className="nav flex-column px-3 fs-5 vh-100">
        <NavLink
          end
          to="/"
          className="nav-link d-flex align-items-center mb-2"
          onClick={() => {
            if (onLinkClick) onLinkClick();
          }}
        >
          <FiHome className="me-2" /> Home
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink
              to="/teams"
              className="nav-link d-flex align-items-center mb-2"
              onClick={() => {
                if (onLinkClick) onLinkClick();
              }}
            >
              <FiUsers className="me-2" /> Friends
            </NavLink>
            <NavLink
              to="/projects"
              className="nav-link d-flex align-items-center mb-2"
              onClick={() => {
                if (onLinkClick) onLinkClick();
              }}
            >
              <FiFolder className="me-2" /> Projects
            </NavLink>
            <NavLink
              to="/settings"
              className="nav-link d-flex align-items-center"
              onClick={() => {
                if (onLinkClick) onLinkClick();
              }}
            >
              <FiSettings className="me-2" /> Settings
            </NavLink>
          </>
        )}
      </nav>

      {isLoggedIn && (
        <>
          <div className="user-section mt-auto px-3 pb-4 d-flex align-items-center">
            <div
              className="user-avatar d-flex justify-content-center align-items-center me-2"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#646cff",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <AvatarIcon />
            </div>
            <div className="text-white">
              Hello,
              <br /> <strong>{username}</strong>!
            </div>
          </div>

          <div className="logout-section px-3 pb-4">
            <button
              onClick={handleLogout}
              className="logout-btn d-flex align-items-center fs-5"
            >
              <FiLogOut className="me-2" /> Logout
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

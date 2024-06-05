import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
const Sidebar = () => {
  return (
    <div>
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start bg-white overflow-hidden pr-8">
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-teal-800 text-white hover:bg-teal-700 btn-primary drawer-button lg:hidden md:hidden"
            >
              <RxHamburgerMenu />
            </label>
            <button className="btn btn-primary rounded-full items-center gap-2 px-6 text-white sm:hidden">
              Log out
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4 w-full mr-8">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full text-white bg-teal-800 ">
            {/* Sidebar content here */}
            <li className="font-bold">
              <Link to="/" className="flex justify-start mb-3 active-link">
                HỌC BẠ ĐIỆN TỬ
              </Link>
            </li>
            <hr />
            <li>
              <Link className="" to="/student-manager">
                Quản Lý Học Sinh
              </Link>
            </li>
            <li>
              <Link className="" to="/teacher-manager">
                Quản Lý Giáo Viên
              </Link>
            </li>
            <li>
              <Link className="" to="/class-manager">
                Quản Lý Lớp Học
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

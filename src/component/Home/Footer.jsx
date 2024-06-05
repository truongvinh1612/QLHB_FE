import React from "react";

const Footer = () => {
  return (
    <div>
      {" "}
      {/* Sidebar */}
      <div className="w-64 h-full bg-teal-800 text-white flex flex-col">
        <div className="p-4 text-lg font-semibold border-b border-gray-700">
          Học bạ điện tử
        </div>
        <nav className="flex-grow p-4">
          <ul>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Hồ sơ học sinh
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Cá biệt
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Sổ điểm
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Vi phạm
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Tổng kết điểm
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Tiếp nhận chuyển trường
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Khen thưởng
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Kỷ luật
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Bảo lưu
              </a>
            </li>
            <li className="mb-3">
              <a href="#" className="block py-2 px-4 rounded hover:bg-teal-700">
                Quản lý thông tin tốt nghiệp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;

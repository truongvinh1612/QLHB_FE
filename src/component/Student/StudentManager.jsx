import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../Home/Searchbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { LINK_API } from "../../globalAPI/linkAPI";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [anchorEls, setAnchorEls] = useState({});

  useEffect(() => {
    axios
      .get(`${LINK_API}hocsinh`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setStudents(data);
        setFilteredStudents(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAllCheckedChange = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    if (newAllChecked) {
      setSelectedStudents(students.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleStudentCheckedChange = (id) => {
    setSelectedStudents((prevState) =>
      prevState.includes(id)
        ? prevState.filter((studentId) => studentId !== id)
        : [...prevState, id]
    );
  };

  const handleDeleteSelectedStudents = () => {
    axios
      .delete(`${LINK_API}hocsinh/delete-multiple`, {
        data: selectedStudents
      })
      .then(() => {
        setFilteredStudents((prevState) =>
          prevState.filter((student) => !selectedStudents.includes(student.id))
        );
        setSelectedStudents([]);
      })
      .catch((error) =>
        console.error("Error deleting selected students:", error)
      );
  };
  

  const handleClick = (event, id) => {
    setAnchorEls((prevState) => ({ ...prevState, [id]: event.currentTarget }));
  };

  const handleClose = (id) => {
    setAnchorEls((prevState) => ({ ...prevState, [id]: null }));
  };


  return (
    <div>
      <div className="w-full md:w-full px-4 mr-8">
        <Searchbar />
        <div className="flex justify-end">
          <button className="btn m-2 bg-teal-900 text-white hover:bg-teal-700">
            Nhập/Xuất
          </button>
          <Link
            to="/addStudent"
            className="btn m-2 bg-teal-900 text-white hover:bg-teal-700"
          >
            Thêm mới
          </Link>

          <button
            onClick={handleDeleteSelectedStudents}
            className="btn m-2 bg-teal-900 text-white hover:bg-teal-700"
          >
            Xoá
          </button>
        </div>
        <div className="bg-white text-teal-800 p-4 rounded-lg shadow-md overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th>
                  <Checkbox
                    checked={allChecked}
                    onChange={handleAllCheckedChange}
                    sx={{
                      color: green[800],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  STT
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Họ Tên
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Ngày Sinh
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Giới Tính
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Mã Định Danh
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Địa Chỉ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Lớp
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Trạng Thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Checkbox
                        sx={{
                          color: green[900],
                          "&.Mui-checked": {
                            color: green[900],
                          },
                        }}
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentCheckedChange(student.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        id="fade-button"
                        aria-controls={
                          anchorEls[student.id] ? "fade-menu" : undefined
                        }
                        sx={{
                          color: green[900],
                        }}
                        aria-haspopup="true"
                        aria-expanded={
                          anchorEls[student.id] ? "true" : undefined
                        }
                        onClick={(event) => handleClick(event, student.id)}
                      >
                        {student.hoTen}
                      </Button>
                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEls[student.id]}
                        open={Boolean(anchorEls[student.id])}
                        onClose={() => handleClose(student.id)}
                        TransitionComponent={Fade}
                      >
                        <Link to={`/student-detail/${student.id}`}>
                          <MenuItem onClick={() => handleClose(student.id)}>
                            <VisibilityIcon className="mr-2" size="20px" />
                            Xem hồ sơ
                          </MenuItem>
                          <Divider />
                        </Link>

                        <Link to={`/student-edit/${student.id}`}>
                          <MenuItem onClick={() => handleClose(student.id)}>
                            <BorderColorIcon className="mr-2" />
                            Sửa hồ sơ
                          </MenuItem>
                          <Divider />
                        </Link>
                      </Menu>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {student.ngaySinh
                        ? new Date(student.ngaySinh).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {student.gioiTinh ? "Nam" : "Nữ"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {student.maDinhDanh}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {student.thuongTru.slice(0, 30)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {student.lop}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {student.trangThai ? "Đang Học" : "Không Học"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="11"
                    className="px-6 py-4 whitespace-nowrap text-center text-sm"
                  >
                    Không có học sinh nào được tìm thấy.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManager;

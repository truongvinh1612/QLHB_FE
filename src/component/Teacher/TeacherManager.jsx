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

const TeacherManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [anchorEls, setAnchorEls] = useState({});

  useEffect(() => {
    axios
      .get(`${LINK_API}giaovien`)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setTeachers(data);
        setFilteredTeachers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAllCheckedChange = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    if (newAllChecked) {
      setSelectedTeachers(teachers.map((teacher) => teacher.id));
    } else {
      setSelectedTeachers([]);
    }
  };

  const handleTeacherCheckedChange = (id) => {
    setSelectedTeachers((prevState) =>
      prevState.includes(id)
        ? prevState.filter((teacherId) => teacherId !== id)
        : [...prevState, id]
    );
  };

  const handleDeleteSelectedTeachers = () => {
    if (selectedTeachers.length === 0) {
      console.log("No teachers selected for deletion.");
      return;
    }
    axios
      .delete(`${LINK_API}giaovien/delete-multiple`, {
        data: selectedTeachers, // Send selected teacher IDs in the request body
      })
      .then(() => {
        setFilteredTeachers((prevState) =>
          prevState.filter((teacher) => !selectedTeachers.includes(teacher.id))
        );
        setSelectedTeachers([]);
      })
      .catch((error) =>
        console.error("Error deleting selected teachers:", error)
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
            to="/addTeacher"
            className="btn m-2 bg-teal-900 text-white hover:bg-teal-700"
          >
            Thêm mới
          </Link>

          <button
            onClick={handleDeleteSelectedTeachers}
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
                  Căn Cước Công Dân
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
                  Trình Độ
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Liên Lạc
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher, index) => (
                  <tr key={teacher.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Checkbox
                        sx={{
                          color: green[900],
                          "&.Mui-checked": {
                            color: green[900],
                          },
                        }}
                        checked={selectedTeachers.includes(teacher.id)}
                        onChange={() => handleTeacherCheckedChange(teacher.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        id="fade-button"
                        aria-controls={
                          anchorEls[teacher.id] ? "fade-menu" : undefined
                        }
                        sx={{
                          color: green[900],
                        }}
                        aria-haspopup="true"
                        aria-expanded={
                          anchorEls[teacher.id] ? "true" : undefined
                        }
                        onClick={(event) => handleClick(event, teacher.id)}
                      >
                        {teacher.hoTen}
                      </Button>
                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEls[teacher.id]}
                        open={Boolean(anchorEls[teacher.id])}
                        onClose={() => handleClose(teacher.id)}
                        TransitionComponent={Fade}
                      >
                        <Link to={`/teacher-detail/${teacher.id}`}>
                          <MenuItem onClick={() => handleClose(teacher.id)}>
                            <VisibilityIcon className="mr-2" size="20px" />
                            Xem hồ sơ
                          </MenuItem>
                          <Divider />
                        </Link>

                        <Link to={`/teacher-edit/${teacher.id}`}>
                          <MenuItem onClick={() => handleClose(teacher.id)}>
                            <BorderColorIcon className="mr-2" />
                            Sửa hồ sơ
                          </MenuItem>
                          <Divider />
                        </Link>
                      </Menu>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {teacher.ngaySinh
                        ? new Date(teacher.ngaySinh).toLocaleDateString(
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
                      {teacher.gioiTinh ? "Nam" : "Nữ"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {teacher.cccd}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {teacher.thuongTru.slice(0, 30)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {teacher.trinhDo}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {teacher.sdt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="11"
                    className="px-6 py-4 whitespace-nowrap text-center text-sm"
                  >
                    Không có giáo viên nào được tìm thấy.
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

export default TeacherManager;

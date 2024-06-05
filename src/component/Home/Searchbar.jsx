import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

const Searchbar = () => {
  const [showSearchInfo, setShowSearchInfo] = useState(true);
  const [ethnic, setEthnic] = useState([]);
  const [searchParams, setSearchParams] = useState({
    khoi: "",
    gioitinh: "",
    hoten: "",
    dantoc: "",
    lop: "",
    mahs: "",
    trangThai: "",
  });
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setSearchParams({ ...searchParams, [name]: value });
  };
  useEffect(() => {
    function fetchAPIethnic() {
      fetch("https://api.nosomovo.xyz/ethnic/getalllist")
        .then((res) => res.json())
        .then((data) => {
          setEthnic(data);
        });
    }
    fetchAPIethnic();
  }, []);
  //   const handleSearch = () => {
  //     setFilteredStudents(
  //       students.filter((student) => {
  //         return (
  //           (searchParams.khoi === "" || student.khoi === searchParams.khoi) &&
  //           (searchParams.gioitinh === "" ||
  //             student.gioitinh.toString() === searchParams.gioitinh) &&
  //           (searchParams.hoten === "" ||
  //             student.hoten
  //               .toLowerCase()
  //               .includes(searchParams.hoten.toLowerCase())) &&
  //           (searchParams.dantoc === "" ||
  //             student.dantoc === searchParams.dantoc) &&
  //           (searchParams.lop === "" || student.tenlop === searchParams.lop) &&
  //           (searchParams.mahs === "" || student.mahs === searchParams.mahs) &&
  //           (searchParams.trangThai === "" ||
  //             student.trangThai.toString() === searchParams.trangThai)
  //         );
  //       })
  //     );
  //   };
  const toggleSearchInfo = () => {
    setShowSearchInfo(!showSearchInfo);
  };
  return (
    <div>
      <div className=" text-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-white bg-teal-800 p-2 mb-3 rounded-sm">
          Thông tin tìm kiếm
        </h1>
        {showSearchInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextField
              size="small"
              type="text"
              id="outlined-basic"
              name="hoten"
              label="Họ tên"
              value={searchParams.hoten}
              onChange={handleSearchChange}
              variant="outlined"
            />
            <TextField
              size="small"
              type="text"
              id="outlined-basic"
              name="mahs"
              label="Mã học sinh"
              value={searchParams.mahs}
              onChange={handleSearchChange}
              variant="outlined"
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchParams.gioitinh}
                  label="Trạng thái"
                  name="gioitinh"
                  onChange={handleSearchChange}
                >
                  <MenuItem value="">Giới tính</MenuItem>
                  <MenuItem value="true">Nam</MenuItem>
                  <MenuItem value="false">Nữ</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Dân tộc</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchParams.dantoc}
                  label="Dân tộc"
                  name="dantoc"
                  onChange={handleSearchChange}
                >
                  {ethnic.map((item, index) => {
                    return (
                      <MenuItem value={item.id} key={index}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Lớp</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchParams.lop}
                  label="lop"
                  name="lop"
                  onChange={handleSearchChange}
                >
                  <MenuItem value="">Lớp</MenuItem>
                  <MenuItem value="Lớp 1">Lớp 1</MenuItem>
                  <MenuItem value="Lớp 2">Lớp 2</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Trạng thái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchParams.trangThai}
                  label="Trạng thái"
                  name="trangThai"
                  onChange={handleSearchChange}
                >
                  <MenuItem value="">Trạng thái</MenuItem>
                  <MenuItem value="true">Đang Học</MenuItem>
                  <MenuItem value="false">Không Học</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <button
            //   onClick={handleSearch}
            className="btn m-2 bg-teal-900 text-white hover:bg-teal-700 text-center"
          >
            Tìm kiếm
          </button>
          <button
            onClick={toggleSearchInfo}
            className="btn m-2 bg-teal-900 text-white hover:bg-teal-700 text-center"
          >
            {showSearchInfo ? "Thu gọn" : "Hiển thị"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;

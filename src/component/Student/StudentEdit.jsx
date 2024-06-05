import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LINK_API } from "../../globalAPI/linkAPI";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";

const StudentEdit = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [newImage, setNewImage] = useState(null);
  const PF = `${LINK_API}hocsinh/${id}/image`;

  useEffect(() => {
    function getStudentById() {
      axios
        .get(`${LINK_API}hocsinh/${id}`)
        .then((res) => {
          setStudent(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getStudentById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === "gioiTinh" || name === "trangThai") {
      parsedValue = value === "true";
    }
    setStudent((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateStudentData = async () => {
      try {
        if (newImage) {
          const formData = new FormData();
          formData.append("image", newImage);
          await axios.put(`${LINK_API}hocsinh/${id}/edit-image`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
        await axios.put(`${LINK_API}hocsinh/${id}`, student);
      } catch (err) {
        console.error("Error updating student data:", err);
      }
    };
    updateStudentData();
  };

  return (
    <div className="bg-white w-full min-h-screen text-black">
      <h1>Thông tin chung</h1>
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto py-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 min-h-screen bg-white gap-4">
          <div>
            <img
              className="w-64 h-64 object-cover"
              src={newImage ? URL.createObjectURL(newImage) : PF}
              alt=""
            />
            <input type="file" onChange={handleImageChange} />
          </div>
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-10">
              <div>
                <TextField
                  size="small"
                  label="Họ và tên"
                  name="hoTen"
                  value={student.hoTen || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  size="small"
                  label="Lớp"
                  name="lop"
                  value={student.lop || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel>Giới tính</InputLabel>
                  <Select
                    name="gioiTinh"
                    label="Giới tính"
                    value={student.gioiTinh ? "true" : "false"}
                    onChange={handleChange}
                  >
                    <MenuItem value="true">Nam</MenuItem>
                    <MenuItem value="false">Nữ</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  label="Mã học sinh"
                  name="maHs"
                  value={student.maHs || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel>Trạng thái</InputLabel>
                  <Select
                    name="trangThai"
                    label="Trạng thái"
                    value={student.trangThai ? "true" : "false"}
                    onChange={handleChange}
                  >
                    <MenuItem value="true">Đang học</MenuItem>
                    <MenuItem value="false">Không học</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  label="Mã định danh"
                  name="maDinhDanh"
                  value={student.maDinhDanh || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  size="small"
                  label="Ngày sinh"
                  type="date"
                  name="ngaySinh"
                  value={
                    student.ngaySinh
                      ? new Date(student.ngaySinh).toISOString().substr(0, 10)
                      : ""
                  }
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  size="small"
                  label="Ngày vào trường"
                  type="date"
                  name="nhapHoc"
                  value={
                    student.nhapHoc
                      ? new Date(student.nhapHoc).toISOString().substr(0, 10)
                      : ""
                  }
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Tôn giáo"
                  size="small"
                  name="tonGiao"
                  value={student.tonGiao || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Dân tộc"
                  name="danToc"
                  value={student.danToc || ""}
                  size="small"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Nơi sinh"
                  name="noiSinh"
                  value={student.noiSinh || ""}
                  size="small"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Thành Phố/Tỉnh"
                  name="tinh"
                  size="small"
                  value={student.tinh || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Quận/Huyện"
                  name="huyen"
                  size="small"
                  value={student.huyen || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phường/Xã"
                  name="xa"
                  size="small"
                  value={student.xa || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Địa chỉ thường trú"
                  name="thuongTru"
                  value={student.thuongTru || ""}
                  size="small"
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Địa chỉ tạm trú"
                  name="tamTru"
                  size="small"
                  value={student.tamTru || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <div className="flex justify-end">
                  <Button type="submit" variant="contained" color="primary">
                    Lưu thay đổi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentEdit;

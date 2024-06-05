import axios from "axios";
import React, { useState } from "react";
import { LINK_API } from "../../globalAPI/linkAPI";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState("");
  const PF = `${LINK_API}hocsinh/${id}/image`;
  useEffect(() => {
    function getStudentById() {
      axios
        .get(`${LINK_API}hocsinh/${id}`)
        .then((res) => {
          setStudent(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getStudentById();
  }, [id]);
  return (
    <div className="bg-white w-full min-h-screen text-black">
      <h1>Hồ Sơ Học Sinh</h1>
      <div className="container mx-auto py-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 min-h-screen bg-white gap-4">
        <div>
          {student.hinhAnh ? (
            <img src={PF} className="w-64 h-64 rounded-full" alt="student" />
          ) : (
            <img
              src="https://cdn-icons-png.freepik.com/512/266/266033.png"
              className="lg:w-64 lg:h-64 rounded-full md:w-32 md:h-32"
              alt="student"
            />
          )}
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-10">
            <div>
              <div className="mb-4 ">Họ và tên: {student.hoTen}</div>
              <div className="mb-4">Lớp: {student.lop}</div>
              <div className="mb-4">
                Giới tính: {student.gioiTinh ? "Nam" : "Nữ"}
              </div>
              <div className="mb-4">Mã học sinh: {student.maHs}</div>
              <div className="mb-4">Mã định danh: {student.maDinhDanh}</div>
              <div className="mb-4 ">
                Trạng thái: {student.trangThai ? "Đang học" : "Không Học"}
              </div>
              <div className="mb-4">
                Ngày sinh:{" "}
                {student.ngaySinh
                  ? new Date(student.ngaySinh).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </div>

              <div className="mb-4">
                Ngày vào trường:{" "}
                {student.nhapHoc
                  ? new Date(student.nhapHoc).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </div>
              <div className="mb-4">Nơi sinh: {student.noiSinh}</div>
            </div>

            <div>
              <div className="mb-4">Tôn Giáo: {student.tonGiao}</div>
              <div className="mb-4">Dân Tộc: {student.danToc}</div>
              <div className="mb-4">Thành Phố/Tỉnh: {student.tinh}</div>
              <div className="mb-4">Quận/Huyện: {student.huyen}</div>
              <div className="mb-4">Phường/Xã: {student.xa}</div>
              <div className="mb-4">
                Địa chỉ thường trú: {student.thuongTru}
              </div>
              <div className="mb-4">Địa chỉ tạm trú: {student.tamTru}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;

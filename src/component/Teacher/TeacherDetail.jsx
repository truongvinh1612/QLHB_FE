import axios from "axios";
import React, { useState } from "react";
import { LINK_API } from "../../globalAPI/linkAPI";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState("");
  const PF = `${LINK_API}giaovien/${id}/image`;
  useEffect(() => {
    function getTeacherById() {
      axios
        .get(`${LINK_API}giaovien/${id}`)
        .then((res) => {
          setTeacher(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTeacherById();
  }, [id]);
  return (
    <div className="bg-white w-full min-h-screen text-black">
      <h1>Hồ Sơ Giáo Viên</h1>
      <div className="container mx-auto py-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 min-h-screen bg-white gap-4">
        <div>
          {teacher.hinhAnh ? (
            <img src={PF} className="w-64 h-64 rounded-full" alt="teacher" />
          ) : (
            <img
              src="https://cdn-icons-png.freepik.com/512/266/266033.png"
              className="lg:w-64 lg:h-64 rounded-full md:w-32 md:h-32"
              alt="teacher"
            />
          )}
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-10">
            <div>
              <div className="mb-4 ">Họ và tên: {teacher.hoTen}</div>
              <div className="mb-4">
                Giới tính: {teacher.gioiTinh ? "Nam" : "Nữ"}
              </div>
              <div className="mb-4">Mã Giáo Viên: {teacher.maGv}</div>
              <div className="mb-4">Căn Cước Công Dân: {teacher.cccd}</div>
              <div className="mb-4">
                Ngày sinh:{" "}
                {teacher.ngaySinh
                  ? new Date(teacher.ngaySinh).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "N/A"}
              </div>
              <div className="mb-4">Số Điện Thoại: {teacher.sdt}</div>
              <div className="mb-4">Email: {teacher.email}</div>
              <div className="mb-4">Trình Độ: {teacher.trinhDo}</div>
              <div className="mb-4">Chứng Chỉ Tin Học: {teacher.chungChiTh}</div>
              <div className="mb-4">Chứng Chỉ Ngoại Ngữ: {teacher.chungChiNn}</div>
              
            </div>

            <div>
            
              <div className="mb-4">Tôn Giáo: {teacher.tonGiao}</div>
              <div className="mb-4">Dân Tộc: {teacher.danToc}</div>
              <div className="mb-4">Nơi sinh: {teacher.noiSinh}</div>
              <div className="mb-4">Thành Phố/Tỉnh: {teacher.tinh}</div>
              <div className="mb-4">Quận/Huyện: {teacher.huyen}</div>
              <div className="mb-4">Phường/Xã: {teacher.xa}</div>
              <div className="mb-4">
                Địa chỉ thường trú: {teacher.thuongTru}
              </div>
              <div className="mb-4">Địa chỉ tạm trú: {teacher.tamTru}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;

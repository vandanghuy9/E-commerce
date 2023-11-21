import { Radio } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";
import { TextField } from "@mui/material";

const Profile = () => {
  return (
    <div className="flex justify-center gap-10">
      <div className="flex flex-col p-5 justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex gap-4">
            <FaUserCircle className="w-[30px] h-[30px]" />
            <span className="font-bold">User001</span>
          </div>
          <div className="px-10 text-white cursor-pointer py-3 bg-[#f02d34] rounded-3xl text-center">
            My profile
          </div>
          <div className="px-10 cursor-pointer py-3 border rounded-3xl text-center">
            Order history
          </div>
        </div>
        <div className="self-end border border-gray-400 px-5 py-2 rounded bg-gray-200 cursor-pointer">
          Log out
        </div>
      </div>
      <div className="p-10 border border-gray-400 rounded-xl gap-7 flex flex-col">
        <div className="font-bold">My profile</div>
        <div className="flex gap-20">
          <div className="gap-5 flex flex-col min-w-[250px]">
            <div className="flex flex-row gap-7">
              <div className="flex-1 text-right">Username</div>
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="User001"
              />
            </div>
            <div className="flex flex-row gap-7">
              <span className="flex-1 text-right">Email</span>
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="user@gmail.com"
              />
            </div>
            <div className="flex flex-row gap-7">
              <span className="flex-1 text-right">Phone</span>
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="******999"
              />
            </div>
            <div className="flex justify-center items-center gap-3">
              <Radio />
              <span>Male</span>
              <Radio />
              <span>Female</span>
            </div>
          </div>
          <div className="flex justify-center flex-col items-center gap-5">
            <FaUserCircle className="w-[70px] h-[70px]" />
            <div className="border py-2 px-4 rounded border-gray-300 shadow-md cursor-pointer">
              Choose picture
            </div>
          </div>
        </div>
        <div className="flex gap-7 items-center">
          <span>DOB</span>
          <span className="border border-gray-300 px-4 py-2 rounded">
            31/02/2023
          </span>
          <IoCalendar className="w-[25px] h-[25px] cursor-pointer" />
        </div>
        <div className="self-end px-10 cursor-pointer py-3 bg-[#f02d34] rounded-3xl text-white">
          Save
        </div>
      </div>
    </div>
  );
};

export default Profile;

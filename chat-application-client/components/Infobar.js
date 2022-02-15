import { useRouter } from "next/router";

const Infobar = (props) => {
  const { roomName } = props;
  const router = useRouter();
  return (
    <div className="w-full flex items-center justify-between">
      <div className=""></div>
      <div className="text-xl text-gray-500">
        Current Room:{" "}
        <span className="text-green-600 font-semibold">{roomName}</span>
      </div>
      <div
        className="text-gray-500 cursor-pointer"
        onClick={() => router.back()}
      >
        Close
      </div>
    </div>
  );
};

export default Infobar;

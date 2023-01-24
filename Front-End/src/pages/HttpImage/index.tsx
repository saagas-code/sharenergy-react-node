import { useParams } from "react-router-dom";

export const HttpImage = () => {
  const {code} = useParams()

  return (
    <div className="w-full h-[100vh] bg-black flex justify-center items-center">
      <img src={`https://http.cat/${code}`} alt="" />
    </div>
  );
};

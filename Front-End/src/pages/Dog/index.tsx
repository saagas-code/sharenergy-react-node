import { Layout } from "../layout";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getRandomDog } from "./../../services/api/RandomDog";
import { Loading } from "../../components/Loading";

export const Dog = () => {
  const [dog, setDog] = useState("");

  const {refetch, isFetching} = useQuery(["randomDog"], () =>
    getRandomDog(), {
      onSuccess: (data) => {
        setDog(data.url)
      }
    }
  );

  return (
    <Layout>
      <div className="flex flex-col mt-10">
        <div className="w-full flex justify-center mb-5">
          <button onClick={() => refetch()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Atualizar
          </button>
        </div>
        {dog && !isFetching && (
          <div className="w-full flex justify-center">
            <img src={dog} className="self-center max-w-[500px] max-h-[500px]" alt="dog image" />
          </div>
        )}

        {isFetching &&
          <div className="w-full  h-[500px] flex justify-center mt-28 text-2xl">
            <Loading />
          </div>
        }
      </div>
    </Layout>
  );
};

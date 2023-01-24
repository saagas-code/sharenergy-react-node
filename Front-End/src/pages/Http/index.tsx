import { Layout } from "../layout";
import { statusCodes } from "./codeList";
import { Link, useNavigate } from "react-router-dom";
import { InputSearch } from "../../components/FormItems/inputSearch";
import { useForm, FieldValues } from 'react-hook-form';

export const Http = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const submitForm = ({search}: FieldValues) => {
    navigate(`/https/${search}`)
  };

  return (
    <Layout>
      <div className="mt-10 max-w-[1200px] mx-auto">
        <form onSubmit={handleSubmit(submitForm)}>
          <InputSearch
            register={register}
            name="search"
            placeholder={"Pesquisar código http"}
          />
        </form>
        <div className="flex flex-row flex-wrap gap-4 mx-auto">
          {statusCodes.map((i, k) => (
            
              <div key={k} className="flex-1">
                <div className="font-bold text-4xl mt-4 truncate">
                  {i.title} {i.info}
                </div>
                <div className="flex flex-col flex-wrap text-lg ">
                  {i.codes.map((i, k) => (
                    <div key={k} className="mt-1 max-w-[250px] flex items-center cursor-pointer">
                      <div className="rounded bg-black w-2 h-2 mr-3"></div>
                      <Link
                        to={`/https/${i.code}`}
                        className="border-b-2 border-[#d2dcee] hover:border-[#5971F8] truncate"
                      >
                        {i.code} {i.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            
          ))}
        </div>
      </div>
    </Layout>
  );
};

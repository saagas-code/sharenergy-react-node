import { Layout } from "../layout";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getClients } from "./../../services/api/Clients";
import TableClients from "./../../components/Tables/Clients";
import { InputSearch } from "../../components/FormItems/inputSearch";
import { FieldValues, useForm } from "react-hook-form";
import { Loading } from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { useNavigate } from 'react-router-dom';
import { useUsers } from './../../hooks/useUsers';


const limitPerPage = 5;

export const Clients = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const {fetchUsers, deleteAction} = useUsers()

  const { data, isLoading } = useQuery<getClients>(["clients", search, currentPage],
    () => fetchUsers(currentPage, limitPerPage, search)
  );

  useEffect(() => {
    setCurrentPage(1)
  }, [search])


  const { register, handleSubmit } = useForm();

  const submitForm = ({ search }: FieldValues) => {
    setSearch(search);
  };

  const handleAdd = () => {
    navigate(`/users/add`)
  }

  const handleEdit = (id: string) => {
    navigate(`/users/${id}`)
  }

  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto mt-10">
        <div className="flex gap-5">
          <form onSubmit={handleSubmit(submitForm)} className="mb-2 flex-1" action="">
            <InputSearch
              name="search"
              register={register}
              placeholder="Procure por um cliente"
            />
          </form>
          <div className="flex items-center">
            <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mb-2 rounded">
              Adicionar
            </button>
          </div>
        </div>
        {!isLoading && data && (
          <>
            <TableClients
              list={data.clients}
              handleDelete={deleteAction}
              handleEdit={handleEdit}
            />
            <Pagination 
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalCountOfRegisters={data.total} 
              registersPerPage={limitPerPage} 
            />
          </>
        )}

        {isLoading &&
          <div className="mt-10 text-2xl">
            <Loading />
          </div>
        }


      </div>
    </Layout>
  );
};

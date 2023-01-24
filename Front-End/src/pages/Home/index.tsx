import { Layout } from "../layout";
import { useQuery } from "react-query";
import {
  getRandomUsers,
  RandomUsersAPI,
} from "../../services/api/RandomUsers";
import { useEffect, useState } from "react";
import TableRandomUsers from "../../components/Tables/randomUsers";
import { InputSearch } from "../../components/FormItems/inputSearch";
import { Loading } from "../../components/Loading/index";
import Pagination from "../../components/Pagination";
import { RandomUsers } from "../../interfaces/RandomUsers";
import { FilterRandomUsers } from "../../helpers/FilterRandomUsers";
import { useForm, FieldValues } from 'react-hook-form';
import dotenv from "dotenv"


const limit = 200;
const resultsPerPage = 8;

export const Home = () => {
  const [users, setUsers] = useState<RandomUsers[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<RandomUsers[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { isLoading, data } = useQuery<RandomUsersAPI>(["randomUsers"], () =>
    getRandomUsers(limit)
  );

  useEffect(() => { 
    if (!isLoading && data) { 
      const usersSliced = data.results.slice(0, resultsPerPage); 
      setUsers(data.results); 
      setTotal(data.results.length); 
      setFilteredUsers(usersSliced) 
    } 
  }, [data]); 

  useEffect(() => {

    const usersFiltered = FilterRandomUsers({ users, search }); 
    const usersSliced = usersFiltered.slice(((currentPage - 1) * resultsPerPage), resultsPerPage * currentPage)

    setFilteredUsers(usersSliced);
    setTotal(usersFiltered.length);

  }, [search, currentPage]); 

  useEffect(() => {
    setCurrentPage(1);
  }, [search]); 

  const {register, handleSubmit} = useForm()

  const submitForm = ({search}: FieldValues) => {
    setSearch(search)
  }

  return (
    <Layout>
      <div className="mt-10 max-w-[1200px] mx-auto">
        <form onSubmit={handleSubmit(submitForm)} className="mb-2">
          <InputSearch
            register={register}
            name="search"
            placeholder={"Procure por usuário"}
          />
        </form>

        {!isLoading ? (
          <TableRandomUsers
            list={filteredUsers}
            handleDelete={() => null}
            handleEdit={() => null}
          />
        ) : (
          <Loading />
        )}

        <Pagination
          totalCountOfRegisters={total}
          registersPerPage={resultsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </Layout>
  );
};

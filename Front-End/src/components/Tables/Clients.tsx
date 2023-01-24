
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { Client } from "../../interfaces/Client";
import { RandomUsers } from "../../interfaces/RandomUsers";
import { toPhone } from './../../helpers/Formats/toPhone';
import { toCpf } from './../../helpers/Formats/toCpf';


interface Props {
  list: Client[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export default function TableClients({
  list,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#f9fafb]">
      
      <table className="w-full text-lg text-left text-gray-500  ">
        <thead className="text-xs text-gray-700 uppercase   ">
          <tr className="bg-gray-200">
            <th scope="col" className="p-4 ">
              <div className="flex items-center ">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 ">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-2 self-center text-center">
              Cpf
            </th>
            <th scope="col" className="px-6 py-2 self-center text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((i, k) => (
            <tr
              key={k}
              className="bg-white border-b  hover:bg-gray-50  self-center items-center justify-center align-middle center"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2  "
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {i.name}
              </td>
              <td className="px-6 py-4 truncate max-w-[250px]">{i.email}</td>
              <td className="px-6 py-4 truncate">{i.address}</td>
              <td className="px-6 py-4 truncate">{toPhone(i.phone)}</td>
              <td className="px-6 py-4 truncate">{toCpf(i.cpf)}</td>
              <td className=" px-6 py-4  text-center truncate">
                <button
                  onClick={() => handleEdit(i._id)}
                  className="mr-2 rounded bg-gray-50 hover:bg-gray-200 text-blue-500"
                >
                  <MdModeEditOutline />
                </button>
                <button
                  onClick={() => handleDelete(i._id)}
                  className="rounded bg-gray-50 hover:bg-gray-200 text-red-500"
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    
  );
}

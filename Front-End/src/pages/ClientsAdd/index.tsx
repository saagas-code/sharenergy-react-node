import { Input } from "../../components/FormItems/input";
import { Layout } from "../layout";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { AddClientSchema } from './SchemaClientAdd';
import { useAddClient } from './../../hooks/useAddClient';

export const ClientsAdd = () => {
  const {authErrors, setClientData, count, setCount} = useAddClient()


  const { register, handleSubmit, formState: {errors}, reset, control  } = useForm({
    reValidateMode: "onSubmit",
    resolver: yupResolver(AddClientSchema)
  });
  
  const submitForm = (data: FieldValues) => {
    setClientData(data)
    setCount(count + 1)
  };

  return (
    <Layout>
      <div className="w-full mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 ">
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-wrap gap-4">
            <Input
              name="name"
              placeholder="Matthew Oliver"
              register={register}
              label="Nome Completo"
              error={errors?.name?.message as string}
            />
            <Input
              name="email"
              placeholder="example@gmail.com"
              register={register}
              label="Email"
              error={errors?.email?.message as string}
              authError={authErrors.email}
            />
            <Input
              name="address"
              placeholder="Rua alberto, 158, RJ"
              register={register}
              label="Endereço"
              error={errors?.address?.message as string}
            />
            <Input
              name="phone"
              placeholder="(21) 98819-8728"
              register={register}
              label="Phone"
              small
              mask="(99) 99999-9999"
              control={control}
              error={errors?.cpf?.message as string}
              authError={authErrors.cpf}
            />
            <Input
              name="cpf"
              placeholder="123.456.789-12"
              register={register}
              label="Cpf"
              small
              mask="999.999.999-99"
              control={control}
              error={errors?.cpf?.message as string}
              authError={authErrors.cpf}
            />

            <div className="flex w-full gap-4 justify-end">
              <button onClick={() => reset()}  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Limpar
              </button>
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

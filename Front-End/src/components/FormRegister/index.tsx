import { useForm, FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { SchemaRegister } from "./SchemaRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../FormItems/input";
import { useRegister } from "../../hooks/useRegister";

export const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SchemaRegister),
  });

  const { setRegisterData, authErrors, setCount, count } = useRegister();

  const SubmitForm = (data: FieldValues) => {
    setRegisterData(data);
    setCount(count + 1);
  };

  return (
    <div className=" dark:bg-gray-900">
      <div className="flex flex-col items-center px-4 py-8">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-[400px]" src="/assets/logoShare.png" alt="logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registro
            </h1>
            <form
              onSubmit={handleSubmit(SubmitForm)}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div className="flex flex-wrap gap-4">
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  placeholder="matthew"
                  error={errors?.username?.message as string}
                  authError={authErrors.username}
                  register={register}
                />
                <Input
                  type="text"
                  name="fullname"
                  label="Fullname"
                  placeholder="Matthew Oliver"
                  error={errors?.fullname?.message as string}
                  register={register}
                />
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="name@company.com"
                  error={errors?.email?.message as string}
                  authError={authErrors.email}
                  register={register}
                />
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  error={errors?.password?.message as string}
                  register={register}
                />
                <Input
                  type="password"
                  name="passwordConfirm"
                  label="Confirm Password"
                  placeholder="••••••••"
                  error={errors?.passwordConfirm?.message as string}
                  register={register}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Registrar-se
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Já tem uma conta ?{" "}
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Logar-se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

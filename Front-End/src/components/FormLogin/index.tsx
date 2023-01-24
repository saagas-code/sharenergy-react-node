import { Link } from "react-router-dom";
import { Checkbox } from "../FormItems/checkbox";
import { Input } from "../FormItems/input"
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { useLogin } from '../../hooks/useLogin';
import { getLocal } from '../../helpers/saveLocalStorage';
import { decryptData } from "../../helpers/crypt";


export const FormLogin = () => {
  const email: string | null = getLocal("email");
  const password: string | null = getLocal("password");

  const {register, handleSubmit, reset} = useForm()
  const {setLoginData, authError} = useLogin()

  const SubmitForm = (loginData: FieldValues) => {
    setLoginData(loginData)
  }

  useEffect(() => {
    if (email !== null) {
      const defaultValues = {
        email: decryptData(email),
        password: decryptData(password!),
        remember: true
      }
      reset({...defaultValues})
    }
  }, [reset])
  

  return (
    <div className=" dark:bg-gray-900 ">
      <div className="flex flex-col items-center px-4 py-8 mt-24">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-[400px]"
            src="/assets/logoShare.png"
            alt="logo"
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form onSubmit={handleSubmit(SubmitForm)} className="space-y-4 md:space-y-6" action="#">
              <div className="flex flex-wrap gap-4">
                <Input 
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="name@company.com"
                  register={register}
                />
                <Input 
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  register={register}
                />
              </div>
              <div className="w-full text-center text-red-500">
                <p>{authError}</p>
              </div>
              <div className="flex items-center justify-between">
                <Checkbox 
                  label="Lembrar me"
                  name="remember"
                  register={register}
                />
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Esqueceu sua senha ?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Logar-se
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Não tem uma conta ainda ?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Registre-se
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

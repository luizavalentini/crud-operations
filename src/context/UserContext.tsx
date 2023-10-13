import { api } from "../utils/api";
import { createContext, useState } from "react";
import { IChildren, INewUser } from "../utils/interface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toast";
import nProgress from "nprogress";

export const UserContext = createContext({} as any);

export const UserProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<INewUser[]>([]);

  const createNewUser = async (user: INewUser) => {
    try {
      nProgress.start();
      await api.post("", user);
      toast.success("Usuário criado com sucesso!", toastConfig);
      navigate("/");
    } catch (error) {
      toast.error("Houve algum error, tente novamente!", toastConfig);
      console.log(error);
    }
    nProgress.done();
  };

  const editUser = async (user: INewUser) => {
    try {
      nProgress.start();
      await api.put(`/${user.cpf}`, user);
      toast.success("Usuário editado com sucesso!", toastConfig);
      navigate("/");
    } catch (error) {
      toast.error("Houve algum error, tente novamente!", toastConfig);
      console.log(error);
    }
    nProgress.done();
  };

  const getUsersWithFilters = async (cpfFilter?: string) => {
    console.log(cpfFilter);
    const response = await api.get(`/${cpfFilter ? cpfFilter : ""}`);
    console.log(response.data);
    setUsers([response.data]);
  };

  return (
    <UserContext.Provider value={{ createNewUser, editUser, getUsersWithFilters, users, setUsers}}>
      {children}
    </UserContext.Provider>
  );
};

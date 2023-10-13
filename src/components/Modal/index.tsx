import React, { useContext } from "react";
import { Wrapper } from "./Modal.styled";
import Logo2 from "../../assets/Logo-2.svg";
import editaUsuario from "../../assets/edita-usuario.svg"
import { useForm } from "react-hook-form";
import { INewUser } from "../../utils/interface";
import { UserContext } from "../../context/UserContext";

export const Modal = (props: { user?:INewUser, setModalVisible : (value: boolean) => void}) => {
  const {setModalVisible, user} = props;


  const { register, handleSubmit } = useForm<INewUser>({defaultValues:user})
  const { createNewUser, editUser } = useContext(UserContext);

  const addNewUser = (data: INewUser) => {
    createNewUser(data);
    setModalVisible(false);
  };

  const handleEditUser = (data: INewUser) => {
    editUser(data);
    setModalVisible(false);
  }
  return (
    <Wrapper>
      <div>
        <img src={user? editaUsuario : Logo2}></img>
        <form onSubmit={user? handleSubmit(handleEditUser) : handleSubmit(addNewUser)}>
          <label htmlFor="nome">Nome Completo:</label>
          <input
            required
            id="nome"
            {...register("nome")}
            type="text"
            placeholder="Insira seu nome"
          />

          <label htmlFor="cpf">CPF:</label>
          <input
            required
            id="cpf"
            {...register("cpf")}
            type="text"
            placeholder="Insira seu CPF"
          ></input>
          <label htmlFor="rg">RG:</label>
          <input
            required
            id="rg"
            {...register("rg")}
            type="text"
            placeholder="Insira seu RG"
          ></input>

          <label htmlFor="cnh">CNH:</label>
          <input
            required
            id="cnh"
            {...register("cnh")}
            type="text"
            placeholder="Insira sua CNH"
          ></input>

          <label htmlFor="nomeMae">Nome da mãe:</label>
          <input
            required
            id="nomeMae"
            {...register("nomeMae")}
            type="text"
            placeholder="Insira o nome da sua mãe"
          ></input>

          <label htmlFor="nomePai">Nome da pai:</label>
          <input
            required
            id="nomePai"
            {...register("nomePai")}
            type="text"
            placeholder="Insira o nome do seu pai"
          ></input>

          <label htmlFor="tituloEleitor">Título de eleitor:</label>
          <input
            required
            id="tituloEleitor"
            {...register("tituloEleitor")}
            type="text"
            placeholder="Insira o seu titulo de eleitor"
          ></input>

          <label htmlFor="sexo">Sexo:</label>
          <select id="sexo" {...register("sexo")}>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
          <button type="submit" >{user? "Editar usuário" : "Adicionar usuário"}</button>
        </form>
      </div>
    </Wrapper>
  );
};


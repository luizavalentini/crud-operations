import { Container, Usuarios, Wrapper, UsuariosAdd } from "./Home.styled";
import Logo from "../../assets/Logo.svg";
import { MagnifyingGlass, Pen, Trash } from "phosphor-react";
import { Modal } from "../../components/Modal";
import { useContext, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { INewUser } from "../../utils/interface";
import { UserContext } from "../../context/UserContext";

export const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cpfFilter, setcpfFilter] = useState<string>();
  const [currentUser, setCurrentUser] = useState<INewUser>();

  const { getUsersWithFilters, users, setUsers } = useContext(UserContext);

  const getUsers = async () => {
    const response = await api.get("");
    setUsers(response.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const filterCpf = () => {
    getUsersWithFilters(cpfFilter);
  };

  const deleteUser = (cpf: string) => {
    api.delete(`/${cpf}`);
    getUsers();
  };

  const setModalVisible = (value: boolean) => {
    setIsModalVisible(value);
  };

  const createUser = () => {
    setCurrentUser(undefined);
    setIsModalVisible(true);
  };

  const editUser = (user: INewUser) => {
    setIsModalVisible(true);
    setCurrentUser(user);
  };

  return (
    <Container>
      <img src={Logo}></img>
      <Wrapper>
        <div className="inputEIcon">
          <input
            onChange={(e) => setcpfFilter(e.target.value)}
            placeholder="Insira o CPF"
          ></input>
          <button onClick={filterCpf}>
            <MagnifyingGlass size={32} color="#919191" weight="bold" />
          </button>
        </div>
        <button className="button-add" onClick={createUser}>
          Adicionar usuários{" "}
        </button>
        {isModalVisible ? (
          <Modal {...{ setModalVisible, user: currentUser }} />
        ) : null}
      </Wrapper>
      <Usuarios>
        <div>
          <p>Nome</p>
          <p>CPF</p>
          <p>RG</p>
          <p>CNH</p>
          <p>Nome da Mãe</p>
          <p>Nome do Pai</p>
          <p>Título</p>
          <p>Sexo</p>
          <p>Ações</p>
        </div>
      </Usuarios>
      {users &&
        users.map((user: INewUser) => (
          <UsuariosAdd>
            <div className="usuarios-adicionados">
              <p className="nome">{user.nome}</p>

              <p className="cpf">{user.cpf}</p>

              <p className="rg">{user.rg}</p>

              <p className="cnh">{user.cnh}</p>

              <p className="nomeMae">{user.nomeMae}</p>

              <p>{user.nomePai}</p>

              <p>{user.tituloEleitor}</p>

              <p className="sexo">{user.sexo}</p>

              <div className="button-exlui-edita">
                <button onClick={() => editUser(user)}>
                  <Pen size={20} weight="bold" />
                </button>
                <button onClick={() => deleteUser(user.cpf)}>
                  <Trash size={20} weight="bold" />
                </button>
              </div>
            </div>
          </UsuariosAdd>
        ))}
    </Container>
  );
};

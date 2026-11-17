import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../components/Background";
import Botao from "../components/Botao";
import Conteudo from "../components/Conteudo";
import PacienteForm from "../components/forms/PacienteForm";
import Title from "../components/Title";

function CadastrarPaciente() {
  const navigate = useNavigate();

  async function handleCadastro(values) {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.post(
        "http://localhost:3000/paciente/create",
        values,
        {
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      );
      navigate(`/pacientes/detalhes/?id=${response.data.id}/`);
    } catch (err) {
      console.log(err)
      navigate("/login/")    
    }
  }

  return (
    <Background className="h-fit">
      <div className="fixed bg-olive-300 p-4 rounded-md left-0 top-0 m-2 flex flex-col gap-2">
        <Botao type="button" onClick={() => navigate("/pacientes")}>
          Página Inicial
        </Botao>
      </div>
      <Conteudo>
        <Title>Novo Paciente</Title>
        <PacienteForm
          onSubmit={handleCadastro}
          showResetButton
        />
      </Conteudo>
    </Background>
  );
}

export default CadastrarPaciente;

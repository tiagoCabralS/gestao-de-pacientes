import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Background from "../components/Background";
import Botao from "../components/Botao";
import Conteudo from "../components/Conteudo";
import PacienteForm from "../components/forms/PacienteForm";
import Title from "../components/Title";

function CadastrarPaciente() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleCadastro(values) {
    setError("");

    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.post(
        "http://localhost:3000/paciente/create",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate(`/pacientes/detalhes/?id=${response.data.id}`);
    } catch (err) {
      const dadosErro = err.response?.data;
      setError(
        dadosErro?.errors ||
          dadosErro?.message ||
          dadosErro?.messages ||
          dadosErro?.error ||
          dadosErro?.detail ||
          dadosErro?.msg ||
          dadosErro?.mensagem ||
          dadosErro?.erro ||
          dadosErro ||
          err.message ||
          "Não foi possível cadastrar o paciente. Tente novamente.",
      );
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
          error={error}
        />
      </Conteudo>
    </Background>
  );
}

export default CadastrarPaciente;

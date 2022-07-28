import "./App.css";
import logo from "./assets/form-logo.png";
import { useForm } from "react-hook-form";
//Importação do Yup para tratamento de erros
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//Criando meu schema para validação dos dados do formulário
//utilizando o oneOF para obter a referência do campo password em seguida utilizar o yup.ref
const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter 6 dígitos")
      .required("A senha é obrigatória"),
    conformPassword: yup
      .string()
      .required("As senhas não batem")
      .oneOf([yup.ref("password")]),
  })
  .required();
//não esquecer de colocar o resolver: yupResolver(schema) dentro de useForm
function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(userData) {
    console.log(userData);
  }
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src={logo} />
      <label>
        Nome
        <input type="text" {...register("name", { required: true })} />
        <span>{errors.name?.message}</span>
      </label>
      <label>
        Email
        <input
          type="text"
          {...register("email", { required: "Emails Address is required" })}
        />
        <span>{errors.email?.message}</span>
      </label>
      <label>
        Senha
        <input type="password" {...register("password")} />
        <span>{errors.password?.message}</span>
      </label>
      <label>
        Confirmar Senha
        <input type="password" {...register("confirmPassword")} />
        <span>{errors.conformPassword?.message}</span>
      </label>

      <button type="submit">Cadastrar-se</button>
    </form>
  );
}

export default App;

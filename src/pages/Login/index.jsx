import { useState, useContext } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { View } from "react-native";
import { Link } from "@react-navigation/native";
import { AuthContext } from "../../utils/authContext";
import HeaderComponent from "../../components/Header";
import Logo from "../../components/Logo";
import TextInputComponent from "../../components/TextInput";
import ButtonComponent from "../../components/Button";
import Heading from "../../components/Heading";
import api from "../../utils/api";
import Toast from "react-native-toast-message";
import { Text } from "react-native";

const schema = yup.object().shape({
  email: yup.string().required("Informe seu email.").email("Email inválido"),
  password: yup
    .string()
    .required("Informe sua senha.")
    .min(8, "A senha deve ter pelo menos 8 dígitos."),
});

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async () => {
    try {
      const response = await api.post("/usuario/login", {
        email: email,
        senha: password,
      });

      if (response.status === 200) {
        navigation.replace("Navigation");
        await setAuth(response.data);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Houve um erro no login, tente novamente.",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Houve um erro no login, tente novamente.",
      });
    }
  };

  return (
    <View>
      <HeaderComponent />
      <View>
        <Logo />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <View style={{ height: 85 }}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={() => (
              <TextInputComponent
                title={"E-mail"}
                placeholder={"Insira seu email"}
                type={"EmailAdress"}
                onChange={setEmail}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{ color: "red" }}>{errors.email.message}</Text>
          )}
        </View>
        <View style={{ height: 85 }}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={() => (
              <TextInputComponent
                title={"Senha"}
                placeholder={"Insira sua senha"}
                type={"password"}
                secure={true}
                onChange={setPassword}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{ color: "red" }}>{errors.password.message}</Text>
          )}
        </View>
        <View style={{ marginTop: 40 }}>
          <ButtonComponent
            title={"Entrar"}
            onPress={handleSubmit(handleLogin)}
          />
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Heading children={"Já possui uma conta?"} />
            <View>
              <Link to={{ screen: "Register" }} style={{ color: "#0671E0" }}>
                Inscreva-se.
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

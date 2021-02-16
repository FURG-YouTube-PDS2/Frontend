//REACT
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CContainer,
  CCard,
  CRow,
  CCol,
  CForm,
  CSelect,
  CFormText,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CLabel,
  CInput,
  CFormGroup,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
  CCardHeader,
  CBreadcrumb,
  CCardBody,
  CBreadcrumbItem,
  CImg,
} from "@coreui/react";
//Componets
//Style
//API
import { alert } from "../../../util/alertApi";
import { getProfile, editProfile } from "../../../util/Api";
import md5 from "md5";
import MaskedInput from "react-text-mask";

const Profile = ({ token }) => {
  const [state, setState] = useState({
    fetched: false,
    user: {
      avatar: null,
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      password_new: "",
      birthdate: "",
      gender: "",
      phone: "",
    },
    teste: "",
    error: "",
    message: "",
  });
  let history = useHistory();
  const profile = (e) => {
    e.preventDefault();
    setState({ ...state, error: "", message: "Alterando..." });

    const data = new FormData();
    data.append("avatar", state.avatar);
    var password = "";

    if (
      !state.user.username ||
      !state.user.email ||
      !state.user.birthdate ||
      !state.user.gender ||
      !state.user.phone
    ) {
      setState({
        ...state,
        error: "Por favor, inserir valores em todos os campos",
        message: "",
      });
    } else if (state.user.password_confirm !== state.user.password_new) {
      setState({
        ...state,
        error: "As senhas não batem. Tente novamente!",
        message: "",
      });
    } else {
      if (state.user.password_new == "" || state.user.password_new == null) {
        password = state.user.password;
      } else {
        password = md5(state.user.password_new);
      }
      data.append("token", token);
      data.append("old_img", state.user.avatar);
      data.append("username", state.user.username);
      data.append("email", state.user.email);
      data.append("password", password);
      data.append("birthdate", state.user.birthdate);
      data.append("gender", state.user.gender);
      data.append("phone", state.user.phone);
      editProfile(data, token)
        .then(function (data) {
          console.log(data);
          var t = "t";
          if (data.status === 1) {
            setState({
              ...state,
              error: "",
              message: "Perfil atualizado!",
            });

            alert("Perfil atualizado!", "Redirecionando para o perfil", [
              {
                label: "Sim",
                onClick: () => {
                  history.push("/profile");
                },
              },
              {
                label: "Não",
                onClick: () => {
                  window.location.reload();
                },
              },
            ]);
          } else {
            setState({
              ...state,
              error: "Algo deu errado tentar novamente!",
              message: "",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setState({ ...state, error: "Dados inválidos", message: "" });
        });
    }
  };

  useEffect(() => {
    if (!state.fetched) {
      // console.log(token);
      var data = { token: token };
      getProfile(data, token).then(function (data) {
        // console.log(data.birthdate.substring(0, 10));
        setState({ ...state, user: data, fetched: true });
      });
      setState({ ...state, fetched: true });
    }
  }, []);

  return (
    <div>
      <div align="center">
        <h1>Informações pessoais</h1>
        <p style={{ color: "white" }}>
          Informações básicas, como seu nome e foto, usadas nos serviços
        </p>
      </div>

      <div align="center">
        <CRow style={{ width: "75%", color: "white" }}>
          <CCol xs="12">
            {state.message && (
              <CCard
                className="border-success"
                style={{ textAlign: "center", color: "black" }}
              >
                {state.message}
              </CCard>
            )}
            {state.error && (
              <CCard
                className="border-danger"
                style={{ textAlign: "center", color: "black" }}
              >
                {state.error}
              </CCard>
            )}
            <CCard style={{ backgroundColor: "#212121" }}>
              <CCardHeader style={{ backgroundColor: "#212121" }}>
                <h4 style={{ textAlign: "center" }}>Perfil</h4>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "23%",
                      textAlign: "center",
                      verticalAlign: "center",
                    }}
                  >
                    Foto
                  </div>
                  <div
                    style={{
                      width: "60%",
                      textAlign: "end",
                      verticalAlign: "center",
                    }}
                  >
                    <label>
                      Selecione seu Avatar
                      <img
                        style={{ width: "50px", marginLeft: "10px" }}
                        src="https://cdn.discordapp.com/attachments/300483456440336385/790994294517137418/nintube_banner_icon_light.png"
                        // src={state.user.avatar}
                        alt="avatar"
                      ></img>
                      <CInput
                        type="file"
                        onChange={(e) => {
                          setState({ ...state, avatar: e.target.files[0] });
                        }}
                      />
                    </label>
                    {/* <img
                      style={{ width: "35px", marginLeft: "7px" }}
                      src="https://cdn.discordapp.com/attachments/300483456440336385/790994294517137418/nintube_banner_icon_light.png"
                      alt="avatar"
                    ></img> */}
                  </div>
                </div>
              </CCardHeader>
              <CCardBody>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      <CLabel htmlFor="nf-username">Nome de usário</CLabel>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        marginLeft: "11%",
                        // textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      <CInput
                        type="text"
                        id="nf-username"
                        name="nf-username"
                        autoComplete="name"
                        value={state.user.username}
                        onChange={(e) => {
                          let user = { ...state.user };
                          user.username = e.target.value;
                          setState({ ...state, user });
                        }}
                      />
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      <CLabel htmlFor="nf-gender">Gênero</CLabel>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        marginLeft: "11%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      <CSelect
                        value={state.user.gender}
                        onChange={(e) => {
                          let user = { ...state.user };
                          user.gender = e.target.value;
                          setState({ ...state, user });
                        }}
                      >
                        <option value="m">Masculino</option>
                        <option value="w">Feminino</option>
                        <option value="a">Outros</option>
                      </CSelect>
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      <CLabel htmlFor="nf-birthdate">Data de Nascimento</CLabel>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        marginLeft: "11%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      <CInput
                        type="date"
                        id="nf-birthdate"
                        name="nf-birthdate"
                        autoComplete="birthdate"
                        value={state.user.birthdate.substring(0, 10)}
                        onChange={(e) => {
                          let user = { ...state.user };
                          user.birthdate = e.target.value;
                          setState({ ...state, user });
                        }}
                      />
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      <CLabel htmlFor="nf-password">Senha</CLabel>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        marginLeft: "11%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      <CInput
                        type="password"
                        id="nf-password"
                        name="nf-password"
                        placeholder="*********"
                        autoComplete="current-password"
                        onChange={(e) => {
                          let user = { ...state.user };
                          user.password_new = e.target.value;
                          setState({ ...state, user });
                        }}
                      />
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      <CLabel htmlFor="nf-password_confirm">
                        Confirme a senha
                      </CLabel>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        marginLeft: "11%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      <CInput
                        type="password"
                        id="nf-password_confirm"
                        placeholder="*********"
                        name="nf-password_confirm"
                        autoComplete="password_confirm"
                        value={state.user.password_confirm}
                        onChange={(e) => {
                          let user = { ...state.user };
                          user.password_confirm = e.target.value;
                          setState({ ...state, user });
                        }}
                      />
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <h4 style={{ textAlign: "center", width: "100%" }}>
                    Informações de contato
                  </h4>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      <CLabel htmlFor="nf-email">E-mail</CLabel>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        marginLeft: "11%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      <CInput
                        type="email"
                        id="nf-email"
                        name="nf-email"
                        autoComplete="email"
                        value={state.user.email}
                        onChange={(e) => {
                          let user = { ...state.user };
                          user.email = e.target.value;
                          setState({ ...state, user });
                        }}
                      />
                    </div>
                  </div>
                </CBreadcrumb>
                <CBreadcrumb>
                  <div style={{ display: "flex", width: "100%" }}>
                    <div
                      style={{
                        width: "23%",
                        textAlign: "center",
                        verticalAlign: "center",
                      }}
                    >
                      <CLabel htmlFor="nf-phone">Telefone</CLabel>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        marginLeft: "11%",
                        textAlign: "end",
                        verticalAlign: "center",
                      }}
                    >
                      <MaskedInput
                        mask={[
                          "(",
                          /[1-9]/,
                          /\d/,
                          ")",
                          " ",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                        id="nf-phone"
                        name="nf-phone"
                        autoComplete="phone"
                        value={state.user.phone}
                        className="form-control"
                        onChange={(e) => {
                          let user = { ...state.user };
                          user.phone = e.target.value;
                          setState({ ...state, user });
                        }}
                      />
                    </div>
                  </div>
                </CBreadcrumb>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CButton
          style={{ width: "10%" }}
          onClick={(e) => profile(e)}
          color="success"
          block
        >
          Alterar informações
        </CButton>
      </div>

      {/* <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post">
              {state.message && (
                <CCard
                  className="border-success"
                  style={{ textAlign: "center" }}
                >
                  {state.message}
                </CCard>
              )}
              {state.error && (
                <CCard
                  className="border-danger"
                  style={{ textAlign: "center" }}
                >
                  {state.error}
                </CCard>
              )}
              <div class="c-avatar"></div>
              <CFormGroup>
                <CCol md="12">
                  <label>
                    Selecione seu Avatar
                    <img
                      style={{ width: "50px" }}
                      src={state.user.avatar}
                      alt="avatar"
                    ></img>
                    <CInput
                      type="file"
                      onChange={(e) => {
                        setState({ ...state, avatar: e.target.files[0] });
                      }}
                    />
                  </label>
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-username">Nome de usário</CLabel>
                <CInput
                  type="text"
                  id="nf-username"
                  name="nf-username"
                  autoComplete="name"
                  value={state.user.username}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.username = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-gender">Gênero</CLabel>
                <CSelect
                  value={state.user.gender}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.gender = e.target.value;
                    setState({ ...state, user });
                  }}
                >
                  <option value="m">Masculino</option>
                  <option value="w">Feminino</option>
                  <option value="a">Outros</option>
                </CSelect>
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-birthdate">Data de Nascimento</CLabel>
                <CInput
                  type="date"
                  id="nf-birthdate"
                  name="nf-birthdate"
                  autoComplete="birthdate"
                  value={state.user.birthdate.substring(0, 10)}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.birthdate = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-password">Senha</CLabel>
                <CInput
                  type="password"
                  id="nf-password"
                  name="nf-password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.password_new = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-password_confirm">Confirme a senha</CLabel>
                <CInput
                  type="password"
                  id="nf-password_confirm"
                  name="nf-password_confirm"
                  autoComplete="password_confirm"
                  value={state.user.password_confirm}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.password_confirm = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>

      <h4>Informações de contato</h4>

      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            <CForm action="" method="post">
              <CFormGroup>
                <CLabel htmlFor="nf-email">E-mail</CLabel>
                <CInput
                  type="email"
                  id="nf-email"
                  name="nf-email"
                  autoComplete="email"
                  value={state.user.email}
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.email = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="nf-phone">Telefone</CLabel>
                <MaskedInput
                  mask={[
                    "(",
                    /[1-9]/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  id="nf-phone"
                  name="nf-phone"
                  autoComplete="phone"
                  value={state.user.phone}
                  className="form-control"
                  onChange={(e) => {
                    let user = { ...state.user };
                    user.phone = e.target.value;
                    setState({ ...state, user });
                  }}
                />
              </CFormGroup>

              <div align="center">
                <CButton
                  style={{ width: "10%" }}
                  onClick={(e) => profile(e)}
                  color="success"
                  block
                >
                  Alterar informações
                </CButton>
              </div>
            </CForm>
          </CCol>
        </CRow>
      </CContainer> */}
    </div>
  );
};

const mapStateToProps = (state) => ({ token: state.token });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
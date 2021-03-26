import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CInput,
  CTextarea,
  CCard,
  CFormGroup,
  CCol,
  CSwitch,
  CButton,
  CRow,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
import Player from "../components/Player";
//Style
import "../styles/nintube.css";
//API
import { getUploadVideo, editVideo } from "../../../util/Api";
import { alert } from "../../../util/alertApi";
import Dropzone from "react-dropzone";
import dataVideo from "./data";

const UploadEdit = ({ user, history }) => {
  let { id } = useParams();
  const [state, setState] = useState({
    description: "",
    title: "",
    privacy: "",
    video: null,
    fetched: false,
    thumb: null,
    image: "",
  });
  const onDrop = (files) => {
    setState({ ...state, video: files[0], video_name: files[0].path });

    // const options = {
    //   onUploadProgess: (progressEvent) => {
    //     const { loaded, total } = progressEvent;
    //     let percent = Math.floor((loaded * 100) / total);
    //     console.log("entro");
    //     console.log(`${loaded}kb of ${total}kb | ${percent}%`);
    //     // if (percent < 100) {
    //     //   setState({ ...state, upload_percent: percent });
    //     // }
    //   },
    // };
  };

  const Edit = async () => {
    setState({
      ...state,
      error: "",
      message: "Salvando as alterações...",
    });
    console.log(state.video);
    console.log(state.description);
    console.log(state.title);
    // const data = new FormData();
    // if (state.thumb || state.video) {
    if (!state.title) {
      setState({
        ...state,
        error: "Campos não podem ficar em branco!",
        message: "",
      });
    } else {
      // data.append("title", state.title);
      // data.append("description", state.description);
      // data.append("privacy", state.privacy);
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      var values = {
        video_id: id,
        title: state.title,
        privacy: state.privacy,
        description: state.description,
        file: !state.video ? null : await toBase64(state.video),
        thumb: !state.thumb ? null : await toBase64(state.thumb),
      };
      console.log(values);
      editVideo(values, user.token)
        .then(function (data) {
          alert(
            "Sucesso!",
            "Seu vídeo foi alterado com sucesso, escolha agora entre ver o seu vídeo ou voltar ao Studio",
            [
              {
                label: "Studio",
                onClick: () => {
                  history.push("/studio");
                },
              },
              {
                label: "Ver Vídeo",
                onClick: () => {
                  history.push("/view/" + data.id);
                },
              },
            ]
          );
          // setState({
          //   ...state,
          //   error: "",
          //   message: "Alterações salvas com sucesso!",
          // });
        })
        .catch((err) => {
          console.log(err);
          setState({
            ...state,
            error: "Algum erro aconteceu, tente novamente mais tarde!",
            message: "",
          });
        });
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setState({
        ...state,
        thumb: event.target.files[0],
        image: URL.createObjectURL(event.target.files[0]),
      });
      // var thumb = event.target.files[0];
      // var thumb_name = event.target.files[0].name;
      // let reader = new FileReader();
      // reader.onload = (e) => {
      //   setState({
      //     ...state,
      //     thumb: thumb,
      //     thumb_name: thumb_name,
      //     image: e.target.result,
      //   });
      // };
      // reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (!state.fetched) {
      var data = { video_id: id, token: user.token };
      getUploadVideo(data)
        .then(function (data) {
          //console.log(user);
          // console.log(data.token);
          setState({
            ...state,
            fetched: true,
            description: data.description,
            title: data.title,
            privacy: data.privacy,
            image: data.thumb,
          });
        })
        .catch((err) => {
          setState({ ...state, error: "Dados inválidos", message: "" });
        });
    }
  }, []);
  return (
    <div style={{ border: "1px solid white", borderRadius: "10px" }}>
      {state.message && (
        <CCard className="border-success" style={{ textAlign: "center" }}>
          {state.message}
        </CCard>
      )}
      {state.error && (
        <CCard className="border-danger" style={{ textAlign: "center" }}>
          {state.error}
        </CCard>
      )}
      <div style={{ padding: "1%" }}>
        <CFormGroup
          row
          style={{
            // marginLeft: "2%",
            marginTop: "1%",
          }}
        >
          <CCol md="6">
            <h3 style={{ color: "white" }}>Título</h3>
            <CInput
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
            />
          </CCol>
          <CCol md="6">
            <div
              style={{
                color: "white",
              }}
            >
              <h3 style={{ color: "white" }}>Thumb e Privacidade</h3>

              <div style={{ display: "flex" }}>
                <div>
                  <label className="fileThumb" for="file_thumb">
                    Selecione a imagem para a thumb &#187;
                  </label>
                  <input
                    id="file_thumb"
                    onChange={(e) => onImageChange(e)}
                    type="file"
                  ></input>{" "}
                </div>
                <div style={{ marginTop: "0.5%", display: "flex" }}>
                  <CSwitch
                    className={"mx-1"}
                    color={"success"}
                    checked={state.privacy}
                    onChange={(e) =>
                      setState({ ...state, privacy: e.target.checked })
                    }
                  />
                  <span>Privado</span>
                </div>
              </div>
            </div>
          </CCol>
        </CFormGroup>
        <CFormGroup
          row
          // style={{ marginLeft: "2%" }}
        >
          <CCol md="6">
            <h3 style={{ color: "white" }}>Descrição</h3>
            <CTextarea
              style={{ height: "30%" }}
              value={state.description}
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
            />
          </CCol>
          <CCol md="6">
            <div style={{}}>
              <h3 style={{ color: "white", alignItems: "center" }}>
                Arraste ou Selecione o video abaixo!
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        width: "300px",
                        height: "240px",
                        border: "1px solid lightgray",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <CIcon name="cilDataTransferUp" />
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
            <p style={{ color: "white" }}>{state.video_name}</p>
          </CCol>
        </CFormGroup>

        <CFormGroup
          row
          // style={{ marginLeft: "2%" }}
        >
          <CCol md="6">
            <div align="center">
              <h3 style={{ color: "white" }}>Imagem Escolhida</h3>
              <img style={{ width: "60%" }} src={state.image} />
            </div>
          </CCol>
          <CCol md="6">
            <div align="center">
              <h3 style={{ color: "white" }}>Vídeo Escolhida</h3>
              <div style={{ width: "100%" }}>
                <Player />
              </div>
            </div>
          </CCol>
        </CFormGroup>
        <div align="center" style={{ marginBottom: "1%", marginTop: "1%" }}>
          <CButton
            style={{ color: "white", border: "1px solid red" }}
            onClick={() => Edit()}
          >
            Enviar
          </CButton>
        </div>

        {/* <CRow>
        <CCol sm="4">
          <CFormGroup row style={{ width: "100%" }}>
            <CCol md="12">
              <CInput
                placeholder="Titulo"
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row style={{ width: "100%" }}>
            <CCol md="12">
              <CTextarea
                placeholder="Descrição"
                value={state.description}
                onChange={(e) =>
                  setState({ ...state, description: e.target.value })
                }
              />
            </CCol>
          </CFormGroup>
          <div
            style={{
              color: "white",
              display: "flex",
              // justifyContent: "space-between",
            }}
          >
            {" "}
            <CSwitch
              className={"mx-1"}
              color={"info"}
              checked={state.privacy}
              onChange={(e) =>
                setState({ ...state, privacy: e.target.checked })
              }
            />
            Privado
          </div>
          <div style={{ marginBottom: "5%" }}>
            <label className="fileThumb" for="file_thumb">
              Selecione a imagem para a thumb &#187;
            </label>
            <input
              id="file_thumb"
              onChange={(e) =>
                setState({
                  ...state,
                  thumb: e.target.files[0],
                })
              }
              type="file"
            ></input>{" "}
            <span style={{ color: "white" }}>
              <CImg src={state.thumb_url} />
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <CIcon name="cilDataTransferUp" />
                </div>
              )}
            </Dropzone>
          </div>
          <p style={{ color: "white" }}>{state.video_name}</p>
          <CButton
            style={{ color: "white", width: "50%", border: "1px solid red" }}
            onClick={() => Edit()}
          >
            Enviar
          </CButton>
        </CCol>
        <CCol sm="8">
          <Player />
        </CCol>
      </CRow> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UploadEdit);

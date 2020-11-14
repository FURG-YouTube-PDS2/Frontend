import React from "react";
//REDUX
//CoreUI
import {
  CLink,
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CIcon,
  CCardTitle,
  CWidgetIcon,
  CCardSubtitle,
  CCardText,
  CCardHeader,
  CImg,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
//Style

const videos = [
  {
    id: 1,
    title:
      "FEED DO USUÁRIO | Criando uma Rede Social com React.js e .NET Core #29",
    channel: "Lucas Nhimi",
    views: "11 mi de visualizações",
    date: "há 1 semana",
    description: "Ouça #FavelaVive em todas as plataformas: https://onerpm.lnk.to/FavelaVive4 Se inscreva no canal e ative o sino de notificações para não perder nenhum lançamento. Favela Vive 4 Letra:...",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 2,
    title:
      "COMO MELHORAR SEU CODIGO JAVASCRIPT (ESLINT + PRETTIER + EDITORCONFIG) | Dicas e Truques #02",
    channel: "Lucas Nhimi",
    views: "957 mil visualizações",
    date: "há 1 semana",
    description: "Ouça #FavelaVive em todas as plataformas: https://onerpm.lnk.to/FavelaVive4 Se inscreva no canal e ative o sino de notificações para não perder nenhum lançamento. Favela Vive 4 Letra:...",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 3,
    title:
      "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
    channel: "Lucas Nhimi",
    views: "106 mil visualizações",
    date: "há 1 semana",
    description: "Ouça #FavelaVive em todas as plataformas: https://onerpm.lnk.to/FavelaVive4 Se inscreva no canal e ative o sino de notificações para não perder nenhum lançamento. Favela Vive 4 Letra:...",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 4,
    title:
      "CONTEXT API NO EDITOR DE POST | Criando uma Rede Social com React.js e .NET Core #27",
    channel: "Lucas Nhimi",
    views: "5,6 mi de visualizações",
    date: "há 1 semana",
    description: "Ouça #FavelaVive em todas as plataformas: https://onerpm.lnk.to/FavelaVive4 Se inscreva no canal e ative o sino de notificações para não perder nenhum lançamento. Favela Vive 4 Letra:...",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 5,
    title:
      "EDITOR DE POST COM MARKDOWN 2 | Criando uma Rede Social com React.js e .NET Core #26",
    channel: "Lucas Nhimi",
    views: "2,2 mi de visualizações",
    date: "há 1 semana",
    description: "Ouça #FavelaVive em todas as plataformas: https://onerpm.lnk.to/FavelaVive4 Se inscreva no canal e ative o sino de notificações para não perder nenhum lançamento. Favela Vive 4 Letra:...",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 6,
    title: "COMO MIGRAR PARA REACT HOOKS | Dicas e Truques #01",
    channel: "Lucas Nhimi",
    views: "233 mil visualizações",
    date: "há 1 semana",
    description: "Ouça #FavelaVive em todas as plataformas: https://onerpm.lnk.to/FavelaVive4 Se inscreva no canal e ative o sino de notificações para não perder nenhum lançamento. Favela Vive 4 Letra:...",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 7,
    title:
      "PRÉ-REQUISITOS | Criando uma Rede Social com React.js e .NET Core #01",
    channel: "Lucas Nhimi",
    views: "118 mil visualizações",
    date: "há 1 semana",
    description: "Ouça #FavelaVive em todas as plataformas: https://onerpm.lnk.to/FavelaVive4 Se inscreva no canal e ative o sino de notificações para não perder nenhum lançamento. Favela Vive 4 Letra:...",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
  {
    id: 8,
    title:
      "GIT E GITHUB | Criando uma Rede Social com React.js e .NET Core #04",
    channel: "Lucas Nhimi",
    views: "1,9 mi de visualizações",
    date: "há 1 semana",
    description: "Ouça #FavelaVive em todas as plataformas: https://onerpm.lnk.to/FavelaVive4 Se inscreva no canal e ative o sino de notificações para não perder nenhum lançamento. Favela Vive 4 Letra:...",
    thumb:
      "https://i.ytimg.com/vi/eXASPM9CyH0/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDdSPNAYKm5nowMhTcZFcQu7c7l3g",
  },
];

const StackVideo = ({}) => {
    let history = useHistory();
    const handleClick = (route) => {
        history.push("/" + route);
    };

    return (
        <div>
          <CContainer fluid>
            <CRow>
            <CCol sm="12">
              {videos.map((item, index) => (
                  <CCard>
                    <div>             
                    <CCol sm="4">
                    <CImg
                      onClick={() => handleClick("view")}
                      style={{ width: "100%", cursor: "pointer" }}
                      src={item.thumb}
                    />
                    </CCol>
                    </div> 
                    <div>
                    <CCol sm="9">
                      {/* <CCardBody
                        className=" float-left"
                        style={{ height: "100px" }}
                      >
                        <div className="c-avatar">
                          <CImg
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick("channel")}
                            src={item.avatar}
                            className="c-avatar-img"
                            alt="admin@bootstrapmaster.com"
                          />
                        </div>
                      </CCardBody> */}
                      <CCardBody>
                        <CCardSubtitle
                          style={{ cursor: "pointer" }}
                          onClick={() => handleClick("view")}
                        >
                          {item.title}
                        </CCardSubtitle>{" "}
                        <CCardText
                          style={{ marginBottom: "-1%", marginTop: "1.5%" }}
                        >
                          {" "}
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick("channel")}
                          >
                            {item.channel}
                          </span>
                          <CCardText
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick("view")}
                          >{`${item.views} • ${item.date}`}</CCardText>{" "}
                          <CCardText
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick("view")}
                          >{item.description}</CCardText>{" "}
                        </CCardText>
                      </CCardBody>
                    </CCol>
                    </div>
                  </CCard>
              ))}
               </CCol>
            </CRow>
          </CContainer>
        </div>
      );
    };
    
export default StackVideo;
    
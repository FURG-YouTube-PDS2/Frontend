//REACT
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../store/actions";
//CoreUI
import {
  CLink,
  CButton,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CWidgetIcon,
  CCardSubtitle,
  CCardText,
  CCardHeader,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
//Componets
//Style
import "../styles/nintube.css";
import "./componentStyle.css";
//API
import { SearchAll, Inscribe } from "../../../util/Api";
import NoVideo from "./noVideo";
import { diffDate } from "../../../util/dateDiff";

const Search = ({ user }) => {
  let searchText = useParams().search;
  let type = 1;
  if (searchText.startsWith("TAG:")) {
    searchText = searchText.slice(4);
    type = 0;
  }
  const [state, setState] = useState({
    searchText: searchText,
    fetched: false,
    type: type,
    videos: [],
    channels: [],
  });

  let history = useHistory();

  const handleClick = (route, id) => {
    history.push("/" + route + "/" + id);
  };

  const handleKeys = (e) => {
    if (e.keyCode === 13) {
      doSearch();
    }
  };

  const doSearch = () => {
    handleClick("search",state.searchText)
    var data = {
      input: state.searchText,
      type: state.type,
      token: user ? user.token : "",
    };

    // data = searchSimulator()
    // setState({ ...state, videos:data.videos, channels: data.channels});
    SearchAll(data).then(function (data) {
      setState({
        ...state,
        fetched: true,
        videos: data.videos,
        channels: data.channels,
        fetched:true
      });
    });
  };

  const Change = (index) => {
    if (user) {
      var data = {
        token: user.token,
        target_id: state.channels[index].id,
      };

      let channels = state.channels;
      channels[index].is_subscribed = !channels[index].is_subscribed;
      if (channels[index].is_subscribed) {
        channels[index].subscribers += 1;
      } else {
        channels[index].subscribers -= 1;
      }
      setState({ ...state, channels});
    } else {
      alert("Login", "Você não está logado!");
    }
  };

  useEffect(() => {
    doSearch();
  }, []);
  return (
    <div>
      <center>
        <CInputGroup
          style={{ border: "1px solid red", borderRadius: "5px", width: "50%" }}
        >
          <CInput
            placeholder="Pesquisar"
            onKeyUp={handleKeys}
            value={state.searchText}
            onChange={(e) => {
              setState({ ...state, searchText: e.target.value, type: 1 });
            }}
          />
          <CInputGroupAppend>
            <CInputGroupText>
              <CIcon name="cil-magnifying-glass" onClick={doSearch} />
            </CInputGroupText>
          </CInputGroupAppend>
        </CInputGroup>
      </center>
      <br />
      {!state.fetched && (
        <div className="c-app c-default-layout" style={{ height: "100%" }}>
          <div className="div-reload">
            <CIcon className="icone" name="cilReload" size="3xl" />
          </div>
        </div>
      )}
      <CContainer fluid>
        <CRow>
          <CCol sm="12">
            {state.channels.map((item, index) => (
              <CCard
                style={{
                  marginBottom: "1%",
                  border: "2px solid #B3272C",
                  borderRadius: "30px",
                }}
              >
                <CCardBody style={{ margin: "0" }}>
                  <CCardBody
                    className=" float-left"
                    style={{ height: "100px" }}
                  >
                    <div className="c-avatar">
                      <CImg
                        style={{
                          cursor: "pointer",
                          height: "75px",
                          width: "75px",
                        }}
                        onClick={() => handleClick("channel", item.id)}
                        src={item.avatar}
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                      />
                    </div>
                  </CCardBody>

                  <CCardText>
                    <CCardText>
                      <h5
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.id)}
                      >
                        {item.name.length <= 103
                          ? item.name
                          : item.name.substring(0, 100) + "..."}
                      </h5>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.id)}
                      >
                        {`  ${item.subscribers} Inscritos • ${item.video_count}  Vídeos • `}
                      </span>{" "}
                      <br />
                      {item.is_subscribed === "0" && (
                        <CButton
                          id="inscribe-search"
                          name={"inscribe-" + index}
                          class="inscribe"
                          onClick={(e) => Change(e.target.name.split("-")[1])}
                        >
                          Inscrever-se
                        </CButton>
                      )}{" "}
                      {item.is_subscribed === "1" && (
                        <CButton
                          id="inscribe-search"
                          name={"inscribe-" + index}
                          class="registered"
                          onClick={(e) => Change(e.target.name.split("-")[1])}
                        >
                          Inscrito
                        </CButton>
                      )}
                    </CCardText>
                  </CCardText>
                </CCardBody>
              </CCard>
            ))}
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            {state.videos.map((item, index) => (
              <CCard
                style={{
                  marginBottom: "1%",
                  border: "2px solid #B3272C",
                }}
              >
                <CCardBody style={{ margin: "0" }}>
                  <CImg
                    onClick={() => handleClick("view", item.id)}
                    style={{
                      height: "150px",
                      cursor: "pointer",
                      float: "left",
                      marginRight: "1%",
                      borderBottom: "1px solid black",
                      borderRadius: "10px",
                    }}
                    src={item.thumb}
                  />
                  <CCardText>
                    <CCardText>
                      <h5
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.id)}
                      >
                        {item.title.length <= 103
                          ? item.name
                          : item.title.substring(0, 100) + "..."}
                      </h5>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick("view", item.id)}
                      >
                        {` • ${item.views}  Visualizações • ${diffDate(
                          state.today,
                          item.created_at
                        )}`}
                      </span>{" "}
                    </CCardText>
                    <CCardText
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick("view", item.id)}
                    >
                      <CCardBody
                        className=" float-left"
                        style={{ height: "50px" }}
                      >
                        <div className="c-avatar">
                          <CImg
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClick("channel", item.id)}
                            src={item.avatar}
                            className="c-avatar-img"
                            alt="admin@bootstrapmaster.com"
                          />
                        </div>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleClick("channel", item.channel_id)
                          }
                        >
                          {item.channel_name}
                        </span>
                      </CCardBody>
                      <div className="float-left">
                        {item.description.substring(0, 60) + "..."}
                      </div>
                    </CCardText>{" "}
                  </CCardText>
                </CCardBody>
              </CCard>
            ))}
          </CCol>
        </CRow>
      </CContainer>
      {(state.fetched && state.channels.length == 0 && state.videos.length == 0) && <NoVideo/>}
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Search);

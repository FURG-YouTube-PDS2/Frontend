import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
//REDUX
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../store/actions/index";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CProgress,
} from "@coreui/react";
import { getNotf, readNot, API_URL } from "../util/Api";
import { diffDate } from "../util/dateDiff";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdownNotif = ({ user }) => {
  // const itemsCount = 5;
  let history = useHistory();
  const [state, setState] = useState({
    nots: [],
    itemsCount: 0,
    fetched: false,
  });

  const handleClick = (route, id) => {
    history.push("/" + route + "/" + id);
  };

  const reading = () => {
    // var data = {};
    var nots = [];
    // data.push({ nots: new Array() });
    for (let i = 0; i < state.nots.length; i++) {
      nots.push(state.nots[i].id);
    }
    var data = {
      nots: nots,
    };
    readNot(data).then(function (data) {});
  };

  useEffect(() => {
    if (!state.fetched) {
      var data = {
        token: user.token,
      };
      getNotf(data).then(function (data) {
        let count = 0;
        for (let i = 0; i < data.length; i++) {
          if (!data[i].readed) {
            count += 1;
          }
        }
        setState({ ...state, fetched: true, nots: data, itemsCount: count });
      });
    }
  }, []);
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle
        onClick={() => reading()}
        className="c-header-nav-link"
        caret={false}
      >
        <CIcon name="cil-bell" />
        {state.itemsCount !== 0 && (
          <CBadge shape="pill" color="danger">
            {state.itemsCount}
          </CBadge>
        )}
      </CDropdownToggle>

      <CDropdownMenu
        className="pt-0"
        style={{ width: "550px" }}
        placement="bottom-end"
      >
        <CDropdownItem header tag="div" color="dark">
          <strong style={{ color: "white" }}>Notificações</strong>
        </CDropdownItem>
        {state.nots.map((item, index) => (
          <CDropdownItem onClick={() => handleClick("view", item.video_id)}>
            {item.type === "like_comment" && (
              <div className="message">
                <div className="pt-2 mr-2 float-left">
                  <div
                    style={{
                      verticalAlign: "center",
                      display: "flex",
                      height: "100%",
                    }}
                  >
                    {!item.readed && (
                      <CIcon
                        name="cil-media-record"
                        style={{ width: "7px", color: "green" }}
                      />
                    )}

                    <div className="c-avatar">
                      <CImg src={item.avatar} className="c-avatar-img" />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "90%", height: "100%" }}>
                    <p style={{ wordBreak: "break-word", width: "90%" }}>
                      {item.name}
                      {' marcou seu comentário com "Gostei": '}"{item.text}"
                    </p>

                    <div className="small text-muted text-truncate">
                      {diffDate(new Date(), item.date)}
                    </div>
                  </div>
                  <div className="ml-1   float-right" style={{ width: "27%" }}>
                    <div style={{ width: "100%" }}>
                      <CImg
                        src={API_URL + "images/getImage/" + item.video_id}
                        style={{ width: "100%", height: "70px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {item.type === "comment" && (
              <div className="message">
                <div className="pt-2 mr-2 float-left">
                  <div
                    style={{
                      verticalAlign: "center",
                      display: "flex",
                      height: "100%",
                    }}
                  >
                    {!item.readed && (
                      <CIcon
                        name="cil-media-record"
                        style={{ width: "7px", color: "green" }}
                      />
                    )}

                    <div className="c-avatar">
                      <CImg src={item.avatar} className="c-avatar-img" />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "90%" }}>
                    <p>
                      {item.name}
                      {" comentou no seu comentário: "}"{item.text}"
                    </p>
                    <div className="small text-muted text-truncate">
                      {diffDate(new Date(), item.date)}
                    </div>
                  </div>
                  <div className=" ml-1 float-right" style={{ width: "27%" }}>
                    <div style={{ width: "100%" }}>
                      <CImg
                        src={API_URL + "/images/getImage/" + item.video_id}
                        style={{ width: "100%", height: "70px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {item.type === "new_video" && (
              <div className="message">
                <div className="pt-2 mr-2 float-left">
                  <div
                    style={{
                      verticalAlign: "center",
                      display: "flex",
                      height: "100%",
                    }}
                  >
                    {!item.readed && (
                      <CIcon
                        name="cil-media-record"
                        style={{ width: "7px", color: "green" }}
                      />
                    )}

                    <div className="c-avatar">
                      <CImg
                        src={API_URL + "/images/getImage/" + item.video_id}
                        className="c-avatar-img"
                      />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "90%" }}>
                    <p>
                      {item.name}
                      {" enviou o video "}
                      {item.text}
                    </p>
                    <div className="small text-muted text-truncate">
                      {diffDate(new Date(), item.date)}
                    </div>
                  </div>
                  <div className=" ml-1 float-right" style={{ width: "27%" }}>
                    <div style={{ width: "100%" }}>
                      <CImg
                        src={API_URL + "/images/getImage/" + item.video_id}
                        style={{ width: "100%", height: "70px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CDropdownItem>
        ))}

        {/* <CDropdownItem href="#" className="text-center border-top">
          <strong>View all messages</strong>
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  );
};
const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheHeaderDropdownNotif);

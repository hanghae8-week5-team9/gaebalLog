import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { StBtn } from "../atoms/StBtn";
import { StImgBox } from "../atoms/StImgBox";

import { fetchPosts, deletePost } from "../../redux/modules/post";

import EditForm from "../molecules/EditForm";
import Comment from "../organisms/Comment";
import { deleteComment } from "../../redux/modules/comment";

const SingleLog = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const log = useSelector((state) => state.postSlice.posts);
  const data = useSelector((state) => state.commentSlice.comments);
  //!겟함수
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const [modal, setModal] = useState(false);
  const onShowEditForm = () => {
    setModal(!modal);
  };

  return (
    <StLogPage>
      {log?.map((log) => {
        if (log.id === parseInt(param.id)) {
          return (
            <div key={log.id}>
              <h1>{log.title}</h1>
              <StInformation>
                <p>
                  By <span style={{ fontWeight: "bold" }}>{log.nickname}</span>
                </p>
                <StBtnWrapper>
                  <StBtn
                    onClick={() => onShowEditForm()}
                    color="gray"
                    hoverColor="black"
                  >
                    수정
                  </StBtn>
                  <StBtn
                    onClick={() => {
                      let found = data.find(
                        (element) =>
                          parseInt(element.comment_id) === parseInt(log.id)
                      );
                      if (window.confirm("정말로삭제하시겠습니까?")) {
                        if (found === undefined) {
                          dispatch(deletePost(log.id)).then(nav("/"));
                        } else {
                          found = found.id;
                          dispatch(deletePost(log.id));
                          dispatch(deleteComment(found)).then(nav("/"));
                        }
                      }
                    }}
                    color="gray"
                    hoverColor="#aa1408"
                  >
                    삭제
                  </StBtn>
                </StBtnWrapper>
              </StInformation>
              <StLogBody>
                <StImgBox src={log.img} alt="" />
                <p>{log.body}</p>
              </StLogBody>
              {modal ? <EditForm logInfo={log} setModal={setModal} /> : null}
            </div>
          );
        } else {
          return null;
        }
      })}
      <Comment />
    </StLogPage>
  );
};

export default SingleLog;

const StLogPage = styled.div`
  width: 80%;
  margin: 1.5rem auto;
  padding: 1rem;
  & h1 {
    font-size: 3rem;
    line-height: 120%;
  }
`;

const StInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 1.25rem;
  color: #1f1f1f;
`;

const StBtnWrapper = styled.div``;

const StLogBody = styled.div`
  & p {
    line-height: 200%; //행간조절 브라우저 문자 기준크기에 대한 %값
    font-size: 1.5rem;
    margin: 25px 0;
  }
  margin-bottom: 25px;
  border-bottom: 1px solid gainsboro;
`;

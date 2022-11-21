import React, { useState, useEffect, useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./TextEditor.css";
import socketio from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import Cookie from "js-cookie";
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = (props) => {
  const { id: documentId } = useParams();
  const [socket, setsocket] = useState();
  const [quill, setquill] = useState();
  const user = Cookie.getJSON("userInfo");
  const participant = localStorage.getItem("doc-user");

  ////////////////////////////////////////////////////////////////////////////////////////
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");

    wrapper.append(editor);
    var q = new Quill(editor, {
      modules: { toolbar: TOOLBAR_OPTIONS },
      theme: "snow",
    });
    q.disable();
    q.setText("Loading...");
    setquill(q);
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const s = socketio.connect("http://localhost:4000/", {
      transports: ["websocket"],
      //   rejectUnauthorized: false,
    });

    setsocket(s);

    return () => {
      console.log("disconnected");
      s.disconnect();
    };
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (quill == null || socket == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill, socket]);

  ////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (quill == null || socket == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [quill, socket]);

  ////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (quill == null || socket == null) return;

    socket.on("load-documents", (document) => {
      console.log(document, "datatata");
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-documents", { documentId, user, participant });
  }, [socket, quill, documentId, user]);

  ////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (quill == null || socket == null) return;

    const interval = setInterval(() => {
      socket.emit("save-documents", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, documentId]);

  return <div id="con" ref={wrapperRef}></div>;
};

export default TextEditor;

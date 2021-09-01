import React from "react";
import { faDownload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";
import "./index.css";

export default function CardResume({ name, fileUrl, onClickRemove }) {
  return (
    <Card className="card-resume">
      <CardHeader>
        <div className="header-title">
          <div className="top-desc">Resume</div>
          <div className="title">{name}</div>
        </div>
        <Button className="btn-remove" color="danger" size="sm" onClick={onClickRemove}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter>
        <a
          className="btn btn-primary btn-block"
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faDownload} /> ดาวน์โหลด
        </a>
      </CardFooter>
    </Card>
  );
}

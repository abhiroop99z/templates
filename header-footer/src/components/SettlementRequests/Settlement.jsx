import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import FileRequest from "./FileRequest";
import FormRequest from "./FormRequest";
import SingleRequest from "./SingleRequest";

const Settlement = (props) => {
  return (
    <div>
      <Tabs
        defaultActiveKey="form"
        id="settlement-tabs"
        className="mb-3"
        fill
        variant="underline"
      >
        <Tab eventKey="form" title="Submit a Form">
          <FormRequest roleId={props.roleId} />
        </Tab>
        <Tab eventKey="single" title="Submit a Settlement Request">
          <SingleRequest roleId={props.roleId} />
        </Tab>
        <Tab eventKey="file" title="Submit a File">
          <FileRequest roleId={props.roleId} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Settlement;

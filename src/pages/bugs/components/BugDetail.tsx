import React from "react";
import { Card, Tabs, TabsProps } from "antd";
import { Comment, CommentForm, DetailPage, DescriptionComponent } from "_lib";
import BugDetailHeader from "./BugDetailHeader";
import BugInformation from "./BugInformation";
import BugStatusComponent from "./BugStatusComponent";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Comments",
    children: (
      <Card>
        <Comment />
        <CommentForm />
      </Card>
    ),
  },
  {
    key: "2",
    label: "Bugs",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

const BugDetail = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <DetailPage>
      <BugDetailHeader />
      <BugStatusComponent />
      <DescriptionComponent description="A dog is a type of domesticated animal. Known for its loyalty and faithfulness,the world." />
      <BugInformation />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </DetailPage>
  );
};

export default BugDetail;

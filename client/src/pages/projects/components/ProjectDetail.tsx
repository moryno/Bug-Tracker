import React from "react";
import { Card, Tabs, TabsProps } from "antd";
import ProjectInformation from "./ProjectInformation";
import { Comment, CommentForm, DetailPage, DescriptionComponent } from "_lib";
import ProjectDetailHeader from "./ProjectDetailHeader";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Comments",
    children: (
      <Card>
        <CommentForm />
        <Comment />
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

const ProjectDetail = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <DetailPage>
      <ProjectDetailHeader />
      <DescriptionComponent description="A dog is a type of domesticated animal. Known for its loyalty and faithfulness,the world." />
      <ProjectInformation />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </DetailPage>
  );
};

export default ProjectDetail;

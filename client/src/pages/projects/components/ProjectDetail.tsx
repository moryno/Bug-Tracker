import { Card, Tabs, TabsProps } from "antd";
import ProjectInformation from "./ProjectInformation";
import { Comment, CommentForm, DetailPage, DescriptionComponent } from "_lib";
import ProjectDetailHeader from "./ProjectDetailHeader";
import { useParams } from "react-router-dom";
import { useGetById } from "_hooks";
import { ProjectService } from "_services";
import { DomianEnum } from "_constants";



const ProjectDetail = () => {
 const { id } = useParams();
 const { isLoading, data } = useGetById(ProjectService.getProject, DomianEnum.PROJECTS, id);

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <DetailPage>
      <ProjectDetailHeader title={data?.data?.projectName} />
      <DescriptionComponent description={data?.data?.description} />
      <ProjectInformation project={data?.data} />
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </DetailPage>
  );
};

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
export default ProjectDetail;

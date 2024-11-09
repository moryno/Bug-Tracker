import { Typography } from "antd";
import { StyledAppHeaderSearchError } from "./index.styled";
import {  ReactComponent as NotFoundSVG  } from "_assets/images/lib/search_not_found.svg"

interface IProps{
    isSearchValueValid: boolean;
    isResultsEmpty: boolean;
    loading: boolean;
}
const AppHeaderSearchError = ({ isSearchValueValid, isResultsEmpty, loading }: IProps) => {
  return (
    <>
    {isSearchValueValid && isResultsEmpty && !loading && (
      <StyledAppHeaderSearchError>
        <NotFoundSVG width={300} />
        <Title level={4}>Oh No!</Title>
        <Text type="secondary">
          Seems we could not find any activity
          <br />
          that match your search keyword.
        </Text>
        <Text type="secondary">Try another name.</Text>
      </StyledAppHeaderSearchError>
    )}
    {!isSearchValueValid && (
      <StyledAppHeaderSearchError>
        <Text type="secondary">Search requires at least 3 characters.</Text>
      </StyledAppHeaderSearchError>
    )}
  </>
  )
}

const { Title, Text } = Typography;

export default AppHeaderSearchError
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { 
  StyledAppHeaderSearch,
  StyledAppHeaderSearchInput, 
  StyledAppHeaderSearchModalContent, 
  StyledAppHeaderSearchScrollbar, 
  StyledAppHeaderSearchSkeletonContainer, 
  StyledAppHeaderSearchWrapper, 
  StyledAppHeaderSelectnput
 } from './index.styled'
import { CiSearch } from 'react-icons/ci'
import { MdOutlineCancel } from 'react-icons/md'
import { defaultTheme } from '_constants'
import { Select, Skeleton } from 'antd'
import AppHeaderSearchError from './AppSearchError'
import SearchListContent from './SearchListContent'
import { useLocation } from 'react-router-dom'
import { useDidUpdate, useModal } from '_hooks'
import { useDebouncedCallback } from 'use-debounce'
import { searchService } from '_services'

enum DomianEnum {
  PROJECTS = "Projects",
  BUGS = "Bugs",
  EVENT = "Event"
}

const AppHeaderSearch = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState<string>("Projects");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const loadingRef = useRef(false);
    const { pathname } = useLocation();

    const { open, toggle } = useModal();

    useDidUpdate(() => {
      if(open){
        toggle();
        setSearchValue("");
      }
    }, [pathname]);

    const getSearchResult = useDebouncedCallback(async (keyword) => {
      const key = searchType === "Projects" ? "projectName" :
       searchType === "Bugs" ? "bugName" : "title";

      const params = { 
        [key] : keyword 
      }

      const { data: { data }} = await searchService.getSearchResult(params, searchType);
      setSearchResults(data)
    }, 500)

    const clearSearchResults = () => {
      setSearchResults([])
    }

    useEffect(() => {
      loadingRef.current = false;
      if(!searchValue || searchValue.length < 3) return;
      getSearchResult(searchValue)
    },[getSearchResult, searchValue]);

    const onSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        loadingRef.current = true;
        setSearchValue(value);;
        searchResults && clearSearchResults()
      }, [searchResults]
    );

    const onTypeChange = useCallback((e: string) => {
        return setSearchType(e)
      }, []
    );

    const onClickClose = useCallback(() => {
      setSearchValue((prev) => {
        if (!prev) {
          toggle();
        } else {
          clearSearchResults();
        }
        return "";
      });
    }, [toggle]);

    const loading = loadingRef.current;
    const isSearchValueValid = searchValue.length >= 3;
  return (
    <StyledAppHeaderSearch>
        <CiSearch size={24}  onClick={toggle} className="bugtracker-search" />
        <StyledAppHeaderSearchModalContent
            open={open}
            footer={null}
            onCancel={toggle}
            closeIcon={null}
            destroyOnClose={true}
      >
        <StyledAppHeaderSearchWrapper>
        <StyledAppHeaderSearchInput
          prefix={<CiSearch size={20} />}
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Type here to start your search"
          suffix={
            <MdOutlineCancel
              onClick={onClickClose}
              color={defaultTheme.theme.palette.gray[500]}
              size={20}
            />
          }
        />
         <StyledAppHeaderSelectnput defaultValue={searchType} onChange={(e) => onTypeChange(e as string)} style={{ width: "40%"}}>
            <Select.Option value={ DomianEnum.PROJECTS }>{ DomianEnum.PROJECTS }</Select.Option>
            <Select.Option value={ DomianEnum.BUGS }>{ DomianEnum.BUGS }</Select.Option>
            <Select.Option value={ DomianEnum.EVENT }>{ DomianEnum.EVENT }</Select.Option>
         </StyledAppHeaderSelectnput>
        </StyledAppHeaderSearchWrapper>
        <div style={{ background: "transparent", height: "5px"}}></div>
        {loading && isSearchValueValid && (
          <StyledAppHeaderSearchSkeletonContainer>
            {Array(3)
              .fill(0)
              .map(() => (
                <Skeleton.Input active={loading} block size="large" />
              ))}
          </StyledAppHeaderSearchSkeletonContainer>
        )}
        <AppHeaderSearchError
          isSearchValueValid={isSearchValueValid}
          isResultsEmpty={!(searchResults || []).length}
          loading={loading}
        />
        {isSearchValueValid && !loading 
        && searchResults
         && (
          <StyledAppHeaderSearchScrollbar>
            <SearchListContent groupedResults={searchResults} />
          </StyledAppHeaderSearchScrollbar>
        )}
      </StyledAppHeaderSearchModalContent>
    </StyledAppHeaderSearch>
  )
}

export default AppHeaderSearch
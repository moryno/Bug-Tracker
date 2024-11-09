import { getYearMonthDate } from "_helpers";
import { FaCalendarAlt } from "react-icons/fa";
import {
    StyledDiv,
    StyledEventCalendar,
    StyledEventCalendarBottom,
    StyledEventCalendarDate,
    StyledEventCalendarMonth,
    StyledEventCalendarTop,
    StyledEventCalendarTopMonth,
    StyledEventCalendarWrapper,
    StyledEventCalendarYear,

  } from "./index.styled";

const EventCalendar = ( { startDate, endDate } : {  startDate: Date, endDate: Date }) => {
  return (
    <StyledEventCalendarWrapper>
    <StyledEventCalendar>
      <StyledEventCalendarTop>
      <FaCalendarAlt size={14} />
      <StyledEventCalendarTopMonth>
        {getYearMonthDate(startDate!).monthName === getYearMonthDate(endDate!).monthName ?
        <StyledEventCalendarMonth>{getYearMonthDate(startDate!).monthName}</StyledEventCalendarMonth>
        :
        <>
        <StyledEventCalendarMonth>{getYearMonthDate(startDate!).monthName}</StyledEventCalendarMonth> -
        <StyledEventCalendarMonth>{getYearMonthDate(endDate!).monthName}</StyledEventCalendarMonth>
        </>
        }
        </StyledEventCalendarTopMonth>
      </StyledEventCalendarTop>
      <StyledEventCalendarBottom>
        <StyledDiv>
        {getYearMonthDate(startDate!).day === getYearMonthDate(endDate!).day ?
        <StyledEventCalendarDate>{getYearMonthDate(startDate!).day}</StyledEventCalendarDate>
        :
        <>
        <StyledEventCalendarDate>{getYearMonthDate(startDate!).day}</StyledEventCalendarDate> -
        <StyledEventCalendarDate>{getYearMonthDate(endDate!).day}</StyledEventCalendarDate>
        </>
        }
        </StyledDiv>
        <StyledDiv>
        {getYearMonthDate(startDate!).year === getYearMonthDate(endDate!).year ?
        <StyledEventCalendarYear>{getYearMonthDate(startDate!).year}</StyledEventCalendarYear>
        :
        <>
        <StyledEventCalendarYear>{getYearMonthDate(startDate!).year}</StyledEventCalendarYear> -
        <StyledEventCalendarYear>{getYearMonthDate(endDate!).year}</StyledEventCalendarYear>
        </>
        }
        </StyledDiv>
      </StyledEventCalendarBottom>
    </StyledEventCalendar>
  </StyledEventCalendarWrapper>
  )
}

export default EventCalendar
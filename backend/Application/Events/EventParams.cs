using Application.Core;

namespace Application.Events
{
    public class EventParams : PagingParams
    {
        public string Title { get; set; } = string.Empty;
        public string? Location { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

    }
}

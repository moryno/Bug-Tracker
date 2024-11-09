using Application.Bugs;
using Application.Events;
using Application.Projects;
using Application.Roles;
using AutoMapper;
using Domain;

namespace Application.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Project, ProjectDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Owner!.UserName))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.Owner!.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Owner.Photos.FirstOrDefault(x => x.IsMain).Url)); 
            CreateMap<Project, ProjectSearchDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Owner!.UserName))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.Owner!.DisplayName))
                .ForMember(d => d.Count, o => o.MapFrom(s => s.Bugs!.Count()))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Owner.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Bug, BugDto>()
                .ForMember(d => d.ProjectId, o => o.MapFrom(s => s.Project!.Id))
                .ForMember(d => d.ProjectName, o => o.MapFrom(s => s.Project!.ProjectName)); 
            CreateMap<Bug, BugSearchDto>()
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.BugAssignees.First().FullName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.BugAssignees.First().Image))
                .ForMember(d => d.Count, o => o.MapFrom(s => s.BugAssignees.Count()))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.BugAssignees.First().UserName));
            CreateMap<BugAssignee, AssigneeDto>();
            CreateMap<ProjectComment, CommentDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author!.UserName))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.Author!.DisplayName));
            CreateMap<BugComment, CommentDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author!.UserName))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.Author!.DisplayName));
            CreateMap<AppUser, UserProfile>()
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<AppRole, UserRole>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name));
            CreateMap<Event, CalendarEventDto>();
            CreateMap<EventAttendee, AssigneeDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser!.UserName))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.AppUser!.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Event, EventDto>();
            CreateMap<Event, EventDetailDto>()
                .ForMember(d => d.ProjectId, o => o.MapFrom(s => s.Project!.Id))
                .ForMember(d => d.ProjectName, o => o.MapFrom(s => s.Project!.ProjectName));
            CreateMap<Event, EventSearchDto>()
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.Attendees!.First().AppUser!.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Attendees.First().AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.Count, o => o.MapFrom(s => s.Attendees!.Count()))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Attendees!.First().AppUser!.UserName));
            CreateMap<EventComment, CommentDto>()
            .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author!.UserName))
            .ForMember(d => d.FullName, o => o.MapFrom(s => s.Author!.DisplayName));
            CreateMap<Notification, NotificationDto>()
                .ForMember(d => d.SenderName, o => o.MapFrom(s => s.Sender!.DisplayName))
                .ForMember(d => d.SenderUserName, o => o.MapFrom(s => s.Sender!.UserName))
                .ForMember(d => d.SenderEmail, o => o.MapFrom(s => s.Sender!.Email))
                .ForMember(d => d.SenderImage, o => o.MapFrom(s => s.Sender!.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.RecepientName, o => o.MapFrom(s => s.Recipient!.DisplayName))
                .ForMember(d => d.RecepientUserName, o => o.MapFrom(s => s.Recipient!.UserName))
                .ForMember(d => d.EventId, o => o.MapFrom(s => s.Event!.Id))
                .ForMember(d => d.EventStartDate, o => o.MapFrom(s => s.Event!.StartDate))
                .ForMember(d => d.EventTitle, o => o.MapFrom(s => s.Event!.Title));
        }
    }
}

using Application.Bugs;
using Application.Projects;
using AutoMapper;
using Domain;

namespace Application.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Project, ProjectDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Owner.UserName))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.Owner.DisplayName));
            CreateMap<Bug, BugDto>()
                .ForMember(d => d.ProjectId, o => o.MapFrom(s => s.Project.Id))
                .ForMember(d => d.ProjectName, o => o.MapFrom(s => s.Project.ProjectName));
            CreateMap<BugAssignee, AssigneeDto>();
            CreateMap<ProjectComment, CommentDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.Author.DisplayName));
            CreateMap<BugComment, CommentDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.Author.DisplayName));
        }
    }
}

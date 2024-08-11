using Application.Projects;
using AutoMapper;
using Domain;

namespace Application.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Project, ProjectDto>();
            CreateMap<UserProject, FollowerDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.FullName, o => o.MapFrom(s => s.AppUser.DisplayName));
        }
    }
}

using AutoMapper;
using BusinessLogic.DTO_s;
using BusinessLogic.DTO_s.Account;
using DataAccess.Data.Entities;
using DataAccess.Data.Extities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Configurations
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Geometer, GeometerDto>();
            CreateMap<GeometerDto, Geometer>();

            CreateMap<Image, ImageDto>();
            CreateMap<ImageDto, Image>();

            CreateMap<Image, CreateImageDto>();
            CreateMap<CreateImageDto, Image>();

            CreateMap<Image, UpdateImageDto>();
            CreateMap<UpdateImageDto, Image>();

            CreateMap<RegisterModel, User>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(s => s.Email))
                .ForMember(x => x.PasswordHash, opt => opt.Ignore());
        }
    }
}

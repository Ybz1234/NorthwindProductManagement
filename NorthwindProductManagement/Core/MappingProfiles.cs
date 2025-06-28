using AutoMapper;
using NorthwindProductManagement.DomainEntities;
using NorthwindProductManagement.Queries.DTOs;

namespace NorthwindProductManagement.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Customer, CustomerOrderCountDto>()
                .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.ContactName))
                .ForMember(dest => dest.OrderCount, opt => opt.MapFrom(src => src.Orders.Count));

            CreateMap<Product, ProductDetailsDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.CategoryName))
                .ForMember(dest => dest.Supplier, opt => opt.MapFrom(src => src.Supplier.CompanyName))
                .ForMember(dest => dest.Units, opt => opt.MapFrom(src => src.UnitsInStock));

            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
        }
    }
}
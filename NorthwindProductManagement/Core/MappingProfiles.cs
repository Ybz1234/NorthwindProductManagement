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
                .ForMember(dest => dest.UnitsInStock, opt => opt.MapFrom(src => (int)src.UnitsInStock))
                .ForMember(dest => dest.UnitsOnOrder, opt => opt.MapFrom(src => (int)src.UnitsOnOrder))
                .ForMember(dest => dest.ReorderLevel, opt => opt.MapFrom(src => (int)src.ReorderLevel))
                .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => src.UnitPrice ?? 0));

            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>()
                .ForMember(dest => dest.ProductID, opt => opt.Ignore());

            CreateMap<Supplier, SupplierDto>();
            CreateMap<Category, CategoryDto>();
        }
    }
}
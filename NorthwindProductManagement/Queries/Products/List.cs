using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.Queries.DTOs;

namespace NorthwindProductManagement.Queries.Products
{
    public class List
    {
        public class Query : IRequest<List<ProductDetailsDto>> { }

        public class Handler : IRequestHandler<Query, List<ProductDetailsDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<Handler> _logger;

            public Handler(DataContext context, IMapper mapper, ILogger<Handler> logger)
            {
                _context = context;
                _mapper = mapper;
                _logger = logger;
            }

            public async Task<List<ProductDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Fetching product list with details");

                var products = await _context.Products
                    .Include(p => p.Category)
                    .Include(p => p.Supplier)
                    .ProjectTo<ProductDetailsDto>(_mapper.ConfigurationProvider)
                    .OrderBy(p => p.ProductName)
                    .ToListAsync(cancellationToken);

                _logger.LogInformation("Retrieved {Count} products", products.Count);

                return products;
            }
        }
    }
}
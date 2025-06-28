using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.Queries.DTOs;
using NorthwindProductManagement.Core;

namespace NorthwindProductManagement.Queries.Products
{
    public class Details
    {
        public class Query : IRequest<Result<ProductDetailsDto>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ProductDetailsDto>>
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

            public async Task<Result<ProductDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Fetching product details for ID: {ProductId}", request.Id);

                var product = await _context.Products
                    .Include(p => p.Category)
                    .Include(p => p.Supplier)
                    .Where(p => p.ProductID == request.Id)
                    .ProjectTo<ProductDetailsDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(cancellationToken);

                if (product == null)
                {
                    _logger.LogWarning("Product with ID {ProductId} not found", request.Id);
                    return Result<ProductDetailsDto>.Failure("Product not found");
                }

                _logger.LogInformation("Product with ID {ProductId} retrieved successfully", request.Id);
                return Result<ProductDetailsDto>.Success(product);
            }
        }
    }
}
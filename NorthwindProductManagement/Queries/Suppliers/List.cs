using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.Queries.DTOs;

namespace NorthwindProductManagement.Queries.Suppliers
{
    public class List
    {
        public class Query : IRequest<List<SupplierDto>> { }

        public class Handler : IRequestHandler<Query, List<SupplierDto>>
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

            public async Task<List<SupplierDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Fetching all suppliers");

                var suppliers = await _context.Suppliers
                    .ProjectTo<SupplierDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                _logger.LogInformation("Found {Count} suppliers", suppliers.Count);

                return suppliers;
            }
        }
    }
}
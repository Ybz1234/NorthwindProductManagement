using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.Queries.DTOs;

namespace NorthwindProductManagement.Queries.Customers
{
    public class OrdersCount
    {
        public class Query : IRequest<List<CustomerOrderCountDto>> { }

        public class Handler : IRequestHandler<Query, List<CustomerOrderCountDto>>
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

            public async Task<List<CustomerOrderCountDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Handling customer order count query");

                var result = await _context.Customers
                    .Include(c => c.Orders)
                    .ProjectTo<CustomerOrderCountDto>(_mapper.ConfigurationProvider)
                    .OrderByDescending(c => c.OrderCount)
                    .ToListAsync(cancellationToken);

                _logger.LogInformation("Retrieved {Count} customers", result.Count);

                return result;
            }
        }
    }
}
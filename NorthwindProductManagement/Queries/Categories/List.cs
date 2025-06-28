using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.DomainEntities;
using NorthwindProductManagement.Queries.DTOs;

namespace NorthwindProductManagement.Queries.Categories
{
    public class List
    {
        public class Query : IRequest<List<CategoryDto>> { }

        public class Handler : IRequestHandler<Query, List<CategoryDto>>
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

            public async Task<List<CategoryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Fetching all categories");

                var categories =  await _context.Categories
                    .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                _logger.LogInformation("Found {Count} categories", categories.Count);

                return categories;
            }
        }
    }
}
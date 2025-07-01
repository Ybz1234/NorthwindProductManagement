using MediatR;
using Microsoft.Data.SqlClient;
using NorthwindProductManagement.Queries.DTOs;
using System.Data;

namespace NorthwindProductManagement.Queries.Products
{
    public class TenMostExpensiveProducts
    {
        public class Query : IRequest<List<TenMostExpensiveProductDto>> { }

        public class Handler : IRequestHandler<Query, List<TenMostExpensiveProductDto>>
        {
            private readonly IConfiguration _configuration;
            private readonly ILogger<Handler> _logger;

            public Handler(IConfiguration configuration, ILogger<Handler> logger)
            {
                _configuration = configuration;
                _logger = logger;
            }

            public async Task<List<TenMostExpensiveProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = new List<TenMostExpensiveProductDto>();

                try
                {
                    using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                    using var command = new SqlCommand("Ten Most Expensive Products", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    await connection.OpenAsync(cancellationToken);
                    using var reader = await command.ExecuteReaderAsync(cancellationToken);

                    while (await reader.ReadAsync(cancellationToken))
                    {
                        list.Add(new TenMostExpensiveProductDto
                        {
                            ProductName = reader.GetString(0),
                            UnitPrice = reader.GetDecimal(1)
                        });
                    }

                    _logger.LogInformation("Retrieved {Count} most expensive products", list.Count);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error fetching most expensive products");
                    throw;
                }

                return list;
            }
        }
    }
}
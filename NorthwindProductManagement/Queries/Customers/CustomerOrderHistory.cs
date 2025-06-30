using MediatR;
using Microsoft.Data.SqlClient;
using NorthwindProductManagement.Queries.DTOs;
using System.Data;

namespace NorthwindProductManagement.Queries.Customers
{
    public class CustomerOrderHistory
    {
        public class Query : IRequest<List<CustomerOrderHistoryDto>>
        {
            public string CustomerId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<CustomerOrderHistoryDto>>
        {
            private readonly IConfiguration _configuration;
            private readonly ILogger<Handler> _logger;

            public Handler(IConfiguration configuration, ILogger<Handler> logger)
            {
                _configuration = configuration;
                _logger = logger;
            }

            public async Task<List<CustomerOrderHistoryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = new List<CustomerOrderHistoryDto>();

                try
                {
                    using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                    using var command = new SqlCommand("CustOrderHist", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    command.Parameters.AddWithValue("@CustomerID", request.CustomerId);

                    await connection.OpenAsync(cancellationToken);
                    using var reader = await command.ExecuteReaderAsync(cancellationToken);

                    while (await reader.ReadAsync(cancellationToken))
                    {
                        list.Add(new CustomerOrderHistoryDto
                        {
                            ProductName = reader.GetString(0),
                            Total = reader.GetInt32(1)
                        });
                    }

                    _logger.LogInformation("Retrieved {Count} product history records for customer {CustomerId}", list.Count, request.CustomerId);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error fetching order history for customer {CustomerId}", request.CustomerId);
                    throw;
                }

                return list;
            }
        }
    }
}
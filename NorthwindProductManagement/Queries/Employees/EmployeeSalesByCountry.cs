using MediatR;
using Microsoft.Data.SqlClient;
using NorthwindProductManagement.Queries.DTOs;
using System.Data;

namespace NorthwindProductManagement.Queries.Employees
{
    public class EmployeeSalesByCountry
    {
        public class Query : IRequest<List<EmployeeSalesByCountryDto>>
        {
            public DateTime BeginningDate { get; set; }
            public DateTime EndingDate { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<EmployeeSalesByCountryDto>>
        {
            private readonly IConfiguration _configuration;
            private readonly ILogger<Handler> _logger;

            public Handler(IConfiguration configuration, ILogger<Handler> logger)
            {
                _configuration = configuration;
                _logger = logger;
            }

            public async Task<List<EmployeeSalesByCountryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = new List<EmployeeSalesByCountryDto>();

                try
                {
                    using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
                    using var command = new SqlCommand("[dbo].[Employee Sales by Country]", connection)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    command.Parameters.AddWithValue("@Beginning_Date", request.BeginningDate);
                    command.Parameters.AddWithValue("@Ending_Date", request.EndingDate);

                    await connection.OpenAsync(cancellationToken);
                    using var reader = await command.ExecuteReaderAsync(cancellationToken);

                    while (await reader.ReadAsync(cancellationToken))
                    {
                        list.Add(new EmployeeSalesByCountryDto
                        {
                            Country = reader.IsDBNull(0) ? null : reader.GetString(0),
                            LastName = reader.IsDBNull(1) ? null : reader.GetString(1),
                            FirstName = reader.IsDBNull(2) ? null : reader.GetString(2),
                            ShippedDate = reader.IsDBNull(3) ? (DateTime?)null : reader.GetDateTime(3),
                            OrderID = reader.GetInt32(4),
                            SaleAmount = reader.GetDecimal(5)
                        });
                    }

                    _logger.LogInformation("Retrieved {Count} sales records by country between {StartDate} and {EndDate}",
                        list.Count, request.BeginningDate, request.EndingDate);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error fetching employee sales by country between {StartDate} and {EndDate}",
                        request.BeginningDate, request.EndingDate);
                    throw;
                }

                return list;
            }
        }
    }
}
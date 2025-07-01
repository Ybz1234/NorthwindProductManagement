using MediatR;
using Microsoft.EntityFrameworkCore;
using NorthwindProductManagement.Context;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Logging;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using NorthwindProductManagement.Queries.DTOs;

namespace NorthwindProductManagement.Queries.Products
{
    public class ExportCsv
    {
        public class Query : IRequest<FileContentResult> { }

        public class Handler : IRequestHandler<Query, FileContentResult>
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

            public async Task<FileContentResult> Handle(Query request, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Exporting products to CSV");

                var products = await _context.Products
                    .Include(p => p.Category)
                    .Include(p => p.Supplier)
                    .ProjectTo<ProductDetailsDto>(_mapper.ConfigurationProvider)
                    .OrderBy(p => p.ProductName)
                    .ToListAsync(cancellationToken);

                var csvBuilder = new StringBuilder();

                // Header
                csvBuilder.AppendLine("ProductID,ProductName,QuantityPerUnit,UnitPrice,UnitsInStock,Category,Supplier");

                // Rows
                foreach (var product in products)
                {
                    csvBuilder.AppendLine(string.Join(",",
                        product.ProductID,
                        Escape(product.ProductName),
                        Escape(product.QuantityPerUnit),
                        product.UnitPrice.ToString("F2"),
                        product.UnitsInStock,
                        Escape(product.Category),
                        Escape(product.Supplier)
                    ));
                }

                var csvBytes = Encoding.UTF8.GetBytes(csvBuilder.ToString());

                _logger.LogInformation("CSV export generated with {Count} products", products.Count);

                return new FileContentResult(csvBytes, "text/csv")
                {
                    FileDownloadName = "products.csv"
                };
            }

            private static string Escape(string? value)
            {
                if (string.IsNullOrEmpty(value)) return "";
                value = value.Replace("\"", "\"\"");
                return $"\"{value}\"";
            }
        }
    }
}
using MediatR;
using Microsoft.EntityFrameworkCore;
using NorthwindProductManagement.Context;

namespace NorthwindProductManagement.Queries.Products
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly ILogger<Handler> _logger;

            public Handler(DataContext context, ILogger<Handler> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Attempting to delete product with ID {Id}", request.Id);

                var product = await _context.Products.FindAsync(new object[] { request.Id }, cancellationToken);
                if (product == null)
                {
                    _logger.LogWarning("Product with ID {Id} not found", request.Id);
                    throw new Exception("Product not found");
                }

                // Check if any order details reference this product
                bool isReferenced = await _context.OrderDetails
                    .AnyAsync(od => od.ProductID == request.Id, cancellationToken);

                if (isReferenced)
                {
                    _logger.LogWarning("Cannot delete product with ID {Id} because it is referenced by existing orders", request.Id);
                    throw new Exception("Cannot delete product because it is referenced by existing orders.");
                }

                _context.Products.Remove(product);
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (result <= 0)
                {
                    _logger.LogWarning("Failed to delete product with ID {Id}", request.Id);
                    throw new Exception("Problem deleting product");
                }

                _logger.LogInformation("Product with ID {Id} deleted successfully", request.Id);
                return Unit.Value;
            }
        }
    }
}
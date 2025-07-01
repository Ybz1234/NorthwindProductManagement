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

                var product = await _context.Products
                    .Include(p => p.OrderDetails)
                    .FirstOrDefaultAsync(p => p.ProductID == request.Id, cancellationToken);
                    
                if (product == null)
                {
                    _logger.LogWarning("Product with ID {Id} not found", request.Id);
                    return Unit.Value;
                }

                _context.Products.Remove(product);
                await _context.SaveChangesAsync(cancellationToken);

                _logger.LogInformation("Product with ID {Id} deleted successfully", request.Id);
                return Unit.Value;
            }
        }
    }
}
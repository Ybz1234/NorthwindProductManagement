using Microsoft.EntityFrameworkCore;
using NorthwindProductManagement.DomainEntities;

namespace NorthwindProductManagement.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<CustomerCustomerDemo> CustomerCustomerDemos { get; set; }
        public DbSet<CustomerDemographic> CustomerDemographics { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeTerritory> EmployeeTerritories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Region> Regions { get; set; }
        public DbSet<Shipper> Shippers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Territory> Territories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomerCustomerDemo>().HasKey(c => new { c.CustomerID, c.CustomerTypeID });
            modelBuilder.Entity<EmployeeTerritory>().HasKey(e => new { e.EmployeeID, e.TerritoryID });
            modelBuilder.Entity<OrderDetail>().HasKey(o => new { o.OrderID, o.ProductID });
            modelBuilder.Entity<OrderDetail>().ToTable("Order Details");

            base.OnModelCreating(modelBuilder);
        }
    }
}
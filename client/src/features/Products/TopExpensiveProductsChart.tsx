import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./TopExpensiveProductsChart.css";
import { useStore } from "../../app/stores/store";

const TopExpensiveProductsChart = observer(() => {
    const { commonStore } = useStore();
    const { loadTopExpensiveProducts, topExpensiveProducts, loadingInitial } = commonStore;

    useEffect(() => {
        loadTopExpensiveProducts();
    }, [loadTopExpensiveProducts]);

    if (loadingInitial) {
        return <div className="loading">Loading...</div>;
    }

    const maxPrice = Math.max(...topExpensiveProducts.map(p => p.unitPrice));

    return (
        <div className="chart-container">
            <h2 className="chart-title">Top 10 Most Expensive Products</h2>
            <div className="bar-chart">
                {topExpensiveProducts.map((product, index) => {
                    const barWidth = (product.unitPrice / maxPrice) * 100;
                    return (
                        <div className="bar-row" key={index}>
                            <span className="product-name">{product.productName}</span>
                            <div className="bar-wrapper">
                                <div className="bar" style={{ width: `${barWidth}%` }}>
                                    <span className="price-label">${product.unitPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default TopExpensiveProductsChart;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PredictionResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { predictions, years } = location.state || {};
    
    const [chartImages, setChartImages] = useState({
        line: null,
        bar: null,
        scatter: null,
        pie: null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (years) {
            fetchVisualizations();
        }
    }, [years]);

    const fetchVisualizations = async () => {
        try {
            setLoading(true);
            const chartTypes = ["line", "bar", "scatter", "pie"];
            let chartData = {};

            for (const type of chartTypes) {
                const response = await axios.get(`http://127.0.0.1:8000/visualize/?k=${years}&chart_type=${type}`, {
                    responseType: "blob",
                });
                chartData[type] = URL.createObjectURL(response.data);
            }

            setChartImages(chartData);
        } catch (err) {
            setError("Failed to generate visualizations.");
        } finally {
            setLoading(false);
        }
    };

    if (!predictions) {
        return <div className="container text-center mt-5"><p className="alert alert-danger">No Predictions Found</p></div>;
    }

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar with Prediction Results */}
                <div className="col-md-3 p-3 bg-light shadow rounded">
                    <h2 className="text-center text-success">Prediction Results</h2>
                    <ul className="list-group mb-3">
                        <li className="list-group-item">Energy Consumption: <strong>{predictions.predicted_energy_consumption}</strong></li>
                        <li className="list-group-item">Carbon Emission: <strong>{predictions.predicted_carbon_emission}</strong></li>
                        <li className="list-group-item">Production Volume: <strong>{predictions.production_volume}</strong></li>
                        <li className="list-group-item">Waste Generated: <strong>{predictions.waste_generated}</strong></li>
                        <li className="list-group-item">Employee Count: <strong>{predictions.employee_count}</strong></li>
                    </ul>
                    <button className="btn btn-secondary w-100 mb-2" onClick={() => navigate("/ui")}>
                        Back to Home
                    </button>
                    <button className="btn btn-info w-100" onClick={() => navigate("/analysis")}>Analysis</button>
                </div>

                {/* Main Dashboard with Charts */}
                <div className="col-md-9">
                    <h2 className="text-center text-primary mb-3">Visualization Dashboard</h2>

                    {loading && <p className="text-center text-warning">Loading Visualizations...</p>}
                    {error && <p className="alert alert-danger">{error}</p>}

                    <div className="row">
                        {/* Line Chart */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow p-3">
                                <h5 className="text-center">Line Chart</h5>
                                {chartImages.line && <img src={chartImages.line} alt="Line Chart" className="img-fluid" />}
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow p-3">
                                <h5 className="text-center">Bar Chart</h5>
                                {chartImages.bar && <img src={chartImages.bar} alt="Bar Chart" className="img-fluid" />}
                            </div>
                        </div>

                        {/* Scatter Plot */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow p-3">
                                <h5 className="text-center">Scatter Plot</h5>
                                {chartImages.scatter && <img src={chartImages.scatter} alt="Scatter Plot" className="img-fluid" />}
                            </div>
                        </div>

                        {/* Pie Chart */}
                        <div className="col-md-6 mb-4">
                            <div className="card shadow p-3">
                                <h5 className="text-center">Pie Chart</h5>
                                {chartImages.pie && <img src={chartImages.pie} alt="Pie Chart" className="img-fluid" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PredictionResults;

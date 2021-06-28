const Dashboard = () => {
    return (
        <div className="card card-container">
            <div className="card-body">
                <div style={{ borderBottom: 'solid 1px lightgray', paddingBottom: 10 }}>
                    <h1 className="h3 font-weight-bold text-center">Statistics</h1>
                </div>
                <div className="pt-2">
                    <div className="row">
                        <div className="col-sm-12 col-12"></div>
                    </div>
                    <div className="alert alert-info">No hay informacion para mostrar</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

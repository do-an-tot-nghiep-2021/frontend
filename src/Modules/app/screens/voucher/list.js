const ListVoucherScreenApp = ({data, onAdd}) => {
    return (
        <>
            <div className="row">
                {data && data.map((item, index) => (
                    <div className="col-4" key={index}>
                        <span>Ten : {item.name}</span><br/>
                        <span>Diem yc : {item.point}</span><br/>
                        <span>Gia tri : {item.value} %</span><br/>
                        <button type="button" className="btn btn-danger" onClick={() => onAdd(item.id)}>Doi</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ListVoucherScreenApp

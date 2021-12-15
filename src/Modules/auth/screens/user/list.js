const ListUserScreen = (props) => {
    return (
        <>
            {props.data.map((items, index) => (
                <tr key={index}>
                    <td scope="col">{index + 1}</td>
                    <td scope="col"><img src={items.image} width="50" style={{ borderRadius: "7px", objectFit: "cover", height: "50px" }} /></td>
                    <td scope="col">{items.name}</td>
                    <td scope="col">{items.email}</td>
                    <td scope="col">{items.phone}</td>
                    <td scope="col">{items.role == 10 ? "admin" : "user"}</td>
                    <td>{items.time_create}, {items.date_create}</td>
                </tr>
            ))}
        </>
    )
}

export default ListUserScreen

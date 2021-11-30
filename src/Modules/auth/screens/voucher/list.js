import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const VoucherScreenAuth = (props) => {
  return (
    <>
      {props.data.map((item, index) => (
        <tr key={index}>
          <td scope="col">{index + 1}</td>
          <td scope="col">{item.name}</td>
          <td scope="col">{item.point}</td>
          <td scope="col">{item.value}</td>
          <td>
            <Link
              to={`/admin/vouchers/${item.id}`}
              className="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill"
              title="Edit details"
            >
              <i class="la la-edit"></i>
            </Link>
            <a
              className="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill"
              title="Delete"
              onClick={() => props.onDelete(item.id)}
            >
              <i class="la la-trash"></i>
            </a>
          </td>
        </tr>
      ))}
    </>
  );
};
export default VoucherScreenAuth;

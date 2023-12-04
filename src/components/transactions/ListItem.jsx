import React from "react";

/**
 * Renders information about tde user obtained from MS Graph
 * @param props
 */
export const ListItem = (item) => {
  return (
    <tr>
      <td>{item.merchant}</td>
      <td>{item.date}</td>
      <td>${item.amount}</td>
      <td>{item.category}</td>
      <td>{item.bankAccountName}</td>
    </tr>
  );
};

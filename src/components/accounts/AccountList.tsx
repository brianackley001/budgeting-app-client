import{ Card } from "react-bootstrap";
import AccountListItem from "./AccountListItem.tsx";
import InstitutionHeaderItem from "../institutions/InstitutionHeaderItem.tsx";
import { Key } from "react";

/**
 * Renders List of Account List Items (grouped by Institution)
 * @param props
 */

export default function AccountList({ institution }) {
  return (
    <>
      <Card className="mb-5">
        <Card.Body>
          <InstitutionHeaderItem institution={institution} />
          <span className='card-text'>
            {institution.accounts.map((accountItem: any, i: Key | null | undefined) => (
              <AccountListItem item={accountItem} key={i} />
            ))}
          </span>
        </Card.Body>
      </Card>
    </>
  );
}
import{ Card } from "react-bootstrap";
import AccountListItem from "./AccountListItem.tsx";
import InstitutionHeaderItem from "../institutions/InstitutionHeaderItem.tsx";
import { Key } from "react";

/**
 * Renders List of Account List Items (grouped by Institution)
 * @param props
 */

export default function AccountList({ institution }) {
  const hasCredentialError = institution.itemError && institution.itemError.errorCode === "ITEM_LOGIN_REQUIRED";
  const cardClass = hasCredentialError ? "mb-5 red" : "mb-5";
  return (
    <>
      <Card className={cardClass}>
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
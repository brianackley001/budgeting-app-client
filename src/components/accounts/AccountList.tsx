import{ Card, Row, Col } from "react-bootstrap";
import AccountListItem from "./AccountListItem.tsx";
import InstitutionHeaderItem from "../institutions/InstitutionHeaderItem.tsx";
import { Key } from "react";

/**
 * Renders List of Account List Items (grouped by Insitution)
 * @param props
 */


export default function AccountList({institution}) {
  console.log(`institution ${institution}`);
  return (
    <>
    <Card>
          <Card.Body>
            {/* <Card.Subtitle>{institution.accounts[0].institutionName} <span className='cardHeaderIconRight'>edit</span></Card.Subtitle> */}
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

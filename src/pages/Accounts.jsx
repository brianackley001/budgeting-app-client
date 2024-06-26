import { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import { useAppSelector } from "@hooks/useStoreHooks";
import SimplePlaidLink from "@components/buttons/SimplePlaidLink";
import AccountList from "@components/accounts/AccountList.tsx";
import {logTrace} from "@utils/logger";

export const Accounts = () => {
  logTrace('Accounts.tsx');
  const accountItems = useAppSelector(state => state.accountSlice.accounts);
  const linkedItems = useAppSelector(state => state.plaidSlice.linkedItems);
  const [institutions, setInstitutions] = useState([]);
   
  useEffect(() => {
    setInstitutions(
      Array.from(new Set(accountItems.map((item) => item.institutionId)))
        .map((institutionId) => {
          return {
            institutionId: institutionId,
            accounts: accountItems.filter(
              (item) => item.institutionId === institutionId
            ),
            itemError: linkedItems.find(
              (item) => item.institution_id === institutionId
            )?.itemError,
            itemId: linkedItems.find(
              (item) => item.institution_id === institutionId
            )?.item_id,
          };
        })
        .sort((a, b) => a.institutionId.localeCompare(b.institutionId))
    );

    // If an institution has an itemError, move it to position zero/top for maximum visibility
    institutions.forEach((institution, index) => {
      if (institution.itemError) {
        institutions.splice(index, 1);
        institutions.unshift(institution);
      }
    });
  }, [accountItems, linkedItems]);
  return (
    <div className="dashboardAccountContainer">
      <Card>
        <Card.Body>
          <Card.Title>
            All Accounts{" "}
            <span className="cardHeaderIconRight">
              <SimplePlaidLink />
            </span>
          </Card.Title>
          <Card.Subtitle className="mb-2 mt-4 text-muted"></Card.Subtitle>
          <span className="card-text">
            {institutions.map((institution) => {
              return (
                <AccountList
                  key={institution.institutionId}
                  institution={institution}
                />
              );
            })}
          </span>
        </Card.Body>
      </Card>
    </div>
  );
};

//import React, { useCallback, useState } from "react";
import { Card } from "react-bootstrap";
import { useAppSelector } from "@hooks/storeHooks";
import { useAcquireAccessToken } from "@hooks/useAcquireAccessToken.js";
import SimplePlaidLink from "@components/SimplePlaidLink";
import AccountList from "@components/accounts/AccountList.tsx";
import {logTrace} from "@utils/logger";

export const Accounts = () => {
  useAcquireAccessToken();
  logTrace('Accounts.tsx');
  const accountItems = useAppSelector(state => state.accountSlice.accounts);
  const institutions = Array.from(new Set(accountItems.map((item) => item.institutionId)))
    .map((institutionId) => {
      return {
        institutionId: institutionId, 
        accounts: accountItems.filter((item) => item.institutionId === institutionId),
      };
    })
    .sort((a, b) => a.institutionId.localeCompare(b.institutionId));
    // console.log(institutions);
  return (
    <>
    <div className="dashboardAccountContainer">
        <Card>
          <Card.Body>
            <Card.Title>All Accounts <span className='cardHeaderIconRight'><SimplePlaidLink /></span></Card.Title>
            <Card.Subtitle className="mb-2 mt-4 text-muted"></Card.Subtitle>
            <span className='card-text'>
                {institutions.map((institution) => {
                  return <AccountList key={institution.institutionId} institution={institution} />
                })}
              </span>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

import { useState, useEffect } from "react";
import{ Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import {getExportedTransactions} from "@store/transactionSlice";
import { logEvent } from "@utils/logger";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'


export const ExportTransactionCsvButton = (props) => {
  const { paginationConfig} = props;
  const userId = useAppSelector(state => state.userSlice.userId);
  const dispatch = useAppDispatch();

  const exportTransactions = async() => {
    logEvent("ExportTransactionCsvButton: exportCsvItems (BEGIN)", { userId: userId, requestedItemTotal: paginationConfig.total });
    console.log("Exporting transactions to CSV file...");

    // Retrieve transactions to export to CSV file:
    const data = await dispatch(getExportedTransactions(paginationConfig));
    console.log("Exported transactions to CSV file: ", data);
    handleFileFormat(data);
  };

  const handleFileFormat = (csvData) => {
    const headers = Object.keys(csvData[0]).toString();
    const main = csvData.map((item) => {
        return Object.values(item).toString();
    });

    const csvRows = [headers, ...main].join('\n');
    handleFileExport(csvRows);
  };

  const handleFileExport = (fileContents) => {
    const blob = new Blob([fileContents], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'transaction_export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    logEvent("ExportTransactionCsvButton: exportCsvItems (COMPLETE)", { userId: userId, requestedItemTotal: paginationConfig.total });
  };

  return (
    <Button variant="outline-primary"  onClick={() => exportTransactions()}>
        <FontAwesomeIcon icon={faFileCsv} title="Export Transactions to CSV file" /> Export
    </Button>
  );
};
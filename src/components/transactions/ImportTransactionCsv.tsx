import { Button, Card, FormLabel, ProgressBar } from "react-bootstrap";
import { logEvent, logError } from "@utils/logger";
import axiosInstance from "@utils/axiosInstance";
import { useEffect, useState } from "react";

export const ImportTransactionCsv = (props) => {
  const { userId } = props;

  const [file, setFile] = useState();
  const [importInProgress, setImportInProgress] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [transactionItems, setTransactionItems] = useState([]);

  const fileReader = new FileReader();

  const handleOnCsvSelectChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\r\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\r\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setTransactionItems(array);
  };
  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  const postData = async () => {
    let totalItemsProcessed = 0;
    console.log(`postData BEGIN`);
    if (transactionItems.length > 0) {
      logEvent("upload-historical-transactions", {
        userId: userId,
        records: transactionItems.length.toString(),
      });
      const chunkSize = 150;
      let currentChunkValue = 0;
      let progressBarIncrementValue = transactionItems.length / chunkSize;
      for (let i = 0; i < transactionItems.length; i += chunkSize) {
        const chunk = transactionItems.slice(i, i + chunkSize);
        try {
          console.log(`Uploading chunk ${i} to ${i + chunkSize}`);
          const response = await axiosInstance.post(
            `/transactions/importHistorical`,
            { userId: userId, transactions: chunk }
          );
          setProgressBarValue(
            Math.round((currentChunkValue / progressBarIncrementValue) * 100)
          );
          console.log(`Processed ${response.data.queued} of ${response.data.requested} items queued (${response.data.previousImports} items previously imported)`);
          totalItemsProcessed += response.data.queued;
          currentChunkValue++;
          //await timeout(150);
        } catch (err) {
          console.log(err);
          logError(err as Error);
        }
      }


      console.log(`postData END`);
      console.log(`Total items processed: ${totalItemsProcessed}`);
      setProgressBarValue(0);
      setTransactionItems([]);
      setImportInProgress(false);
    }
  };
  const readUploadedFileAsText = inputFile => {
    const temporaryFileReader = new FileReader();
    console.log("readUploadedFileAsText => BEGIN Promise");

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  };

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    setImportInProgress(true);
    //New code
    if(file){
    console.log("handleOnSubmit => BEGIN readUploadedFileAsText");
      const text = await readUploadedFileAsText(file);
      csvFileToArray(text);
      console.log("handleOnSubmit => END readUploadedFileAsText");
    }
  };
  
  useEffect(() => {
    const processTransactions = async () => {
        if (importInProgress && transactionItems.length > 0) {
            await postData();
        }
    };

    processTransactions().catch(console.error);;
  }, [importInProgress, transactionItems]);
  return (
    <Card className="mb-5">
      <Card.Subtitle className="mb-2 mt-2 mx-2 text-bold">
        Import Historical Transaction data
        <span
          className="cardHeaderIconRight"
          aria-label="Import Historical Transaction data"
          title="Import Historical Transaction data"
        >
          <form>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnCsvSelectChange}
              disabled={importInProgress}
            />
            <Button
              variant="primary"
              className="ml-auto"
              disabled={importInProgress}
              data-testid="button-import-csv"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Import
            </Button>
          </form>
        </span>
      </Card.Subtitle>
      <Card.Body>
        {importInProgress && (
          <ProgressBar
            striped
            variant="info"
            max={100}
            now={progressBarValue}
            label={`${progressBarValue}%`}
            className="mb-3 mt-3 mx-5"
          />
        )}
        {importInProgress && (
          <FormLabel
            className="text-info"
            data-testid="transaction-import-status"
          >
            ...Importing Transactions...
          </FormLabel>
        )}
      </Card.Body>
    </Card>
  );
};

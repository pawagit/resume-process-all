/**
 * ****************************************************************************************************************
 * Resume Process All - Boilerplate v1.0 - 2022-07-31
 * ****************************************************************************************************************
 * 
 *  - Processes all rows on a given spreadsheet.
 *  - If the execution is about to exceed the maximum time allowed, the process terminates gracefully
 *    and sets a 'resume' flag in the Script Properties.
 *  - Once the last item is processed, a 'done' flag is set, 
 *    avoiding future executions that start from the beginning.
 * 
 *  Hint:
 *  → Set a recurring trigger for RESUME_PROCESS_ALL() (⚠️ every x minutes, where  x > MAX_TIME!)
 */

/** Spreadsheet Parameters */
const SSID = 'MY_SPREADSHEET_ID'; // Spreadsheet ID goes here
const SHEET_NAME = 'SHEET_NAME';  // Name of spreadsheet to be processed

const firstrow = 2;         // first row with data
const ncols_in = 17;        // number of input data columns
const insertcol = 18;       // First column where the output data will be added

/** Resume Logic Parameters */
const MAX_TIME = 1*60*1000; // Limit overall execution to a safe max execution time [milliseconds]
const SLEEP = 30*1000;  // Sleep for x [milliseconds]


/**
 * MAIN EXECUTION FUNCTION
 * Processes all rows in a given dataset.
 *  If the execution time would exceed the maximum time allowed, 
 *  it gracefully terminates and stores the resume point in the Script Properties.
 */
function RESUME_PROCESS_ALL(restart=true) {
  const start = new Date();
  /** Retrieve the Resume Settings from the Script Properties */
  const P = PropertiesService.getScriptProperties();
  const p = P.getProperties();

  /** Optionally, do not start if 'done' flag is set */
  if (p.done) {
    if (!restart) {
      console.log('🏁 ALL DONE. DO NOT START OVER.')
      return false;
    }
  }

  const resumerow = parseInt(p.resumerow,10);

  const startrow = resumerow || 2; // start from resume row if to be resumed
  console.log('Starting from row %s...',startrow)

  /** Fetch the relevant data from the spreadsheet */
  const ss = SpreadsheetApp.openById(SSID);
  const s = ss.getSheetByName(SHEET_NAME);

  const maxrow = s.getLastRow();        // row number of last row with data
  const nrows = maxrow - startrow + 1;  // number of rows to be fetched starting from the startrow
  const data = s.getRange(startrow,1,nrows,ncols_in).getValues(); // fetch the data

  /**
   * As long as there is enough time and rows to be processed, process each row.
   * Once the time is up, leave the loop
   */
  let timeLeft = true;
  let i=0;
  let out = [];
  while (i < data.length && timeLeft) {
    
    /**
     * Process the item i on row = i+startrow
     * MAIN_PAYLOAD_FUNCTION(row)
     */
    let row = data[i];
    let RESULT = PROCESS_ROW(row);
    out.push(RESULT);
    
    /** Update iterator and timeLeft */
    i++;
    timeLeft = ((new Date() - start) < MAX_TIME);

    /** Sporadically log progress... */
    if (i % 2 == 0) {
      console.log('next row: %s...',i+startrow)
    }
  }

  /** Flush the output data to the spreadsheet */
  //s.getRange(startrow,insertcol,out.length,out[0].length).setValues(out);
  //SpreadsheetApp.flush();
    
  /** Check if Resume is required and Update Script Properties */
  const resume = (i < data.length - 1) ? i + startrow : null;
  if (resume) {
    console.warn('Resume required from row %s after %s secs running time! ⚠️',resume, parseInt((new Date()-start)/1000,10) )
    P.setProperty('resumerow',resume)
  } else {
    P.deleteProperty('resumerow')

    /** Optionally set a flag that the process is complete and should not start from the beginning. */
    P.setProperty('done',new Date().toISOString())
    console.log('All complete!  after %s secs running time! ✔️', parseInt((new Date()-start)/1000,10), P.getProperties())
  }

  /** Return this run's output */
  return out; 
}


/**
 * MAIN PAYLOAD FUNCTION
 * Processes the data from a row of the large dataset to be processed
 */
function PROCESS_ROW(row) {
  // TODO: create the payload logic here...
  Utilities.sleep(0.001*1000)
  return row;
}
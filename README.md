# resume-process-all
```
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
```
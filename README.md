# resume-process-all 
## GAS Boilerplate for bulk/batch processing items in a table with resume functionality 
#resume #spreadsheet #google-sheets #google-apps-script #trigger #batch-process #maximum-execution-time #bulk-process 

- Processes all rows on a given spreadsheet. 
- If the execution is about to exceed the maximum time allowed, the process terminates gracefully and sets a 'resume' flag in the Script Properties. 
- Once the last item is processed, a 'done' flag is set, avoiding future executions that start from the beginning. 

**Hint**: 
→ Set a recurring trigger for RESUME_PROCESS_ALL() (⚠️ every x minutes, where  x > MAX_TIME!)

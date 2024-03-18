import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import * as fs from 'node:fs/promises';
import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'), // Preload script (optional)
    //   nodeIntegration: true, // Allows access to Node.js APIs in React app (optional)
    //   contextIsolation: false, // Disables contextIsolation for preload script access (optional)
    },
  });

  win.loadURL('http://localhost:6969');
}

app.whenReady().then(() => {
  createWindow();
  // Load previously found files on app launch (if file exists)
  loadPreviousResults();
});

app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
    app.quit();
//   }
});

app.activate(() => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const dataPath = path.join(app.getPath('userData'), 'foundFiles.json'); // Define data file path

// Function to load previously found files from data file (if it exists)
function loadPreviousResults() {
  try {
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8');
      previousResults = JSON.parse(data);
    } else {
      previousResults = []; // Initialize empty array if no file exists
    }
  } catch (error) {
    console.error('Error loading previous results:', error);
    previousResults = []; // Set to empty array on error
  }
}

let previousResults = []; // Array to store previously found files

// Function to handle folder selection and search (similar to previous version)
function handleSearchRequest(searchTerm) {
  dialog.showOpenDir({}).then((result) => {
    if (!result.canceled) {
      const selectedPath = result.filePaths[0];
      searchFiles(selectedPath, searchTerm);
    }
  });
}

import recursive from 'recursive-readdir'

function searchFiles(folderPath, extension,win) {
  const newFiles = []; // Array to store newly found files
  recursive(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      if (path.extname(file) === `.${extension}`) {
        newFiles.push(file);
      }
    });

    // Update previous results with newly found files
    previousResults = [...previousResults, ...newFiles];

    // Save updated results to data file
    try {
      fs.writeFileSync(dataPath, JSON.stringify(previousResults, null, 2)); // Save with indentation
    } catch (error) {
      console.error('Error saving search results:', error);
    }

    win.webContents.send('search-results', previousResults);
  });
}

ipcMain.on('search-files', (event, searchTerm) => {
  handleSearchRequest(searchTerm);
});
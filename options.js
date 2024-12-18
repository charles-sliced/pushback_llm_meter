// options.js

// Save the API key when the user clicks the save button
document.getElementById('saveButton').addEventListener('click', function() {
  const apiKey = document.getElementById('apiKeyInput').value.trim();
  chrome.storage.sync.set({openaiApiKey: apiKey}, function() {
    const status = document.getElementById('status');
    status.textContent = 'API key saved!';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
});

// Load the saved API key on page load
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get('openaiApiKey', function(data) {
    if (data.openaiApiKey) {
      document.getElementById('apiKeyInput').value = data.openaiApiKey;
    }
  });
});
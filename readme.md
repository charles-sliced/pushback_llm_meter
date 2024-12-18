# ChatGPT Prompt Meter Extension

This Chrome browser extension enhances your experience on [ChatGPT](https://chatgpt.com) by providing an insightful visual feedback mechanism for your prompts. After you send a prompt, the extension queries the OpenAI API to receive a numerical value between 0 and 10 and displays it as a circular meter next to your prompt. The meter is color-coded from **red (0)** to **green (10)**, offering a quick and intuitive way to gauge additional information about your prompts.

---

## Features

- **Works only on chatgpt.com**: The extension is specific to the ChatGPT interface.
- **Passive Visualization**: Displays a small circular meter next to every prompt sent, without modifying the input or output of ChatGPT.
- **Real-time API Integration**: Sends your prompt to the OpenAI API and retrieves a numerical response, visualized through the meter.
- **Color-Coded Meter**: 
  - **Yellow (0)**: Indicates the lowest value.
  - **Red (10)**: Indicates the highest value.
- **Conversation Awareness**: Keeps track of all prompts in the current discussion, ensuring that meters remain visible even in longer conversations.
- **Customizable API Key**: Allows you to input your OpenAI API key securely in the extension settings.

---

## Installation

1. Clone or download this repository to your local machine.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer mode** (toggle switch in the top-right corner).
4. Click **Load unpacked** and select the folder containing this project.
5. Go to the extension options and input your OpenAI API key.
6. Open [ChatGPT](https://chatgpt.com) and enjoy the extension in action!

---

## Usage

1. Navigate to [ChatGPT](https://chatgpt.com).
2. Send a prompt as usual.
3. A small circular meter will appear next to your prompt, indicating the corresponding value retrieved from the OpenAI API.

---

## API Key Setup

The extension requires an OpenAI API key to function. To set up:

1. Open the extension by clicking its icon in the Chrome toolbar.
2. Input your OpenAI API key in the provided field and click "Save."

---

## Technologies Used

- **Manifest V3**: Chrome Extensions API for building secure and efficient extensions.
- **JavaScript**: Core functionality of the extension.
- **OpenAI API**: Integration with OpenAI's GPT models for processing prompts.
- **HTML/CSS**: UI for the options page and styling of the meter.

---

## Disclaimer

This extension adheres to OpenAI and Chrome extension policies. It is a passive tool that only provides visual feedback based on user prompts and does not alter or modify ChatGPT’s behavior or responses. Please ensure you comply with OpenAI’s API terms of service when using this extension.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! If you find a bug or have suggestions for features, feel free to open an issue or submit a pull request.

---

## Acknowledgments

- [OpenAI](https://openai.com) for providing the API that powers this extension.
- The Chrome Extensions API documentation for guidance on building this extension.

---

Enjoy your enhanced ChatGPT experience with the **ChatGPT Prompt Meter Extension**!

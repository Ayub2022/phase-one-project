import { Configuration, OpenAIApi } from "openai";

const logout = document.querySelector(".logout");
const generateData = document.querySelector(".generate");
const userInput = document.querySelector(".user-input");
const outPutParagraph = document.querySelector(".output-area");
const icon = document.querySelector(".icon");

let setLoading = false;

const OPENAI_API_KEY = "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";
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const fetchResponse = async (response) => {
  setLoading = true;
  setTimeout(
    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: "Generate an professional cover letter for a " + response,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
      .then((response) => {
        // setResponse({
        //   heading: `Here is your answer`,
        //   response: `${response.data.choices[0].text}`
        // });
        setDataToUI(response.data.choices[0].text);
      }),
    100
  );
  setLoading = false;
};

generateData.onsubmit = (e) => {
  e.preventDefault();
  fetchResponse(userInput.value);
};

const setDataToUI = (text) => {
  outPutParagraph.innerHTML = text;
};

const copyToClipBoard = async (text) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
};

//copy text to clip board
icon.addEventListener("click", () => {
  copyToClipBoard(outPutParagraph.innerHTML);
  alert("Copied to Clipboard");
});

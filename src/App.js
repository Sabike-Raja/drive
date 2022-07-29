// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = "690956885710-";
const API_KEY = "dG5hrJo4RlR6WiX4H2C52JSgJbk";

// TODO(developer): Replace with your own project number from console.developers.google.com.
const APP_ID = "primal-chariot-355611";

function App() {
  let accessToken = null;
  const handleOpenPicker = () => {
    const { google, gapi } = window;
    let tokenClient;

    gapi.load("picker", function intializePicker() {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: "", // defined later
      });

      tokenClient.callback = async (response) => {
        if (response.error !== undefined) {
          throw response;
        }
        accessToken = response.access_token;
        const view = new google.picker.View(google.picker.ViewId.DOCS);
        const picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setDeveloperKey(API_KEY)
          .setAppId(APP_ID)
          .setOAuthToken(accessToken)
          .addView(view)
          .addView(new google.picker.DocsUploadView())
          .setCallback(pickerCallback)
          .build();
        picker.setVisible(true);
      };

      if (accessToken === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        // tokenClient.requestAccessToken({ prompt: "" });
        const view = new google.picker.View(google.picker.ViewId.DOCS);
        const picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setDeveloperKey(API_KEY)
          .setAppId(APP_ID)
          .setOAuthToken(accessToken)
          .addView(view)
          .addView(new google.picker.DocsUploadView())
          .setCallback(pickerCallback)
          .build();
        picker.setVisible(true);
      }
    });
  };

  function pickerCallback(...data) {
    console.log("working", data);
  }

  return (
    <div className="btn-container">
      <button className="btn" onClick={() => handleOpenPicker()}>
        Upload your file
      </button>
    </div>
  );
}

export default App;

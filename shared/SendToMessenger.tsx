//@ts-nocheck
"use client";
import Script from "next/script";

export default function SendToMessenger() {
  return (
    <>
      <Script strategy="afterInteractive">
        {`window.fbAsyncInit = function() {
                FB.init({
                    appId            : '7255615124546099',
                    xfbml            : true,
                    version          : 'v18.0'
                  });


                // FB.Event.subscribe('send_to_messenger', function(e) {
                // // callback for events triggered by the plugin

                // console.log(e);

                // });

                 FB.Event.subscribe('messenger_checkbox', function(e) {
                  console.log("messenger_checkbox event");
                  console.log(e);
                
                  if (e.event == 'rendered') {
                    console.log("Plugin was rendered");
                  } else if (e.event == 'checkbox') {
                    var checkboxState = e.state;
                    console.log("Checkbox state: " + checkboxState);
                  } else if (e.event == 'not_you') {
                    console.log("User clicked 'not you'");
                  } else if (e.event == 'hidden') {
                    console.log("Plugin was hidden");
                  }
                });
              };
            `}
      </Script>
      <Script
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      ></Script>

      {/* <div
        className="fb-send-to-messenger"
        messenger_app_id="7255615124546099"
        page_id="155078761029891"
        // ref="<PASS_THROUGH_PARAM>"
        color="blue"
        // size="<standard | large | xlarge>"
        cta_text="SEND_THIS_TO_ME"
      ></div> */}
      <div
        className="fb-messenger-checkbox"
        messenger_app_id="7255615124546099"
        page_id="155078761029891"
        opt-in-type="transactional"
        // ref="ADDITIONAL-INFORMATION"
        user_ref="sajh13idakj2b1jdioa"
        allow_login="true"
        size="standard"
        skin="dark"
        center_align="true"
      ></div>
    </>
  );
}

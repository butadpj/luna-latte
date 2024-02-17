//@ts-nocheck
"use client";

import Script from "next/script";
import { useEffect } from "react";
import { generate } from "short-uuid";

export default function SendToMessenger({
  className = "",
  onClickButton,
  onOptIn,
}: {
  className?: string;
  onClickButton?: () => void;
  onOptIn: (ref: string) => void;
}) {
  useEffect(() => {
    window.fbAsyncInit = function () {
      const handler = (e) => {
        const { event, ref } = e;

        if (event === "clicked") {
          onClickButton && onClickButton();
        } else if (event === "opt_in") {
          onOptIn(ref);
        }
      };

      FB.init({
        appId: "7255615124546099",
        xfbml: true,
        version: "v19.0",
      });

      FB.Event.subscribe("send_to_messenger", handler);

      //  FB.Event.subscribe('messenger_checkbox', function(e) {
      //   console.log("messenger_checkbox event");
      //   console.log(e);

      //   if (e.event == 'rendered') {
      //     console.log("Plugin was rendered");
      //   } else if (e.event == 'checkbox') {
      //     var checkboxState = e.state;
      //     console.log("Checkbox state: " + checkboxState);
      //   } else if (e.event == 'not_you') {
      //     console.log("User clicked 'not you'");
      //   } else if (e.event == 'hidden') {
      //     console.log("Plugin was hidden");
      //   }
      // });

      return () => FB.Event.unsubscribe("send_to_messenger", handler);
    };
  });

  return (
    <>
      <div
        className={`fb-send-to-messenger ${className}`}
        messenger_app_id="7255615124546099"
        page_id="155078761029891"
        color="blue"
        size="large"
        data-ref={generate()}
        cta_text="GET_STARTED"
      ></div>
      <Script
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      ></Script>
      {/* <div
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
      ></div> */}
    </>
  );
}

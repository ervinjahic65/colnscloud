var client_view_id="74247195";
function loadLiftAI(){
    var c=document.createElement("script");
    c.type="text/javascript";
    c.src="https://lift-ai-js.marketlinc.com/www.tenable.com/snippet.js?viewId\x3d"+client_view_id;
    c.id="vs_snippet_script_id";document.getElementsByTagName("head")[0].appendChild(c)
}
try{
    loadLiftAI()
} catch(c){}
var ML_getCookie = function(e){const o=encodeURIComponent(e)+"=",n=document.cookie.split(";");for(let e=0;e<n.length;e++){let t=n[e];for(;" "===t.charAt(0);)t=t.substring(1);if(0===t.indexOf(o)){const e=t.substring(o.length,t.length);try{return decodeURIComponent(e)}catch(e){return console.error("Error decoding cookie:",e.message),""}}}return""}
var ML_setCookie=function(e,t,i){var o=new Date;o.setTime(o.getTime()+864e5*i);var n="expires="+o.toUTCString();document.cookie=e+"="+t+";domain=.tenable.com;"+n+";path=/"};
try{var ml_vs_score=ML_getCookie("vs_conv_ai"),ml_score_int=parseInt(ml_vs_score.split("-")[1]),ml_intent_band=function(e){return e>60?"HighIntent":e>30&&e<=60?"MidIntent":"LowIntent"};ML_setCookie("vs_intent",ml_intent_band(ml_score_int)),""!=ml_vs_score&&null==sessionStorage.getItem("ml_old_score")&&sessionStorage.setItem("ml_old_score",ml_vs_score);var ml_check_cookie_update_Interval=setInterval((function(){try{var e=sessionStorage.getItem("ml_old_score");if(""!=ml_vs_score&&(ml_vs_score!=ML_getCookie("vs_conv_ai")||e!=ML_getCookie("vs_conv_ai"))){sessionStorage.setItem("ml_old_score",ML_getCookie("vs_conv_ai"));var _=ML_getCookie("vs_conv_ai"),t=parseInt(_.split("-")[1]);ML_setCookie("vs_intent",ml_intent_band(t))}}catch(e){}}),1e4);}catch(e){}


try {
    var ml_new_score = ML_getCookie('vs_conv_ai')
    var ml_vs_score = ML_getCookie("vs_conv_ai");
    if(ml_new_score != '' && sessionStorage.getItem("ml_old_score") == null){
        sessionStorage.setItem("ml_old_score",ml_vs_score)
    }
    
    var ml_check_cookie_update_Interval = setInterval(function(){
        if("scoring" in window){
            try{
                var ml_old_score = sessionStorage.getItem("ml_old_score");
                var ml_vs_score = ML_getCookie("vs_conv_ai");
                if(ml_vs_score != '' && ((ml_vs_score!=ML_getCookie("vs_conv_ai"))||(ml_old_score != ML_getCookie("vs_conv_ai")))){
                    // document.dispatchEvent(new CustomEvent("LiftAIScoreChanged", {"detail":{
                    //                                                                 "value":ML_getCookie("vs_conv_ai")
                    //                                                                 }}));
                    clearInterval(ml_check_cookie_update_Interval)
                    // if(window.dataLayer){
                    //     dataLayer.push({"event":"Lift_AI_Score_Updated"})
                    // }	
                    sessionStorage.setItem("ml_old_score",ML_getCookie("vs_conv_ai"));
                    var ml_n_intent = ml_intent_band(ML_getCookie("vs_conv_ai").split("-")[1])
                    ML_setCookie("vs_intent",ml_n_intent)
                    //
                }

            }catch(e){
                //Do nothing
            }
        }
    },10000);
} catch (e) {
    // DO Nothing
}

/*
 * Added Drift Event tracking 2024-03-16
 */
var ml_drift_load_count = 0;
function ml_drift_trackEvents(){
    if(("drift" in window && "scoring" in window) || ml_drift_load_count > 10){
        try{
            if(typeof(window.drift) != 'undefined'){
                drift.on("conversation:playbookFired", function(data) {
                    window.scoring.tracking.pageEvents({
                        "event": "DRIFT_PLAYBOOK_FIRED",
                        "d_campaign"	: data.campaignId,
                        "d_playbook"	: data.playbookId,
                        "d_cid"		: data.conversationId,
                        "d_vid" : ML_getCookie("driftt_aid")
                    }) ;
                });
    
                drift.on("conversation:playbookClicked", function(data) {
                    // console.log("Playbook fired: " + JSON.stringify(data))
                    window.scoring.tracking.pageEvents({
                        "event": "DRIFT_PLAYBOOK_CLICKED",
                        "d_campaign"	: data.campaignId,
                        "d_playbook"	: data.playbookId,
                        "d_cid"		: data.conversationId,
                        "d_vid" : ML_getCookie("driftt_aid")
                    }) ;
                });
    
                
                /*
                *  Email Submit Capture
                *  
                */
    
                window.drift.on("emailCapture", function(data) {
                    window.scoring.tracking.pageEvents({
                        "event": "DRIFT_EMAIL_CAPTURED"
                    }) ;
                });
                
                /*
                *  Conversation Start
                *  @Captures start of a conversation along with conversation id
                */
    
    
                window.drift.on('startConversation', function (event) {
                    // console.log("startConversation")
                    window.scoring.tracking.pageEvents({
                        "event": "DRIFT_CHAT_STARTED",
                        "d_cid": JSON.stringify(event.conversationId),
                        "d_vid" : ML_getCookie("driftt_aid")
                    }) ;
    
                });
    
                /*
                *      Meeting Booked
                */
    
                window.drift.on("scheduling:meetingBooked", function(data) {
                    // console.log("scheduling:meetingBooked")
                    // console.log("user booked a meeting with " + data.teamMember.name);
                    window.scoring.tracking.pageEvents({
                        "event": "DRIFT_MEETING_BOOKED"
                    }) ;
                });
    
                /*
                *      Phone captured in chat
                */
                window.drift.on("phoneCapture", function(data) {
                    // console.log("User provided a phone number: " + JSON.stringify(data))
                    window.scoring.tracking.pageEvents({
                        "event": "DRIFT_PHONE_NUMBER_CAPTURED"
                    }) ;
                });
    
            } else{
                window.scoring.tracking.pageEvents({
                    "event": "DRIFT_FUNCTION_NOT_FOUND"
                });
            }
        }catch(e){
            // DO NOTHING
        }
    } else{
        ml_drift_load_count++;
        setTimeout(ml_drift_trackEvents,2000);
    }
}
	
ml_drift_trackEvents();



/*
 * Added Conversion Event tracking 2024-04-22
 */
var ml_scoring_load_count = 0;
function ml_scoring_trackEvents(){
    if("scoring" in window || ml_scoring_load_count > 10){

        function trackEvent(eventName) {
            window.scoring?.tracking.pageEvents({
                "event": eventName
            });
        }
        try{
            //Request a Demo
            var ml_ReqDemoBtn = document.getElementsByClassName("btn-2017--blue");
            if(typeof(ml_ReqDemoBtn == "object")){
                for(i=0;i<ml_ReqDemoBtn.length;i++){
                    if(ml_ReqDemoBtn.item(i).innerHTMl == "Request a Demo"){
                        ml_ReqDemoBtn.item(i).addEventListener("click", function(){
                            var ml_ReqDemo_submit = document.querySelector(".try-buy-modal__form form .mktoButtonRow button[type='submit']");
                            if(ml_ReqDemo_submit != null){
                                ml_ReqDemo_submit.addEventListener("click", function(){
                                    trackEvent("Demo_Request")
                                });
                            }
                        });
                        
                    } else if(ml_ReqDemoBtn.item(i).innerHTMl == "Try for Free"){
                        ml_TryBtn.item(i).addEventListener("click", function(){
                            var ml_Try_submit = document.querySelector("#t-eval-tio-vm-b-eval-submit");
                            if(ml_Try_submit != null){
                                ml_Try_submit.addEventListener("click", function(){
                                    trackEvent("Trial_Signup");
                                });
                            }
                        });  
                    }
                }
            }
            //ContactUs Submit
            var ml_contact_btn =  document.querySelector("#mktoForm_1746 button[type='submit']")
            if(ml_contact_btn != null){
                ml_contact_btn.addEventListener("click", function(){
                    trackEvent("Contact_Us");
                });
            }

            var ml_Oneval_contact_btn =  document.querySelector("#one-eval button.mktoButton")
            if(ml_Oneval_contact_btn != null){
                ml_Oneval_contact_btn.addEventListener("click", function(){
                    trackEvent("Contact_Us");
                });
            }

            // Demo Request
            var ml_ReqDemo_submit = document.querySelector(".try-buy-modal__form form .mktoButtonRow button[type='submit']");
            if(ml_ReqDemo_submit != null){
                ml_ReqDemo_submit.addEventListener("click", function(){
                    trackEvent("Demo_Request");
                });
            }

            //Trial Signup
            var ml_Try_submit = document.querySelector("#t-eval-tio-vm-b-eval-submit");
            if(ml_Try_submit != null){
                ml_Try_submit.addEventListener("click", function(){
                    trackEvent("Trial_Signup");
                });
            }

            // .../try page
            var ml_ReqDemo_submit_2 = document.querySelector("#ot-eval button.mktoButton");
            if(ml_ReqDemo_submit_2 != null){
                ml_ReqDemo_submit_2.addEventListener("click", function(){
                    trackEvent("Demo_Request");
                });
            }
            
            // .../try page
            // Try Tenable Lumin page
            var ml_Try_lumin_submit = document.querySelector("#t-eval-t-lumin-eval-submit");
            if(ml_Try_lumin_submit != null){
                ml_Try_lumin_submit.addEventListener("click", function(){
                    trackEvent("Trial_Signup");
                });
            }

            
            var ml_contact_lumin_btn =  document.querySelector("#buy-lumin button[type='submit']")
            if(ml_contact_lumin_btn != null){
                ml_contact_lumin_btn.addEventListener("click", function(){
                    trackEvent("Contact_Us");
                });
            }

        }catch(e){
            //Nothing
        }
    }else{
        ml_scoring_load_count++;
        setTimeout(ml_scoring_trackEvents,2000);
    }
}
	
ml_scoring_trackEvents();

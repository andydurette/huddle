import React, {useEffect, useState} from 'react';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from "@syncfusion/ej2-react-schedule";
import Footer from "./Footer";

import { useAuth0 } from "../react-auth0-spa";


function Calendar() {

     // eslint-disable-next-line
    let [userInfo, setUserInfo] = useState('');

    const {id, getTokenSilently} = useAuth0();
    let [dbId /*, setDbId*/] =  id;

    useEffect(() => {
        if(id[0] === ''){
            
        }else if (userInfo === ''){
            let userInfoCall = async () => {
                const token = await getTokenSilently();
                const res = await fetch("/api/user/info", {
                  method: "POST",
                  body: JSON.stringify({id: dbId}),
                  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
                  });
                  return res.json();
              }
              // Response from api call finally stores api call response as the database Id
              // eslint-disable-next-line
              userInfoCall().then((res) =>  setUserInfo( userInfo = res ));
        }
      });
    
    return (   
        <section id="wrapper" className="Calendar">
            <div id="wrapper-contents" >
                {userInfo === '' ?  
                    'Loading...'
                    : (     
                    <ScheduleComponent currentView="Month">
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                    </ScheduleComponent>
                     )}
            </div>
            <Footer/>
        </section>
    ) 
}

export default Calendar;